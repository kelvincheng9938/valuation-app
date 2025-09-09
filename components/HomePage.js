'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [marketData, setMarketData] = useState({
    sp500: { value: '4,789.23', change: '+0.84%', trending: 'up' },
    nasdaq: { value: '15,234.56', change: '+1.23%', trending: 'up' },
    dow: { value: '38,456.78', change: '+0.56%', trending: 'up' },
    btc: { value: '68,234', change: '+2.45%', trending: 'up' }
  })

  // Inspirational quotes rotation
  const quotes = [
    { text: "The stock market is a device for transferring money from the impatient to the patient.", author: "Warren Buffett" },
    { text: "In investing, what is comfortable is rarely profitable.", author: "Robert Arnott" },
    { text: "Time in the market beats timing the market.", author: "Ken Fisher" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Stock categories with dynamic data
  const stockCategories = [
    { 
      name: 'Mega Tech', 
      icon: '💻', 
      color: 'from-blue-500 to-purple-500',
      stocks: ['AAPL', 'MSFT', 'GOOGL', 'META'],
      performance: '+12.5%'
    },
    { 
      name: 'AI Leaders', 
      icon: '🤖', 
      color: 'from-purple-500 to-pink-500',
      stocks: ['NVDA', 'AMD', 'INTC', 'QCOM'],
      performance: '+28.3%'
    },
    { 
      name: 'Healthcare', 
      icon: '🏥', 
      color: 'from-green-500 to-teal-500',
      stocks: ['LLY', 'UNH', 'JNJ', 'PFE'],
      performance: '+8.7%'
    },
    { 
      name: 'Finance', 
      icon: '🏦', 
      color: 'from-yellow-500 to-orange-500',
      stocks: ['JPM', 'V', 'MA', 'BAC'],
      performance: '+15.2%'
    },
    { 
      name: 'Hong Kong', 
      icon: '🇭🇰', 
      color: 'from-red-500 to-rose-500',
      stocks: ['700', '9988', '1810', '3690'],
      performance: '-5.4%'
    },
    { 
      name: 'Energy', 
      icon: '⚡', 
      color: 'from-amber-500 to-yellow-500',
      stocks: ['XOM', 'CVX', 'COP', 'SLB'],
      performance: '+22.1%'
    }
  ]

  // Feature cards data
  const features = [
    {
      icon: '📊',
      title: 'Dynamic P/E Valuation',
      description: 'Forward-looking EPS estimates with historical P/E band analysis. Institutional-grade valuation models.',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'hover:border-cyan-400'
    },
    {
      icon: '🎯',
      title: 'Quality Scoring',
      description: 'Multi-factor analysis covering value, growth, profitability, and momentum metrics.',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'hover:border-purple-400'
    },
    {
      icon: '⚡',
      title: 'Real-Time Data',
      description: 'Live market prices, analyst estimates, and breaking news. Professional Bloomberg Terminal data.',
      color: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'hover:border-green-400'
    },
    {
      icon: '🤖',
      title: 'AI Insights',
      description: 'Machine learning-powered predictions and pattern recognition for smarter investment decisions.',
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'hover:border-orange-400'
    },
    {
      icon: '📈',
      title: 'Interactive Charts',
      description: 'Professional-grade visualizations with peer comparisons and segment analysis.',
      color: 'from-indigo-500/20 to-blue-500/20',
      borderColor: 'hover:border-indigo-400'
    },
    {
      icon: '🌍',
      title: 'Global Coverage',
      description: 'Analysis for US, Hong Kong, and international markets. Multi-currency support.',
      color: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'hover:border-teal-400'
    }
  ]

  return (
    <div className="min-h-screen">
      <Navigation isHomePage={true} />
      
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          {/* Main Title with Gradient Animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
              Institutional-Grade
            </span>
            <br />
            <span className="text-white">Stock Valuation</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-200">
            Professional analysis tools powered by Bloomberg Terminal data. 
            Make informed investment decisions with our comprehensive valuation platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in animation-delay-400">
            <Link 
              href="/report"
              className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-cyan-400/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition-all"
            >
              Start Analysis →
            </Link>
            <Link 
              href="/demo"
              className="btn-secondary px-8 py-4 rounded-xl text-lg font-semibold border-2 border-gray-600 hover:border-cyan-400 transform hover:scale-105 transition-all"
            >
              View Demo
            </Link>
          </div>

          {/* Live Market Ticker */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in animation-delay-600">
            {Object.entries(marketData).map(([key, data]) => (
              <div key={key} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg px-6 py-3 flex items-center space-x-3">
                <span className="text-gray-400 text-sm uppercase">{key}</span>
                <span className="text-white font-semibold">{data.value}</span>
                <span className={`text-sm font-medium ${data.trending === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {data.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stock Categories Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Explore by Category</h2>
            <p className="text-gray-400 text-lg">Quick access to curated stock collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockCategories.map((category, index) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-2xl border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                
                <div className="relative p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{category.icon}</span>
                      <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    </div>
                    <div className={`text-sm font-semibold ${
                      category.performance.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {category.performance}
                    </div>
                  </div>

                  {/* Stock Tickers */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.stocks.map((ticker) => (
                      <Link
                        key={ticker}
                        href={`/report?ticker=${ticker}`}
                        className="px-3 py-1 bg-gray-800/50 hover:bg-cyan-400/20 rounded-lg text-sm text-gray-300 hover:text-white transition-all"
                      >
                        {ticker}
                      </Link>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center justify-center w-full py-2 bg-gray-800/50 hover:bg-cyan-400/20 rounded-lg text-sm text-gray-300 hover:text-cyan-400 transition-all group"
                  >
                    View All
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Hover Effect Glow */}
                {hoveredCard === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Professional Tools</h2>
            <p className="text-gray-400 text-lg">Everything you need for comprehensive stock analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl bg-gradient-to-br ${feature.color} border border-gray-800 ${feature.borderColor} transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/20 transform hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                
                {/* Animated corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-full h-full" viewBox="0 0 80 80">
                    <path
                      d="M0 0 Q80 0 80 80 L80 0 Z"
                      fill="url(#gradient)"
                      fillOpacity="0.1"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <svg className="absolute -left-8 -top-8 w-16 h-16 text-cyan-400/20" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <div className="relative">
              <p className="text-2xl text-gray-300 italic mb-4 animate-fade-in" key={currentQuote}>
                {quotes[currentQuote].text}
              </p>
              <p className="text-cyan-400 font-semibold">— {quotes[currentQuote].author}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make Smarter Investment Decisions?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of investors using ValuationPro for professional stock analysis
          </p>
          <Link 
            href="/report"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-xl shadow-2xl shadow-cyan-400/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition-all"
          >
            Get Started Free
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
