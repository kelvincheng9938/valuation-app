// app/api/debug-stripe-keys/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  console.log('🔍 Starting comprehensive Stripe key validation...');
  
  const results = {
    environment: {},
    keyValidation: {},
    stripeConnection: {},
    priceValidation: {},
    errors: []
  };

  // Step 1: Check environment variables
  console.log('📋 Checking environment variables...');
  results.environment = {
    hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
    hasPublishableKey: !!process.env.STRIPE_PUBLISHABLE_KEY,
    hasPriceId: !!process.env.STRIPE_PRICE_ID,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    secretKeyPreview: process.env.STRIPE_SECRET_KEY ? 
      process.env.STRIPE_SECRET_KEY.substring(0, 15) + '...' : null,
    publishableKeyPreview: process.env.STRIPE_PUBLISHABLE_KEY ? 
      process.env.STRIPE_PUBLISHABLE_KEY.substring(0, 15) + '...' : null,
    priceId: process.env.STRIPE_PRICE_ID
  };

  // Step 2: Validate key formats
  console.log('🔑 Validating key formats...');
  if (process.env.STRIPE_SECRET_KEY) {
    const secretKey = process.env.STRIPE_SECRET_KEY.trim();
    results.keyValidation.secretKey = {
      isLiveMode: secretKey.startsWith('sk_live_'),
      isTestMode: secretKey.startsWith('sk_test_'),
      hasCorrectPrefix: secretKey.startsWith('sk_'),
      length: secretKey.length,
      expectedLength: secretKey.startsWith('sk_live_') ? 107 : 107 // Both should be ~107 chars
    };
    
    if (!secretKey.startsWith('sk_')) {
      results.errors.push('❌ Secret key must start with sk_live_ or sk_test_');
    }
    if (secretKey.length < 100) {
      results.errors.push('❌ Secret key seems too short - might be incomplete');
    }
  }

  if (process.env.STRIPE_PUBLISHABLE_KEY) {
    const pubKey = process.env.STRIPE_PUBLISHABLE_KEY.trim();
    results.keyValidation.publishableKey = {
      isLiveMode: pubKey.startsWith('pk_live_'),
      isTestMode: pubKey.startsWith('pk_test_'),
      hasCorrectPrefix: pubKey.startsWith('pk_'),
      length: pubKey.length
    };
    
    if (!pubKey.startsWith('pk_')) {
      results.errors.push('❌ Publishable key must start with pk_live_ or pk_test_');
    }
  }

  if (process.env.STRIPE_PRICE_ID) {
    const priceId = process.env.STRIPE_PRICE_ID.trim();
    results.keyValidation.priceId = {
      isLiveMode: priceId.startsWith('price_') && !priceId.includes('test'),
      isTestMode: priceId.includes('test'),
      hasCorrectPrefix: priceId.startsWith('price_'),
      value: priceId
    };
    
    if (!priceId.startsWith('price_')) {
      results.errors.push('❌ Price ID must start with price_');
    }
  }

  // Step 3: Test Stripe connection
  if (process.env.STRIPE_SECRET_KEY && results.keyValidation.secretKey?.hasCorrectPrefix) {
    console.log('🔌 Testing Stripe API connection...');
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim(), {
        apiVersion: '2023-10-16',
      });
      
      // Test API call
      const account = await stripe.accounts.retrieve();
      results.stripeConnection = {
        success: true,
        accountId: account.id,
        country: account.country,
        accountType: account.type,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        requirementsEnabled: account.requirements?.currently_due?.length === 0
      };
      
      console.log('✅ Stripe connection successful');
      
      // Check account status
      if (!account.charges_enabled) {
        results.errors.push('⚠️ Account cannot accept charges - verification required');
      }
      if (!account.payouts_enabled) {
        results.errors.push('⚠️ Account cannot receive payouts - verification required');
      }
      if (account.requirements?.currently_due?.length > 0) {
        results.errors.push(`⚠️ Account has ${account.requirements.currently_due.length} requirements pending`);
      }
      
    } catch (error) {
      console.error('❌ Stripe connection failed:', error);
      results.stripeConnection = {
        success: false,
        error: error.message,
        type: error.type,
        code: error.code
      };
      
      if (error.type === 'StripeAuthenticationError') {
        results.errors.push('❌ Authentication failed - API key is invalid or expired');
      } else if (error.type === 'StripePermissionError') {
        results.errors.push('❌ Permission denied - API key lacks required permissions');
      } else {
        results.errors.push(`❌ Stripe error: ${error.message}`);
      }
    }
  }

  // Step 4: Test price retrieval
  if (results.stripeConnection.success && process.env.STRIPE_PRICE_ID) {
    console.log('💰 Testing price retrieval...');
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim(), {
        apiVersion: '2023-10-16',
      });
      
      const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID.trim());
      results.priceValidation = {
        success: true,
        priceId: price.id,
        active: price.active,
        currency: price.currency,
        amount: price.unit_amount,
        interval: price.recurring?.interval,
        productId: price.product
      };
      
      if (!price.active) {
        results.errors.push('⚠️ Price exists but is not active');
      }
      
      console.log('✅ Price validation successful');
      
    } catch (error) {
      console.error('❌ Price retrieval failed:', error);
      results.priceValidation = {
        success: false,
        error: error.message,
        type: error.type
      };
      
      if (error.type === 'StripeInvalidRequestError' && error.code === 'resource_missing') {
        results.errors.push('❌ Price ID not found in your Stripe account');
      } else {
        results.errors.push(`❌ Price error: ${error.message}`);
      }
    }
  }

  // Step 5: Overall assessment
  results.overall = {
    allKeysPresent: results.environment.hasSecretKey && 
                   results.environment.hasPublishableKey && 
                   results.environment.hasPriceId,
    stripeWorking: results.stripeConnection.success,
    priceWorking: results.priceValidation.success,
    readyForCheckout: results.stripeConnection.success && 
                     results.priceValidation.success && 
                     results.stripeConnection.chargesEnabled,
    errorCount: results.errors.length
  };

  console.log('📊 Validation complete. Errors:', results.errors.length);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    ...results
  });
}
