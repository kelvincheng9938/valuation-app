import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// FIXED: Use static imports
import {
  updateUserSubscription,
  hasActiveSubscription,
  cancelUserSubscription,
  getSubscriptionStore
} from '@/lib/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  console.log('🎣 Stripe webhook received');
  
  if (!webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' }, 
      { status: 500 }
    );
  }

  let event;

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    console.log('✅ Webhook signature verified:', event.type);
  } catch (error) {
    console.error('❌ Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' }, 
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('🛒 Checkout session completed');
        await handleCheckoutCompleted(event.data.object);
        break;
        
      case 'customer.subscription.created':
        console.log('📝 Subscription created');
        await handleSubscriptionCreated(event.data.object);
        break;
        
      case 'customer.subscription.updated':
        console.log('🔄 Subscription updated');
        await handleSubscriptionUpdated(event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        console.log('❌ Subscription deleted');
        await handleSubscriptionCanceled(event.data.object);
        break;
        
      case 'invoice.payment_succeeded':
        console.log('💰 Payment succeeded');
        await handlePaymentSucceeded(event.data.object);
        break;
        
      case 'invoice.payment_failed':
        console.log('💸 Payment failed');
        await handlePaymentFailed(event.data.object);
        break;
        
      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}

// 🔥 Handle checkout completion (immediate activation)
async function handleCheckoutCompleted(checkoutSession) {
  console.log('🛒 Processing checkout completion:', checkoutSession.id);
  
  try {
    // Get customer details
    const customer = await stripe.customers.retrieve(checkoutSession.customer);
    const userEmail = customer.email;
    
    console.log(`✅ Checkout completed for user: ${userEmail}`);
    
    // If this is a subscription checkout, activate immediately
    if (checkoutSession.mode === 'subscription' && checkoutSession.subscription) {
      const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription);
      
      await updateUserSubscription(userEmail, {
        stripeCustomerId: customer.id,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        planId: subscription.items.data[0].price.id,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        source: 'stripe_checkout',
        checkoutSessionId: checkoutSession.id,
        activatedAt: new Date().toISOString(),
      });
      
      console.log(`🎉 IMMEDIATE ACTIVATION: ${userEmail} now has Pro access!`);
    }
    
  } catch (error) {
    console.error('❌ Error handling checkout completion:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log('🎉 Subscription created:', subscription.id);
  
  try {
    // Get customer details
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    await updateUserSubscription(userEmail, {
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      planId: subscription.items.data[0].price.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      source: 'stripe_webhook',
      createdAt: new Date().toISOString(),
    });
    
    console.log(`✅ Subscription activated for user: ${userEmail}`);
    
    // 🔥 Verify the activation worked
    const isActive = await hasActiveSubscription(userEmail);
    console.log(`🔍 Verification check: ${userEmail} active = ${isActive}`);
    
  } catch (error) {
    console.error('❌ Error handling subscription created:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log('🔄 Subscription updated:', subscription.id);
  
  try {
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    await updateUserSubscription(userEmail, {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      updatedAt: new Date().toISOString(),
    });
    
    console.log(`✅ Subscription updated for user: ${userEmail} - Status: ${subscription.status}`);
    
  } catch (error) {
    console.error('❌ Error handling subscription updated:', error);
    throw error;
  }
}

async function handleSubscriptionCanceled(subscription) {
  console.log('❌ Subscription canceled:', subscription.id);
  
  try {
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    await cancelUserSubscription(userEmail);
    
    console.log(`✅ Subscription canceled for user: ${userEmail}`);
    
  } catch (error) {
    console.error('❌ Error handling subscription canceled:', error);
    throw error;
  }
}

async function handlePaymentSucceeded(invoice) {
  console.log('💰 Payment succeeded:', invoice.id);
  
  if (invoice.subscription) {
    // This is a subscription payment
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    console.log(`✅ Payment succeeded for user: ${userEmail}`);
    
    await updateUserSubscription(userEmail, {
      status: 'active',
      lastPaymentAt: new Date().toISOString(),
      lastInvoiceId: invoice.id,
    });
    
    // Verify activation
    const isActive = await hasActiveSubscription(userEmail);
    console.log(`🔍 Payment verification: ${userEmail} active = ${isActive}`);
  }
}

async function handlePaymentFailed(invoice) {
  console.log('💸 Payment failed:', invoice.id);
  
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    console.log(`❌ Payment failed for user: ${userEmail}`);
    
    // TODO: Handle failed payment - send email, update status, etc.
  }
}

// Enable CORS for Stripe webhooks
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, stripe-signature',
    },
  });
}
