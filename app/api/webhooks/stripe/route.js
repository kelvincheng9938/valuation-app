import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
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
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
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
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log('🎉 Subscription created:', subscription.id);
  
  try {
    // Get customer details
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    // TODO: Update user status in your database
    // Example:
    // await updateUserSubscription(userEmail, {
    //   stripeCustomerId: customer.id,
    //   stripeSubscriptionId: subscription.id,
    //   status: 'active',
    //   planId: subscription.items.data[0].price.id,
    //   currentPeriodStart: new Date(subscription.current_period_start * 1000),
    //   currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    // });
    
    console.log(`✅ Subscription activated for user: ${userEmail}`);
    
    // Clear usage cookies for this user (they now have unlimited access)
    // This would be handled in your database update logic
    
  } catch (error) {
    console.error('Error handling subscription created:', error);
    throw error;
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log('🔄 Subscription updated:', subscription.id);
  
  try {
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    // TODO: Update subscription status in database
    // await updateUserSubscription(userEmail, {
    //   status: subscription.status,
    //   currentPeriodStart: new Date(subscription.current_period_start * 1000),
    //   currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    // });
    
    console.log(`✅ Subscription updated for user: ${userEmail}`);
    
  } catch (error) {
    console.error('Error handling subscription updated:', error);
    throw error;
  }
}

async function handleSubscriptionCanceled(subscription) {
  console.log('❌ Subscription canceled:', subscription.id);
  
  try {
    const customer = await stripe.customers.retrieve(subscription.customer);
    const userEmail = customer.email;
    
    // TODO: Update user status to canceled in database
    // await updateUserSubscription(userEmail, {
    //   status: 'canceled',
    //   canceledAt: new Date(),
    // });
    
    console.log(`✅ Subscription canceled for user: ${userEmail}`);
    
  } catch (error) {
    console.error('Error handling subscription canceled:', error);
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
    
    // TODO: Log payment in database, send confirmation email, etc.
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

// TODO: Implement these database functions
// async function updateUserSubscription(email, subscriptionData) {
//   // Update user subscription status in your database
//   // This could be MongoDB, PostgreSQL, Supabase, etc.
// }

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
