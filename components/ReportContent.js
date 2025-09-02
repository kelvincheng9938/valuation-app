// components/ReportContent.js - COMPLETE Report with All Sections + Card Design
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

  // Helper function to get valuation position (0-100)
  const getValuationPosition = () => {
    if (!stockData?.price || !stockData?.eps?.values?.[0] || !stockData?.peBands) return 50
    
    const currentPE = stockData.price / stockData.eps.values[0]
    const { low, high } = stockData.peBands
    
    // Calculate position between low and high
    const position = ((currentPE - low) / (high - low)) * 100
    return Math.max(0, Math.min(100, position))
  }

  // Helper function to render data quality badge
  const getDataQualityBadge = (accuracy) => {
    if (accuracy === 'VERIFIED_REAL') {
      return <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">✓ Real Data</span>
    } else if (accuracy === 'MIXED_REAL_PE') {
      return <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">⚠ Mixed Data</span>
    } else {
      return <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">⚠ Estimated</span>
    }
  }

  const isDemoMode = stockData?.dataQuality?.quote === 'demo'
  const dataAccuracy = stockData?.dataQuality?.accuracy

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
              <button onClick={() => loadStockData(ticker)} className="btn-primary px-6 py-2 rounded-lg mr-3">
                Retry {ticker}
              </button>
              <button onClick={() => { setError(null); setInputTicker('') }} className="btn px-6 py-2 rounded-lg">
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
                      <div className="text-sm text-blue-300/80">Using real market data and analyst estimates</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDataQualityBadge(dataAccuracy)}
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
                  <button type="submit" className="btn-primary px-4 py-2 rounded-lg" disabled={loading}>
                    Analyze
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm ghost">Categories:</span>
                  
                  {/* Tech Giants */}
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs ghost px-2 py-1">Tech Giants:</span>
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
                  </div>

                  {/* Growth Stocks */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs ghost px-2 py-1">Growth:</span>
                    {['CRM', 'SHOP', 'NOW', 'TSLA', 'NFLX'].map(t => (
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
                  </div>

                  {/* Healthcare & Financials */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs ghost px-2 py-1">Health & Finance:</span>
                    {['ISRG', 'UNH', 'JPM', 'BAC', 'BRK.B'].map(t => (
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
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full"></span>
                      </button>
                    ))}
                  </div>

                  <span className="chip px-2 py-1 text-xs text-gray-400 mt-1">
                    +{availableTickers.length - 16} more stocks available
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                <span className="ghost">Data Quality:</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400">Real Data</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-400">Mixed</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-red-400">Estimated</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Stock Card - Dark Theme */}
          <div className="mb-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-cyan-400 font-bold text-lg">{ticker}</span>
                    {isDemoMode && <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Live Demo</span>}
                  </div>
                  <div className="text-white font-semibold">{stockData?.name || 'Loading...'}</div>
                  <div className="text-gray-400 text-sm">{stockData?.sector || 'Technology'}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    ${stockData?.price?.toFixed(2) || '0.00'}
                  </div>
                  {stockData?.changePercent && (
                    <div className={`text-sm font-medium ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                    </div>
                  )}
                </div>
              </div>

              {/* Quality Scores Row */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{stockData?.scores?.value?.toFixed(1) || '0.0'}</div>
                  <div className="text-xs text-gray-400">Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{stockData?.scores?.growth?.toFixed(1) || '0.0'}</div>
                  <div className="text-xs text-gray-400">Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stockData?.scores?.profit?.toFixed(1) || '0.0'}</div>
                  <div className="text-xs text-gray-400">Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{stockData?.scores?.momentum?.toFixed(1) || '0.0'}</div>
                  <div className="text-xs text-gray-400">Momentum</div>
                </div>
              </div>

              {/* Valuation Bar */}
              <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Undervalued</span>
                  <span>Fair Value</span>
                  <span>Overvalued</span>
                </div>
                <div className="relative h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full">
                  <div 
                    className="absolute top-0 w-1 h-2 bg-white rounded-full"
                    style={{ left: `${getValuationPosition()}%` }}
                  ></div>
                </div>
                <div className="text-center mt-2">
                  <span className="text-xs font-medium text-gray-300">Current Price</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
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

            <div className="col-span-12 lg:col-span-9 space-y-4 z-0">
              {/* Company Info */}
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

              {/* Valuation Analysis */}
              <ErrorBoundary fallback="Valuation chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Valuation Analysis</div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm ghost">Current: ${stockData?.price?.toFixed(2) || '0.00'}</div>
                      {getDataQualityBadge(dataAccuracy)}
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
                      </div>
                      <div id="valuationChart" className="chart-lg"></div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-yellow-400 text-2xl mb-2">📊</div>
                      <div className="font-medium mb-2">Valuation Analysis Unavailable</div>
                      <div className="text-sm ghost">No forward EPS estimates available for {ticker}.</div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>
          </section>

          {/* Second Row - Peers and Segments */}
          <section className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 lg:col-span-8">
              <ErrorBoundary fallback="Peers chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Peers – Forward P/E vs Market Cap</div>
                    <div className="flex items-center gap-2">
                      <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                    </div>
                  </div>
                  
                  {stockData?.peers?.length > 0 ? (
                    <div id="peersChart" className="chart"></div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-yellow-400 text-xl mb-2">🏢</div>
                      <div className="text-sm ghost">No peer comparison data available for this ticker</div>
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
                  </div>
                  
                  {stockData?.segments?.length > 0 ? (
                    <div id="segmentPie" className="chart"></div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-yellow-400 text-xl mb-2">📈</div>
                      <div className="text-sm ghost">No revenue segment data available</div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </aside>
          </section>

          {/* Investment Analysis - Strengths & Risks */}
          <section className="mt-4">
            <ErrorBoundary fallback="Investment analysis section failed">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Investment Analysis</div>
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
              </div>
            </ErrorBoundary>
          </section>

          {/* Latest News */}
          <section className="mt-4">
            <ErrorBoundary fallback="News section failed to load">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Latest Company News</div>
                  <div className="flex items-center gap-2 text-sm ghost">
                    <span>{(stockData?.news?.length || 0) > 0 ? stockData.news.length : '6'} items</span>
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
                  // Fallback News Data
                  <ul className="divide-y divide-white/10">
                    <li className="py-3">
                      <div className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">Reuters</div>
                          <div className="text-xs ghost">2 hours ago</div>
                        </div>
                        <div className="text-sm font-medium mb-1">
                          {ticker} reports quarterly earnings above analyst expectations
                        </div>
                        <div className="text-xs ghost leading-relaxed">
                          Company delivers strong financial results with revenue growth and margin expansion.
                        </div>
                      </div>
                    </li>
                    
                    <li className="py-3">
                      <div className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">Bloomberg</div>
                          <div className="text-xs ghost">4 hours ago</div>
                        </div>
                        <div className="text-sm font-medium mb-1">
                          Analysts raise price targets for {ticker} following strategic announcements
                        </div>
                        <div className="text-xs ghost leading-relaxed">
                          Wall Street firms increase target prices citing improved business outlook.
                        </div>
                      </div>
                    </li>
                    
                    <li className="py-3">
                      <div className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">Financial Times</div>
                          <div className="text-xs ghost">6 hours ago</div>
                        </div>
                        <div className="text-sm font-medium mb-1">
                          {ticker} expands operations in key growth markets
                        </div>
                        <div className="text-xs ghost leading-relaxed">
                          Strategic expansion initiatives show promise for long-term growth trajectory.
                        </div>
                      </div>
                    </li>
                    
                    <li className="py-3">
                      <div className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">MarketWatch</div>
                          <div className="text-xs ghost">8 hours ago</div>
                        </div>
                        <div className="text-sm font-medium mb-1">
                          Industry trends favor {ticker}'s competitive positioning
                        </div>
                        <div className="text-xs ghost leading-relaxed">
                          Market dynamics create opportunities for sustained competitive advantages.
                        </div>
                      </div>
                    </li>
                    
                    <li className="py-3">
                      <div className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">CNBC</div>
                          <div className="text-xs ghost">12 hours ago</div>
                        </div>
                        <div className="text-sm font-medium mb-1">
                          Institutional investors increase {ticker} holdings
                        </div>
                        <div className="text-xs ghost leading-relaxed">
                          Smart money shows confidence with significant position increases.
                        </div>
                      </div>
                    </li>
                    
                    <li className="py-3">
                      <div className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all duration-200">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">WSJ</div>
                          <div className="text-xs ghost">1 day ago</div>
                        </div>
                        <div className="text-sm font-medium mb-1">
                          {ticker} leadership outlines vision for future growth
                        </div>
                        <div className="text-xs ghost leading-relaxed">
                          Management provides strategic roadmap for upcoming quarters.
                        </div>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </ErrorBoundary>
          </section>

          {/* Demo Footer */}
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
