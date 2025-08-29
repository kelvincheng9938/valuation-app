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
    // Fetch current quote
    const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    const quoteResponse = await fetch(quoteUrl)
    const quoteData = await quoteResponse.json()

    if (!quoteData.c || quoteData.c === 0) {
      return NextResponse.json({ error: 'No quote data available' })
    }

    // Fetch company profile for market cap and other details
    const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    const profileResponse = await fetch(profileUrl)
    const profileData = await profileResponse.json()

    const response = {
      symbol: symbol.toUpperCase(),
      price: quoteData.c, // Current price
      change: quoteData.d, // Change
      changePercent: quoteData.dp, // Change percent
      marketCap: profileData.marketCapitalization ? `${(profileData.marketCapitalization / 1000).toFixed(1)}B` : 'N/A',
      name: profileData.name || `${symbol.toUpperCase()} Corporation`,
      sector: profileData.finnhubIndustry || 'Unknown',
      description: profileData.description || `${symbol.toUpperCase()} is a company operating in the ${profileData.finnhubIndustry || 'business'} sector.`
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Quote API error:', error)
    return NextResponse.json({ error: 'Failed to fetch quote data' }, { status: 500 })
  }
}
