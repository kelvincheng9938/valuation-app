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
      console.log('Starting upgrade process for user:', session?.user?.email);
      
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_1S4zd95dclfKdBZ6rPqyEmL3' // Replace with your actual Stripe Price ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
      
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Something went wrong. Please try again.');
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
                    Processing...
                  </div>
                ) : status === 'unauthenticated' ? (
                  'Sign in to Upgrade'
                ) : (
                  'Upgrade Now'
                )}
              </button>
              
              {status === 'unauthenticated' && (
                <p className="text-sm text-gray-400 mt-3">
                  Please <a href="/login" className="text-blue-400 hover:underline">sign in</a> to upgrade your account
                </p>
              )}
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

          {/* Testimonials */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">What Our Pro Users Say</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-3 italic">
                  "The Bloomberg data quality is incredible. This saves me hours of research every week."
                </p>
                <div className="text-sm text-gray-400">- Portfolio Manager, NYC</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-3 italic">
                  "Finally found a tool that matches institutional-grade analysis. Worth every penny."
                </p>
                <div className="text-sm text-gray-400">- Investment Analyst, London</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-300 mb-3 italic">
                  "The peer comparison and valuation bands are game-changers for my investment decisions."
                </p>
                <div className="text-sm text-gray-400">- Hedge Fund Analyst, HK</div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I cancel anytime?</h4>
                <p className="text-gray-300">Yes, you can cancel your subscription at any time. You'll continue to have Pro access until the end of your billing period.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Is there a free trial?</h4>
                <p className="text-gray-300">We offer 7 free analyses (2 before signup + 5 after) each month, plus a 7-day money-back guarantee on Pro subscriptions.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h4>
                <p className="text-gray-300">We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure payment processor.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Is the data really from Bloomberg Terminal?</h4>
                <p className="text-gray-300">Yes, our analysis is built on the same professional-grade data used by institutional investors and major financial firms.</p>
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
