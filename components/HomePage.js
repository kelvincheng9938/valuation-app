// components/HomePage.js - Updated version with your requested changes
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from './Navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { getAllStockData } from '@/lib/api'

export default function HomePage() {
  const [inputTicker, setInputTicker] = useState('')
  const [totalStocks, setTotalStocks] = useState(100) // Changed from 119 to 100
  const [isAnimated, setIsAnimated] = useState(false)
  const { theme } = useTheme()
  const router = useRouter()

  // Load actual stock count on mount
  useEffect(() => {
    loadStockCount()
  }, [])

  const loadStockCount = async () => {
    try {
      const allStocks = await getAllStockData()
      setTotalStocks(allStocks.length)
    } catch (error) {
      console.log('Using default stock count')
    }
  }

  useEffect(() => {
    setIsAnimated(true)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputTicker.trim()) {
      router.push(`/report?ticker=${inputTicker.trim().toUpperCase()}`)
      setInputTicker('')
    }
  }

  const popularStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: '$230.66', change: '+1.84%', sector: 'Technology' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: '$502.87', change: '+1.66%', sector: 'Software' }, // Changed from TSLA to MSFT
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: '$1,247.32', change: '+3.21%', sector: 'Semiconductors' },
    { ticker: 'META', name: 'Meta Platforms', price: '$682.47', change: '+1.84%', sector: 'Social Media' },
    { ticker: '700', name: 'Tencent Holdings', price: '$320.60', change: '-0.87%', sector: 'Technology' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '$230.66', change: '+0.81%', sector: 'Internet' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', price: '$218.45', change: '+1.23%', sector: 'E-commerce' },
    { ticker: 'CRM', name: 'Salesforce Inc.', price: '$350.25', change: '+2.15%', sector: 'Software' }
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Institutional-Grade Stock Valuation
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Professional Analysis for
              <span className="block gradient-text">100+ Global Stocks</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Get institutional-quality valuation analysis with dynamic P/E bands, 
              real Bloomberg data, and comprehensive financial insights.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputTicker}
                  onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                  placeholder="Search 100+ stocks (AAPL, MSFT, NVDA)..."
                  className="flex-1 px-4 py-3 text-lg rounded-lg focus:ring-2 focus:ring-cyan-400"
                />
                <button 
                  type="submit"
                  className="btn-primary px-6 py-3 rounded-lg text-lg font-semibold"
                >
                  Analyze
                </button>
              </div>
            </form>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="feature-card p-6 rounded-xl text-center floating" style={{ animationDelay: '0s' }}>
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Dynamic P/E Valuation</h3>
                <p className="text-sm opacity-80">Historical P/E bands with 25th/50th/75th percentiles for precise valuation ranges.</p>
              </div>
              <div className="feature-card p-6 rounded-xl text-center floating" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-2">Real-Time Data</h3>
                <p className="text-sm opacity-80">Professional-grade financial data updated daily from Bloomberg Terminal sources.</p>
              </div>
              <div className="feature-card p-6 rounded-xl text-center floating" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Quality Scoring</h3>
                <p className="text-sm opacity-80">Multi-dimensional analysis covering Value, Growth, Profitability, and Momentum.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Stocks Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Most Analyzed Stocks
            </h2>
            <p className="text-lg opacity-80">
              Professional analysis for market leaders across global exchanges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularStocks.map((stock, index) => (
              <button
                key={stock.ticker}
                onClick={() => router.push(`/report?ticker=${stock.ticker}`)}
                className="feature-card p-6 rounded-xl hover:scale-105 transition-all duration-300 text-left"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-lg">{stock.ticker}</div>
                    <div className="text-sm opacity-60">{stock.name}</div>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded ${
                    stock.change.startsWith('+') ? 
                    'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
                  }`}>
                    {stock.change}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-60">Price</span>
                    <span className="font-semibold">{stock.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm opacity-60">Sector</span>
                    <span className="text-sm">{stock.sector}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="text-sm text-cyan-400 font-medium">
                    View Analysis →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Analyzing?
          </h2>
          <p className="text-lg mb-8 opacity-80">
            Join thousands of investors using professional-grade analysis to make better decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/report')}
              className="btn-primary px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Start Free Analysis
            </button>
            <button 
              onClick={() => router.push('/about')}
              className="btn-secondary px-8 py-4 rounded-lg text-lg font-semibold"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm opacity-60">
              © 2024 ValuationPro. Professional demo experience for educational purposes.
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
