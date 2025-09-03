// components/ReportContent.js - Professional SimplyWall.St Style Interface
'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { initCharts } from './ChartComponents'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
import { ErrorBoundary } from './ErrorBoundary'

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('AAPL')
  const [inputTicker, setInputTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)
  const [activeSection, setActiveSection] = useState('overview')
  const [showAllTickers, setShowAllTickers] = useState(false)

  const availableTickers = getAvailableTickers()

  // Categorized tickers for better UX
  const tickerCategories = {
    'Tech Giants': ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA'],
    'Growth Tech': ['CRM', 'NOW', 'NFLX', 'TSLA', 'AMD', 'QCOM'],
    'Healthcare': ['LLY', 'UNH', 'ISRG'],
    'Financials': ['BRK.B', 'BAC', 'JPM'],
    'Consumer': ['COST', 'HD', 'DIS', 'NKE', 'MCD', 'SBUX', 'WMT'],
    'HK Stocks': ['700 HK', '3690 HK', '1810 HK', '9988 HK'],
    'Others': ['INTC', 'AMAT', 'ASML', 'FDX', 'CAT', 'LULU', 'KO', 'ABNB']
  }

  useEffect(() => {
    loadStockData('AAPL')
  }, [])

  const loadStockData = async (symbol) => {
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Loading data for ${symbol}`)
      const data = await fetchStockData(symbol.toUpperCase())
      
      if (!data) {
        throw new Error('No data received for ticker')
      }
      
      setStockData(data)
      setTicker(symbol.toUpperCase())
      setUpdateKey(prev => prev + 1)
      setActiveSection('overview')
      
      // Initialize charts
      setTimeout(async () => {
        try {
          await initCharts(data)
        } catch (chartError) {
          console.error('Chart initialization error:', chartError)
        }
      }, 500)
      
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
      loadStockData(inputTicker.trim())
      setInputTicker('')
    }
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isDemoMode = stockData?.dataQuality?.quote === 'demo'

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-lg">Loading {ticker} analysis...</div>
            <div className="mt-4">
              <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
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
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-red-400 text-4xl mb-4">⚠️</div>
            <div className="text-xl font-bold mb-4">Unable to Load Analysis</div>
            <div className="text-sm ghost mb-6">{error}</div>
            <button
              onClick={() => loadStockData(ticker)}
              className="btn-primary px-6 py-2 rounded-lg"
            >
              Retry {ticker}
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800" key={updateKey}>
        
        {/* Demo Mode Banner */}
        {isDemoMode && (
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-blue-500/30">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300 text-sm font-medium">
                  🎯 Professional Demo Mode - Comprehensive analysis with updated January 2025 data
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Search Section */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600">
          <div className="max-w-7xl mx-auto px-4 py-6">
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
              <input
                type="text"
                value={inputTicker}
                onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                placeholder="Enter ticker symbol (e.g. AAPL, MSFT, TSLA...)"
                className="flex-1 px-4 py-3 bg-gray-900 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors text-lg"
              />
              <button 
                type="submit" 
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                Analyze
              </button>
            </form>

            {/* Categorized Tickers */}
            <div className="space-y-4">
              {Object.entries(tickerCategories).slice(0, showAllTickers ? undefined : 4).map(([category, tickers]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">{category}:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tickers.map(t => (
                      <button
                        key={t}
                        onClick={() => loadStockData(t)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                          ticker === t.replace(' HK', '') 
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md' 
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Show More/Less Button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowAllTickers(!showAllTickers)}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                >
                  {showAllTickers ? '↑ Show Less Categories' : '↓ Show More Categories'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Sidebar - Table of Contents (SimplyWall.St Style) */}
            <div className="col-span-12 lg:col-span-3">
              <div className="sticky top-24 space-y-2">
                <div className="card p-4">
                  <h3 className="text-lg font-bold mb-4 text-white">Stock Analysis</h3>
                  <nav className="space-y-1">
                    {[
                      { id: 'overview', label: '1. Company Overview', icon: '🏢' },
                      { id: 'valuation', label: '2. Valuation', icon: '💰' },
                      { id: 'quality', label: '3. Quality Analysis', icon: '⭐' },
                      { id: 'peers', label: '4. Peer Comparison', icon: '🏢' },
                      { id: 'investment', label: '5. Investment Analysis', icon: '📊' },
                      { id: 'news', label: '6. Latest News', icon: '📰' }
                    ].map(section => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 ${
                          activeSection === section.id
                            ? 'bg-cyan-500/20 text-cyan-400 border-l-2 border-cyan-400'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        <span className="text-base">{section.icon}</span>
                        <span className="font-medium">{section.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Demo Info Panel */}
                {isDemoMode && (
                  <div className="card p-4 bg-blue-500/5 border-blue-400/20">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-400 text-sm">📊</span>
                      <div>
                        <div className="text-blue-400 font-medium text-sm mb-1">Bloomberg Data</div>
                        <div className="text-xs text-blue-300/70 leading-relaxed">
                          Professional analysis with verified Bloomberg Terminal data including HK stocks.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-12 lg:col-span-9 space-y-6">
              
              {/* Stock Header */}
              <div id="overview" className="card p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {stockData?.name || 'Loading...'}
                      <span className="text-lg text-gray-400 ml-2">({ticker})</span>
                      {isDemoMode && (
                        <span className="ml-3 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          DEMO
                        </span>
                      )}
                    </h1>
                    <div className="text-gray-400 text-sm">
                      Updated: {stockData?.lastUpdated ? new Date(stockData.lastUpdated).toLocaleString() : 'Just now'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">
                      ${stockData?.price?.toFixed(2) || '0.00'}
                    </div>
                    {stockData?.changePercent && (
                      <div className={`text-lg font-medium ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} 
                        ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Description & Key Stats */}
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-3">About the Company</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {stockData?.description || 'Loading company information...'}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white mb-3">Key Stats</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-700/30 p-3 rounded-lg">
                        <div className="text-xs text-gray-400">Market Cap</div>
                        <div className="text-lg font-bold text-white">{stockData?.marketCap || 'N/A'}</div>
                      </div>
                      <div className="bg-gray-700/30 p-3 rounded-lg">
                        <div className="text-xs text-gray-400">Forward P/E</div>
                        <div className="text-lg font-bold text-white">{stockData?.forwardPE || 'N/A'}</div>
                      </div>
                      <div className="bg-gray-700/30 p-3 rounded-lg">
                        <div className="text-xs text-gray-400">TTM P/E</div>
                        <div className="text-lg font-bold text-white">{stockData?.ttmPE || 'N/A'}</div>
                      </div>
                      <div className="bg-gray-700/30 p-3 rounded-lg">
                        <div className="text-xs text-gray-400">Sector</div>
                        <div className="text-lg font-bold text-white">{stockData?.sector || 'Unknown'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Valuation Section */}
              <div id="valuation" className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Valuation Analysis</h2>
                
                {stockData?.eps?.values?.length > 0 && stockData?.peBands ? (
                  <>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
                        <span className="text-gray-400 text-sm">EPS Estimates: </span>
                        <span className="text-white font-medium">
                          {stockData.eps.values.map(v => v.toFixed(2)).join(' / ')}
                        </span>
                      </div>
                      <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
                        <span className="text-gray-400 text-sm">P/E Bands: </span>
                        <span className="text-white font-medium">
                          {stockData.peBands.low.toFixed(1)}× / {stockData.peBands.mid.toFixed(1)}× / {stockData.peBands.high.toFixed(1)}×
                        </span>
                      </div>
                      <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
                        <span className="text-gray-400 text-sm">Current: </span>
                        <span className="text-white font-medium">${stockData.price?.toFixed(2)}</span>
                      </div>
                    </div>
                    <div id="valuationChart" className="h-96 w-full"></div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-yellow-400 text-3xl mb-3">📊</div>
                    <div className="text-xl font-medium text-white mb-2">Valuation Analysis Unavailable</div>
                    <div className="text-gray-400">
                      No forward EPS estimates available for this ticker
                    </div>
                  </div>
                )}
              </div>

              {/* Quality Analysis */}
              <div id="quality" className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">Quality Scores</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 p-4 rounded-xl border border-orange-500/30">
                      <div className="text-orange-400 text-sm font-medium">Value Score</div>
                      <div className="text-3xl font-bold text-white">{stockData?.scores?.value?.toFixed(1) || '0.0'}</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 p-4 rounded-xl border border-blue-500/30">
                      <div className="text-blue-400 text-sm font-medium">Growth Score</div>
                      <div className="text-3xl font-bold text-white">{stockData?.scores?.growth?.toFixed(1) || '0.0'}</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 p-4 rounded-xl border border-green-500/30">
                      <div className="text-green-400 text-sm font-medium">Profitability</div>
                      <div className="text-3xl font-bold text-white">{stockData?.scores?.profit?.toFixed(1) || '0.0'}</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 p-4 rounded-xl border border-purple-500/30">
                      <div className="text-purple-400 text-sm font-medium">Momentum</div>
                      <div className="text-3xl font-bold text-white">{stockData?.scores?.momentum?.toFixed(1) || '0.0'}</div>
                    </div>
                  </div>
                  <div id="band-spark" className="h-16 w-full"></div>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quality Radar</h3>
                  <div id="qualityRadar" className="h-64 w-full"></div>
                </div>
              </div>

              {/* Peers and Segments */}
              <div id="peers" className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Peers Comparison</h2>
                    <button id="toggleLabelsBtn" className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-xs text-gray-300">
                      Labels: ON
                    </button>
                  </div>
                  
                  {stockData?.peers?.length > 0 ? (
                    <div id="peersChart" className="h-80 w-full"></div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-yellow-400 text-2xl mb-2">🏢</div>
                      <div className="text-gray-400">No peer comparison data available</div>
                    </div>
                  )}
                </div>
                
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Revenue by Segment</h3>
                  
                  {stockData?.segments?.length > 0 ? (
                    <div id="segmentPie" className="h-80 w-full"></div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-yellow-400 text-xl mb-2">📈</div>
                      <div className="text-gray-400 text-sm">No segment data available</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Investment Analysis */}
              <div id="investment" className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Investment Analysis</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-green-400 text-xl">✓</span>
                      <h3 className="text-lg font-semibold text-green-400">Investment Strengths</h3>
                    </div>
                    <ul className="space-y-3">
                      {stockData?.strengths?.map((strength, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-green-400 mt-2 text-xs">●</span>
                          <span className="text-gray-300 leading-relaxed">{strength}</span>
                        </li>
                      )) || (
                        <li className="text-gray-400">Loading investment strengths...</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-red-400 text-xl">⚠</span>
                      <h3 className="text-lg font-semibold text-red-400">Investment Risks</h3>
                    </div>
                    <ul className="space-y-3">
                      {stockData?.risks?.map((risk, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-red-400 mt-2 text-xs">●</span>
                          <span className="text-gray-300 leading-relaxed">{risk}</span>
                        </li>
                      )) || (
                        <li className="text-gray-400">Loading investment risks...</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* News Section */}
              <div id="news" className="card p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Latest Company News</h2>
                
                {stockData?.news?.length > 0 ? (
                  <div className="space-y-4">
                    {stockData.news.slice(0, 6).map((item, i) => (
                      <article key={i} className="border-b border-gray-700 pb-4 last:border-b-0">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block hover:bg-gray-700/30 -mx-4 px-4 py-3 rounded-lg transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-cyan-400 text-sm font-medium">{item.source}</span>
                            <span className="text-gray-400 text-sm">{item.datetime}</span>
                          </div>
                          <h3 className="text-white group-hover:text-cyan-400 font-semibold mb-2 transition-colors">
                            {item.headline}
                          </h3>
                          {item.summary && item.summary !== item.headline && (
                            <p className="text-gray-400 text-sm leading-relaxed">{item.summary}</p>
                          )}
                        </a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-yellow-400 text-3xl mb-3">📰</div>
                    <div className="text-xl font-medium text-white mb-2">No Recent News</div>
                    <div className="text-gray-400">No news articles available for {ticker}</div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
