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
  const [chartsInitialized, setChartsInitialized] = useState(false)

  useEffect(() => {
    loadStockData('GOOGL')
  }, [])

  const loadStockData = async (symbol) => {
    setLoading(true)
    setChartsInitialized(false)
    
    try {
      const data = await fetchStockData(symbol.toUpperCase())
      setStockData(data)
      setTicker(symbol.toUpperCase())
      
      // Clear existing charts
      const chartIds = ['band-spark', 'qualityRadar', 'valuationChart', 'peersChart', 'segmentPie']
      chartIds.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          element.innerHTML = '' // Clear the chart
        }
      })
      
    } catch (error) {
      console.error('Error loading stock data:', error)
      setStockData({
        ticker: symbol.toUpperCase(),
        name: `${symbol.toUpperCase()} Corporation`,
        price: 0,
        marketCap: 'N/A',
        forwardPE: 'N/A',
        ttmPE: 0,
        sector: 'Unknown',
        description: 'Unable to load stock data.',
        eps: { years: ['2025', '2026', '2027'], values: [0, 0, 0] },
        peBands: { low: 20, mid: 25, high: 30 },
        scores: { value: 0, growth: 0, profit: 0, momentum: 0 },
        peers: [],
        segments: [],
        news: []
      })
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

  // Initialize charts after data is loaded and DOM is ready
  useEffect(() => {
    if (stockData) {
      const timer = setTimeout(async () => {
        try {
          await initCharts(stockData)
          setChartsInitialized(true)
        } catch (error) {
          console.error('Error initializing charts:', error)
        }
      }, 200)

      return () => clearTimeout(timer)
    }
  }, [stockData]) // Remove chartsInitialized dependency to allow re-initialization

  // Quick ticker buttons
  const quickTickers = ['GOOGL', 'MSFT', 'AAPL', 'AMZN', 'NVDA', 'CRM']

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
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <ErrorBoundary fallback="Report failed to load. Please try refreshing the page.">
        <div className="max-w-7xl mx-auto px-4 py-5">
          {/* Ticker Search Header */}
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
            </div>
          </div>

          <header className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h1 id="title" className="text-xl font-semibold tracking-wide">
                  {stockData?.name || 'Company Name'} ({ticker})
                </h1>
                <span className="ghost text-sm">Updated: Just now</span>
              </div>
              <div className="ghost text-sm">Theme: Simple / Wall-St</div>
            </div>
          </header>

          <section className="grid grid-cols-12 gap-4 relative">
            <aside className="col-span-12 lg:col-span-3 lg:sticky lg:top-20 self-start z-0 space-y-3">
              <ErrorBoundary fallback="Score display failed">
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Value Score</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.value || '8.2'}</div>
                  </div>
                  <div id="band-spark" className="mt-3 h-10 w-full"></div>
                </div>
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Growth Score</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.growth || '7.6'}</div>
                  </div>
                </div>
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Profitability</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.profit || '9.0'}</div>
                  </div>
                </div>
                <div className="card kpi p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm ghost">Momentum</div>
                    <div className="text-lg font-semibold">{stockData?.scores?.momentum || '6.9'}</div>
                  </div>
                </div>
                <div className="card p-4">
                  <div className="font-medium mb-2">Quality Radar</div>
                  <div id="qualityRadar" class="chart"></div>
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
                  <p id="aboutText" className="text-sm mt-2 leading-relaxed">
                    {stockData?.description || 'Company description not available.'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Market Cap</div>
                      <div id="stat-cap" className="font-medium">${stockData?.marketCap || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Forward P/E</div>
                      <div id="stat-fpe" className="font-medium">{stockData?.forwardPE || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">TTM P/E</div>
                      <div id="stat-ttmpe" className="font-medium">{stockData?.ttmPE || 'N/A'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Sector</div>
                      <div id="stat-sector" className="font-medium">{stockData?.sector || 'Unknown'}</div>
                    </div>
                  </div>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback="Valuation chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Valuation (Trader Model)</div>
                    <div className="text-sm ghost">Current Price: <span id="currentPrice">${stockData?.price || '0.00'}</span></div>
                  </div>
                  {/* MSFT-Style Bands Info */}
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="chip px-2 py-1">
                      EPS: {stockData?.eps?.values?.join(' / ') || '0 / 0 / 0'}
                    </span>
                    <span className="chip px-2 py-1">
                      Bands (25th/50th/75th): {stockData?.peBands?.low}× / {stockData?.peBands?.mid}× / {stockData?.peBands?.high}×
                    </span>
                  </div>
                  <div id="valuationChart" className="chart-lg"></div>
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
                    <button id="toggleLabelsBtn" className="btn text-xs">Labels: ON</button>
                  </div>
                  <div id="peersChart" className="chart"></div>
                </div>
              </ErrorBoundary>
            </div>
            <aside className="col-span-12 lg:col-span-4">
              <ErrorBoundary fallback="Segment chart failed to load">
                <div className="card p-4">
                  <div className="font-medium mb-2">Income by Segment</div>
                  <div id="segmentPie" className="chart"></div>
                </div>
              </ErrorBoundary>
            </aside>
          </section>

          <section className="mt-4">
            <ErrorBoundary fallback="Strengths & risks section failed">
              <div className="card p-4">
                <div className="font-medium mb-2">Strengths & Risks</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="ghost text-sm mb-1">Strengths</div>
                    <ul id="strengthList" className="list-disc pl-5 space-y-1 text-sm">
                      {stockData?.strengths?.map((strength, i) => (
                        <li key={i}>{strength}</li>
                      )) || (
                        <>
                          <li>Market leadership and competitive moats</li>
                          <li>Strong financial position and cash flows</li>
                          <li>Innovation and R&D investment</li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <div className="ghost text-sm mb-1">Risks / Weaknesses</div>
                    <ul id="riskList" className="list-disc pl-5 space-y-1 text-sm">
                      {stockData?.risks?.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      )) || (
                        <>
                          <li>Regulatory and compliance challenges</li>
                          <li>Market competition and disruption risks</li>
                          <li>Economic and cyclical headwinds</li>
                        </>
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
                  <div id="newsCount" className="text-sm ghost">
                    {stockData?.news?.length || 0} items
                  </div>
                </div>
                <ul id="newsList" className="divide-y divide-white/10">
                  {stockData?.news?.length > 0 ? stockData.news.map((item, i) => (
                    <li key={i} className="py-2">
                      <a 
                        href={item.url || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block hover:bg-white/5 -mx-2 px-2 py-1 rounded cursor-pointer transition-colors"
                        onClick={(e) => {
                          if (!item.url || item.url === '#') {
                            e.preventDefault();
                            window.open('https://www.reuters.com', '_blank');
                          }
                        }}
                      >
                        <div className="text-xs ghost">{item.datetime} · {item.source}</div>
                        <div className="text-sm hover:text-cyan-400 transition-colors">{item.headline}</div>
                      </a>
                    </li>
                  )) : (
                    <>
                      <li className="py-2">
                        <a 
                          href="https://www.reuters.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block hover:bg-white/5 -mx-2 px-2 py-1 rounded cursor-pointer transition-colors"
                        >
                          <div className="text-xs ghost">Just now · Reuters</div>
                          <div className="text-sm hover:text-cyan-400 transition-colors">{ticker} stock analysis and market outlook</div>
                        </a>
                      </li>
                      <li className="py-2">
                        <a 
                          href="https://www.bloomberg.com" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block hover:bg-white/5 -mx-2 px-2 py-1 rounded cursor-pointer transition-colors"
                        >
                          <div className="text-xs ghost">2 hours ago · Bloomberg</div>
                          <div className="text-sm hover:text-cyan-400 transition-colors">Analysts update {ticker} estimates</div>
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </ErrorBoundary>
          </section>
        </div>
      </ErrorBoundary>
    </>
  )
}
