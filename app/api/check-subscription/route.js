// app/api/check-subscription/route.js
import { NextResponse } from 'next/server';
import { hasActiveSubscription } from '@/lib/subscription';

export async function GET(request) {
  try {
    // Security check - only allow internal requests from middleware
    const isInternalRequest = request.headers.get('x-internal-request') === 'true';
    if (!isInternalRequest && process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    // Check subscription status
    const isActive = await hasActiveSubscription(email);

    return NextResponse.json({
      email: email,
      isActive: isActive,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error checking subscription:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription', details: error.message },
      { status: 500 }
    );
  }
}
