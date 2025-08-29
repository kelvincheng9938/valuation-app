'use client'
import Link from 'next/link'
import Navigation from './Navigation'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <section className="text-center py-20">
          <h1 className="text-6xl font-bold mb-6 hero-title">Institutional-Grade Stock Valuation</h1>
          <p className="text-xl ghost mb-8 max-w-3xl mx-auto">
            Professional analysis powered by forward EPS estimates, dynamic P/E bands, and real-time market data
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/report" className="btn-primary px-8 py-3 rounded-lg text-lg inline-block">
              Start Analysis →
            </Link>
            <button className="btn px-8 py-3 rounded-lg text-lg">
              Watch Demo
            </button>
          </div>
          
          <div className="mt-16 floating">
            <div className="card p-4 max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                <div className="chip p-3 text-center">
                  <div className="text-2xl font-bold text-cyan-400">$207.14</div>
                  <div className="text-xs ghost">GOOGL Price</div>
                </div>
                <div className="chip p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">+18.5%</div>
                  <div className="text-xs ghost">Upside to Mid</div>
                </div>
                <div className="chip p-3 text-center">
                  <div className="text-2xl font-bold">8.2/10</div>
                  <div className="text-xs ghost">Value Score</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Professionals Choose ValuationPro</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Dynamic P/E Valuation</h3>
              <p className="ghost text-sm">Forward EPS × historical P/E bands. No arbitrary assumptions.</p>
            </div>
            <div className="feature-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Real-Time Data</h3>
              <p className="ghost text-sm">Live quotes and analyst estimates from premium providers.</p>
            </div>
            <div className="feature-card p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Quality Scoring</h3>
              <p className="ghost text-sm">Multi-factor analysis across value, growth, and momentum.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
