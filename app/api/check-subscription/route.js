// app/api/check-subscription/route.js - ADD HEADER SUPPORT
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasActiveSubscription } from '@/lib/subscription';

export async function GET(request) {
  try {
    // Get user email from session OR from middleware header
    let userEmail = null;
    
    const internalRequest = request.headers.get('x-internal-request');
    if (internalRequest) {
      // Internal request from middleware
      userEmail = request.headers.get('x-user-email');
      console.log(`🔍 [API] Internal request for: ${userEmail}`);
    } else {
      // External request - check session
      const session = await getServerSession(authOptions);
      userEmail = session?.user?.email;
      console.log(`🔍 [API] External request for: ${userEmail}`);
    }
    
    if (!userEmail) {
      console.log(`❌ [API] No email found`);
      return NextResponse.json({
        isAuthenticated: false,
        isActive: false,
        email: null
      });
    }

    // Check database subscription
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
    }, { status: 500 });
  }
}
