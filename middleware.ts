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
    
    // If user is authenticated, let them through
    if (token) {
      return NextResponse.next();
    }
    
    // For unauthenticated users, check their free usage
    const response = NextResponse.next();
    
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
        // Invalid cookie, reset
        freeUsage = 0;
        currentMonth = thisMonth;
      }
    } else {
      currentMonth = thisMonth;
    }
    
    // If they've already used their 1 free view, redirect to login
    if (freeUsage >= 1) {
      const url = new URL('/login', req.url);
      url.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
      url.searchParams.set('reason', 'free_limit');
      return NextResponse.redirect(url);
    }
    
    // Allow the first free view and increment counter
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
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: ['/report/:path*']
};
