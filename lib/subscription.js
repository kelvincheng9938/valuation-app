// lib/subscription.js - Demo subscription system

// ADD YOUR EMAIL HERE FOR UNLIMITED ACCESS TESTING
const DEMO_PRO_USERS = [
  'demo@valuationpro.com',
  kelvincheng9938@gmail.com,
  // ADD YOUR EMAIL HERE to test unlimited access:
  
];

// Simple in-memory store for demo
let subscriptionStore = {};

/**
 * Check if a user has an active Pro subscription
 */
export async function hasActiveSubscription(userEmail) {
  if (!userEmail) return false;
  
  try {
    // Check demo pro users first
    if (DEMO_PRO_USERS.includes(userEmail)) {
      console.log(`✅ Pro user detected: ${userEmail}`);
      return true;
    }
    
    // Check in-memory store for Stripe subscriptions
    const subscription = subscriptionStore[userEmail];
    if (!subscription) {
      console.log(`❌ No subscription found for: ${userEmail}`);
      return false;
    }
    
    // Check if subscription is active and not expired
    const now = new Date();
    const isActive = subscription.status === 'active';
    const notExpired = !subscription.currentPeriodEnd || 
                      new Date(subscription.currentPeriodEnd) > now;
    
    const hasActive = isActive && notExpired;
    console.log(`${hasActive ? '✅' : '❌'} Subscription check for ${userEmail}: active=${isActive}, notExpired=${notExpired}`);
    
    return hasActive;
    
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}

/**
 * Update user's subscription status (called by Stripe webhooks)
 */
export async function updateUserSubscription(userEmail, subscriptionData) {
  try {
    subscriptionStore[userEmail] = {
      ...subscriptionData,
      updatedAt: new Date().toISOString(),
    };
    
    console.log(`✅ Subscription updated for ${userEmail}:`, subscriptionData);
    
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

/**
 * Get user's subscription details
 */
export async function getUserSubscription(userEmail) {
  if (!userEmail) return null;
  
  try {
    // Check demo pro users
    if (DEMO_PRO_USERS.includes(userEmail)) {
      return {
        status: 'active',
        planId: 'demo_pro',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        source: 'demo'
      };
    }
    
    return subscriptionStore[userEmail] || null;
    
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
}

/**
 * Cancel user's subscription
 */
export async function cancelUserSubscription(userEmail) {
  try {
    const subscription = subscriptionStore[userEmail];
    if (subscription) {
      subscriptionStore[userEmail] = {
        ...subscription,
        status: 'canceled',
        canceledAt: new Date().toISOString(),
      };
    }
    
    console.log(`❌ Subscription canceled for ${userEmail}`);
    
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Get subscription status for middleware
 */
export async function getSubscriptionStatus(userEmail) {
  try {
    const hasActive = await hasActiveSubscription(userEmail);
    const subscription = await getUserSubscription(userEmail);
    
    return {
      isActive: hasActive,
      isPro: hasActive,
      subscription: subscription,
      needsUpgrade: !hasActive,
    };
    
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return {
      isActive: false,
      isPro: false,
      subscription: null,
      needsUpgrade: true,
    };
  }
}

/**
 * Demo functions for testing
 */
export function addDemoProUser(userEmail) {
  if (!DEMO_PRO_USERS.includes(userEmail)) {
    DEMO_PRO_USERS.push(userEmail);
    console.log(`✅ Added demo pro user: ${userEmail}`);
  }
}

export function removeDemoProUser(userEmail) {
  const index = DEMO_PRO_USERS.indexOf(userEmail);
  if (index > -1) {
    DEMO_PRO_USERS.splice(index, 1);
    console.log(`❌ Removed demo pro user: ${userEmail}`);
  }
}

// Export for debugging
export function getSubscriptionStore() {
  return {
    store: subscriptionStore,
    demoProUsers: [...DEMO_PRO_USERS],
  };
}
