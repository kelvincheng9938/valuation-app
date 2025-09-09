import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateUserSubscription, hasActiveSubscription } from '@/lib/subscription';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function GET(request) {
  try {
    console.log('🔍 Verifying checkout session and activating subscription...');
    
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

    console.log(`🔍 Retrieving checkout session: ${sessionId}`);

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    });

    console.log(`✅ Checkout session retrieved for customer: ${checkoutSession.customer.email}`);

    // Verify the session belongs to the authenticated user
    if (checkoutSession.customer.email !== session.user.email) {
      console.error(`❌ Email mismatch: session=${checkoutSession.customer.email}, user=${session.user.email}`);
      return NextResponse.json(
        { error: 'Session does not belong to user' }, 
        { status: 403 }
      );
    }

    // Check if payment was successful
    if (checkoutSession.payment_status !== 'paid') {
      console.error(`❌ Payment not completed. Status: ${checkoutSession.payment_status}`);
      return NextResponse.json(
        { error: 'Payment not completed' }, 
        { status: 400 }
      );
    }

    console.log(`✅ Payment confirmed for: ${session.user.email}`);

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

      console.log(`📋 Subscription details:`, subscriptionInfo);

      // 🔥 IMMEDIATE ACTIVATION - Update user's subscription status
      console.log(`🚀 ACTIVATING SUBSCRIPTION for ${session.user.email}...`);
      
      await updateUserSubscription(session.user.email, {
        stripeCustomerId: checkoutSession.customer.id,
        stripeSubscriptionId: subscription.id,
        status: 'active',
        planId: subscription.items.data[0].price.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        source: 'checkout_verification',
        activatedAt: new Date().toISOString(),
      });

      // 🔍 Verify activation worked
      const isNowActive = await hasActiveSubscription(session.user.email);
      console.log(`🎉 ACTIVATION VERIFICATION: ${session.user.email} active = ${isNowActive}`);
      
      if (!isNowActive) {
        console.error(`❌ ACTIVATION FAILED for ${session.user.email}`);
        return NextResponse.json(
          { error: 'Failed to activate subscription' }, 
          { status: 500 }
        );
      }

      console.log(`🎉 SUCCESS: ${session.user.email} now has unlimited Pro access!`);
    }

    return NextResponse.json({
      success: true,
      payment_status: checkoutSession.payment_status,
      customer_email: checkoutSession.customer.email,
      subscription: subscriptionInfo,
      amount_total: checkoutSession.amount_total,
      currency: checkoutSession.currency,
      activated: true,
      message: 'Subscription successfully activated!'
    });

  } catch (error) {
    console.error('❌ Error verifying checkout session and activating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to verify session and activate subscription' }, 
      { status: 500 }
    );
  }
}
