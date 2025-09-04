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
        setMessage(`Loaded data from ${data.dataSource} (${new Date(data.lastUpdated).toLocaleString()})`)
        setMessageType('success')
      }
    } catch (error) {
      console.error('Failed to load current data:', error)
      setMessage('Failed to load current market data')
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
      
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      })
      
      if (response.ok) {
        const result = await response.json()
        setMessage('✅ Market data updated successfully!')
        setMessageType('success')
        
        // Reload to show updated timestamp
        setTimeout(() => loadCurrentData(), 1000)
      } else {
        const error = await response.json()
        setMessage(`❌ Failed to save: ${error.error || 'Unknown error'}`)
        setMessageType('error')
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage('❌ Failed to save market data')
      setMessageType('error')
    }
    
    setSaving(false)
  }

  const marketIndexes = [
    { key: 'sp500', label: 'S&P 500', placeholder: '6045.23' },
    { key: 'nasdaq', label: 'NASDAQ', placeholder: '19892.15' },
    { key: 'dow', label: 'Dow Jones', placeholder: '44234.56' },
    { key: 'bitcoin', label: 'Bitcoin', placeholder: '94650' },
    { key: 'gold', label: 'Gold', placeholder: '2647.30' },
    { key: 'oil', label: 'Oil WTI', placeholder: '69.85' },
    { key: 'vix', label: 'VIX', placeholder: '16.45' },
    { key: 'euro', label: 'EUR/USD', placeholder: '1.0435' },
    { key: 'yen', label: 'USD/JPY', placeholder: '156.78' }
  ]

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Market Data Admin</h1>
          <p className="text-gray-400">
            Update market index prices and percentage changes. This data will be displayed on the News page.
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
            <div className="flex gap-2">
              <button
                onClick={loadCurrentData}
                disabled={loading}
                className="btn px-4 py-2 rounded-lg text-sm disabled:opacity-50"
              >
                {loading ? '⟳' : '↻'} Reload
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary px-6 py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {marketIndexes.map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  {label}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder={`Price (${placeholder})`}
                      value={marketData[key]?.price || ''}
                      onChange={(e) => handleInputChange(key, 'price', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <div className="text-xs text-gray-500 mt-1">Current Price</div>
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="% Change"
                      value={marketData[key]?.change || ''}
                      onChange={(e) => handleInputChange(key, 'change', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                    />
                    <div className="text-xs text-gray-500 mt-1">% Change</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
            <div className="text-blue-400 font-medium mb-2">💡 Usage Tips</div>
            <div className="text-sm text-blue-300/70 space-y-1">
              <div>• Enter positive numbers for gains (+1.25) and negative for losses (-0.85)</div>
              <div>• Use decimal places for precision (e.g., 6045.23 for S&P 500)</div>
              <div>• Changes will appear immediately on the News page after saving</div>
              <div>• Leave fields empty if you don't want to update that index</div>
            </div>
          </div>
        </div>

        {/* Excel Import Instructions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Excel Data Import</h2>
          <div className="text-sm text-gray-400 space-y-3">
            <p>
              <strong className="text-white">Option 1: Manual Entry (Recommended)</strong><br/>
              Use the form above to enter market data directly. This is the fastest and most reliable method.
            </p>
            
            <p>
              <strong className="text-white">Option 2: Copy from Excel</strong><br/>
              1. Open your Excel file with market data<br/>
              2. Copy the price and change values<br/>
              3. Paste them into the corresponding fields above<br/>
              4. Click "Save Changes"
            </p>
            
            <p>
              <strong className="text-white">Option 3: API Integration (Future)</strong><br/>
              For automatic updates, we can integrate with financial data APIs like Yahoo Finance, Alpha Vantage, or IEX Cloud.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a 
            href="/news" 
            className="btn-primary px-6 py-3 rounded-lg inline-flex items-center gap-2"
          >
            View News Page
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
