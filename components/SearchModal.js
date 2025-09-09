'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState([])
  const router = useRouter()
  const inputRef = useRef(null)

  // Popular stocks for quick access
  const popularStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology', icon: '🍎' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology', icon: '🪟' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', icon: '🔍' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Semiconductors', icon: '🚀' },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Social Media', icon: '👥' },
    { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive', icon: '⚡' },
    { ticker: 'CRM', name: 'Salesforce Inc.', sector: 'Software', icon: '☁️' },
    { ticker: 'LLY', name: 'Eli Lilly & Co.', sector: 'Healthcare', icon: '💊' }
  ]

  // All available stocks (you can expand this)
  const allStocks = [
    ...popularStocks,
    { ticker: 'JPM', name: 'JPMorgan Chase', sector: 'Finance', icon: '🏦' },
    { ticker: 'V', name: 'Visa Inc.', sector: 'Finance', icon: '💳' },
    { ticker: 'WMT', name: 'Walmart Inc.', sector: 'Retail', icon: '🛒' },
    { ticker: 'MA', name: 'Mastercard Inc.', sector: 'Finance', icon: '💳' },
    { ticker: 'UNH', name: 'UnitedHealth', sector: 'Healthcare', icon: '🏥' },
    { ticker: 'HD', name: 'Home Depot', sector: 'Retail', icon: '🔨' },
    { ticker: 'DIS', name: 'Disney', sector: 'Entertainment', icon: '🏰' },
    { ticker: 'ADBE', name: 'Adobe Inc.', sector: 'Software', icon: '🎨' },
    { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment', icon: '📺' },
    { ticker: 'INTC', name: 'Intel Corp.', sector: 'Semiconductors', icon: '💻' },
    { ticker: 'AMD', name: 'AMD', sector: 'Semiconductors', icon: '💾' },
    { ticker: 'ORCL', name: 'Oracle Corp.', sector: 'Software', icon: '🗄️' },
    { ticker: '700', name: 'Tencent Holdings', sector: 'Technology', icon: '🎮' },
    { ticker: '1810', name: 'Xiaomi Corp', sector: 'Technology', icon: '📱' },
    { ticker: '9988', name: 'Alibaba Group', sector: 'E-Commerce', icon: '🛍️' }
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      // Load recent searches from localStorage
      const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]')
      setRecentSearches(recent.slice(0, 5))
    }
  }, [isOpen])

  useEffect(() => {
    // Filter suggestions based on search term
    if (searchTerm.length > 0) {
      const filtered = allStocks.filter(stock => 
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSuggestions(filtered.slice(0, 8))
      setSelectedIndex(0)
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0)
      } else if (e.key === 'Enter' && suggestions.length > 0) {
        e.preventDefault()
        handleSelectStock(suggestions[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, suggestions, selectedIndex])

  // Keyboard shortcut for opening search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (!isOpen) {
          // This would need to be handled by the parent component
          // since we can't directly control the isOpen state here
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelectStock = (stock) => {
    // Save to recent searches
    const recent = JSON.parse(localStorage.getItem('recentSearches') || '[]')
    const updated = [stock, ...recent.filter(s => s.ticker !== stock.ticker)].slice(0, 5)
    localStorage.setItem('recentSearches', JSON.stringify(updated))
    
    // Navigate to report
    router.push(`/report?ticker=${stock.ticker}`)
    onClose()
    setSearchTerm('')
  }

  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches')
    setRecentSearches([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center pt-20 px-4">
        <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          {/* Search Input */}
          <div className="p-6 border-b border-gray-800">
            <div className="relative">
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search stocks by ticker or name..."
                className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Search Results / Suggestions */}
          <div className="max-h-[60vh] overflow-y-auto">
            {searchTerm.length > 0 && suggestions.length > 0 ? (
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Search Results
                </div>
                {suggestions.map((stock, index) => (
                  <button
                    key={stock.ticker}
                    onClick={() => handleSelectStock(stock)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                      index === selectedIndex 
                        ? 'bg-cyan-400/20 border border-cyan-400/40' 
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{stock.icon}</span>
                        <div>
                          <div className="font-semibold text-white">
                            {stock.ticker}
                          </div>
                          <div className="text-sm text-gray-400">
                            {stock.name} • {stock.sector}
                          </div>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <>
                {/* Recent Searches */}
                {recentSearches.length > 0 && !searchTerm && (
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-gray-500 uppercase tracking-wider px-2">
                        Recent Searches
                      </div>
                      <button
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Clear
                      </button>
                    </div>
                    {recentSearches.map((stock) => (
                      <button
                        key={stock.ticker}
                        onClick={() => handleSelectStock(stock)}
                        className="w-full text-left p-3 rounded-lg mb-2 hover:bg-gray-800 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <span className="font-semibold text-white">{stock.ticker}</span>
                              <span className="text-sm text-gray-400 ml-2">{stock.name}</span>
                            </div>
                          </div>
                          <svg className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Popular Stocks */}
                <div className="p-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2">
                    Popular Stocks
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {popularStocks.map((stock) => (
                      <button
                        key={stock.ticker}
                        onClick={() => handleSelectStock(stock)}
                        className="p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-cyan-400/20 hover:to-blue-400/20 transition-all group border border-gray-700 hover:border-cyan-400/40"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{stock.icon}</span>
                          <div className="text-left">
                            <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors">
                              {stock.ticker}
                            </div>
                            <div className="text-xs text-gray-400">
                              {stock.name}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 bg-gray-800/50">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-gray-700 rounded">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-gray-700 rounded">Enter</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-gray-700 rounded">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
              <div>
                Press <kbd className="px-2 py-1 bg-gray-700 rounded">⌘K</kbd> to open anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
