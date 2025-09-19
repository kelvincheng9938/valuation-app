'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'

export default function NewsContent() {
  const [marketData, setMarketData] = useState(null)
  const [breakingNews, setBreakingNews] = useState([])
  const [generalNews, setGeneralNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLiveMode, setIsLiveMode] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [dataSource, setDataSource] = useState('')
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadData()
    
    // Auto-refresh every 30 seconds for breaking news detection
    const interval = setInterval(loadData, 30 * 1000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      setError(null)
      console.log('🔄 Loading real-time data...')
      
      const response = await fetch('/api/news/realtime', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📊 Received real-time data:', data)
      
      if (data.marketData) {
        setMarketData(data.marketData)
        setBreakingNews(data.breakingNews || [])
        setGeneralNews(data.generalNews || [])
        setLastUpdated(data.lastUpdated)
        setDataSource(data.source)
        setIsLiveMode(data.source === 'live_apis')
        
        console.log('✅ Real-time data loaded:', {
          marketData: Object.keys(data.marketData || {}),
          breakingNews: data.breakingNews?.length || 0,
          generalNews: data.generalNews?.length || 0,
          source: data.source,
          cached: data.cached
        })
      } else {
        throw new Error('No market data received')
      }
      
    } catch (error) {
      console.error('❌ Failed to load real-time data:', error)
      setError(error.message)
      
      // Fallback to demo data
      setMarketData(getDemoMarketData())
      setBreakingNews([])
      setGeneralNews(getDemoNews())
      setIsLiveMode(false)
      setDataSource('fallback')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleManualRefresh = async () => {
    setRefreshing(true)
    
    try {
      console.log('🔄 Manual refresh requested...')
      const response = await fetch('/api/news/realtime', {
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setMarketData(data.marketData)
        setBreakingNews(data.breakingNews || [])
        setGeneralNews(data.generalNews || [])
        setLastUpdated(data.lastUpdated)
        setDataSource(data.source)
        setIsLiveMode(data.source === 'live_apis')
        setError(null)
        console.log('✅ Manual refresh successful')
      } else {
        throw new Error('Refresh failed')
      }
    } catch (error) {
      console.error('❌ Manual refresh failed:', error)
      setError('Manual refresh failed')
    } finally {
      setRefreshing(false)
    }
  }

  const getDemoMarketData = () => {
    return {
      spy: { price: 6045.23, change: 0.85, changePercent: 0.85 },
      nasdaq: { price: 19892.15, change: 1.12, changePercent: 1.12 },
      btc: { price: 94650, change: -1.85, changePercent: -1.85 },
      gold: { price: 2647.30, change: 0.32, changePercent: 0.32 },
      oil: { price: 69.85, change: -0.98, changePercent: -0.98 }
    }
  }

  const getDemoNews = () => {
    return [
      {
        headline: 'Fed Minutes Suggest Measured Approach to Rate Policy in 2025',
        summary: 'Federal Reserve officials emphasized data-dependent decisions amid mixed economic signals.',
        source: 'Reuters',
        datetime: '2 hours ago',
        url: '#'
      },
      {
        headline: 'Tech Earnings Season Kicks Off with Strong AI Revenue Growth',
        summary: 'Major technology companies reporting robust artificial intelligence business expansion.',
        source: 'Bloomberg',
        datetime: '4 hours ago',
        url: '#'
      }
    ]
  }

  const formatPrice = (price) => {
    if (typeof price !== 'number') return '0.00'
    
    if (price >= 1000) {
      return price.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    }
    return price.toFixed(2)
  }

  const formatChange = (change) => {
    if (typeof change !== 'number') return '+0.00%'
    
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }

  const getChangeColor = (change) => {
    if (typeof change !== 'number') return 'text-gray-400'
    return change >= 0 ? 'text-green-400' : 'text-red-400'
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading real-time data...</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        
        {/* Status Banner */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className={`p-4 rounded-lg border ${
            isLiveMode 
              ? 'bg-green-500/10 border-green-400/20 text-green-400' 
              : 'bg-yellow-500/10 border-yellow-400/20 text-yellow-400'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  isLiveMode ? 'bg-green-400' : 'bg-yellow-400'
                } animate-pulse`}></div>
                <span className="font-medium">
                  {isLiveMode ? '🔴 Live Financial Data & Breaking News' : '🟡 Demo Mode'}
                </span>
                {lastUpdated && (
                  <span className="text-sm opacity-80">
                    • Updated: {new Date(lastUpdated).toLocaleTimeString()}
                  </span>
                )}
                {dataSource && (
                  <span className="text-sm opacity-80">
                    • Source: {dataSource === 'live_apis' ? 'Finnhub + FMP APIs' : dataSource}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleManualRefresh}
                disabled={refreshing}
                className="px-3 py-1 text-sm bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 rounded-lg transition-colors disabled:opacity-50"
              >
                {refreshing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 animate-spin rounded-full border border-cyan-400 border-t-transparent"></div>
                    Refreshing...
                  </div>
                ) : (
                  '🔄 Refresh Now'
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-2 text-sm text-red-400">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>

        {/* Breaking News Alert */}
        {breakingNews.length > 0 && (
          <section className="max-w-7xl mx-auto mb-8">
            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-bold text-red-400">🚨 Breaking News</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {breakingNews.map((article, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-red-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-red-400 font-medium">{article.source}</span>
                      <span className="text-sm text-gray-400">{article.datetime}</span>
                    </div>
                    <h4 className="font-semibold mb-2 text-sm leading-snug">
                      {article.headline}
                    </h4>
                    {article.ticker && (
                      <div className="text-xs text-cyan-400 mb-2">
                        ${article.ticker}
                      </div>
                    )}
                    <a 
                      href={article.url}
                      className="text-sm text-red-400 hover:text-red-300 font-medium inline-flex items-center gap-1"
                    >
                      Read more →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Market Snapshot */}
        <section className="max-w-7xl mx-auto mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Market Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            
            {/* S&P 500 */}
            <div className="card p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">S&P 500</div>
              <div className="text-xl font-bold mb-1">
                {formatPrice(marketData?.spy?.price)}
              </div>
              <div className={`text-sm font-medium ${getChangeColor(marketData?.spy?.change)}`}>
                {formatChange(marketData?.spy?.change)}
              </div>
            </div>

            {/* NASDAQ */}
            <div className="card p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">NASDAQ</div>
              <div className="text-xl font-bold mb-1">
                {formatPrice(marketData?.nasdaq?.price)}
              </div>
              <div className={`text-sm font-medium ${getChangeColor(marketData?.nasdaq?.change)}`}>
                {formatChange(marketData?.nasdaq?.change)}
              </div>
            </div>

            {/* Bitcoin */}
            <div className="card p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">BTC-USD</div>
              <div className="text-xl font-bold mb-1">
                {formatPrice(marketData?.btc?.price)}
              </div>
              <div className={`text-sm font-medium ${getChangeColor(marketData?.btc?.change)}`}>
                {formatChange(marketData?.btc?.change)}
              </div>
            </div>

            {/* Gold */}
            <div className="card p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">Gold</div>
              <div className="text-xl font-bold mb-1">
                {formatPrice(marketData?.gold?.price)}
              </div>
              <div className={`text-sm font-medium ${getChangeColor(marketData?.gold?.change)}`}>
                {formatChange(marketData?.gold?.change)}
              </div>
            </div>

            {/* Oil */}
            <div className="card p-4 text-center">
              <div className="text-sm text-gray-400 mb-1">Oil WTI</div>
              <div className="text-xl font-bold mb-1">
                {formatPrice(marketData?.oil?.price)}
              </div>
              <div className={`text-sm font-medium ${getChangeColor(marketData?.oil?.change)}`}>
                {formatChange(marketData?.oil?.change)}
              </div>
            </div>

          </div>
        </section>

        {/* Latest Financial News */}
        <section className="max-w-7xl mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-6">Latest Financial News</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalNews.map((article, index) => (
              <div key={index} className="card p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-cyan-400 font-medium">{article.source}</span>
                  <span className="text-sm text-gray-400">{article.datetime}</span>
                </div>
                <h4 className="font-semibold mb-2 line-clamp-2 leading-snug">
                  {article.headline}
                </h4>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4">
                  {article.summary}
                </p>
                {article.ticker && (
                  <div className="text-xs text-cyan-400 mb-2">
                    Related: ${article.ticker}
                  </div>
                )}
                <a 
                  href={article.url}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                >
                  Read more →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Monitored Stocks */}
        <section className="max-w-7xl mx-auto mb-8">
          <div className="card p-6 bg-gradient-to-r from-purple-500/5 to-blue-500/5 border-purple-400/20">
            <h3 className="font-semibold mb-3 text-purple-400">📊 Real-Time Monitoring</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-300 mb-2">🎯 <strong>Breaking News Detection</strong></p>
                <p className="text-gray-400">Monitoring AAPL, MSFT, GOOGL, NVDA, TSLA, META, CRM, NFLX, AMD for announcements, earnings, and major events.</p>
              </div>
              <div>
                <p className="text-gray-300 mb-2">⚡ <strong>30-Second Refresh</strong></p>
                <p className="text-gray-400">Page automatically checks for breaking news every 30 seconds. Market data updates every 2 minutes.</p>
              </div>
              <div>
                <p className="text-gray-300 mb-2">🔔 <strong>Alert Keywords</strong></p>
                <p className="text-gray-400">Tracks: earnings, acquisitions, partnerships, FDA approvals, stock splits, investigations, CEO changes.</p>
              </div>
              <div>
                <p className="text-gray-300 mb-2">📈 <strong>Live Market Data</strong></p>
                <p className="text-gray-400">Real-time prices from Finnhub API for major indices, crypto, commodities.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sector Performance */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Market Movers */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">📈 Market Movers</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Technology</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-green-400 text-sm font-medium">+2.3%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Healthcare</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <span className="text-green-400 text-sm font-medium">+1.8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financials</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-green-400 text-sm font-medium">+1.2%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Energy</span>
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

            {/* Upcoming Events */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">📅 Upcoming Market Events</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">🔥 US Non-Farm Payrolls</div>
                    <div className="text-xs text-gray-400">Bureau of Labor Statistics - High Impact</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Sep 6, 2025</div>
                    <div className="text-xs text-gray-400">8:30 AM EST</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">🔥 US Unemployment Rate</div>
                    <div className="text-xs text-gray-400">Bureau of Labor Statistics - High Impact</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Sep 6, 2025</div>
                    <div className="text-xs text-gray-400">8:30 AM EST</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Fed Interest Rate Decision</div>
                    <div className="text-xs text-gray-400">Federal Reserve FOMC Meeting</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Sep 18, 2025</div>
                    <div className="text-xs text-gray-400">2:00 PM EST</div>
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
