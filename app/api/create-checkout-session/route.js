import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

// Initialize Stripe
let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }
  
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
    if (!stripe) {
      return NextResponse.json({ error: 'Payment system not configured' }, { status: 500 });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return NextResponse.json({ error: 'Price not configured' }, { status: 500 });
    }

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Please sign in first' }, { status: 401 });
    }

    console.log('🔐 Creating checkout for:', session.user.email);

    const priceId = process.env.STRIPE_PRICE_ID;
    console.log('💰 Using Price ID:', priceId);

    // Create or find customer
    let customer;
    try {
      const customers = await stripe.customers.list({
        email: session.user.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customer = customers.data[0];
        console.log('✅ Found existing customer:', customer.id);
      } else {
        customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name || session.user.email,
          metadata: {
            source: 'valuation_pro',
            created_at: new Date().toISOString(),
          },
        });
        console.log('✅ Created new customer:', customer.id);
      }
    } catch (customerError) {
      console.error('❌ Customer error:', customerError);
      return NextResponse.json({ error: 'Failed to process customer' }, { status: 500 });
    }

    // Get origin for redirects
    const origin = request.headers.get('origin') || 'https://www.valuation-pro.com';

    // 🔥 STABLE CHECKOUT SESSION - NO TAX COMPLICATIONS
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
        source: 'valuation_pro',
      },
      subscription_data: {
        metadata: {
          userId: session.user.email,
          userEmail: session.user.email,
          source: 'valuation_pro',
        },
      },
      // Collect billing address (required for most countries)
      billing_address_collection: 'required',
      
      // 🔥 DISABLED AUTOMATIC TAX - NO MORE TAX ISSUES
      automatic_tax: {
        enabled: false,
      },
      
      // Allow promotion codes
      allow_promotion_codes: true,
    });

    console.log('✅ Stable checkout session created!');
    console.log('🔗 Session ID:', checkoutSession.id);

    return NextResponse.json({
      success: true,
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
      customerId: customer.id,
    });

  } catch (error) {
    console.error('❌ Checkout creation failed:', error);
    
    // Specific error handling
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json({ error: 'Stripe authentication failed' }, { status: 500 });
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      if (error.code === 'resource_missing') {
        return NextResponse.json({ error: 'Price not found in Stripe' }, { status: 400 });
      }
    }
    
    return NextResponse.json({ error: 'Checkout failed. Please try again.' }, { status: 500 });
  }
}
