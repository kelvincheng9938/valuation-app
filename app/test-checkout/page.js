'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'

export default function TestCheckoutPage() {
  const { data: session, status } = useSession()
  const [stripeTest, setStripeTest] = useState(null)
  const [usageData, setUsageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    testStripeConnection()
    checkUsage()
  }, [])

  const testStripeConnection = async () => {
    try {
      console.log('🧪 Testing Stripe connection...')
      const response = await fetch('/api/test-stripe')
      const data = await response.json()
      setStripeTest(data)
      console.log('✅ Stripe test result:', data)
    } catch (error) {
      console.error('❌ Stripe test failed:', error)
      setStripeTest({ success: false, error: error.message })
    }
  }

  const checkUsage = async () => {
    try {
      const response = await fetch('/api/debug-usage')
      const data = await response.json()
      setUsageData(data)
      console.log('✅ Usage data:', data)
    } catch (error) {
      console.error('❌ Usage check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const testCheckoutFlow = async () => {
    if (!session) {
      alert('Please sign in first to test the checkout flow!')
      return
    }

    try {
      console.log('🛒 Testing checkout session creation...')
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      const data = await response.json()
      
      if (data.success && data.url) {
        console.log('✅ Checkout session created:', data.sessionId)
        
        // Ask user if they want to proceed to actual payment
        const proceed = confirm(
          `✅ Checkout session created successfully!\n\n` +
          `Session ID: ${data.sessionId}\n` +
          `Customer ID: ${data.customerId}\n\n` +
          `Do you want to proceed to actual Stripe payment page?\n` +
          `(This will charge your card $9.99 if you complete the payment)`
        )
        
        if (proceed) {
          window.open(data.url, '_blank')
        }
      } else {
        alert(`❌ Checkout creation failed: ${data.error}`)
      }
    } catch (error) {
      console.error('❌ Checkout test failed:', error)
      alert(`❌ Test failed: ${error.message}`)
    }
  }

  const clearUsageCookies = async () => {
    try {
      const response = await fetch('/api/debug-usage', { method: 'DELETE' })
      if (response.ok) {
        await checkUsage()
        alert('✅ Usage cookies cleared!')
      }
    } catch (error) {
      console.error('Error clearing cookies:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card p-8 text-center">
            <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg">Loading test environment...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🧪 Checkout System Test</h1>
          <p className="text-gray-400">
            Test your complete Stripe integration with guaranteed account connection
          </p>
        </div>

        {/* User Status */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">👤 Current User Status</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm ghost">Authentication:</span>
                <div className={`font-semibold ${status === 'authenticated' ? 'text-green-400' : 'text-red-400'}`}>
                  {status === 'authenticated' ? '✅ Signed In' : '❌ Not Signed In'}
                </div>
              </div>
              {session && (
                <>
                  <div>
                    <span className="text-sm ghost">Email:</span>
                    <div className="font-mono text-cyan-400">{session.user.email}</div>
                  </div>
                  <div>
                    <span className="text-sm ghost">Name:</span>
                    <div className="text-white">{session.user.name}</div>
                  </div>
                </>
              )}
              <div>
                <span className="text-sm ghost">Pro Status:</span>
                <div className={`font-semibold ${usageData?.userStatus?.isPro ? 'text-purple-400' : 'text-yellow-400'}`}>
                  {usageData?.userStatus?.isPro ? '💎 Pro User' : '🆓 Free User'}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">📊 Usage Status</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm ghost">Free Usage (No Login):</span>
                <div className="font-semibold">
                  {usageData?.freeUsage?.cookie?.count || 0} / 2
                </div>
              </div>
              <div>
                <span className="text-sm ghost">Auth Usage (After Login):</span>
                <div className="font-semibold">
                  {usageData?.authUsage?.cookie?.count || 0} / 5
                </div>
              </div>
              <div>
                <span className="text-sm ghost">Can View Reports:</span>
                <div className={`font-semibold ${usageData?.userStatus?.canViewReports ? 'text-green-400' : 'text-red-400'}`}>
                  {usageData?.userStatus?.canViewReports ? '✅ Yes' : '❌ No'}
                </div>
              </div>
              <div>
                <span className="text-sm ghost">Needs Upgrade:</span>
                <div className={`font-semibold ${usageData?.userStatus?.needsUpgrade ? 'text-orange-400' : 'text-green-400'}`}>
                  {usageData?.userStatus?.needsUpgrade ? '💰 Yes' : '✅ No'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stripe Connection Test */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">🔗 Stripe Connection Test</h2>
            <button
              onClick={testStripeConnection}
              className="btn px-4 py-2 rounded-lg text-sm"
            >
              🔄 Retest
            </button>
          </div>
          
          {stripeTest ? (
            <div className={`p-4 rounded-lg border ${
              stripeTest.success 
                ? 'bg-green-500/10 border-green-400/30' 
                : 'bg-red-500/10 border-red-400/30'
            }`}>
              <div className={`font-semibold mb-2 ${stripeTest.success ? 'text-green-400' : 'text-red-400'}`}>
                {stripeTest.success ? '✅ Stripe Connection: SUCCESS' : '❌ Stripe Connection: FAILED'}
              </div>
              
              {stripeTest.success ? (
                <div className="text-sm space-y-2">
                  <div className="text-green-300">{stripeTest.message}</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-green-200 font-medium">Environment:</div>
                      <div className="text-green-100">{stripeTest.environment?.keyType}</div>
                    </div>
                    <div>
                      <div className="text-green-200 font-medium">Price:</div>
                      <div className="text-green-100">{stripeTest.price?.amount_display} / {stripeTest.price?.interval}</div>
                    </div>
                    <div>
                      <div className="text-green-200 font-medium">Price ID:</div>
                      <div className="text-green-100 font-mono text-xs">{stripeTest.price?.id}</div>
                    </div>
                    <div>
                      <div className="text-green-200 font-medium">Account:</div>
                      <div className="text-green-100">{stripeTest.account?.country} - {stripeTest.account?.business_type}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-red-300">
                  <div>{stripeTest.error}</div>
                  {stripeTest.details && (
                    <div className="mt-2 text-xs">
                      Details: {JSON.stringify(stripeTest.details, null, 2)}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-sm ghost">Testing Stripe connection...</div>
            </div>
          )}
        </div>

        {/* Checkout Flow Test */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">🛒 Checkout Flow Test</h2>
          
          {!session ? (
            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 mb-4">
              <div className="text-yellow-400 font-semibold mb-2">⚠️ Sign In Required</div>
              <div className="text-sm text-yellow-300">
                Please sign in with Google to test the checkout flow and account connection.
              </div>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4 mb-4">
              <div className="text-green-400 font-semibold mb-2">✅ Ready to Test</div>
              <div className="text-sm text-green-300">
                Signed in as: <strong>{session.user.email}</strong><br/>
                Checkout session will be automatically linked to this account.
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={testCheckoutFlow}
              disabled={!session || !stripeTest?.success}
              className="btn-primary px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!session ? '🔐 Sign In First' : 
               !stripeTest?.success ? '⚠️ Fix Stripe First' : 
               '🧪 Test Checkout Creation'}
            </button>
            
            <a
              href="/upgrade"
              className="btn px-6 py-3 rounded-lg font-medium"
            >
              📱 View Live Upgrade Page
            </a>
          </div>
        </div>

        {/* Test Actions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">🛠 Test Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={clearUsageCookies}
              className="btn px-4 py-2 rounded-lg"
            >
              🗑 Clear Usage Cookies
            </button>
            <button
              onClick={checkUsage}
              className="btn px-4 py-2 rounded-lg"
            >
              🔄 Refresh Usage Data
            </button>
            <a
              href="/report?ticker=AAPL"
              className="btn px-4 py-2 rounded-lg"
            >
              📊 Test Report Page
            </a>
            <a
              href="/debug-usage"
              className="btn px-4 py-2 rounded-lg"
            >
              🐛 Debug Usage Page
            </a>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-400/20">
            <div className="text-blue-400 font-medium mb-2">🎯 Complete Test Flow</div>
            <div className="text-sm text-blue-300 space-y-1">
              <div>1. ✅ Sign in with Google (ensures account connection)</div>
              <div>2. ✅ Test Stripe connection (verify API keys work)</div>
              <div>3. ✅ Test checkout creation (verify session creation)</div>
              <div>4. 🛒 Go to live upgrade page and complete payment</div>
              <div>5. 🎉 Verify Pro access is automatically activated</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
