// middleware.js - DATABASE VERSION
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  console.log(`[Middleware] ${req.method} ${req.nextUrl.pathname}${req.nextUrl.search}`);
  
  // Only apply to /report routes
  if (!req.nextUrl.pathname.startsWith('/report')) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    const response = NextResponse.next();
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const hasTickerParam = req.nextUrl.searchParams.get('ticker');

    // AUTHENTICATED USER FLOW
    if (token?.email) {
      console.log(`[Middleware] Authenticated user: ${token.email}`);
      
      // 🔥 CHECK DATABASE SUBSCRIPTION via API
      try {
        const baseUrl = req.nextUrl.origin;
        const checkUrl = `${baseUrl}/api/check-subscription`;
        
        const subscriptionResponse = await fetch(checkUrl, {
          method: 'GET',
          headers: {
            'x-internal-request': 'true',
            'x-user-email': token.email,
          },
        });
        
        if (subscriptionResponse.ok) {
          const { isActive } = await subscriptionResponse.json();
          
          if (isActive) {
            console.log(`[Middleware] ✅ PRO USER (Database) - unlimited access: ${token.email}`);
            return response;
          }
        }
      } catch (error) {
        console.error('[Middleware] Subscription check failed:', error);
      }

      // Handle free authenticated users (5 per month)
      const authUsageCookie = req.cookies.get('auth_usage');
      let authUsage = 0;

      if (authUsageCookie) {
        try {
          const usageData = JSON.parse(authUsageCookie.value);
          if (usageData.month === currentMonth) {
            authUsage = usageData.count || 0;
          }
        } catch (e) {
          authUsage = 0;
        }
      }

      console.log(`[Middleware] Free user usage: ${authUsage}/5`);

      if (hasTickerParam && authUsage >= 5) {
        console.log(`[Middleware] User exceeded limit - redirect to upgrade`);
        const upgradeUrl = new URL('/upgrade', req.url);
        upgradeUrl.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
        upgradeUrl.searchParams.set('reason', 'monthly_limit');
        return NextResponse.redirect(upgradeUrl);
      }

      if (hasTickerParam && authUsage < 5) {
        const newUsageData = {
          month: currentMonth,
          count: authUsage + 1,
          timestamp: now.toISOString()
        };

        response.cookies.set('auth_usage', JSON.stringify(newUsageData), {
          maxAge: 60 * 60 * 24 * 31,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });

        console.log(`[Middleware] Usage incremented to: ${newUsageData.count}`);
      }

      return response;
    }

    // UNAUTHENTICATED USER FLOW (same as before)
    console.log(`[Middleware] Unauthenticated user`);

    const freeUsageCookie = req.cookies.get('free_usage');
    let freeUsage = 0;

    if (freeUsageCookie) {
      try {
        const usageData = JSON.parse(freeUsageCookie.value);
        if (usageData.month === currentMonth) {
          freeUsage = usageData.count || 0;
        }
      } catch (e) {
        freeUsage = 0;
      }
    }

    if (hasTickerParam && freeUsage >= 2) {
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
      loginUrl.searchParams.set('reason', 'free_limit');
      return NextResponse.redirect(loginUrl);
    }

    if (hasTickerParam && freeUsage < 2) {
      const newUsageData = {
        month: currentMonth,
        count: freeUsage + 1,
        timestamp: now.toISOString()
      };

      response.cookies.set('free_usage', JSON.stringify(newUsageData), {
        maxAge: 60 * 60 * 24 * 31,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    }

    return response;

  } catch (error) {
    console.error('[Middleware] Error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/report/:path*']
};
