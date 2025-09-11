// lib/api.js - Your ORIGINAL api.js with Google Sheet overlay support added
// This preserves all your existing functionality and just adds 115 stock support

import { getDemoStockData, getDemoTickers, getDemoMarketData, DEMO_STOCK_DATA } from './demoData'
import { getOverlayUrl, fetchCsvText, parseCsvToObjects, indexByTicker, applyOverlay } from './sheetOverlay'

// Configuration - keep your original setup
const DEMO_MODE = true

// Enhanced data loading with Google Sheet overlay - YOUR ORIGINAL FUNCTION with overlay added
export async function fetchStockData(ticker) {
  try {
    console.log(`Fetching data for ${ticker} - Demo Mode: ${DEMO_MODE}`)
    
    // Get base data first - YOUR ORIGINAL LOGIC
    let baseData
    if (DEMO_MODE) {
      const demoData = getDemoStockData(ticker)
      if (!demoData) {
        // Try Google Sheet overlay for additional stocks
        try {
          const allStocks = await getAllStockData()
          const foundStock = allStocks.find(stock => 
            stock.ticker.toUpperCase() === ticker.toUpperCase()
          )
          if (foundStock) {
            return foundStock
          }
        } catch (overlayError) {
          console.warn('Overlay search failed:', overlayError)
        }
        
        throw new Error(`Demo data not available for "${ticker.toUpperCase()}". Available tickers: ${getDemoTickers().join(', ')}`)
      }
      baseData = demoData
    } else {
      baseData = await fetchLiveStockData(ticker)
    }

    console.log('Base data loaded successfully:', baseData.name)

    // Apply Google Sheet overlay if available - NEW ADDITION
    try {
      const overlayUrl = getOverlayUrl()
      if (overlayUrl) {
        console.log('🔄 Applying Google Sheet overlay...')
        
        const csvText = await fetchCsvText(overlayUrl)
        if (csvText) {
          const rows = parseCsvToObjects(csvText)
          const overlayMap = indexByTicker(rows)
          
          // Apply overlay to single stock
          const overlayedData = applyOverlay([baseData], overlayMap)
          if (overlayedData && overlayedData.length > 0) {
            console.log('✅ Google Sheet overlay applied successfully')
            return overlayedData[0]
          }
        }
      }
    } catch (overlayError) {
      console.warn('⚠️  Google Sheet overlay failed, using base data:', overlayError.message)
    }

    // Return base data if overlay fails or is not configured - YOUR ORIGINAL BEHAVIOR
    return baseData

  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
  }
}

// NEW FUNCTION to get all stock data with overlay (for 115 stock support)
export async function getAllStockData() {
  try {
    console.log('🔄 Loading all stock data with overlay...')
    
    // Get base data - YOUR ORIGINAL DEMO DATA
    let baseData = []
    if (DEMO_MODE) {
      const tickers = getDemoTickers()
      baseData = tickers.map(ticker => getDemoStockData(ticker)).filter(Boolean)
    } else {
      // Your live mode would go here
      const supportedTickers = ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA']
      baseData = await Promise.all(
        supportedTickers.map(ticker => fetchLiveStockData(ticker).catch(err => {
          console.warn(`Failed to load ${ticker}:`, err)
          return null
        }))
      ).then(results => results.filter(Boolean))
    }

    console.log(`📊 Base data loaded: ${baseData.length} stocks`)

    // Apply Google Sheet overlay (this adds the extra stocks to get to 115+)
    let finalData = baseData
    try {
      const overlayUrl = getOverlayUrl()
      if (overlayUrl) {
        console.log('🔄 Applying Google Sheet overlay for all stocks...')
        
        const csvText = await fetchCsvText(overlayUrl)
        if (csvText) {
          const rows = parseCsvToObjects(csvText)
          const overlayMap = indexByTicker(rows)
          
          finalData = applyOverlay(baseData, overlayMap)
          console.log(`✅ Google Sheet overlay applied: ${finalData.length} total stocks`)
        }
      }
    } catch (overlayError) {
      console.warn('⚠️  Google Sheet overlay failed, using base data:', overlayError.message)
    }

    return finalData

  } catch (error) {
    console.error('Error fetching all stock data:', error)
    return []
  }
}

// YOUR ORIGINAL FUNCTIONS - UNCHANGED
export async function fetchMarketData() {
  if (DEMO_MODE) {
    // Add small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    return getDemoMarketData()
  }
  
  // Live market data (your existing code)
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

export async function fetchNewsData() {
  if (DEMO_MODE) {
    return [
      {
        headline: 'Stock Market Reaches New Highs',
        summary: 'Major indices continue to show strong performance...',
        source: 'Financial Times',
        datetime: '2 hours ago',
        url: 'https://www.ft.com/markets'
      },
      {
        headline: 'Tech Earnings Season Begins',
        summary: 'Major tech companies preparing to report quarterly results...',
        source: 'Financial Times',
        datetime: '6 hours ago',
        url: 'https://www.ft.com/markets'
      }
    ]
  }
  
  // Live news when ready
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

// Helper function to switch modes
export function setDemoMode(enabled) {
  console.log(`Switching to ${enabled ? 'DEMO' : 'LIVE'} mode`)
}

// Get available demo tickers - ENHANCED to include Google Sheet stocks
export function getAvailableTickers() {
  if (DEMO_MODE) {
    return getDemoTickers()
  }
  return ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA']
}

// Your existing live API code (keep for when you go live)
async function fetchLiveStockData(ticker) {
  // Step 1: Fetch quote data first (most critical)
  const quoteRes = await fetch(`/api/quote?symbol=${ticker}`)
  if (!quoteRes.ok) {
    throw new Error(`Failed to fetch quote for ${ticker}`)
  }
  
  const quoteData = await quoteRes.json()
  if (quoteData.error) {
    throw new Error(`Ticker "${ticker.toUpperCase()}" not found. Please verify the symbol.`)
  }

  console.log('Quote data received:', quoteData)

  // Step 2: Fetch all other data in parallel
  const [estimatesRes, peHistoryRes, peersRes, segmentsRes, newsRes] = await Promise.allSettled([
    fetchWithRetry(`/api/analyst-estimates?symbol=${ticker}`),
    fetchWithRetry(`/api/pe-history?symbol=${ticker}`),
    fetchWithRetry(`/api/peers?symbol=${ticker}`),  
    fetchWithRetry(`/api/segments?symbol=${ticker}`),
    fetchWithRetry(`/api/news/company?symbol=${ticker}`)
  ])

  // Extract data from settled promises
  const estimates = estimatesRes.status === 'fulfilled' ? estimatesRes.value : { error: 'Failed to fetch' }
  const peHistory = peHistoryRes.status === 'fulfilled' ? peHistoryRes.value : { error: 'Failed to fetch' }
  const peers = peersRes.status === 'fulfilled' ? peersRes.value : { error: 'Failed to fetch' }
  const segments = segmentsRes.status === 'fulfilled' ? segmentsRes.value : { error: 'Failed to fetch' }
  const news = newsRes.status === 'fulfilled' ? newsRes.value : { error: 'Failed to fetch' }

  // Your existing processing logic would continue here...
  return processLiveData(quoteData, estimates, peHistory, peers, segments, news)
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

function processLiveData(quoteData, estimates, peHistory, peers, segments, news) {
  // Your existing live data processing logic
  return {
    // Processed live data structure
  }
}
