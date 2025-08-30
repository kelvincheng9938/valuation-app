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
    // First try to get analyst estimates
    const url = `https://financialmodelingprep.com/api/v3/analyst-estimates/${symbol}?apikey=${FMP_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (Array.isArray(data) && data.length > 0) {
      // Process real analyst estimates if available
      const currentYear = new Date().getFullYear()
      const futureEstimates = data.filter(est => {
        const year = new Date(est.date).getFullYear()
        return year >= currentYear && year <= currentYear + 3
      })

      if (futureEstimates.length > 0) {
        const epsData = { years: [], values: [] }
        futureEstimates.slice(0, 3).forEach(est => {
          const year = new Date(est.date).getFullYear()
          const eps = est.estimatedEpsAvg || est.estimatedEps || est.eps
          if (eps && eps > 0) {
            epsData.years.push(year.toString())
            epsData.values.push(Math.round(eps * 100) / 100)
          }
        })
        
        if (epsData.values.length > 0) {
          return NextResponse.json({
            eps: epsData,
            dataSource: 'live',
            lastUpdated: new Date().toISOString()
          })
        }
      }
    }

    // If no analyst estimates, try to get historical earnings to estimate future EPS
    const financialsUrl = `https://financialmodelingprep.com/api/v3/income-statement/${symbol}?limit=3&apikey=${FMP_API_KEY}`
    const financialsResponse = await fetch(financialsUrl)
    const financialsData = await financialsResponse.json()

    if (Array.isArray(financialsData) && financialsData.length > 0) {
      // Calculate EPS from recent earnings
      const recentEarnings = financialsData
        .filter(year => year.eps && year.eps > 0)
        .slice(0, 3)
        .map(year => year.eps)

      if (recentEarnings.length > 0) {
        // Use recent EPS to project forward estimates
        const avgEps = recentEarnings.reduce((a, b) => a + b, 0) / recentEarnings.length
        const growthRate = recentEarnings.length > 1 ? 
          (recentEarnings[0] / recentEarnings[recentEarnings.length - 1] - 1) / (recentEarnings.length - 1) : 
          0.08 // Default 8% growth

        const currentYear = new Date().getFullYear()
        const projectedEps = [
          Math.round(avgEps * (1 + Math.max(0.02, Math.min(0.25, growthRate))) * 100) / 100,
          Math.round(avgEps * Math.pow(1 + Math.max(0.02, Math.min(0.25, growthRate)), 2) * 100) / 100,
          Math.round(avgEps * Math.pow(1 + Math.max(0.02, Math.min(0.25, growthRate)), 3) * 100) / 100
        ]

        return NextResponse.json({
          eps: {
            years: [(currentYear + 1).toString(), (currentYear + 2).toString(), (currentYear + 3).toString()],
            values: projectedEps
          },
          dataSource: 'projected',
          message: 'EPS projected from historical earnings data',
          lastUpdated: new Date().toISOString()
        })
      }
    }

    // Fallback for known companies
    const fallbackEstimates = getFallbackEstimates(symbol.toUpperCase())
    if (fallbackEstimates) {
      return NextResponse.json({
        eps: fallbackEstimates,
        dataSource: 'fallback',
        lastUpdated: new Date().toISOString()
      })
    }

    return NextResponse.json({ error: 'No analyst estimates available' })

  } catch (error) {
    console.error('Analyst estimates API error:', error)
    const fallbackEstimates = getFallbackEstimates(symbol.toUpperCase())
    if (fallbackEstimates) {
      return NextResponse.json({
        eps: fallbackEstimates,
        dataSource: 'fallback',
        lastUpdated: new Date().toISOString()
      })
    }
    return NextResponse.json({ error: 'Failed to fetch analyst estimates' }, { status: 500 })
  }
}

function getFallbackEstimates(symbol) {
  const fallbackMap = {
    'GOOGL': { years: ['2025', '2026', '2027'], values: [7.82, 8.94, 10.15] },
    'MSFT': { years: ['2025', '2026', '2027'], values: [15.34, 17.93, 21.04] },
    'AAPL': { years: ['2025', '2026', '2027'], values: [7.63, 8.45, 9.28] },
    'AMZN': { years: ['2025', '2026', '2027'], values: [5.10, 6.85, 8.92] },
    'NVDA': { years: ['2025', '2026', '2027'], values: [2.18, 3.45, 4.92] },
    'CRM': { years: ['2025', '2026', '2027'], values: [8.88, 10.45, 12.18] },
    'AMD': { years: ['2025', '2026', '2027'], values: [3.85, 4.72, 5.93] },
    'TSLA': { years: ['2025', '2026', '2027'], values: [4.85, 6.72, 8.93] },
    'META': { years: ['2025', '2026', '2027'], values: [18.45, 22.75, 27.85] },
    'XYZ': { years: ['2025', '2026', '2027'], values: [2.45, 2.89, 3.41] } // Block Inc estimates
  }
  
  return fallbackMap[symbol] || null
}
