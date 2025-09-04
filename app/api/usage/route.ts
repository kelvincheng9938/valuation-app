import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from 'next-auth';
import crypto from 'crypto';

const MAX_PER_MONTH = 5;
const COOKIE_NAME = 'vp_usage_v1';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 40; // 40 days
const SECRET = process.env.NEXTAUTH_SECRET || 'dev-secret';

// Usage map type: { [key: string]: number }
type UsageMap = Record<string, number>;

function hmac(data: string) {
  return crypto.createHmac('sha256', SECRET).update(data).digest('hex');
}

function readUsage(): { map: UsageMap; sig: string | null } {
  const c = cookies().get(COOKIE_NAME)?.value;
  if (!c) return { map: {}, sig: null };
  try {
    const parsed = JSON.parse(c);
    const { map, sig } = parsed;
    const raw = JSON.stringify(map || {});
    if (sig && sig === hmac(raw)) return { map: map || {}, sig };
    return { map: {}, sig: null };
  } catch {
    return { map: {}, sig: null };
  }
}

function writeUsage(map: UsageMap) {
  const raw = JSON.stringify(map);
  const sig = hmac(raw);
  cookies().set(COOKIE_NAME, JSON.stringify({ map, sig }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  });
}

function ymKey(date: Date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${y}${m}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const op = searchParams.get('op') || 'peek';

  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, reason: 'unauthorized' }, { status: 401 });
  }

  const email = session.user.email.toLowerCase();
  const emailHash = crypto.createHash('sha256').update(email).digest('hex').slice(0, 12);
  const key = `${ymKey()}-${emailHash}`;

  const { map } = readUsage();
  const current = map[key] || 0;

  if (op === 'peek') {
    return NextResponse.json({ ok: true, count: current, remaining: Math.max(0, MAX_PER_MONTH - current) });
  }

  if (op === 'consume') {
    if (current >= MAX_PER_MONTH) {
      return NextResponse.json(
        { ok: false, count: current, remaining: 0, limit: MAX_PER_MONTH },
        { status: 429 }
      );
    }
    map[key] = current + 1;
    writeUsage(map);
    return NextResponse.json({ ok: true, count: map[key], remaining: MAX_PER_MONTH - map[key] });
  }

  return NextResponse.json({ ok: false, reason: 'bad op' }, { status: 400 });
}
