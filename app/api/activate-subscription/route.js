import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateUserSubscription, hasActiveSubscription } from '@/lib/subscription';

export async function POST(request) {
  try {
    console.log('🚀 Manual subscription activation requested...');
    
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
    console.log(`🔍 Activating subscription for: ${userEmail}`);

    // Check if already active
    const isAlreadyActive = await hasActiveSubscription(userEmail);
    if (isAlreadyActive) {
      console.log(`✅ User already has active subscription: ${userEmail}`);
      return NextResponse.json({
        success: true,
        message: 'Subscription already active',
        isActive: true
      });
    }

    // Activate subscription manually
    await updateUserSubscription(userEmail, {
      status: 'active',
      planId: 'manual_activation',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      source: 'manual_activation',
      activatedAt: new Date().toISOString(),
    });

    // Verify activation
    const isNowActive = await hasActiveSubscription(userEmail);
    
    if (isNowActive) {
      console.log(`🎉 SUCCESS: Manual activation complete for ${userEmail}`);
      return NextResponse.json({
        success: true,
        message: 'Subscription successfully activated!',
        isActive: true
      });
    } else {
      console.error(`❌ Manual activation failed for ${userEmail}`);
      return NextResponse.json(
        { error: 'Activation failed' }, 
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error during manual activation:', error);
    return NextResponse.json(
      { error: 'Failed to activate subscription' }, 
      { status: 500 }
    );
  }
}
