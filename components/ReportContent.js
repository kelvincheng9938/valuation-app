// components/ReportContent.js - COMPACT Layout (Space Efficient)
'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { initCharts, updateChartsTheme } from './ChartComponents'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
import { ErrorBoundary } from './ErrorBoundary'
import { useTheme } from '@/contexts/ThemeContext'

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('AAPL')
  const [inputTicker, setInputTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)
  const { theme } = useTheme()

  // Get available tickers (demo or live)
  const availableTickers = getAvailableTickers()

  useEffect(() => {
    loadStockData('AAPL')
  }, [])

  // Update charts when theme changes
  useEffect(() => {
    if (stockData) {
      setTimeout(() => {
        initCharts(stockData)
      }, 150)
    }
  }, [theme])

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

  // Demo mode indicator
  const isDemoMode = stockData?.dataQuality?.quote === 'demo'

  // Calculate valuation position
  const getValuationPosition = () => {
    if (!stockData?.eps?.values?.[0] || !stockData?.peBands || !stockData?.price) {
      return { position: 50, status: 'Fair Value' }
    }

    const currentPE = stockData.price / stockData.eps.values[0]
    const { low, mid, high } = stockData.peBands

    let position = 50
    let status = 'Fair Value'

    if (currentPE <= low) {
      position = 15
      status = 'Undervalued'
    } else if (currentPE <= mid) {
      position = 35
      status = 'Fair Value'
    } else if (currentPE <= high) {
      position = 65
      status = 'Fair Value'
    } else {
      position = 85
      status = 'Overvalued'
    }

    return { position, status }
  }

  const valuationInfo = getValuationPosition()

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
            <div className="mb-4">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-blue-400 font-semibold text-sm">
                        🎯 Professional Demo Mode {theme === 'light' ? '☀️' : '🌙'}
                      </div>
                      <div className="text-xs text-blue-300/80">
                        Exploring comprehensive stock analysis with realistic January 2025 data
                      </div>
                    </div>
                  </div>
                  <div className="chip px-3 py-2 bg-blue-500/20">
                    <span className="text-blue-400 font-medium text-sm">Demo Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compact Ticker Search Header */}
          <div className="mb-4">
            <div className="card p-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder={isDemoMode ? "Try GOOGL, MSFT, TSLA..." : "Enter ticker (e.g., MSFT)"}
                    className="px-3 py-2 border rounded-lg text-sm placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary px-4 py-2 rounded-lg text-sm"
                    disabled={loading}
                  >
                    Analyze
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs ghost">Quick:</span>
                  {availableTickers.slice(0, 6).map(t => (
                    <button
                      key={t}
                      onClick={() => loadStockData(t)}
                      className={`chip px-2 py-1 text-xs transition-all ${
                        ticker === t 
                          ? 'bg-cyan-400/20 text-cyan-400 border-cyan-400/40' 
                          : 'hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Data Quality Indicators */}
              {stockData?.dataQuality && (
                <div className="mt-2 flex flex-wrap gap-1 text-xs">
                  <span className="ghost text-xs">Sources:</span>
                  {getDataQualityBadge(stockData.dataQuality.quote, 'Price')}
                  {getDataQualityBadge(stockData.dataQuality.estimates, 'EPS')}
                  {getDataQualityBadge(stockData.dataQuality.peHistory, 'P/E')}
                  {getDataQualityBadge(stockData.dataQuality.peers, 'Peers')}
                </div>
              )}
            </div>
          </div>

          {/* Compact Stock Header */}
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h1 className="text-lg font-semibold tracking-wide">
                  {stockData?.name || 'Loading...'} ({ticker})
                  {isDemoMode && (
                    <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      DEMO
                    </span>
                  )}
                </h1>
                <span className="ghost text-xs">
                  Updated: {stockData?.lastUpdated ? new Date(stockData.lastUpdated).toLocaleTimeString() : 'Just now'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold">
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

          {/* COMPACT: Score Cards + Valuation Bar in single section */}
          <section className="mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Score Cards + Valuation Bar */}
              <div className="lg:col-span-8">
                {/* Score Cards Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                  <div className="card kpi p-3 text-center">
                    <div className="text-xl font-bold mb-1" style={{ color: '#f59e0b' }}>
                      {stockData?.scores?.value?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Value</div>
                  </div>
                  <div className="card kpi p-3 text-center">
                    <div className="text-xl font-bold mb-1" style={{ color: '#3b82f6' }}>
                      {stockData?.scores?.growth?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Growth</div>
                  </div>
                  <div className="card kpi p-3 text-center">
                    <div className="text-xl font-bold mb-1" style={{ color: '#10b981' }}>
                      {stockData?.scores?.profit?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Profit</div>
                  </div>
                  <div className="card kpi p-3 text-center">
                    <div className="text-xl font-bold mb-1" style={{ color: '#8b5cf6' }}>
                      {stockData?.scores?.momentum?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Momentum</div>
                  </div>
                </div>

                {/* Valuation Bar */}
                <div className="card p-4">
                  <div className="flex items-center justify-between text-xs ghost mb-2">
                    <span>Undervalued</span>
                    <span>Fair Value</span>
                    <span>Overvalued</span>
                  </div>
                  
                  <div className="relative mb-3">
                    <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>
                    <div 
                      className="absolute top-0 w-1 h-2 bg-gray-900 rounded-full transform -translate-x-1/2"
                      style={{ left: `${valuationInfo.position}%` }}
                    ></div>
                    <div 
                      className="absolute top-2 w-px h-3 bg-gray-600 transform -translate-x-1/2"
                      style={{ left: `${valuationInfo.position}%` }}
                    ></div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs font-medium">Current Price</div>
                    <div className="text-xs ghost">{valuationInfo.status}</div>
                  </div>
                </div>
              </div>

              {/* Quality Radar + Demo Badge */}
              <div className="lg:col-span-4">
                <div className="card p-4">
                  <div className="font-medium mb-2 text-center">Quality Radar</div>
                  <div id="qualityRadar" style={{ width: '100%', height: '240px' }}></div>
                  {isDemoMode && (
                    <div className="mt-3 text-center">
                      <div className="chip px-3 py-1 bg-blue-500/20 text-blue-400 border-blue-400/30 inline-block">
                        <span className="font-medium">🔵 Live Demo</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* COMPACT: Company Info + Key Stats */}
          <section className="mb-4">
            <div className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">About the Company</div>
                <div className="text-sm ghost">Key Stats</div>
              </div>
              
              <p className="text-sm mb-3 leading-relaxed">
                {stockData?.description || 'Loading company information...'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="chip px-3 py-2 text-sm">
                  <div className="ghost text-xs">Market Cap</div>
                  <div className="font-medium">{stockData?.marketCap || 'N/A'}</div>
                </div>
                <div className="chip px-3 py-2 text-sm">
                  <div className="ghost text-xs">Forward P/E</div>
                  <div className="font-medium">{stockData?.forwardPE || 'N/A'}</div>
                </div>
                <div className="chip px-3 py-2 text-sm">
                  <div className="ghost text-xs">TTM P/E</div>
                  <div className="font-medium">{stockData?.ttmPE || 'N/A'}</div>
                </div>
                <div className="chip px-3 py-2 text-sm">
                  <div className="ghost text-xs">Sector</div>
                  <div className="font-medium">{stockData?.sector || 'Unknown'}</div>
                </div>
              </div>
            </div>
          </section>

          {/* COMPACT: Valuation Chart */}
          <section className="mb-4">
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
                  <div className="text-center py-8">
                    <div className="text-yellow-400 text-2xl mb-2">📊</div>
                    <div className="font-medium mb-2">Valuation Analysis Unavailable</div>
                    <div className="text-sm ghost">
                      {isDemoMode 
                        ? 'This demo ticker may not have complete EPS data. Try AAPL, MSFT, GOOGL, or META for full analysis.'
                        : 'No forward EPS estimates available from analysts. This ticker may have limited coverage.'
                      }
                    </div>
                  </div>
                )}
              </div>
            </ErrorBoundary>
          </section>

          {/* COMPACT: Peers + Segments in one row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            <div className="lg:col-span-2">
              <ErrorBoundary fallback="Peers chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Peers – Forward P/E vs Market Cap</div>
                    <div className="flex items-center gap-2">
                      {isDemoMode && (
                        <span className="chip px-2 py-1 text-blue-400 text-xs">📊 Demo</span>
                      )}
                      <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                    </div>
                  </div>
                  
                  {stockData?.peers?.length > 0 ? (
                    <div id="peersChart" className="chart"></div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="text-yellow-400 text-lg mb-2">🏢</div>
                      <div className="text-sm ghost">
                        {isDemoMode 
                          ? 'Try AAPL, MSFT, or GOOGL for peer analysis.'
                          : 'No peer comparison data available'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>
            
            <div className="lg:col-span-1">
              <ErrorBoundary fallback="Segment chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Revenue Segments</div>
                    {isDemoMode && (
                      <span className="chip px-2 py-1 text-blue-400 text-xs">📈</span>
                    )}
                  </div>
                  
                  {stockData?.segments?.length > 0 ? (
                    <div id="segmentPie" className="chart"></div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="text-yellow-400 text-lg mb-2">📈</div>
                      <div className="text-sm ghost">
                        {isDemoMode 
                          ? 'Try major companies for segment data.'
                          : 'No segment data available'
                        }
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>
          </section>

          {/* COMPACT: Investment Analysis */}
          <section className="mb-4">
            <ErrorBoundary fallback="Investment analysis section failed">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Investment Analysis</div>
                  {isDemoMode && (
                    <span className="chip px-2 py-1 text-blue-400 text-xs">🎯 Analysis</span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="ghost text-sm mb-2 flex items-center gap-2">
                      <span className="text-green-400">✓</span> Key Investment Strengths
                    </div>
                    <ul className="space-y-1 text-sm">
                      {stockData?.strengths?.slice(0, 3).map((strength, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1 text-xs">●</span>
                          <span className="leading-relaxed">{strength}</span>
                        </li>
                      )) || (
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">●</span>
                          <span>Loading analysis...</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <div className="ghost text-sm mb-2 flex items-center gap-2">
                      <span className="text-red-400">⚠</span> Key Investment Risks
                    </div>
                    <ul className="space-y-1 text-sm">
                      {stockData?.risks?.slice(0, 3).map((risk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400 mt-1 text-xs">●</span>
                          <span className="leading-relaxed">{risk}</span>
                        </li>
                      )) || (
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">●</span>
                          <span>Loading analysis...</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </ErrorBoundary>
          </section>

          {/* COMPACT: Latest News */}
          <section className="mb-4">
            <ErrorBoundary fallback="News section failed to load">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Latest Company News</div>
                  <div className="flex items-center gap-2 text-sm ghost">
                    {isDemoMode ? (
                      <span className="chip px-2 py-1 text-blue-400 text-xs">📰 Demo</span>
                    ) : (
                      stockData?.newsSource === 'live' && <span className="text-green-400">● Live</span>
                    )}
                    <span>{stockData?.news?.length || 0} items</span>
                  </div>
                </div>
                
                {stockData?.news?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stockData.news.slice(0, 4).map((item, i) => (
                      <a 
                        key={i}
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block hover:bg-white/5 p-3 rounded cursor-pointer transition-all duration-200 group border border-transparent hover:border-cyan-400/20"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs ghost">{item.source}</div>
                          <div className="text-xs ghost">{item.datetime}</div>
                        </div>
                        <div className="text-sm group-hover:text-cyan-400 transition-colors font-medium mb-1">
                          {item.headline}
                        </div>
                        {item.summary && item.summary !== item.headline && (
                          <div className="text-xs ghost leading-relaxed line-clamp-2">{item.summary}</div>
                        )}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-yellow-400 text-lg mb-2">📰</div>
                    <div className="text-sm ghost">
                      {isDemoMode 
                        ? `Try AAPL, MSFT, GOOGL for sample news`
                        : `No recent news for ${ticker}`
                      }
                    </div>
                  </div>
                )}
              </div>
            </ErrorBoundary>
          </section>

          {/* Footer CTA */}
          {isDemoMode && (
            <div className="card p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-400/20">
              <div className="text-center">
                <div className="text-blue-400 font-semibold mb-2">🚀 Ready for Live Data?</div>
                <div className="text-sm ghost mb-3">
                  This demo showcases institutional-grade analysis. Switch to live APIs for real-time data.
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-xs">
                  <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ EPS Estimates</span>
                  <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ P/E Bands</span>
                  <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ Peer Analysis</span>
                  <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ Quality Scores</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </>
  )
}
