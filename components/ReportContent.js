// components/ReportContent.js - SUPER COMPACT (No Wasted Space)
'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { initCharts, updateChartsTheme } from './ChartComponents'
import { fetchStockData, getAvailableTickers } from '@/lib/api'
import { ErrorBoundary } from './ErrorBoundary'
import { useTheme } from '@/contexts/ThemeContext'

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('AAPL')
  const [inputTicker, setInputTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)
  const { theme } = useTheme()

  // Get available tickers (demo or live)
  const availableTickers = getAvailableTickers()

  useEffect(() => {
    loadStockData('AAPL')
  }, [])

  // Update charts when theme changes
  useEffect(() => {
    if (stockData) {
      setTimeout(() => {
        initCharts(stockData)
      }, 150)
    }
  }, [theme])

  const loadStockData = async (symbol) => {
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Loading data for ${symbol}`)
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
      loadStockData(inputTicker.trim())
      setInputTicker('')
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
    if (quality === 'demo') {
      return <span className="chip px-1 py-0.5 text-blue-400 text-xs">📊 {label}</span>
    } else if (quality === true || quality === 'live' || quality === 'historical') {
      return <span className="chip px-1 py-0.5 text-green-400 text-xs">✓ {label}</span>
    } else if (quality === 'fallback' || quality === 'sector_default' || quality === 'known_structure') {
      return <span className="chip px-1 py-0.5 text-yellow-400 text-xs">⚠ {label}</span>
    } else {
      return <span className="chip px-1 py-0.5 text-red-400 text-xs">✗ {label}</span>
    }
  }

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
        <div className="max-w-7xl mx-auto px-4 py-5">
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

  return (
    <>
      <Navigation />
      <ErrorBoundary fallback="Report failed to load. Please refresh the page.">
        <div className="max-w-7xl mx-auto px-4 py-3" key={updateKey}>
          
          {/* Ultra-Compact Demo Banner */}
          {isDemoMode && (
            <div className="mb-3">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg p-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-400 font-medium">🎯 Professional Demo Mode {theme === 'light' ? '☀️' : '🌙'}</span>
                  </div>
                  <div className="chip px-2 py-1 bg-blue-500/20">
                    <span className="text-blue-400 text-xs">Demo Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ultra-Compact Search */}
          <div className="mb-3">
            <div className="card p-2">
              <div className="flex items-center gap-3 text-sm">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder="Enter ticker..."
                    className="px-2 py-1 border rounded text-sm w-32"
                  />
                  <button type="submit" className="btn-primary px-3 py-1 rounded text-sm">Go</button>
                </form>
                
                <div className="flex gap-1">
                  {availableTickers.slice(0, 6).map(t => (
                    <button
                      key={t}
                      onClick={() => loadStockData(t)}
                      className={`chip px-2 py-1 text-xs ${ticker === t ? 'bg-cyan-400/20 text-cyan-400' : ''}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                
                {stockData?.dataQuality && (
                  <div className="flex gap-1 ml-auto">
                    {getDataQualityBadge(stockData.dataQuality.quote, 'Price')}
                    {getDataQualityBadge(stockData.dataQuality.estimates, 'EPS')}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Ultra-Compact Header */}
          <header className="mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold">
                  {stockData?.name || 'Loading...'} ({ticker})
                </h1>
                {isDemoMode && (
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">DEMO</span>
                )}
                <span className="ghost text-xs">Updated: Just now</span>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">${stockData?.price?.toFixed(2) || '0.00'}</div>
                {stockData?.changePercent && (
                  <div className={`text-sm ${stockData.changePercent > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stockData.changePercent > 0 ? '+' : ''}{stockData.change?.toFixed(2)} 
                    ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* MAIN CONTENT: Everything in one tight grid */}
          <div className="grid grid-cols-12 gap-3">
            
            {/* LEFT COLUMN: Scores + Valuation + Company Info */}
            <div className="col-span-12 lg:col-span-9 space-y-3">
              
              {/* Score Cards + Valuation Bar */}
              <div className="card p-3">
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
                      {stockData?.scores?.value?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#3b82f6' }}>
                      {stockData?.scores?.growth?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                      {stockData?.scores?.profit?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#8b5cf6' }}>
                      {stockData?.scores?.momentum?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs ghost">Momentum</div>
                  </div>
                </div>

                {/* Valuation Bar */}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xs ghost mb-2">
                    <span>Undervalued</span>
                    <span>Fair Value</span>
                    <span>Overvalued</span>
                  </div>
                  <div className="relative mb-2">
                    <div className="h-2 rounded bg-gradient-to-r from-green-400 via-yellow-400 to-red-400"></div>
                    <div 
                      className="absolute top-0 w-0.5 h-2 bg-gray-900"
                      style={{ left: `${valuationInfo.position}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-xs">
                    <div className="font-medium">Current Price</div>
                    <div className="ghost">{valuationInfo.status}</div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="card p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">About the Company</div>
                  <div className="text-xs ghost">Key Stats</div>
                </div>
                
                <p className="text-sm mb-3 leading-tight">
                  {stockData?.description || 'Loading company information...'}
                </p>
                
                <div className="grid grid-cols-4 gap-2">
                  <div className="chip px-2 py-1">
                    <div className="text-xs ghost">Market Cap</div>
                    <div className="text-sm font-medium">{stockData?.marketCap || 'N/A'}</div>
                  </div>
                  <div className="chip px-2 py-1">
                    <div className="text-xs ghost">Forward P/E</div>
                    <div className="text-sm font-medium">{stockData?.forwardPE || 'N/A'}</div>
                  </div>
                  <div className="chip px-2 py-1">
                    <div className="text-xs ghost">TTM P/E</div>
                    <div className="text-sm font-medium">{stockData?.ttmPE || 'N/A'}</div>
                  </div>
                  <div className="chip px-2 py-1">
                    <div className="text-xs ghost">Sector</div>
                    <div className="text-sm font-medium">{stockData?.sector || 'Tech'}</div>
                  </div>
                </div>
              </div>

              {/* Valuation Chart */}
              <ErrorBoundary fallback="Chart failed">
                <div className="card p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">Valuation Analysis</div>
                    <div className="text-xs ghost">Price: ${stockData?.price?.toFixed(2) || '0.00'}</div>
                  </div>
                  
                  {stockData?.eps?.values?.length > 0 && stockData?.peBands ? (
                    <>
                      <div className="flex gap-2 text-xs mb-2">
                        <span className="chip px-2 py-1">
                          EPS: {stockData.eps.values.join('/')}
                        </span>
                        <span className="chip px-2 py-1">
                          P/E: {stockData.peBands.low}×/{stockData.peBands.mid}×/{stockData.peBands.high}×
                        </span>
                      </div>
                      <div id="valuationChart" style={{ width: '100%', height: '300px' }}></div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-sm ghost">
                      Try AAPL, MSFT, GOOGL for full valuation analysis
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>

            {/* RIGHT COLUMN: Quality Radar + News + Everything else */}
            <div className="col-span-12 lg:col-span-3 space-y-3">
              
              {/* Quality Radar */}
              <ErrorBoundary fallback="Radar failed">
                <div className="card p-3">
                  <div className="font-medium text-center mb-2">Quality Radar</div>
                  <div id="qualityRadar" style={{ width: '100%', height: '200px' }}></div>
                  {isDemoMode && (
                    <div className="text-center mt-2">
                      <div className="chip px-2 py-1 bg-blue-500/20 text-blue-400">
                        🔵 Live Demo
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>

              {/* FIXED: Latest News */}
              <ErrorBoundary fallback="News failed">
                <div className="card p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-sm">Latest News</div>
                    <div className="text-xs ghost">{stockData?.news?.length || 0} items</div>
                  </div>
                  
                  {stockData?.news?.length > 0 ? (
                    <div className="space-y-2">
                      {stockData.news.slice(0, 3).map((item, i) => (
                        <a 
                          key={i}
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block p-2 hover:bg-white/5 rounded border border-transparent hover:border-cyan-400/20 transition-all group"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <div className="text-xs ghost">{item.source}</div>
                            <div className="text-xs ghost">{item.datetime}</div>
                          </div>
                          <div className="text-xs group-hover:text-cyan-400 font-medium leading-tight">
                            {item.headline}
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-3">
                      <div className="text-sm ghost">
                        {isDemoMode ? 'Try AAPL, MSFT for news' : 'No news available'}
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>

              {/* Revenue Segments */}
              <ErrorBoundary fallback="Segments failed">
                <div className="card p-3">
                  <div className="font-medium text-sm mb-2">Revenue Segments</div>
                  {stockData?.segments?.length > 0 ? (
                    <div id="segmentPie" style={{ width: '100%', height: '200px' }}></div>
                  ) : (
                    <div className="text-center py-4 text-xs ghost">
                      {isDemoMode ? 'Try AAPL for segments' : 'No data'}
                    </div>
                  )}
                </div>
              </ErrorBoundary>

              {/* Investment Analysis - Super Compact */}
              <ErrorBoundary fallback="Analysis failed">
                <div className="card p-3">
                  <div className="font-medium text-sm mb-2">Analysis</div>
                  
                  <div className="mb-3">
                    <div className="text-xs ghost mb-1 flex items-center gap-1">
                      <span className="text-green-400">✓</span> Strengths
                    </div>
                    <div className="space-y-1">
                      {stockData?.strengths?.slice(0, 2).map((strength, i) => (
                        <div key={i} className="text-xs leading-tight flex items-start gap-1">
                          <span className="text-green-400 mt-0.5">•</span>
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs ghost mb-1 flex items-center gap-1">
                      <span className="text-red-400">⚠</span> Risks
                    </div>
                    <div className="space-y-1">
                      {stockData?.risks?.slice(0, 2).map((risk, i) => (
                        <div key={i} className="text-xs leading-tight flex items-start gap-1">
                          <span className="text-red-400 mt-0.5">•</span>
                          <span>{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ErrorBoundary>
            </div>
          </div>

          {/* Peers Chart - Full Width */}
          <section className="mt-3">
            <ErrorBoundary fallback="Peers failed">
              <div className="card p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Peers – Forward P/E vs Market Cap</div>
                  <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                </div>
                
                {stockData?.peers?.length > 0 ? (
                  <div id="peersChart" style={{ width: '100%', height: '300px' }}></div>
                ) : (
                  <div className="text-center py-4 text-sm ghost">
                    Try AAPL, MSFT, GOOGL for peer comparison
                  </div>
                )}
              </div>
            </ErrorBoundary>
          </section>

          {/* Footer */}
          {isDemoMode && (
            <div className="mt-3 card p-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 text-center">
              <div className="text-blue-400 font-medium text-sm mb-2">🚀 Ready for Live Data?</div>
              <div className="flex justify-center gap-1 text-xs">
                <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ EPS</span>
                <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ P/E</span>
                <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ Peers</span>
                <span className="chip px-2 py-1 bg-green-500/20 text-green-400">✓ News</span>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>
    </>
  )
}
