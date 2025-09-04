'use client'
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

export default function AdminPage() {
  const [marketData, setMarketData] = useState({
    sp500: { price: '', change: '' },
    nasdaq: { price: '', change: '' },
    dow: { price: '', change: '' },
    bitcoin: { price: '', change: '' },
    gold: { price: '', change: '' },
    oil: { price: '', change: '' },
    vix: { price: '', change: '' },
    euro: { price: '', change: '' },
    yen: { price: '', change: '' }
  })
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' | 'error'

  useEffect(() => {
    loadCurrentData()
  }, [])

  const loadCurrentData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/market-data')
      if (response.ok) {
        const data = await response.json()
        
        // Convert data to form format
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
      // Convert form data to API format
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
      
      console.log('Sending data:', apiData)
      
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(apiData)
      })
      
      const result = await response.json()
      console.log('API Response:', result)
      
      if (response.ok) {
        setMessage('✅ Market data updated successfully! Changes will appear on the News page.')
        setMessageType('success')
        
        // Reload to show updated timestamp
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

  // Pre-fill with current real market data for convenience
  const fillSampleData = () => {
    setMarketData({
      sp500: { price: '6045.23', change: '0.85' },
      nasdaq: { price: '19892.15', change: '1.12' },
      dow: { price: '44234.56', change: '0.45' },
      bitcoin: { price: '94650', change: '-1.85' },
      gold: { price: '2647.30', change: '0.32' },
      oil: { price: '69.85', change: '-0.98' },
      vix: { price: '16.45', change: '-2.15' },
      euro: { price: '1.0435', change: '0.15' },
      yen: { price: '156.78', change: '-0.25' }
    })
  }

  const marketIndexes = [
    { key: 'sp500', label: 'S&P 500', placeholder: '6045.23', symbol: '$' },
    { key: 'nasdaq', label: 'NASDAQ', placeholder: '19892.15', symbol: '$' },
    { key: 'dow', label: 'Dow Jones', placeholder: '44234.56', symbol: '$' },
    { key: 'bitcoin', label: 'Bitcoin', placeholder: '94650', symbol: '$' },
    { key: 'gold', label: 'Gold', placeholder: '2647.30', symbol: '$' },
    { key: 'oil', label: 'Oil WTI', placeholder: '69.85', symbol: '$' },
    { key: 'vix', label: 'VIX', placeholder: '16.45', symbol: '' },
    { key: 'euro', label: 'EUR/USD', placeholder: '1.0435', symbol: '$' },
    { key: 'yen', label: 'USD/JPY', placeholder: '156.78', symbol: '¥' }
  ]

  return (
    <>
      <Navigation />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">📊 Market Data Admin</h1>
          <p className="text-gray-400">
            Update market index prices and percentage changes. This data will be displayed on the News page in real-time.
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
            <h2 className="text-xl font-semibold">Market Indices</h2>
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
                {saving ? 'Saving...' : '💾 Save Changes'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketIndexes.map(({ key, label, placeholder, symbol }) => (
              <div key={key} className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  {label}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        placeholder={`${placeholder}`}
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
            <div className="text-blue-400 font-medium mb-2">💡 Quick Guide</div>
            <div className="text-sm text-blue-300/80 space-y-1">
              <div>• Use positive numbers for gains (+1.25) and negative for losses (-0.85)</div>
              <div>• Decimal precision: Use 2 decimal places (e.g., 6045.23 for S&P 500)</div>
              <div>• Changes appear immediately on the News page after saving</div>
              <div>• Click "Fill Sample Data" to load realistic test values</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">📈 Update from Excel</h3>
            <div className="text-sm text-gray-400 space-y-3">
              <p><strong className="text-white">Step 1:</strong> Copy values from your Excel spreadsheet</p>
              <p><strong className="text-white">Step 2:</strong> Paste into the corresponding fields above</p>
              <p><strong className="text-white">Step 3:</strong> Click "Save Changes" to update the News page</p>
            </div>
          </div>
          
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">🔄 Live Integration</h3>
            <div className="text-sm text-gray-400 space-y-3">
              <p><strong className="text-white">Manual Updates:</strong> Perfect for daily market close data</p>
              <p><strong className="text-white">API Integration:</strong> Available for real-time feeds</p>
              <p><strong className="text-white">Backup:</strong> Data is automatically saved and persisted</p>
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
