import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Only apply middleware to /report routes
  if (req.nextUrl.pathname.startsWith('/report')) {
    
    // Check if user has a session
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    // If user is authenticated, let them through normally
    if (token) {
      return NextResponse.next();
    }
    
    // For unauthenticated users, handle free usage
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
    
    // If this is a stock change and they've already used their free view, redirect to login
    if (hasTickerParam && freeUsage >= 1) {
      console.log(`[Middleware] Redirecting to login - usage: ${freeUsage}`);
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
    
    // If they're trying to view a stock and haven't used their free view, increment counter
    if (hasTickerParam && freeUsage === 0) {
      const newUsageData = {
        month: currentMonth,
        count: 1,
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
