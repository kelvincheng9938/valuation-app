// components/ReportContent.js - Fixed Chart Initialization
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

  const availableTickers = getAvailableTickers()

  useEffect(() => {
    loadStockData('AAPL')
  }, [])

  const loadStockData = async (symbol) => {
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Loading data for ${symbol}`)
      const data = await fetchStockData(symbol.toUpperCase())
      
      // Validate required data fields
      if (!data) {
        throw new Error('No data received for ticker')
      }
      
      console.log('Loaded stock data:', data)
      setStockData(data)
      setTicker(symbol.toUpperCase())
      setUpdateKey(prev => prev + 1)
      
      // Initialize charts with delay to ensure DOM is ready
      setTimeout(async () => {
        try {
          console.log('Initializing charts with data:', {
            hasEps: !!data.eps,
            hasPeBands: !!data.peBands, 
            hasScores: !!data.scores,
            hasPeers: !!data.peers?.length,
            hasSegments: !!data.segments?.length
          })
          await initCharts(data)
          console.log('Charts initialized successfully')
        } catch (chartError) {
          console.error('Chart initialization error:', chartError)
        }
      }, 500) // Increased delay
      
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

          {/* Ticker Search */}
          <div className="mb-6">
            <div className="card p-4">
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={inputTicker}
                  onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                  placeholder="Enter ticker (e.g., AAPL)"
                  className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                />
                <button type="submit" className="btn-primary px-4 py-2 rounded-lg">
                  Analyze
                </button>
              </form>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-sm ghost">Quick:</span>
                {availableTickers.slice(0, 6).map(t => (
                  <button
                    key={t}
                    onClick={() => loadStockData(t)}
                    className={`chip px-2 py-1 text-xs ${
                      ticker === t ? 'bg-cyan-400/20 text-cyan-400' : 'hover:bg-white/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stock Header */}
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">{stockData.name} ({ticker})</h1>
              <div className="text-right">
                <div className="text-lg font-semibold">${stockData.price?.toFixed(2)}</div>
                <div className={`text-sm ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} 
                  ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent?.toFixed(2)}%)
                </div>
              </div>
            </div>
          </header>

          {/* Main Content Grid */}
          <section className="grid grid-cols-12 gap-4">
            
            {/* Left Sidebar - Quality Scores */}
            <aside className="col-span-12 lg:col-span-3 space-y-3">
              <div className="card kpi p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm ghost">Value Score</div>
                  <div className="text-lg font-semibold">{stockData.scores?.value?.toFixed(1) || '0.0'}</div>
                </div>
                <div id="band-spark" className="mt-3 h-10 w-full"></div>
              </div>
              
              <div className="card kpi p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm ghost">Growth Score</div>
                  <div className="text-lg font-semibold">{stockData.scores?.growth?.toFixed(1) || '0.0'}</div>
                </div>
              </div>
              
              <div className="card kpi p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm ghost">Profitability</div>
                  <div className="text-lg font-semibold">{stockData.scores?.profit?.toFixed(1) || '0.0'}</div>
                </div>
              </div>
              
              <div className="card kpi p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm ghost">Momentum</div>
                  <div className="text-lg font-semibold">{stockData.scores?.momentum?.toFixed(1) || '0.0'}</div>
                </div>
              </div>
              
              <div className="card p-4">
                <div className="font-medium mb-2">Quality Radar</div>
                <div id="qualityRadar" className="chart"></div>
              </div>
            </aside>

            {/* Right Content */}
            <div className="col-span-12 lg:col-span-9 space-y-4">
              
              {/* Company Overview */}
              <div className="card p-4">
                <div className="font-medium mb-2">About the Company</div>
                <p className="text-sm mt-2 leading-relaxed">{stockData.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                  <div className="chip px-2 py-2 text-sm">
                    <div className="ghost text-xs">Market Cap</div>
                    <div className="font-medium">{stockData.marketCap}</div>
                  </div>
                  <div className="chip px-2 py-2 text-sm">
                    <div className="ghost text-xs">Forward P/E</div>
                    <div className="font-medium">{stockData.forwardPE}</div>
                  </div>
                  <div className="chip px-2 py-2 text-sm">
                    <div className="ghost text-xs">TTM P/E</div>
                    <div className="font-medium">{stockData.ttmPE}</div>
                  </div>
                  <div className="chip px-2 py-2 text-sm">
                    <div className="ghost text-xs">Sector</div>
                    <div className="font-medium">{stockData.sector}</div>
                  </div>
                </div>
              </div>

              {/* Valuation Analysis */}
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Valuation Analysis</div>
                  <div className="text-sm ghost">Current Price: ${stockData.price?.toFixed(2)}</div>
                </div>
                
                {stockData.eps?.values?.length > 0 && stockData.peBands ? (
                  <>
                    <div className="flex items-center gap-2 text-xs mb-2">
                      <span className="chip px-2 py-1">
                        EPS: {stockData.eps.values.map(v => v.toFixed(2)).join(' / ')}
                      </span>
                      <span className="chip px-2 py-1">
                        P/E Bands: {stockData.peBands.low.toFixed(1)}× / {stockData.peBands.mid.toFixed(1)}× / {stockData.peBands.high.toFixed(1)}×
                      </span>
                    </div>
                    <div id="valuationChart" className="chart-lg"></div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-yellow-400 mb-2">📊</div>
                    <div className="text-sm ghost">Valuation data not available</div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Second Row - Peers and Segments */}
          <section className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 lg:col-span-8">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Peers – Forward P/E vs Market Cap</div>
                  <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                </div>
                
                {stockData.peers?.length > 0 ? (
                  <div id="peersChart" className="chart"></div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-yellow-400 mb-2">🏢</div>
                    <div className="text-sm ghost">No peer data available</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-span-12 lg:col-span-4">
              <div className="card p-4">
                <div className="font-medium mb-2">Revenue by Segment</div>
                
                {stockData.segments?.length > 0 ? (
                  <div id="segmentPie" className="chart"></div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-yellow-400 mb-2">📈</div>
                    <div className="text-sm ghost">No segment data available</div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Investment Analysis */}
          <section className="mt-4">
            <div className="card p-4">
              <div className="font-medium mb-4">Investment Analysis</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="ghost text-sm mb-2 flex items-center gap-2">
                    <span className="text-green-400">✓</span> Key Investment Strengths
                  </div>
                  <ul className="space-y-2 text-sm">
                    {stockData.strengths?.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1 text-xs">●</span>
                        <span className="leading-relaxed">{strength}</span>
                      </li>
                    )) || (
                      <li className="text-sm ghost">Loading strengths analysis...</li>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="ghost text-sm mb-2 flex items-center gap-2">
                    <span className="text-red-400">⚠</span> Key Investment Risks
                  </div>
                  <ul className="space-y-2 text-sm">
                    {stockData.risks?.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1 text-xs">●</span>
                        <span className="leading-relaxed">{risk}</span>
                      </li>
                    )) || (
                      <li className="text-sm ghost">Loading risks analysis...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section className="mt-4">
            <div className="card p-4">
              <div className="font-medium mb-4">Latest Company News</div>
              
              {stockData.news?.length > 0 ? (
                <ul className="divide-y divide-white/10">
                  {stockData.news.slice(0, 6).map((item, i) => (
                    <li key={i} className="py-3">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">{item.source}</div>
                          <div className="text-xs ghost">{item.datetime}</div>
                        </div>
                        <div className="text-sm hover:text-cyan-400 font-medium mb-1">
                          {item.headline}
                        </div>
                        {item.summary && (
                          <div className="text-xs ghost">{item.summary}</div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <div className="text-yellow-400 mb-2">📰</div>
                  <div className="text-sm ghost">No recent news available</div>
                </div>
              )}
            </div>
          </section>
        </div>
      </ErrorBoundary>
    </>
  )
}
