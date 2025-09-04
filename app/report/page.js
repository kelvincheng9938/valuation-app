'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReportContent from '@/components/ReportContent';

function LimitBanner({ over, left }) {
  if (!over) return null;
  return (
    <div className="mb-4 p-4 rounded-lg border border-red-400/30 bg-red-400/10">
      <div className="text-red-400 font-semibold mb-2">Monthly Limit Reached</div>
      <div className="text-sm text-red-300">
        You've used all 5 free stock analyses this month. Your limit will reset next month.
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="card p-8 text-center">
        <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-lg">Checking access permissions...</div>
      </div>
    </div>
  );
}

export default function ReportPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [blocked, setBlocked] = useState(false);
  const [left, setLeft] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return; // Still loading session
    
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      checkAndConsumeUsage();
    }
  }, [status, router]);

  const checkAndConsumeUsage = async () => {
    try {
      // First check current usage
      const checkResponse = await fetch('/api/usage?op=peek', { 
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      
      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        
        if (checkData.remaining <= 0) {
          setBlocked(true);
          setLeft(0);
          setLoading(false);
          return;
        }
        
        // If we have remaining usage, consume one
        const consumeResponse = await fetch('/api/usage?op=consume', { 
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          }
        });
        
        if (consumeResponse.status === 429) {
          const consumeData = await consumeResponse.json();
          setBlocked(true);
          setLeft(consumeData?.remaining ?? 0);
        } else if (consumeResponse.ok) {
          const consumeData = await consumeResponse.json();
          setLeft(consumeData?.remaining ?? 0);
          setBlocked(false);
        }
      }
    } catch (error) {
      console.error('Usage check error:', error);
      // On error, allow access (graceful degradation)
      setBlocked(false);
      setLeft(5);
    }
    
    setLoading(false);
  };

  if (status === 'loading' || loading) {
    return <LoadingState />;
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to login
  }

  if (blocked) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <LimitBanner over={true} left={0} />
        <div className="card p-8 text-center">
          <div className="text-yellow-400 text-4xl mb-4">📊</div>
          <div className="text-xl font-bold mb-4">Monthly Limit Reached</div>
          <div className="text-sm ghost mb-6">
            You've analyzed 5 stocks this month. Your free access will reset on the 1st of next month.
          </div>
          <div className="text-xs text-blue-400">
            Future: Upgrade to Pro for unlimited access to all features and real-time data.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs ghost">
          Remaining free analyses this month: <span className="text-cyan-400 font-medium">{left}</span>
        </div>
        <div className="text-xs ghost">
          Signed in as: <span className="text-cyan-400">{session?.user?.email}</span>
        </div>
      </div>
      
      <ReportContent />
    </div>
  );
}
