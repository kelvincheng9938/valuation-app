// app/overlay-test/page.js - Temporary test page for Google Sheet overlay
import { getAllStockData } from '@/lib/api'
import { getOverlayUrl } from '@/lib/sheetOverlay'

export default async function OverlayTestPage() {
  let testResults = {
    overlayUrl: null,
    error: null,
    stocks: [],
    overlayedCount: 0,
    totalCount: 0
  }

  try {
    // Check overlay URL
    testResults.overlayUrl = getOverlayUrl()
    
    // Get all stock data with overlay applied
    const allStocks = await getAllStockData()
    testResults.stocks = allStocks.slice(0, 8) // First 8 for display
    testResults.totalCount = allStocks.length
    testResults.overlayedCount = allStocks.filter(stock => 
      stock.dataQuality?.overlayed === true
    ).length

  } catch (error) {
    testResults.error = error.message
    console.error('Overlay test error:', error)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">🧪 Google Sheet Overlay Test</h1>
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Configuration Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-400">Overlay URL:</span>
                <div className="mt-1 p-2 bg-gray-700 rounded text-sm break-all">
                  {testResults.overlayUrl || '❌ Not configured'}
                </div>
              </div>
              
              <div>
                <span className="text-gray-400">Status:</span>
                <div className="mt-1">
                  {testResults.error ? (
                    <span className="text-red-400">❌ Error: {testResults.error}</span>
                  ) : testResults.overlayUrl ? (
                    <span className="text-green-400">✅ Ready</span>
                  ) : (
                    <span className="text-yellow-400">⚠️ No overlay URL</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Overlay Results</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{testResults.totalCount}</div>
                <div className="text-gray-400">Total Stocks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{testResults.overlayedCount}</div>
                <div className="text-gray-400">Overlayed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-400">{testResults.totalCount - testResults.overlayedCount}</div>
                <div className="text-gray-400">Base Only</div>
              </div>
            </div>
          </div>

          {testResults.stocks.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">Sample Data (First 8 Stocks)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Ticker</th>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-right py-3 px-4">Price</th>
                      <th className="text-right py-3 px-4">P50 (PE)</th>
                      <th className="text-center py-3 px-4">Scores</th>
                      <th className="text-left py-3 px-4">News</th>
                      <th className="text-center py-3 px-4">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testResults.stocks.map((stock, index) => (
                      <tr key={stock.ticker} className={`border-b border-gray-700 ${
                        stock.dataQuality?.overlayed ? 'bg-green-900/20' : 'bg-gray-800/50'
                      }`}>
                        <td className="py-3 px-4 font-mono font-bold">
                          {stock.ticker}
                        </td>
                        <td className="py-3 px-4 truncate max-w-[200px]">
                          {stock.name}
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          ${stock.price?.toFixed(2) || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-right font-mono">
                          {stock.peBands?.mid?.toFixed(1) || 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center space-x-1 text-xs">
                            <span className="bg-blue-500/20 text-blue-400 px-1 rounded">
                              V:{stock.scores?.value?.toFixed(1) || 'N/A'}
                            </span>
                            <span className="bg-green-500/20 text-green-400 px-1 rounded">
                              G:{stock.scores?.growth?.toFixed(1) || 'N/A'}
                            </span>
                            <span className="bg-purple-500/20 text-purple-400 px-1 rounded">
                              P:{stock.scores?.profitability?.toFixed(1) || 'N/A'}
                            </span>
                            <span className="bg-orange-500/20 text-orange-400 px-1 rounded">
                              M:{stock.scores?.momentum?.toFixed(1) || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 truncate max-w-[250px]">
                          {stock.news && stock.news.length > 0 ? (
                            <a 
                              href={stock.news[0].url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300"
                            >
                              {stock.news[0].headline}
                            </a>
                          ) : (
                            <span className="text-gray-500">No news</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {stock.dataQuality?.overlayed ? (
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                              📊 Overlayed
                            </span>
                          ) : (
                            <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded text-xs">
                              📁 Base
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold mb-2">📋 Instructions</h3>
            <ol className="text-sm text-gray-300 space-y-2">
              <li><strong>1.</strong> Verify your Google Sheet CSV URL is accessible (check console for fetch errors)</li>
              <li><strong>2.</strong> Confirm overlayed stocks show green backgrounds and "📊 Overlayed" badge</li>
              <li><strong>3.</strong> Check that prices and scores reflect your Google Sheet data</li>
              <li><strong>4.</strong> Test by editing your Google Sheet and refreshing this page</li>
              <li><strong>5.</strong> Once confirmed working, delete this test page: <code>app/overlay-test/</code></li>
            </ol>
          </div>

          {testResults.overlayUrl && (
            <div className="mt-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">🔧 Debugging</h3>
              <p className="text-sm text-gray-300 mb-2">
                If you see no overlayed data, check the browser console for errors. Common issues:
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• CORS error: Your Google Sheet might not be properly published</li>
                <li>• CSV format error: Header columns don't match expected format</li>
                <li>• Network error: Vercel can't access your Google Sheet URL</li>
              </ul>
              <div className="mt-3">
                <a 
                  href={testResults.overlayUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline text-sm"
                >
                  🔗 Test your CSV URL directly
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
