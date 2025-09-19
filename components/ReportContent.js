// components/ReportContent.js - COMPLETE FILE with auto-refreshing company news
'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import ErrorBoundary from '@/components/ErrorBoundary'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
import * as echarts from 'echarts'

export default function ReportContent({ initialTicker = '' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Existing state
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [ticker, setTicker] = useState(initialTicker)
  const [inputTicker, setInputTicker] = useState('')
  const [showStockList, setShowStockList] = useState(false)
  const [availableTickers, setAvailableTickers] = useState([])
  const [activeSection, setActiveSection] = useState('overview')
  const [updateKey, setUpdateKey] = useState(0)
  const [theme, setTheme] = useState('dark')
  
  // NEW: Company news state for auto-refresh
  const [companyNews, setCompanyNews] = useState([])
  const [newsLoading, setNewsLoading] = useState(false)
  const [newsError, setNewsError] = useState(null)
  const [newsLastUpdated, setNewsLastUpdated] = useState(null)
  const [autoRefreshNews, setAutoRefreshNews] = useState(true)
  const newsIntervalRef = useRef(null)

  // Chart refs
  const radarChartRef = useRef(null)
  const valuationChartRef = useRef(null)
  const peersChartRef = useRef(null)
  const segmentChartRef = useRef(null)

  // Load available tickers
  useEffect(() => {
    const loadTickers = async () => {
      try {
        const tickers = await getAvailableTickers()
        setAvailableTickers(tickers)
      } catch (error) {
        console.error('Error loading available tickers:', error)
      }
    }
    loadTickers()
  }, [])

  // Initial load from URL
  useEffect(() => {
    const urlTicker = searchParams.get('ticker')
    if (urlTicker && urlTicker !== ticker) {
      setTicker(urlTicker.toUpperCase())
      loadStockData(urlTicker.toUpperCase())
    } else if (initialTicker && !stockData) {
      loadStockData(initialTicker.toUpperCase())
    }
  }, [searchParams])

  // NEW: Auto-refresh company news
  useEffect(() => {
    if (ticker && autoRefreshNews) {
      // Fetch immediately
      fetchCompanyNews(ticker)
      
      // Set up auto-refresh every 5 minutes
      if (newsIntervalRef.current) {
        clearInterval(newsIntervalRef.current)
      }
      
      newsIntervalRef.current = setInterval(() => {
        if (ticker) {
          console.log(`🔄 Auto-refreshing company news for ${ticker}`)
          fetchCompanyNews(ticker, true) // Silent refresh
        }
      }, 5 * 60 * 1000) // 5 minutes
      
      // Cleanup
      return () => {
        if (newsIntervalRef.current) {
          clearInterval(newsIntervalRef.current)
        }
      }
    }
  }, [ticker, autoRefreshNews])

  // Chart initialization
  useEffect(() => {
    if (stockData && !loading) {
      setTimeout(() => {
        initCharts(stockData)
      }, 150)
    }
  }, [stockData, updateKey])

  // Theme changes
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

  // NEW: Company news functions
  const fetchCompanyNews = async (symbol, silent = false) => {
    if (!symbol) return
    
    if (!silent) {
      setNewsLoading(true)
      setNewsError(null)
    }
    
    try {
      console.log(`🔍 Fetching company news for ${symbol}`)
      
      const response = await fetch(`/api/news/company?symbol=${symbol}`, {
        cache: 'no-store'
      })
      
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.news && Array.isArray(data.news)) {
        setCompanyNews(data.news)
        setNewsLastUpdated(data.lastUpdated)
        console.log(`✅ Company news loaded: ${data.news.length} articles`)
      } else {
        console.warn('⚠️ No news data available:', data.message)
        setCompanyNews([])
      }
      
    } catch (error) {
      console.error('❌ Error fetching company news:', error)
      setNewsError(error.message)
      setCompanyNews([])
    } finally {
      if (!silent) {
        setNewsLoading(false)
      }
    }
  }

  const handleManualNewsRefresh = () => {
    if (ticker) {
      fetchCompanyNews(ticker)
    }
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
    if (!stockData?.eps?.values?.length || !stockData?.peBands || !stockData?.price) {
      return null
    }

    const nextYearEPS = stockData.eps.values[0]
    if (!nextYearEPS || nextYearEPS <= 0) return null

    const currentPrice = parseFloat(stockData.price)
    const { low, mid, high } = stockData.peBands

    const lowPrice = nextYearEPS * low
    const midPrice = nextYearEPS * mid
    const highPrice = nextYearEPS * high

    if (currentPrice <= lowPrice) return 'undervalued'
    if (currentPrice <= midPrice) return 'fair'
    if (currentPrice <= highPrice) return 'expensive'
    return 'overvalued'
  }

  const initCharts = async (data) => {
    if (!data) return

    try {
      // Radar Chart
      if (radarChartRef.current) {
        const radarChart = echarts.init(radarChartRef.current)
        const radarOption = {
          backgroundColor: 'transparent',
          radar: {
            indicator: [
              { name: 'Value', max: 10 },
              { name: 'Growth', max: 10 },
              { name: 'Profitability', max: 10 },
              { name: 'Momentum', max: 10 }
            ],
            radius: '70%',
            axisName: {
              color: '#9ca3af',
              fontSize: 12
            },
            axisLine: { lineStyle: { color: '#374151' } },
            splitLine: { lineStyle: { color: '#374151' } },
            splitArea: { show: false }
          },
          series: [{
            type: 'radar',
            data: [{
              value: [data.scores.value, data.scores.growth, data.scores.profit, data.scores.momentum],
              name: data.ticker,
              itemStyle: { color: '#3b82f6' },
              areaStyle: { color: 'rgba(59, 130, 246, 0.1)' },
              lineStyle: { color: '#3b82f6', width: 2 }
            }]
          }]
        }
        radarChart.setOption(radarOption, { notMerge: true })
      }

      // Valuation Chart
      if (valuationChartRef.current && data.eps?.values?.length) {
        const valuationChart = echarts.init(valuationChartRef.current)
        const years = data.eps.years
        const epsValues = data.eps.values
        const { low, mid, high } = data.peBands

        const lowPrices = epsValues.map(eps => eps * low)
        const midPrices = epsValues.map(eps => eps * mid)
        const highPrices = epsValues.map(eps => eps * high)
        const currentPrice = parseFloat(data.price)

        const valuationOption = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#1f2937',
            borderColor: '#374151',
            textStyle: { color: '#f3f4f6' }
          },
          legend: {
            data: ['Low P/E', 'Fair P/E', 'High P/E', 'Current Price'],
            textStyle: { color: '#9ca3af' },
            top: 20
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
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
              data: lowPrices,
              itemStyle: { color: '#ef4444' }
            },
            {
              name: 'Fair P/E',
              type: 'bar',
              data: midPrices,
              itemStyle: { color: '#f59e0b' }
            },
            {
              name: 'High P/E',
              type: 'bar',
              data: highPrices,
              itemStyle: { color: '#10b981' }
            },
            {
              name: 'Current Price',
              type: 'line',
              data: years.map(() => currentPrice),
              lineStyle: { color: '#3b82f6', width: 3 },
              itemStyle: { color: '#3b82f6' }
            }
          ]
        }
        valuationChart.setOption(valuationOption, { notMerge: true })
      }

      // Peers Bubble Chart
      if (peersChartRef.current && data.peers?.length) {
        const peersChart = echarts.init(peersChartRef.current)
        const peersOption = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>Market Cap: ${c[0]}B<br/>Forward P/E: {c[1]}x',
            backgroundColor: '#1f2937',
            borderColor: '#374151',
            textStyle: { color: '#f3f4f6' }
          },
          xAxis: {
            name: 'Market Cap ($B)',
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: { color: '#9ca3af' },
            axisLabel: { color: '#9ca3af' },
            axisLine: { lineStyle: { color: '#374151' } },
            splitLine: { lineStyle: { color: '#374151' } }
          },
          yAxis: {
            name: 'Forward P/E',
            nameLocation: 'middle',
            nameGap: 40,
            nameTextStyle: { color: '#9ca3af' },
            axisLabel: { color: '#9ca3af' },
            axisLine: { lineStyle: { color: '#374151' } },
            splitLine: { lineStyle: { color: '#374151' } }
          },
          series: [{
            type: 'scatter',
            data: data.peers.map(peer => ({
              value: [peer[0], peer[1], peer[2]],
              name: peer[3]
            })),
            symbolSize: function(data) {
              return Math.sqrt(data[2]) * 3
            },
            itemStyle: {
              color: function(params) {
                return params.name === data.ticker ? '#3b82f6' : '#6b7280'
              }
            }
          }]
        }
        peersChart.setOption(peersOption, { notMerge: true })
      }

      // Segment Pie Chart
      if (segmentChartRef.current && data.segments?.length) {
        const segmentChart = echarts.init(segmentChartRef.current)
        const segmentOption = {
          backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c}% ({d}%)',
            backgroundColor: '#1f2937',
            borderColor: '#374151',
            textStyle: { color: '#f3f4f6' }
          },
          series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            data: data.segments,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              color: '#9ca3af',
              fontSize: 12
            }
          }]
        }
        segmentChart.setOption(segmentOption, { notMerge: true })
      }

    } catch (error) {
      console.error('Chart initialization error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading Stock Analysis</h2>
            <p className="text-gray-400">Fetching latest data for {ticker}...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-3xl font-bold text-white mb-4">Analysis Unavailable</h2>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary px-6 py-3 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold text-white mb-4">Enter a Stock Symbol</h2>
            <p className="text-gray-400 mb-8">Search for any stock to get detailed analysis</p>
            <form onSubmit={handleSearch} className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputTicker}
                  onChange={(e) => setInputTicker(e.target.value)}
                  placeholder="Enter ticker (e.g., AAPL)"
                  className="input flex-1"
                />
                <button type="submit" className="btn-primary px-6">
                  Analyze
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const valuationPosition = getValuationPosition()

  return (
    <>
      <Navigation />
      
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
          
          {/* Header */}
          <div className="border-b border-gray-800 bg-gray-900/50">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold text-white">
                    {stockData.name}
                    <span className="text-xl text-gray-400 ml-2">({stockData.ticker})</span>
                  </h1>
                  <div className={`text-2xl font-bold ${
                    stockData.changePercent >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    ${stockData.price}
                    <span className="text-lg ml-2">
                      {stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%
                    </span>
                  </div>
                </div>
                
                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value)}
                    placeholder="Enter ticker..."
                    className="input w-40"
                  />
                  <button type="submit" className="btn-primary px-4">
                    Analyze
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'analysis', label: 'Analysis' },
              { id: 'peers', label: 'Peers' },
              { id: 'news', label: 'News' }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-cyan-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                title={section.label}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8">
            <main className="space-y-12">

              {/* 1. Overview */}
              <section id="overview" className="grid lg:grid-cols-3 gap-8 scroll-mt-24">
                <ErrorBoundary>
                  {/* Left Panel - Scores */}
                  <div className="lg:col-span-1">
                    <div className="card p-6 sticky top-4">
                      <h2 className="text-xl font-bold mb-6">Quality Scores</h2>
                      
                      {/* Score Cards */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="font-medium">Value</span>
                          <span className="text-lg font-bold text-blue-400">
                            {stockData.scores.value}/10
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="font-medium">Growth</span>
                          <span className="text-lg font-bold text-green-400">
                            {stockData.scores.growth}/10
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="font-medium">Profitability</span>
                          <span className="text-lg font-bold text-purple-400">
                            {stockData.scores.profit}/10
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <span className="font-medium">Momentum</span>
                          <span className="text-lg font-bold text-yellow-400">
                            {stockData.scores.momentum}/10
                          </span>
                        </div>
                      </div>

                      {/* Radar Chart */}
                      <div className="h-64">
                        <div ref={radarChartRef} className="w-full h-full"></div>
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>

                <ErrorBoundary>
                  {/* Right Panel - About & Valuation */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* About */}
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-4">About</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {stockData.description}
                      </p>
                      
                      {/* Key Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                          <div className="text-sm text-gray-400">Market Cap</div>
                          <div className="font-bold text-lg">{stockData.marketCap}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                          <div className="text-sm text-gray-400">Forward P/E</div>
                          <div className="font-bold text-lg">{stockData.forwardPE}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                          <div className="text-sm text-gray-400">TTM P/E</div>
                          <div className="font-bold text-lg">{stockData.ttmPE}</div>
                        </div>
                        <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                          <div className="text-sm text-gray-400">Sector</div>
                          <div className="font-bold text-lg">{stockData.sector}</div>
                        </div>
                      </div>
                    </div>

                    {/* Valuation */}
                    <div className="card p-6">
                      <h3 className="text-xl font-bold mb-4">Valuation Analysis</h3>
                      
                      {stockData.eps?.values?.length > 0 ? (
                        <>
                          <div className="h-80 mb-4">
                            <div ref={valuationChartRef} className="w-full h-full"></div>
                          </div>
                          
                          {valuationPosition && (
                            <div className="mt-4">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                valuationPosition === 'undervalued' ? 'bg-green-500/20 text-green-400' :
                                valuationPosition === 'fair' ? 'bg-yellow-500/20 text-yellow-400' :
                                valuationPosition === 'expensive' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {valuationPosition === 'undervalued' ? '📈 Potentially Undervalued' :
                                 valuationPosition === 'fair' ? '⚖️ Fairly Valued' :
                                 valuationPosition === 'expensive' ? '⚠️ Expensive' :
                                 '🔴 Potentially Overvalued'}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-12">
                          <div className="text-yellow-400 text-4xl mb-4">📊</div>
                          <div className="text-xl font-medium mb-3">Valuation Analysis Unavailable</div>
                          <div className="text-gray-400">
                            No EPS estimates available for this ticker.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ErrorBoundary>
              </section>

              {/* 2. Peers & Segments */}
              <section id="peers" className="grid lg:grid-cols-2 gap-8 scroll-mt-24">
                <ErrorBoundary>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-4">Peer Comparison</h3>
                    
                    {stockData?.peers?.length > 0 ? (
                      <>
                        <div className="mb-4">
                          <p className="text-sm text-gray-400">
                            Forward P/E vs Market Cap comparison with sector peers. 
                            Bubble size represents relative market influence.
                          </p>
                        </div>
                        <div ref={peersChartRef} className="h-80"></div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">🏢</div>
                        <div className="text-xl font-medium mb-3">Peer Data Unavailable</div>
                        <div className="text-gray-400">
                          {isDemoMode 
                            ? 'Peer comparison data not available for this ticker. Try major stocks like AAPL, MSFT, or GOOGL.'
                            : 'No peer comparison data available for this ticker'}
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>

                <ErrorBoundary>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-4">Revenue by Segment</h3>
                    
                    {stockData?.segments?.length > 0 ? (
                      <>
                        <div ref={segmentChartRef} className="h-80 mb-4"></div>
                        <div className="space-y-2">
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
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">🥧</div>
                        <div className="text-xl font-medium mb-3">Segment Data Unavailable</div>
                        <div className="text-gray-400">
                          {isDemoMode 
                            ? 'Revenue segment data not available for this ticker. Try major stocks like AAPL, MSFT, or GOOGL.'
                            : 'No revenue segment data available for this ticker'}
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 3. Analysis */}
              <section id="analysis" className="grid lg:grid-cols-2 gap-8 scroll-mt-24">
                <ErrorBoundary>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-6 text-green-400">
                      <div className="flex items-center gap-2">
                        <span>✓</span>
                        <span>Key Strengths</span>
                      </div>
                    </h3>
                    <div className="space-y-4">
                      <ul className="space-y-4">
                        {stockData?.strengths?.length > 0 ? (
                          stockData.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-green-400 mt-1 text-xs">●</span>
                              <span className="leading-relaxed">{strength}</span>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-start gap-3">
                            <span className="text-green-400 mt-1">●</span>
                            <span>Loading fundamental strengths analysis...</span>
                          </li>
                        )}
                      </ul>
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

                <ErrorBoundary>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-6 text-red-400">
                      <div className="flex items-center gap-2">
                        <span>⚠</span>
                        <span>Key Risks</span>
                      </div>
                    </h3>
                    <div className="space-y-4">
                      <ul className="space-y-4">
                        {stockData?.risks?.length > 0 ? (
                          stockData.risks.map((risk, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="text-red-400 mt-1 text-xs">●</span>
                              <span className="leading-relaxed">{risk}</span>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-start gap-3">
                            <span className="text-red-400 mt-1">●</span>
                            <span>Loading investment risks analysis...</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </ErrorBoundary>
              </section>

              {/* 4. Latest Company News - AUTO REFRESHING */}
              <section id="news" className="scroll-mt-24">
                <ErrorBoundary fallback="News section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold">Latest Company News</h2>
                        <p className="text-gray-400 mt-1 text-sm">
                          Real-time news and updates for {stockData?.name || ticker}
                        </p>
                      </div>
                      
                      {/* News Status & Refresh Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${
                            companyNews.length > 0 ? 'bg-green-400' : 'bg-yellow-400'
                          } animate-pulse`}></div>
                          <span className="font-medium text-sm">
                            {companyNews.length > 0 ? '🟢 Live Feed' : '🟡 Loading...'}
                          </span>
                          {newsLastUpdated && (
                            <span className="text-sm opacity-60">
                              • {new Date(newsLastUpdated).toLocaleTimeString()}
                            </span>
                          )}
                        </div>
                        
                        <button
                          onClick={handleManualNewsRefresh}
                          disabled={newsLoading}
                          className="px-3 py-1 text-sm bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {newsLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 animate-spin rounded-full border border-cyan-400 border-t-transparent"></div>
                              Refreshing...
                            </div>
                          ) : (
                            '🔄 Refresh'
                          )}
                        </button>
                      </div>
                    </div>

                    {newsError && (
                      <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
                        <div className="flex items-center gap-2 text-red-400">
                          <span>⚠️</span>
                          <span className="font-medium">News Error</span>
                        </div>
                        <div className="text-sm text-red-300 mt-1">{newsError}</div>
                      </div>
                    )}

                    {/* News Articles */}
                    {companyNews.length > 0 ? (
                      <div className="space-y-4">
                        {companyNews.map((article, index) => (
                          <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/30 hover:border-gray-600/50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                {/* Article Header */}
                                <div className="flex items-center gap-3 mb-2">
                                  <span className="text-sm font-medium text-blue-400">
                                    {article.source}
                                  </span>
                                  <span className="text-sm text-gray-400">
                                    {article.datetime}
                                  </span>
                                </div>
                                
                                {/* Article Content */}
                                <h3 className="font-semibold text-white mb-2 leading-snug">
                                  {article.url && article.url !== '#' ? (
                                    <a
                                      href={article.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-blue-400 transition-colors"
                                    >
                                      {article.headline}
                                    </a>
                                  ) : (
                                    article.headline
                                  )}
                                </h3>
                                
                                {article.summary && (
                                  <p className="text-sm text-gray-400 leading-relaxed">
                                    {article.summary}
                                  </p>
                                )}
                              </div>
                              
                              {/* External Link Icon */}
                              {article.url && article.url !== '#' && (
                                <a
                                  href={article.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0 p-2 text-gray-400 hover:text-blue-400 transition-colors"
                                  title="Read full article"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Auto-refresh Info */}
                        <div className="mt-4 p-3 bg-blue-500/5 rounded-lg border border-blue-400/10">
                          <div className="flex items-center gap-2 text-xs text-blue-300/70">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span>
                              📡 <span className="text-blue-400 font-medium">Live News Feed:</span> Company-specific news 
                              updates automatically every 5 minutes from Finnhub and Google News.
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">📰</div>
                        <div className="text-xl font-medium mb-3">
                          {newsLoading ? 'Loading Company News...' : 'No Recent News Available'}
                        </div>
                        <div className="text-gray-400">
                          {newsLoading 
                            ? `Fetching latest news for ${stockData?.name || ticker}...`
                            : `No recent news found for ${stockData?.name || ticker}. News updates automatically every 5 minutes.`
                          }
                        </div>
                        {!newsLoading && (
                          <button
                            onClick={handleManualNewsRefresh}
                            className="mt-4 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg transition-colors"
                          >
                            🔄 Try Refresh
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

            </main>
          </div>

          {/* Demo Mode Footer */}
          {isDemoMode && (
            <div className="mt-12">
              <div className="card p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-400/20">
                <div className="text-center">
                  <div className="text-blue-400 font-semibold mb-2">🚀 Ready to Go Live?</div>
                  <div className="text-sm text-gray-400 mb-4">
                    This demo showcases institutional-grade stock analysis with {availableTickers.length || '115'} stocks including Hong Kong listings. 
                    When you're ready to launch with real-time data, simply switch to live API mode and all features will work with current market data.
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 text-xs">
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Forward EPS Estimates</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Dynamic P/E Bands</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Peer Comparisons</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Quality Scoring</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Real-time News</span>
                    <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Bloomberg Data</span>
                    <span className="chip px-3 py-1 bg-purple-500/20 text-purple-400">✓ EPS Growth Analysis</span>
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
