import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(request) {
  try {
    // Check authentication
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Get free usage cookie
    const cookies = request.cookies;
    const freeUsageCookie = cookies.get('free_usage');
    
    let freeUsageData = null;
    if (freeUsageCookie) {
      try {
        freeUsageData = JSON.parse(freeUsageCookie.value);
      } catch (e) {
        freeUsageData = { error: 'Invalid cookie format' };
      }
    }

    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    return NextResponse.json({
      authenticated: !!token,
      userEmail: token?.email || null,
      freeUsageCookie: freeUsageData,
      currentMonth,
      isCurrentMonth: freeUsageData?.month === currentMonth,
      hasUsedFreeView: freeUsageData?.count >= 1,
      timestamp: now.toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
