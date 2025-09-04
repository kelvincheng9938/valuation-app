// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'; // ← 由 'next-auth' 改成 '@/auth'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/report')) {
    const session = await auth();
    if (!session?.user) {
      const url = new URL('/login', req.url);
      url.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ['/report/:path*'] };
