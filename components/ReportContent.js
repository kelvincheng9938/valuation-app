// components/ReportContent.js
'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { fetchStockData } from '../lib/api'
import { getStockCategories, getDemoTickers } from '../lib/demoData'
import Navigation from './Navigation'
import ErrorBoundary from './ErrorBoundary'

// Dynamic imports for chart components
const ValuationChart = dynamic(() => import('./charts/ValuationChart'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center"><div className="loading"></div></div>
})

const RadarChart = dynamic(() => import('./charts/RadarChart'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center"><div className="loading"></div></div>
})

const PeersChart = dynamic(() => import('./charts/PeersChart'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center"><div className="loading"></div></div>
})

const SegmentChart = dynamic(() => import('./charts/SegmentChart'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center"><div className="loading"></div></div>
})

export default function ReportContent({ initialTicker = 'AAPL' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [ticker, setTicker] = useState(initialTicker)
  const [inputTicker, setInputTicker] = useState('')
  const [stockData, setStockData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Get available categories and tickers
  const stockCategories = getStockCategories()
  const availableTickers = getDemoTickers()

  // Initialize chart functions
  const initCharts = async (data) => {
    if (!data || typeof window === 'undefined') return
    
    const newOption = {
      // Chart options for updates
      notMerge: true
    }
    
    if (window.valuationChart) {
      window.valuationChart.setOption(newOption, { notMerge: true })
    }
    
    if (window.radarChart) {
      window.radarChart.setOption(newOption, { notMerge: true })
    }
    
    if (window.peersChart) {
      window.peersChart.setOption(newOption, { notMerge: true })
    }
    
    if (window.segmentChart) {
      window.segmentChart.setOption(newOption, { notMerge: true })
    }
  }

  useEffect(() => {
    const tickerParam = searchParams.get('ticker')
    if (tickerParam && tickerParam !== ticker) {
      loadStockData(tickerParam)
    } else if (!stockData) {
      loadStockData(ticker)
    }
  }, [searchParams])

  const loadStockData = async (symbol) => {
    console.log('[ReportContent] Loading data for:', symbol)
    setLoading(true)
    setError(null)
    
    try {
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
      router.push(`/report?ticker=${inputTicker.trim().toUpperCase()}`)
      setInputTicker('')
    }
  }

  const handleStockClick = (tickerSymbol) => {
    console.log('[ReportContent] Stock clicked:', tickerSymbol)
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

  // Filter stocks by category and search
  const getFilteredStocks = () => {
    let filtered = availableTickers
    
    // Filter by category
    if (selectedCategory !== 'all') {
      const category = stockCategories[selectedCategory]
      if (category) {
        filtered = filtered.filter(t => category.tickers.includes(t))
      }
    }
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }

  const filteredStocks = getFilteredStocks()

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading"></div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="card p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Error Loading Data</h2>
              <p className="ghost mb-6">{error}</p>
              <button 
                onClick={() => router.push('/')}
                className="btn-primary px-6 py-3"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <ErrorBoundary fallback="Something went wrong. Please refresh the page.">
        <div className="max-w-7xl mx-auto px-4 py-6" key={updateKey}>
          
          {/* Demo Mode Header Banner */}
          {isDemoMode && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div>
                      <div className="text-blue-400 font-medium text-sm">Professional Demo Mode</div>
                      <div className="text-xs text-blue-300/60">
                        115 stocks with real Bloomberg Terminal data
                      </div>
                    </div>
                  </div>
                  <div className="chip px-2 py-1 bg-blue-500/10 text-xs">
                    <span className="text-blue-400">Bloomberg Data</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COMPACT MODERN SEARCH INTERFACE */}
          <div className="mb-6">
            <div className="card p-4">
              {/* Search Input */}
              <div className="mb-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder="Enter ticker (e.g., AAPL, ISRG, 700)"
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 text-base"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary px-6 py-2.5 rounded-lg font-medium"
                    disabled={loading}
                  >
                    Analyze
                  </button>
                </form>
              </div>

              {/* COMPACT STOCK SELECTOR */}
              <div className="space-y-3">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === 'all' 
                        ? 'bg-cyan-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All ({availableTickers.length})
                  </button>
                  {Object.entries(stockCategories).map(([key, category]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                        selectedCategory === key 
                          ? 'text-white' 
                          : 'text-gray-600 hover:opacity-80'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === key ? category.color : category.color + '20',
                        color: selectedCategory === key ? 'white' : category.color
                      }}
                    >
                      {category.label} ({category.tickers.length})
                    </button>
                  ))}
                </div>

                {/* Quick Search */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Quick search..."
                    className="flex-1 px-3 py-1.5 border border-gray-200 rounded-md text-sm placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="text-xs text-gray-500">{filteredStocks.length} stocks</span>
                </div>

                {/* Stock Grid - Compact */}
                <div className="max-h-32 overflow-y-auto">
                  <div className="grid grid-cols-8 md:grid-cols-12 gap-1.5">
                    {filteredStocks.map(tickerSymbol => {
                      const category = Object.values(stockCategories).find(cat => 
                        cat.tickers.includes(tickerSymbol)
                      )
                      return (
                        <button
                          key={tickerSymbol}
                          onClick={() => handleStockClick(tickerSymbol)}
                          className={`px-2 py-1.5 rounded text-xs font-medium transition-all hover:transform hover:scale-105 ${
                            ticker === tickerSymbol
                              ? 'ring-2 ring-cyan-400 shadow-md' 
                              : 'hover:shadow-sm'
                          }`}
                          style={{ 
                            backgroundColor: ticker === tickerSymbol 
                              ? (category?.color || '#3b82f6')
                              : (category?.color || '#3b82f6') + '15',
                            color: ticker === tickerSymbol 
                              ? 'white' 
                              : category?.color || '#3b82f6',
                            borderColor: category?.color || '#3b82f6'
                          }}
                          title={tickerSymbol}
                        >
                          {tickerSymbol}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Popular Tickers - Single Row */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Popular:</span>
                    <div className="flex gap-1 overflow-x-auto">
                      {['AAPL', 'NVDA', 'MSFT', 'GOOGL', 'TSLA', 'ISRG', '700'].map(popularTicker => (
                        <button
                          key={popularTicker}
                          onClick={() => handleStockClick(popularTicker)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            ticker === popularTicker
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 hover:from-purple-500/20 hover:to-pink-500/20'
                          }`}
                        >
                          {popularTicker}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Info Header - Existing code continues... */}
          {stockData && (
            <>
              {/* Quick Navigation */}
              <div className="mb-6 sticky top-16 z-20">
                <div className="card p-3 backdrop-blur-md bg-opacity-95">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'overview', label: 'Overview', icon: '📊' },
                      { id: 'valuation', label: 'Valuation', icon: '💰' },
                      { id: 'quality', label: 'Quality', icon: '⭐' },
                      { id: 'peers', label: 'Peers', icon: '🏢' },
                      { id: 'segments', label: 'Segments', icon: '📈' },
                      { id: 'analysis', label: 'Analysis', icon: '🔍' },
                      { id: 'news', label: 'News', icon: '📰' }
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                      >
                        <span className="mr-1">{section.icon}</span>
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <main className="grid gap-6">
                
                {/* Stock Header */}
                <section id="overview" className="scroll-mt-24">
                  <div className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{stockData?.ticker}</h1>
                        <p className="text-lg ghost">{stockData?.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">
                          ${stockData?.price?.toFixed(2) || '0.00'}
                        </div>
                        <div className={`text-lg font-medium ${stockData?.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stockData?.change >= 0 ? '+' : ''}{stockData?.change?.toFixed(2)} 
                          ({stockData?.changePercent >= 0 ? '+' : ''}{stockData?.changePercent?.toFixed(2)}%)
                        </div>
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

                {/* Rest of the sections remain the same... */}
                {/* Include all other sections like Valuation Analysis, Quality Scores, etc. */}
                
              </main>
            </>
          )}
        </div>
      </ErrorBoundary>
    </>
  )
}
