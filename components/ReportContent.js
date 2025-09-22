// components/ReportContent.js - ENHANCED with LIVE Company News
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from './Navigation'
import { initCharts, updateChartsTheme } from './ChartComponents'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
import { getStockCategories } from '@/lib/demoData'
import { ErrorBoundary } from './ErrorBoundary'
import { useTheme } from '@/contexts/ThemeContext'

// 🔥 CRITICAL: HK stock symbols for proper sorting
const HK_STOCK_SYMBOLS = ['700', '3690', '1810', '9988'];

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('AAPL')
  const [inputTicker, setInputTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')
  const [showStockList, setShowStockList] = useState(false)
  const [availableTickers, setAvailableTickers] = useState([])
  const [tickersLoading, setTickersLoading] = useState(true)
  const [filteredTickers, setFilteredTickers] = useState([])
  const [searchFilter, setSearchFilter] = useState('')
  
  // 🔥 ENHANCED: Live company news state
  const [liveNews, setLiveNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsError, setNewsError] = useState(null)
  const [newsDataSource, setNewsDataSource] = useState('')
  
  const { theme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get stock categories (static)
  const stockCategories = getStockCategories()

  // Load available tickers (including overlay) on mount
  useEffect(() => {
    loadAvailableTickers()
  }, [])

  const loadAvailableTickers = async () => {
    try {
      setTickersLoading(true)
      console.log('🔄 Loading available tickers with overlay...')
      
      const tickers = await getAvailableTickers()
      
      // 🔥 CRITICAL FIX: Create a new sorted array using spread operator to avoid mutation
      // This ensures proper immutable sorting that React can detect
      const sortedTickers = [...tickers].sort((a, b) => {
        const aIsHK = HK_STOCK_SYMBOLS.includes(a)
        const bIsHK = HK_STOCK_SYMBOLS.includes(b)
        
        // If both are HK or both are US, sort alphabetically
        if (aIsHK === bIsHK) {
          return a.localeCompare(b)
        }
        
        // 🔥 US stocks (-1) come FIRST, HK stocks (+1) go to BOTTOM
        return aIsHK ? 1 : -1
      })
      
      console.log(`✅ Loaded and sorted ${sortedTickers.length} available tickers`)
      console.log('🎯 First 10 tickers:', sortedTickers.slice(0, 10))
      console.log('🎯 Last 10 tickers:', sortedTickers.slice(-10))
      console.log('🇺🇸 US stocks count:', sortedTickers.filter(t => !HK_STOCK_SYMBOLS.includes(t)).length)
      console.log('🇭🇰 HK stocks count:', sortedTickers.filter(t => HK_STOCK_SYMBOLS.includes(t)).length)
      console.log('🇭🇰 HK stocks positions:', sortedTickers.map((t, i) => HK_STOCK_SYMBOLS.includes(t) ? `${t}:${i+1}` : null).filter(Boolean))
      
      setAvailableTickers(sortedTickers)
      setFilteredTickers(sortedTickers)
      
    } catch (error) {
      console.error('❌ Error loading available tickers:', error)
      setAvailableTickers([])
      setFilteredTickers([])
    } finally {
      setTickersLoading(false)
    }
  }

  // 🔥 SIMPLIFIED: Just apply search filter since tickers are already sorted correctly
  useEffect(() => {
    if (!searchFilter.trim()) {
      // No filter - use all tickers (already sorted US first, HK last)
      setFilteredTickers(availableTickers)
    } else {
      // Apply search filter and maintain existing sort order
      const filtered = availableTickers.filter(ticker => 
        ticker.toLowerCase().includes(searchFilter.toLowerCase())
      )
      setFilteredTickers(filtered)
    }
  }, [searchFilter, availableTickers])

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

  // 🔥 ENHANCED: Load live company news whenever stock data is loaded
  useEffect(() => {
    if (stockData && ticker) {
      loadLiveCompanyNews(ticker, stockData.name)
    }
  }, [stockData, ticker])

  // 🔥 ENHANCED: Function to load live company-specific news using new API
  const loadLiveCompanyNews = async (symbol, companyName) => {
    try {
      setNewsLoading(true)
      setNewsError(null)
      console.log(`🔄 Loading live company news for ${symbol} - ${companyName}`)
      
      // Use the new live company news API
      const params = new URLSearchParams({
        symbol: symbol.toUpperCase(),
        ...(companyName && { name: companyName })
      })
      
      const response = await fetch(`/api/news/company-live?${params}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.news && data.news.length > 0) {
          setLiveNews(data.news)
          setNewsDataSource(data.dataSource)
          console.log(`✅ Loaded ${data.news.length} live company news for ${symbol}`)
        } else {
          // No live news found, keep existing static news as fallback
          setLiveNews(stockData?.news || [])
          setNewsDataSource('fallback_static')
          console.log(`⚠️ No live news found for ${symbol}, using static fallback`)
        }
      } else {
        throw new Error(`API responded with ${response.status}`)
      }
      
    } catch (error) {
      console.error(`❌ Error loading live company news for ${symbol}:`, error)
      setNewsError('Failed to load live news')
      
      // Fallback to static news from stock data
      setLiveNews(stockData?.news || [])
      setNewsDataSource('error_fallback')
    } finally {
      setNewsLoading(false)
    }
  }

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
      
      // Live news will be loaded by the useEffect that watches stockData changes
      
    } catch (error) {
      console.error('Error loading stock data:', error)
      setError(error.message)
      setStockData(null)
    }
    
    setLoading(false)
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!inputTicker.trim()) return

    const searchTicker = inputTicker.trim().toUpperCase()
    router.push(`/report?ticker=${searchTicker}`)
    setInputTicker('')
    setShowStockList(false)
  }

  const handleStockClick = (tickerSymbol) => {
    console.log('[ReportContent] Stock clicked:', tickerSymbol)
    router.push(`/report?ticker=${tickerSymbol}`)
    setShowStockList(false)
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

  // Calculate EPS Growth Rates
  const calculateEPSGrowthRates = () => {
    if (!stockData?.eps?.values || stockData.eps.values.length < 2) {
      return []
    }
    
    const epsValues = stockData.eps.values
    const years = stockData.eps.years || ['2025', '2026', '2027']
    const growthRates = []
    
    for (let i = 1; i < epsValues.length; i++) {
      const currentEPS = epsValues[i]
      const previousEPS = epsValues[i - 1]
      
      if (previousEPS && previousEPS > 0) {
        const growthRate = ((currentEPS - previousEPS) / previousEPS) * 100
        growthRates.push({
          year: years[i],
          growthRate: growthRate,
          fromYear: years[i - 1],
          toYear: years[i]
        })
      }
    }
    
    return growthRates
  }

  const valuationInfo = getValuationPosition()
  const epsGrowthRates = calculateEPSGrowthRates()

  const getDataQualityBadge = (quality, label) => {
    if (quality === 'demo' || quality === 'bloomberg_real') {
      return <span className="chip px-2 py-1 text-blue-400 text-xs">📊 {label}</span>
    } else if (quality === true || quality === 'live' || quality === 'historical' || quality === 'google_sheet' || quality === 'overlay_only') {
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
                        {tickersLoading ? 'Loading stock database...' : `${availableTickers.length} stocks with real Bloomberg Terminal data including Hong Kong listings`}
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

          {/* Clean Search Interface */}
          <div className="mb-4">
            <div className="card p-3">
              {/* Search Input */}
              <div className="mb-3">
                <form onSubmit={handleSearch} className="flex gap-2 max-w-sm">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder={tickersLoading ? "Loading..." : "Enter ticker (AAPL, 700, MU)"}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    disabled={tickersLoading}
                  />
                  <button 
                    type="submit" 
                    className="btn-primary px-4 py-2 rounded text-sm font-medium"
                    disabled={loading || tickersLoading}
                  >
                    {tickersLoading ? 'Loading...' : 'Analyze'}
                  </button>
                </form>
              </div>

              {/* Stock List Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Browse Stocks</span>
                <button
                  onClick={() => setShowStockList(!showStockList)}
                  className="btn-secondary px-4 py-2 rounded text-sm font-medium"
                  disabled={tickersLoading}
                >
                  {showStockList ? 'Hide List' : `Show ${tickersLoading ? '...' : availableTickers.length} Stocks`}
                </button>
              </div>

              {/* Scrollable Stock List */}
              {showStockList && (
                <div className="mt-3 border-t border-white/10 pt-3">
                  {/* Search Filter */}
                  <div className="mb-3">
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Filter stocks... (e.g., AAPL, Tesla)"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  {/* Stock List */}
                  <div className="max-h-80 overflow-y-auto border border-white/10 rounded-lg">
                    {tickersLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm ghost">Loading stocks...</span>
                        </div>
                      </div>
                    ) : filteredTickers.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-sm ghost">No stocks found matching "{searchFilter}"</div>
                      </div>
                    ) : (
                      <div className="space-y-0">
                        {filteredTickers.map((tickerSymbol, index) => (
                          <button
                            key={tickerSymbol}
                            onClick={() => handleStockClick(tickerSymbol)}
                            className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0 ${
                              ticker === tickerSymbol ? 'bg-cyan-400/10 text-cyan-400' : 'text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="font-medium text-sm">
                                  {tickerSymbol}
                                  {/* 🔥 FIXED: Show clean HK format */}
                                  {HK_STOCK_SYMBOLS.includes(tickerSymbol) && (
                                    <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">🇭🇰</span>
                                  )}
                                </span>
                                {ticker === tickerSymbol && (
                                  <span className="text-xs bg-cyan-400/20 text-cyan-400 px-1.5 py-0.5 rounded">Current</span>
                                )}
                              </div>
                              <div className="text-xs ghost">#{index + 1}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* List Summary */}
                  <div className="mt-2 text-center">
                    <span className="text-xs ghost">
                      Showing {filteredTickers.length} of {availableTickers.length} stocks
                      {searchFilter && ` matching "${searchFilter}"`}
                    </span>
                  </div>
                </div>
              )}

              {/* Data Quality */}
              {stockData?.dataQuality && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="ghost text-xs">Sources:</span>
                    {getDataQualityBadge(stockData.dataQuality.estimates, 'EPS')}
                    {getDataQualityBadge(stockData.dataQuality.peHistory, 'P/E')}
                    {getDataQualityBadge(stockData.dataQuality.peers, 'Peers')}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stock Header - NO CHANGE DISPLAY */}
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

              {/* 2. Valuation Analysis - WITH SMALLER EPS GROWTH RATES */}
              <section id="valuation" className="scroll-mt-24">
                <ErrorBoundary fallback="Valuation section failed to load">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Valuation Analysis</h2>
                    
                    {stockData?.eps?.values?.length > 0 && stockData?.peBands ? (
                      <>
                        {/* EPS Data & Growth Rates Table */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          {/* EPS Forecasts */}
                          <div className="card p-4">
                            <h3 className="font-semibold mb-3 text-cyan-400">📊 EPS Forecasts</h3>
                            <div className="space-y-3">
                              {stockData.eps.years.map((year, index) => (
                                <div key={year} className="flex items-center justify-between">
                                  <span className="text-sm font-medium">{year}E</span>
                                  <span className="font-mono font-bold">
                                    ${stockData.eps.values[index]?.toFixed(2) || 'N/A'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* 🔥 FIXED: Smaller EPS Growth Rates */}
                          <div className="card p-4">
                            <h3 className="font-semibold mb-3 text-green-400">📈 EPS Growth Rates</h3>
                            <div className="space-y-3">
                              {epsGrowthRates.length > 0 ? (
                                epsGrowthRates.map((growth, index) => (
                                  <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm font-medium">
                                      {growth.fromYear} → {growth.toYear}
                                    </span>
                                    <span className={`font-mono font-medium px-2 py-1 rounded text-sm ${
                                      growth.growthRate >= 15 ? 'bg-green-500/20 text-green-400' :
                                      growth.growthRate >= 10 ? 'bg-blue-500/20 text-blue-400' :
                                      growth.growthRate >= 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                      'bg-red-500/20 text-red-400'
                                    }`}>
                                      {growth.growthRate > 0 ? '+' : ''}{growth.growthRate.toFixed(1)}%
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm ghost text-center py-2">
                                  Growth rates unavailable
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="chip px-3 py-2">
                            P/E Bands: {stockData.peBands.low}× / {stockData.peBands.mid}× / {stockData.peBands.high}×
                          </span>
                          <span className="chip px-3 py-2">
                            Current Price: ${stockData?.price?.toFixed(2) || '0.00'}
                          </span>
                          {stockData?.dataQuality?.warning && (
                            <span className="chip px-3 py-2 text-yellow-400">
                              ⚠️ {stockData.dataQuality.warning.split(' - ')[0]}
                            </span>
                          )}
                        </div>
                        <div id="valuationChart" className="chart-lg"></div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">📊</div>
                        <div className="text-xl font-medium mb-3">Valuation Analysis Unavailable</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? 'This ticker may have incomplete EPS data. Try AAPL, MSFT, GOOGL, or META for full analysis.'
                            : 'No forward EPS estimates available from analysts.'}
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 3. Quality Analysis */}
              <section id="quality" className="scroll-mt-24">
                <ErrorBoundary fallback="Quality analysis section failed to load">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Quality Analysis</h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold mb-4">Quality Radar</h3>
                        <div id="qualityRadar" className="chart"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Score Breakdown</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Value Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-orange-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.value || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.value?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Growth Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.growth || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.growth?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Profit Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.profit || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.profit?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Momentum Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.momentum || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.momentum?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>
                        </div>

                        {isDemoMode && (
                          <div className="mt-6 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                            <div className="text-xs text-blue-300/70">
                              💡 Quality scores are calculated using fundamental metrics including valuation, growth trajectory, profitability, and momentum indicators.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              </section>

              {/* 4. Peer Comparison */}
              <section id="peers" className="scroll-mt-24">
                <ErrorBoundary fallback="Peer comparison section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Peer Comparison</h2>
                      <div className="flex items-center gap-3">
                        {isDemoMode && (
                          <span className="chip px-2 py-1 text-blue-400 text-xs">
                            📊 Demo Peers
                          </span>
                        )}
                        <button id="toggleLabelsBtn" className="btn text-xs px-3 py-1">Labels: ON</button>
                      </div>
                    </div>
                    
                    {stockData?.peers?.length > 0 ? (
                      <>
                        <div className="mb-4">
                          <p className="text-sm ghost">
                            Forward P/E vs Market Cap comparison with sector peers. 
                            Bubble size represents relative market influence.
                          </p>
                        </div>
                        <div id="peersChart" className="chart"></div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">🏢</div>
                        <div className="text-xl font-medium mb-3">Peer Data Unavailable</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? 'Peer comparison data not available for this ticker. Try major stocks like AAPL, MSFT, or GOOGL.'
                            : 'No peer comparison data available for this ticker'}
                        </div>
                      </div>
                    )}

                    {/* Revenue Segments */}
                    {stockData?.segments?.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <h3 className="font-semibold mb-4">Revenue by Segment</h3>
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div id="segmentPie" className="chart"></div>
                          <div className="space-y-3">
                            {stockData.segments.map((segment, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div 
                                  className="w-4 h-4 rounded-full" 
                                  style={{ backgroundColor: segment.itemStyle.color }}
                                ></div>
                                <span className="text-sm flex-1">{segment.name}</span>
                                <span className="text-sm font-semibold">{segment.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
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
                    
                    {isDemoMode && (
                      <div className="mt-6 bg-blue-500/5 rounded-lg p-4 border border-blue-400/10">
                        <div className="text-xs text-blue-300/70">
                          💡 <span className="text-blue-400 font-medium">Professional Analysis:</span> These strengths and risks are based on 
                          current business fundamentals, market positioning, and industry dynamics. Analysis reflects comprehensive research 
                          of financial metrics, competitive landscape, and market trends.
                        </div>
                      </div>
                    )}
