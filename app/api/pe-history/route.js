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
    console.log(`Fetching P/E history for ${symbol}`)
    
    // Try multiple endpoints for better data coverage
    const endpoints = [
      `https://financialmodelingprep.com/api/v3/ratios/${symbol}?limit=20&apikey=${FMP_API_KEY}`,
      `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=20&apikey=${FMP_API_KEY}`
    ];

    let data = null;
    for (const url of endpoints) {
      try {
        const response = await fetch(url);
        const apiData = await response.json();
        console.log(`API response for ${symbol}:`, apiData);
        
        if (Array.isArray(apiData) && apiData.length > 0) {
          data = apiData;
          break;
        }
      } catch (error) {
        console.log(`Failed to fetch from ${url}:`, error);
        continue;
      }
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log(`No historical data for ${symbol}, using fallback`);
      const fallbackBands = getFallbackPEBands(symbol.toUpperCase())
      return NextResponse.json({
        peBands: fallbackBands,
        dataSource: 'fallback',
        message: 'Using fallback P/E bands - no historical data available'
      })
    }

    // Extract P/E ratios from either endpoint
    const peRatios = data
      .map(item => item.priceEarningsRatio || item.peRatio)
      .filter(pe => pe && pe > 0 && pe < 200)
      .sort((a, b) => a - b)

    console.log(`Found ${peRatios.length} valid P/E ratios for ${symbol}:`, peRatios);

    if (peRatios.length < 3) {
      console.log(`Insufficient P/E data for ${symbol}, using fallback`);
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

    console.log(`Calculated P/E bands for ${symbol}:`, bands);

    return NextResponse.json({
      peBands: bands,
      dataSource: 'historical',
      dataPoints: peRatios.length,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error(`P/E history API error for ${symbol}:`, error)
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
  return Math.round(value * 10) / 10
}

function getFallbackPEBands(symbol) {
  const fallbackMap = {
    'GOOGL': { low: 20.5, mid: 22.5, high: 25.2 },
    'MSFT': { low: 28.0, mid: 32.0, high: 36.0 },
    'AAPL': { low: 24.0, mid: 28.0, high: 32.0 },
    'AMZN': { low: 35.0, mid: 42.0, high: 50.0 },
    'NVDA': { low: 45.0, mid: 60.0, high: 80.0 },
    'AMD': { low: 18.0, mid: 23.0, high: 32.0 },
    'CRM': { low: 25.0, mid: 30.0, high: 35.0 },
    'TSLA': { low: 40.0, mid: 60.0, high: 90.0 },
    'META': { low: 18.0, mid: 22.0, high: 26.0 }
  }

  return fallbackMap[symbol] || { low: 18.0, mid: 22.0, high: 28.0 }
}
