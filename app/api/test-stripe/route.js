// app/api/test-stripe/route.js - 測試 Stripe 連接
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  try {
    console.log('=== STRIPE API TEST ===');
    
    // Check environment variables
    const hasSecretKey = !!process.env.STRIPE_SECRET_KEY;
    const hasPriceId = !!process.env.STRIPE_PRICE_ID;
    const hasPublishableKey = !!process.env.STRIPE_PUBLISHABLE_KEY;
    
    console.log('Environment check:');
    console.log('- STRIPE_SECRET_KEY exists:', hasSecretKey);
    console.log('- STRIPE_PRICE_ID exists:', hasPriceId);
    console.log('- STRIPE_PUBLISHABLE_KEY exists:', hasPublishableKey);
    
    if (!hasSecretKey || !hasPriceId) {
      return NextResponse.json({
        success: false,
        error: 'Missing Stripe environment variables',
        details: {
          hasSecretKey,
          hasPriceId,
          hasPublishableKey
        }
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
    
    console.log('✅ Stripe initialized');

    // Test 1: Check if API key is valid
    console.log('Testing API key validity...');
    const account = await stripe.accounts.retrieve();
    console.log('✅ API key is valid for account:', account.id);

    // Test 2: Retrieve the price
    console.log('Testing price retrieval...');
    const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID);
    console.log('✅ Price retrieved:', price.id, 'Active:', price.active);

    // Test 3: List products
    console.log('Testing product listing...');
    const products = await stripe.products.list({ limit: 3 });
    console.log('✅ Products listed:', products.data.length);

    return NextResponse.json({
      success: true,
      message: '🎉 Your NEW Stripe API keys are working perfectly!',
      account: {
        id: account.id,
        country: account.country,
        business_type: account.business_type
      },
      price: {
        id: price.id,
        active: price.active,
        currency: price.currency,
        amount: price.unit_amount,
        amount_display: `${(price.unit_amount / 100).toFixed(2)}`,
        interval: price.recurring?.interval,
        product_name: 'ValuationPro Pro'
      },
      environment: {
        hasSecretKey: true,
        hasPriceId: true,
        hasPublishableKey,
        keyType: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? '🔴 LIVE MODE' : '🟡 TEST MODE',
        secretKeyPreview: process.env.STRIPE_SECRET_KEY?.substring(0, 20) + '...',
        priceIdUsed: process.env.STRIPE_PRICE_ID
      },
      productsCount: products.data.length,
      readyForCheckout: true
    });

  } catch (error) {
    console.error('❌ Stripe API test failed:', error);
    
    // Handle specific error types
    if (error.type === 'StripeAuthenticationError') {
      return NextResponse.json({
        success: false,
        error: '🔑 Authentication Error - Your Stripe API key is invalid or expired',
        details: {
          message: error.message,
          solution: 'Please get a new API key from Stripe Dashboard'
        }
      }, { status: 401 });
    }
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json({
        success: false,
        error: '❌ Invalid Request - Check your Price ID or API configuration',
        details: {
          message: error.message,
          code: error.code,
          param: error.param
        }
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    }, { status: 500 });
  }
}
