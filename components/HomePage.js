'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'

export default function HomePage() {
  const [demoCount] = useState(30)
  const [featuredStock, setFeaturedStock] = useState('AAPL')
  const [isVisible, setIsVisible] = useState(false)

  // Rotate featured stock every 5 seconds
  const featuredStocks = ['AAPL', 'MSFT', 'GOOGL', 'NVDA', 'META']
  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setFeaturedStock(prev => {
        const currentIndex = featuredStocks.indexOf(prev)
        return featuredStocks[(currentIndex + 1) % featuredStocks.length]
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const popularStocks = [
    { ticker: 'AAPL', name: 'Apple', price: '$234.87', change: '+0.53%', sector: 'Technology', logo: '🍎' },
    { ticker: 'MSFT', name: 'Microsoft', price: '$445.23', change: '+0.65%', sector: 'Technology', logo: '🪟' },
    { ticker: 'GOOGL', name: 'Alphabet', price: '$182.45', change: '+1.19%', sector: 'Technology', logo: '🔍' },
    { ticker: 'NVDA', name: 'NVIDIA', price: '$148.67', change: '+1.31%', sector: 'Semiconductors', logo: '🚀' },
    { ticker: 'META', name: 'Meta', price: '$612.89', change: '+1.40%', sector: 'Social Media', logo: '👥' },
    { ticker: 'TSLA', name: 'Tesla', price: '$252.45', change: '+1.57%', sector: 'Automotive', logo: '⚡' },
    { ticker: 'CRM', name: 'Salesforce', price: '$298.45', change: '+1.59%', sector: 'Software', logo: '☁️' },
    { ticker: 'LLY', name: 'Eli Lilly', price: '$892.45', change: '+2.14%', sector: 'Healthcare', logo: '💊' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Light Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ValuationPro
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-900 font-medium">Home</Link>
                <Link href="/report" className="text-gray-600 hover:text-gray-900 transition-colors">Analysis</Link>
                <Link href="/news" className="text-gray-600 hover:text-gray-900 transition-colors">News</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">Demo Active</span>
              </div>
              <Link 
                href="/report" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #3b82f6 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 font-medium text-sm">
                  🎯 {demoCount} Professional Stock Reports Available
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Institutional-Grade
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Stock Analysis
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Professional investment research with forward EPS estimates, dynamic P/E valuation bands, 
                and comprehensive financial analysis. 
                <span className="font-semibold text-blue-600"> Experience institutional-quality insights.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link 
                  href="/report" 
                  className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105"
                >
                  Start Analysis 
                  <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
                </Link>
                <Link 
                  href="/report?ticker=NVDA" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                >
                  View NVIDIA Report
                </Link>
              </div>
            </div>

            {/* Interactive Demo Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-blue-600">30+</div>
                <div className="text-gray-600 font-medium">Premium Stocks</div>
                <div className="text-xs text-gray-500 mt-1">FAANG + Major Companies</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-gray-600 font-medium">Realistic Data</div>
                <div className="text-xs text-gray-500 mt-1">Current Market Conditions</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-purple-600">5+</div>
                <div className="text-gray-600 font-medium">Analysis Types</div>
                <div className="text-xs text-gray-500 mt-1">Comprehensive Research</div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="text-3xl font-bold text-orange-600">$0</div>
                <div className="text-gray-600 font-medium">Free Demo</div>
                <div className="text-xs text-gray-500 mt-1">No Registration Required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Stocks Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore Popular Stocks
            </h2>
            <p className="text-lg text-gray-600">
              Get instant access to professional analysis for major companies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularStocks.map((stock, index) => (
              <Link
                key={stock.ticker}
                href={`/report?ticker=${stock.ticker}`}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{stock.logo}</div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {stock.ticker}
                      </div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded ${
                    stock.change.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                  }`}>
                    {stock.change}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="font-semibold text-gray-900">{stock.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Sector</span>
                    <span className="text-sm text-gray-700">{stock.sector}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                    View Analysis →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ValuationPro?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Professional-grade analysis tools used by institutional investors, 
              now accessible with our comprehensive demo experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dynamic P/E Valuation</h3>
              <p className="text-gray-600 leading-relaxed">
                Forward EPS estimates combined with historical P/E percentile bands. 
                Data-driven valuation analysis without arbitrary assumptions.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comprehensive Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Multi-factor quality scoring, peer comparisons, segment analysis, 
                and professional investment thesis with detailed risk assessment.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Interactive Charts</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional-grade visualizations with radar charts, bubble plots, 
                and dynamic valuation bands. Explore data like institutional analysts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Experience Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Experience Professional Analysis
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our demo provides the same institutional-grade analysis used by professional investors. 
                  Explore comprehensive stock reports with real financial models and data-driven insights.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Forward EPS estimates and P/E valuation bands</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Peer comparison and competitive analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Investment thesis with strengths and risks</span>
                  </div>
                </div>
                
                <Link 
                  href="/report" 
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Try Demo Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{featuredStock}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {featuredStock === 'AAPL' ? 'Apple Inc.' :
                           featuredStock === 'MSFT' ? 'Microsoft Corp.' :
                           featuredStock === 'GOOGL' ? 'Alphabet Inc.' :
                           featuredStock === 'NVDA' ? 'NVIDIA Corp.' : 'Meta Platforms'}
                        </h3>
                        <p className="text-gray-500 text-sm">Technology</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${featuredStock === 'AAPL' ? '234.87' :
                          featuredStock === 'MSFT' ? '445.23' :
                          featuredStock === 'GOOGL' ? '182.45' :
                          featuredStock === 'NVDA' ? '148.67' : '612.89'}
                      </div>
                      <div className="text-green-600 text-sm font-medium">+1.25%</div>
                    </div>
                  </div>
                  
                  {/* Quality Scores */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-500">6.8</div>
                      <div className="text-xs text-gray-500">Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-500">8.2</div>
                      <div className="text-xs text-gray-500">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-500">9.0</div>
                      <div className="text-xs text-gray-500">Profit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-500">7.9</div>
                      <div className="text-xs text-gray-500">Momentum</div>
                    </div>
                  </div>
                  
                  {/* Valuation Bar */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Undervalued</span>
                      <span className="font-medium">Fair Value</span>
                      <span>Overvalued</span>
                    </div>
                    <div className="relative h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full">
                      <div className="absolute top-0 left-1/3 w-1 h-2 bg-gray-900 rounded-full"></div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-xs font-medium text-gray-700">Current Price</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                      Live Demo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Analyze Like a Pro?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands exploring professional stock analysis with our comprehensive demo experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/report" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg"
            >
              Start Free Demo
            </Link>
            <Link 
              href="/report?ticker=LLY" 
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              Explore Eli Lilly
            </Link>
          </div>
          <p className="mt-4 text-sm text-blue-100">
            ✨ 30 major stocks • Professional features • No signup required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                ValuationPro
              </div>
              <p className="text-gray-400 mb-6">
                Professional stock analysis with institutional-grade features. 
                Experience comprehensive financial research.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">💼</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">📊</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">📈</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Popular Stocks</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/report?ticker=AAPL" className="hover:text-white transition-colors">Apple (AAPL)</Link></li>
                <li><Link href="/report?ticker=NVDA" className="hover:text-white transition-colors">NVIDIA (NVDA)</Link></li>
                <li><Link href="/report?ticker=MSFT" className="hover:text-white transition-colors">Microsoft (MSFT)</Link></li>
                <li><Link href="/report?ticker=GOOGL" className="hover:text-white transition-colors">Alphabet (GOOGL)</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Analysis Tools</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Valuation Models</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Peer Comparison</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Quality Scoring</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Risk Assessment</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Demo Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Investment Education</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              &copy; 2025 ValuationPro. Professional demo experience for educational purposes.
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
