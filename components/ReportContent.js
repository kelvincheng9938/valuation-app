// components/ReportContent.js - Fixed to work with existing structure
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchStockData, getAllStockData } from '@/lib/api'
import { getAvailableCategories } from '@/lib/demoData'
import Navigation from './Navigation'
import { initCharts, updateChartsTheme } from './ChartComponents'
import { getStockCategories } from '@/lib/demoData'
import { ErrorBoundary } from './ErrorBoundary'
import { useTheme } from '@/contexts/ThemeContext'

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ticker, setTicker] = useState('')
  const [inputTicker, setInputTicker] = useState('')
  const [updateKey, setUpdateKey] = useState(0)
  const [availableStocks, setAvailableStocks] = useState([])
  const [categories, setCategories] = useState({})
  const [activeCategory, setActiveCategory] = useState('POPULAR')
  const [showFullStockList, setShowFullStockList] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const { theme } = useTheme()
  
  const router = useRouter()
  const searchParams = useSearchParams()

  // Load available stocks and categories on mount
  useEffect(() => {
    loadAvailableStocks()
  }, [])

  // Handle URL parameter changes
  useEffect(() => {
    const tickerParam = searchParams.get('ticker')
    if (tickerParam && tickerParam !== ticker) {
      loadStockData(tickerParam)
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

  const loadAvailableStocks = async () => {
    try {
      console.log('🔄 Loading available stocks...')
      
      // Load all stocks from Google Sheet
      const allStocks = await getAllStockData()
      setAvailableStocks(allStocks)
      
      // Load dynamic categories
      const dynamicCategories = await getAvailableCategories()
      setCategories(dynamicCategories)
      
      console.log(`✅ Loaded ${allStocks.length} stocks with ${Object.keys(dynamicCategories).length} categories`)
      
    } catch (error) {
      console.error('Error loading available stocks:', error)
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

  // Get filtered tickers for search suggestions
  const getSearchSuggestions = (input) => {
    if (!input || input.length < 1) return []
    
    const searchTerm = input.toUpperCase()
    return availableStocks
      .filter(stock => 
        stock.ticker.includes(searchTerm) || 
        stock.name.toUpperCase().includes(searchTerm)
      )
      .slice(0, 8) // Show max 8 suggestions
  }

  const searchSuggestions = getSearchSuggestions(inputTicker)

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

  // Loading spinner component
  const LoadingSpinner = ({ message = "Loading..." }) => (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  )

  if (loading) {
    return <LoadingSpinner message="Loading stock analysis..." />
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
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-6" key={updateKey}>
        
        {/* Enhanced Demo Mode Header */}
        {isDemoMode && (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-blue-400 font-semibold">🎯 Professional Demo Mode</div>
                    <div className="text-sm text-blue-300/80">
                      {availableStocks.length}+ stocks with real Bloomberg Terminal data including global markets
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

        {/* MODERN COMPACT SEARCH INTERFACE */}
        <div className="mb-8">
          <div className="card p-6">
            
            {/* Enhanced Search Input with Suggestions */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputTicker}
                      onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                      placeholder={`Search ${availableStocks.length}+ stocks (e.g., AAPL, 700, TSLA)`}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-lg pr-20"
                    />
                    {inputTicker && (
                      <button 
                        type="button"
                        onClick={() => setInputTicker('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary px-6 py-3 rounded-lg text-lg font-semibold whitespace-nowrap"
                    disabled={loading}
                  >
                    Analyze
                  </button>
                </form>
                
                {/* Search Suggestions Dropdown */}
                {inputTicker && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-20 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchSuggestions.map((stock) => (
                      <button
                        key={stock.ticker}
                        onClick={() => {
                          setInputTicker('')
                          handleStockClick(stock.ticker)
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <div className="font-semibold text-gray-900">{stock.ticker}</div>
                          <div className="text-sm text-gray-500 truncate">{stock.name}</div>
                        </div>
                        <div className="text-sm text-gray-400">${stock.price}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* COMPACT CATEGORY PILLS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Quick Browse</h3>
                <div className="text-sm text-gray-400">
                  {availableStocks.length} stocks available
                </div>
              </div>

              {/* Category Pills - Horizontal Scrollable */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {Object.entries(categories).map(([categoryKey, category]) => (
                  <button
                    key={categoryKey}
                    onClick={() => setActiveCategory(categoryKey)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      activeCategory === categoryKey
                        ? 'text-white shadow-lg transform scale-105' 
                        : 'text-white/70 hover:text-white hover:transform hover:scale-105'
                    }`}
                    style={{ 
                      backgroundColor: activeCategory === categoryKey 
                        ? category.color 
                        : category.color + '40',
                      border: `1px solid ${category.color}60`
                    }}
                  >
                    <span>{category.label}</span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Category Stocks */}
              {categories[activeCategory] && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {categories[activeCategory].tickers.slice(0, showFullStockList ? undefined : 12).map(tickerSymbol => {
                      const stockInfo = availableStocks.find(s => s.ticker === tickerSymbol)
                      return (
                        <button
                          key={tickerSymbol}
                          onClick={() => handleStockClick(tickerSymbol)}
                          className={`group px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                            ticker === tickerSymbol
                              ? 'bg-cyan-500 text-white shadow-lg transform scale-105' 
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white hover:transform hover:scale-105'
                          }`}
                        >
                          <span className="font-bold">{tickerSymbol}</span>
                          {stockInfo && (
                            <span className="text-xs opacity-75">
                              ${stockInfo.price}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                  
                  {/* Show More/Less for categories with many stocks */}
                  {categories[activeCategory].tickers.length > 12 && (
                    <button
                      onClick={() => setShowFullStockList(!showFullStockList)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    >
                      {showFullStockList 
                        ? `Show Less` 
                        : `Show ${categories[activeCategory].tickers.length - 12} More`
                      }
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STOCK REPORT SECTION */}
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

            {/* Report Content */}
            <div className="space-y-8">
              
              {/* 1. Overview Section */}
              <section id="overview" className="scroll-mt-24">
                <ErrorBoundary fallback="Overview section failed to load">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Quality Scores */}
                    <div className="card p-6">
                      <h3 className="font-semibold mb-4">Quality Scores</h3>
                      <div className="space-y-4">
                        {stockData?.scores && Object.entries(stockData.scores).map(([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="capitalize">{key}</span>
                              <span className="font-medium">{value}/10</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" 
                                style={{ width: `${value * 10}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <canvas id="radar-chart" width="250" height="250"></canvas>
                      </div>
                    </div>

                    {/* Company Info & Key Stats */}
                    <div className="lg:col-span-2 space-y-6">
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
                  </div>
                </ErrorBoundary>
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
            
            {/* Featured Popular Stocks */}
            {categories.POPULAR && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {categories.POPULAR.tickers.slice(0, 8).map(tickerSymbol => {
                  const stockInfo = availableStocks.find(s => s.ticker === tickerSymbol)
                  return stockInfo ? (
                    <button
                      key={tickerSymbol}
                      onClick={() => handleStockClick(tickerSymbol)}
                      className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 hover:transform hover:scale-105"
                    >
                      <div className="font-bold text-lg">{tickerSymbol}</div>
                      <div className="text-sm text-gray-400 truncate">{stockInfo.name}</div>
                      <div className="text-cyan-400 font-semibold">${stockInfo.price}</div>
                    </button>
                  ) : null
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
