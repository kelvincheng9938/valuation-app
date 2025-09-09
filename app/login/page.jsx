'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const callbackUrl = searchParams.get('from') || '/report';
  const reason = searchParams.get('reason');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      
      // Use absolute URL for production
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://www.valuation-pro.com' 
        : window.location.origin;
        
      await signIn('google', { 
        callbackUrl: `${baseUrl}${callbackUrl}`,
        redirect: true
      });
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again or check your internet connection.');
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-green-400 text-4xl mb-4">✓</div>
          <div className="text-lg">Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
          
          {/* Logo */}
          <div className="mb-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              ValuationPro
            </div>
            <div className="text-gray-300">Professional Stock Analysis</div>
          </div>

          {/* Login Message */}
          <div className="mb-6">
            {reason === 'free_limit' ? (
              <>
                <div className="text-4xl mb-4">🎯</div>
                <h1 className="text-2xl font-semibold text-white mb-3">Ready for More?</h1>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You've used your <span className="text-cyan-400 font-medium">2 free demo reports</span>. 
                  Sign in with Google to get <span className="text-cyan-400 font-medium">5 more analyses</span> this month!
                </p>
              </>
            ) : reason === 'monthly_limit' ? (
              <>
                <div className="text-4xl mb-4">⭐</div>
                <h1 className="text-2xl font-semibold text-white mb-3">Monthly Limit Reached</h1>
                <p className="text-sm text-gray-300 leading-relaxed">
                  You've used all <span className="text-purple-400 font-medium">5 free analyses</span> this month. 
                  <a href="/upgrade" className="text-purple-400 hover:text-purple-300 underline ml-1">Upgrade to Pro</a> for unlimited access!
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold text-white mb-3">Welcome Back</h1>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Sign in with Google to access professional stock analysis. Start with 2 free reports, then get 5 analyses per month after signing in.
                </p>
              </>
            )}
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Additional Info */}
          <div className="mt-6 text-xs text-gray-400">
            By signing in, you agree to our terms of service and privacy policy.
          </div>

          {/* Feature Info */}
          {reason === 'free_limit' ? (
            <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-400/20">
              <div className="text-cyan-400 text-sm font-medium mb-1">🚀 After Login</div>
              <div className="text-xs text-cyan-300/80">
                • 5 stock analyses per month<br/>
                • Monthly limit resets automatically<br/>
                • Same professional Bloomberg data<br/>
                • <a href="/upgrade" className="underline hover:text-cyan-200">Upgrade to Pro</a> for unlimited access
              </div>
            </div>
          ) : reason === 'monthly_limit' ? (
            <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-400/20">
              <div className="text-purple-400 text-sm font-medium mb-1">💎 Upgrade to Pro</div>
              <div className="text-xs text-purple-300/80">
                • Unlimited stock analyses<br/>
                • Priority customer support<br/>
                • Advanced export features<br/>
                • Only $9.98/month - <a href="/upgrade" className="underline hover:text-purple-200">Learn more</a>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
              <div className="text-blue-400 text-sm font-medium mb-1">🎯 Free Access</div>
              <div className="text-xs text-blue-300/80">
                • 2 free demo reports (no login required)<br/>
                • 5 analyses per month after signing in<br/>
                • Professional-grade reports<br/>
                • Real Bloomberg Terminal data
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <a 
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
