// components/ReportContent.js - YOUR EXACT ORIGINAL WORKING FILE
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from './Navigation'
import { initCharts, updateChartsTheme } from './ChartComponents'
import { fetchStockData, getAvailableTickers, getAllStockData } from '@/lib/api'
import { getStockCategories } from '@/lib/demoData'
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
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [availableStocks, setAvailableStocks] = useState([])
  const { theme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get available tickers and categories
  const availableTickers = getAvailableTickers()
  const stockCategories = getStockCategories()

  // Load available stocks count
  useEffect(() => {
    loadAvailableStocks()
  }, [])

  const loadAvailableStocks = async () => {
    try {
      const allStocks = await getAllStockData()
      setAvailableStocks(allStocks)
    } catch (error) {
      console.error('Error loading available stocks:', error)
    }
  }

  // Load initial stock or from URL parameter
  useEffect(() => {
    const urlTicker = searchParams.get('ticker')
    if (urlTicker && urlTicker !== ticker) {
      loadStockData(urlTicker)
    } else if (!urlTicker) {
      loadStockData('AAPL')
    }
  }, [searchParams])

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
      
      // Update URL without navigation (for sharing/bookmarking)
      const url = new URL(window.location)
      url.searchParams.set('ticker', symbol.toUpperCase())
      window.history.pushState({}, '', url)
      
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
      // Navigate to trigger middleware check
      router.push(`/report?ticker=${inputTicker.trim().toUpperCase()}`)
      setInputTicker('')
    }
  }

  const handleStockClick = (tickerSymbol) => {
    console.log('[ReportContent] Stock clicked:', tickerSymbol)
    // Navigate to trigger middleware check
    router.push(`/report?ticker=${tickerSymbol}`)
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
    if (!stockData?.eps?.values?.length || !stockData?.peBands || !stockData?.price) return null
    
    const currentPrice = stockData.price
    const nextYearEPS = stockData.eps.values[0]
    const { low, mid, high } = stockData.peBands
    
    const lowTarget = nextYearEPS * low
    const midTarget = nextYearEPS * mid
    const highTarget = nextYearEPS * high
    
    if (currentPrice <= lowTarget) return 'undervalued'
    if (currentPrice >= highTarget) return 'overvalued'
    return 'fair'
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <div className="text-lg font-medium mb-2">Loading Stock Analysis</div>
              <div className="text-sm ghost">
                {isDemoMode ? 'Loading comprehensive demo analysis...' : 'Fetching live market data from APIs...'}
              </div>
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
                        {availableStocks.length}+ stocks with real Bloomberg Terminal data including Hong Kong listings
                      </div>
                    </div>
                  </div>
                  <div className="chip px-3 py-2 bg-blue-500/20">
                    <span className="text-blue-400 font-medium">Bloomberg Data</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPACT SEARCH INTERFACE - YOUR REQUESTED CHANGE */}
          <div className="mb-8">
            <div className="card p-6">
              {/* Search Input */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="flex gap-3 max-w-md">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder="Enter ticker (e.g., AAPL, 700)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-lg"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary px-6 py-3 rounded-lg text-lg font-semibold"
                    disabled={loading}
                  >
                    Analyze
                  </button>
                </form>
              </div>

              {/* COMPACT CATEGORIES - SMALLER SPACE */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Browse by Category</h3>
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  >
                    {showAllCategories ? 'Show Less' : `Show All (${availableStocks.length} stocks)`}
                  </button>
                </div>

                {Object.entries(stockCategories).map(([categoryKey, category]) => (
                  <div key={categoryKey} className={`transition-all duration-300 ${showAllCategories ? 'block' : categoryKey === 'HK_STOCKS' || category.tickers.includes(ticker) ? 'block' : 'hidden'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <h4 className="font-semibold" style={{ color: category.color }}>
                        {category.label}
                        {categoryKey === 'HK_STOCKS' && (
                          <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">🇭🇰 Hong Kong</span>
                        )}
                      </h4>
                      <span className="text-xs ghost">({category.tickers.length})</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {category.tickers.map(tickerSymbol => (
                        <button
                          key={tickerSymbol}
                          onClick={() => handleStockClick(tickerSymbol)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            ticker === tickerSymbol
                              ? 'text-white shadow-lg transform scale-105' 
                              : 'text-white/80 hover:text-white hover:transform hover:scale-105'
                          }`}
                          style={{ 
                            backgroundColor: ticker === tickerSymbol 
                              ? category.color 
                              : category.color + '80',
                            boxShadow: ticker === tickerSymbol 
                              ? `0 4px 14px ${category.color}40` 
                              : 'none'
                          }}
                        >
                          {tickerSymbol}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STOCK HEADER */}
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <h1 className="text-4xl font-bold mb-1">{stockData?.ticker || ticker}</h1>
                  <div className="text-lg ghost">{stockData?.name || 'Loading...'}</div>
                </div>
                {stockData?.price && (
                  <div className="text-right">
                    <div className="text-3xl font-bold mb-1">
                      ${stockData.price}
                    </div>
                    <div className={`text-sm font-medium px-2 py-1 rounded ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} 
                      ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                    </div>
                  </div>
                )}
                <div className="text-xs ghost mt-1">
                  Updated: {stockData?.lastUpdated ? new Date(stockData.lastUpdated).toLocaleTimeString() : 'Just now'}
                </div>
              </div>
            </div>
          </header>

          {/* TABLE OF CONTENTS + CONTENT */}
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
                      <div className="text-blue-400 font-medium text-sm mb-2">📊 Bloomberg Data</div>
                      <div className="text-xs text-blue-300/70">
                        Professional analysis with verified Bloomberg Terminal data including HK stocks.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* RIGHT CONTENT: All Sections */}
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
                      <div>
                        <div className="mb-6">
                          <canvas id="valuation-chart" width="600" height="400"></canvas>
                        </div>
                        <div className="text-sm text-gray-400">
                          P/E bands based on historical forward P/E distribution. 
                          Current price compared to analyst EPS estimates × P/E ranges.
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-4">📊</div>
                        <p>Valuation analysis requires analyst EPS estimates</p>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 3. Quality Analysis */}
              <section id="quality" className="scroll-mt-24">
                <ErrorBoundary fallback="Quality section failed to load">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Quality Analysis</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {stockData?.scores && Object.entries(stockData.scores).map(([metric, score]) => (
                        <div key={metric} className="text-center">
                          <div className="text-3xl font-bold mb-2">{score}/10</div>
                          <div className="text-sm uppercase tracking-wide ghost">{metric}</div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                            <div 
                              className={`h-2 rounded-full ${
                                score >= 8 ? 'bg-green-400' :
                                score >= 6 ? 'bg-yellow-400' : 'bg-red-400'
                              }`}
                              style={{ width: `${score * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ErrorBoundary>
              </section>

              {/* 4. Peer Comparison */}
              <section id="peers" className="scroll-mt-24">
                <ErrorBoundary fallback="Peer comparison section failed">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Peers Bubble Chart */}
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-4">Peer Comparison</h3>
                      <div className="mb-4">
                        <canvas id="peers-chart" width="400" height="300"></canvas>
                      </div>
                      <div className="text-xs text-gray-400">
                        Market Cap (x-axis) vs Forward P/E (y-axis). Bubble size = relative valuation.
                      </div>
                    </div>

                    {/* Income by Segment */}
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-4">Revenue by Segment</h3>
                      {stockData?.segments?.length > 0 ? (
                        <div>
                          <div className="mb-4">
                            <canvas id="segments-chart" width="400" height="300"></canvas>
                          </div>
                          <div className="space-y-2">
                            {stockData.segments.map((segment, i) => (
                              <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: segment.itemStyle.color }}
                                  ></div>
                                  <span>{segment.name}</span>
                                </div>
                                <span className="font-medium">{segment.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-4">🏢</div>
                          <p>Segment data not available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </ErrorBoundary>
              </section>

              {/* 5. Investment Analysis */}
              <section id="analysis" className="scroll-mt-24">
                <ErrorBoundary fallback="Investment analysis section failed">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Investment Analysis</h2>
                      {isDemoMode && (
                        <span className="chip px-2 py-1 text-blue-400 text-xs">
                          🎯 Professional Analysis
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="ghost text-sm mb-4 flex items-center gap-2">
                          <span className="text-green-400">✓</span> Key Investment Strengths
                        </div>
                        <ul className="space-y-3 text-sm">
                          {stockData?.strengths?.map((strength, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-green-400 mt-1 text-xs">●</span>
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
                        <div className="ghost text-sm mb-4 flex items-center gap-2">
                          <span className="text-red-400">⚠</span> Key Investment Risks
                        </div>
                        <ul className="space-y-3 text-sm">
                          {stockData?.risks?.map((risk, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-red-400 mt-1 text-xs">●</span>
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
                    <h2 className="text-2xl font-bold mb-6">Latest News</h2>
                    {stockData?.news?.length > 0 ? (
                      <div className="space-y-4">
                        {stockData.news.map((article, i) => (
                          <div key={i} className="border-b border-gray-700 pb-4 last:border-b-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-medium mb-1 leading-tight">
                                  {article.headline}
                                </h4>
                                {article.summary && (
                                  <p className="text-sm text-gray-400 mb-2">{article.summary}</p>
                                )}
                                <div className="flex items-center gap-3 text-xs text-gray-500">
                                  <span>{article.source}</span>
                                  <span>•</span>
                                  <span>{article.datetime}</span>
                                </div>
                              </div>
                              {article.url && article.url !== '#' && (
                                <a 
                                  href={article.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                >
                                  Read →
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-4">📰</div>
                        <p>No recent news available</p>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

            </main>
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}
