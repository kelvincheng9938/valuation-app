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

  // Get available tickers (demo or live)
  const availableTickers = getAvailableTickers()

  // Organize tickers by category for better UX
  const tickerCategories = {
    'Mega Cap Tech': ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META', 'AMZN'],
    'Growth & AI': ['CRM', 'SNOW', 'PLTR', 'CRWD', 'ZM', 'SHOP'],
    'Healthcare': ['LLY', 'ISRG'],
    'Financial': ['HOOD', 'COIN', 'BAC'],
    'Consumer': ['TSLA', 'NFLX', 'HD', 'MCD', 'NKE', 'KO', 'DIS'],
    'Other': availableTickers.filter(t => 
      !['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META', 'AMZN', 'CRM', 'SNOW', 'PLTR', 'CRWD', 'ZM', 'SHOP', 'LLY', 'ISRG', 'HOOD', 'COIN', 'BAC', 'TSLA', 'NFLX', 'HD', 'MCD', 'NKE', 'KO', 'DIS'].includes(t)
    )
  }

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
      
      // Initialize charts with new data
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

  // Demo mode indicator
  const isDemoMode = stockData?.dataQuality?.quote === 'demo'

  const getDataQualityBadge = (quality, label) => {
    if (quality === 'demo') {
      return <span className="chip px-2 py-1 text-blue-400">📊 {label}: Demo</span>
    } else if (quality === true || quality === 'live' || quality === 'historical') {
      return <span className="chip px-2 py-1 text-green-400">✓ {label}: Live</span>
    } else if (quality === 'fallback' || quality === 'sector_default' || quality === 'known_structure') {
      return <span className="chip px-2 py-1 text-yellow-400">⚠ {label}: Estimated</span>
    } else {
      return <span className="chip px-2 py-1 text-red-400">✗ {label}: N/A</span>
    }
  }

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
            {isDemoMode && (
              <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 mb-6">
                <div className="text-blue-400 font-medium mb-2">📊 Demo Mode Available</div>
                <div className="text-sm ghost">
                  Try one of these available demo tickers: {availableTickers.slice(0, 8).join(', ')}, and more...
                </div>
              </div>
            )}
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
                        Exploring comprehensive stock analysis with realistic September 2025 data
                      </div>
                    </div>
                  </div>
                  <div className="chip px-3 py-2 bg-blue-500/20">
                    <span className="text-blue-400 font-medium">Demo Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Search and Stock Selection */}
          <div className="mb-6">
            <div className="card p-4">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder={isDemoMode ? "Try GOOGL, MSFT, LLY..." : "Enter ticker (e.g., MSFT)"}
                    className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none w-48"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary px-4 py-2 rounded-lg"
                    disabled={loading}
                  >
                    Analyze
                  </button>
                </form>
                
                <div className="text-sm ghost">
                  {isDemoMode ? 'Browse 30 demo stocks by category below' : 'Quick search available stocks'}
                </div>
              </div>

              {/* Scrollable Stock Categories */}
              <div className="space-y-4">
                {Object.entries(tickerCategories).map(([category, tickers]) => 
                  tickers.length > 0 && (
                    <div key={category}>
                      <div className="text-sm font-medium text-cyan-400 mb-2">{category}</div>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                        <div className="flex gap-2 min-w-max">
                          {tickers.map(t => (
                            <button
                              key={t}
                              onClick={() => loadStockData(t)}
                              className={`chip px-3 py-2 text-sm transition-all whitespace-nowrap ${
                                ticker === t 
                                  ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/40 font-medium' 
                                  : 'hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Data Quality Indicators */}
              {stockData?.dataQuality && (
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="ghost">Data sources:</span>
                    {getDataQualityBadge(stockData.dataQuality.quote, 'Price')}
                    {getDataQualityBadge(stockData.dataQuality.estimates, 'EPS')}
                    {getDataQualityBadge(stockData.dataQuality.peHistory, 'P/E Bands')}
                    {getDataQualityBadge(stockData.dataQuality.peers, 'Peers')}
                    {getDataQualityBadge(stockData.dataQuality.segments, 'Segments')}
                    {isDemoMode && (
                      <span className="chip px-2 py-1 text-purple-400">
                        ✨ Ready for live data
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Demo Information Panel */}
              {isDemoMode && (
                <div className="mt-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg p-3 border border-blue-400/10">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1">💡</div>
                    <div>
                      <div className="text-blue-400 font-medium text-sm mb-1">Professional Demo Features</div>
                      <div className="text-xs text-blue-300/70 leading-relaxed">
                        Full institutional-grade analysis with forward EPS estimates, dynamic P/E valuation bands, 
                        peer comparisons, and comprehensive financial health scoring. 
                        <span className="text-blue-400 font-medium"> Ready to go live with real APIs.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stock Header */}
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h1 className="text-xl font-semibold tracking-wide">
                  {stockData?.name || 'Loading...'} ({ticker})
                  {isDemoMode && (
                    <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      DEMO
                    </span>
                  )}
                </h1>
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

          {/* Rest of the existing component layout remains the same... */}
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
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Growth Score</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.growth?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Profitability</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.profit?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card kpi p-4">
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

            {/* Main content area continues with existing layout... */}
            <div className="col-span-12 lg:col-span-9 space-y-4 z-0">
              {/* Company info, valuation chart, peers, segments, analysis, news... */}
              {/* (Rest of existing component remains unchanged) */}
              
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
                    <div className="text-sm ghost">Current Price: ${stockData?.price?.toFixed(2) || '0.00'}</div>
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
                        {isDemoMode && (
                          <span className="chip px-2 py-1 text-blue-400">
                            📊 Demo Analysis
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
                        {isDemoMode 
                          ? 'This demo ticker may not have complete EPS data. Try AAPL, MSFT, GOOGL, or LLY for full analysis.'
                          : 'No forward EPS estimates available from analysts. This ticker may have limited coverage.'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
              
              {/* Continue with existing sections... */}
            </div>
          </section>

          {/* Peers and Segments Section */}
          <section className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 lg:col-span-8">
              <ErrorBoundary fallback="Peers chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Peers – Forward P/E vs Market Cap</div>
                    <div className="flex items-center gap-2">
                      {isDemoMode && (
                        <span className="chip px-2 py-1 text-blue-400 text-xs">
                          📊 Demo Comparison
                        </span>
                      )}
                      <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                    </div>
                  </div>
                  
                  {stockData?.peers?.length > 0 ? (
                    <div id="peersChart" className="chart"></div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-yellow-400 text-xl mb-2">🏢</div>
                      <div className="text-sm ghost">
                        {isDemoMode 
                          ? 'Peer comparison data not available for this demo ticker. Try AAPL, MSFT, or GOOGL for full peer analysis.'
                          : 'No peer comparison data available for this ticker'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>
            
            <aside className="col-span-12 lg:col-span-4">
              <ErrorBoundary fallback="Segment chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Revenue by Segment</div>
                    {isDemoMode && (
                      <span className="chip px-2 py-1 text-blue-400 text-xs">
                        📈 Demo Data
                      </span>
                    )}
                  </div>
                  
                  {stockData?.segments?.length > 0 ? (
                    <div id="segmentPie" className="chart"></div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-yellow-400 text-xl mb-2">📈</div>
                      <div className="text-sm ghost">
                        {isDemoMode 
                          ? 'Revenue segment breakdown not available for this demo ticker. Major companies like AAPL, MSFT, GOOGL have detailed segments.'
                          : 'No revenue segment breakdown available for this ticker'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </aside>
          </section>

          {/* Investment Analysis Section */}
          <section className="mt-4">
            <ErrorBoundary fallback="Investment analysis section failed">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Investment Analysis</div>
                  {isDemoMode && (
                    <span className="chip px-2 py-1 text-blue-400 text-xs">
                      🎯 Professional Analysis
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="ghost text-sm mb-2 flex items-center gap-2">
                      <span className="text-green-400">✓</span> Key Investment Strengths
                    </div>
                    <ul className="space-y-2 text-sm">
                      {stockData?.strengths?.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1 text-xs">●</span>
                          <span className="leading-relaxed">{strength}</span>
                        </li>
                      )) || (
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">●</span>
                          <span>Loading investment strengths analysis...</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <div className="ghost text-sm mb-2 flex items-center gap-2">
                      <span className="text-red-400">⚠</span> Key Investment Risks
                    </div>
                    <ul className="space-y-2 text-sm">
                      {stockData?.risks?.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400 mt-1 text-xs">●</span>
                          <span className="leading-relaxed">{risk}</span>
                        </li>
                      )) || (
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">●</span>
                          <span>Loading investment risks analysis...</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {isDemoMode && (
                  <div className="mt-4 bg-blue-500/5 rounded-lg p-3 border border-blue-400/10">
                    <div className="text-xs text-blue-300/70">
                      💡 <span className="text-blue-400 font-medium">Professional Analysis:</span> These strengths and risks are based on 
                      current business fundamentals, market positioning, and industry dynamics. In live mode, this analysis 
                      would be enhanced with real-time financial metrics and market data.
                    </div>
                  </div>
                )}
              </div>
            </ErrorBoundary>
          </section>

          {/* News Section */}
          <section className="mt-4">
            <ErrorBoundary fallback="News section failed to load">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Latest Company News</div>
                  <div className="flex items-center gap-2 text-sm ghost">
                    {isDemoMode ? (
                      <span className="chip px-2 py-1 text-blue-400 text-xs">📰 Demo News</span>
                    ) : (
                      stockData?.newsSource === 'live' && <span className="text-green-400">● Live</span>
                    )}
                    <span>{stockData?.news?.length || 0} items</span>
                  </div>
                </div>
                
                {stockData?.news?.length > 0 ? (
                  <ul className="divide-y divide-white/10">
                    {stockData.news.slice(0, 6).map((item, i) => (
                      <li key={i} className="py-3">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded cursor-pointer transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs ghost">{item.source}</div>
                            <div className="text-xs ghost">{item.datetime}</div>
                          </div>
                          <div className="text-sm group-hover:text-cyan-400 transition-colors font-medium mb-1">
                            {item.headline}
                          </div>
                          {item.summary && item.summary !== item.headline && (
                            <div className="text-xs ghost leading-relaxed">{item.summary}</div>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-yellow-400 text-xl mb-2">📰</div>
                    <div className="text-sm ghost">
                      {isDemoMode 
                        ? `No recent news available in demo for ${ticker}. Major stocks like AAPL, MSFT, GOOGL have sample news articles.`
                        : `No recent news available for ${ticker}`
                      }
                    </div>
                  </div>
                )}

                {isDemoMode && stockData?.news?.length > 0 && (
                  <div className="mt-4 bg-blue-500/5 rounded-lg p-3 border border-blue-400/10">
                    <div className="text-xs text-blue-300/70">
                      📡 <span className="text-blue-400 font-medium">News Integration:</span> In live mode, this section automatically 
                      pulls the latest company-specific news, earnings announcements, and analyst updates from premium financial news sources.
                    </div>
                  </div>
                )}
              </div>
            </ErrorBoundary>
          </section>

          {/* Final CTA for Demo Mode */}
          {isDemoMode && (
            <div className="mt-8">
              <div className="card p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-400/20">
                <div className="text-center">
                  <div className="text-blue-400 font-semibold mb-2">🚀 Ready to Go Live?</div>
                  <div className="text-sm ghost mb-4">
                    This demo showcases institutional-grade stock analysis. When you're ready to launch with real-time data, 
                    simply switch to live API mode and all features will work with current market data.
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Forward EPS Estimates</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Dynamic P/E Bands</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Peer Comparisons</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Quality Scoring</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Real-time News</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </>
  )
}
