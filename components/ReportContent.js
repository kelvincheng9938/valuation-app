// components/ReportContent.js - SIMPLIFIED VERSION (Remove usage checking - middleware handles it)
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
  const [showAllCategories, setShowAllCategories] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get available tickers and categories
  const availableTickers = getAvailableTickers()
  const stockCategories = getStockCategories()

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
                        onClick={() => handleStockClick(popularTicker)}
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
                  </div>
                </ErrorBoundary>
              </section>

              {/* 6. Latest News */}
              <section id="news" className="scroll-mt-24">
                <ErrorBoundary fallback="News section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Latest Company News</h2>
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
                      <div className="space-y-4">
                        {stockData.news.slice(0, 6).map((item, i) => (
                          <article key={i} className="p-4 rounded-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-200">
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-xs ghost">{item.source}</div>
                              <div className="text-xs ghost">{item.datetime}</div>
                            </div>
                            <h3 className="font-semibold mb-2 leading-relaxed">
                              {item.headline}
                            </h3>
                            {item.summary && item.summary !== item.headline && (
                              <p className="text-sm ghost leading-relaxed mb-3">{item.summary}</p>
                            )}
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                            >
                              Read more 
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">📰</div>
                        <div className="text-xl font-medium mb-3">No Recent News</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? `No recent news available in demo for ${ticker}. Major stocks like AAPL, MSFT, GOOGL have sample news articles.`
                            : `No recent news available for ${ticker}`
                          }
                        </div>
                      </div>
                    )}

                    {isDemoMode && stockData?.news?.length > 0 && (
                      <div className="mt-6 bg-blue-500/5 rounded-lg p-4 border border-blue-400/10">
                        <div className="text-xs text-blue-300/70">
                          📡 <span className="text-blue-400 font-medium">News Integration:</span> In live mode, this section automatically 
                          pulls the latest company-specific news, earnings announcements, and analyst updates from premium financial news sources 
                          with real-time updates throughout the trading day.
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

            </main>
          </div>

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
