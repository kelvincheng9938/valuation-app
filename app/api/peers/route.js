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
    // Fetch stock peers
    const peersUrl = `https://financialmodelingprep.com/api/v4/stock_peers?symbol=${symbol}&apikey=${FMP_API_KEY}`
    const peersResponse = await fetch(peersUrl)
    const peersData = await peersResponse.json()

    if (!Array.isArray(peersData) || peersData.length === 0) {
      // Return fallback peers for major tickers
      const fallbackPeers = getFallbackPeers(symbol.toUpperCase())
      return NextResponse.json({
        peers: fallbackPeers,
        dataSource: 'fallback',
        message: 'Using fallback peers - no peer data available'
      })
    }

    // Get the peer symbols (limit to top 8 for chart readability)
    const peerSymbols = peersData[0]?.peersList?.slice(0, 8) || []
    
    if (peerSymbols.length === 0) {
      const fallbackPeers = getFallbackPeers(symbol.toUpperCase())
      return NextResponse.json({
        peers: fallbackPeers,
        dataSource: 'fallback',
        message: 'No peers found'
      })
    }

    // Add the original symbol to compare with peers
    const allSymbols = [symbol.toUpperCase(), ...peerSymbols]

    // Fetch financial data for all symbols
    const peersWithData = await Promise.all(
      allSymbols.map(async (peerSymbol) => {
        try {
          // Fetch market cap and P/E ratio
          const keyMetricsUrl = `https://financialmodelingprep.com/api/v3/key-metrics/${peerSymbol}?limit=1&apikey=${FMP_API_KEY}`
          const keyMetricsResponse = await fetch(keyMetricsUrl)
          const keyMetricsData = await keyMetricsResponse.json()

          const ratiosUrl = `https://financialmodelingprep.com/api/v3/ratios/${peerSymbol}?limit=1&apikey=${FMP_API_KEY}`
          const ratiosResponse = await fetch(ratiosUrl)
          const ratiosData = await ratiosResponse.json()

          if (!keyMetricsData[0] || !ratiosData[0]) {
            return null
          }

          const marketCap = keyMetricsData[0].marketCap
          const forwardPE = ratiosData[0].priceEarningsRatio

          if (!marketCap || !forwardPE || forwardPE <= 0 || forwardPE > 200) {
            return null
          }

          // Convert market cap to billions
          const marketCapBillions = marketCap / 1000000000
          
          // Estimate bubble size based on revenue or market cap (simplified)
          const bubbleSize = Math.max(12, Math.min(30, Math.sqrt(marketCapBillions) * 2))

          return [
            Math.round(marketCapBillions),
            Math.round(forwardPE * 10) / 10,
            bubbleSize,
            peerSymbol
          ]
        } catch (error) {
          console.error(`Error fetching data for ${peerSymbol}:`, error)
          return null
        }
      })
    )

    // Filter out null results
    const validPeers = peersWithData.filter(peer => peer !== null)

    if (validPeers.length === 0) {
      const fallbackPeers = getFallbackPeers(symbol.toUpperCase())
      return NextResponse.json({
        peers: fallbackPeers,
        dataSource: 'fallback',
        message: 'No valid peer data found'
      })
    }

    return NextResponse.json({
      peers: validPeers,
      dataSource: 'live',
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Peers API error:', error)
    const fallbackPeers = getFallbackPeers(symbol.toUpperCase())
    return NextResponse.json({
      peers: fallbackPeers,
      dataSource: 'fallback',
      message: 'API error - using fallback peers'
    })
  }
}

function getFallbackPeers(symbol) {
  // Fallback peers for major companies
  const fallbackMap = {
    'GOOGL': [
      [2180, 22.5, 22, 'GOOGL'],
      [3790, 33.2, 26, 'MSFT'], 
      [2470, 42.8, 20, 'AMZN'],
      [1890, 26.5, 18, 'META']
    ],
    'MSFT': [
      [3790, 33.2, 26, 'MSFT'],
      [3450, 30.1, 24, 'AAPL'],
      [2180, 22.5, 22, 'GOOGL'], 
      [2470, 42.8, 20, 'AMZN']
    ],
    'AAPL': [
      [3450, 30.1, 24, 'AAPL'],
      [3790, 33.2, 26, 'MSFT'],
      [2180, 22.5, 22, 'GOOGL'],
      [1890, 26.5, 18, 'META']
    ],
    'AMZN': [
      [2470, 42.8, 20, 'AMZN'],
      [3790, 33.2, 26, 'MSFT'],
      [2180, 22.5, 22, 'GOOGL'],
      [3450, 30.1, 24, 'AAPL']
    ],
    'NVDA': [
      [3520, 65.8, 28, 'NVDA'],
      [650, 48.2, 16, 'AMD'],
      [3790, 33.2, 26, 'MSFT'],
      [2180, 22.5, 22, 'GOOGL']
    ],
    'CRM': [
      [290, 35.5, 18, 'CRM'],
      [3790, 33.2, 26, 'MSFT'],
      [380, 20.2, 14, 'ORCL'],
      [170, 41.0, 14, 'NOW']
    ]
  }

  return fallbackMap[symbol] || [
    [100, 25.0, 15, symbol],
    [2180, 22.5, 22, 'GOOGL'],
    [3790, 33.2, 26, 'MSFT'],
    [3450, 30.1, 24, 'AAPL']
  ]
}
