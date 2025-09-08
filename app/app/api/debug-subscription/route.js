// ========== app/api/debug-subscription/route.js ==========
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// FIXED: Use static imports instead of dynamic
import { 
  hasActiveSubscription, 
  getSubscriptionStore, 
  debugSubscriptions,
  addManualProUser,
  updateUserSubscription
} from '@/lib/subscription';

export async function GET(request) {
  try {
    // Get current session
    const session = await getServerSession(authOptions);
    
    // Debug all subscription data
    const debugData = debugSubscriptions();
    
    // Check current user's subscription status
    let currentUserStatus = null;
    if (session?.user?.email) {
      const isActive = await hasActiveSubscription(session.user.email);
      currentUserStatus = {
        email: session.user.email,
        hasActiveSubscription: isActive,
      };
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      currentUser: currentUserStatus,
      debugData: debugData,
      instructions: {
        manualFix: 'POST to this endpoint with {"action": "add", "email": "your@email.com"} to manually add Pro access',
        checkStatus: 'GET this endpoint to see current subscription status',
        clearAll: 'POST with {"action": "clear"} to reset all subscriptions'
      }
    });

  } catch (error) {
    console.error('Debug subscription error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { action, email } = await request.json();
    
    let result = {};

    switch (action) {
      case 'add':
        if (!email) {
          return NextResponse.json({ error: 'Email required for add action' }, { status: 400 });
        }
        
        // Manually add user as Pro
        const subscription = addManualProUser(email);
        
        // Verify it worked
        const isActive = await hasActiveSubscription(email);
        
        result = {
          success: true,
          action: 'added',
          email: email,
          subscription: subscription,
          verified: isActive,
          message: `✅ ${email} now has unlimited Pro access!`
        };
        break;

      case 'stripe':
        if (!email) {
          return NextResponse.json({ error: 'Email required for stripe action' }, { status: 400 });
        }
        
        // Add as if they paid via Stripe
        await updateUserSubscription(email, {
          status: 'active',
          planId: process.env.STRIPE_PRICE_ID || 'price_test',
          stripeCustomerId: 'cus_test_' + Date.now(),
          stripeSubscriptionId: 'sub_test_' + Date.now(),
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          source: 'stripe_manual'
        });
        
        const isActiveStripe = await hasActiveSubscription(email);
        
        result = {
          success: true,
          action: 'stripe_added',
          email: email,
          verified: isActiveStripe,
          message: `✅ ${email} added as Stripe Pro user!`
        };
        break;

      case 'clear':
        // Clear all subscriptions (for testing)
        const store = getSubscriptionStore();
        Object.keys(store.store).forEach(email => {
          delete store.store[email];
        });
        
        result = {
          success: true,
          action: 'cleared',
          message: 'All subscriptions cleared!'
        };
        break;

      case 'check':
        if (!email) {
          return NextResponse.json({ error: 'Email required for check action' }, { status: 400 });
        }
        
        const status = await hasActiveSubscription(email);
        const store = getSubscriptionStore();
        
        result = {
          success: true,
          action: 'checked',
          email: email,
          hasActiveSubscription: status,
          inStore: email in store.store,
          storeData: store.store[email] || null,
          isDemoUser: store.demoProUsers.includes(email)
        };
        break;

      default:
        return NextResponse.json({ error: 'Invalid action. Use: add, stripe, clear, check' }, { status: 400 });
    }

    // Add current store state
    result.currentStore = getSubscriptionStore();
    result.timestamp = new Date().toISOString();

    return NextResponse.json(result);

  } catch (error) {
    console.error('Subscription management error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// ========== app/api/manage-demo-users/route.js ==========
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// FIXED: Use static imports
import {
  getSubscriptionStore,
  addDemoProUser,
  removeDemoProUser,
  hasActiveSubscription
} from '@/lib/subscription';

export async function GET(request) {
  try {
    // Get current demo users and subscription store
    const storeData = getSubscriptionStore();
    
    return NextResponse.json({
      success: true,
      data: storeData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error getting demo users:', error);
    return NextResponse.json(
      { error: 'Failed to get demo users' }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // For security, require authentication in production
    if (process.env.NODE_ENV === 'production') {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { error: 'Authentication required' }, 
          { status: 401 }
        );
      }
    }

    const { action, email } = await request.json();

    if (!action || !email) {
      return NextResponse.json(
        { error: 'Action and email are required' }, 
        { status: 400 }
      );
    }

    let result = {};

    switch (action) {
      case 'add':
        addDemoProUser(email);
        result = {
          success: true,
          message: `Added demo pro user: ${email}`,
          email: email,
          action: 'added'
        };
        break;

      case 'remove':
        removeDemoProUser(email);
        result = {
          success: true,
          message: `Removed demo pro user: ${email}`,
          email: email,
          action: 'removed'
        };
        break;

      case 'check':
        const isActive = await hasActiveSubscription(email);
        result = {
          success: true,
          email: email,
          hasActiveSubscription: isActive,
          action: 'checked'
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: add, remove, or check' }, 
          { status: 400 }
        );
    }

    // Add current store data for reference
    result.currentStore = getSubscriptionStore();
    result.timestamp = new Date().toISOString();

    console.log(`✅ Demo user management: ${action} for ${email}`);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error managing demo users:', error);
    return NextResponse.json(
      { error: 'Failed to manage demo users' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Clear all demo users and subscription store
    const storeData = getSubscriptionStore();
    
    // Remove all demo pro users
    storeData.demoProUsers.forEach(email => {
      removeDemoProUser(email);
    });

    return NextResponse.json({
      success: true,
      message: 'Cleared all demo users and subscription data',
      clearedUsers: storeData.demoProUsers.length,
      clearedSubscriptions: Object.keys(storeData.store).length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error clearing demo data:', error);
    return NextResponse.json(
      { error: 'Failed to clear demo data' }, 
      { status: 500 }
    );
  }
}

// ========== app/api/webhooks/stripe/route.js ==========
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
