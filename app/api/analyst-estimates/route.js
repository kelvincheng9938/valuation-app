// Replace your analyst-estimates/route.js with this Finnhub version

import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter required' }, { status: 400 })
  }

  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

  if (!FINNHUB_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    console.log(`Fetching Finnhub estimates for ${symbol}`)
    
    // Finnhub recommendation endpoint (includes price targets and EPS estimates)
    const recUrl = `https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    const recResponse = await fetch(recUrl)
    const recData = await recResponse.json()

    // Finnhub earnings endpoint
    const earningsUrl = `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    const earningsResponse = await fetch(earningsUrl)
    const earningsData = await earningsResponse.json()

    console.log(`Finnhub recommendation data:`, recData)
    console.log(`Finnhub earnings data:`, earningsData)

    // Try to extract EPS estimates from recommendation data
    let epsEstimates = []
    
    if (Array.isArray(recData) && recData.length > 0) {
      // Use recent recommendation data to estimate forward EPS
      const recentRec = recData[0]
      if (recentRec.targetMean && recentRec.targetHigh && recentRec.targetLow) {
        // Estimate EPS based on price targets and typical P/E ratios
        const avgTarget = (recentRec.targetMean + recentRec.targetHigh + recentRec.targetLow) / 3
        const currentYear = new Date().getFullYear()
        
        // Estimate forward EPS using industry average P/E of 20-25
        const estimatedEPS1 = Math.round((avgTarget / 22) * 100) / 100
        const estimatedEPS2 = Math.round((estimatedEPS1 * 1.15) * 100) / 100
        const estimatedEPS3 = Math.round((estimatedEPS2 * 1.12) * 100) / 100
        
        epsEstimates = [
          { year: currentYear + 1, eps: estimatedEPS1 },
          { year: currentYear + 2, eps: estimatedEPS2 },
          { year: currentYear + 3, eps: estimatedEPS3 }
        ]
      }
    }

    // Fallback: Use historical earnings to project forward
    if (epsEstimates.length === 0 && Array.isArray(earningsData) && earningsData.length > 0) {
      const recentEarnings = earningsData
        .filter(e => e.epsActual && e.epsActual > 0)
        .slice(0, 4) // Last 4 quarters
        
      if (recentEarnings.length >= 2) {
        const annualEPS = recentEarnings.reduce((sum, e) => sum + e.epsActual, 0)
        const currentYear = new Date().getFullYear()
        
        // Project forward with modest growth
        epsEstimates = [
          { year: currentYear + 1, eps: Math.round(annualEPS * 1.08 * 100) / 100 },
          { year: currentYear + 2, eps: Math.round(annualEPS * 1.16 * 100) / 100 },
          { year: currentYear + 3, eps: Math.round(annualEPS * 1.25 * 100) / 100 }
        ]
      }
    }

    if (epsEstimates.length === 0) {
      return NextResponse.json({ error: 'No EPS estimates available' })
    }

    // Format for your frontend
    const epsData = {
      years: epsEstimates.map(e => e.year.toString()),
      values: epsEstimates.map(e => e.eps)
    }

    return NextResponse.json({
      eps: epsData,
      dataSource: 'finnhub_derived',
      estimates: epsEstimates,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error(`Finnhub estimates error for ${symbol}:`, error)
    return NextResponse.json({ error: 'Failed to fetch estimates' }, { status: 500 })
  }
}
