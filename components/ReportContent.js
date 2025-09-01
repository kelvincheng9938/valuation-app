'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { initCharts } from './ChartComponents'
import { fetchStockData } from '@/lib/api'
import { ErrorBoundary } from './ErrorBoundary'

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('GOOGL')
  const [inputTicker, setInputTicker] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)

  useEffect(() => {
    loadStockData('GOOGL')
  }, [])

  const loadStockData = async (symbol) => {
    setLoading(true)
    setError(null)
    
    try {
      console.log(`Loading data for ${symbol}`)
      const data = await fetchStockData(symbol.toUpperCase())
      setStockData(data)
      setTicker(symbol.toUpperCase())
      setUpdateKey(prev => prev + 1)
      
      // Initialize charts with new data
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

  const quickTickers = ['GOOGL', 'MSFT', 'AAPL', 'AMZN', 'NVDA', 'CRM']

  const getDataQualityBadge = (quality, label) => {
    if (quality === true || quality === 'live' || quality === 'historical') {
      return <span className="chip px-2 py-1 text-green-400">✓ {label}</span>
    } else if (quality === 'fallback' || quality === 'sector_default' || quality === 'known_structure') {
      return <span className="chip px-2 py-1 text-yellow-400">⚠ {label}: Estimated</span>
    } else {
      return <span className="chip px-2 py-1 text-red-400">✗ {label}: N/A</span>
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-lg">Loading {ticker} data...</div>
            <div className="mt-4">
              <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <div className="text-sm ghost mt-2">Fetching live market data from APIs...</div>
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
            <div className="text-xl font-bold mb-4">Unable to Load Data</div>
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
        <div className="max-w-7xl mx-auto px-4 py-5" key={updateKey}>
          {/* Enhanced Ticker Search Header */}
          <div className="mb-6">
            <div className="card p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={inputTicker}
                    onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                    placeholder="Enter ticker (e.g., MSFT)"
                    className="px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    className="btn-primary px-4 py-2 rounded-lg"
                    disabled={loading}
                  >
                    Analyze
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm ghost">Quick:</span>
                  {quickTickers.map(t => (
                    <button
                      key={t}
                      onClick={() => loadStockData(t)}
                      className={`chip px-2 py-1 text-xs ${ticker === t ? 'bg-cyan-400/20 text-cyan-400' : 'hover:bg-white/10'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Data Quality Indicators */}
              {stockData?.dataQuality && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="ghost">Data sources:</span>
                  {getDataQualityBadge(stockData.dataQuality.quote, 'Quote')}
                  {getDataQualityBadge(stockData.dataQuality.estimates, 'EPS')}
                  {getDataQualityBadge(stockData.dataQuality.peHistory, 'P/E Bands')}
                  {getDataQualityBadge(stockData.dataQuality.peers, 'Peers')}
                  {getDataQualityBadge(stockData.dataQuality.segments, 'Segments')}
                </div>
              )}
            </div>
          </div>

          {/* Rest of the component remains the same but with better error handling */}
          
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h1 className="text-xl font-semibold tracking-wide">
                  {stockData?.name || 'Loading...'} ({ticker})
                </h1>
                <span className="ghost text-sm">
                  Updated: {stockData?.lastUpdated ? new Date(stockData.lastUpdated).toLocaleTimeString() : 'Just now'}
                </span>
              </div>
              <div className="ghost text-sm">
                ${stockData?.price?.toFixed(2) || '0.00'}
                {stockData?.changePercent && (
                  <span className={stockData.changePercent > 0 ? 'text-green-400 ml-2' : 'text-red-400 ml-2'}>
                    ({stockData.changePercent > 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                  </span>
                )}
              </div>
            </div>
          </header>

          <section className="grid grid-cols-12 gap-4 relative">
            <aside className="col-span-12 lg:col-span-3 lg:sticky lg:top-20 self-start z-0 space-y-3">
              <ErrorBoundary fallback="Score display failed">
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Value Score</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.value?.toFixed(1) || '0.0'}</div>
                  </div>
                  <div id="band-spark" className="mt-3 h-10 w-full"></div>
                </div>
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Growth Score</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.growth?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Profitability</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.profit?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Momentum</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.momentum?.toFixed(1) || '0.0'}</div>
                  </div>
                </div>
                <div className="card p-4">
                  <div className="font-medium mb-2">Quality Radar</div>
                  <div id="qualityRadar" className="chart"></div>
                </div>
              </ErrorBoundary>
            </aside>

            <div className="col-span-12 lg:col-span-9 space-y-4 z-0">
              <ErrorBoundary fallback="Company info failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">About the Company</div>
                    <div className="text-sm ghost">Key Stats</div>
                  </div>
                  <p className="text-sm mt-2 leading-relaxed">
                    {stockData?.description || 'Loading company information...'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Market Cap</div>
                      <div className="font-medium">{stockData?.marketCap || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Forward P/E</div>
                      <div className="font-medium">{stockData?.forwardPE || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">TTM P/E</div>
                      <div className="font-medium">{stockData?.ttmPE || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Sector</div>
                      <div className="font-medium">{stockData?.sector || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback="Valuation chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Valuation Analysis</div>
                    <div className="text-sm ghost">Current Price: ${stockData?.price?.toFixed(2) || '0.00'}</div>
                  </div>
                  
                  {/* Enhanced validation for EPS and P/E data */}
                  {stockData?.eps?.values?.length > 0 && stockData?.peBands ? (
                    <>
                      <div className="flex items-center gap-2 text-xs mb-2 flex-wrap">
                        <span className="chip px-2 py-1">
                          EPS: {stockData.eps.values.join(' / ')}
                        </span>
                        <span className="chip px-2 py-1">
                          P/E Bands: {stockData.peBands.low}× / {stockData.peBands.mid}× / {stockData.peBands.high}×
                        </span>
                        {stockData.peBandsSource && stockData.peBandsSource !== 'historical' && (
                          <span className="chip px-2 py-1 text-yellow-400">
                            ⚠ {stockData.peBandsSource.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                      <div id="valuationChart" className="chart-lg"></div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-yellow-400 text-2xl mb-2">📊</div>
                      <div className="font-medium mb-2">Valuation Analysis Unavailable</div>
                      <div className="text-sm ghost">
                        {!stockData?.eps?.values?.length ? 
                          'No forward EPS estimates available from analysts.' :
                          'No P/E historical data available for band calculation.'
                        }
                        <br />This ticker may have limited analyst coverage.
                      </div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>
          </section>

          <section className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 lg:col-span-8">
              <ErrorBoundary fallback="Peers chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Peers – Forward P/E vs Market Cap</div>
                    <div className="flex items-center gap-2">
                      {stockData?.peersSource && stockData.peersSource !== 'live' && (
                        <span className="chip px-2 py-1 text-yellow-400 text-xs">
                          ⚠ {stockData.peersSource.replace('_', ' ')}
                        </span>
                      )}
                      <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                    </div>
                  </div>
                  
                  {stockData?.peers?.length > 0 ? (
                    <div id="peersChart" className="chart"></div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-yellow-400 text-xl mb-2">🏢</div>
                      <div className="text-sm ghost">No peer comparison data available for this ticker</div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </div>
            
            <aside className="col-span-12 lg:col-span-4">
              <ErrorBoundary fallback="Segment chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Revenue by Segment</div>
                    {stockData?.segmentsSource && stockData.segmentsSource !== 'live' && (
                      <span className="chip px-2 py-1 text-yellow-400 text-xs">
                        ⚠ {stockData.segmentsSource.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  
                  {stockData?.segments?.length > 0 ? (
                    <div id="segmentPie" className="chart"></div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-yellow-400 text-xl mb-2">📈</div>
                      <div className="text-sm ghost">No revenue segment breakdown available for this ticker</div>
                    </div>
                  )}
                </div>
              </ErrorBoundary>
            </aside>
          </section>

          <section className="mt-4">
            <ErrorBoundary fallback="Strengths & risks section failed">
              <div className="card p-4">
                <div className="font-medium mb-2">Investment Analysis</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="ghost text-sm mb-2 flex items-center gap-2">
                      <span className="text-green-400">✓</span> Key Strengths
                    </div>
                    <ul className="space-y-2 text-sm">
                      {stockData?.strengths?.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{strength}</span>
                        </li>
                      )) || (
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>Loading investment strengths...</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <div className="ghost text-sm mb-2 flex items-center gap-2">
                      <span className="text-red-400">⚠</span> Key Risks
                    </div>
                    <ul className="space-y-2 text-sm">
                      {stockData?.risks?.map((risk, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{risk}</span>
                        </li>
                      )) || (
                        <li className="flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>Loading investment risks...</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </ErrorBoundary>
          </section>

          <section className="mt-4">
            <ErrorBoundary fallback="News section failed to load">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Latest News</div>
                  <div className="text-sm ghost flex items-center gap-2">
                    {stockData?.newsSource === 'live' && <span className="text-green-400">● Live</span>}
                    {stockData?.news?.length || 0} items
                  </div>
                </div>
                
                {stockData?.news?.length > 0 ? (
                  <ul className="divide-y divide-white/10">
                    {stockData.news.slice(0, 6).map((item, i) => (
                      <li key={i} className="py-3">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-white/5 -mx-2 px-2 py-1 rounded cursor-pointer transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-xs ghost">{item.source}</div>
                            <div className="text-xs ghost">{item.datetime}</div>
                          </div>
                          <div className="text-sm hover:text-cyan-400 transition-colors font-medium">{item.headline}</div>
                          {item.summary && item.summary !== item.headline && (
                            <div className="text-xs ghost mt-1">{item.summary}</div>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-yellow-400 text-xl mb-2">📰</div>
                    <div className="text-sm ghost">No recent news available for {ticker}</div>
                  </div>
                )}
              </div>
            </ErrorBoundary>
          </section>
        </div>
      </ErrorBoundary>
    </>
  )
}
