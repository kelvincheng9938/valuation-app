'use client'
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

export default function AdminPage() {
  const [marketData, setMarketData] = useState({
    sp500: { price: '', change: '' },
    nasdaq: { price: '', change: '' },
    bitcoin: { price: '', change: '' },
    gold: { price: '', change: '' },
    oil: { price: '', change: '' }
  })
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    loadCurrentData()
  }, [])

  const loadCurrentData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/market-data')
      if (response.ok) {
        const data = await response.json()
        
        const formData = {}
        Object.keys(marketData).forEach(key => {
          if (data[key]) {
            formData[key] = {
              price: data[key].price?.toString() || '',
              change: data[key].change?.toString() || ''
            }
          } else {
            formData[key] = { price: '', change: '' }
          }
        })
        
        setMarketData(formData)
        setMessage(`✅ Loaded data from ${data.dataSource} (${new Date(data.lastUpdated).toLocaleString()})`)
        setMessageType('success')
      }
    } catch (error) {
      console.error('Failed to load current data:', error)
      setMessage('❌ Failed to load current market data')
      setMessageType('error')
    }
    setLoading(false)
  }

  const handleInputChange = (index, field, value) => {
    setMarketData(prev => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: value
      }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    
    try {
      const apiData = {}
      Object.keys(marketData).forEach(key => {
        const item = marketData[key]
        if (item.price && item.change !== '') {
          apiData[key] = {
            price: parseFloat(item.price) || 0,
            change: parseFloat(item.change) || 0
          }
        }
      })
      
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(apiData)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setMessage('✅ News page updated successfully! Changes are live.')
        setMessageType('success')
        setTimeout(() => loadCurrentData(), 1000)
      } else {
        setMessage(`❌ Failed to save: ${result.error || 'Unknown error'}`)
        setMessageType('error')
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage('❌ Network error - please check your connection')
      setMessageType('error')
    }
    
    setSaving(false)
  }

  // Pre-fill with realistic sample data
  const fillSampleData = () => {
    setMarketData({
      sp500: { price: '6045.23', change: '0.85' },
      nasdaq: { price: '19892.15', change: '1.12' },
      bitcoin: { price: '94650', change: '-1.85' },
      gold: { price: '2647.30', change: '0.32' },
      oil: { price: '69.85', change: '-0.98' }
    })
  }

  const coreIndices = [
    { key: 'sp500', label: 'S&P 500', placeholder: '6045.23', symbol: '$', description: 'US Stock Market' },
    { key: 'nasdaq', label: 'NASDAQ', placeholder: '19892.15', symbol: '$', description: 'Tech Stocks' },
    { key: 'bitcoin', label: 'Bitcoin', placeholder: '94650', symbol: '$', description: 'Cryptocurrency' },
    { key: 'gold', label: 'Gold', placeholder: '2647.30', symbol: '$', description: 'Precious Metals' },
    { key: 'oil', label: 'Oil WTI', placeholder: '69.85', symbol: '$', description: 'Energy Commodities' }
  ]

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📊 Daily Market Update</h1>
          <p className="text-gray-400">
            Update core market indices for the News page. Demo stock prices are updated weekly separately.
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            messageType === 'success' 
              ? 'bg-green-500/10 border-green-400/30 text-green-400' 
              : 'bg-red-500/10 border-red-400/30 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Core Market Indices</h2>
            <div className="flex gap-3">
              <button
                onClick={fillSampleData}
                className="btn px-4 py-2 rounded-lg text-sm"
              >
                📋 Fill Sample Data
              </button>
              <button
                onClick={loadCurrentData}
                disabled={loading}
                className="btn px-4 py-2 rounded-lg text-sm disabled:opacity-50"
              >
                {loading ? '⟳ Loading...' : '↻ Reload'}
              </button>
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="btn-primary px-6 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {saving ? 'Updating...' : '💾 Update News Page'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreIndices.map(({ key, label, placeholder, symbol, description }) => (
              <div key={key} className="space-y-3">
                <label className="block">
                  <div className="font-medium text-gray-300 mb-2">{label}</div>
                  <div className="text-xs text-gray-500 mb-3">{description}</div>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        placeholder={placeholder}
                        value={marketData[key]?.price || ''}
                        onChange={(e) => handleInputChange(key, 'price', e.target.value)}
                        className="w-full pl-8 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      />
                      <span className="absolute left-3 top-3 text-gray-400">{symbol}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Current Price</div>
                  </div>
                  <div>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.85"
                        value={marketData[key]?.change || ''}
                        onChange={(e) => handleInputChange(key, 'change', e.target.value)}
                        className="w-full pl-8 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                      />
                      <span className="absolute left-3 top-3 text-gray-400">%</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">% Change</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
            <div className="text-blue-400 font-medium mb-2">💡 Daily Workflow</div>
            <div className="text-sm text-blue-300/80 space-y-1">
              <div>• **News Page**: Update these 5 core indices daily for market snapshot</div>
              <div>• **Demo Reports**: Updated weekly from Bloomberg Excel (separate process)</div>
              <div>• Use positive numbers for gains (+1.25) and negative for losses (-0.85)</div>
              <div>• Changes appear immediately on the News page after saving</div>
            </div>
          </div>
        </div>

        {/* Workflow Instructions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">📈 Daily News Updates</h3>
            <div className="text-sm text-gray-400 space-y-3">
              <p><strong className="text-white">Step 1:</strong> Get closing prices from financial sites</p>
              <p><strong className="text-white">Step 2:</strong> Enter prices and % changes above</p>
              <p><strong className="text-white">Step 3:</strong> Click "Update News Page"</p>
              <p className="text-green-400">✅ News page market snapshot updated instantly</p>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">📊 Weekly Demo Updates</h3>
            <div className="text-sm text-gray-400 space-y-3">
              <p><strong className="text-white">Bloomberg Excel:</strong> 43 stocks with live data</p>
              <p><strong className="text-white">Demo Reports:</strong> Updated weekly manually</p>
              <p><strong className="text-white">Focus:</strong> Analysis methodology > live prices</p>
              <p className="text-purple-400">⭐ This showcases institutional-grade analysis framework</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/news" 
            target="_blank"
            className="btn-primary px-6 py-3 rounded-lg inline-flex items-center gap-2"
          >
            🔍 View News Page
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
