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
    // Fetch analyst estimates
    const url = `https://financialmodelingprep.com/api/v3/analyst-estimates/${symbol}?apikey=${FMP_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'No analyst estimates available' })
    }

    // Sort by date and get the next few years
    const sortedEstimates = data.sort((a, b) => new Date(a.date) - new Date(b.date))
    
    // Get current year and next 2-3 years
    const currentYear = new Date().getFullYear()
    const futureEstimates = sortedEstimates.filter(est => {
      const year = new Date(est.date).getFullYear()
      return year >= currentYear && year <= currentYear + 3
    })

    if (futureEstimates.length === 0) {
      return NextResponse.json({ error: 'No forward EPS estimates available' })
    }

    // Extract EPS estimates
    const epsData = {
      years: [],
      values: []
    }

    futureEstimates.slice(0, 3).forEach(est => {
      const year = new Date(est.date).getFullYear()
      const eps = est.estimatedEpsAvg
      
      if (eps && eps > 0) {
        epsData.years.push(year.toString())
        epsData.values.push(Math.round(eps * 100) / 100) // Round to 2 decimals
      }
    })

    if (epsData.values.length === 0) {
      return NextResponse.json({ error: 'No valid EPS estimates found' })
    }

    // Calculate forward P/E if we have current price
    let forwardPE = null
    const currentPrice = parseFloat(searchParams.get('price'))
    if (currentPrice && epsData.values[0]) {
      forwardPE = Math.round((currentPrice / epsData.values[0]) * 10) / 10
    }

    return NextResponse.json({
      eps: epsData,
      forwardPE: forwardPE,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Analyst estimates API error:', error)
    return NextResponse.json({ error: 'Failed to fetch analyst estimates' }, { status: 500 })
  }
}
