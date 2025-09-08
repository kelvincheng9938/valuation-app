import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

// Initialize Stripe with comprehensive error handling
let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
  }
  
  console.log('🔐 Initializing Stripe with key:', process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '...');
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
  
  console.log('✅ Stripe initialized successfully');
} catch (error) {
  console.error('❌ Stripe initialization failed:', error.message);
}

export async function POST(request) {
  console.log('🚀 Checkout session creation started');
  
  try {
    // Check if Stripe is properly initialized
    if (!stripe) {
      console.error('❌ Stripe not initialized');
      return NextResponse.json(
        { error: 'Payment system not configured properly' }, 
        { status: 500 }
      );
    }

    // Check environment variables
    if (!process.env.STRIPE_PRICE_ID) {
      console.error('❌ STRIPE_PRICE_ID not set');
      return NextResponse.json(
        { error: 'Price configuration missing. Please check STRIPE_PRICE_ID in environment variables.' }, 
        { status: 500 }
      );
    }

    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      console.error('❌ User not authenticated or no email');
      return NextResponse.json(
        { error: 'Authentication required. Please sign in first.' }, 
        { status: 401 }
      );
    }

    console.log('🔐 Creating checkout for authenticated user:', session.user.email);

    const body = await request.json();
    const priceId = body.priceId || process.env.STRIPE_PRICE_ID;
    
    console.log('💰 Using Price ID:', priceId);
    
    // Validate Price ID format
    if (!priceId || !priceId.startsWith('price_')) {
      console.error('❌ Invalid price ID format:', priceId);
      return NextResponse.json(
        { error: 'Invalid price configuration. Price ID must start with "price_"' }, 
        { status: 400 }
      );
    }

    // Create or retrieve Stripe customer
    let customer;
    try {
      console.log('👤 Looking for existing customer with email:', session.user.email);
      
      // Check if customer already exists
      const customers = await stripe.customers.list({
        email: session.user.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customer = customers.data[0];
        console.log('✅ Found existing customer:', customer.id);
      } else {
        console.log('🆕 Creating new customer for:', session.user.email);
        
        // Create new customer
        customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name || session.user.email,
          metadata: {
            userId: session.user.email,
            source: 'valuation_pro',
            created_at: new Date().toISOString(),
          },
        });
        console.log('✅ Created new customer:', customer.id);
      }
    } catch (customerError) {
      console.error('❌ Error handling customer:', customerError);
      return NextResponse.json(
        { error: 'Failed to process customer information. Please try again.' }, 
        { status: 500 }
      );
    }

    console.log('🛒 Creating Stripe checkout session...');

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || 'https://www.valuation-pro.com';
    console.log('🌐 Using origin for redirects:', origin);

    // 🔥 FIXED: Address the tax calculation issue
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/upgrade?canceled=true`,
      metadata: {
        userId: session.user.email,
        userEmail: session.user.email,
        source: 'valuation_pro_checkout',
      },
      subscription_data: {
        metadata: {
          userId: session.user.email,
          userEmail: session.user.email,
          source: 'valuation_pro_subscription',
        },
      },
      // Add billing address collection
      billing_address_collection: 'required',
      
      // 🔥 FIXED: Handle automatic tax properly
      customer_update: {
        address: 'auto', // Automatically save address from checkout
        shipping: 'auto'  // Automatically save shipping from checkout
      },
      
      // 🔥 OPTION 1: Keep automatic tax but handle addresses properly
      automatic_tax: {
        enabled: true,
      },
      
      // 🔥 OPTION 2: If tax issues persist, disable automatic tax
      // automatic_tax: {
      //   enabled: false,
      // },
      
      // Allow promotion codes
      allow_promotion_codes: true,
      
      // Collect shipping address for tax calculation
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI', 'IE', 'AT', 'BE', 'CH', 'HK', 'SG', 'JP'],
      },
    });

    console.log('✅ Checkout session created successfully!');
    console.log('🔗 Session ID:', checkoutSession.id);
    console.log('🔗 Checkout URL:', checkoutSession.url);

    // Log for debugging/monitoring
    console.log(`🎯 Checkout created: User=${session.user.email}, SessionID=${checkoutSession.id}, CustomerID=${customer.id}`);

    return NextResponse.json({
      success: true,
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
      customerId: customer.id,
      debug: {
        priceId: priceId,
        userEmail: session.user.email,
        origin: origin
      }
    });

  } catch (error) {
    console.error('❌ Stripe checkout creation failed:', error);
    
    // Return more specific error messages based on error type
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Stripe authentication failed. Please check your STRIPE_SECRET_KEY.' }, 
        { status: 500 }
      );
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      console.error('❌ Invalid request details:', {
        code: error.code,
        param: error.param,
        message: error.message
      });
      
      if (error.code === 'resource_missing') {
        return NextResponse.json(
          { error: `Price ID "${process.env.STRIPE_PRICE_ID}" not found. Please create this price in your Stripe dashboard.` }, 
          { status: 400 }
        );
      }
      
      if (error.param === 'line_items[0].price') {
        return NextResponse.json(
          { error: `Invalid price ID "${process.env.STRIPE_PRICE_ID}". Please check your Stripe dashboard.` }, 
          { status: 400 }
        );
      }
      
      // Handle tax-related errors specifically
      if (error.message.includes('Automatic tax calculation')) {
        return NextResponse.json(
          { error: 'Tax configuration issue. Please try again or contact support.' }, 
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: `Stripe error: ${error.message}. Please check your Stripe configuration.` }, 
        { status: 500 }
      );
    }
    
    if (error.type === 'StripeRateLimitError') {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' }, 
        { status: 429 }
      );
    }
    
    // Generic error with more details
    return NextResponse.json(
      { error: `Checkout creation failed: ${error.message}` }, 
      { status: 500 }
    );
  }
}
