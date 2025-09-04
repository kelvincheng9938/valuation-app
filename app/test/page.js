'use client'
import { useState } from 'react'
import Navigation from '@/components/Navigation'

export default function TestPage() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const runTests = async () => {
    setLoading(true)
    const testResults = {}
    
    try {
      // Test 1: Check market-data API GET
      console.log('🧪 Testing GET /api/market-data')
      const getResponse = await fetch('/api/market-data', {
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      })
      testResults.getData = {
        status: getResponse.status,
        ok: getResponse.ok,
        data: await getResponse.json()
      }
      
      // Test 2: Check market-data API POST
      console.log('🧪 Testing POST /api/market-data')
      const testData = {
        sp500: { price: 6100.0, change: 1.5 },
        nasdaq: { price: 20000.0, change: 2.0 },
        bitcoin: { price: 95000, change: -1.0 },
        gold: { price: 2650.0, change: 0.5 },
        oil: { price: 70.0, change: -0.5 }
      }
      
      const postResponse = await fetch('/api/market-data', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(testData)
      })
      
      testResults.postData = {
        status: postResponse.status,
        ok: postResponse.ok,
        data: await postResponse.json()
      }
      
      // Test 3: Verify data was saved by reading again
      console.log('🧪 Testing data persistence')
      const verifyResponse = await fetch('/api/market-data', {
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      })
      testResults.verifyData = {
        status: verifyResponse.status,
        ok: verifyResponse.ok,
        data: await verifyResponse.json()
      }
      
      // Test 4: Check if news page can fetch the data
      console.log('🧪 Testing news page integration')
      testResults.newsIntegration = {
        sp500Updated: testResults.verifyData.data?.sp500?.price === 6100,
        dataSource: testResults.verifyData.data?.dataSource,
        lastUpdated: testResults.verifyData.data?.lastUpdated
      }
      
      setResults(testResults)
      
    } catch (error) {
      console.error('Test error:', error)
      setResults({ error: error.message })
    }
    
    setLoading(false)
  }

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">🧪 Market Data System Test</h1>
          <p className="text-gray-400">
            Test the market data API and verify it's working properly.
          </p>
        </div>

        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Run Diagnostics</h2>
            <button
              onClick={runTests}
              disabled={loading}
              className="btn-primary px-6 py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? '🔄 Running Tests...' : '▶️ Run All Tests'}
            </button>
          </div>
          
          <div className="text-sm ghost">
            This will test: API endpoints, data persistence, and news page integration
          </div>
        </div>

        {results && (
          <div className="space-y-4">
            {results.error ? (
              <div className="card p-6 bg-red-500/10 border-red-400/20">
                <div className="text-red-400 font-semibold mb-2">❌ Test Error</div>
                <div className="text-sm text-red-300">{results.error}</div>
              </div>
            ) : (
              <>
                {/* GET Test */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-lg ${results.getData?.ok ? '✅' : '❌'}`}>
                      {results.getData?.ok ? '✅' : '❌'}
                    </span>
                    <h3 className="font-semibold">GET /api/market-data</h3>
                    <span className="text-xs ghost">Status: {results.getData?.status}</span>
                  </div>
                  <div className="text-sm">
                    <div>Data Source: <span className="text-cyan-400">{results.getData?.data?.dataSource}</span></div>
                    <div>SP500: <span className="text-cyan-400">${results.getData?.data?.sp500?.price}</span></div>
                    <div>Last Updated: <span className="text-cyan-400">{results.getData?.data?.lastUpdated}</span></div>
                  </div>
                </div>

                {/* POST Test */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-lg ${results.postData?.ok ? '✅' : '❌'}`}>
                      {results.postData?.ok ? '✅' : '❌'}
                    </span>
                    <h3 className="font-semibold">POST /api/market-data</h3>
                    <span className="text-xs ghost">Status: {results.postData?.status}</span>
                  </div>
                  <div className="text-sm">
                    <div>Success: <span className="text-cyan-400">{results.postData?.data?.success ? 'Yes' : 'No'}</span></div>
                    <div>Message: <span className="text-cyan-400">{results.postData?.data?.message}</span></div>
                    {results.postData?.data?.error && (
                      <div className="text-red-400">Error: {results.postData.data.error}</div>
                    )}
                  </div>
                </div>

                {/* Verify Test */}
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-lg ${results.verifyData?.ok ? '✅' : '❌'}`}>
                      {results.verifyData?.ok ? '✅' : '❌'}
                    </span>
                    <h3 className="font-semibold">Data Persistence Check</h3>
                  </div>
                  <div className="text-sm">
                    <div>SP500 Updated: <span className="text-cyan-400">{results.newsIntegration?.sp500Updated ? 'Yes' : 'No'}</span></div>
                    <div>Data Source: <span className="text-cyan-400">{results.newsIntegration?.dataSource}</span></div>
                    <div>Last Updated: <span className="text-cyan-400">{results.newsIntegration?.lastUpdated}</span></div>
                  </div>
                </div>

                {/* Overall Status */}
                <div className="card p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20">
                  <h3 className="font-semibold mb-3">🎯 Overall System Status</h3>
                  <div className="text-sm space-y-2">
                    <div>✅ API Endpoints: {results.getData?.ok && results.postData?.ok ? 'Working' : 'Issues Detected'}</div>
                    <div>✅ Data Persistence: {results.newsIntegration?.sp500Updated ? 'Working' : 'Issues Detected'}</div>
                    <div>✅ News Page Ready: {results.newsIntegration?.dataSource === 'manual' ? 'Yes' : 'Using Demo Data'}</div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-blue-400/20">
                    <div className="text-xs text-blue-300/70">
                      💡 <strong>Next Steps:</strong> If all tests pass, go to <a href="/admin" className="text-cyan-400 hover:underline">/admin</a> to update market data, 
                      then visit <a href="/news" className="text-cyan-400 hover:underline">/news</a> to see your changes.
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
