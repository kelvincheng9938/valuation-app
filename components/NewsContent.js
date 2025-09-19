'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'

export default function NewsContent() {
  const [marketData, setMarketData] = useState(null)
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [isLiveMode, setIsLiveMode] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [dataSource, setDataSource] = useState('')
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadData()
    
    // Auto-refresh every 1 minute for testing
    const interval = setInterval(loadData, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      setError(null)
      console.log('🔄 Loading data...')
      
      const response = await fetch('/api/news/realtime', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📊 Received data:', data)
      
      // Update state with new data
      setMarketData(data.marketData || {})
      setNews(data.news || [])
      setEvents(data.events || [])
      setLastUpdated(data.lastUpdated)
      setDataSource(data.source)
      setIsLiveMode(data.source === 'google_news_apis' || data.source === 'live_apis')
      
      console.log('✅ Data loaded:', {
        marketData: Object.keys(data.marketData || {}),
        newsCount: data.news?.length || 0,
        eventsCount: data.events?.length || 0,
        source: data.source
      })
      
    } catch (error) {
      console.error('❌ Failed to load data:', error)
      setError(error.message)
      
      // Fallback to current market values
      setMarketData({
        spy: { price: 6631.96, change: 0.5, changePercent: 0.5, name: 'S&P 500' },
        nasdaq: { price: 21236.33, change: 0.8, changePercent: 0.8, name: 'NASDAQ' },
        btc: { price: 98250, change: -1.2, changePercent: -1.2, name: 'Bitcoin' },
        gold: { price: 2647.30, change: 0.3, changePercent: 0.3, name: 'Gold' },
        oil: { price: 69.85, change: -0.9, changePercent: -0.9, name: 'WTI Oil' }
      })
      setNews([])
      setEvents([])
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
      console.log('🔄 Manual refresh...')
      const response = await fetch('/api/news/realtime', {
        method: 'POST',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setMarketData(data.marketData || {})
        setNews(data.news || [])
        setEvents(data.events || [])
        setLastUpdated(data.lastUpdated)
        setDataSource(data.source)
        setIsLiveMode(data.source === 'google_news_apis' || data.source === 'live_apis')
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

  // Separate breaking news from general news
  const breakingNews = news.filter(article => article.isBreaking)
  const generalNews = news.filter(article => !article.isBreaking)

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
                  {isLiveMode ? '🟢 Live Market Data & Google News' : '🟡 Fallback Mode'}
                </span>
                {lastUpdated && (
                  <span className="text-sm opacity-80">
                    • Updated: {new Date(lastUpdated).toLocaleTimeString()}
                  </span>
                )}
                <span className="text-sm opacity-80">
                  • Source: {dataSource === 'google_news_apis' ? 'Google News + Financial APIs' : dataSource}
                </span>
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
                {breakingNews.slice(0, 6).map((article, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg border border-red-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-red-400 font-medium">{article.source}</span>
                      <span className="text-sm text-gray-400">{article.datetime}</span>
                    </div>
                    <h4 className="font-semibold mb-2 text-sm leading-snug line-clamp-2">
                      {article.headline}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                      {article.summary}
                    </p>
                    <a 
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
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
          <h2 className="text-2xl font-bold mb-6">Market Snapshot</h2>
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
              {marketData?.spy?.source && (
                <div className="text-xs text-gray-500 mt-1">{marketData.spy.source}</div>
              )}
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
              {marketData?.nasdaq?.source && (
                <div className="text-xs text-gray-500 mt-1">{marketData.nasdaq.source}</div>
              )}
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
              {marketData?.btc?.source && (
                <div className="text-xs text-gray-500 mt-1">{marketData.btc.source}</div>
              )}
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
              {marketData?.gold?.source && (
                <div className="text-xs text-gray-500 mt-1">{marketData.gold.source}</div>
              )}
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
              {marketData?.oil?.source && (
                <div className="text-xs text-gray-500 mt-1">{marketData.oil.source}</div>
              )}
            </div>

          </div>
        </section>

        {/* Latest Financial News */}
        <section className="max-w-7xl mx-auto mb-8">
          <h3 className="text-xl font-semibold mb-6">Latest Financial News</h3>
          {generalNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalNews.slice(0, 9).map((article, index) => (
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
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
                  >
                    Read more →
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-gray-400">Loading financial news...</p>
            </div>
          )}
        </section>

        {/* Upcoming Market Events */}
        {events.length > 0 && (
          <section className="max-w-7xl mx-auto">
            <h3 className="text-xl font-semibold mb-6">Upcoming Market Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.slice(0, 6).map((event, index) => (
                <div key={index} className={`p-4 rounded-lg border ${
                  event.impact === 'High' 
                    ? 'bg-yellow-500/10 border-yellow-400/20' 
                    : 'bg-gray-800/50 border-gray-600/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-sm font-medium ${
                      event.impact === 'High' ? 'text-yellow-400' : 'text-white'
                    }`}>
                      {event.impact === 'High' ? '🔥 ' : ''}{event.name}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{event.date}</div>
                      <div className="text-xs text-gray-400">{event.time}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {event.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  )
}
