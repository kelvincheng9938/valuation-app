// app/api/webhooks/stripe/route.js - PERSISTENT VERSION
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateUserSubscription, cancelUserSubscription } from '@/lib/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    console.log(`🔔 [WEBHOOK] Processing: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionCreated(event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object);
        break;
        
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
        
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
        
      default:
        console.log(`ℹ️ [WEBHOOK] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('❌ [WEBHOOK] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session) {
  console.log('🎉 [WEBHOOK] Checkout completed:', session.id);
  
  try {
    // Get customer details
    const customer = await stripe.customers.retrieve(session.customer);
    const userEmail = customer.email;
    
    if (session.subscription) {
      // Get subscription details
      const subscription = await stripe.subscriptions.retrieve(session.subscription);
      
      // 🔥 IMMEDIATELY STORE IN DATABASE
      await updateUserSubscription(userEmail, {
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        planId: subscription.items.data[0].price.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
        source: 'stripe_checkout',
        activatedAt: new Date().toISOString(),
      });
      
      console.log(`✅ [WEBHOOK] INSTANT ACTIVATION: ${userEmail} now has Pro access!`);
    }
    
  } catch (error) {
    console.error('❌ [WEBHOOK] Error handling checkout:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log('🎉 [WEBHOOK] Subscription created/updated:', subscription.id);
  
  try {
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    await updateUserSubscription(userEmail, {
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      planId: subscription.items.data[0].price.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
      source: 'stripe_webhook',
      updatedAt: new Date().toISOString(),
    });
    
    console.log(`✅ [WEBHOOK] Subscription stored for: ${userEmail}`);
    
  } catch (error) {
    console.error('❌ [WEBHOOK] Error handling subscription:', error);
    throw error;
  }
}

async function handleSubscriptionCanceled(subscription) {
  console.log('❌ [WEBHOOK] Subscription canceled:', subscription.id);
  
  try {
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    await cancelUserSubscription(userEmail);
    
    console.log(`✅ [WEBHOOK] Subscription canceled for: ${userEmail}`);
    
  } catch (error) {
    console.error('❌ [WEBHOOK] Error handling cancellation:', error);
    throw error;
  }
}

async function handlePaymentSucceeded(invoice) {
  console.log('💰 [WEBHOOK] Payment succeeded:', invoice.id);
  
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    // Update subscription to ensure it's active
    await updateUserSubscription(userEmail, {
      status: 'active',
      lastPaymentAt: new Date().toISOString(),
      lastInvoiceId: invoice.id,
    });
    
    console.log(`✅ [WEBHOOK] Payment confirmed for: ${userEmail}`);
  }
}

async function handlePaymentFailed(invoice) {
  console.log('💸 [WEBHOOK] Payment failed:', invoice.id);
  // TODO: Handle failed payments (send email, update status, etc.)
}
