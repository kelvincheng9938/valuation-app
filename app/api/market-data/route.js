import { NextResponse } from 'next/server'

// Simple in-memory storage for demo purposes
let marketDataStore = {
  sp500: { price: 6045.23, change: 0.85 },
  nasdaq: { price: 19892.15, change: 1.12 },
  bitcoin: { price: 94650, change: -1.85 },
  gold: { price: 2647.30, change: 0.32 },
  oil: { price: 69.85, change: -0.98 },
  lastUpdated: new Date().toISOString(),
  dataSource: 'manual'
}

export async function GET() {
  try {
    return NextResponse.json({
      ...marketDataStore,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Market data GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const data = await request.json()
    
    const validKeys = ['sp500', 'nasdaq', 'bitcoin', 'gold', 'oil']
    const updates = {}
    
    for (const key of validKeys) {
      if (data[key] && typeof data[key] === 'object') {
        if (typeof data[key].price === 'number' && typeof data[key].change === 'number') {
          updates[key] = {
            price: data[key].price,
            change: data[key].change
          }
        }
      }
    }
    
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid market data provided' },
        { status: 400 }
      )
    }
    
    marketDataStore = {
      ...marketDataStore,
      ...updates,
      lastUpdated: new Date().toISOString(),
      dataSource: 'manual'
    }
    
    return NextResponse.json({
      success: true,
      message: `Updated ${Object.keys(updates).length} market indices`,
      updated: Object.keys(updates),
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Market data POST error:', error)
    return NextResponse.json(
      { error: 'Failed to update market data' },
      { status: 500 }
    )
  }
}
