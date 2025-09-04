'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function DebugUsagePage() {
  const [debugInfo, setDebugInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()

  const loadDebugInfo = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/debug-usage', {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      })
      const data = await response.json()
      setDebugInfo(data)
    } catch (error) {
      setDebugInfo({ error: error.message })
    }
    setLoading(false)
  }

  useEffect(() => {
    loadDebugInfo()
  }, [])

  const clearCookies = () => {
    document.cookie = 'free_usage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    alert('Free usage cookie cleared! Refresh the page.')
    loadDebugInfo()
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-lg">Loading debug info...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">🔧 Free Usage Debug</h1>
        <p className="text-gray-400">Debug information for free usage tracking</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <div className="space-y-2 text-sm">
            <div>Status: <span className="text-cyan-400">{status}</span></div>
            <div>Authenticated: <span className="text-cyan-400">{debugInfo?.authenticated ? 'Yes' : 'No'}</span></div>
            <div>User Email: <span className="text-cyan-400">{debugInfo?.userEmail || 'None'}</span></div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Free Usage Cookie</h2>
          <div className="space-y-2 text-sm">
            <div>Has Cookie: <span className="text-cyan-400">{debugInfo?.freeUsageCookie ? 'Yes' : 'No'}</span></div>
            <div>Current Month: <span className="text-cyan-400">{debugInfo?.currentMonth}</span></div>
            <div>Is Current Month: <span className="text-cyan-400">{debugInfo?.isCurrentMonth ? 'Yes' : 'No'}</span></div>
            <div>Has Used Free View: <span className="text-cyan-400">{debugInfo?.hasUsedFreeView ? 'Yes' : 'No'}</span></div>
          </div>
        </div>
      </div>

      {debugInfo?.freeUsageCookie && (
        <div className="mt-6 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Cookie Data</h2>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo.freeUsageCookie, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button
          onClick={loadDebugInfo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          🔄 Refresh
        </button>
        <button
          onClick={clearCookies}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          🗑️ Clear Free Usage Cookie
        </button>
        <a 
          href="/report"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          📊 Go to Report
        </a>
      </div>

      <div className="mt-6 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
        <ol className="space-y-2 text-sm list-decimal list-inside">
          <li>Clear cookies using the button above</li>
          <li>Go to /report (should show first free report)</li>
          <li>Try to switch stocks (should show Google login popup)</li>
          <li>Return here to check cookie state</li>
        </ol>
      </div>

      {debugInfo?.error && (
        <div className="mt-6 bg-red-500/10 border border-red-400/30 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold mb-2">Error</h3>
          <pre className="text-sm">{debugInfo.error}</pre>
        </div>
      )}
    </div>
  )
}
