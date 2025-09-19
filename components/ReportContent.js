'use client'
import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Navigation from './Navigation'
import { ErrorBoundary } from './ErrorBoundary'
import { fetchStockData, searchStocks } from '@/lib/api'

export default function ReportContent() {
  // State management
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputTicker, setInputTicker] = useState('')
  const [ticker, setTicker] = useState('')
  const [updateKey, setUpdateKey] = useState(0)
  const [usageInfo, setUsageInfo] = useState(null)
  const [availableTickers, setAvailableTickers] = useState([])
  const [tickersLoading, setTickersLoading] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  
  // Company News State
  const [companyNews, setCompanyNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)
  
  const searchParams = useSearchParams()
  const searchTimeoutRef = useRef(null)
  const isDemoMode = true // For public launch, this can be set to false when going live

  // Initialize component
  useEffect(() => {
    const urlTicker = searchParams.get('ticker')
    if (urlTicker) {
      setTicker(urlTicker.toUpperCase())
      setInputTicker(urlTicker.toUpperCase())
      loadStockData(urlTicker.toUpperCase())
    }
    
    // Load available stocks for search
    loadAvailableStocks()
  }, [searchParams])

  const loadAvailableStocks = async () => {
    try {
      const stocks = await searchStocks()
      setAvailableTickers(stocks)
    } catch (error) {
      console.warn('Failed to load available tickers:', error)
      setAvailableTickers([])
    } finally {
      setTickersLoading(false)
    }
  }

  const loadStockData = async (symbol) => {
    if (!symbol.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchStockData(symbol.toUpperCase())
      setStockData(data)
      setTicker(symbol.toUpperCase())
      setUpdateKey(prev => prev + 1)
      
      // Load company news after stock data loads successfully
      loadCompanyNews(symbol.toUpperCase())
      
      // Update URL without page reload
      const url = new URL(window.location)
      url.searchParams.set('ticker', symbol.toUpperCase())
      window.history.replaceState({}, '', url)
      
    } catch (err) {
      console.error('Error loading stock data:', err)
      setError(err.message)
      setStockData(null)
    } finally {
      setLoading(false)
    }
  }

  // Load company-specific news (safe implementation)
  const loadCompanyNews = async (symbol) => {
    if (!symbol.trim()) return
    
    setNewsLoading(true)
    
    try {
      console.log(`🔄 Loading company news for ${symbol}...`)
      
      const response = await fetch(`/api/news/company?ticker=${symbol}`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCompanyNews(data.news || [])
        console.log(`✅ Loaded ${data.news?.length || 0} news articles for ${symbol}`)
      } else {
        console.warn('Company news API not available, using demo news')
        setCompanyNews([])
      }
      
    } catch (error) {
      console.warn(`Company news API failed for ${symbol}, using demo news:`, error)
      setCompanyNews([])
    } finally {
      setNewsLoading(false)
    }
  }

  // Auto-refresh company news every 3 minutes (only if API is available)
  useEffect(() => {
    if (ticker && companyNews.length > 0) {
      const newsInterval = setInterval(() => {
        loadCompanyNews(ticker)
      }, 3 * 60 * 1000) // 3 minutes
      
      return () => clearInterval(newsInterval)
    }
  }, [ticker, companyNews.length])

  // Search functionality
  const handleSearch = (query) => {
    setInputTicker(query)
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    if (query.length < 1) {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      const results = availableTickers.filter(stock => 
        stock.ticker.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
      
      setSearchResults(results)
      setShowSearchResults(results.length > 0)
    }, 200)
  }

  const handleTickerSelect = (selectedTicker) => {
    setInputTicker(selectedTicker)
    setShowSearchResults(false)
    loadStockData(selectedTicker)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const exactMatch = availableTickers.find(stock => 
        stock.ticker.toLowerCase() === inputTicker.toLowerCase()
      )
      if (exactMatch) {
        handleTickerSelect(exactMatch.ticker)
      } else if (inputTicker.trim()) {
        loadStockData(inputTicker.trim())
      }
      setShowSearchResults(false)
    } else if (e.key === 'Escape') {
      setShowSearchResults(false)
    }
  }

  // Chart initialization
  useEffect(() => {
    if (typeof window !== 'undefined' && stockData) {
      initializeCharts()
    }
  }, [stockData, updateKey])

  const initializeCharts = async () => {
    if (!stockData) return
    
    try {
      // Dynamic import of ECharts
      const echarts = (await import('echarts')).default
      
      // Initialize radar chart
      initRadarChart(echarts)
      
      // Initialize valuation chart  
      initValuationChart(echarts)
      
      // Initialize peers bubble chart
      initPeersChart(echarts)
      
      // Initialize segments pie chart
      initSegmentsChart(echarts)
      
    } catch (error) {
      console.warn('Charts failed to initialize:', error)
    }
  }

  const initRadarChart = (echarts) => {
    const radarElement = document.getElementById('radar-chart')
    if (!radarElement || !stockData?.scores) return
    
    const radarChart = echarts.init(radarElement)
    
    const option = {
      backgroundColor: 'transparent',
      radar: {
        indicator: [
          { name: 'Value', max: 10 },
          { name: 'Growth', max: 10 },
          { name: 'Profitability', max: 10 },
          { name: 'Momentum', max: 10 }
        ],
        radius: '60%',
        axisName: {
          color: '#9ca3af',
          fontSize: 12
        },
        splitLine: {
          lineStyle: { color: '#374151' }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(59, 130, 246, 0.1)', 'transparent']
          }
        }
      },
      series: [{
        type: 'radar',
        data: [{
          value: [
            stockData.scores.value,
            stockData.scores.growth,
            stockData.scores.profit,
            stockData.scores.momentum
          ],
          areaStyle: {
            color: 'rgba(59, 130, 246, 0.3)'
          },
          lineStyle: {
            color: '#3b82f6',
            width: 2
          },
          symbol: 'circle',
          symbolSize: 6
        }]
      }]
    }
    
    radarChart.setOption(option, { notMerge: true })
  }

  const initValuationChart = (echarts) => {
    const valuationElement = document.getElementById('valuation-chart')
    if (!valuationElement || !stockData?.eps) return
    
    const valuationChart = echarts.init(valuationElement)
    
    const years = stockData.eps.years || ['2025', '2026', '2027']
    const epsValues = stockData.eps.values || [0, 0, 0]
    const currentPrice = stockData.price || 0
    
    const lowValues = epsValues.map(eps => eps * (stockData.peBands?.low || 20))
    const midValues = epsValues.map(eps => eps * (stockData.peBands?.mid || 25))
    const highValues = epsValues.map(eps => eps * (stockData.peBands?.high || 30))
    
    const option = {
      backgroundColor: 'transparent',
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: years,
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#9ca3af' }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#9ca3af' },
        splitLine: { lineStyle: { color: '#374151' } }
      },
      series: [
        {
          name: 'Low P/E',
          type: 'bar',
          data: lowValues,
          itemStyle: { color: '#10b981' },
          barWidth: '60%'
        },
        {
          name: 'Mid P/E',
          type: 'bar',
          data: midValues,
          itemStyle: { color: '#f59e0b' },
          barWidth: '60%'
        },
        {
          name: 'High P/E',
          type: 'bar',
          data: highValues,
          itemStyle: { color: '#ef4444' },
          barWidth: '60%'
        },
        {
          name: 'Current Price',
          type: 'line',
          data: Array(years.length).fill(currentPrice),
          lineStyle: { color: '#8b5cf6', width: 3 },
          symbol: 'circle',
          symbolSize: 8
        }
      ],
      legend: {
        top: 0,
        textStyle: { color: '#9ca3af' }
      }
    }
    
    valuationChart.setOption(option, { notMerge: true })
  }

  const initPeersChart = (echarts) => {
    const peersElement = document.getElementById('peers-chart')
    if (!peersElement || !stockData?.peers) return
    
    const peersChart = echarts.init(peersElement)
    
    const peersData = stockData.peers.map(peer => ({
      value: [peer[0], peer[1], peer[2]],
      name: peer[3] || 'Unknown'
    }))
    
    const option = {
      backgroundColor: 'transparent',
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        top: '10%'
      },
      xAxis: {
        type: 'value',
        name: 'Market Cap ($B)',
        nameLocation: 'middle',
        nameGap: 30,
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#9ca3af' }
      },
      yAxis: {
        type: 'value',
        name: 'Forward P/E',
        nameLocation: 'middle',
        nameGap: 40,
        axisLine: { lineStyle: { color: '#374151' } },
        axisLabel: { color: '#9ca3af' }
      },
      series: [{
        type: 'scatter',
        data: peersData,
        symbolSize: (data) => Math.sqrt(data[2]) * 3,
        itemStyle: {
          color: '#3b82f6',
          opacity: 0.7
        },
        label: {
          show: true,
          position: 'top',
          color: '#9ca3af',
          fontSize: 10
        }
      }]
    }
    
    peersChart.setOption(option, { notMerge: true })
  }

  const initSegmentsChart = (echarts) => {
    const segmentsElement = document.getElementById('segments-chart')
    if (!segmentsElement || !stockData?.segments) return
    
    const segmentsChart = echarts.init(segmentsElement)
    
    const option = {
      backgroundColor: 'transparent',
      series: [{
        type: 'pie',
        radius: '70%',
        data: stockData.segments,
        label: {
          color: '#9ca3af',
          fontSize: 12
        },
        labelLine: {
          lineStyle: { color: '#374151' }
        }
      }]
    }
    
    segmentsChart.setOption(option, { notMerge: true })
  }

  // Loading state
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-lg font-medium mb-2">
                {isDemoMode ? 
                  'Loading comprehensive demo analysis...' : 'Fetching live market data from APIs...'}
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
          
          {/* Search Header */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Enter ticker (AAPL, 700, MU)"
                value={inputTicker}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => inputTicker && setShowSearchResults(searchResults.length > 0)}
                className="w-full pl-4 pr-16 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
              <button
                onClick={() => {
                  if (inputTicker.trim()) {
                    loadStockData(inputTicker.trim())
                    setShowSearchResults(false)
                  }
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary px-4 py-1.5 rounded text-sm"
              >
                Analyze
              </button>
              
              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {searchResults.map((stock) => (
                    <button
                      key={stock.ticker}
                      onClick={() => handleTickerSelect(stock.ticker)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{stock.ticker}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 truncate">{stock.name}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Available Stocks */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Browse Stocks</h3>
              <button 
                onClick={() => {
                  const stockList = document.getElementById('stock-list')
                  if (stockList) {
                    stockList.style.display = stockList.style.display === 'none' ? 'block' : 'none'
                  }
                }}
                className="btn-secondary px-4 py-2 rounded-lg text-sm"
              >
                Hide List
              </button>
            </div>
            
            <div id="stock-list" className="max-h-40 overflow-y-auto">
              {tickersLoading ? (
                <div className="text-gray-600 dark:text-gray-400">Loading available stocks...</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                  {availableTickers.map((stock, index) => (
                    <button
                      key={`${stock.ticker}-${index}`}
                      onClick={() => handleTickerSelect(stock.ticker)}
                      className={`p-2 text-sm rounded-lg border transition-colors text-left ${
                        ticker === stock.ticker
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                          : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-medium">#{index + 1}</div>
                      <div className="font-bold">{stock.ticker}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Report Content */}
          {stockData && (
            <main className="space-y-8">
              
              {/* Company Header */}
              <header className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {stockData.ticker.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{stockData.name}</h1>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                      <span>{stockData.ticker}</span>
                      <span>•</span>
                      <span>{stockData.sector}</span>
                      <span>•</span>
                      <span>Market Cap: {stockData.marketCap}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${stockData.price}
                    </div>
                    <div className={`text-lg font-medium ${
                      stockData.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%
                      <span className="text-sm ml-1">
                        (${stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)})
                      </span>
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Analysis Grid */}
              <div className="grid lg:grid-cols-12 gap-8">
                
                {/* Left Panel - Scores & Charts */}
                <div className="lg:col-span-5">
                  
                  {/* Quality Scores */}
                  <div className="card p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quality Scores</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">
                          {stockData.scores?.value?.toFixed(1) || '0.0'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Value</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {stockData.scores?.growth?.toFixed(1) || '0.0'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Growth</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-400">
                          {stockData.scores?.profit?.toFixed(1) || '0.0'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Profitability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">
                          {stockData.scores?.momentum?.toFixed(1) || '0.0'}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Momentum</div>
                      </div>
                    </div>
                    
                    {/* Radar Chart */}
                    <div className="h-64">
                      <div id="radar-chart" className="w-full h-full"></div>
                    </div>
                  </div>

                  {/* Valuation Chart */}
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Valuation Bands</h3>
                    <div className="h-64">
                      <div id="valuation-chart" className="w-full h-full"></div>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Info & Stats */}
                <div className="lg:col-span-7">
                  
                  {/* About & Key Stats */}
                  <div className="card p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">About {stockData.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                      {stockData.description}
                    </p>
                    
                    <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Key Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Market Cap</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{stockData.marketCap}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Forward P/E</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{stockData.forwardPE}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">TTM P/E</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{stockData.ttmPE}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Sector</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{stockData.sector}</div>
                      </div>
                    </div>
                  </div>

                  {/* Peers & Segments */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Peers Comparison</h3>
                      <div className="h-48">
                        <div id="peers-chart" className="w-full h-full"></div>
                      </div>
                    </div>
                    
                    <div className="card p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue by Segment</h3>
                      <div className="h-48">
                        <div id="segments-chart" className="w-full h-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Analysis */}
              <section className="grid md:grid-cols-2 gap-8">
                <ErrorBoundary fallback="Investment analysis failed to load">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      Investment Strengths
                    </h3>
                    {stockData.strengths && stockData.strengths.length > 0 ? (
                      <ul className="space-y-3">
                        {stockData.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-green-500 mt-0.5">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        No investment strengths data available for {ticker}
                      </div>
                    )}
                  </div>
                </ErrorBoundary>

                <ErrorBoundary fallback="Risk analysis failed to load">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-red-500">⚠</span>
                      Investment Risks
                    </h3>
                    {stockData.risks && stockData.risks.length > 0 ? (
                      <ul className="space-y-3">
                        {stockData.risks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-red-500 mt-0.5">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400 text-sm">
                        No investment risks data available for {ticker}
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* Latest Company News */}
              <section>
                <ErrorBoundary fallback="News section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Latest Company News</h3>
                      {newsLoading && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className="w-3 h-3 animate-spin rounded-full border border-cyan-400 border-t-transparent"></div>
                          Updating...
                        </div>
                      )}
                    </div>
                    
                    {/* Show live company news if available, otherwise fall back to demo news */}
                    {companyNews && companyNews.length > 0 ? (
                      <div className="space-y-4">
                        {companyNews.map((article, index) => (
                          <div key={index} className="border-l-4 border-cyan-400 pl-4 py-2">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                              {article.headline}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {article.summary}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                              <span>{article.source}</span>
                              <span>•</span>
                              <span>{article.datetime}</span>
                              <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300"
                              >
                                Read more →
                              </a>
                            </div>
                          </div>
                        ))}
                        
                        {/* Live News Integration Info */}
                        <div className="mt-6 bg-blue-500/5 rounded-lg p-4 border border-blue-400/10">
                          <div className="text-xs text-blue-300/70">
                            📡 <span className="text-blue-400 font-medium">Live News Integration:</span> Company-specific news 
                            automatically refreshes every 3 minutes with the latest earnings announcements, analyst updates, 
                            and relevant financial developments for {ticker}.
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Fallback to demo news from stockData
                      <div>
                        {stockData.news && stockData.news.length > 0 ? (
                          <div className="space-y-4">
                            {stockData.news.map((article, index) => (
                              <div key={index} className="border-l-4 border-cyan-400 pl-4 py-2">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                  {article.headline}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {article.summary}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                                  <span>{article.source}</span>
                                  <span>•</span>
                                  <span>{article.datetime}</span>
                                  <a 
                                    href={article.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300"
                                  >
                                    Read more →
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-gray-600 dark:text-gray-400 text-sm">
                              {newsLoading 
                                ? 'Loading latest company news...'
                                : `No recent news available for ${ticker}`
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

            </main>
          )}

        </div>
      </ErrorBoundary>
    </>
  )
}
