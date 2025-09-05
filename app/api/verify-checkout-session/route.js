import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' }, 
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    });

    // Verify the session belongs to the authenticated user
    if (checkoutSession.customer.email !== session.user.email) {
      return NextResponse.json(
        { error: 'Session does not belong to user' }, 
        { status: 403 }
      );
    }

    // Check if payment was successful
    if (checkoutSession.payment_status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' }, 
        { status: 400 }
      );
    }

    // Get subscription details
    let subscriptionInfo = null;
    if (checkoutSession.subscription) {
      const subscription = checkoutSession.subscription;
      subscriptionInfo = {
        id: subscription.id,
        status: subscription.status,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        plan_id: subscription.items.data[0].price.id,
      };
    }

    // TODO: Update user's subscription status in your database
    // Example:
    // await updateUserSubscription(session.user.email, {
    //   stripeCustomerId: checkoutSession.customer.id,
    //   stripeSubscriptionId: subscriptionInfo?.id,
    //   status: 'active',
    //   planId: subscriptionInfo?.plan_id,
    //   currentPeriodStart: new Date(subscriptionInfo?.current_period_start * 1000),
    //   currentPeriodEnd: new Date(subscriptionInfo?.current_period_end * 1000),
    // });

    return NextResponse.json({
      success: true,
      payment_status: checkoutSession.payment_status,
      customer_email: checkoutSession.customer.email,
      subscription: subscriptionInfo,
      amount_total: checkoutSession.amount_total,
      currency: checkoutSession.currency,
    });

  } catch (error) {
    console.error('Error verifying checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to verify session' }, 
      { status: 500 }
    );
  }
}
