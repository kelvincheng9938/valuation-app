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
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId && status === 'authenticated') {
      verifySession();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [sessionId, status]);

  const verifySession = async () => {
    try {
      // Optional: Verify the session with your backend
      // This ensures the payment was actually successful
      const response = await fetch(`/api/verify-checkout-session?session_id=${sessionId}`);
      
      if (response.ok) {
        const data = await response.json();
        setSessionData(data);
      }
    } catch (error) {
      console.error('Error verifying session:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToReports = () => {
    // Clear any usage cookies since user is now Pro
    document.cookie = 'free_usage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'auth_usage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    router.push('/report');
  };

  if (loading || status === 'loading') {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg">Verifying your payment...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-green-200">
            
            {/* Success Animation */}
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-4xl">🎉</div>
              </div>
              <div className="text-6xl mb-4">✅</div>
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to ValuationPro Pro!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your subscription has been successfully activated. You now have unlimited access to professional stock analysis.
            </p>

            {/* Pro Features */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Pro Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Unlimited stock analyses</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Priority customer support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Export to PDF & Excel</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Advanced filtering options</span>
                </div>
              </div>
            </div>

            {/* User Info */}
            {session && (
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <div className="text-sm text-gray-600">
                  <div>Account: <span className="font-medium text-gray-900">{session.user.email}</span></div>
                  <div>Plan: <span className="font-medium text-purple-600">Pro ($9.99/month)</span></div>
                  <div>Status: <span className="font-medium text-green-600">Active</span></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={goToReports}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Analyzing Stocks →
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm transition-colors"
              >
                Back to Homepage
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-xs text-gray-500 space-y-1">
                <div>Your subscription will automatically renew monthly</div>
                <div>You can cancel anytime from your account settings</div>
                <div>Questions? Contact support at support@valuationpro.com</div>
              </div>
            </div>

            {/* Session Debug Info (Development only) */}
            {process.env.NODE_ENV === 'development' && sessionData && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="text-xs font-mono text-left">
                  <div className="font-semibold mb-2">Debug Info:</div>
                  <div>Session ID: {sessionId}</div>
                  <div>Payment Status: {sessionData.payment_status}</div>
                  <div>Customer: {sessionData.customer_email}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
