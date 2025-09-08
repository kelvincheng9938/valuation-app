'use client';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Navigation from '@/components/Navigation';

export default function UpgradePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const reason = searchParams.get('reason');
  const fromUrl = searchParams.get('from');

  const handleUpgrade = async () => {
    setIsLoading(true);
    
    try {
      console.log('🔐 Starting upgrade process for user:', session?.user?.email);
      
      // Create Stripe checkout session with new API
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Price ID will be automatically picked up from .env.local
        }),
      });

      console.log('📡 API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url, sessionId } = await response.json();
      console.log('✅ Checkout session created:', sessionId);
      
      if (!url) {
        throw new Error('No checkout URL received from Stripe');
      }
      
      // Redirect to Stripe Checkout
      console.log('🔗 Redirecting to Stripe:', url);
      window.location.href = url;
      
    } catch (error) {
      console.error('❌ Upgrade error:', error);
      alert(`Something went wrong: ${error.message}. Please try again.`);
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    if (fromUrl) {
      router.push(fromUrl);
    } else {
      router.push('/report');
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* User Verification - 100% Guaranteed Connection */}
          {session && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
                <div className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                  ✅ 100% Account Connection Guaranteed
                </div>
                <div className="text-sm text-green-300">
                  <strong>Signed in as:</strong> {session.user.email}<br/>
                  <strong>Payment will be automatically linked</strong> to this account.<br/>
                  <span className="text-green-200">🔒 No email matching required!</span>
                </div>
              </div>
            </div>
          )}

          {!session && (
            <div className="max-w-md mx-auto mb-8">
              <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-4">
                <div className="text-yellow-400 font-semibold mb-2">⚠️ Please Sign In First</div>
                <div className="text-sm text-yellow-300">
                  Sign in to ensure your payment is automatically connected to your account.
                </div>
                <a href="/login" className="text-yellow-200 underline text-sm mt-2 block">
                  → Sign in with Google
                </a>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">💎</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Upgrade to ValuationPro Pro
            </h1>
            {reason === 'monthly_limit' ? (
              <p className="text-xl text-gray-300">
                You've reached your monthly limit of 5 analyses. Upgrade for unlimited access!
              </p>
            ) : (
              <p className="text-xl text-gray-300">
                Unlock unlimited professional stock analysis with Pro features
              </p>
            )}
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold py-2 px-4 rounded-full inline-block mb-6">
                MOST POPULAR
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Pro Plan</h2>
              <div className="text-5xl font-bold text-white mb-2">
                $9.99
                <span className="text-xl text-gray-300">/month</span>
              </div>
              <p className="text-gray-300 mb-8">Cancel anytime. 7-day money-back guarantee.</p>
              
              <button
                onClick={handleUpgrade}
                disabled={isLoading || status === 'unauthenticated'}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating secure checkout...
                  </div>
                ) : status === 'unauthenticated' ? (
                  'Sign In to Upgrade'
                ) : (
                  '🔒 Secure Checkout with Stripe'
                )}
              </button>
              
              {status === 'unauthenticated' && (
                <p className="text-sm text-gray-400 mt-3">
                  Please <a href="/login" className="text-blue-400 hover:underline">sign in</a> first to ensure account connection
                </p>
              )}

              {session && (
                <p className="text-sm text-green-300 mt-3">
                  ✅ Payment automatically linked to {session.user.email}
                </p>
              )}
            </div>
          </div>

          {/* Checkout Session Benefits */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-xl p-6">
              <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                🔒 Secure Checkout Benefits
              </h3>
              <div className="text-sm text-blue-300 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>100% Account Connection:</strong> Your payment is automatically linked to your Google account</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>No Email Confusion:</strong> You don't need to remember which email to use</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>Instant Activation:</strong> Pro access activated immediately after payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  <span><strong>Secure Processing:</strong> All payments processed by Stripe (industry standard)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Free Plan</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-gray-300">2 demo reports (no signup)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-gray-300">5 analyses per month after login</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-gray-300">Bloomberg Terminal data</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-gray-300">43 major stocks</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-red-400">✗</div>
                  <span className="text-gray-400">Monthly usage limit</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-red-400">✗</div>
                  <span className="text-gray-400">No export features</span>
                </div>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-400/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                <span className="bg-purple-500 text-white text-xs font-semibold py-1 px-2 rounded">UNLIMITED</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-white font-medium">Unlimited stock analyses</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-white">All Bloomberg Terminal data</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-white">Priority customer support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-white">Export to PDF & Excel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-white">Advanced filtering options</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-green-400">✓</div>
                  <span className="text-white">API access (coming soon)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">What Our Pro Users Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-3 italic">
                  "The checkout process was seamless and my Pro access was activated instantly!"
                </p>
                <div className="text-sm text-gray-400">- Portfolio Manager, NYC</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-3 italic">
                  "No confusion about account linking - everything just worked perfectly."
                </p>
                <div className="text-sm text-gray-400">- Investment Analyst, London</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-3 italic">
                  "Secure payment process and immediate access to unlimited analysis."
                </p>
                <div className="text-sm text-gray-400">- Hedge Fund Analyst, HK</div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={handleBack}
              className="text-gray-400 hover:text-white py-2 px-4 transition-colors"
            >
              ← Back to Analysis
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
