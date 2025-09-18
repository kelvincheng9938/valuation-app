// app/debug-overlay/page.js - Test page to debug ORCL and Google Sheet overlay
'use client'
import { useEffect, useState } from 'react'
import Navigation from '@/components/Navigation'

export default function DebugOverlayPage() {
  const [debugData, setDebugData] = useState(null)
  const [orclData, setOrclData] = useState(null)
  const [csvData, setCsvData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    runDebugTests()
  }, [])

  const runDebugTests = async () => {
    setLoading(true)
    setError(null)
    
    try {
      console.log('🔄 Starting overlay debug tests...')
      
      // Test 1: Check environment variable
      const envUrl = process.env.NEXT_PUBLIC_DAILY_CSV_URL
      console.log('🔍 CSV URL from environment:', envUrl)
      
      // Test 2: Try to fetch CSV directly
      let csvContent = null
      let csvError = null
      
      if (envUrl && envUrl !== '<PASTE_MY_GOOGLE_SHEET_CSV_URL_HERE>') {
        try {
          console.log('🔄 Fetching CSV directly...')
          const csvResponse = await fetch(envUrl, { cache: 'no-store' })
          if (csvResponse.ok) {
            csvContent = await csvResponse.text()
            console.log('✅ CSV fetched successfully, length:', csvContent.length)
            console.log('📋 CSV preview:', csvContent.substring(0, 500))
          } else {
            csvError = `HTTP ${csvResponse.status}: ${csvResponse.statusText}`
          }
        } catch (err) {
          csvError = err.message
        }
      } else {
        csvError = 'Environment variable not configured or has placeholder value'
      }
      
      setCsvData({
        url: envUrl,
        content: csvContent,
        error: csvError,
        contentPreview: csvContent ? csvContent.substring(0, 1000) : null
      })
      
      // Test 3: Try to load ORCL specifically
      let orclResult = null
      let orclError = null
      
      try {
        console.log('🔄 Testing ORCL data loading...')
        const orclResponse = await fetch('/report?ticker=ORCL')
        // We can't directly call fetchStockData from client, so we'll use a different approach
        
        // Instead, let's test the API endpoints that might be involved
        const debugInfo = {
          timestamp: new Date().toISOString(),
          environmentUrl: envUrl,
          csvError: csvError,
          csvLength: csvContent?.length || 0
        }
        
        orclResult = debugInfo
      } catch (err) {
        orclError = err.message
      }
      
      setOrclData({
        result: orclResult,
        error: orclError
      })
      
      // Set overall debug data
      setDebugData({
        environmentCheck: {
          hasUrl: !!envUrl,
          isPlaceholder: envUrl === '<PASTE_MY_GOOGLE_SHEET_CSV_URL_HERE>',
          url: envUrl
        },
        csvTest: {
          success: !!csvContent,
          error: csvError,
          contentLength: csvContent?.length || 0
        },
        orclTest: {
          success: !!orclResult,
          error: orclError
        }
      })
      
    } catch (err) {
      setError(err.message)
      console.error('Debug test error:', err)
    } finally {
      setLoading(false)
    }
  }

  const testOrclDirectly = async () => {
    try {
      console.log('🔄 Testing ORCL via report page...')
      // Open ORCL in new tab and log the result
      window.open('/report?ticker=ORCL', '_blank')
      
      // Also try to get available tickers to see if ORCL is listed
      const response = await fetch('/api/available-tickers')
      if (response.ok) {
        const tickers = await response.json()
        console.log('📋 Available tickers:', tickers)
        
        if (tickers.includes('ORCL')) {
          alert('✅ ORCL found in available tickers! Check the new tab for the report.')
        } else {
          alert('❌ ORCL not found in available tickers. Check the console logs.')
        }
      }
    } catch (error) {
      console.error('ORCL test error:', error)
      alert('Error testing ORCL: ' + error.message)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="card p-8 text-center">
            <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg">Running overlay debug tests...</div>
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
          <h1 className="text-3xl font-bold mb-2">🔧 Google Sheet Overlay Debug</h1>
          <p className="text-gray-400">
            Test and debug the Google Sheet overlay system for ORCL and other tickers.
          </p>
        </div>

        {error && (
          <div className="card p-6 mb-6 bg-red-500/10 border-red-400/30">
            <div className="text-red-400 font-semibold mb-2">❌ Debug Error</div>
            <div className="text-sm text-red-300">{error}</div>
          </div>
        )}

        {/* Environment Check */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Environment Variable Check</h2>
          {debugData?.environmentCheck ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={debugData.environmentCheck.hasUrl ? 'text-green-400' : 'text-red-400'}>
                  {debugData.environmentCheck.hasUrl ? '✅' : '❌'}
                </span>
                <span>NEXT_PUBLIC_DAILY_CSV_URL exists</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={!debugData.environmentCheck.isPlaceholder ? 'text-green-400' : 'text-red-400'}>
                  {!debugData.environmentCheck.isPlaceholder ? '✅' : '❌'}
                </span>
                <span>Not using placeholder value</span>
              </div>
              
              {debugData.environmentCheck.url && (
                <div className="mt-4 p-3 bg-gray-800 rounded text-sm">
                  <div className="text-gray-400 mb-1">Current URL:</div>
                  <div className="break-all font-mono text-xs">
                    {debugData.environmentCheck.url}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400">Loading...</div>
          )}
        </div>

        {/* CSV Fetch Test */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">2. CSV Fetch Test</h2>
          {csvData ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className={!csvData.error ? 'text-green-400' : 'text-red-400'}>
                  {!csvData.error ? '✅' : '❌'}
                </span>
                <span>CSV fetch from Google Sheets</span>
              </div>
              
              {csvData.error && (
                <div className="bg-red-500/10 border border-red-400/20 rounded p-3">
                  <div className="text-red-400 font-medium">Error:</div>
                  <div className="text-red-300 text-sm">{csvData.error}</div>
                </div>
              )}
              
              {csvData.content && (
                <div className="space-y-3">
                  <div className="text-green-400">
                    ✅ CSV loaded successfully ({csvData.content.length} characters)
                  </div>
                  
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-gray-400 mb-2">CSV Preview (first 1000 chars):</div>
                    <pre className="text-xs text-gray-200 overflow-auto whitespace-pre-wrap">
                      {csvData.contentPreview}
                    </pre>
                  </div>
                  
                  {/* Check for ORCL in CSV */}
                  <div className="mt-4">
                    <div className="text-gray-400 mb-2">ORCL Check:</div>
                    {csvData.content.includes('ORCL') ? (
                      <div className="text-green-400">✅ ORCL found in CSV data</div>
                    ) : (
                      <div className="text-red-400">❌ ORCL not found in CSV data</div>
                    )}
                    
                    {csvData.content.includes('301.41') ? (
                      <div className="text-green-400">✅ Price 301.41 found in CSV data</div>
                    ) : (
                      <div className="text-yellow-400">⚠️ Price 301.41 not found in CSV data</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-400">Loading...</div>
          )}
        </div>

        {/* ORCL Test */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">3. ORCL Integration Test</h2>
          <div className="space-y-4">
            <button
              onClick={testOrclDirectly}
              className="btn-primary px-6 py-3 rounded-lg font-medium"
            >
              📊 Test ORCL Report Page
            </button>
            
            <div className="text-sm text-gray-400">
              This will open ORCL in a new tab. Check the browser console for detailed logs.
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">4. Setup Instructions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-medium text-white mb-2">If CSV fetch is failing:</div>
              <ul className="space-y-1 text-gray-300 ml-4">
                <li>• Ensure your Google Sheet is published to web as CSV</li>
                <li>• Check the URL format matches the expected pattern</li>
                <li>• Verify the sheet is publicly accessible</li>
              </ul>
            </div>
            
            <div>
              <div className="font-medium text-white mb-2">If ORCL is not found:</div>
              <ul className="space-y-1 text-gray-300 ml-4">
                <li>• Ensure your CSV has a "Ticker" column with "ORCL" or "ORCL US EQUITY"</li>
                <li>• Ensure your CSV has a "Market_Price" or "Price" column with "301.41"</li>
                <li>• Check that there are no extra spaces or formatting issues</li>
              </ul>
            </div>
            
            <div>
              <div className="font-medium text-white mb-2">Expected CSV format:</div>
              <div className="bg-gray-800 rounded p-3 font-mono text-xs">
                Ticker,Market_Price,Company_Name<br/>
                ORCL US EQUITY,301.41,Oracle Corporation<br/>
                ...
              </div>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="text-center">
          <button
            onClick={runDebugTests}
            className="btn px-6 py-3 rounded-lg font-medium"
          >
            🔄 Run Tests Again
          </button>
        </div>

        {/* Console Instructions */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
          <div className="text-blue-400 font-medium mb-2">💡 Debugging Tips</div>
          <div className="text-sm text-blue-300 space-y-1">
            <div>• Open browser DevTools (F12) to see detailed console logs</div>
            <div>• Look for "ORCL DATA FOUND" messages in the console</div>
            <div>• Check for "PRICE UPDATED" logs showing the $301.41 price</div>
            <div>• Any overlay errors will be clearly marked with ❌</div>
          </div>
        </div>
      </div>
    </>
  )
}
