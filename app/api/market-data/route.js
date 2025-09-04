import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    // Try to read market data from JSON file
    const dataPath = path.join(process.cwd(), 'data', 'market-data.json')
    
    try {
      const fileContents = await fs.readFile(dataPath, 'utf8')
      const marketData = JSON.parse(fileContents)
      
      // Add timestamp if not present
      if (!marketData.lastUpdated) {
        marketData.lastUpdated = new Date().toISOString()
      }
      
      // Mark as manually updated
      marketData.dataSource = 'manual'
      
      return NextResponse.json(marketData)
    } catch (fileError) {
      // If file doesn't exist, return demo data
      console.warn('Market data file not found, returning demo data')
      return NextResponse.json(getDemoMarketData())
    }
    
  } catch (error) {
    console.error('Market data API error:', error)
    return NextResponse.json(getDemoMarketData())
  }
}

export async function POST(request) {
  try {
    const marketData = await request.json()
    
    // Validate required fields
    const requiredFields = ['sp500', 'nasdaq', 'bitcoin', 'gold', 'oil']
    const missingFields = requiredFields.filter(field => !marketData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }
    
    // Add metadata
    marketData.lastUpdated = new Date().toISOString()
    marketData.dataSource = 'manual'
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data')
    try {
      await fs.access(dataDir)
    } catch {
      await fs.mkdir(dataDir, { recursive: true })
    }
    
    // Save to JSON file
    const dataPath = path.join(dataDir, 'market-data.json')
    await fs.writeFile(dataPath, JSON.stringify(marketData, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      message: 'Market data updated successfully',
      lastUpdated: marketData.lastUpdated 
    })
    
  } catch (error) {
    console.error('Error updating market data:', error)
    return NextResponse.json(
      { error: 'Failed to update market data' },
      { status: 500 }
    )
  }
}

function getDemoMarketData() {
  // Fallback demo data
  const baseData = {
    sp500: { price: 6045.23, change: 0.85 },
    nasdaq: { price: 19892.15, change: 1.12 },
    dow: { price: 44234.56, change: 0.45 },
    bitcoin: { price: 94650, change: -1.85 },
    gold: { price: 2647.30, change: 0.32 },
    oil: { price: 69.85, change: -0.98 },
    vix: { price: 16.45, change: -2.15 },
    euro: { price: 1.0435, change: 0.15 },
    yen: { price: 156.78, change: -0.25 }
  }
  
  baseData.dataSource = 'demo'
  baseData.lastUpdated = new Date().toISOString()
  
  return baseData
}
