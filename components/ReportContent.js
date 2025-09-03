// components/ReportContent.js - SimplyWall.St Style Layout
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
  const [activeSection, setActiveSection] = useState('overview')
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

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'valuation', 'quality', 'peers', 'analysis', 'news']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
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
      return <span className="chip px-2 py-1 text-blue-400 text-xs">📊 {label}</span>
    } else if (quality === true || quality === 'live' || quality === 'historical') {
      return <span className="chip px-2 py-1 text-green-400 text-xs">✓ {label}</span>
    } else if (quality === 'fallback' || quality === 'sector_default' || quality === 'known_structure') {
      return <span className="chip px-2 py-1 text-yellow-400 text-xs">⚠ {label}</span>
    } else {
      return <span className="chip px-2 py-1 text-red-400 text-xs">✗ {label}</span>
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
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
        <div className="max-w-7xl mx-auto px-4 py-8">
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

  const navigationItems = [
    { id: 'overview', label: 'Company Overview', icon: '🏢' },
    { id: 'valuation', label: 'Valuation', icon: '💰' },
    { id: 'quality', label: 'Quality Analysis', icon: '⭐' },
    { id: 'peers', label: 'Peer Comparison', icon: '📊' },
    { id: 'analysis', label: 'Investment Analysis', icon: '🎯' },
    { id: 'news', label: 'Latest News', icon: '📰' }
  ]

  return (
    <>
      <Navigation />
      <ErrorBoundary fallback="Report failed to load. Please refresh the page.">
        <div className="max-w-7xl mx-auto px-4 py-6" key={updateKey}>
          
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
                        Exploring comprehensive stock analysis with realistic January 2025 data
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

          {/* Search Header */}
          <div className="mb-6">
            <div className="card p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder={isDemoMode ? "Try GOOGL, MSFT, TSLA..." : "Enter ticker (e.g., MSFT)"}
                    className="px-3 py-2 border rounded-lg placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
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

                {/* Data Quality */}
                {stockData?.dataQuality && (
                  <div className="flex gap-2 ml-auto">
                    {getDataQualityBadge(stockData.dataQuality.quote, 'Price')}
                    {getDataQualityBadge(stockData.dataQuality.estimates, 'EPS')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stock Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {ticker.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {stockData?.name || 'Loading...'} ({ticker})
                    {isDemoMode && (
                      <span className="ml-3 text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded">DEMO</span>
                    )}
                  </h1>
                  <div className="text-sm ghost">
                    Market Cap {stockData?.marketCap || 'N/A'} • {stockData?.sector || 'Technology'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">
                  ${stockData?.price?.toFixed(2) || '0.00'}
                </div>
                {stockData?.changePercent && (
                  <div className={`text-lg ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} 
                    ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                  </div>
                )}
                <div className="text-xs ghost mt-1">
                  Updated: {stockData?.lastUpdated ? new Date(stockData.lastUpdated).toLocaleTimeString() : 'Just now'}
                </div>
              </div>
            </div>
          </header>

          {/* MAIN LAYOUT: Table of Contents + Content */}
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT SIDEBAR: Table of Contents */}
            <aside className="col-span-12 lg:col-span-3">
              <div className="sticky top-24">
                <div className="card p-4">
                  <h3 className="font-semibold mb-4 text-lg">Stock Analysis</h3>
                  <nav className="space-y-2">
                    {navigationItems.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-3 ${
                          activeSection === item.id
                            ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40'
                            : 'hover:bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="text-lg">{index + 1}</span>
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                        </div>
                      </button>
                    ))}
                  </nav>
                  
                  {isDemoMode && (
                    <div className="mt-6 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                      <div className="text-blue-400 font-medium text-sm mb-2">🔵 Live Demo</div>
                      <div className="text-xs text-blue-300/70">
                        Professional analysis with realistic data. Ready for live APIs.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* RIGHT CONTENT: Sections */}
            <main className="col-span-12 lg:col-span-9 space-y-8">

              {/* 1. Company Overview */}
              <section id="overview" className="scroll-mt-24">
                <div className="card p-6">
                  <h2 className="text-2xl font-bold mb-6">Company Overview</h2>
                  
                  {/* Score Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: '#f59e0b' }}>
                        {stockData?.scores?.value?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm ghost">Value</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: '#3b82f6' }}>
                        {stockData?.scores?.growth?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm ghost">Growth</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: '#10b981' }}>
                        {stockData?.scores?.profit?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm ghost">Profit</div>
                    </div>
                    <div className="card p-4 text-center">
                      <div className="text-3xl font-bold mb-2" style={{ color: '#8b5cf6' }}>
                        {stockData?.scores?.momentum?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm ghost">Momentum</div>
                    </div>
                  </div>

                  {/* Valuation Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm ghost mb-3">
                      <span>Undervalued</span>
                      <span>Fair Value</span>
                      <span>Overvalued</span>
                    </div>
                    <div className="relative mb-4">
                      <div className="h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>
                      <div 
                        className="absolute top-0 w-1 h-3 bg-gray-900 rounded-full transform -translate-x-1/2"
                        style={{ left: `${valuationInfo.position}%` }}
                      ></div>
                      <div 
                        className="absolute top-3 w-px h-4 bg-gray-600 transform -translate-x-1/2"
                        style={{ left: `${valuationInfo.position}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">Current Price</div>
                      <div className="text-sm ghost">{valuationInfo.status}</div>
                    </div>
                  </div>

                  {/* Company Description */}
                  <div>
                    <h3 className="font-semibold mb-3">About the Company</h3>
                    <p className="leading-relaxed mb-6">
                      {stockData?.description || 'Loading company information...'}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="chip px-3 py-2">
                        <div className="text-xs ghost">Market Cap</div>
                        <div className="font-semibold">{stockData?.marketCap || 'N/A'}</div>
                      </div>
                      <div className="chip px-3 py-2">
                        <div className="text-xs ghost">Forward P/E</div>
                        <div className="font-semibold">{stockData?.forwardPE || 'N/A'}</div>
                      </div>
                      <div className="chip px-3 py-2">
                        <div className="text-xs ghost">TTM P/E</div>
                        <div className="font-semibold">{stockData?.ttmPE || 'N/A'}</div>
                      </div>
                      <div className="chip px-3 py-2">
                        <div className="text-xs ghost">Sector</div>
                        <div className="font-semibold">{stockData?.sector || 'Technology'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Valuation Analysis */}
              <section id="valuation" className="scroll-mt-24">
                <ErrorBoundary fallback="Valuation section failed to load">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Valuation Analysis</h2>
                    
                    {stockData?.eps?.values?.length > 0 && stockData?.peBands ? (
                      <>
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="chip px-3 py-2">
                            EPS: {stockData.eps.values.join(' / ')}
                          </span>
                          <span className="chip px-3 py-2">
                            P/E Bands: {stockData.peBands.low}× / {stockData.peBands.mid}× / {stockData.peBands.high}×
                          </span>
                          <span className="chip px-3 py-2">
                            Current Price: ${stockData?.price?.toFixed(2) || '0.00'}
                          </span>
                        </div>
                        <div id="valuationChart" className="chart-lg"></div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">📊</div>
                        <div className="text-xl font-medium mb-3">Valuation Analysis Unavailable</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? 'Try AAPL, MSFT, GOOGL, or META for full valuation analysis.'
                            : 'No forward EPS estimates available from analysts.'}
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 3. Quality Analysis */}
              <section id="quality" className="scroll-mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ErrorBoundary fallback="Quality radar failed">
                    <div className="card p-6">
                      <h2 className="text-2xl font-bold mb-6">Quality Radar</h2>
                      <div id="qualityRadar" className="chart"></div>
                    </div>
                  </ErrorBoundary>
                  
                  <ErrorBoundary fallback="Segments failed">
                    <div className="card p-6">
                      <h2 className="text-2xl font-bold mb-6">Revenue by Segment</h2>
                      {stockData?.segments?.length > 0 ? (
                        <div id="segmentPie" className="chart"></div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="text-yellow-400 text-2xl mb-3">📈</div>
                          <div className="text-ghost">
                            {isDemoMode 
                              ? 'Try major companies like AAPL, MSFT, GOOGL for detailed segment breakdown.'
                              : 'No revenue segment breakdown available for this ticker.'}
                          </div>
                        </div>
                      )}
                    </div>
                  </ErrorBoundary>
                </div>
              </section>

              {/* 4. Peer Comparison */}
              <section id="peers" className="scroll-mt-24">
                <ErrorBoundary fallback="Peers section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Peer Comparison</h2>
                      <button id="toggleLabelsBtn" className="btn">Labels: ON</button>
                    </div>
                    
                    {stockData?.peers?.length > 0 ? (
                      <div id="peersChart" className="chart-lg"></div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">🏢</div>
                        <div className="text-xl font-medium mb-3">Peer Comparison Unavailable</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? 'Try AAPL, MSFT, or GOOGL for full peer analysis with market cap and P/E comparisons.'
                            : 'No peer comparison data available for this ticker.'}
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 5. Investment Analysis */}
              <section id="analysis" className="scroll-mt-24">
                <ErrorBoundary fallback="Investment analysis failed to load">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Investment Analysis</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-green-400 text-xl">✓</span> 
                          <h3 className="text-lg font-semibold text-green-400">Key Investment Strengths</h3>
                        </div>
                        <ul className="space-y-3">
                          {stockData?.strengths?.map((strength, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-green-400 mt-1">●</span>
                              <span className="leading-relaxed">{strength}</span>
                            </li>
                          )) || (
                            <li className="flex items-start gap-3">
                              <span className="text-green-400 mt-1">●</span>
                              <span>Loading investment strengths analysis...</span>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-red-400 text-xl">⚠</span> 
                          <h3 className="text-lg font-semibold text-red-400">Key Investment Risks</h3>
                        </div>
                        <ul className="space-y-3">
                          {stockData?.risks?.map((risk, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-red-400 mt-1">●</span>
                              <span className="leading-relaxed">{risk}</span>
                            </li>
                          )) || (
                            <li className="flex items-start gap-3">
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

              {/* 6. Latest News */}
              <section id="news" className="scroll-mt-24">
                <ErrorBoundary fallback="News section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Latest Company News</h2>
                      <div className="text-sm ghost">
                        {stockData?.news?.length || 0} articles
                      </div>
                    </div>
                    
                    {stockData?.news?.length > 0 ? (
                      <div className="space-y-4">
                        {stockData.news.slice(0, 6).map((item, i) => (
                          <a 
                            key={i}
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block p-4 hover:bg-white/5 rounded-lg cursor-pointer transition-all duration-200 group border border-transparent hover:border-cyan-400/20"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-sm ghost">{item.source}</div>
                              <div className="text-sm ghost">{item.datetime}</div>
                            </div>
                            <div className="text-lg group-hover:text-cyan-400 transition-colors font-medium mb-2">
                              {item.headline}
                            </div>
                            {item.summary && item.summary !== item.headline && (
                              <div className="text-sm ghost leading-relaxed">{item.summary}</div>
                            )}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">📰</div>
                        <div className="text-xl font-medium mb-3">No Recent News Available</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? `Try major stocks like AAPL, MSFT, GOOGL for sample news articles and earnings updates.`
                            : `No recent news available for ${ticker}`
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

            </main>
          </div>

          {/* Footer */}
          {isDemoMode && (
            <div className="mt-12 card p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-400/20">
              <div className="text-center">
                <h3 className="text-blue-400 font-semibold text-xl mb-3">🚀 Ready to Go Live?</h3>
                <p className="text-ghost mb-4">
                  This demo showcases institutional-grade stock analysis. When you're ready to launch with real-time data, 
                  simply switch to live API mode and all features will work with current market data.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="chip px-4 py-2 bg-green-500/20 text-green-400">✓ Forward EPS Estimates</span>
                  <span className="chip px-4 py-2 bg-green-500/20 text-green-400">✓ Dynamic P/E Bands</span>
                  <span className="chip px-4 py-2 bg-green-500/20 text-green-400">✓ Peer Comparisons</span>
                  <span className="chip px-4 py-2 bg-green-500/20 text-green-400">✓ Quality Scoring</span>
                  <span className="chip px-4 py-2 bg-green-500/20 text-green-400">✓ Real-time News</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </ErrorBoundary>
    </>
  )
}
