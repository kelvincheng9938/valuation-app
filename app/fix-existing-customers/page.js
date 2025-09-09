'use client'
import { useState } from 'react'

export default function FixExistingCustomers() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  
  const fixAlthena = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/force-add-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: 'althena91@gmail.com',
          reason: 'retroactive_payment'
        })
      })
      const data = await res.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult('Error: ' + error.message)
    }
    setLoading(false)
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Fix Existing Customers</h1>
      <button 
        onClick={fixAlthena}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        {loading ? 'Adding...' : 'Add althena91@gmail.com as Pro User'}
      </button>
      {result && (
        <pre className="bg-gray-100 p-4 mt-4 text-xs">{result}</pre>
      )}
    </div>
  )
}
