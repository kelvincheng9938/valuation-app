'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { initCharts } from './ChartComponents'
import { fetchStockData } from '@/lib/api'
import { ErrorBoundary } from './ErrorBoundary'

export default function ReportContent() {
  const [stockData, setStockData] = useState(null)
  const [ticker, setTicker] = useState('GOOGL')
  const [loading, setLoading] = useState(false)
  const [chartsInitialized, setChartsInitialized] = useState(false)

  useEffect(() => {
    loadStockData('GOOGL')
  }, [])

  const loadStockData = async (symbol) => {
    setLoading(true)
    setChartsInitialized(false)
    
    try {
      const data = await fetchStockData(symbol)
      setStockData(data)
      setTicker(symbol)
    } catch (error) {
      console.error('Error loading stock data:', error)
      // Set fallback data to prevent crashes
      setStockData({
        ticker: symbol,
        name: 'Stock Data',
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

  // Initialize charts after data is loaded and DOM is ready
  useEffect(() => {
    if (stockData && !chartsInitialized) {
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
  }, [stockData, chartsInitialized])

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-lg">Loading stock data...</div>
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
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <h1 id="title" className="text-xl font-semibold tracking-wide">
                  {stockData?.name || 'Alphabet Inc.'} ({ticker})
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
                  <p id="aboutText" className="text-sm mt-2 leading-relaxed">
                    {stockData?.description || 'Alphabet operates through Google Search & YouTube advertising, with Google Cloud accelerating growth. The company continues investing in generative AI and infrastructure. Business spans search, video, cloud, Android and emerging projects.'}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Market Cap</div>
                      <div id="stat-cap" className="font-medium">${stockData?.marketCap || '2.25T'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Forward P/E</div>
                      <div id="stat-fpe" className="font-medium">{stockData?.forwardPE || '24.8'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">TTM P/E</div>
                      <div id="stat-ttmpe" className="font-medium">{stockData?.ttmPE || '26.2'}</div>
                    </div>
                    <div className="chip px-2 py-2 text-sm">
                      <div className="ghost text-xs">Sector</div>
                      <div id="stat-sector" className="font-medium">{stockData?.sector || 'Communication Services'}</div>
                    </div>
                  </div>
                </div>
              </ErrorBoundary>

              <ErrorBoundary fallback="Valuation chart failed to load">
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Valuation (Trader Model)</div>
                    <div className="text-sm ghost">Current Price: <span id="currentPrice">${stockData?.price || '207.14'}</span></div>
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
                      <li>Search & YouTube ecosystem moat, stable ad demand</li>
                      <li>Cloud profitability improving with structural growth</li>
                      <li>Strong cash flow and R&D investment, complete AI positioning</li>
                    </ul>
                  </div>
                  <div>
                    <div className="ghost text-sm mb-1">Risks / Weaknesses</div>
                    <ul id="riskList" className="list-disc pl-5 space-y-1 text-sm">
                      <li>Antitrust and privacy regulatory pressure persists</li>
                      <li>Ad business macro-sensitive; social/commerce competition intense</li>
                      <li>Generative AI changing search behavior, may dilute traditional monetization</li>
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
                    {stockData?.news?.length || 2} items
                  </div>
                </div>
                <ul id="newsList" className="divide-y divide-white/10">
                  {stockData?.news?.length > 0 ? stockData.news.map((item, i) => (
                    <li key={i} className="py-2">
                      <div className="text-xs ghost">{item.datetime} · {item.source}</div>
                      <div className="text-sm">{item.headline}</div>
                    </li>
                  )) : (
                    <>
                      <li className="py-2">
                        <div className="text-xs ghost">Just now · Reuters</div>
                        <div className="text-sm">Alphabet unveils new AI features across Google products</div>
                      </li>
                      <li className="py-2">
                        <div className="text-xs ghost">2 hours ago · Bloomberg</div>
                        <div className="text-sm">Analyst lifts GOOGL estimates on Cloud margins</div>
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
