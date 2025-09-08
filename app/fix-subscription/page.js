'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'

export default function FixSubscriptionPage() {
  const { data: session, status } = useSession()
  const [debugData, setDebugData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    loadDebugData()
  }, [])

  const loadDebugData = async () => {
    try {
      const response = await fetch('/api/debug-subscription')
      const data = await response.json()
      setDebugData(data)
    } catch (error) {
      console.error('Error loading debug data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fixMySubscription = async () => {
    if (!session?.user?.email) {
      setMessage('Please sign in first!')
      setMessageType('error')
      return
    }

    try {
      setLoading(true)
      setMessage('Adding your email to Pro users...')
      setMessageType('info')

      const response = await fetch('/api/debug-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'stripe',
          email: session.user.email
        })
      })

      const result = await response.json()

      if (result.success) {
        setMessage(`🎉 SUCCESS! ${session.user.email} now has unlimited Pro access!`)
        setMessageType('success')
        
        // Reload debug data
        await loadDebugData()
        
        // Clear usage cookies
        document.cookie = 'auth_usage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        
      } else {
        setMessage(`Error: ${result.error}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const addManualEmail = async () => {
    const email = prompt('Enter the email address that you used to pay for Pro access:')
    if (!email) return

    try {
      setLoading(true)
      setMessage(`Adding ${email} to Pro users...`)
      setMessageType('info')

      const response = await fetch('/api/debug-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'stripe',
          email: email
        })
      })

      const result = await response.json()

      if (result.success) {
        setMessage(`🎉 SUCCESS! ${email} now has unlimited Pro access!`)
        setMessageType('success')
        await loadDebugData()
      } else {
        setMessage(`Error: ${result.error}`)
        setMessageType('error')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !debugData) {
    return (
      <>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card p-8 text-center">
            <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg">Loading subscription data...</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🔧 Fix Subscription Issues</h1>
          <p className="text-gray-400">
            If you paid for Pro but still see usage limits, use this page to fix your access.
          </p>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            messageType === 'success' 
              ? 'bg-green-500/10 border-green-400/30 text-green-400' 
              : messageType === 'error'
              ? 'bg-red-500/10 border-red-400/30 text-red-400'
              : 'bg-blue-500/10 border-blue-400/30 text-blue-400'
          }`}>
            {message}
          </div>
        )}

        {/* Current User Status */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Current Status</h2>
          {session ? (
            <div className="space-y-3">
              <div>
                <span className="text-sm ghost">Signed in as:</span>
                <div className="font-mono text-cyan-400">{session.user.email}</div>
              </div>
              <div>
                <span className="text-sm ghost">Pro Status:</span>
                <div className={`font-semibold ${debugData?.currentUser?.hasActiveSubscription ? 'text-green-400' : 'text-red-400'}`}>
                  {debugData?.currentUser?.hasActiveSubscription ? '✅ Pro User (Unlimited Access)' : '❌ Free User (Limited Access)'}
                </div>
              </div>
              {!debugData?.currentUser?.hasActiveSubscription && (
                <div className="mt-4">
                  <button
                    onClick={fixMySubscription}
                    disabled={loading}
                    className="btn-primary px-6 py-3 rounded-lg font-medium disabled:opacity-50"
                  >
                    {loading ? '🔄 Fixing...' : '🔧 Fix My Pro Access'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-yellow-400 text-4xl mb-4">🔐</div>
              <div className="text-lg font-medium mb-2">Please Sign In First</div>
              <div className="text-sm ghost">You need to sign in with the same Google account you used to pay</div>
              <a href="/login" className="btn-primary mt-4 inline-block px-6 py-2 rounded-lg">
                Sign In with Google
              </a>
            </div>
          )}
        </div>

        {/* Manual Email Fix */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Manual Email Fix</h2>
          <p className="text-sm ghost mb-4">
            If you paid with a different email than the one you're currently signed in with, 
            you can manually add that email to Pro users.
          </p>
          <button
            onClick={addManualEmail}
            disabled={loading}
            className="btn px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Add Different Email to Pro
          </button>
        </div>

        {/* Subscription Debug Info */}
        {debugData && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">System Debug Info</h2>
            <div className="space-y-4">
              <div>
                <span className="text-sm ghost">Demo Pro Users:</span>
                <div className="font-mono text-xs bg-gray-800 p-2 rounded mt-1">
                  {debugData.debugData?.demoProUsers?.length > 0 
                    ? debugData.debugData.demoProUsers.join(', ')
                    : 'None'
                  }
                </div>
              </div>
              <div>
                <span className="text-sm ghost">Stripe Subscriptions:</span>
                <div className="font-mono text-xs bg-gray-800 p-2 rounded mt-1">
                  {debugData.debugData?.totalSubscriptions > 0 
                    ? Object.keys(debugData.debugData.subscriptionStore).join(', ')
                    : 'None'
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">How This Works</h2>
          <div className="text-sm space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">1.</span>
              <span>When you pay via Stripe, your email should automatically get Pro access</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">2.</span>
              <span>Sometimes the webhook connection fails and your email doesn't get added</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">3.</span>
              <span>This page manually adds your email to the Pro users list</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">4.</span>
              <span>After fixing, you'll have unlimited access to all stock reports</span>
            </div>
          </div>
          
          <div className="mt-6 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
            <div className="text-green-400 font-medium text-sm mb-1">💡 Quick Fix Steps</div>
            <div className="text-xs text-green-300/70">
              1. Sign in with the Google account you used to pay<br/>
              2. Click "Fix My Pro Access" button above<br/>
              3. Try viewing any stock report - you should now have unlimited access!
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 text-center">
          <button
            onClick={loadDebugData}
            disabled={loading}
            className="btn px-4 py-2 rounded-lg mr-3 disabled:opacity-50"
          >
            🔄 Refresh Status
          </button>
          <a
            href="/report?ticker=AAPL"
            className="btn-primary px-6 py-2 rounded-lg inline-block"
          >
            📊 Test Report Access
          </a>
        </div>
      </div>
    </>
  )
}
