// app/api/webhooks/stripe/route.js - WORKING VERSION
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateUserSubscription, cancelUserSubscription } from '@/lib/subscription';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  console.log('🔔 [WEBHOOK] Received webhook request');
  
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('❌ [WEBHOOK] No signature header');
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // If webhook secret is not set, skip verification for now
    let event;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        console.log('✅ [WEBHOOK] Signature verified');
      } catch (err) {
        console.error('❌ [WEBHOOK] Signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } else {
      // Parse without verification (temporary for debugging)
      event = JSON.parse(body);
      console.log('⚠️ [WEBHOOK] Processing without signature verification (webhook secret not set)');
    }

    console.log(`🔔 [WEBHOOK] Processing event: ${event.type}`);

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
        
      default:
        console.log(`ℹ️ [WEBHOOK] Unhandled event type: ${event.type}`);
    }

    console.log('✅ [WEBHOOK] Event processed successfully');
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('❌ [WEBHOOK] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed', details: error.message }, 
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session) {
  console.log('🎉 [WEBHOOK] Checkout completed:', session.id);
  
  try {
    // Get customer details
    let customer;
    if (typeof session.customer === 'string') {
      customer = await stripe.customers.retrieve(session.customer);
    } else {
      customer = session.customer;
    }
    
    const userEmail = customer.email;
    console.log(`👤 [WEBHOOK] Customer email: ${userEmail}`);
    
    if (session.subscription) {
      // Get subscription details
      let subscription;
      if (typeof session.subscription === 'string') {
        subscription = await stripe.subscriptions.retrieve(session.subscription);
      } else {
        subscription = session.subscription;
      }
      
      console.log(`📋 [WEBHOOK] Subscription ID: ${subscription.id}`);
      
      // Store in database immediately
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
      
      console.log(`🎉 [WEBHOOK] SUCCESS: ${userEmail} now has Pro access!`);
    }
    
  } catch (error) {
    console.error('❌ [WEBHOOK] Error in handleCheckoutCompleted:', error);
    throw error;
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log('🎉 [WEBHOOK] Subscription created/updated:', subscription.id);
  
  try {
    let customer;
    if (typeof subscription.customer === 'string') {
      customer = await stripe.customers.retrieve(subscription.customer);
    } else {
      customer = subscription.customer;
    }
    
    const userEmail = customer.email;
    console.log(`👤 [WEBHOOK] Customer email: ${userEmail}`);
    
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
    console.error('❌ [WEBHOOK] Error in handleSubscriptionCreated:', error);
    throw error;
  }
}

async function handleSubscriptionCanceled(subscription) {
  console.log('❌ [WEBHOOK] Subscription canceled:', subscription.id);
  
  try {
    let customer;
    if (typeof subscription.customer === 'string') {
      customer = await stripe.customers.retrieve(subscription.customer);
    } else {
      customer = subscription.customer;
    }
    
    const userEmail = customer.email;
    await cancelUserSubscription(userEmail);
    
    console.log(`✅ [WEBHOOK] Subscription canceled for: ${userEmail}`);
    
  } catch (error) {
    console.error('❌ [WEBHOOK] Error in handleSubscriptionCanceled:', error);
    throw error;
  }
}

async function handlePaymentSucceeded(invoice) {
  console.log('💰 [WEBHOOK] Payment succeeded:', invoice.id);
  
  try {
    if (invoice.subscription) {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
      const customer = await stripe.customers.retrieve(subscription.customer);
      const userEmail = customer.email;
      
      // Ensure subscription is active after payment
      await updateUserSubscription(userEmail, {
        status: 'active',
        lastPaymentAt: new Date().toISOString(),
        lastInvoiceId: invoice.id,
      });
      
      console.log(`✅ [WEBHOOK] Payment confirmed for: ${userEmail}`);
    }
  } catch (error) {
    console.error('❌ [WEBHOOK] Error in handlePaymentSucceeded:', error);
    throw error;
  }
}
