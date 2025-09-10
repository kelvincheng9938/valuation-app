// components/HomePage.js - Fixed Light Mode & Removed Market Indices
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
          
          <p className="text-xl md:text-2xl ghost mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional analysis tools powered by Bloomberg terminal 
            investment decisions with our comprehensive screening system.
          </p>

          {/* Ticker Search */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="text"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                placeholder="Enter ticker (e.g., AAPL)"
                className="flex-1 px-6 py-4 rounded-lg bg-black/20 border border-white/10 text-white placeholder-white/50 focus:border-cyan-400 focus:outline-none text-lg backdrop-blur-sm [data-theme='light'] &:bg-white/80 [data-theme='light'] &:text-gray-900 [data-theme='light'] &:placeholder-gray-500 [data-theme='light'] &:border-gray-200"
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => router.push('/report?ticker=AAPL')}
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-lg"
            >
              Start Analysis →
            </button>
            <button
              onClick={() => router.push('/report?ticker=TSLA')}
              className="btn px-8 py-4 text-lg rounded-lg border-2 hover:border-cyan-400"
              style={{
                borderColor: 'var(--line)',
                background: 'var(--hover-bg)',
                color: 'var(--text-primary)'
              }}
            >
              View Demo
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
              Comprehensive analysis powered by real-time financial data and advanced modeling techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card p-8 rounded-2xl text-center group">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Dynamic P/E Valuation
              </h3>
              <p className="ghost">
                Forward-looking valuation using analyst estimates and historical P/E distribution bands for accurate price targets.
              </p>
            </div>

            <div className="feature-card p-8 rounded-2xl text-center group">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Real-time Data
              </h3>
              <p className="ghost">
                Live market data, earnings estimates, and financial metrics updated continuously from premium sources.
              </p>
            </div>

            <div className="feature-card p-8 rounded-2xl text-center group">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                Quality Scoring
              </h3>
              <p className="ghost">
                Multi-dimensional analysis covering value, growth, profitability, and momentum across all major metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Examples */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            Try These Examples
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'NVDA', 'META', 'AMZN', 'NFLX'].map((symbol) => (
              <button
                key={symbol}
                onClick={() => router.push(`/report?ticker=${symbol}`)}
                className="chip p-4 rounded-lg font-semibold hover:border-cyan-400 transition-all"
                style={{
                  background: 'var(--hover-bg)',
                  borderColor: 'var(--line)',
                  color: 'var(--text-primary)'
                }}
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="ghost text-sm">
              Professional demo experience for educational purposes.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Demo Mode Active
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
