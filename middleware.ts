import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Only protect /report routes
  if (req.nextUrl.pathname.startsWith('/report')) {
    try {
      const token = await getToken({ 
        req, 
        secret: process.env.NEXTAUTH_SECRET 
      });
      
      if (!token) {
        // Redirect to login with return URL
        const url = new URL('/login', req.url);
        url.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Middleware auth error:', error);
      // On error, redirect to login
      const url = new URL('/login', req.url);
      url.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = { 
  matcher: [
    '/report/:path*',
    // Exclude API routes and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};
