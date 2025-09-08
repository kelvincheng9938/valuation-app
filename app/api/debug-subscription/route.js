import { NextResponse } from 'next/server';
import { getSubscriptionStore, hasActiveSubscription } from '@/lib/subscription';

export async function POST(request) {
  const { action, email } = await request.json();
  let result;

  switch (action) {
    case 'clear': {
      // Clear all subscriptions (for testing)
      const store = getSubscriptionStore();
      Object.keys(store.store).forEach(email => {
        delete store.store[email];
      });

      result = {
        success: true,
        action: 'cleared',
        message: 'All subscriptions cleared!'
      };
      break;
    }

    case 'check': {
      if (!email) {
        return NextResponse.json(
          { error: 'Email required for check action' },
          { status: 400 }
        );
      }

      const status = await hasActiveSubscription(email);
      const store = getSubscriptionStore();

      result = {
        success: true,
        status,
        store
      };
      break;
    }

    default: {
      result = {
        success: false,
        error: 'Unknown action'
      };
    }
  }

  return NextResponse.json(result);
}
