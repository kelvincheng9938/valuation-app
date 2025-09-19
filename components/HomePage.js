'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import { ErrorBoundary } from './ErrorBoundary'

export default function HomePage() {
  const router = useRouter()
  const [ticker, setTicker] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!ticker.trim()) return
    
    setIsLoading(true)
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300))
    router.push(`/report?ticker=${ticker.toUpperCase()}`)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAnalyze()
    }
  }

  // Demo stocks for showcase
  const featuredStocks = [
    { 
      ticker: 'AAPL', 
      name: 'Apple Inc.', 
      price: '$230.66', 
      change: '+0.47%', 
      sector: 'Technology' 
    },
    { 
      ticker: 'MSFT', 
      name: 'Microsoft Corp.', 
      price: '$502.87', 
      change: '+0.90%', 
      sector: 'Software' 
    },
    { 
      ticker: 'NVDA', 
      name: 'NVIDIA Corp.', 
      price: '$1,247.32', 
      change: '+1.23%', 
      sector: 'Semiconductors' 
    },
    { 
      ticker: 'META', 
      name: 'Meta Platforms', 
      price: '$682.47', 
      change: '+2.15%', 
      sector: 'Social Media' 
    },
    { 
      ticker: '700', 
      name: 'Tencent Holdings', 
      price: '$320.60', 
      change: '-0.87%', 
      sector: 'Technology' 
    },
    { 
      ticker: 'GOOGL', 
      name: 'Alphabet Inc.', 
      price: '$230.66', 
      change: '+0.81%', 
      sector: 'Internet' 
    },
    { 
      ticker: 'AMZN', 
      name: 'Amazon.com Inc.', 
      price: '$218.45', 
      change: '+1.23%', 
      sector: 'E-commerce' 
    },
    { 
      ticker: 'CRM', 
      name: 'Salesforce Inc.', 
      price: '$350.25', 
      change: '+2.15%', 
      sector: 'Software' 
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation isHomePage={true} />
      
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded-full">
            <span className="text-cyan-400 text-sm font-medium">Institutional-Grade Stock Valuation</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-title">
            Professional Analysis for<br />
            <span className="text-gradient">100+ Global Stocks</span>
          </h1>
          
          <p className="text-xl mb-10 opacity-80 max-w-3xl mx-auto">
            Get institutional-quality valuation analysis with dynamic P/E bands, real Bloomberg 
            data, and comprehensive financial insights.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search 100+ stocks (AAPL, MSFT, NV..."
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              />
              <button
                onClick={handleAnalyze}
                disabled={!ticker.trim() || isLoading}
                className="btn-primary px-8 py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Analyze'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Dynamic P/E Valuation */}
            <div className="feature-card group">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-3">Dynamic P/E Valuation</h3>
              <p className="opacity-80 mb-4">
                Historical P/E bands with 25th/50th/75th percentiles for 
                precise valuation ranges.
              </p>
              <div className="text-cyan-400 text-sm font-medium">
                No fixed 20/25/30x assumptions →
              </div>
            </div>

            {/* Real-Time Data */}
            <div className="feature-card group">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Data</h3>
              <p className="opacity-80 mb-4">
                Professional-grade financial data updated daily from Bloomberg 
                Terminal sources.
              </p>
              <div className="text-cyan-400 text-sm font-medium">
                Institutional accuracy →
              </div>
            </div>

            {/* Quality Scoring */}
            <div className="feature-card group">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Quality Scoring</h3>
              <p className="opacity-80 mb-4">
                Multi-dimensional analysis covering Value, Growth, Profitability, 
                and Momentum.
              </p>
              <div className="text-cyan-400 text-sm font-medium">
                4-factor analysis →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Most Analyzed Stocks */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Most Analyzed Stocks
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStocks.map((stock) => (
              <button
                key={stock.ticker}
                onClick={() => router.push(`/report?ticker=${stock.ticker}`)}
                className="stock-card group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-bold text-lg">{stock.ticker}</div>
                    <div className="text-sm opacity-60">{stock.name}</div>
                  </div>
                  <div className={`text-sm px-2 py-1 rounded-full ${
                    stock.change.startsWith('+') 
                      ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
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
              © 2024 ValuationPro. Professional stock analysis platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
