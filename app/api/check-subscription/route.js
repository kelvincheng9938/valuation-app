// app/api/check-subscription/route.js - FIXED VERSION
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasActiveSubscription } from '@/lib/subscription';

export async function GET(request) {
  try {
    // Get user email from session
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    
    if (!userEmail) {
      return NextResponse.json({
        isAuthenticated: false,
        isActive: false,
        email: null
      });
    }

    // Check database subscription
    const isActive = await hasActiveSubscription(userEmail);
    
    console.log(`🔍 [API] Subscription check for ${userEmail}: ${isActive}`);

    return NextResponse.json({
      isAuthenticated: true,
      isActive: isActive,
      email: userEmail,
      isPro: isActive,
      source: 'database'
    });

  } catch (error) {
    console.error('❌ [API] Error checking subscription:', error);
    return NextResponse.json({
      isAuthenticated: false,
      isActive: false,
      email: null,
      error: error.message
    }, { status: 500 });
  }
}
