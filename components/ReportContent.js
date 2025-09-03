// components/ReportContent.js - SimplyWall.St Style Layout with Better UI
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

  // Organize tickers by categories
  const tickerCategories = {
    'Tech Giants': ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA'],
    'Healthcare': ['LLY', 'UNH', 'ISRG'],
    'Financials': ['BAC', 'JPM', 'BRK.B'],
    'Consumer': ['COST', 'HD', 'DIS', 'NKE', 'SBUX', 'LULU', 'KO', 'MCD'],
    'Industrials': ['CAT', 'FDX'],
    'HK Stocks': ['700 HK Equity', '3690 HK Equity', '1810 HK Equity', '9988 HK Equity'],
    'Other': ['WMT', 'ABNB', 'AMD', 'QCOM', 'INTC', 'AMAT', 'ASML', 'CRM', 'NOW', 'NFLX', 'TSLA', 'UBER', 'COIN']
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
      
      // Initialize charts with delay
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
      loadStockData(inputTicker.trim())
      setInputTicker('')
    }
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  if (!stockData) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-lg">No data loaded</div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <ErrorBoundary fallback="Report failed to load. Please refresh the page.">
        <div className="max-w-7xl mx-auto px-4 py-5" key={updateKey}>
          
          {/* Demo Mode Header */}
          {isDemoMode && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-blue-400 font-semibold">🎯 Professional Demo Mode</div>
                    <div className="text-sm text-blue-300/80">
                      Comprehensive stock analysis with updated January 2025 financial data
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Colorful Search Bar */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-400/20 p-6">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder="🔍 Enter ticker symbol (e.g., AAPL, MSFT, GOOGL...)"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:border-cyan-400 focus:outline-none focus:bg-white/15 transition-all"
                  />
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all"
                  >
                    Analyze
                  </button>
                </div>
              </form>
              
              {/* Organized Stock Categories */}
              <div className="space-y-4">
                {Object.entries(tickerCategories).slice(0, showAllTickers ? undefined : 4).map(([category, tickers]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-blue-300">{category}</div>
                      <div className="h-px bg-blue-400/20 flex-1"></div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tickers.filter(t => availableTickers.includes(t)).map(t => (
                        <button
                          key={t}
                          onClick={() => loadStockData(t)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                            ticker === t 
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                              : 'bg-white/10 text-blue-100 hover:bg-white/20 hover:text-white'
                          }`}
                        >
                          {t.replace(' HK Equity', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center pt-2">
                  <button
                    onClick={() => setShowAllTickers(!showAllTickers)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-blue-200 hover:text-white transition-all"
                  >
                    {showAllTickers ? '🔼 Show Less' : '🔽 Show More Categories'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Header */}
          <header className="mb-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {stockData.name} ({ticker})
                  </h1>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-blue-400">{stockData.sector}</span>
                    <span className="text-gray-400">Market Cap: {stockData.marketCap}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-1">
                    ${stockData.price?.toFixed(2)}
                  </div>
                  <div className={`text-lg font-semibold ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} 
                    ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent?.toFixed(2)}%)
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Layout - SimplyWall.St Style */}
          <div className="grid grid-cols-12 gap-6">
            
            {/* Left Sidebar - Table of Contents */}
            <aside className="col-span-12 lg:col-span-3">
              <div className="card p-4 sticky top-20">
                <div className="text-sm font-medium text-blue-300 mb-4">Stock Analysis</div>
                <nav className="space-y-2">
                  <button
                    onClick={() => scrollToSection('overview')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === 'overview' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    1. Company Overview
                  </button>
                  <button
                    onClick={() => scrollToSection('valuation')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === 'valuation' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    2. Valuation
                  </button>
                  <button
                    onClick={() => scrollToSection('quality')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === 'quality' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    3. Quality Analysis
                  </button>
                  <button
                    onClick={() => scrollToSection('peers')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === 'peers' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    4. Peer Comparison
                  </button>
                  <button
                    onClick={() => scrollToSection('analysis')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === 'analysis' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    5. Investment Analysis
                  </button>
                  <button
                    onClick={() => scrollToSection('news')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      activeSection === 'news' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    6. Latest News
                  </button>
                </nav>

                {/* Data Sources */}
                {isDemoMode && (
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="text-xs font-medium text-blue-300 mb-2">📊 Bloomberg Data</div>
                    <div className="text-xs text-blue-200/70">
                      Professional analysis with verified
                      Bloomberg Terminal data including HK
                      stocks.
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* Right Content */}
            <div className="col-span-12 lg:col-span-9 space-y-6">
              
              {/* Company Overview Section */}
              <section id="overview" className="scroll-mt-20">
                <div className="card p-6">
                  <h2 className="text-xl font-bold mb-4 text-white">Company Overview</h2>
                  
                  {/* Quality Scores Row */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-1">
                        {stockData.scores?.value?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm text-gray-400">Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-1">
                        {stockData.scores?.growth?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm text-gray-400">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-1">
                        {stockData.scores?.profit?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm text-gray-400">Profit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">
                        {stockData.scores?.momentum?.toFixed(1) || '0.0'}
                      </div>
                      <div className="text-sm text-gray-400">Momentum</div>
                    </div>
                  </div>

                  {/* Valuation Bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span>Undervalued</span>
                      <span>Fair Value</span>
                      <span>Overvalued</span>
                    </div>
                    <div className="relative h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full">
                      <div className="absolute top-0 left-1/3 w-1 h-3 bg-white rounded-full shadow-lg"></div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xs text-gray-400">Current Price</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">{stockData.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">Market Cap</div>
                      <div className="text-lg font-semibold text-white">{stockData.marketCap}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">Forward P/E</div>
                      <div className="text-lg font-semibold text-white">{stockData.forwardPE}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">TTM P/E</div>
                      <div className="text-lg font-semibold text-white">{stockData.ttmPE}</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-xs text-gray-400 mb-1">Sector</div>
                      <div className="text-lg font-semibold text-white">{stockData.sector}</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Valuation Section */}
              <section id="valuation" className="scroll-mt-20">
                <div className="card p-6">
                  <h2 className="text-xl font-bold mb-4 text-white">Valuation Analysis</h2>
                  
                  {stockData.eps?.values?.length > 0 && stockData.peBands ? (
                    <>
                      <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          EPS: {stockData.eps.values.map(v => v.toFixed(2)).join(' / ')}
                        </span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          P/E Bands: {stockData.peBands.low.toFixed(1)}× / {stockData.peBands.mid.toFixed(1)}× / {stockData.peBands.high.toFixed(1)}×
                        </span>
                        <span className="bg-white/10 px-3 py-1 rounded-full">
                          Current Price: ${stockData.price?.toFixed(2)}
                        </span>
                      </div>
                      <div id="valuationChart" className="chart-lg"></div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">📊</div>
                      <div className="text-lg font-medium text-gray-300 mb-2">Valuation Analysis Unavailable</div>
                      <div className="text-sm text-gray-400">No forward EPS estimates available from analysts</div>
                    </div>
                  )}
                </div>
              </section>

              {/* Quality Analysis Section */}
              <section id="quality" className="scroll-mt-20">
                <div className="card p-6">
                  <h2 className="text-xl font-bold mb-4 text-white">Quality Analysis</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3 text-gray-300">Quality Radar</h3>
                      <div id="qualityRadar" className="chart"></div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3 text-gray-300">Revenue by Segment</h3>
                      {stockData.segments?.length > 0 ? (
                        <div id="segmentPie" className="chart"></div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-2xl mb-2">📈</div>
                          <div className="text-sm text-gray-400">No segment data available</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Peer Comparison Section */}
              <section id="peers" className="scroll-mt-20">
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Peer Comparison</h2>
                    <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                  </div>
                  
                  {stockData.peers?.length > 0 ? (
                    <div id="peersChart" className="chart"></div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">🏢</div>
                      <div className="text-lg font-medium text-gray-300 mb-2">No Peer Data Available</div>
                      <div className="text-sm text-gray-400">This ticker may have limited industry coverage</div>
                    </div>
                  )}
                </div>
              </section>

              {/* Investment Analysis Section */}
              <section id="analysis" className="scroll-mt-20">
                <div className="card p-6">
                  <h2 className="text-xl font-bold mb-6 text-white">Investment Analysis</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-medium mb-4 text-green-400 flex items-center gap-2">
                        <span>✓</span> Key Investment Strengths
                      </h3>
                      <ul className="space-y-3">
                        {stockData.strengths?.map((strength, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-green-400 mt-1 text-sm">●</span>
                            <span className="text-gray-300 text-sm leading-relaxed">{strength}</span>
                          </li>
                        )) || (
                          <li className="text-gray-400">Loading strengths analysis...</li>
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-4 text-red-400 flex items-center gap-2">
                        <span>⚠</span> Key Investment Risks
                      </h3>
                      <ul className="space-y-3">
                        {stockData.risks?.map((risk, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-red-400 mt-1 text-sm">●</span>
                            <span className="text-gray-300 text-sm leading-relaxed">{risk}</span>
                          </li>
                        )) || (
                          <li className="text-gray-400">Loading risks analysis...</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* News Section */}
              <section id="news" className="scroll-mt-20">
                <div className="card p-6">
                  <h2 className="text-xl font-bold mb-6 text-white">Latest Company News</h2>
                  
                  {stockData.news?.length > 0 ? (
                    <div className="space-y-4">
                      {stockData.news.slice(0, 6).map((item, i) => (
                        <div key={i} className="border-b border-white/10 pb-4 last:border-b-0">
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block hover:bg-white/5 -mx-4 px-4 py-3 rounded-lg transition-all group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-blue-400 font-medium">{item.source}</span>
                              <span className="text-xs text-gray-400">{item.datetime}</span>
                            </div>
                            <h3 className="font-medium text-white group-hover:text-cyan-400 transition-colors mb-2">
                              {item.headline}
                            </h3>
                            {item.summary && item.summary !== item.headline && (
                              <p className="text-sm text-gray-400 leading-relaxed">{item.summary}</p>
                            )}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">📰</div>
                      <div className="text-lg font-medium text-gray-300 mb-2">No Recent News Available</div>
                      <div className="text-sm text-gray-400">News feed will be available soon</div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    </>
  )
}
