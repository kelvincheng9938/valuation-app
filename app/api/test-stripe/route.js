// app/api/test-stripe/route.js - Simple Stripe API Test
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET() {
  try {
    console.log('=== STRIPE API TEST ===');
    
    // Check environment variables
    const hasSecretKey = !!process.env.STRIPE_SECRET_KEY;
    const hasPriceId = !!process.env.STRIPE_PRICE_ID;
    
    console.log('Environment check:');
    console.log('- STRIPE_SECRET_KEY exists:', hasSecretKey);
    console.log('- STRIPE_PRICE_ID exists:', hasPriceId);
    
    if (!hasSecretKey || !hasPriceId) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        hasSecretKey,
        hasPriceId
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });
    
    console.log('✅ Stripe initialized');

    // Test 1: Retrieve the price
    const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE_ID);
    console.log('✅ Price retrieved:', price.id, price.active);

    // Test 2: List products
    const products = await stripe.products.list({ limit: 3 });
    console.log('✅ Products listed:', products.data.length);

    // Test 3: List customers (just to test API access)
    const customers = await stripe.customers.list({ limit: 1 });
    console.log('✅ Customers listed:', customers.data.length);

    return NextResponse.json({
      success: true,
      message: 'Stripe API is working correctly',
      tests: {
        priceRetrieved: {
          id: price.id,
          active: price.active,
          currency: price.currency,
          amount: price.unit_amount
        },
        productsCount: products.data.length,
        customersCount: customers.data.length,
        apiKeyType: process.env.STRIPE_SECRET_KEY.startsWith('sk_live_') ? 'live' : 'test'
      }
    });

  } catch (error) {
    console.error('❌ Stripe API test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      type: error.type,
      code: error.code,
      statusCode: error.statusCode
    }, { status: 500 });
  }
}
