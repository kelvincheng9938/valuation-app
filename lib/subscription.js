// lib/subscription.js - FINAL KV VERSION
import { kv } from '@vercel/kv';

// Demo pro users (only for testing - remove these once you're satisfied with the system)
const DEMO_PRO_USERS = [
  'kelvincheng9938@gmail.com',  // Remove this once you test the real system
];

/**
 * 🔥 PERSISTENT: Check if user has active subscription (survives deployments)
 */
export async function hasActiveSubscription(userEmail) {
  if (!userEmail) return false;
  
  try {
    console.log(`🔍 [KV] Checking subscription for: ${userEmail}`);
    
    // Temporary demo users check (remove once stable)
    if (DEMO_PRO_USERS.includes(userEmail)) {
      console.log(`✅ [DEMO] Demo Pro user: ${userEmail}`);
      return true;
    }
    
    // Check persistent KV database
    const subscription = await kv.get(`subscription:${userEmail}`);
    
    if (!subscription) {
      console.log(`❌ [KV] No subscription found for: ${userEmail}`);
      return false;
    }
    
    // Verify subscription is active and not expired
    const now = new Date();
    const isActive = subscription.status === 'active';
    const notExpired = !subscription.currentPeriodEnd || 
                      new Date(subscription.currentPeriodEnd) > now;
    
    const hasActive = isActive && notExpired;
    
    console.log(`${hasActive ? '✅' : '❌'} [KV] Subscription for ${userEmail}:`);
    console.log(`   - Status: ${subscription.status}`);
    console.log(`   - Expires: ${subscription.currentPeriodEnd}`);
    console.log(`   - Source: ${subscription.source}`);
    
    return hasActive;
    
  } catch (error) {
    console.error('❌ [KV] Error checking subscription:', error);
    return false;
  }
}

/**
 * 🔥 PERSISTENT: Store subscription in database (called by Stripe webhooks)
 */
export async function updateUserSubscription(userEmail, subscriptionData) {
  try {
    console.log(`📝 [KV] Storing subscription for ${userEmail}:`, subscriptionData);
    
    const subscriptionRecord = {
      ...subscriptionData,
      email: userEmail,
      updatedAt: new Date().toISOString(),
      storedIn: 'vercel_kv'
    };
    
    // Store in persistent database with 2-year expiry
    await kv.set(
      `subscription:${userEmail}`, 
      subscriptionRecord,
      { ex: 60 * 60 * 24 * 365 * 2 } // 2 years
    );
    
    console.log(`✅ [KV] Subscription persisted for ${userEmail}`);
    
    // Verify it was saved
    const saved = await kv.get(`subscription:${userEmail}`);
    console.log(`🔍 [KV] Verification - saved data exists: ${!!saved}`);
    
    return subscriptionRecord;
    
  } catch (error) {
    console.error('❌ [KV] Error storing subscription:', error);
    throw error;
  }
}

/**
 * 🔥 PERSISTENT: Get subscription details from database
 */
export async function getUserSubscription(userEmail) {
  if (!userEmail) return null;
  
  try {
    // Check demo users first
    if (DEMO_PRO_USERS.includes(userEmail)) {
      return {
        status: 'active',
        planId: 'demo_pro',
        source: 'demo',
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      };
    }
    
    // Get from persistent database
    const subscription = await kv.get(`subscription:${userEmail}`);
    console.log(`🔍 [KV] Retrieved subscription for ${userEmail}:`, subscription ? 'Found' : 'Not found');
    
    return subscription;
    
  } catch (error) {
    console.error('❌ [KV] Error getting subscription:', error);
    return null;
  }
}

/**
 * 🔥 PERSISTENT: Cancel subscription in database
 */
export async function cancelUserSubscription(userEmail) {
  try {
    const existing = await kv.get(`subscription:${userEmail}`);
    
    if (existing) {
      const canceled = {
        ...existing,
        status: 'canceled',
        canceledAt: new Date().toISOString()
      };
      
      await kv.set(`subscription:${userEmail}`, canceled);
      console.log(`✅ [KV] Subscription canceled for ${userEmail}`);
    }
    
  } catch (error) {
    console.error('❌ [KV] Error canceling subscription:', error);
    throw error;
  }
}

/**
 * 🔥 DEBUGGING: Get all subscription data (admin only)
 */
export async function getAllSubscriptions() {
  try {
    // Get all subscription keys
    const keys = [];
    let cursor = 0;
    
    do {
      const result = await kv.scan(cursor, { match: 'subscription:*' });
      cursor = result[0];
      keys.push(...result[1]);
    } while (cursor !== 0);
    
    // Get all subscription data
    const subscriptions = [];
    for (const key of keys) {
      const data = await kv.get(key);
      if (data) {
        subscriptions.push({
          email: key.replace('subscription:', ''),
          ...data
        });
      }
    }
    
    return {
      total: subscriptions.length,
      subscriptions: subscriptions,
      demoUsers: DEMO_PRO_USERS
    };
    
  } catch (error) {
    console.error('❌ [KV] Error getting all subscriptions:', error);
    return { total: 0, subscriptions: [], demoUsers: DEMO_PRO_USERS };
  }
}

/**
 * 🔥 MANUAL: Force add a user as Pro (emergency use only)
 */
export async function forceAddProUser(userEmail, reason = 'manual') {
  try {
    const subscription = {
      status: 'active',
      planId: 'manual_pro',
      source: `manual_${reason}`,
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    };
    
    await updateUserSubscription(userEmail, subscription);
    console.log(`✅ [MANUAL] Force added Pro user: ${userEmail}`);
    
    return subscription;
    
  } catch (error) {
    console.error('❌ [MANUAL] Error force adding Pro user:', error);
    throw error;
  }
}
