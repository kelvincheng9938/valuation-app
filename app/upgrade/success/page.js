'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';

export default function UpgradeSuccessPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const [activationStatus, setActivationStatus] = useState('verifying');
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId && status === 'authenticated') {
      verifyAndActivateSubscription();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [sessionId, status]);

  const verifyAndActivateSubscription = async () => {
    try {
      console.log('🔍 Verifying payment and activating subscription...');
      setActivationStatus('verifying');
      
      const response = await fetch(`/api/verify-checkout-session?session_id=${sessionId}`);
      
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
        
        if (data.activated) {
          console.log('🎉 Subscription successfully activated!');
          setActivationStatus('success');
          
          // Clear any old usage cookies since user is now Pro
          document.cookie = 'free_usage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          document.cookie = 'auth_usage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          
        } else {
          console.error('❌ Activation failed');
          setActivationStatus('failed');
        }
      } else {
        console.error('❌ Session verification failed');
        setActivationStatus('failed');
      }
    } catch (error) {
      console.error('❌ Error during verification:', error);
      setActivationStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const goToReports = () => {
    router.push('/report?ticker=AAPL');
  };

  const retryActivation = () => {
    setLoading(true);
    verifyAndActivateSubscription();
  };

  if (loading || status === 'loading') {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <div className="text-xl text-white mb-2">
              {activationStatus === 'verifying' ? 'Activating your Pro subscription...' : 'Loading...'}
            </div>
            <div className="text-gray-400">
              Please wait while we set up your unlimited access
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (activationStatus === 'failed') {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-red-400/30">
              
              <div className="mb-8">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-4xl">⚠️</div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                Activation Issue
              </h1>
              
              <p className="text-lg text-gray-300 mb-8">
                Your payment was successful, but we had trouble activating your Pro access. 
                Don't worry - we'll fix this immediately!
              </p>

              <div className="space-y-4">
                <button
                  onClick={retryActivation}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 px-8 rounded-xl transition-all duration-200"
                >
                  🔄 Retry Activation
                </button>
                
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-2">Or use our manual fix:</div>
                  <a
                    href="/fix-subscription"
                    className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition-all duration-200 inline-block"
                  >
                    🔧 Fix Subscription Access
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show success state
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-black py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-green-400/30">
            
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl">🎉</div>
              </div>
              <div className="text-6xl mb-4">✅</div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-white mb-4">
              Welcome to ValuationPro Pro!
            </h1>
            
            <p className="text-lg text-gray-300 mb-8">
              🚀 Your subscription has been <strong className="text-green-400">successfully activated</strong>! 
              You now have unlimited access to professional stock analysis.
            </p>

            {/* Payment Details */}
            {sessionData && (
  <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4 mb-8">
    <div className="text-green-400 font-semibold mb-2">✅ Payment Confirmed</div>
    <div className="text-sm text-green-300 space-y-1">
      <div>Account: {sessionData.customer_email}</div>
      <div>Amount: ${(sessionData.amount_total / 100).toFixed(2)} {sessionData.currency?.toUpperCase()}</div>
      <div>Status: <span className="font-semibold">Active & Unlimited</span></div>
      <div className="text-xs text-green-200 mt-2">
        💡 Demo pricing - More features coming soon!
      </div>
    </div>
  </div>
)}

            {/* What's Included */}
            <div className="text-left mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 text-center">🎯 Your Pro Benefits</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span><strong>Unlimited Reports:</strong> Analyze any stock, any time</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span><strong>Real-time Data:</strong> Live prices and analyst estimates</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span><strong>Advanced Charts:</strong> Peer comparisons & valuation models</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✓</span>
                  <span><strong>Priority Support:</strong> Get help when you need it</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={goToReports}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                📊 Start Analyzing Stocks Now!
              </button>
              
              <div className="text-center">
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors underline"
                >
                  ← Back to Home
                </a>
              </div>
            </div>

            {/* Support Notice */}
            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
              <div className="text-blue-400 font-medium mb-1">💬 Need Help?</div>
              <div className="text-sm text-blue-300">
                If you experience any issues, email us or use the Fix Subscription page. 
                Your payment is confirmed and your access should work immediately.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
