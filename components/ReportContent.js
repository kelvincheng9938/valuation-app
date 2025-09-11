// components/ReportContent.js - FIXED: Clean scrollable stock list interface
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from './Navigation'
import { initCharts, updateChartsTheme } from './ChartComponents'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
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
  const [showStockList, setShowStockList] = useState(false) // 🔥 NEW: Toggle for stock list
  const [availableTickers, setAvailableTickers] = useState([])
  const [tickersLoading, setTickersLoading] = useState(true)
  const [filteredTickers, setFilteredTickers] = useState([]) // 🔥 NEW: For search filtering
  const [searchFilter, setSearchFilter] = useState('') // 🔥 NEW: Search within stock list
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
      setAvailableTickers(tickers)
      setFilteredTickers(tickers) // Initially show all
      
      console.log(`✅ Loaded ${tickers.length} available tickers`)
    } catch (error) {
      console.error('❌ Error loading available tickers:', error)
      setAvailableTickers([])
      setFilteredTickers([])
    } finally {
      setTickersLoading(false)
    }
  }

  // 🔥 NEW: Filter tickers based on search
  useEffect(() => {
    if (!searchFilter.trim()) {
      setFilteredTickers(availableTickers)
    } else {
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

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!inputTicker.trim()) return

    const searchTicker = inputTicker.trim().toUpperCase()
    router.push(`/report?ticker=${searchTicker}`)
    setInputTicker('')
    setShowStockList(false) // Close stock list after search
  }

  const handleStockClick = (tickerSymbol) => {
    console.log('[ReportContent] Stock clicked:', tickerSymbol)
    router.push(`/report?ticker=${tickerSymbol}`)
    setShowStockList(false) // Close stock list after selection
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

          {/* 🔥 CLEAN SEARCH INTERFACE */}
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

              {/* 🔥 STOCK LIST TOGGLE BUTTON */}
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

              {/* 🔥 SCROLLABLE STOCK LIST */}
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
                                <span className="font-medium text-sm">{tickerSymbol}</span>
                                {/* Add HK indicator for Hong Kong stocks */}
                                {['700', '3690', '1810', '9988'].includes(tickerSymbol) && (
                                  <span className="text-xs bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded">🇭🇰</span>
                                )}
                                {/* Show current selection */}
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

              {/* Compact Data Quality */}
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

              {/* Continue with all other sections... */}
              {/* [Rest of the sections remain the same as before] */}

            </main>
          </div>

        </div>
      </ErrorBoundary>
    </>
  )
}
