// components/ReportContent.js - Updated with Data Quality Warnings
'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { initCharts } from './ChartComponents'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
import { ErrorBoundary } from './ErrorBoundary'

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('AAPL')
  const [inputTicker, setInputTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)

  const availableTickers = getAvailableTickers()

  useEffect(() => {
    loadStockData('AAPL')
  }, [])

  const loadStockData = async (symbol) => {
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Loading data for ${symbol}`)
      const data = await fetchStockData(symbol.toUpperCase())
      setStockData(data)
      setTicker(symbol.toUpperCase())
      setUpdateKey(prev => prev + 1)
      
      setTimeout(async () => {
        try {
          await initCharts(data)
        } catch (chartError) {
          console.error('Chart initialization error:', chartError)
        }
      }, 300)
      
    } catch (error) {
      console.error('Error loading stock data:', error)
      setError(error.message)
      setStockData(null)
    }
    
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputTicker.trim()) {
      loadStockData(inputTicker.trim())
      setInputTicker('')
    }
  }

  // Helper function to render data quality badge
  const getDataQualityBadge = (accuracy, warning) => {
    if (accuracy === 'VERIFIED_REAL') {
      return (
        <div className="inline-flex items-center gap-1 bg-green-500/10 border border-green-400/20 rounded px-2 py-1 text-xs">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span className="text-green-400 font-medium">REAL DATA</span>
        </div>
      )
    } else if (accuracy === 'MIXED_REAL_PE') {
      return (
        <div className="inline-flex items-center gap-1 bg-yellow-500/10 border border-yellow-400/20 rounded px-2 py-1 text-xs">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          <span className="text-yellow-400 font-medium">MIXED DATA</span>
        </div>
      )
    } else {
      return (
        <div className="inline-flex items-center gap-1 bg-red-500/10 border border-red-400/20 rounded px-2 py-1 text-xs">
          <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          <span className="text-red-400 font-medium">ESTIMATED</span>
        </div>
      )
    }
  }

  // Demo mode indicator
  const isDemoMode = stockData?.dataQuality?.quote === 'demo'
  const dataAccuracy = stockData?.dataQuality?.accuracy
  const dataWarning = stockData?.dataQuality?.warning

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-lg">Loading {ticker} analysis...</div>
            <div className="mt-4">
              <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <div className="text-sm ghost mt-2">
              {isDemoMode ? 'Loading comprehensive demo analysis...' : 'Fetching live market data from APIs...'}
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <div className="text-xl font-bold mb-4">Unable to Load Analysis</div>
            <div className="text-sm ghost mb-6">{error}</div>
            <div className="space-y-3">
              <button
                onClick={() => loadStockData(ticker)}
                className="btn-primary px-6 py-2 rounded-lg mr-3"
              >
                Retry {ticker}
              </button>
              <button
                onClick={() => {
                  setError(null)
                  setInputTicker('')
                }}
                className="btn px-6 py-2 rounded-lg"
              >
                Try Different Symbol
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <ErrorBoundary fallback="Report failed to load. Please refresh the page.">
        <div className="max-w-7xl mx-auto px-4 py-5" key={updateKey}>
          
          {/* Data Quality Warning Banner */}
          {dataWarning && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-red-500/10 to-yellow-500/10 border border-red-400/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-red-400 text-xl">⚠️</div>
                  <div>
                    <div className="text-red-400 font-semibold mb-1">Data Quality Notice</div>
                    <div className="text-sm text-red-300/90">{dataWarning}</div>
                    <div className="text-xs text-red-300/70 mt-1">
                      This analysis uses estimated data. For institutional use, verify with live financial APIs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Demo Mode Header Banner */}
          {isDemoMode && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-blue-400 font-semibold">🎯 Professional Demo Mode</div>
                      <div className="text-sm text-blue-300/80">
                        {dataAccuracy === 'VERIFIED_REAL' ? 
                          'Using real market data and analyst estimates' : 
                          'Mixed real and estimated data - see quality indicators below'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDataQualityBadge(dataAccuracy, dataWarning)}
                    <div className="chip px-3 py-2 bg-blue-500/20">
                      <span className="text-blue-400 font-medium">Demo Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Ticker Search Header */}
          <div className="mb-6">
            <div className="card p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder="Enter ticker (e.g., GOOGL, CRM, SHOP...)"
                    className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary px-4 py-2 rounded-lg"
                    disabled={loading}
                  >
                    Analyze
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm ghost">Quick:</span>
                  {/* Real data stocks first */}
                  {['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'AMZN'].map(t => (
                    <button
                      key={t}
                      onClick={() => loadStockData(t)}
                      className={`chip px-2 py-1 text-xs transition-all relative ${
                        ticker === t 
                          ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/40' 
                          : 'hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {t}
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"></span>
                    </button>
                  ))}
                  {/* Mixed/Estimated data stocks */}
                  {['CRM', 'AMD', 'SHOP', 'TSLA'].map(t => (
                    <button
                      key={t}
                      onClick={() => loadStockData(t)}
                      className={`chip px-2 py-1 text-xs transition-all relative ${
                        ticker === t 
                          ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/40' 
                          : 'hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {t}
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
                    </button>
                  ))}
                  <span className="chip px-2 py-1 text-xs text-gray-400">
                    +{availableTickers.length - 10} more
                  </span>
                </div>
              </div>

              {/* Enhanced Data Quality Legend */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <span className="ghost">Data Quality:</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400">Real P/E & EPS</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400">Mixed Data</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-red-400">Estimated</span>
                </div>
                {isDemoMode && (
                  <span className="chip px-2 py-1 text-purple-400">
                    ✨ Ready for live APIs
                  </span>
                )}
              </div>

              {/* Data Quality Details */}
              {stockData?.dataQuality && (
                <div className="mt-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg p-3 border border-blue-400/10">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1">📊</div>
                    <div>
                      <div className="text-blue-400 font-medium text-sm mb-1">
                        {dataAccuracy === 'VERIFIED_REAL' ? 'High Accuracy Data' : 
                         dataAccuracy === 'MIXED_REAL_PE' ? 'Mixed Quality Data' : 'Estimated Data'}
                      </div>
                      <div className="text-xs text-blue-300/70 leading-relaxed">
                        {dataAccuracy === 'VERIFIED_REAL' ? 
                          'This analysis uses real 5-year P/E percentiles and current Wall Street analyst EPS estimates.' :
                          dataAccuracy === 'MIXED_REAL_PE' ?
                          'P/E bands are from real historical data, but EPS estimates are calculated. Use with caution for investment decisions.' :
                          'This analysis uses estimated P/E bands and EPS projections. Verify with professional financial data before investing.'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stock Header with Data Quality Badge */}
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h1 className="text-xl font-semibold tracking-wide">
                  {stockData?.name || 'Loading...'} ({ticker})
                </h1>
                <div className="flex items-center gap-2">
                  {isDemoMode && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      DEMO
                    </span>
                  )}
                  {dataAccuracy && getDataQualityBadge(dataAccuracy, dataWarning)}
                </div>
                <span className="ghost text-sm">
                  Updated: {stockData?.lastUpdated ? new Date(stockData.lastUpdated).toLocaleTimeString() : 'Just now'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  ${stockData?.price?.toFixed(2) || '0.00'}
                </div>
                {stockData?.changePercent && (
                  <div className={`text-sm ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} 
                    ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Rest of the component remains the same... */}
          <section className="grid grid-cols-12 gap-4 relative">
            <aside className="col-span-12 lg:col-span-3 lg:sticky lg:top-20 self-start z-0 space-y-3">
              <ErrorBoundary fallback="Score display failed">
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Value Score</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.value?.toFixed(1) || '0.0'}</div>
                  </div>
                  <div id="band-spark" className="mt-3 h-10 w-full"></div>
                </div>
                <div className="card kip p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Growth Score</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.growth?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card kip p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Profitability</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.profit?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card kip p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Momentum</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.momentum?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card p-4">
                  <div className="font-medium mb-2">Quality Radar</div>
                  <div id="qualityRadar" className="chart"></div>
                </div>
              </ErrorBoundary>
            </aside>

            <div className="col-span-12 lg:col-span-9 space-y-4 z-0">
              <ErrorBoundary fallback="Company info failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">About the Company</div>
                    <div className="text-sm ghost">Key Stats</div>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed">
                    {stockData?.description || 'Loading company information...'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Market Cap</div>
                      <div className="font-medium">{stockData?.marketCap || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Forward P/E</div>
                      <div className="font-medium">{stockData?.forwardPE || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">TTM P/E</div>
                      <div className="font-medium">{stockData?.ttmPE || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Sector</div>
                      <div className="font-medium">{stockData?.sector || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback="Valuation chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Valuation Analysis</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm ghost">Current: ${stockData?.price?.toFixed(2) || '0.00'}</div>
                      {dataAccuracy && dataAccuracy !== 'VERIFIED_REAL' && (
                        <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">
                          ⚠️ Est. Bands
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {stockData?.eps?.values?.length > 0 && stockData?.peBands ? (
                    <>
                      <div className="flex items-center gap-2 text-xs mb-2 flex-wrap">
                        <span className="chip px-2 py-1">
                          EPS: {stockData.eps.values.join(' / ')}
                        </span>
                        <span className="chip px-2 py-1">
                          P/E Bands: {stockData.peBands.low}× / {stockData.peBands.mid}× / {stockData.peBands.high}×
                        </span>
                        {dataAccuracy && (
                          <span className={`chip px-2 py-1 ${
                            dataAccuracy === 'VERIFIED_REAL' ? 'text-green-400' :
                            dataAccuracy === 'MIXED_REAL_PE' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {dataAccuracy === 'VERIFIED_REAL' ? '✓ Real Data' :
                             dataAccuracy === 'MIXED_REAL_PE' ? '⚠️ Mixed' : '⚠️ Estimated'}
                          </span>
                        )}
                      </div>
                      <div id="valuationChart" className="chart-lg"></div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-yellow-400 text-2xl mb-2">📊</div>
                      <div className="font-medium mb-2">Valuation Analysis Unavailable</div>
                      <div className="text-sm ghost">
                        No forward EPS estimates available for {ticker}. Try stocks with green indicators for complete analysis.
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>
          </section>

          {/* Continue with peers, segments, analysis sections... */}
          {/* [Rest of component structure remains the same] */}
        </div>
      </ErrorBoundary>
    </>
  )
}
