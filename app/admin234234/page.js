'use client'
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

export default function AdminPage() {
  // ONLY 5 core indices - no VIX, EUR/USD, USD/JPY, Dow Jones
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
        setMessage(`✅ Loaded data (${new Date(data.lastUpdated).toLocaleString()})`)
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
      // Only send the 5 core indices
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
        setMessage('✅ News page updated successfully!')
        setMessageType('success')
        setTimeout(() => loadCurrentData(), 1000)
      } else {
        setMessage(`❌ Failed to save: ${result.error || 'Unknown error'}`)
        setMessageType('error')
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage('❌ Network error - please check connection')
      setMessageType('error')
    }
    
    setSaving(false)
  }

  const fillSampleData = () => {
    setMarketData({
      sp500: { price: '6045.23', change: '0.85' },
      nasdaq: { price: '19892.15', change: '1.12' },
      bitcoin: { price: '94650', change: '-1.85' },
      gold: { price: '2647.30', change: '0.32' },
      oil: { price: '69.85', change: '-0.98' }
    })
  }

  // ONLY 5 core indices
  const coreIndices = [
    { key: 'sp500', label: 'S&P 500', placeholder: '6045.23', symbol: '$' },
    { key: 'nasdaq', label: 'NASDAQ', placeholder: '19892.15', symbol: '$' },
    { key: 'bitcoin', label: 'Bitcoin', placeholder: '94650', symbol: '$' },
    { key: 'gold', label: 'Gold', placeholder: '2647.30', symbol: '$' },
    { key: 'oil', label: 'Oil WTI', placeholder: '69.85', symbol: '$' }
  ]

  return (
    <>
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📊 Daily Market Update</h1>
          <p className="text-gray-400">
            Update 5 core market indices for the News page. Quick daily workflow.
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
                📋 Sample Data
              </button>
              <button
                onClick={loadCurrentData}
                disabled={loading}
                className="btn px-4 py-2 rounded-lg text-sm disabled:opacity-50"
              >
                {loading ? '⟳' : '↻'} Reload
              </button>
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="btn-primary px-6 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {saving ? 'Updating...' : '💾 Update News'}
              </button>
            </div>
          </div>

          {/* Clean 5-column grid for core indices */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {coreIndices.map(({ key, label, placeholder, symbol }) => (
              <div key={key} className="space-y-3">
                <div className="text-center">
                  <h3 className="font-semibold text-white mb-2">{label}</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      placeholder={placeholder}
                      value={marketData[key]?.price || ''}
                      onChange={(e) => handleInputChange(key, 'price', e.target.value)}
                      className="w-full pl-8 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-center"
                    />
                    <span className="absolute left-3 top-3 text-gray-400">{symbol}</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="±0.00"
                      value={marketData[key]?.change || ''}
                      onChange={(e) => handleInputChange(key, 'change', e.target.value)}
                      className="w-full pl-8 pr-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 text-center"
                    />
                    <span className="absolute left-3 top-3 text-gray-400">%</span>
                  </div>
                </div>
                
                <div className="text-center text-xs text-gray-500">
                  <div>Price</div>
                  <div>% Change</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
            <div className="text-blue-400 font-medium mb-2">⚡ Quick Update</div>
            <div className="text-sm text-blue-300/80">
              • Enter closing prices and % changes • Use + for gains, - for losses • Click "Update News" • Done! 🎯
            </div>
          </div>
        </div>

        <div className="text-center">
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
