import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🔍 Market Data API: GET request received')
    
    // Try to read from file system first
    if (typeof window === 'undefined') {
      try {
        const fs = require('fs')
        const path = require('path')
        
        const dataPath = path.join(process.cwd(), 'data', 'market-data.json')
        console.log('📁 Checking file at:', dataPath)
        
        if (fs.existsSync(dataPath)) {
          const fileContents = fs.readFileSync(dataPath, 'utf8')
          const marketData = JSON.parse(fileContents)
          
          console.log('✅ File found, returning data:', Object.keys(marketData))
          
          // Ensure timestamp
          if (!marketData.lastUpdated) {
            marketData.lastUpdated = new Date().toISOString()
          }
          
          marketData.dataSource = 'manual'
          return NextResponse.json(marketData)
        }
      } catch (fileError) {
        console.warn('📄 File read error:', fileError.message)
      }
    }
    
    // Return demo data if no file found
    console.log('📊 Returning demo market data')
    const demoData = getDemoMarketData()
    return NextResponse.json(demoData)
    
  } catch (error) {
    console.error('❌ Market data API error:', error)
    return NextResponse.json(getDemoMarketData())
  }
}

export async function POST(request) {
  try {
    console.log('💾 Market Data API: POST request received')
    const marketData = await request.json()
    console.log('📥 Received data:', Object.keys(marketData))
    
    // Validate required fields
    const requiredFields = ['sp500', 'nasdaq', 'bitcoin', 'gold', 'oil']
    const missingFields = requiredFields.filter(field => !marketData[field])
    
    if (missingFields.length > 0) {
      console.warn('⚠️ Missing fields:', missingFields)
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }
    
    // Add metadata
    marketData.lastUpdated = new Date().toISOString()
    marketData.dataSource = 'manual'
    
    // Try to save to file system
    if (typeof window === 'undefined') {
      try {
        const fs = require('fs')
        const path = require('path')
        
        // Ensure data directory exists
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
          console.log('📁 Creating data directory:', dataDir)
          fs.mkdirSync(dataDir, { recursive: true })
        }
        
        // Save to JSON file
        const dataPath = path.join(dataDir, 'market-data.json')
        console.log('💾 Saving to file:', dataPath)
        fs.writeFileSync(dataPath, JSON.stringify(marketData, null, 2))
        
        console.log('✅ Data saved successfully')
        
        return NextResponse.json({ 
          success: true, 
          message: 'Market data updated successfully',
          lastUpdated: marketData.lastUpdated,
          saved: Object.keys(marketData).filter(k => k !== 'lastUpdated' && k !== 'dataSource').length
        })
      } catch (saveError) {
        console.error('💥 Save error:', saveError)
        return NextResponse.json(
          { error: `Failed to save: ${saveError.message}` },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Data processed (client-side mode)',
      lastUpdated: marketData.lastUpdated 
    })
    
  } catch (error) {
    console.error('❌ POST error:', error)
    return NextResponse.json(
      { error: `Server error: ${error.message}` },
      { status: 500 }
    )
  }
}

function getDemoMarketData() {
  // Demo fallback data with realistic variations
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
  
  // Add small variations to simulate live movement
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.005 // ±0.25% variation
    const item = baseData[key]
    const newPrice = item.price * (1 + variation)
    const newChange = item.change + (Math.random() - 0.5) * 0.2
    
    baseData[key] = {
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(newChange * 100) / 100
    }
  })
  
  baseData.dataSource = 'demo'
  baseData.lastUpdated = new Date().toISOString()
  
  return baseData
}
