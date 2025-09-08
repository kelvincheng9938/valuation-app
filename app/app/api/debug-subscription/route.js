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
