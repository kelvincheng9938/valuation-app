'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function StockGrid({ stocks, title, showSearch = true }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('ticker')
  const [viewMode, setViewMode] = useState('grid') // grid or list

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Stocks', icon: '📊' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
    { id: 'finance', name: 'Finance', icon: '🏦' },
    { id: 'retail', name: 'Retail', icon: '🛍️' },
    { id: 'energy', name: 'Energy', icon: '⚡' },
    { id: 'hongkong', name: 'Hong Kong', icon: '🇭🇰' }
  ]

  // Filter and sort stocks
  const filteredStocks = stocks
    .filter(stock => {
      const matchesSearch = stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || stock.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'ticker') return a.ticker.localeCompare(b.ticker)
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'change') return parseFloat(b.change) - parseFloat(a.change)
      return 0
    })

  // Color coding for valuation status
  const getValuationColor = (status) => {
    switch(status) {
      case 'undervalued': return 'from-green-500/20 to-emerald-500/20 border-green-400/50'
      case 'fair': return 'from-yellow-500/20 to-amber-500/20 border-yellow-400/50'
      case 'overvalued': return 'from-red-500/20 to-rose-500/20 border-red-400/50'
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-400/50'
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'undervalued': return { text: 'Undervalued', class: 'text-green-400 bg-green-400/10' }
      case 'fair': return { text: 'Fair Value', class: 'text-yellow-400 bg-yellow-400/10' }
      case 'overvalued': return { text: 'Overvalued', class: 'text-red-400 bg-red-400/10' }
      default: return { text: 'No Data', class: 'text-gray-400 bg-gray-400/10' }
    }
  }

  return (
    <div className="w-full">
      {/* Header with Controls */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
        
        {showSearch && (
          <div className="space-y-4">
            {/* Search and View Toggle */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search stocks by ticker or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              
              <div className="flex gap-2">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="ticker">Sort by Ticker</option>
                  <option value="name">Sort by Name</option>
                  <option value="change">Sort by Change %</option>
                </select>
                
                {/* View Mode Toggle */}
                <div className="flex bg-gray-800/50 border border-gray-700 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-cyan-400/20 text-cyan-400' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-2 rounded-lg transition-all ${
                      viewMode === 'list' 
                        ? 'bg-cyan-400/20 text-cyan-400' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    selectedCategory === category.id
                      ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/40'
                      : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                  {selectedCategory === category.id && (
                    <span className="text-xs">({filteredStocks.length})</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      {showSearch && (
        <div className="mb-4 text-sm text-gray-400">
          Showing <span className="text-cyan-400 font-semibold">{filteredStocks.length}</span> of{' '}
          <span className="text-white font-semibold">{stocks.length}</span> stocks
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStocks.map((stock) => (
            <Link
              key={stock.ticker}
              href={`/report?ticker=${stock.ticker}`}
              className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${getValuationColor(stock.valuation)} border hover:scale-105 transform transition-all duration-300`}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-purple-400/0 group-hover:from-cyan-400/10 group-hover:to-purple-400/10 transition-all duration-300"></div>
              
              <div className="relative p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{stock.icon || '📈'}</div>
                    <div>
                      <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {stock.ticker}
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-1">
                        {stock.name}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Price and Change */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">${stock.price}</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      stock.change?.startsWith('+') 
                        ? 'text-green-400 bg-green-400/10' 
                        : 'text-red-400 bg-red-400/10'
                    }`}>
                      {stock.change}
                    </span>
                  </div>
                  
                  {/* Valuation Status */}
                  {stock.valuation && (
                    <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusBadge(stock.valuation).class}`}>
                      {getStatusBadge(stock.valuation).text}
                    </div>
                  )}
                  
                  {/* Quick Stats */}
                  {stock.pe && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">P/E Ratio</span>
                      <span className="text-gray-300 font-medium">{stock.pe}</span>
                    </div>
                  )}
                  
                  {stock.marketCap && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Market Cap</span>
                      <span className="text-gray-300 font-medium">{stock.marketCap}</span>
                    </div>
                  )}
                </div>
                
                {/* Hover Action */}
                <div className="mt-3 pt-3 border-t border-gray-700/50">
                  <div className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors flex items-center">
                    View Analysis
                    <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Live Indicator */}
              {stock.isLive && (
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-1 bg-green-400/20 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">Live</span>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {filteredStocks.map((stock) => (
            <Link
              key={stock.ticker}
              href={`/report?ticker=${stock.ticker}`}
              className="group block p-4 rounded-xl bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700 hover:border-cyan-400/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{stock.icon || '📈'}</div>
                  <div>
                    <div className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {stock.ticker}
                    </div>
                    <div className="text-sm text-gray-400">{stock.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">${stock.price}</div>
                    <div className={`text-sm font-medium ${
                      stock.change?.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {stock.change}
                    </div>
                  </div>
                  
                  {stock.valuation && (
                    <div className={`px-3 py-1 rounded text-sm font-medium ${getStatusBadge(stock.valuation).class}`}>
                      {getStatusBadge(stock.valuation).text}
                    </div>
                  )}
                  
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredStocks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <div className="text-xl text-gray-400 mb-2">No stocks found</div>
          <div className="text-sm text-gray-500">Try adjusting your search or filters</div>
        </div>
      )}
    </div>
  )
}
