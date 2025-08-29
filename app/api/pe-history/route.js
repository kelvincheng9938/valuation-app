import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter required' }, { status: 400 })
  }

  const FMP_API_KEY = process.env.FMP_API_KEY

  if (!FMP_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    // Fetch historical ratios data (last 5 years for better statistical significance)
    const url = `https://financialmodelingprep.com/api/v3/ratios/${symbol}?limit=20&apikey=${FMP_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      // Fallback P/E bands based on common company patterns
      const fallbackBands = getFallbackPEBands(symbol.toUpperCase())
      return NextResponse.json({
        peBands: fallbackBands,
        dataSource: 'fallback',
        message: 'Using fallback P/E bands - no historical data available'
      })
    }

    // Extract P/E ratios and filter out invalid values
    const peRatios = data
      .map(item => item.priceEarningsRatio)
      .filter(pe => pe && pe > 0 && pe < 200) // Filter out unrealistic P/E ratios
      .sort((a, b) => a - b)

    if (peRatios.length < 5) {
      // Not enough data points for reliable percentiles
      const fallbackBands = getFallbackPEBands(symbol.toUpperCase())
      return NextResponse.json({
        peBands: fallbackBands,
        dataSource: 'fallback',
        message: 'Using fallback P/E bands - insufficient historical data'
      })
    }

    // Calculate percentiles
    const bands = {
      low: calculatePercentile(peRatios, 25),
      mid: calculatePercentile(peRatios, 50),
      high: calculatePercentile(peRatios, 75)
    }

    return NextResponse.json({
      peBands: bands,
      dataSource: 'historical',
      dataPoints: peRatios.length,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('P/E history API error:', error)
    const fallbackBands = getFallbackPEBands(symbol.toUpperCase())
    return NextResponse.json({
      peBands: fallbackBands,
      dataSource: 'fallback',
      message: 'Using fallback P/E bands - API error'
    })
  }
}

function calculatePercentile(sortedArray, percentile) {
  const index = (percentile / 100) * (sortedArray.length - 1)
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  const weight = index % 1
  
  if (upper >= sortedArray.length) return sortedArray[sortedArray.length - 1]
  
  const value = sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight
  return Math.round(value * 10) / 10 // Round to 1 decimal
}

function getFallbackPEBands(symbol) {
  // Company-specific fallback bands based on typical ranges
  const fallbackMap = {
    'GOOGL': { low: 20.5, mid: 22.5, high: 25.2 },
    'MSFT': { low: 28.0, mid: 32.0, high: 36.0 },
    'AAPL': { low: 24.0, mid: 28.0, high: 32.0 },
    'AMZN': { low: 35.0, mid: 42.0, high: 50.0 },
    'NVDA': { low: 45.0, mid: 60.0, high: 80.0 },
    'CRM': { low: 25.0, mid: 30.0, high: 35.0 },
    'TSLA': { low: 40.0, mid: 60.0, high: 90.0 },
    'META': { low: 18.0, mid: 22.0, high: 26.0 }
  }

  return fallbackMap[symbol] || { low: 18.0, mid: 22.0, high: 28.0 } // Generic tech stock
}
