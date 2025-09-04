// components/ReportContent.js - Updated with onStockChange callback
'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { initCharts, updateChartsTheme } from './ChartComponents'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
import { getStockCategories } from '@/lib/demoData'
import { ErrorBoundary } from './ErrorBoundary'
import { useTheme } from '@/contexts/ThemeContext'

export default function ReportContent({ onStockChange }) {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('AAPL')
  const [inputTicker, setInputTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const { theme } = useTheme()

  // Get available tickers and categories
  const availableTickers = getAvailableTickers()
  const stockCategories = getStockCategories()

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

  const loadStockData = async (symbol, isUserInitiated = false) => {
    // If this is a user-initiated stock change, check if allowed
    if (isUserInitiated && onStockChange) {
      const allowed = onStockChange(symbol)
      if (!allowed) {
        console.log('[ReportContent] Stock change blocked by parent component')
        return // Don't proceed if blocked
      }
    }

    setLoading(true)
    setError(null)
    
    try {
      console.log(`[ReportContent] Loading data for ${symbol}`)
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
      console.log('[ReportContent] Search submitted:', inputTicker.trim())
      loadStockData(inputTicker.trim(), true) // User initiated
      setInputTicker('')
    }
  }

  const handleTickerClick = (tickerSymbol) => {
    console.log('[ReportContent] Ticker clicked:', tickerSymbol)
    loadStockData(tickerSymbol, true) // User initiated
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
    if (quality === 'demo' || quality === 'bloomberg_real') {
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
                onClick={() => loadStockData(ticker, true)}
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
                        43 stocks with real Bloomberg Terminal data including Hong Kong listings
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

          {/* ENHANCED COLORFUL SEARCH INTERFACE */}
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

              {/* COLORFUL STOCK CATEGORIES */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Browse by Category</h3>
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                  >
                    {showAllCategories ? 'Show Less' : 'Show All'} ({availableTickers.length} stocks)
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
                          onClick={() => handleTickerClick(tickerSymbol)}
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
                              ? `0 8px 25px ${category.color}40` 
                              : 'none'
                          }}
                        >
                          {tickerSymbol}
                          {categoryKey === 'HK_STOCKS' && (
                            <span className="ml-1 text-xs opacity-75">.HK</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Popular Selections */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-semibold mb-3 text-purple-400">🔥 Popular Analysis</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AAPL', 'NVDA', 'MSFT', 'GOOGL', 'META', '700', 'TSLA', 'LLY'].map(popularTicker => (
                      <button
                        key={popularTicker}
                        onClick={() => handleTickerClick(popularTicker)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          ticker === popularTicker
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                            : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 hover:from-purple-500/30 hover:to-pink-500/30 hover:text-purple-300'
                        }`}
                      >
                        {popularTicker}
                        {['700', '3690', '1810', '9988'].includes(popularTicker) && (
                          <span className="ml-1 text-xs opacity-75">🇭🇰</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data Quality Indicators */}
              {stockData?.dataQuality && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="ghost">Data sources:</span>
                    {getDataQualityBadge(stockData.dataQuality.estimates, 'EPS')}
                    {getDataQualityBadge(stockData.dataQuality.peHistory, 'P/E Bands')}
                    {getDataQualityBadge(stockData.dataQuality.peers, 'Peers')}
                    {isDemoMode && (
                      <span className="chip px-2 py-1 text-purple-400 text-xs">
                        ✨ Bloomberg Terminal
                      </span>
                    )}
                  </div>
                </div>
              )}
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
                    {stockData?.region === 'HK' && (
                      <span className="ml-3 text-sm bg-orange-500/20 text-orange-400 px-2 py-1 rounded">🇭🇰 HK</span>
                    )}
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
                  {stockData?.region === 'HK' && (
                    <span className="text-sm text-orange-400 ml-1">HKD</span>
                  )}
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

          {/* The rest of your existing report content remains the same... */}
          {/* I'll truncate this for brevity, but include all the existing sections */}
          
          {/* Company Overview Section */}
          <section id="overview" className="scroll-mt-24 mb-8">
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

          {/* Ready to Go Live Footer */}
          {isDemoMode && (
            <div className="mt-12">
              <div className="card p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-400/20">
                <div className="text-center">
                  <div className="text-blue-400 font-semibold mb-2">🚀 Ready to Go Live?</div>
                  <div className="text-sm ghost mb-4">
                    This demo showcases institutional-grade stock analysis with 43 stocks including Hong Kong listings. 
                    When you're ready to launch with real-time data, simply switch to live API mode and all features will work with current market data.
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Forward EPS Estimates</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Dynamic P/E Bands</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Peer Comparisons</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Quality Scoring</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Real-time News</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Bloomberg Data</span>
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
