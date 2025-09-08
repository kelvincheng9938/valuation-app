import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// FIXED: Use static imports
import {
  getSubscriptionStore,
  addDemoProUser,
  removeDemoProUser,
  hasActiveSubscription
} from '@/lib/subscription';

export async function GET(request) {
  try {
    // Get current demo users and subscription store
    const storeData = getSubscriptionStore();
    
    return NextResponse.json({
      success: true,
      data: storeData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error getting demo users:', error);
    return NextResponse.json(
      { error: 'Failed to get demo users' }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // For security, require authentication in production
    if (process.env.NODE_ENV === 'production') {
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json(
          { error: 'Authentication required' }, 
          { status: 401 }
        );
      }
    }

    const { action, email } = await request.json();

    if (!action || !email) {
      return NextResponse.json(
        { error: 'Action and email are required' }, 
        { status: 400 }
      );
    }

    let result = {};

    switch (action) {
      case 'add':
        addDemoProUser(email);
        result = {
          success: true,
          message: `Added demo pro user: ${email}`,
          email: email,
          action: 'added'
        };
        break;

      case 'remove':
        removeDemoProUser(email);
        result = {
          success: true,
          message: `Removed demo pro user: ${email}`,
          email: email,
          action: 'removed'
        };
        break;

      case 'check':
        const isActive = await hasActiveSubscription(email);
        result = {
          success: true,
          email: email,
          hasActiveSubscription: isActive,
          action: 'checked'
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: add, remove, or check' }, 
          { status: 400 }
        );
    }

    // Add current store data for reference
    result.currentStore = getSubscriptionStore();
    result.timestamp = new Date().toISOString();

    console.log(`✅ Demo user management: ${action} for ${email}`);

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error managing demo users:', error);
    return NextResponse.json(
      { error: 'Failed to manage demo users' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    // Clear all demo users and subscription store
    const storeData = getSubscriptionStore();
    
    // Remove all demo pro users
    storeData.demoProUsers.forEach(email => {
      removeDemoProUser(email);
    });

    return NextResponse.json({
      success: true,
      message: 'Cleared all demo users and subscription data',
      clearedUsers: storeData.demoProUsers.length,
      clearedSubscriptions: Object.keys(storeData.store).length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error clearing demo data:', error);
    return NextResponse.json(
      { error: 'Failed to clear demo data' }, 
      { status: 500 }
    );
  }
}
