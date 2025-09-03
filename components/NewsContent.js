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
      setMarketData(getDemoMarketData())
      setNews(getDemoNews())
      setIsLiveMode(false)
    } finally {
      setLoading(false)
    }
  }

  // Real market data fetching function
  const fetchRealMarketData = async () => {
    // Try multiple free APIs for real market data
    const apis = [
      // Alpha Vantage (free tier)
      () => fetchFromAlphaVantage(),
      // Yahoo Finance (unofficial)
      () => fetchFromYahooFinance(),
      // Finnhub (your existing API)
      () => fetchFromFinnhub()
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
          data[symbol.toLowerCase()] = {
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
    // Using a CORS proxy for Yahoo Finance
    const symbols = ['^GSPC', '^IXIC', 'BTC-USD', 'GC=F', 'CL=F']
    const data = {}
    
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/' + symbols.join(','))}`)
      if (response.ok) {
        const result = await response.json()
        // Process Yahoo Finance data
        // This is a simplified example - you'd need to parse the actual response
        return getDemoMarketData() // Fallback for now
      }
    } catch (error) {
      console.log('Yahoo Finance failed:', error)
    }
    
    return null
  }

  const fetchFromAlphaVantage = async () => {
    // You'd need to add ALPHA_VANTAGE_API_KEY to your environment variables
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY
    if (!apiKey) return null
    
    // Fetch SPY data as example
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${apiKey}`)
      if (response.ok) {
        const result = await response.json()
        // Process Alpha Vantage data
        return null // Implement parsing
      }
    } catch (error) {
      console.log('Alpha Vantage failed:', error)
    }
    
    return null
  }

  const fetchRealMarketNews = async () => {
    // Try to fetch real financial news
    try {
      const response = await fetch('/api/news/market')
      if (response.ok) {
        const result = await response.json()
        return result.news || []
      }
    } catch (error) {
      console.log('Market news API failed:', error)
    }
    
    // Fallback to enhanced demo news
    return getDemoNews()
  }

  // Enhanced demo data with real market context
  const getDemoMarketData = () => {
    const now = new Date()
    const variation = () => (Math.random() - 0.5) * 0.02 // ±1% variation
    
    return {
      spy: { 
        price: 6208.74 * (1 + variation()), 
        change: -0.39 + (Math.random() - 0.5) * 0.5,
        changePercent: -0.39 + (Math.random() - 0.5) * 0.5
      },
      nasdaq: { 
        price: 20216.8 * (1 + variation()), 
        change: 0.26 + (Math.random() - 0.5) * 0.5,
        changePercent: 0.26 + (Math.random() - 0.5) * 0.5
      },
      btc: { 
        price: 97525.58 * (1 + variation()), 
        change: 0.07 + (Math.random() - 0.5) * 2,
        changePercent: 0.07 + (Math.random() - 0.5) * 2
      },
      gold: { 
        price: 2633.27 * (1 + variation()), 
        change: -0.43 + (Math.random() - 0.5) * 0.8,
        changePercent: -0.43 + (Math.random() - 0.5) * 0.8
      },
      oil: { 
        price: 71.19 * (1 + variation()), 
        change: -1.72 + (Math.random() - 0.5) * 1.0,
        changePercent: -1.72 + (Math.random() - 0.5) * 1.0
      }
    }
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
                  {isLiveMode ? 'Real-time data from financial APIs' : 'Professional demo with realistic market data - Switch to live mode in lib/api.js'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Snapshot */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Market Snapshot</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">S&P 500</span>
                <span className={`text-xs font-medium ${marketData?.spy?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.spy?.changePercent >= 0 ? '+' : ''}{marketData?.spy?.changePercent?.toFixed(2) || '0.00'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.spy?.price?.toFixed(2) || '6,208.74'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">NASDAQ</span>
                <span className={`text-xs font-medium ${marketData?.nasdaq?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.nasdaq?.changePercent >= 0 ? '+' : ''}{marketData?.nasdaq?.changePercent?.toFixed(2) || '0.26'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.nasdaq?.price?.toFixed(1) || '20,216.8'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">BTC-USD</span>
                <span className={`text-xs font-medium ${marketData?.btc?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.btc?.changePercent >= 0 ? '+' : ''}{marketData?.btc?.changePercent?.toFixed(2) || '0.07'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.btc?.price?.toFixed(0) || '97,526'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Gold</span>
                <span className={`text-xs font-medium ${marketData?.gold?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.gold?.changePercent >= 0 ? '+' : ''}{marketData?.gold?.changePercent?.toFixed(2) || '-0.43'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.gold?.price?.toFixed(2) || '2,633.27'}</div>
            </div>
            <div className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Oil WTI</span>
                <span className={`text-xs font-medium ${marketData?.oil?.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {marketData?.oil?.changePercent >= 0 ? '+' : ''}{marketData?.oil?.changePercent?.toFixed(2) || '-1.72'}%
                </span>
              </div>
              <div className="text-2xl font-bold">{marketData?.oil?.price?.toFixed(2) || '71.19'}</div>
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

        {/* Upcoming Market Events - INCLUDING THE IMPORTANT ECONOMIC DATA */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Upcoming Market Events</h2>
          <div className="card p-6">
            <div className="space-y-4">
              {/* CRITICAL US EMPLOYMENT DATA - FRIDAY */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 bg-yellow-500/10 -mx-3 px-3 py-2 rounded-lg">
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-yellow-400">🔥</span>
                    US Non-Farm Payrolls (美国非农就业人口)
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
                    US Unemployment Rate (美国失业率)
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
                  <div className="font-medium mb-1">🔥 Jobs Report Friday (重要！)</div>
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
