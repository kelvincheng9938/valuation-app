import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(request) {
  try {
    // Check authentication
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Get subscription status if authenticated
    let subscriptionStatus = null;
    if (token?.email) {
      try {
        const { getSubscriptionStatus } = await import('@/lib/subscription');
        subscriptionStatus = await getSubscriptionStatus(token.email);
      } catch (error) {
        console.error('Error getting subscription status:', error);
      }
    }

    // Get both usage cookies
    const cookies = request.cookies;
    const freeUsageCookie = cookies.get('free_usage');
    const authUsageCookie = cookies.get('auth_usage');
    
    let freeUsageData = null;
    let authUsageData = null;
    
    if (freeUsageCookie) {
      try {
        freeUsageData = JSON.parse(freeUsageCookie.value);
      } catch (e) {
        freeUsageData = { error: 'Invalid cookie format' };
      }
    }
    
    if (authUsageCookie) {
      try {
        authUsageData = JSON.parse(authUsageCookie.value);
      } catch (e) {
        authUsageData = { error: 'Invalid cookie format' };
      }
    }

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Calculate usage status
    const freeUsageStatus = freeUsageData ? {
      isCurrentMonth: freeUsageData.month === currentMonth,
      hasExceededLimit: (freeUsageData.count || 0) >= 2,
      remaining: Math.max(0, 2 - (freeUsageData.count || 0))
    } : {
      isCurrentMonth: true,
      hasExceededLimit: false,
      remaining: 2
    };

    const authUsageStatus = authUsageData ? {
      isCurrentMonth: authUsageData.month === currentMonth,
      hasExceededLimit: (authUsageData.count || 0) >= 5,
      remaining: Math.max(0, 5 - (authUsageData.count || 0))
    } : {
      isCurrentMonth: true,
      hasExceededLimit: false,
      remaining: 5
    };

    return NextResponse.json({
      authenticated: !!token,
      userEmail: token?.email || null,
      currentMonth,
      
      // Subscription status
      subscription: subscriptionStatus,
      
      // Free usage (unauthenticated)
      freeUsage: {
        cookie: freeUsageData,
        status: freeUsageStatus,
        limit: 2,
        description: 'Free demo reports (no login required)'
      },
      
      // Authenticated usage
      authUsage: {
        cookie: authUsageData,
        status: authUsageStatus,
        limit: 5,
        description: 'Monthly analyses after login'
      },
      
      // Overall user status
      userStatus: {
        canViewReports: subscriptionStatus?.isActive || 
                       (token ? !authUsageStatus.hasExceededLimit : !freeUsageStatus.hasExceededLimit),
        needsLogin: !token && freeUsageStatus.hasExceededLimit,
        needsUpgrade: token && !subscriptionStatus?.isActive && authUsageStatus.hasExceededLimit,
        isPro: subscriptionStatus?.isActive || false,
        totalAnalysesUsed: (freeUsageData?.count || 0) + (authUsageData?.count || 0)
      },
      
      timestamp: now.toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Helper endpoint to clear usage cookies (for testing)
export async function DELETE(request) {
  try {
    const response = NextResponse.json({ 
      message: 'Usage cookies cleared',
      timestamp: new Date().toISOString()
    });
    
    // Clear both cookies
    response.cookies.set('free_usage', '', {
      maxAge: 0,
      path: '/'
    });
    
    response.cookies.set('auth_usage', '', {
      maxAge: 0,
      path: '/'
    });
    
    return response;
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
