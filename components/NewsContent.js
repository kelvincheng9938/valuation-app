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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {marketData ? (
              <>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">S&P 500</span>
                    <span className={`text-xs ${marketData.spy?.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.spy?.change >= 0 ? '+' : ''}{marketData.spy?.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{marketData.spy?.price.toLocaleString()}</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">NASDAQ</span>
                    <span className={`text-xs ${marketData.nasdaq?.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.nasdaq?.change >= 0 ? '+' : ''}{marketData.nasdaq?.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{marketData.nasdaq?.price.toLocaleString()}</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">Bitcoin</span>
                    <span className={`text-xs ${marketData.btc?.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.btc?.change >= 0 ? '+' : ''}{marketData.btc?.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">${marketData.btc?.price.toLocaleString()}</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">Gold</span>
                    <span className={`text-xs ${marketData.gold?.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.gold?.change >= 0 ? '+' : ''}{marketData.gold?.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">${marketData.gold?.price.toLocaleString()}</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">Oil WTI</span>
                    <span className={`text-xs ${marketData.oil?.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {marketData.oil?.change >= 0 ? '+' : ''}{marketData.oil?.change.toFixed(2)}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">${marketData.oil?.price}</div>
                </div>
              </>
            ) : (
              // Static fallback for exactly 5 indices
              <>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">S&P 500</span>
                    <span className="text-xs text-green-400">+0.73%</span>
                  </div>
                  <div className="text-2xl font-bold">5,974</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">NASDAQ</span>
                    <span className="text-xs text-green-400">+0.98%</span>
                  </div>
                  <div className="text-2xl font-bold">19,765</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">Bitcoin</span>
                    <span className="text-xs text-red-400">-2.14%</span>
                  </div>
                  <div className="text-2xl font-bold">$94,852</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">Gold</span>
                    <span className="text-xs text-green-400">+0.45%</span>
                  </div>
                  <div className="text-2xl font-bold">$2,635</div>
                </div>
                <div className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs ghost">Oil WTI</span>
                    <span className="text-xs text-red-400">-1.23%</span>
                  </div>
                  <div className="text-2xl font-bold">$70.10</div>
                </div>
              </>
            )}
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
                  <div className="text-xs ghost mb-2">2 hours ago · Reuters</div>
                  <h3 className="font-semibold mb-2">Fed Minutes Suggest Slower Pace of Rate Cuts in 2025</h3>
                  <p className="text-sm ghost mb-3">Federal Reserve officials indicated a more cautious approach to monetary easing amid persistent inflation concerns...</p>
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
                  <div className="text-xs ghost mb-2">3 hours ago · Bloomberg</div>
                  <h3 className="font-semibold mb-2">Tech Giants Lead Market Rally on AI Optimism</h3>
                  <p className="text-sm ghost mb-3">Major technology stocks pushed indices higher as investors bet on continued AI-driven growth...</p>
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
                  <div className="text-xs ghost mb-2">4 hours ago · WSJ</div>
                  <h3 className="font-semibold mb-2">China Economic Data Shows Mixed Recovery Signals</h3>
                  <p className="text-sm ghost mb-3">Latest indicators from China point to uneven recovery as manufacturing rebounds while property remains weak...</p>
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
                  <div className="text-xs ghost mb-2">5 hours ago · Financial Times</div>
                  <h3 className="font-semibold mb-2">European Banks Report Strong Q4 Earnings</h3>
                  <p className="text-sm ghost mb-3">Major European lenders beat expectations on higher interest income and lower provisions...</p>
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
                  <div className="text-xs ghost mb-2">6 hours ago · CNBC</div>
                  <h3 className="font-semibold mb-2">Oil Prices Slide on Demand Concerns</h3>
                  <p className="text-sm ghost mb-3">Crude futures fell as weak economic data raised concerns about global energy demand...</p>
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
                  <div className="text-xs ghost mb-2">7 hours ago · MarketWatch</div>
                  <h3 className="font-semibold mb-2">Bitcoin Consolidates Below $100k Resistance</h3>
                  <p className="text-sm ghost mb-3">Cryptocurrency markets pause after recent rally as traders await regulatory clarity...</p>
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
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="card p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">FOMC Meeting Minutes</div>
                  <div className="text-xs ghost">Federal Reserve</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Jan 3, 2025</div>
                  <div className="text-xs ghost">2:00 PM EST</div>
                </div>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <div className="font-semibold">Non-Farm Payrolls</div>
                  <div className="text-xs ghost">BLS</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Jan 10, 2025</div>
                  <div className="text-xs ghost">8:30 AM EST</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">CPI Data Release</div>
                  <div className="text-xs ghost">Bureau of Labor Statistics</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">Jan 15, 2025</div>
                  <div className="text-xs ghost">8:30 AM EST</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
