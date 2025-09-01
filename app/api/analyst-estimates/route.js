import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter required' }, { status: 400 })
  }

  try {
    // Yahoo Finance doesn't require API key for basic data
    const quoteUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    const quoteResponse = await fetch(quoteUrl)
    const quoteData = await quoteResponse.json()

    if (quoteData.chart.error) {
      return NextResponse.json({ error: 'Symbol not found' })
    }

    const result = quoteData.chart.result[0]
    const meta = result.meta
    
    // Get basic financial data
    const summaryUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=defaultKeyStatistics,financialData,earnings`
    const summaryResponse = await fetch(summaryUrl)
    const summaryData = await summaryResponse.json()

    const keyStats = summaryData.quoteSummary?.result?.[0]?.defaultKeyStatistics
    const financials = summaryData.quoteSummary?.result?.[0]?.financialData
    const earnings = summaryData.quoteSummary?.result?.[0]?.earnings

    return NextResponse.json({
      symbol: symbol.toUpperCase(),
      price: meta.regularMarketPrice,
      change: meta.regularMarketPrice - meta.previousClose,
      changePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
      marketCap: keyStats?.marketCap ? `${(keyStats.marketCap.raw / 1e9).toFixed(1)}B` : 'N/A',
      forwardPE: keyStats?.forwardPE?.raw || 'N/A',
      trailingPE: keyStats?.trailingPE?.raw || 'N/A',
      sector: meta.instrumentType || 'Unknown',
      dataSource: 'yahoo_free',
      earnings: earnings,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Yahoo Finance API error:', error)
    return NextResponse.json({ error: 'Failed to fetch data from Yahoo Finance' }, { status: 500 })
  }
}
