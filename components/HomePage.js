'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Navigation from './Navigation'

export default function HomePage() {
  useEffect(() => {
    // GSAP animations
    const loadGSAP = async () => {
      const gsap = (await import('gsap')).default
      gsap.from('.hero-title', { y: 30, opacity: 0, duration: 1 })
      gsap.from('.feature-card', { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.5 })
    }
    loadGSAP()
  }, [])

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
            <Link href="/report" className="btn-primary px-8 py-3 rounded-lg text-lg">
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
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Dynamic P/E Valuation</h3>
              <p className="ghost text-sm">Forward EPS × historical P/E bands. No arbitrary assumptions, just data-driven targets.</p>
            </div>
            
            <div className="feature-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Data</h3>
              <p className="ghost text-sm">Live quotes, analyst estimates, and market news from premium data providers.</p>
            </div>
            
            <div className="feature-card p-6 rounded-xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Scoring</h3>
              <p className="ghost text-sm">Multi-factor analysis: Value, Growth, Profitability, and Momentum scores.</p>
            </div>
          </div>
        </section>

        <section className="py-20 text-center">
          <div className="card p-12 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Portfolio?</h2>
            <p className="ghost text-lg mb-8">Join thousands of investors using professional valuation tools</p>
            <div className="flex gap-4 justify-center">
              <input type="text" placeholder="Enter a ticker to analyze" className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 text-white w-64" />
              <Link href="/report" className="btn-primary px-6 py-3 rounded-lg">
                Get Valuation →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
