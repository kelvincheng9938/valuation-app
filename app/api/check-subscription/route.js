// app/api/check-subscription/route.js - DATABASE VERSION
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasActiveSubscription } from '@/lib/subscription';

export async function GET(request) {
  try {
    // Get user email from session or header
    let userEmail = null;
    
    const internalRequest = request.headers.get('x-internal-request');
    if (internalRequest) {
      // Internal request from middleware
      userEmail = request.headers.get('x-user-email');
    } else {
      // External request - check session
      const session = await getServerSession(authOptions);
      userEmail = session?.user?.email;
    }
    
    if (!userEmail) {
      return NextResponse.json({
        isAuthenticated: false,
        isActive: false,
        email: null
      });
    }

    // 🔥 CHECK DATABASE
    const isActive = await hasActiveSubscription(userEmail);
    
    console.log(`🔍 [API] Database subscription check for ${userEmail}: ${isActive}`);

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
    });
  }
}
