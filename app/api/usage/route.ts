import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const MAX_PER_MONTH = 5;

// Simple in-memory storage (in production, use Redis or Database)
// Format: { "email-YYYY-MM": usageCount }
const usageStore = new Map<string, number>();

function getMonthKey(email: string, date: Date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${email}-${year}-${month}`;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const op = searchParams.get('op') || 'peek';

    // Get user from JWT token
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token?.email) {
      return NextResponse.json(
        { ok: false, reason: 'unauthorized' }, 
        { status: 401 }
      );
    }

    const email = token.email.toLowerCase();
    const monthKey = getMonthKey(email);
    const currentUsage = usageStore.get(monthKey) || 0;
    const remaining = Math.max(0, MAX_PER_MONTH - currentUsage);

    if (op === 'peek') {
      return NextResponse.json({ 
        ok: true, 
        count: currentUsage, 
        remaining: remaining,
        limit: MAX_PER_MONTH 
      });
    }

    if (op === 'consume') {
      if (currentUsage >= MAX_PER_MONTH) {
        return NextResponse.json(
          { 
            ok: false, 
            count: currentUsage, 
            remaining: 0, 
            limit: MAX_PER_MONTH,
            message: 'Monthly limit exceeded'
          },
          { status: 429 }
        );
      }

      // Increment usage
      const newUsage = currentUsage + 1;
      usageStore.set(monthKey, newUsage);
      
      return NextResponse.json({ 
        ok: true, 
        count: newUsage, 
        remaining: MAX_PER_MONTH - newUsage,
        limit: MAX_PER_MONTH 
      });
    }

    return NextResponse.json(
      { ok: false, reason: 'Invalid operation' }, 
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Usage API error:', error);
    return NextResponse.json(
      { ok: false, reason: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
