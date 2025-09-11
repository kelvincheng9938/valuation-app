// components/ReportContent.js - Updated with modern compact browser for 115+ stocks
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchStockData, getAllStockData } from '@/lib/api'
import { getAvailableCategories } from '@/lib/demoData'
import LoadingSpinner from './LoadingSpinner'
import StockReport from './StockReport'

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
      console.log(`Loading data for ${symbol}...`)
      
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

  const initCharts = async (data) => {
    // Chart initialization logic (keep your existing code)
    console.log('Initializing charts for:', data.ticker)
  }

  // Demo mode indicator
  const isDemoMode = stockData?.dataQuality?.quote === 'demo'

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
          <StockReport 
            data={stockData} 
            updateKey={updateKey}
            onNavigate={handleStockClick}
          />
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
    </div>
  )
}

// Add CSS for hiding scrollbar
const scrollbarCSS = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = scrollbarCSS
  document.head.appendChild(style)
}
