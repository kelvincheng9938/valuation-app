// components/HomePage.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from './Navigation'

export default function HomePage() {
  const [ticker, setTicker] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (ticker.trim()) {
      router.push(`/report?ticker=${ticker.trim().toUpperCase()}`)
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="floating">
            <h1 className="text-5xl md:text-7xl font-bold hero-title mb-6">
              Institutional-Grade
              <br />
              Stock Valuation
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl ghost mb-4 max-w-2xl mx-auto leading-relaxed">
            Professional analysis powered by Bloomberg Terminal data
          </p>
          
          {/* New Badge */}
          <div className="flex justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
              <span className="text-cyan-400 font-semibold">📊 100+ Stocks</span>
              <span className="text-cyan-300/80 text-sm">US & Hong Kong Markets</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30">
              <span className="text-green-400 font-semibold">✨ Real-Time Data</span>
            </div>
          </div>

          {/* Ticker Search */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Enter ticker (e.g., AAPL, ISRG)"
                className="flex-1 px-6 py-4 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none text-lg backdrop-blur-sm"
                style={{
                  background: 'var(--bg)',
                  borderColor: 'var(--line)',
                  color: 'var(--text-primary)'
                }}
              />
              <button
                type="submit"
                className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg whitespace-nowrap"
              >
                Start Analysis →
              </button>
            </div>
          </form>

          {/* Popular Stocks */}
          <div className="mb-8">
            <p className="text-sm ghost mb-3">Popular Searches</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['AAPL', 'NVDA', 'TSLA', 'GOOGL', 'ISRG', 'META', '700.HK', 'MSFT', 'LLY'].map(popularTicker => (
                <button
                  key={popularTicker}
                  onClick={() => router.push(`/report?ticker=${popularTicker.replace('.HK', '')}`)}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 hover:from-purple-500/20 hover:to-pink-500/20 text-sm font-medium transition-all hover:transform hover:scale-105"
                >
                  {popularTicker}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => router.push('/report?ticker=AAPL')}
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg"
            >
              View Example Report
            </button>
            <button
              onClick={() => router.push('/report?ticker=ISRG')}
              className="btn px-8 py-4 text-lg rounded-lg border-2 hover:border-cyan-400"
              style={{
                borderColor: 'var(--line)',
                background: 'var(--hover-bg)',
                color: 'var(--text-primary)'
              }}
            >
              Healthcare Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Professional Valuation Tools
            </h2>
            <p className="text-xl ghost max-w-2xl mx-auto">
              Comprehensive analysis covering 100+ stocks across technology, healthcare, consumer, and Hong Kong markets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6 hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3">Forward EPS Analysis</h3>
              <p className="ghost">
                3-year forward earnings projections with P/E band valuation methodology
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Quality Scoring</h3>
              <p className="ghost">
                Multi-factor scoring across value, growth, profitability, and momentum metrics
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-3">Peer Comparison</h3>
              <p className="ghost">
                Industry peer analysis with market cap and valuation multiples visualization
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-6 hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">🌏</div>
              <h3 className="text-xl font-semibold mb-3">Global Coverage</h3>
              <p className="ghost">
                100+ stocks including US tech giants, healthcare leaders, and Hong Kong listings
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card p-6 hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Insights</h3>
              <p className="ghost">
                Automated strength and risk analysis with segment revenue breakdowns
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card p-6 hover:transform hover:scale-105 transition-all">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="text-xl font-semibold mb-3">Real-Time News</h3>
              <p className="ghost">
                Latest company news and market updates integrated into every analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400">100+</div>
                <div className="text-sm ghost mt-1">Stocks Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">3-Year</div>
                <div className="text-sm ghost mt-1">EPS Forecasts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">4</div>
                <div className="text-sm ghost mt-1">Quality Factors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">Real-Time</div>
                <div className="text-sm ghost mt-1">Market Data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Stocks Grid */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse Our Coverage</h2>
            <p className="text-lg ghost">Select from 100+ stocks across multiple sectors and markets</p>
          </div>
          
          <div className="grid gap-6">
            {/* Tech Stocks */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-400">🚀 Technology Leaders</h3>
              <div className="flex flex-wrap gap-2">
                {['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'AMD', 'INTC', 'CRM', 'NOW', 'QCOM'].map(t => (
                  <button
                    key={t}
                    onClick={() => router.push(`/report?ticker=${t}`)}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-sm font-medium transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Healthcare */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-400">🏥 Healthcare Innovation</h3>
              <div className="flex flex-wrap gap-2">
                {['LLY', 'UNH', 'JNJ', 'PFE', 'ABBV', 'MRK', 'TMO', 'ABT', 'ISRG', 'CVS'].map(t => (
                  <button
                    key={t}
                    onClick={() => router.push(`/report?ticker=${t}`)}
                    className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-sm font-medium transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Consumer */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-purple-400">🛍️ Consumer Giants</h3>
              <div className="flex flex-wrap gap-2">
                {['AMZN', 'TSLA', 'WMT', 'HD', 'COST', 'NKE', 'SBUX', 'MCD', 'DIS', 'NFLX'].map(t => (
                  <button
                    key={t}
                    onClick={() => router.push(`/report?ticker=${t}`)}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 text-sm font-medium transition-all"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Hong Kong */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-orange-400">🇭🇰 Hong Kong Market</h3>
              <div className="flex flex-wrap gap-2">
                {['700', '9988', '3690', '1810', '2318', '388', '5', '1299', '2020', '9618'].map(t => (
                  <button
                    key={t}
                    onClick={() => router.push(`/report?ticker=${t}`)}
                    className="px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 text-sm font-medium transition-all"
                  >
                    {t}.HK
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="ghost text-sm">
            Professional stock valuation platform with 100+ stocks • Real-time data • Bloomberg Terminal quality
          </p>
        </div>
      </footer>
    </div>
  )
}
