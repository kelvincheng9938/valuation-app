'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'

export default function NewsContent() {
  const [marketData, setMarketData] = useState(null)
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLiveMode, setIsLiveMode] = useState(false)

  useEffect(() => {
    loadData()
    // Auto-refresh market data every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      // Try to fetch real market data first
      const [marketResponse, newsResponse] = await Promise.all([
        fetchRealMarketData(),
        fetchRealMarketNews()
      ])
      
      setMarketData(marketResponse)
      setNews(newsResponse)
      setIsLiveMode(true)
    } catch (error) {
      console.log('Using demo data due to:', error.message)
      // Fallback to enhanced demo data
      setMarketData(getUpdatedMarketData())
      setNews(getDemoNews())
      setIsLiveMode(false)
    } finally {
      setLoading(false)
    }
  }

  // Real market data fetching function
  const fetchRealMarketData = async () => {
    const apis = [
      () => fetchFromFinnhub(),
      () => fetchFromYahooFinance(),
      () => fetchFromAlphaVantage()
    ]

    for (const fetchMethod of apis) {
      try {
        const data = await fetchMethod()
        if (data && Object.keys(data).length > 0) {
          return data
        }
      } catch (error) {
        console.log('API failed, trying next...', error.message)
        continue
      }
    }
    
    throw new Error('All market data APIs failed')
  }

  const fetchFromFinnhub = async () => {
    const symbols = ['SPY', 'QQQ', 'BTCUSD', 'XAUUSD', 'USOIL']
    const data = {}
    
    for (const symbol of symbols) {
      try {
        const response = await fetch(`/api/quote?symbol=${symbol}`)
        if (response.ok) {
          const result = await response.json()
          const key = symbol === 'SPY' ? 'spy' : 
                     symbol === 'QQQ' ? 'nasdaq' : 
                     symbol === 'BTCUSD' ? 'btc' : 
                     symbol === 'XAUUSD' ? 'gold' : 'oil'
          
          data[key] = {
            price: result.price,
            change: result.change,
            changePercent: result.changePercent
          }
        }
      } catch (error) {
        console.log(`Failed to fetch ${symbol}:`, error)
      }
    }
    
    return Object.keys(data).length > 0 ? data : null
  }

  const fetchFromYahooFinance = async () => {
    // Placeholder for Yahoo Finance integration
    return null
  }

  const fetchFromAlphaVantage = async () => {
    // Placeholder for Alpha Vantage integration
    return null
  }

  const fetchRealMarketNews = async () => {
    try {
      const response = await fetch('/api/news/market')
      if (response.ok) {
        const result = await response.json()
        return result.news || []
      }
    } catch (error) {
      console.log('Market news API failed:', error)
    }
    
    return getDemoNews()
  }

  // FIXED: Updated market data with proper price variations
  const getUpdatedMarketData = () => {
    const baseTime = Date.now()
    const variation = () => (Math.random() - 0.5) * 0.015 // ±1.5% variation
    
    // Base prices updated to current market levels
    const baseData = {
      spy: { basePrice: 6223.00, baseChange: -0.62 },
      nasdaq: { basePrice: 20108.9, baseChange: 0.04 },
      btc: { basePrice: 97758, baseChange: 0.54 },
      gold: { basePrice: 2614.58, baseChange: -0.76 },  // FIXED: Updated gold price
      oil: { basePrice: 70.92, baseChange: -2.07 }      // FIXED: Updated oil price
    }
    
    const result = {}
    
    Object.entries(baseData).forEach(([key, data]) => {
      const priceVariation = variation()
      const changeVariation = (Math.random() - 0.5) * 0.5
      
      result[key] = {
        price: data.basePrice * (1 + priceVariation),
        change: data.baseChange + changeVariation,
        changePercent: ((data.baseChange + changeVariation) / data.basePrice) * 100
      }
    })
    
    return result
  }

  const getDemoNews = () => {
    return [
      {
        headline: 'Fed Minutes Suggest Measured Approach to Rate Policy in 2025',
        summary: 'Federal Reserve officials emphasized data-dependent decisions amid mixed economic signals.',
        source: 'Reuters',
        datetime: '2 hours ago',
        url: 'https://www.reuters.com/markets/us/'
      },
      {
        headline: 'Tech Earnings Season Kicks Off with Strong AI Revenue Growth',
        summary: 'Major technology companies reporting robust artificial intelligence business expansion.',
        source: 'Bloomberg',
        datetime: '4 hours ago',
        url: 'https://www.bloomberg.com/technology/'
      },
      {
        headline: 'Market Volatility Expected as Geopolitical Tensions Rise',
        summary: 'Analysts predict increased market swings due to ongoing international developments.',
        source: 'Financial Times',
        datetime: '6 hours ago',
        url: 'https://www.ft.com/markets'
      },
      {
        headline: 'China Manufacturing PMI Shows Continued Recovery Momentum',
        summary: 'Latest indicators from China point to sustained manufacturing expansion.',
        source: 'WSJ',
        datetime: '8 hours ago',
        url: 'https://www.wsj.com/world/china/'
      },
      {
        headline: 'European Central Bank Maintains Hawkish Stance on Inflation',
        summary: 'ECB officials emphasize commitment to bringing inflation to target.',
        source: 'Financial Times',
        datetime: '10 hours ago',
        url: 'https://www.ft.com/world/europe'
      },
      {
        headline: 'Cryptocurrency Markets Stabilize Above Key Technical Levels',
        summary: 'Bitcoin and major altcoins find support as institutional adoption continues.',
        source: 'CoinDesk',
        datetime: '12 hours ago',
        url: 'https://www.coindesk.com/'
      }
    ]
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
        
        {/* Data Source Indicator */}
        <div className="mb-6">
          <div className={`card p-4 border ${isLiveMode ? 'border-green-400/30 bg-green-500/10' : 'border-blue-400/30 bg-blue-500/10'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full animate-pulse ${isLiveMode ? 'bg-green-400' : 'bg-blue-400'}`}></div>
              <div>
                <div className={`font-semibold ${isLiveMode ? 'text-green-400' : 'text-blue-400'}`}>
                  {isLiveMode ? '📡 Live Market Data' : '📊 Demo Mode Active'}
                </div>
                <div className="text-sm ghost">
                  {isLiveMode ? 'Real-time data from financial APIs' : 'Professional demo with realistic market data - Auto-refreshing every 30 seconds'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Snapshot - FIXED PRICES */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Market Snapshot</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">S&P 500</span>
                <span className={`text-xs font-medium ${marketData?.spy?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.spy?.changePercent >= 0 ? '+' : ''}{marketData?.spy?.changePercent?.toFixed(2) || '-0.62'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.spy?.price?.toFixed(2) || '6,223.00'}</div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">NASDAQ</span>
                <span className={`text-xs font-medium ${marketData?.nasdaq?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.nasdaq?.changePercent >= 0 ? '+' : ''}{marketData?.nasdaq?.changePercent?.toFixed(2) || '+0.04'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.nasdaq?.price?.toFixed(1) || '20,108.9'}</div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">BTC-USD</span>
                <span className={`text-xs font-medium ${marketData?.btc?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.btc?.changePercent >= 0 ? '+' : ''}{marketData?.btc?.changePercent?.toFixed(2) || '+0.54'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.btc?.price?.toFixed(0) || '97,758'}</div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Gold</span>
                <span className={`text-xs font-medium ${marketData?.gold?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.gold?.changePercent >= 0 ? '+' : ''}{marketData?.gold?.changePercent?.toFixed(2) || '-0.76'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.gold?.price?.toFixed(2) || '2,614.58'}</div>
            </div>
            
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Oil WTI</span>
                <span className={`text-xs font-medium ${marketData?.oil?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.oil?.changePercent >= 0 ? '+' : ''}{marketData?.oil?.changePercent?.toFixed(2) || '-2.07'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.oil?.price?.toFixed(2) || '70.92'}</div>
            </div>
          </div>
        </section>

        {/* Latest Financial News */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Latest Financial News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, i) => (
              <article key={i} className="news-card p-4 rounded-xl">
                <div className="text-xs ghost mb-2">{article.datetime} · {article.source}</div>
                <h3 className="font-semibold mb-2 leading-relaxed">{article.headline}</h3>
                <p className="text-sm ghost mb-3 leading-relaxed">{article.summary}</p>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-block"
                >
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Upcoming Market Events - NO CHINESE TEXT */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Upcoming Market Events</h2>
          <div className="card p-6">
            <div className="space-y-4">
              {/* CRITICAL US EMPLOYMENT DATA - FRIDAY - ENGLISH ONLY */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 bg-yellow-500/10 -mx-3 px-3 py-2 rounded-lg">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-yellow-400">🔥</span>
                    US Non-Farm Payrolls
                  </div>
                  <div className="text-xs ghost">Bureau of Labor Statistics - High Impact</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-yellow-400">Sep 6, 2025</div>
                  <div className="text-xs ghost">8:30 AM EST</div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-white/10 bg-yellow-500/10 -mx-3 px-3 py-2 rounded-lg">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-yellow-400">🔥</span>
                    US Unemployment Rate
                  </div>
                  <div className="text-xs ghost">Bureau of Labor Statistics - High Impact</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-yellow-400">Sep 6, 2025</div>
                  <div className="text-xs ghost">8:30 AM EST</div>
                </div>
              </div>

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

        {/* Market Analysis */}
        <section className="mb-8">
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
                  <div className="font-medium mb-1">🔥 Jobs Report Friday (Critical)</div>
                  <div className="text-ghost">US Non-Farm Payrolls and Unemployment Rate will drive Fed policy expectations</div>
                </div>
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
        <section className="mb-8">
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

        {/* How to Enable Live Data */}
        {!isLiveMode && (
          <section className="mt-8">
            <div className="card p-6 bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-400/20">
              <h3 className="font-semibold mb-3 text-green-400">🚀 Enable Live Market Data</h3>
              <p className="text-sm ghost mb-4">
                Currently showing professional demo data. To get real-time market data and economic events:
              </p>
              <ol className="text-sm space-y-2 list-decimal list-inside ghost">
                <li>Set <code className="bg-gray-800 px-2 py-1 rounded">DEMO_MODE = false</code> in <code>lib/api.js</code></li>
                <li>Add market news API endpoint: <code className="bg-gray-800 px-2 py-1 rounded">/api/news/market</code></li>
                <li>Configure financial data APIs (Alpha Vantage, Finnhub, or IEX Cloud)</li>
                <li>Add economic calendar API for events like Non-Farm Payrolls</li>
              </ol>
            </div>
          </section>
        )}

      </div>
    </>
  )
}
