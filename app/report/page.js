'use client';
import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReportContent from '@/components/ReportContent';

function LimitBanner({ isFirstTime }) {
  if (isFirstTime) {
    return (
      <div className="mb-4 p-4 rounded-lg border border-blue-400/30 bg-blue-500/10">
        <div className="text-blue-400 font-semibold mb-2">🎯 Welcome to ValuationPro!</div>
        <div className="text-sm text-blue-300">
          You're viewing your <strong>free demo report</strong>. Want to analyze more stocks? Sign in with Google to get 5 analyses per month.
        </div>
      </div>
    );
  }
  return null;
}

function LoginPrompt({ onLogin, onSkip }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold mb-4">Ready for More Analysis?</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          You've used your <strong>2 free demo reports</strong>! Sign in with Google to unlock:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold text-cyan-400">5 Free Reports</div>
            <div className="text-sm text-gray-400">Per month</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-2xl mb-2">🏢</div>
            <div className="font-semibold text-green-400">43 Stocks</div>
            <div className="text-xs text-gray-400">Including HK listings</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-purple-400">Bloomberg Data</div>
            <div className="text-xs text-gray-400">Professional grade</div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onLogin}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google (Free)
          </button>

          <button
            onClick={onSkip}
            className="w-full text-gray-400 hover:text-white py-2 text-sm transition-colors"
          >
            Continue browsing (homepage only)
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          No spam, no credit card required. Just professional stock analysis.
        </div>
      </div>
    </div>
  );
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

function checkFreeUsage() {
  if (typeof window === 'undefined') return { hasUsed: false, count: 0 };

  const cookies = document.cookie.split(';');
  const freeUsageCookie = cookies.find(cookie => cookie.trim().startsWith('free_usage='));

  if (!freeUsageCookie) {
    return { hasUsed: false, count: 0 };
  }

  try {
    const cookieValue = decodeURIComponent(freeUsageCookie.split('=')[1]);
    const usageData = JSON.parse(cookieValue);
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    if (usageData.month !== currentMonth) {
      return { hasUsed: false, count: 0 };
    }

    return {
      hasUsed: (usageData.count || 0) >= 2,
      count: usageData.count || 0
    };
  } catch (e) {
    return { hasUsed: false, count: 0 };
  }
}

function checkAuthUsage() {
  if (typeof window === 'undefined') return { hasUsed: false, count: 0 };

  const cookies = document.cookie.split(';');
  const authUsageCookie = cookies.find(cookie => cookie.trim().startsWith('auth_usage='));

  if (!authUsageCookie) {
    return { hasUsed: false, count: 0 };
  }

  try {
    const cookieValue = decodeURIComponent(authUsageCookie.split('=')[1]);
    const usageData = JSON.parse(cookieValue);
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    if (usageData.month !== currentMonth) {
      return { hasUsed: false, count: 0 };
    }

    return {
      hasUsed: (usageData.count || 0) >= 5,
      count: usageData.count || 0
    };
  } catch (e) {
    return { hasUsed: false, count: 0 };
  }
}

function incrementFreeUsage() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const freeUsage = checkFreeUsage();

  const newUsageData = {
    month: currentMonth,
    count: freeUsage.count + 1,
    timestamp: now.toISOString()
  };

  document.cookie = `free_usage=${encodeURIComponent(JSON.stringify(newUsageData))}; path=/; max-age=${60 * 60 * 24 * 31}`;
  console.log('[Report] Free usage incremented to:', newUsageData.count);
}

function incrementAuthUsage() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const authUsage = checkAuthUsage();

  const newUsageData = {
    month: currentMonth,
    count: authUsage.count + 1,
    timestamp: now.toISOString()
  };

  document.cookie = `auth_usage=${encodeURIComponent(JSON.stringify(newUsageData))}; path=/; max-age=${60 * 60 * 24 * 31}`;
  console.log('[Report] Auth usage incremented to:', newUsageData.count);
}

export default function ReportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [isFirstView, setIsFirstView] = useState(true);
  const [loading, setLoading] = useState(true);

  const urlTicker = searchParams.get('ticker');
  const lastTickerRef = useRef(null);

  useEffect(() => {
    console.log('[Report] useEffect - status:', status, 'urlTicker:', urlTicker);

    if (status === 'loading') return;

    if (status === 'authenticated') {
      console.log('[Report] User authenticated');

      // Check if auth user exceeded limit
      const authUsage = checkAuthUsage();
      console.log('[Report] Auth usage:', authUsage);

      if (urlTicker && authUsage.hasUsed) {
        console.log('[Report] Auth user exceeded 5 views - showing upgrade prompt');
        setShowUpgradePrompt(true);
        setShowLoginPrompt(false);
        setIsFirstView(false);
      } else {
        if (urlTicker && lastTickerRef.current !== urlTicker) {
          incrementAuthUsage();
          lastTickerRef.current = urlTicker;
        }
        setShowLoginPrompt(false);
        setShowUpgradePrompt(false);
        setIsFirstView(false);
      }

      setLoading(false);
      return;
    }

    // User is NOT authenticated
    const freeUsage = checkFreeUsage();
    console.log('[Report] Free usage check:', freeUsage);

    if (!urlTicker) {
           if (freeUsage.hasUsed) {
        console.log('[Report] No ticker, exceeded free limit - showing login prompt');
        setShowLoginPrompt(true);
        setShowUpgradePrompt(false);
        setIsFirstView(false);
      } else {
        console.log('[Report] No ticker - showing first view with banner');
        setShowLoginPrompt(false);
        setShowUpgradePrompt(false);
        setIsFirstView(true);
      }
      setShowLoginPrompt(false);
      setShowUpgradePrompt(false);
      setIsFirstView(true);
      setLoading(false);
    } else if (urlTicker && freeUsage.hasUsed) {
      console.log('[Report] Has ticker, exceeded free limit - showing login prompt');
      setShowLoginPrompt(true);
      setShowUpgradePrompt(false);
      setIsFirstView(false);
      setLoading(false);
    }
  }, [status, urlTicker]);

  const handleStockChange = (newTicker) => {
    console.log('[Report] Stock change requested:', newTicker);

    if (status === 'authenticated') {
      const authUsage = checkAuthUsage();
      console.log('[Report] Auth user - current usage:', authUsage.count);

      if (authUsage.count >= 5) {
        console.log('[Report] Auth user exceeded limit - redirecting to upgrade');
        router.push(`/upgrade?from=${encodeURIComponent('/report')}&reason=monthly_limit`);
        return false;
      }

      return true;
    }

    // Unauthenticated user
    const freeUsage = checkFreeUsage();
    console.log('[Report] Free user - current usage:', freeUsage.count);

    if (freeUsage.count >= 2) {
      console.log('[Report] Free user exceeded limit - redirecting to login');
      router.push(`/login?from=${encodeURIComponent(`/report?ticker=${newTicker}`)}&reason=free_limit`);
      return false;
    }

    return true;
  };

  const handleLoginClick = () => {
    console.log('[Report] Login clicked');
    const currentUrl = `/report${urlTicker ? `?ticker=${urlTicker}` : ''}`;
    router.push(`/login?from=${encodeURIComponent(currentUrl)}&reason=free_limit`);
  };

  const handleSkipLogin = () => {
    console.log('[Report] Skip login clicked');
    router.push('/');
  };

  const handleUpgradeClick = () => {
    console.log('[Report] Upgrade clicked');
    router.push(`/upgrade?from=${encodeURIComponent('/report')}&reason=monthly_limit`);
  };

  if (loading) {
      return <LoadingState />;
  }

  // Show upgrade prompt for authenticated users who exceeded limit
  if (showUpgradePrompt && status === 'authenticated') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-purple-500/20 to-orange-500/20 border border-purple-400/30 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">💎</div>
          <h2 className="text-2xl font-bold mb-4">Upgrade to Pro</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            You've used all <strong>5 free monthly analyses</strong>! Upgrade to Pro for unlimited access:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl mb-2">∞</div>
              <div className="font-semibold text-purple-400">Unlimited Reports</div>
              <div className="text-sm text-gray-400">No monthly limits</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold text-green-400">$9.99/month</div>
              <div className="text-xs text-gray-400">Cancel anytime</div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleUpgradeClick}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              Upgrade to Pro ($9.99/month)
            </button>

            <button
              onClick={handleSkipLogin}
              className="w-full text-gray-400 hover:text-white py-2 text-sm transition-colors"
            >
              Back to homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show login prompt for unauthenticated users who have used their free views
  if (showLoginPrompt && status === 'unauthenticated') {
    return <LoginPrompt onLogin={handleLoginClick} onSkip={handleSkipLogin} />;
  }

  // Show the actual report
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {isFirstView && status === 'unauthenticated' && <LimitBanner isFirstTime={true} />}
      <ReportContent onStockChange={handleStockChange} />
    </div>
  );
}
