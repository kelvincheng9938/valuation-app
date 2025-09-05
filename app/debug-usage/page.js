'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'

export default function DebugUsagePage() {
  const { data: session, status } = useSession()
  const [usageData, setUsageData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUsage()
  }, [])

  const checkUsage = async () => {
    try {
      const response = await fetch('/api/debug-usage')
      const data = await response.json()
      setUsageData(data)
    } catch (error) {
      console.error('Error checking usage:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearUsage = async () => {
    try {
      const response = await fetch('/api/debug-usage', { method: 'DELETE' })
      if (response.ok) {
        await checkUsage() // Reload data
        alert('Usage cookies cleared!')
      }
    } catch (error) {
      console.error('Error clearing usage:', error)
    }
  }

  const addDemoUser = async () => {
    const email = prompt('Enter email to add as demo pro user:')
    if (!email) return

    try {
      const response = await fetch('/api/manage-demo-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', email })
      })
      
      if (response.ok) {
        alert(`Added ${email} as demo pro user`)
        await checkUsage()
      }
    } catch (error) {
      console.error('Error adding demo user:', error)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card p-8 text-center">
            <div className="text-lg">Loading usage data...</div>
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
          <h1 className="text-3xl font-bold mb-2">🔧 Usage Debug Panel</h1>
          <p className="text-gray-400">
            Monitor user usage patterns and subscription status for demo purposes.
          </p>
        </div>

        {/* User Status */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Current User</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm ghost">Authentication:</span>
                <div className={`font-semibold ${status === 'authenticated' ? 'text-green-400' : 'text-red-400'}`}>
                  {status === 'authenticated' ? '✓ Signed In' : '✗ Not Signed In'}
                </div>
              </div>
              {session && (
                <div>
                  <span className="text-sm ghost">Email:</span>
                  <div className="font-mono text-cyan-400">{session.user.email}</div>
                </div>
              )}
              <div>
                <span className="text-sm ghost">Subscription:</span>
                <div className={`font-semibold ${usageData?.subscription?.isActive ? 'text-purple-400' : 'text-yellow-400'}`}>
                  {usageData?.subscription?.isActive ? '💎 Pro User' : '🆓 Free User'}
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">User Status</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm ghost">Can View Reports:</span>
                <div className={`font-semibold ${usageData?.userStatus?.canViewReports ? 'text-green-400' : 'text-red-400'}`}>
                  {usageData?.userStatus?.canViewReports ? '✓ Yes' : '✗ No'}
                </div>
              </div>
              <div>
                <span className="text-sm ghost">Needs Login:</span>
                <div className={`font-semibold ${usageData?.userStatus?.needsLogin ? 'text-yellow-400' : 'text-green-400'}`}>
                  {usageData?.userStatus?.needsLogin ? '⚠ Yes' : '✓ No'}
                </div>
              </div>
              <div>
                <span className="text-sm ghost">Needs Upgrade:</span>
                <div className={`font-semibold ${usageData?.userStatus?.needsUpgrade ? 'text-orange-400' : 'text-green-400'}`}>
                  {usageData?.userStatus?.needsUpgrade ? '💰 Yes' : '✓ No'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Free Usage */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-400">🆓 Free Usage (No Login)</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Usage Count:</span>
                <span className="font-semibold">
                  {usageData?.freeUsage?.cookie?.count || 0} / {usageData?.freeUsage?.limit}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Current Month:</span>
                <span className="font-mono text-xs">
                  {usageData?.freeUsage?.cookie?.month || 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span className={`font-semibold ${usageData?.freeUsage?.status?.remaining > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {usageData?.freeUsage?.status?.remaining || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Exceeded Limit:</span>
                <span className={`font-semibold ${usageData?.freeUsage?.status?.hasExceededLimit ? 'text-red-400' : 'text-green-400'}`}>
                  {usageData?.freeUsage?.status?.hasExceededLimit ? '✗ Yes' : '✓ No'}
                </span>
              </div>
            </div>
          </div>

          {/* Auth Usage */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-400">🔐 Authenticated Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Usage Count:</span>
                <span className="font-semibold">
                  {usageData?.authUsage?.cookie?.count || 0} / {usageData?.authUsage?.limit}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Current Month:</span>
                <span className="font-mono text-xs">
                  {usageData?.authUsage?.cookie?.month || 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span className={`font-semibold ${usageData?.authUsage?.status?.remaining > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {usageData?.authUsage?.status?.remaining || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Exceeded Limit:</span>
                <span className={`font-semibold ${usageData?.authUsage?.status?.hasExceededLimit ? 'text-red-400' : 'text-green-400'}`}>
                  {usageData?.authUsage?.status?.hasExceededLimit ? '✗ Yes' : '✓ No'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cookie Data */}
        <div className="card p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">🍪 Raw Cookie Data</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-blue-400">Free Usage Cookie</h4>
              <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(usageData?.freeUsage?.cookie, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-green-400">Auth Usage Cookie</h4>
              <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
                {JSON.stringify(usageData?.authUsage?.cookie, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">🛠 Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={clearUsage}
              className="btn-primary px-4 py-2 rounded-lg"
            >
              🗑 Clear All Usage
            </button>
            <button
              onClick={checkUsage}
              className="btn px-4 py-2 rounded-lg"
            >
              🔄 Refresh Data
            </button>
            <button
              onClick={addDemoUser}
              className="btn px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
            >
              👑 Add Demo Pro User
            </button>
            <a
              href="/report"
              className="btn px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700"
            >
              📊 Test Report Page
            </a>
            <a
              href="/login"
              className="btn px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700"
            >
              🔐 Test Login Page
            </a>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="card p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">📋 User Flow</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">1</span>
              <span>Visitor opens /report → Can view 2 free demo reports</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-green-500 rounded-full text-white text-xs flex items-center justify-center">2</span>
              <span>After 2 reports → Redirected to Google login</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-purple-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
              <span>After login → Can view 5 reports per month</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">4</span>
              <span>After 5 reports → Redirected to Stripe upgrade</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 bg-yellow-500 rounded-full text-white text-xs flex items-center justify-center">5</span>
              <span>After payment → Unlimited access</span>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-6 text-xs ghost">
          <div>Current Month: {usageData?.currentMonth}</div>
          <div>Timestamp: {usageData?.timestamp}</div>
        </div>
      </div>
    </>
  )
}
