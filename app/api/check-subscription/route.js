import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasActiveSubscription } from '@/lib/subscription';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({
        isAuthenticated: false,
        isActive: false,
        email: null
      });
    }

    const isActive = await hasActiveSubscription(session.user.email);
    
    console.log(`🔍 Subscription check for ${session.user.email}: ${isActive}`);

    return NextResponse.json({
      isAuthenticated: true,
      isActive: isActive,
      email: session.user.email,
      isPro: isActive
    });

  } catch (error) {
    console.error('❌ Error checking subscription:', error);
    return NextResponse.json({
      isAuthenticated: false,
      isActive: false,
      email: null,
      error: error.message
    });
  }
}
