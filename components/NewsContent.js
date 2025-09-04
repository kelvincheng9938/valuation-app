'use client'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { fetchMarketData, fetchNews } from '@/lib/api'

export default function NewsContent() {
  const [marketData, setMarketData] = useState(null)
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState('demo')

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
      setDataSource(market.dataSource || 'live')
    } catch (error) {
      console.error('Error loading news data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadData()
    }, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

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

  // Format number with commas
  const formatNumber = (num) => {
    if (!num) return 'N/A'
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: num < 100 ? 2 : 0,
      maximumFractionDigits: num < 100 ? 2 : 0
    })
  }

  // Format percentage change with + or -
  const formatChange = (change) => {
    if (!change) return 'N/A'
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}%`
  }

  // Get color for change value
  const getChangeColor = (change) => {
    if (!change) return 'text-gray-400'
    return change >= 0 ? 'text-green-400' : 'text-red-400'
  }

  return (
    <>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-5">
        
        {/* Data Source Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Financial Markets & News</h1>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${dataSource === 'live' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`}></div>
              <span className="text-sm ghost">
                {dataSource === 'live' ? 'Live Data' : 'Demo Mode'}
              </span>
              <span className="text-xs ghost">
                Updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Market Snapshot</h2>
            <button 
              onClick={() => loadData()} 
              className="btn px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all"
              disabled={loading}
            >
              {loading ? '↻' : '⟳'} Refresh
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* S&P 500 */}
            <div className="card p-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">S&P 500</span>
                <span className={`text-xs font-medium ${getChangeColor(marketData?.sp500?.change)}`}>
                  {formatChange(marketData?.sp500?.change)}
                </span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(marketData?.sp500?.price)}
              </div>
              <div className="text-xs ghost mt-1">US Stocks</div>
            </div>

            {/* NASDAQ */}
            <div className="card p-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">NASDAQ</span>
                <span className={`text-xs font-medium ${getChangeColor(marketData?.nasdaq?.change)}`}>
                  {formatChange(marketData?.nasdaq?.change)}
                </span>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(marketData?.nasdaq?.price)}
              </div>
              <div className="text-xs ghost mt-1">Tech Stocks</div>
            </div>

            {/* Bitcoin */}
            <div className="card p-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Bitcoin</span>
                <span className={`text-xs font-medium ${getChangeColor(marketData?.bitcoin?.change)}`}>
                  {formatChange(marketData?.bitcoin?.change)}
                </span>
              </div>
              <div className="text-2xl font-bold">
                ${formatNumber(marketData?.bitcoin?.price)}
              </div>
              <div className="text-xs ghost mt-1">Cryptocurrency</div>
            </div>

            {/* Gold */}
            <div className="card p-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Gold</span>
                <span className={`text-xs font-medium ${getChangeColor(marketData?.gold?.change)}`}>
                  {formatChange(marketData?.gold?.change)}
                </span>
              </div>
              <div className="text-2xl font-bold">
                ${formatNumber(marketData?.gold?.price)}
              </div>
              <div className="text-xs ghost mt-1">Precious Metals</div>
            </div>

            {/* Oil WTI */}
            <div className="card p-4 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ghost">Oil WTI</span>
                <span className={`text-xs font-medium ${getChangeColor(marketData?.oil?.change)}`}>
                  {formatChange(marketData?.oil?.change)}
                </span>
              </div>
              <div className="text-2xl font-bold">
                ${formatNumber(marketData?.oil?.price)}
              </div>
              <div className="text-xs ghost mt-1">Energy</div>
            </div>
          </div>

          {/* Additional Market Indices */}
          {(marketData?.dow || marketData?.vix || marketData?.euro || marketData?.yen) && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {marketData?.dow && (
                <div className="card p-3 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs ghost">Dow Jones</span>
                    <span className={`text-xs ${getChangeColor(marketData.dow.change)}`}>
                      {formatChange(marketData.dow.change)}
                    </span>
                  </div>
                  <div className="text-lg font-bold">{formatNumber(marketData.dow.price)}</div>
                </div>
              )}

              {marketData?.vix && (
                <div className="card p-3 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs ghost">VIX</span>
                    <span className={`text-xs ${getChangeColor(marketData.vix.change)}`}>
                      {formatChange(marketData.vix.change)}
                    </span>
                  </div>
                  <div className="text-lg font-bold">{formatNumber(marketData.vix.price)}</div>
                </div>
              )}

              {marketData?.euro && (
                <div className="card p-3 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs ghost">EUR/USD</span>
                    <span className={`text-xs ${getChangeColor(marketData.euro.change)}`}>
                      {formatChange(marketData.euro.change)}
                    </span>
                  </div>
                  <div className="text-lg font-bold">{marketData.euro.price?.toFixed(4)}</div>
                </div>
              )}

              {marketData?.yen && (
                <div className="card p-3 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs ghost">USD/JPY</span>
                    <span className={`text-xs ${getChangeColor(marketData.yen.change)}`}>
                      {formatChange(marketData.yen.change)}
                    </span>
                  </div>
                  <div className="text-lg font-bold">{formatNumber(marketData.yen.price)}</div>
                </div>
              )}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Financial News</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.length > 0 ? news.map((article, i) => (
              <article key={i} className="news-card p-4 rounded-xl hover:border-cyan-400 transition-all">
                <div className="text-xs ghost mb-2 flex items-center justify-between">
                  <span>{article.source}</span>
                  <span>{article.datetime}</span>
                </div>
                <h3 className="font-semibold mb-2 hover:text-cyan-400 transition-colors">
                  {article.headline}
                </h3>
                {article.summary && (
                  <p className="text-sm ghost mb-3 leading-relaxed">{article.summary}</p>
                )}
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                >
                  Read more 
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </article>
            )) : (
              <div className="col-span-full text-center py-12">
                <div className="text-yellow-400 text-3xl mb-4">📰</div>
                <div className="text-lg font-semibold mb-2">No News Available</div>
                <div className="text-sm ghost">
                  News feed is currently unavailable. Please try again later.
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Market Calendar</h2>
          <div className="card p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">FOMC Meeting Minutes</div>
                  <div className="text-xs ghost">Federal Reserve Policy Decision</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Jan 29, 2025</div>
                  <div className="text-xs ghost">2:00 PM EST</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">Non-Farm Payrolls</div>
                  <div className="text-xs ghost">US Employment Report</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Feb 7, 2025</div>
                  <div className="text-xs ghost">8:30 AM EST</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">CPI Inflation Data</div>
                  <div className="text-xs ghost">Consumer Price Index Release</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Feb 12, 2025</div>
                  <div className="text-xs ghost">8:30 AM EST</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Source Footer */}
        <div className="mt-8 text-center">
          <div className="text-xs ghost">
            {dataSource === 'live' ? (
              'Market data provided by financial data APIs • Updated every 5 minutes'
            ) : (
              '📊 Demo mode with sample market data • Ready for live integration'
            )}
          </div>
        </div>
      </div>
    </>
  )
}
