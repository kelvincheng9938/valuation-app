'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReportContent from '@/components/ReportContent';

function LimitBanner({ isFirstTime, usageInfo }) {
  const { data: session } = useSession();
  
  if (isFirstTime && !session) {
    return (
      <div className="mb-4 p-4 rounded-lg border border-blue-400/30 bg-blue-500/10">
        <div className="text-blue-400 font-semibold mb-2">🎯 Welcome to ValuationPro!</div>
        <div className="text-sm text-blue-300">
          You're viewing your <strong>free demo report</strong>. You can view <strong>2 free reports</strong> before signing in.
          {usageInfo && (
            <span className="ml-2 text-cyan-400">
              ({2 - usageInfo.freeUsed} remaining)
            </span>
          )}
        </div>
      </div>
    );
  }

  if (session && usageInfo?.authUsed < 5) {
    return (
      <div className="mb-4 p-4 rounded-lg border border-green-400/30 bg-green-500/10">
        <div className="text-green-400 font-semibold mb-2">👋 Welcome back, {session.user.name}!</div>
        <div className="text-sm text-green-300">
          You can view <strong>5 reports per month</strong> with your free account.
          <span className="ml-2 text-cyan-400">
            ({5 - usageInfo.authUsed} remaining this month)
          </span>
        </div>
      </div>
    );
  }
  
  return null;
}

function LoadingState() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="card p-8 text-center">
        <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-lg">Loading...</div>
      </div>
    </div>
  );
}

function getUsageInfo() {
  if (typeof window === 'undefined') return { freeUsed: 0, authUsed: 0 };

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  // Check free usage
  let freeUsed = 0;
  const freeUsageCookie = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('free_usage='));
  
  if (freeUsageCookie) {
    try {
      const freeUsageData = JSON.parse(decodeURIComponent(freeUsageCookie.split('=')[1]));
      if (freeUsageData.month === currentMonth) {
        freeUsed = freeUsageData.count || 0;
      }
    } catch (e) {
      freeUsed = 0;
    }
  }

  // Check auth usage
  let authUsed = 0;
  const authUsageCookie = document.cookie
    .split(';')
    .find(cookie => cookie.trim().startsWith('auth_usage='));
  
  if (authUsageCookie) {
    try {
      const authUsageData = JSON.parse(decodeURIComponent(authUsageCookie.split('=')[1]));
      if (authUsageData.month === currentMonth) {
        authUsed = authUsageData.count || 0;
      }
    } catch (e) {
      authUsed = 0;
    }
  }

  return { freeUsed, authUsed };
}

export default function ReportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [usageInfo, setUsageInfo] = useState({ freeUsed: 0, authUsed: 0 });

  const urlTicker = searchParams.get('ticker');

  useEffect(() => {
    if (status !== 'loading') {
      setUsageInfo(getUsageInfo());
      setLoading(false);
    }
  }, [status]);

  // Update usage info when ticker changes
  useEffect(() => {
    if (!loading) {
      setUsageInfo(getUsageInfo());
    }
  }, [urlTicker, loading]);

  if (loading || status === 'loading') {
    return <LoadingState />;
  }

  const isFirstView = !urlTicker && (!session ? usageInfo.freeUsed === 0 : usageInfo.authUsed === 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <LimitBanner isFirstTime={isFirstView} usageInfo={usageInfo} />
      <ReportContent />
    </div>
  );
}
