import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Demo pro users for testing - 你可以在這裡添加測試用戶
const DEMO_PRO_USERS = [
  'demo@valuationpro.com',
  'pro@example.com'
];

export async function middleware(req: NextRequest) {
  // Only apply middleware to /report routes
  if (req.nextUrl.pathname.startsWith('/report')) {
    
    // Check if user has a session
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // If user is authenticated, handle authenticated user logic
    if (token?.email) {
      const response = NextResponse.next();
      
      // Check if user has paid subscription (直接檢查，不要動態導入)
      const isPaidUser = DEMO_PRO_USERS.includes(token.email);
      
      if (isPaidUser) {
        // Paid users get unlimited access
        console.log(`[Middleware] Pro user ${token.email} - unlimited access`);
        return response;
      }
      
      // Free authenticated users get 5 total views per month
      const authUsageCookie = req.cookies.get('auth_usage');
      let authUsage = 0;
      const now = new Date();
      const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      
      if (authUsageCookie) {
        try {
          const usageData = JSON.parse(authUsageCookie.value);
          
          // Reset if different month
          if (usageData.month === thisMonth) {
            authUsage = usageData.count || 0;
          } else {
            authUsage = 0;
          }
        } catch (e) {
          authUsage = 0;
        }
      }
      
      // Check if this is a stock change request
      const url = new URL(req.url);
      const hasTickerParam = url.searchParams.has('ticker') || url.pathname !== '/report';
      
      // If they've used all 5 views, redirect to upgrade page
      if (hasTickerParam && authUsage >= 5) {
        console.log(`[Middleware] Auth user exceeded 5 views - usage: ${authUsage}`);
        const upgradeUrl = new URL('/upgrade', req.url);
        upgradeUrl.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
        upgradeUrl.searchParams.set('reason', 'monthly_limit');
        return NextResponse.redirect(upgradeUrl);
      }
      
      // If accessing a stock and haven't exceeded limit, increment counter
      if (hasTickerParam && authUsage < 5) {
        const newUsageData = {
          month: thisMonth,
          count: authUsage + 1,
          timestamp: now.toISOString(),
          userEmail: token.email
        };
        
        response.cookies.set('auth_usage', JSON.stringify(newUsageData), {
          maxAge: 60 * 60 * 24 * 31, // 31 days
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        
        console.log(`[Middleware] Incrementing auth usage:`, newUsageData);
      }
      
      return response;
    }
    
    // For unauthenticated users, handle free usage (2 views before login required)
    const response = NextResponse.next();
    
    // Check if this is a stock change request (has ticker parameter)
    const url = new URL(req.url);
    const hasTickerParam = url.searchParams.has('ticker') || url.pathname !== '/report';
    
    // Get current free usage from cookie
    const freeUsageCookie = req.cookies.get('free_usage');
    let freeUsage = 0;
    let currentMonth = '';
    
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    if (freeUsageCookie) {
      try {
        const usageData = JSON.parse(freeUsageCookie.value);
        
        // Reset if different month
        if (usageData.month === thisMonth) {
          freeUsage = usageData.count || 0;
          currentMonth = usageData.month;
        } else {
          freeUsage = 0;
          currentMonth = thisMonth;
        }
      } catch (e) {
        console.log('[Middleware] Invalid cookie, resetting');
        freeUsage = 0;
        currentMonth = thisMonth;
      }
    } else {
      currentMonth = thisMonth;
    }
    
    // If this is a stock change and they've used 2 free views, redirect to login
    if (hasTickerParam && freeUsage >= 2) {
      console.log(`[Middleware] Redirecting to login - usage: ${freeUsage}/2`);
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
      loginUrl.searchParams.set('reason', 'free_limit');
      return NextResponse.redirect(loginUrl);
    }
    
    // If this is their first visit to /report (no ticker), allow it
    if (!hasTickerParam) {
      console.log(`[Middleware] First visit to /report - allowing access`);
      return response;
    }
    
    // If they're trying to view a stock and haven't used 2 free views, increment counter
    if (hasTickerParam && freeUsage < 2) {
      const newUsageData = {
        month: currentMonth,
        count: freeUsage + 1,
        timestamp: now.toISOString()
      };
      
      response.cookies.set('free_usage', JSON.stringify(newUsageData), {
        maxAge: 60 * 60 * 24 * 31, // 31 days
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      
      console.log(`[Middleware] Setting free usage cookie:`, newUsageData);
    }
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: ['/report/:path*']
};
