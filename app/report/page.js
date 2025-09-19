// app/report/page.js
'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import ReportContent from '@/components/ReportContent'

function LimitBanner({ isFirstTime, usageInfo }) {
  const { data: session } = useSession();
  const [isProUser, setIsProUser] = useState(false);
  const [checkingPro, setCheckingPro] = useState(false);

  // Check Pro status when user is authenticated
  useEffect(() => {
    if (session?.user?.email && !checkingPro) {
      setCheckingPro(true);
      fetch('/api/check-subscription')
        .then(res => res.json())
        .then(data => {
          setIsProUser(data.isActive || false);
          console.log(`🔍 Pro status check: ${data.isActive}`);
        })
        .catch(error => {
          console.error('Error checking Pro status:', error);
          setIsProUser(false);
        })
        .finally(() => setCheckingPro(false));
    }
  }, [session?.user?.email, checkingPro]);

  // 🎯 PRO USER BANNER
  if (session && isProUser) {
    return (
      <div className="mb-4 p-3 rounded-lg border border-purple-400/30 bg-purple-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-purple-400 font-semibold">👑 ValuationPro Pro</div>
            <div className="text-xs bg-purple-400/20 text-purple-300 px-2 py-1 rounded-full">
              Unlimited Access
            </div>
          </div>
          <div className="text-xs text-purple-300">
            Signed in as {session.user.name?.split(' ')[0] || 'Pro User'}
          </div>
        </div>
      </div>
    );
  }

  // 🆓 FIRST TIME VISITOR (NO LOGIN)
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

  // 🔐 AUTHENTICATED FREE USER
  if (session && !isProUser && usageInfo?.authUsed < 5) {
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

// Main Report Page Component
export default function ReportPage() {
  return <ReportContent />
}
