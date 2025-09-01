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
    
    // Try historical ratios endpoint first
    const ratiosUrl = `https://financialmodelingprep.com/api/v3/ratios/${symbol}?limit=40&apikey=${FMP_API_KEY}`
    const ratiosResponse = await fetch(ratiosUrl)
    const ratiosData = await ratiosResponse.json()

    let peRatios = []

    if (Array.isArray(ratiosData) && ratiosData.length > 0) {
      peRatios = ratiosData
        .map(item => item.priceEarningsRatio)
        .filter(pe => pe && pe > 0 && pe < 200)
        .sort((a, b) => a - b)
      
      console.log(`Found ${peRatios.length} P/E ratios from ratios endpoint:`, peRatios)
    }

    // If not enough data, try key-metrics endpoint
    if (peRatios.length < 5) {
      const keyMetricsUrl = `https://financialmodelingprep.com/api/v3/key-metrics/${symbol}?limit=40&apikey=${FMP_API_KEY}`
      const keyMetricsResponse = await fetch(keyMetricsUrl)
      const keyMetricsData = await keyMetricsResponse.json()

      if (Array.isArray(keyMetricsData) && keyMetricsData.length > 0) {
        const keyMetricsPE = keyMetricsData
          .map(item => item.peRatio)
          .filter(pe => pe && pe > 0 && pe < 200)
          .sort((a, b) => a - b)
        
        console.log(`Found ${keyMetricsPE.length} P/E ratios from key-metrics endpoint:`, keyMetricsPE)
        
        // Combine and deduplicate
        const combinedPE = [...new Set([...peRatios, ...keyMetricsPE])].sort((a, b) => a - b)
        peRatios = combinedPE
      }
    }

    // Need at least 8 data points for reliable percentiles
    if (peRatios.length < 8) {
      console.log(`Insufficient P/E data for ${symbol} (${peRatios.length} points), using sector defaults`)
      const sectorBands = getSectorBasedPEBands(symbol.toUpperCase())
      return NextResponse.json({
        peBands: sectorBands,
        dataSource: 'sector_default',
        message: `Using sector-based P/E bands - only ${peRatios.length} historical data points available`,
        dataPoints: peRatios.length
      })
    }

    // Calculate percentiles from historical data
    const bands = {
      low: calculatePercentile(peRatios, 25),
      mid: calculatePercentile(peRatios, 50), 
      high: calculatePercentile(peRatios, 75)
    }

    console.log(`Calculated P/E bands for ${symbol}:`, bands)

    return NextResponse.json({
      peBands: bands,
      dataSource: 'historical',
      dataPoints: peRatios.length,
      rawData: peRatios.slice(0, 10), // First 10 for debugging
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error(`P/E history API error for ${symbol}:`, error)
    const sectorBands = getSectorBasedPEBands(symbol.toUpperCase())
    return NextResponse.json({
      peBands: sectorBands,
      dataSource: 'sector_default',
      message: 'API error - using sector defaults'
    })
  }
}

function calculatePercentile(sortedArray, percentile) {
  if (sortedArray.length === 0) return 0
  
  const index = (percentile / 100) * (sortedArray.length - 1)
  const lower = Math.floor(index)
  const upper = Math.ceil(index)
  const weight = index % 1
  
  if (upper >= sortedArray.length) return sortedArray[sortedArray.length - 1]
  
  const value = sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight
  return Math.round(value * 10) / 10
}

function getSectorBasedPEBands(symbol) {
  // Sector-specific P/E bands based on industry averages
  const sectorMap = {
    // Technology
    'GOOGL': { low: 18.5, mid: 22.8, high: 28.2 },
    'MSFT': { low: 24.0, mid: 28.5, high: 35.0 },
    'AAPL': { low: 22.0, mid: 26.5, high: 32.0 },
    'META': { low: 16.0, mid: 20.5, high: 25.5 },
    'NVDA': { low: 35.0, mid: 55.0, high: 75.0 },
    'AMD': { low: 20.0, mid: 28.0, high: 40.0 },
    
    // Cloud/SaaS
    'CRM': { low: 28.0, mid: 35.0, high: 45.0 },
    'NOW': { low: 45.0, mid: 60.0, high: 80.0 },
    'WDAY': { low: 35.0, mid: 45.0, high: 60.0 },
    
    // E-commerce/Consumer
    'AMZN': { low: 30.0, mid: 45.0, high: 65.0 },
    'TSLA': { low: 35.0, mid: 55.0, high: 85.0 },
    
    // Financial 
    'JPM': { low: 10.0, mid: 12.5, high: 16.0 },
    'BAC': { low: 9.0, mid: 11.5, high: 15.0 },
    'GS': { low: 8.5, mid: 11.0, high: 14.0 }
  }

  return sectorMap[symbol] || { low: 15.0, mid: 20.0, high: 27.0 }
}
