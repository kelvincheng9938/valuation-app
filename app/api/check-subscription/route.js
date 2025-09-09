import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasActiveSubscription } from '@/lib/subscription';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    
    if (!userEmail) {
      return NextResponse.json({
        isAuthenticated: false,
        isActive: false,
        email: null
      });
    }

    const isActive = await hasActiveSubscription(userEmail);
    
    return NextResponse.json({
      isAuthenticated: true,
      isActive: isActive,
      email: userEmail,
      isPro: isActive
    });

  } catch (error) {
    return NextResponse.json({
      error: error.message
    }, { status: 500 });
  }
}
