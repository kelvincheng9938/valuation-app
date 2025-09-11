// components/HomePage.js - Updated with 100+ stocks marketing and modern appeal
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAllStockData } from '@/lib/api'

export default function HomePage() {
  const [inputTicker, setInputTicker] = useState('')
  const [totalStocks, setTotalStocks] = useState(100) // Default fallback
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

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputTicker.trim()) {
      router.push(`/report?ticker=${inputTicker.trim().toUpperCase()}`)
      setInputTicker('')
    }
  }

  // Featured stocks with enhanced display
  const featuredStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', price: '$260.45', change: '+1.11%', sector: 'Technology', logo: '🍎' },
    { ticker: 'TSLA', name: 'Tesla Inc.', price: '$248.87', change: '+2.34%', sector: 'Automotive', logo: '⚡' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', price: '$1,247.32', change: '+3.21%', sector: 'Semiconductors', logo: '🔥' },
    { ticker: 'META', name: 'Meta Platforms', price: '$682.47', change: '+1.84%', sector: 'Social Media', logo: '📱' },
    { ticker: '700', name: 'Tencent Holdings', price: '$320.60', change: '-0.87%', sector: 'Technology', logo: '🇭🇰' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: '$502.87', change: '+1.66%', sector: 'Software', logo: '💻' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '$230.66', change: '+0.81%', sector: 'Internet', logo: '🔍' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', price: '$218.45', change: '+1.23%', sector: 'E-commerce', logo: '📦' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-bounce delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Professional Grade Analysis
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Institutional-Grade</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Stock Valuation
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get professional analysis for <span className="text-cyan-400 font-bold">{totalStocks}+ stocks</span> with 
              real Bloomberg data, dynamic P/E valuation bands, and institutional-quality insights. 
              <span className="text-blue-400"> No more guesswork.</span>
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputTicker}
                  onChange={(e) => setInputTicker(e.target.value.toUpperCase())}
                  placeholder={`Search ${totalStocks}+ stocks (AAPL, TSLA, 700)...`}
                  className="w-full px-6 py-4 text-lg bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
              <button 
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg rounded-xl hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
              >
                Analyze
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                🔥 <span className="text-cyan-400 font-medium">100+ global stocks</span> including US tech giants & Hong Kong leaders
              </p>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{totalStocks}+</div>
              <div className="text-white font-medium">Global Stocks</div>
              <div className="text-gray-400 text-sm">US, Hong Kong & More</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">Real-Time</div>
              <div className="text-white font-medium">Bloomberg Data</div>
              <div className="text-gray-400 text-sm">Professional Grade</div>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">Dynamic</div>
              <div className="text-white font-medium">P/E Valuation</div>
              <div className="text-gray-400 text-sm">Historical Bands</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Stocks Section - Enhanced */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🚀 Most Analyzed Stocks
            </h2>
            <p className="text-lg text-gray-300">
              Join thousands of investors analyzing these market leaders
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStocks.map((stock, index) => (
              <Link
                key={stock.ticker}
                href={`/report?ticker=${stock.ticker}`}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{stock.logo}</div>
                    <div>
                      <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {stock.ticker}
                      </div>
                      <div className="text-sm text-gray-400">{stock.name}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded ${
                    stock.change.startsWith('+') ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
                  }`}>
                    {stock.change}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Price</span>
                    <span className="font-semibold text-white">{stock.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Sector</span>
                    <span className="text-sm text-gray-300">{stock.sector}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-sm text-cyan-400 group-hover:text-cyan-300 font-medium">
                    View Analysis →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose ValuationPro?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Get the same quality analysis that institutional investors use, with real Bloomberg data and professional-grade insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                📊
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Dynamic P/E Valuation</h3>
              <p className="text-gray-300 leading-relaxed">
                Historical P/E bands with 25th/50th/75th percentiles. See exactly where each stock trades relative to its history.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                🔄
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Real Bloomberg Data</h3>
              <p className="text-gray-300 leading-relaxed">
                Professional-grade financial data updated daily. No more outdated or unreliable free data sources.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Quality Scoring</h3>
              <p className="text-gray-300 leading-relaxed">
                Multi-dimensional analysis covering Value, Growth, Profitability, and Momentum with institutional scoring methodology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Analyze Your Portfolio?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of investors using professional-grade analysis to make better investment decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/report" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg rounded-xl hover:from-cyan-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              Start Analyzing
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              ✨ <span className="text-cyan-400">Free to use</span> • <span className="text-blue-400">{totalStocks}+ stocks</span> • <span className="text-purple-400">Professional data</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
