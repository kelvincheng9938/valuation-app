// components/ReportContent.js - YOUR EXACT ORIGINAL with only compact categories
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

  // Load available stocks count for 115 stock support
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
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading stock analysis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Unable to load stock data</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary px-6 py-3 rounded-lg"
          >
            Please refresh the page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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

        {/* COMPACT SEARCH INTERFACE - ONLY CHANGE YOU REQUESTED */}
        <div className="mb-8">
          <div className="card p-4">
            {/* Search Input */}
            <div className="mb-4">
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

            {/* COMPACT COLORFUL STOCK CATEGORIES */}
            <div className="space-y-3">
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
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <h4 className="font-semibold text-sm" style={{ color: category.color }}>
                      {category.label}
                      {categoryKey === 'HK_STOCKS' && (
                        <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">🇭🇰 Hong Kong</span>
                      )}
                    </h4>
                    <span className="text-xs ghost">({category.tickers.length})</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {category.tickers.map(tickerSymbol => (
                      <button
                        key={tickerSymbol}
                        onClick={() => handleStockClick(tickerSymbol)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
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

        {/* STOCK REPORT SECTION - YOUR EXACT ORIGINAL LAYOUT */}
        {stockData ? (
          <div className="space-y-8">
            
            {/* Stock Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">{stockData.ticker}</h1>
                  <p className="text-lg ghost">{stockData.name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-white">
                    ${stockData.price}
                  </div>
                  <div className={`px-3 py-1 rounded text-sm font-medium ${
                    stockData.changePercent >= 0 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%
                  </div>
                </div>
              </div>
              
              {/* Valuation Position Indicator */}
              {getValuationPosition() && (
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  getValuationPosition() === 'undervalued' ? 'bg-green-500/20 text-green-400' :
                  getValuationPosition() === 'overvalued' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {getValuationPosition() === 'undervalued' ? '📈 Potentially Undervalued' :
                   getValuationPosition() === 'overvalued' ? '📉 Potentially Overvalued' :
                   '📊 Fair Value Range'}
                </div>
              )}
            </div>

            {/* Navigation Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'valuation', label: 'Valuation' },
                { id: 'quality', label: 'Quality' },
                { id: 'peers', label: 'Peers' },
                { id: 'analysis', label: 'Analysis' },
                { id: 'news', label: 'News' }
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* YOUR ORIGINAL V7 LAYOUT */}
            <div className="grid grid-cols-12 gap-8">
              
              {/* LEFT SIDEBAR: Quality Scores + Radar Chart */}
              <aside className="col-span-12 lg:col-span-3">
                <div className="sticky top-24">
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-6">Quality Scores</h3>
                    
                    {/* Quality Score Bars */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Value Score</span>
                        <div className="flex items-center gap-3 w-32">
                          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400 rounded-full transition-all duration-300" 
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

                    {/* Radar Chart */}
                    <div className="flex justify-center">
                      <canvas id="radar-chart" width="250" height="250"></canvas>
                    </div>
                  </div>
                </div>
              </aside>

              {/* RIGHT CONTENT: All Sections */}
              <main className="col-span-12 lg:col-span-9 space-y-8">

                {/* 1. Company Overview */}
                <section id="overview" className="scroll-mt-24">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Company Overview</h2>
                    
                    {/* Company Description */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">About the Company</h3>
                      <p className="leading-relaxed">
                        {stockData?.description || 'Loading company information...'}
                      </p>
                    </div>
                    
                    {/* Key Stats */}
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

                {/* 3. Quality Metrics */}
                <section id="quality" className="scroll-mt-24">
                  <ErrorBoundary fallback="Quality section failed to load">
                    <div className="card p-6">
                      <h2 className="text-2xl font-bold mb-6">Quality Assessment</h2>
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold mb-4">Professional Stock Valuation</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Search for any of our {availableStocks.length}+ stocks to get institutional-grade analysis with real Bloomberg data, 
              dynamic P/E valuation bands, and comprehensive financial insights.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
