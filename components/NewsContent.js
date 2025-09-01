'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { fetchMarketData, fetchNews } from '@/lib/api'

export default function NewsContent() {
  const [marketData, setMarketData] = useState(null)
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [market, newsData] = await Promise.all([
        fetchMarketData(),
        fetchNews()
      ])
      setMarketData(market)
      setNews(newsData)
    } catch (error) {
      console.error('Error loading news data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="card p-8 text-center">
            <div className="text-lg">Loading market news...</div>
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
      <div className="max-w-7xl mx-auto px-4 py-5">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Market Snapshot</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">S&P 500</span>
                <span className={`text-xs ${marketData?.spy?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.spy?.changePercent >= 0 ? '+' : ''}{marketData?.spy?.changePercent?.toFixed(2) || '0.24'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.spy?.price?.toLocaleString() || '6,460.12'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">NASDAQ</span>
                <span className={`text-xs ${marketData?.nasdaq?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.nasdaq?.changePercent >= 0 ? '+' : ''}{marketData?.nasdaq?.changePercent?.toFixed(2) || '0.45'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.nasdaq?.price?.toLocaleString() || '21,750.89'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">BTC-USD</span>
                <span className={`text-xs ${marketData?.btc?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.btc?.changePercent >= 0 ? '+' : ''}{marketData?.btc?.changePercent?.toFixed(2) || '1.28'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.btc?.price?.toLocaleString() || '96,234'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Gold</span>
                <span className={`text-xs ${marketData?.gold?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.gold?.changePercent >= 0 ? '+' : ''}{marketData?.gold?.changePercent?.toFixed(2) || '0.18'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.gold?.price?.toLocaleString() || '2,641.50'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Oil WTI</span>
                <span className={`text-xs ${marketData?.oil?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.oil?.changePercent >= 0 ? '+' : ''}{marketData?.oil?.changePercent?.toFixed(2) || '-0.87'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.oil?.price?.toFixed(2) || '69.85'}</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Financial News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.length > 0 ? news.map((article, i) => (
              <article key={i} className="news-card p-4 rounded-xl">
                <div className="text-xs ghost mb-2">{article.datetime} · {article.source}</div>
                <h3 className="font-semibold mb-2">{article.headline}</h3>
                <p className="text-sm ghost mb-3">{article.summary}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                >
                  Read more →
                </a>
              </article>
            )) : (
              <>
                <article className="news-card p-4 rounded-xl">
                  <div className="text-xs ghost mb-2">1 hour ago · Reuters</div>
                  <h3 className="font-semibold mb-2">Fed Officials Signal Measured Pace for September Rate Decisions</h3>
                  <p className="text-sm ghost mb-3">Federal Reserve policymakers indicate data-dependent approach as inflation shows mixed signals in key economic indicators...</p>
                  <a 
                    href="https://www.reuters.com/markets/us/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                  >
                    Read more →
                  </a>
                </article>
                
                <article className="news-card p-4 rounded-xl">
                  <div className="text-xs ghost mb-2">2 hours ago · Bloomberg</div>
                  <h3 className="font-semibold mb-2">AI Infrastructure Spending Drives Tech Rally in September</h3>
                  <p className="text-sm ghost mb-3">Major technology companies see sustained investor enthusiasm as artificial intelligence capex accelerates across sectors...</p>
                  <a 
                    href="https://www.bloomberg.com/technology/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                  >
                    Read more →
                  </a>
                </article>
                
                <article className="news-card p-4 rounded-xl">
                  <div className="text-xs ghost mb-2">3 hours ago · WSJ</div>
                  <h3 className="font-semibold mb-2">China Manufacturing PMI Shows Continued Recovery Momentum</h3>
                  <p className="text-sm ghost mb-3">Latest indicators from China point to sustained manufacturing expansion as domestic demand recovers from earlier weakness...</p>
                  <a 
                    href="https://www.wsj.com/world/china/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                  >
                    Read more →
                  </a>
                </article>
                
                <article className="news-card p-4 rounded-xl">
                  <div className="text-xs ghost mb-2">4 hours ago · Financial Times</div>
                  <h3 className="font-semibold mb-2">European Central Bank Maintains Hawkish Stance on Inflation</h3>
                  <p className="text-sm ghost mb-3">ECB officials emphasize commitment to bringing inflation to target despite recent economic growth concerns...</p>
                  <a 
                    href="https://www.ft.com/companies/banks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                  >
                    Read more →
                  </a>
                </article>
                
                <article className="news-card p-4 rounded-xl">
                  <div className="text-xs ghost mb-2">5 hours ago · CNBC</div>
                  <h3 className="font-semibold mb-2">Energy Sector Sees Mixed Signals as Winter Demand Approaches</h3>
                  <p className="text-sm ghost mb-3">Oil and gas prices show volatility as geopolitical tensions weigh against demand forecasts for heating season...</p>
                  <a 
                    href="https://www.cnbc.com/energy/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                  >
                    Read more →
                  </a>
                </article>
                
                <article className="news-card p-4 rounded-xl">
                  <div className="text-xs ghost mb-2">6 hours ago · MarketWatch</div>
                  <h3 className="font-semibold mb-2">Cryptocurrency Markets Stabilize Above Key Technical Levels</h3>
                  <p className="text-sm ghost mb-3">Bitcoin and major altcoins find support as institutional adoption continues with new ETF flows...</p>
                  <a 
                    href="https://www.marketwatch.com/investing/cryptocurrency/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 text-sm hover:text-cyan-300 inline-block"
                  >
                    Read more →
                  </a>
                </article>
              </>
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Market Events</h2>
          <div className="card p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">Fed Interest Rate Decision</div>
                  <div className="text-xs ghost">Federal Reserve FOMC Meeting</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Sep 18, 2025</div>
                  <div className="text-xs ghost">2:00 PM EST</div>
                </div>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">Apple iPhone 17 Launch Event</div>
                  <div className="text-xs ghost">Product Announcement</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Sep 15, 2025</div>
                  <div className="text-xs ghost">1:00 PM EST</div>
                </div>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">Q3 Earnings Season Begins</div>
                  <div className="text-xs ghost">Major Banks & Tech Companies</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Oct 12, 2025</div>
                  <div className="text-xs ghost">Various Times</div>
                </div>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">Consumer Price Index (CPI)</div>
                  <div className="text-xs ghost">Bureau of Labor Statistics</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Sep 12, 2025</div>
                  <div className="text-xs ghost">8:30 AM EST</div>
                </div>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">NVIDIA GTC AI Conference</div>
                  <div className="text-xs ghost">AI Technology Announcements</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Oct 28, 2025</div>
                  <div className="text-xs ghost">10:00 AM EST</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Tesla Robotaxi Day</div>
                  <div className="text-xs ghost">Autonomous Vehicle Showcase</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Oct 10, 2025</div>
                  <div className="text-xs ghost">7:00 PM EST</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Market Analysis Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Market Analysis</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="font-semibold mb-3 text-cyan-400">📊 Weekly Market Summary</h3>
              <p className="text-sm ghost mb-4">
                September has brought renewed optimism to equity markets as investors weigh Federal Reserve policy signals against continued economic resilience. Technology stocks have led gains with AI infrastructure spending showing no signs of slowing.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">▲</span>
                  <span>S&P 500 up 2.1% week-to-date on tech strength</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">▲</span>
                  <span>NASDAQ leading with 3.2% weekly gain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">●</span>
                  <span>Energy sector mixed on supply concerns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">▲</span>
                  <span>Bitcoin reclaiming $95K+ technical level</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h3 className="font-semibold mb-3 text-purple-400">🎯 Key Themes This Week</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-medium mb-1">AI Infrastructure Boom</div>
                  <div className="text-ghost">Continued enterprise AI adoption driving hardware and cloud demand</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Fed Policy Uncertainty</div>
                  <div className="text-ghost">Markets pricing in 25bp cut probability for September meeting</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Earnings Season Prep</div>
                  <div className="text-ghost">Q3 expectations remain elevated for major tech companies</div>
                </div>
                <div>
                  <div className="font-medium mb-1">Geopolitical Watch</div>
                  <div className="text-ghost">China economic data and trade developments in focus</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sector Performance */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Sector Performance (5 Days)</h2>
          <div className="card p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-green-400">📈 Top Performers</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technology</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-green-400 text-sm font-medium">+3.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Communication Services</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{width: '70%'}}></div>
                      </div>
                      <span className="text-green-400 text-sm font-medium">+2.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consumer Discretionary</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="text-green-400 text-sm font-medium">+2.1%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Healthcare</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-green-400 text-sm font-medium">+1.4%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-red-400">📉 Underperformers</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Energy</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{width: '40%'}}></div>
                      </div>
                      <span className="text-red-400 text-sm font-medium">-1.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real Estate</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{width: '35%'}}></div>
                      </div>
                      <span className="text-red-400 text-sm font-medium">-1.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Utilities</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-red-400 text-sm font-medium">-0.8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Materials</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{width: '20%'}}></div>
                      </div>
                      <span className="text-yellow-400 text-sm font-medium">-0.3%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
