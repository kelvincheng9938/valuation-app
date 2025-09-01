'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'

export default function HomePage() {
  const [demoCount, setDemoCount] = useState(29)
  const [featuredStock, setFeaturedStock] = useState('AAPL')

  // Rotate featured stock every 4 seconds
  const featuredStocks = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META']
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedStock(prev => {
        const currentIndex = featuredStocks.indexOf(prev)
        return featuredStocks[(currentIndex + 1) % featuredStocks.length]
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation isHomePage={true} />
      
      {/* Hero Section - Enhanced for Demo */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 relative overflow-hidden">
        {/* Floating Elements Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-700 font-medium text-sm">
                    🎯 {demoCount} Professional Demo Reports Available
                  </span>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Institutional-Grade 
                <span className="text-blue-600 block"> Stock Analysis</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience professional investment research powered by forward EPS estimates, 
                dynamic P/E valuation bands, and comprehensive financial analysis. 
                <span className="text-blue-600 font-semibold"> Try our interactive demo.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/report" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Explore Demo Reports →
                </Link>
                <div className="flex gap-2">
                  {['AAPL', 'MSFT', 'GOOGL', 'NVDA'].map(ticker => (
                    <Link
                      key={ticker}
                      href={`/report?ticker=${ticker}`}
                      className={`border-2 border-blue-200 hover:border-blue-400 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm ${
                        featuredStock === ticker ? 'bg-blue-50 border-blue-400' : ''
                      }`}
                    >
                      {ticker}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Demo Features Highlight */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">30</div>
                    <div className="text-xs text-gray-600">Major Stocks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-600">Realistic Data</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">5</div>
                    <div className="text-xs text-gray-600">Analysis Types</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">0</div>
                    <div className="text-xs text-gray-600">Cost to Try</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Enhanced Demo Analysis Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">{featuredStock}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {featuredStock === 'AAPL' ? 'Apple Inc.' : 
                         featuredStock === 'MSFT' ? 'Microsoft Corp.' : 
                         featuredStock === 'GOOGL' ? 'Alphabet Inc.' : 
                         featuredStock === 'NVDA' ? 'NVIDIA Corp.' : 'Meta Platforms'}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {featuredStock === 'NVDA' ? 'Semiconductors' : 'Technology'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 transition-all duration-500">
                      ${featuredStock === 'AAPL' ? '235.42' : 
                        featuredStock === 'MSFT' ? '441.58' : 
                        featuredStock === 'GOOGL' ? '178.42' : 
                        featuredStock === 'NVDA' ? '146.25' : '598.34'}
                    </div>
                    <div className="text-green-600 text-sm font-medium">
                      +{featuredStock === 'NVDA' ? '2.72' : '1.58'}%
                    </div>
                  </div>
                </div>
                
                {/* Dynamic Quality Scores */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600 transition-all duration-500">
                      {featuredStock === 'AAPL' ? '6.2' : 
                       featuredStock === 'MSFT' ? '7.1' : 
                       featuredStock === 'GOOGL' ? '8.1' : 
                       featuredStock === 'NVDA' ? '5.4' : '7.8'}
                    </div>
                    <div className="text-xs text-gray-600">Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 transition-all duration-500">
                      {featuredStock === 'AAPL' ? '7.8' : 
                       featuredStock === 'MSFT' ? '8.4' : 
                       featuredStock === 'GOOGL' ? '7.9' : 
                       featuredStock === 'NVDA' ? '9.8' : '8.2'}
                    </div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 transition-all duration-500">
                      {featuredStock === 'AAPL' ? '9.1' : 
                       featuredStock === 'MSFT' ? '9.3' : 
                       featuredStock === 'GOOGL' ? '8.7' : 
                       featuredStock === 'NVDA' ? '9.2' : '8.9'}
                    </div>
                    <div className="text-xs text-gray-600">Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 transition-all duration-500">
                      {featuredStock === 'AAPL' ? '7.4' : 
                       featuredStock === 'MSFT' ? '8.0' : 
                       featuredStock === 'GOOGL' ? '7.6' : 
                       featuredStock === 'NVDA' ? '9.4' : '8.7'}
                    </div>
                    <div className="text-xs text-gray-600">Momentum</div>
                  </div>
                </div>
                
                {/* Interactive Valuation Bar */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Undervalued</span>
                    <span className="font-medium">Fair Value Range</span>
                    <span>Overvalued</span>
                  </div>
                  <div className="relative h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full">
                    <div className={`absolute top-0 w-1 h-3 bg-gray-900 rounded-full transition-all duration-500 ${
                      featuredStock === 'AAPL' ? 'left-1/3' : 
                      featuredStock === 'MSFT' ? 'left-2/5' : 
                      featuredStock === 'GOOGL' ? 'left-1/4' : 
                      featuredStock === 'NVDA' ? 'left-3/4' : 'left-1/2'
                    }`}></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs font-medium text-gray-700">Current Price</span>
                  </div>
                </div>

                {/* Demo Badge */}
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    Interactive Demo Active
                  </span>
                </div>
              </div>
              
              {/* Floating Demo Indicators */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                <div className="font-bold text-sm">Live Charts</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg animate-pulse">
                <div className="font-bold text-sm">Real Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of your existing sections... */}
      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Demo Experience?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience all professional features with 30 carefully curated stocks. 
              <span className="text-blue-600 font-semibold"> No registration required.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Realistic Valuation Models</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Forward EPS estimates combined with company-specific historical P/E bands. 
                <span className="text-blue-600 font-medium"> No assumptions - pure data-driven analysis.</span>
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">30 Premium Stocks</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                FAANG, major tech, healthcare, finance, and more. Each with complete 
                financial analysis including peers, segments, and investment thesis.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Institutional Features</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Multi-factor quality scoring, peer analysis, segment breakdowns, and 
                professional investment thesis with strengths and risks assessment.
              </p>
            </div>
          </div>

          {/* Popular Demo Stocks Showcase */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Explore Popular Demo Stocks
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { ticker: 'AAPL', name: 'Apple', price: '$235.42', change: '+1.58%' },
                { ticker: 'MSFT', name: 'Microsoft', price: '$441.58', change: '-0.72%' },
                { ticker: 'GOOGL', name: 'Alphabet', price: '$178.42', change: '+1.06%' },
                { ticker: 'NVDA', name: 'NVIDIA', price: '$146.25', change: '+2.72%' },
                { ticker: 'META', name: 'Meta', price: '$598.34', change: '+2.13%' }
              ].map(stock => (
                <Link
                  key={stock.ticker}
                  href={`/report?ticker=${stock.ticker}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xs">{stock.ticker}</span>
                    </div>
                    <div className={`text-xs font-medium ${
                      stock.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {stock.name}
                  </div>
                  <div className="text-sm text-gray-600">{stock.price}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced for Demo */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Professional Analysis?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Explore all 30 demo reports with institutional-grade features. 
            <span className="font-semibold"> No signup required.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/report" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg">
              Start Exploring Demo
            </Link>
            <Link href="/report?ticker=NVDA" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
              Try NVIDIA Report
            </Link>
          </div>
          <p className="mt-4 text-sm opacity-75">
            ✨ Full features available • 30 major stocks • Interactive charts
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ValuationPro</h3>
              <p className="text-gray-400 text-sm">
                Professional stock analysis with institutional-grade features. 
                <span className="text-blue-400"> Try our demo today.</span>
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Demo Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/report" className="hover:text-white transition-colors">Stock Reports</a></li>
                <li><a href="/report?ticker=AAPL" className="hover:text-white transition-colors">Apple Analysis</a></li>
                <li><a href="/report?ticker=NVDA" className="hover:text-white transition-colors">NVIDIA Report</a></li>
                <li><a href="/report?ticker=MSFT" className="hover:text-white transition-colors">Microsoft Study</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Popular Stocks</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/report?ticker=GOOGL" className="hover:text-white transition-colors">Alphabet (GOOGL)</a></li>
                <li><a href="/report?ticker=META" className="hover:text-white transition-colors">Meta Platforms</a></li>
                <li><a href="/report?ticker=TSLA" className="hover:text-white transition-colors">Tesla Motors</a></li>
                <li><a href="/report?ticker=AMZN" className="hover:text-white transition-colors">Amazon</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Demo Overview</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ValuationPro. Professional demo experience. All data for demonstration purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
