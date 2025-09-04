// app/debug-auth/page.js
'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function DebugAuthPage() {
  const { data: session, status } = useSession()
  const [envCheck, setEnvCheck] = useState(null)

  useEffect(() => {
    checkEnvironment()
  }, [])

  const checkEnvironment = async () => {
    try {
      const response = await fetch('/api/debug-auth')
      const data = await response.json()
      setEnvCheck(data)
    } catch (error) {
      setEnvCheck({ error: error.message })
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">🔧 NextAuth Debug Panel</h1>
        
        {/* Session Status */}
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Session Status</h2>
          <div className="space-y-2">
            <div>Status: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{status}</span></div>
            {session && (
              <div>
                <div>Email: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{session.user?.email}</span></div>
                <div>Name: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{session.user?.name}</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Environment Check */}
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Environment Variables</h2>
          {envCheck ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={envCheck.hasGoogleClientId ? 'text-green-600' : 'text-red-600'}>
                  {envCheck.hasGoogleClientId ? '✅' : '❌'}
                </span>
                <span>GOOGLE_CLIENT_ID</span>
                {envCheck.googleClientIdPreview && (
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {envCheck.googleClientIdPreview}...
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={envCheck.hasGoogleClientSecret ? 'text-green-600' : 'text-red-600'}>
                  {envCheck.hasGoogleClientSecret ? '✅' : '❌'}
                </span>
                <span>GOOGLE_CLIENT_SECRET</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={envCheck.hasNextAuthSecret ? 'text-green-600' : 'text-red-600'}>
                  {envCheck.hasNextAuthSecret ? '✅' : '❌'}
                </span>
                <span>NEXTAUTH_SECRET</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={envCheck.hasNextAuthUrl ? 'text-green-600' : 'text-red-600'}>
                  {envCheck.hasNextAuthUrl ? '✅' : '❌'}
                </span>
                <span>NEXTAUTH_URL</span>
                {envCheck.nextAuthUrl && (
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {envCheck.nextAuthUrl}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div>Loading environment check...</div>
          )}
        </div>

        {/* Setup Instructions */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">🚀 Setup Instructions</h2>
          <div className="text-sm space-y-2">
            <p><strong>1. Create Google OAuth App:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" className="text-blue-600 underline">Google Cloud Console</a></li>
              <li>Create OAuth 2.0 Client ID</li>
              <li>Add redirect URI: <code className="bg-gray-100 px-1 rounded">{typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/auth/callback/google</code></li>
            </ul>
            
            <p><strong>2. Update .env.local:</strong></p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
{`GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_SECRET=generate-a-random-32-char-string
NEXTAUTH_URL=${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}`}
            </pre>
            
            <p><strong>3. Restart your dev server</strong> after updating .env.local</p>
          </div>
        </div>

        {/* Test Login */}
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Test Authentication</h2>
          {status === 'unauthenticated' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Click the button below to test Google Sign-in:</p>
              <a
                href="/api/auth/signin/google"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🔐 Test Google Sign-in
              </a>
            </div>
          )}
          
          {status === 'authenticated' && (
            <div className="space-y-3">
              <p className="text-sm text-green-600">✅ Authentication is working! You are signed in.</p>
              <a
                href="/api/auth/signout"
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🚪 Sign Out
              </a>
            </div>
          )}
          
          {status === 'loading' && (
            <p className="text-sm text-gray-600">Loading authentication status...</p>
          )}
        </div>

        {/* Common Errors */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">🚨 Common Issues</h2>
          <div className="text-sm space-y-2">
            <div>
              <strong>400 Error "redirect_uri_mismatch":</strong>
              <p className="ml-4">Make sure your Google OAuth redirect URI exactly matches: <code className="bg-gray-100 px-1">{typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/auth/callback/google</code></p>
            </div>
            
            <div>
              <strong>400 Error "invalid_client":</strong>
              <p className="ml-4">Check your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local</p>
            </div>
            
            <div>
              <strong>Missing environment variables:</strong>
              <p className="ml-4">Make sure all required variables are set and restart your dev server</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
