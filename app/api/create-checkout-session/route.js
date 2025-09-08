import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

// Initialize Stripe with error handling
let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
  }
  
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
} catch (error) {
  console.error('❌ Stripe initialization failed:', error.message);
}

export async function POST(request) {
  try {
    // Check if Stripe is properly initialized
    if (!stripe) {
      return NextResponse.json(
        { error: 'Payment system not configured properly' }, 
        { status: 500 }
      );
    }

    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    console.log('🔐 Creating checkout for user:', session.user.email);

    const body = await request.json();
    const priceId = body.priceId || process.env.STRIPE_PRICE_ID;
    
    if (!priceId) {
      console.error('❌ No price ID found');
      return NextResponse.json(
        { error: 'Price ID not configured' }, 
        { status: 400 }
      );
    }

    console.log('💰 Using price ID:', priceId);
    
    // Create or retrieve Stripe customer
    let customer;
    try {
      console.log('👤 Looking for existing customer:', session.user.email);
      
      // Check if customer already exists
      const customers = await stripe.customers.list({
        email: session.user.email,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customer = customers.data[0];
        console.log('✅ Found existing customer:', customer.id);
      } else {
        console.log('🆕 Creating new customer');
        // Create new customer
        customer = await stripe.customers.create({
          email: session.user.email,
          name: session.user.name,
          metadata: {
            userId: session.user.email,
          },
        });
        console.log('✅ Created new customer:', customer.id);
      }
    } catch (error) {
      console.error('❌ Error with customer:', error);
      return NextResponse.json(
        { error: 'Failed to process customer information' }, 
        { status: 500 }
      );
    }

    console.log('🛒 Creating checkout session...');

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
      success_url: `${request.headers.get('origin')}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/upgrade?canceled=true`,
      metadata: {
        userId: session.user.email,
      },
      subscription_data: {
        metadata: {
          userId: session.user.email,
        },
      },
    });

    console.log('✅ Checkout session created:', checkoutSession.id);

    return NextResponse.json({
      sessionId: checkoutSession.id,
      url: checkoutSession.url,
    });

  } catch (error) {
    console.error('❌ Stripe checkout error:', error);
    
    // Return more specific error messages
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json(
        { error: 'Payment system authentication failed. Please contact support.' }, 
        { status: 500 }
      );
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid payment configuration. Please contact support.' }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' }, 
      { status: 500 }
    );
  }
}
