// lib/api.js - Enhanced with full 115+ stock support from Google Sheet
// Optimized for fast search and reliable data loading

import { getDemoStockData, getDemoTickers, getDemoMarketData, DEMO_STOCK_DATA } from './demoData'
import { getOverlayUrl, fetchCsvText, parseCsvToObjects, indexByTicker, applyOverlay } from './sheetOverlay'

// Configuration
const DEMO_MODE = true

// Cache for better performance
let stockCache = null
let cacheTimestamp = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Enhanced data loading with Google Sheet overlay and caching
export async function fetchStockData(ticker) {
  try {
    console.log(`🔍 Fetching data for ${ticker} - Demo Mode: ${DEMO_MODE}`)
    
    // First, try to get from all stocks data (includes Google Sheet overlay)
    const allStocks = await getAllStockData()
    const foundStock = allStocks.find(stock => 
      stock.ticker.toUpperCase() === ticker.toUpperCase()
    )
    
    if (foundStock) {
      console.log(`✅ Found ${ticker} in comprehensive stock list`)
      return foundStock
    }
    
    // Fallback: try base demo data only
    if (DEMO_MODE) {
      const demoData = getDemoStockData(ticker)
      if (demoData) {
        console.log(`✅ Found ${ticker} in base demo data`)
        return demoData
      }
    }
    
    // If not found anywhere, throw error with helpful message
    const availableTickers = allStocks.map(s => s.ticker).slice(0, 10).join(', ')
    throw new Error(
      `Stock "${ticker.toUpperCase()}" not found. Try one of: ${availableTickers}... or search our full list of ${allStocks.length}+ stocks.`
    )

  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
  }
}

// Enhanced function to get all stock data with caching and overlay
export async function getAllStockData() {
  try {
    // Check cache first
    const now = Date.now()
    if (stockCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log(`📋 Using cached stock data (${stockCache.length} stocks)`)
      return stockCache
    }
    
    console.log('🔄 Loading fresh stock data with overlay...')
    
    // Get base data
    let baseData = []
    if (DEMO_MODE) {
      // Convert demo data object to array
      const tickers = getDemoTickers()
      baseData = tickers.map(ticker => getDemoStockData(ticker)).filter(Boolean)
    } else {
      // In live mode, you'd fetch all your supported tickers
      const supportedTickers = ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA'] // Adjust as needed
      baseData = await Promise.all(
        supportedTickers.map(ticker => fetchLiveStockData(ticker).catch(err => {
          console.warn(`Failed to load ${ticker}:`, err)
          return null
        }))
      ).then(results => results.filter(Boolean))
    }

    console.log(`📊 Base data loaded: ${baseData.length} stocks`)

    // Apply Google Sheet overlay (this is where the 115+ stocks come from)
    let finalData = baseData
    try {
      const overlayUrl = getOverlayUrl()
      if (overlayUrl) {
        console.log('🔄 Applying Google Sheet overlay for all stocks...')
        
        const csvText = await fetchCsvText(overlayUrl)
        if (csvText) {
          const rows = parseCsvToObjects(csvText)
          const overlayMap = indexByTicker(rows)
          
          // Apply overlay to existing stocks and create new ones from Google Sheet
          finalData = applyOverlay(baseData, overlayMap)
          console.log(`✅ Google Sheet overlay applied: ${finalData.length} total stocks`)
        }
      } else {
        console.log('⚠️  No Google Sheet overlay URL configured, using base data only')
      }
    } catch (overlayError) {
      console.warn('⚠️  Google Sheet overlay failed, using base data:', overlayError.message)
    }

    // Sort alphabetically for better UX
    finalData.sort((a, b) => a.ticker.localeCompare(b.ticker))
    
    // Update cache
    stockCache = finalData
    cacheTimestamp = now
    
    console.log(`✅ Final stock data ready: ${finalData.length} stocks`)
    return finalData

  } catch (error) {
    console.error('Error fetching all stock data:', error)
    // Return empty array instead of throwing to prevent app crashes
    return []
  }
}

// Fast search function for autocomplete
export async function searchStocks(query, limit = 8) {
  if (!query || query.length < 1) return []
  
  try {
    const allStocks = await getAllStockData()
    const searchTerm = query.toUpperCase()
    
    const results = allStocks
      .filter(stock => 
        stock.ticker.includes(searchTerm) || 
        stock.name.toUpperCase().includes(searchTerm)
      )
      .slice(0, limit)
      .map(stock => ({
        ticker: stock.ticker,
        name: stock.name,
        price: stock.price,
        sector: stock.sector
      }))
    
    return results
  } catch (error) {
    console.error('Error searching stocks:', error)
    return []
  }
}

// Get stock count for homepage
export async function getStockCount() {
  try {
    const allStocks = await getAllStockData()
    return allStocks.length
  } catch (error) {
    console.error('Error getting stock count:', error)
    return 100 // Fallback
  }
}

// Market data with overlay support
export async function fetchMarketData() {
  if (DEMO_MODE) {
    // Add small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    return getDemoMarketData()
  }
  
  // Live market data implementation would go here
  return {
    spy: { price: 6448.26, change: 0.73, changePercent: 0.11 },
    nasdaq: { price: 23414.84, change: 98.45, changePercent: 0.42 },
    btc: { price: 111822.48, change: -2485.67, changePercent: -2.18 },
    gold: { price: 3542.51, change: 15.23, changePercent: 0.43 },
    oil: { price: 63.58, change: -1.89, changePercent: -2.89 }
  }
}

// News data with overlay support  
export async function fetchNewsData() {
  if (DEMO_MODE) {
    return [
      {
        headline: 'Global Markets Rally on Tech Earnings Beat',
        summary: 'Major technology companies exceed Q4 expectations driving broad market gains...',
        source: 'Financial Times',
        datetime: '2 hours ago',
        url: 'https://www.ft.com/markets'
      },
      {
        headline: 'Fed Signals Measured Approach to Rate Adjustments',
        summary: 'Federal Reserve maintains current stance while monitoring inflation data...',
        source: 'Reuters',
        datetime: '4 hours ago',
        url: 'https://www.reuters.com/business/finance'
      },
      {
        headline: 'Asian Markets Mixed Amid Trade Optimism',
        summary: 'Hong Kong and Shanghai indices show divergent performance...',
        source: 'Bloomberg',
        datetime: '6 hours ago',
        url: 'https://www.bloomberg.com/asia'
      }
    ]
  }
  
  // Live news implementation would go here
  return [
    {
      headline: 'Market Update: Live news will be available soon',
      summary: 'Currently in demo mode with sample news data.',
      source: 'Demo',
      datetime: 'Just now',
      url: '#'
    }
  ]
}

// Utility functions
export function clearStockCache() {
  stockCache = null
  cacheTimestamp = null
  console.log('🗑️ Stock cache cleared')
}

export function getCacheStatus() {
  return {
    hasCachedData: !!stockCache,
    cacheTimestamp,
    cacheAge: cacheTimestamp ? Date.now() - cacheTimestamp : null,
    stockCount: stockCache ? stockCache.length : 0
  }
}

// Helper function to switch modes (for development)
export function setDemoMode(enabled) {
  console.log(`🔄 Switching to ${enabled ? 'DEMO' : 'LIVE'} mode`)
  clearStockCache() // Clear cache when switching modes
}

// Get available demo tickers (for compatibility)
export function getAvailableTickers() {
  if (DEMO_MODE) {
    return getDemoTickers()
  }
  return ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA'] // Live API supported tickers
}

// Live API implementation (for when you go live)
async function fetchLiveStockData(ticker) {
  // Your existing live API code would go here
  // This is a placeholder for the actual implementation
  console.log(`🔴 Live API not implemented yet for ${ticker}`)
  throw new Error('Live API not yet implemented')
}

// Retry helper for API calls
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
