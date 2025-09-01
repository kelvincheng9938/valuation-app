// components/HomePage.js - Modern Light Mode Design like SimplyWall.St
'use client'
import Link from 'next/link'
import Navigation from './Navigation'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation isHomePage={true} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Institutional-Grade 
                <span className="text-blue-600"> Stock Analysis</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Professional investment research powered by forward EPS estimates, 
                dynamic P/E valuation bands, and comprehensive financial analysis. 
                Make informed decisions with institutional-quality insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/report" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 text-center shadow-lg hover:shadow-xl">
                  Start Analysis →
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
                  Watch Demo
                </button>
              </div>
              
              {/* Demo Badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 font-medium text-sm">29 Professional Demo Reports Available</span>
              </div>
            </div>
            
            <div className="relative">
              {/* Sample Analysis Card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">AAPL</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Apple Inc.</h3>
                      <p className="text-gray-500 text-sm">Technology</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$235.42</div>
                    <div className="text-green-600 text-sm font-medium">+1.58%</div>
                  </div>
                </div>
                
                {/* Mini Quality Scores */}
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">6.2</div>
                    <div className="text-xs text-gray-600">Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">7.8</div>
                    <div className="text-xs text-gray-600">Growth</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">9.1</div>
                    <div className="text-xs text-gray-600">Profit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">7.4</div>
                    <div className="text-xs text-gray-600">Momentum</div>
                  </div>
                </div>
                
                {/* Valuation Bar */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Undervalued</span>
                    <span>Fair Value</span>
                    <span>Overvalued</span>
                  </div>
                  <div className="relative h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full">
                    <div className="absolute top-0 left-1/3 w-1 h-2 bg-gray-900 rounded-full"></div>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs font-medium text-gray-700">Current Price</span>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                <div className="font-bold text-sm">Live Data</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg animate-pulse">
                <div className="font-bold text-sm">AI Powered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ValuationPro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade analysis tools used by institutional investors, 
              now accessible to individual investors and financial professionals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dynamic P/E Valuation</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Forward EPS estimates combined with historical P/E percentile bands. 
                No arbitrary assumptions - pure data-driven valuation analysis.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Market Data</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Live stock quotes, analyst estimates, and company news from premium 
                financial data providers. Always current, always accurate.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Insights</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Multi-factor quality scoring across value, growth, profitability, and momentum. 
                Comprehensive peer analysis and risk assessment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Ideas Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Fresh investing ideas for you
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get inspired with over 100 stock collections across many investing strategies 
                and industry themes. Discover opportunities with professional-grade analysis.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AI</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Artificial Intelligence Stocks</h4>
                    <p className="text-sm text-gray-600">Companies leading the AI revolution</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">EV</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Electric Vehicle Ecosystem</h4>
                    <p className="text-sm text-gray-600">The future of transportation</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Energy Transition Stocks</h4>
                    <p className="text-sm text-gray-600">Renewable energy and storage</p>
                  </div>
                </div>
              </div>
              
              <Link href="/report" className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                Explore Ideas
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            {/* Strategy Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 p-6 rounded-2xl text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Forecast High Growth</h3>
                <p className="text-sm opacity-90">Companies analysts expect to have high earnings growth</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Potentially Undervalued</h3>
                <p className="text-sm opacity-90">Quality companies trading below fair value</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Buy the Dip</h3>
                <p className="text-sm opacity-90">Quality stocks at temporary discounts</p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500 to-green-500 p-6 rounded-2xl text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Insider Trading</h3>
                <p className="text-sm opacity-90">Stocks with recent insider buying activity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Screener Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-blue-600 font-semibold">Stock Screener</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Find your next quality investment
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Quickly narrow down your favorite type of stocks with our easy and powerful screener. 
                You can start from top level characteristics to specific key metrics as your strategy develops.
              </p>
              <Link href="/report" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200">
                Try Screener for Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            {/* Quality Radar Visualization */}
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 rounded-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 text-center">Amazing Past Performance</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Radar Chart Representation */}
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Background grid */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="200" height="200" fill="url(#grid)" />
                      
                      {/* Radar chart polygon */}
                      <polygon points="100,40 140,80 130,140 70,140 60,80" 
                               fill="rgba(59,130,246,0.3)" 
                               stroke="#3b82f6" 
                               strokeWidth="2"/>
                      
                      {/* Axis lines */}
                      <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                      <line x1="100" y1="100" x2="160" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                      <line x1="100" y1="100" x2="100" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                      <line x1="100" y1="100" x2="40" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                      
                      {/* Data points */}
                      <circle cx="100" cy="40" r="3" fill="#3b82f6"/>
                      <circle cx="140" cy="80" r="3" fill="#10b981"/>
                      <circle cx="130" cy="140" r="3" fill="#f59e0b"/>
                      <circle cx="60" cy="80" r="3" fill="#8b5cf6"/>
                    </svg>
                    
                    {/* Labels */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs">VALUE</div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">FUTURE</div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs">HEALTH</div>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs">PAST</div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between text-sm">
                  <span>US Market</span>
                  <span>Biotech</span>
                </div>
                <div className="text-center mt-4 text-gray-300 text-sm">234 companies found</div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to make smarter investment decisions?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of investors using ValuationPro for professional-grade stock analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/report" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg">
              Start Free Analysis
            </Link>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
              Schedule Demo
            </button>
          </div>
          <p className="mt-4 text-sm opacity-75">
            No credit card required • 29 stocks available in demo
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
                Professional stock analysis for informed investment decisions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Stock Analysis</a></li>
                <li><a href="#" className="hover:text-white transition-colors">P/E Valuation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Peer Comparison</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Quality Scoring</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Investment Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market News</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ValuationPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
