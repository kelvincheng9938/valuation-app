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
        { error: 'Price configuration missing' }, 
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
        { error: 'Invalid price configuration' }, 
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

    // Create checkout session
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
      // Add customer email in session for extra verification
      customer_email: session.user.email,
      // Add automatic tax calculation if applicable
      automatic_tax: {
        enabled: true,
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
    });

  } catch (error) {
    console.error('❌ Stripe checkout creation failed:', error);
    
    // Return more specific error messages based on error type
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Payment system authentication failed. Please contact support.' }, 
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
          { error: 'Price configuration not found. Please contact support.' }, 
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: 'Invalid payment configuration. Please contact support.' }, 
        { status: 500 }
      );
    }
    
    if (error.type === 'StripeRateLimitError') {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' }, 
        { status: 429 }
      );
    }
    
    // Generic error
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again in a few moments.' }, 
      { status: 500 }
    );
  }
}
