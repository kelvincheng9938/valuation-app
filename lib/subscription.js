// lib/subscription.js - Subscription Status Management
// This is a simple in-memory solution for demo purposes
// In production, you should use a proper database (MongoDB, PostgreSQL, Supabase, etc.)

// Simple in-memory store for demo purposes
// In production, replace this with your database
let subscriptionStore = new Map();

// Demo subscription data - replace with database queries
const DEMO_PRO_USERS = [
  'demo@valuationpro.com',
  'pro@example.com',
  // Add demo pro users here for testing
];

/**
 * Check if a user has an active Pro subscription
 * @param {string} userEmail - User's email address
 * @returns {Promise<boolean>} - Whether user has active subscription
 */
export async function hasActiveSubscription(userEmail) {
  if (!userEmail) return false;
  
  try {
    // For demo purposes, check demo pro users
    if (DEMO_PRO_USERS.includes(userEmail)) {
      return true;
    }
    
    // Check in-memory store (in production, this would be a database query)
    const subscription = subscriptionStore.get(userEmail);
    
    if (!subscription) {
      return false;
    }
    
    // Check if subscription is active and not expired
    const now = new Date();
    const isActive = subscription.status === 'active';
    const notExpired = !subscription.currentPeriodEnd || new Date(subscription.currentPeriodEnd) > now;
    
    return isActive && notExpired;
    
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}

/**
 * Update user's subscription status
 * @param {string} userEmail - User's email address
 * @param {Object} subscriptionData - Subscription data from Stripe
 */
export async function updateUserSubscription(userEmail, subscriptionData) {
  try {
    // In production, this would be a database update
    subscriptionStore.set(userEmail, {
      ...subscriptionData,
      updatedAt: new Date().toISOString(),
    });
    
    console.log(`✅ Subscription updated for ${userEmail}:`, subscriptionData);
    
    // TODO: In production, implement actual database update
    // Example with different databases:
    
    // MongoDB with Mongoose:
    // await User.findOneAndUpdate(
    //   { email: userEmail },
    //   { 
    //     $set: { 
    //       subscription: subscriptionData,
    //       updatedAt: new Date()
    //     }
    //   },
    //   { upsert: true }
    // );
    
    // PostgreSQL with Prisma:
    // await prisma.user.upsert({
    //   where: { email: userEmail },
    //   update: { subscription: subscriptionData },
    //   create: { 
    //     email: userEmail, 
    //     subscription: subscriptionData 
    //   }
    // });
    
    // Supabase:
    // const { error } = await supabase
    //   .from('user_subscriptions')
    //   .upsert({
    //     user_email: userEmail,
    //     ...subscriptionData,
    //     updated_at: new Date()
    //   });
    
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

/**
 * Get user's subscription details
 * @param {string} userEmail - User's email address
 * @returns {Promise<Object|null>} - Subscription details or null
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
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        source: 'demo'
      };
    }
    
    // Check in-memory store (replace with database query)
    const subscription = subscriptionStore.get(userEmail);
    return subscription || null;
    
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
}

/**
 * Cancel user's subscription
 * @param {string} userEmail - User's email address
 */
export async function cancelUserSubscription(userEmail) {
  try {
    const subscription = subscriptionStore.get(userEmail);
    if (subscription) {
      subscriptionStore.set(userEmail, {
        ...subscription,
        status: 'canceled',
        canceledAt: new Date().toISOString(),
      });
    }
    
    console.log(`❌ Subscription canceled for ${userEmail}`);
    
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

/**
 * Check subscription status for middleware
 * @param {string} userEmail - User's email address
 * @returns {Promise<Object>} - Subscription status object
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
 * Demo function to add a pro user (for testing)
 * @param {string} userEmail - User's email address
 */
export function addDemoProUser(userEmail) {
  if (!DEMO_PRO_USERS.includes(userEmail)) {
    DEMO_PRO_USERS.push(userEmail);
    console.log(`✅ Added demo pro user: ${userEmail}`);
  }
}

/**
 * Demo function to remove a pro user (for testing)
 * @param {string} userEmail - User's email address
 */
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
    store: Object.fromEntries(subscriptionStore),
    demoProUsers: [...DEMO_PRO_USERS],
  };
}
