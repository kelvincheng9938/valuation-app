// lib/api.js - Updated with Google Sheet Overlay System
// Switch between demo and live data modes + daily CSV overlay

import { getDemoStockData, getDemoTickers, getDemoMarketData, DEMO_STOCK_DATA } from './demoData'
import { getOverlayUrl, fetchCsvText, parseCsvToObjects, indexByTicker, applyOverlay } from './sheetOverlay'

// Configuration - set to true for demo mode, false for live APIs
const DEMO_MODE = true

// Enhanced data loading with Google Sheet overlay
export async function fetchStockData(ticker) {
  try {
    console.log(`Fetching data for ${ticker} - Demo Mode: ${DEMO_MODE}`)
    
    // Get base data first
    let baseData
    if (DEMO_MODE) {
      const demoData = getDemoStockData(ticker)
      if (!demoData) {
        throw new Error(`Demo data not available for "${ticker.toUpperCase()}". Available tickers: ${getDemoTickers().join(', ')}`)
      }
      baseData = demoData
    } else {
      baseData = await fetchLiveStockData(ticker)
    }

    console.log('Base data loaded successfully:', baseData.name)

    // Apply Google Sheet overlay if available
    try {
      const overlayUrl = getOverlayUrl()
      if (overlayUrl) {
        console.log('🔄 Applying Google Sheet overlay...')
        
        const csvText = await fetchCsvText(overlayUrl)
        if (csvText) {
          const rows = parseCsvToObjects(csvText)
          const overlayMap = indexByTicker(rows)
          
          // Apply overlay to single stock (convert to array for applyOverlay function)
          const overlayedData = applyOverlay([baseData], overlayMap)
          if (overlayedData && overlayedData.length > 0) {
            console.log('✅ Google Sheet overlay applied successfully')
            return overlayedData[0]
          }
        }
      } else {
        console.log('⚠️  No Google Sheet overlay URL configured')
      }
    } catch (overlayError) {
      console.warn('⚠️  Google Sheet overlay failed, using base data:', overlayError.message)
    }

    // Return base data if overlay fails or is not configured
    return baseData

  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
  }
}

// New function to get all stock data with overlay (for reports listing)
export async function getAllStockData() {
  try {
    console.log('🔄 Loading all stock data with overlay...')
    
    // Get base data
    let baseData
    if (DEMO_MODE) {
      // Convert demo data object to array
      baseData = Object.keys(DEMO_STOCK_DATA).map(ticker => getDemoStockData(ticker)).filter(Boolean)
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

    console.log(`Base data loaded: ${baseData.length} stocks`)

    // Apply Google Sheet overlay
    try {
      const overlayUrl = getOverlayUrl()
      if (overlayUrl) {
        console.log('🔄 Applying Google Sheet overlay to all stocks...')
        
        const csvText = await fetchCsvText(overlayUrl)
        if (csvText) {
          const rows = parseCsvToObjects(csvText)
          const overlayMap = indexByTicker(rows)
          
          const overlayedData = applyOverlay(baseData, overlayMap)
          console.log(`✅ Google Sheet overlay applied to ${overlayedData.length} stocks`)
          return overlayedData
        }
      }
    } catch (overlayError) {
      console.warn('⚠️  Google Sheet overlay failed for all stocks, using base data:', overlayError.message)
    }

    return baseData

  } catch (error) {
    console.error('Error fetching all stock data:', error)
    return []
  }
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

  console.log('API responses:', { estimates, peHistory, peers, segments, news })

  // Step 3: Calculate derived metrics
  let forwardPE = 'N/A'
  let ttmPE = 'N/A'
  
  if (!estimates.error && estimates.eps?.values?.length > 0) {
    forwardPE = Math.round((quoteData.c / estimates.eps.values[0]) * 100) / 100
  }
  
  if (quoteData.basic?.ttmEPS) {
    ttmPE = Math.round((quoteData.c / quoteData.basic.ttmEPS) * 100) / 100
  }

  // Step 4: Build comprehensive stock data object
  const stockData = {
    ticker: ticker.toUpperCase(),
    name: quoteData.basic?.name || `${ticker.toUpperCase()} Corp`,
    sector: quoteData.basic?.finnhubIndustry || 'Unknown',
    
    // Price data
    price: quoteData.c,
    change: quoteData.d,
    changePercent: quoteData.dp,
    
    // Key stats
    marketCap: quoteData.basic?.marketCapitalization || 0,
    forwardPE: forwardPE,
    ttmPE: ttmPE,
    
    // Analyst estimates
    eps: estimates.error ? null : estimates.eps,
    
    // Valuation bands
    peBands: peHistory.error ? null : peHistory.peBands,
    
    // Related companies
    peers: peers.error ? [] : (peers.peers || []),
    
    // Business segments  
    segments: segments.error ? [] : (segments.segments || []),
    
    // Company analysis
    strengths: ['Strong market position', 'Solid financials', 'Growth opportunities'],
    risks: ['Market competition', 'Regulatory changes', 'Economic headwinds'],
    
    // Recent news
    news: news.error ? [] : (news.news || []),
    
    // Data quality indicators
    dataQuality: {
      quote: !quoteData.error,
      estimates: !estimates.error,
      peHistory: !peHistory.error,
      peers: !peers.error,
      segments: !segments.error,
      news: !news.error,
      source: 'LIVE_API'
    },
    
    lastUpdated: new Date().toISOString()
  }

  return stockData
}

async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return await response.json()
      }
      throw new Error(`HTTP ${response.status}`)
    } catch (error) {
      console.warn(`Attempt ${i + 1} failed for ${url}:`, error.message)
      if (i === retries) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}

// Market data with overlay support
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

// Get news with overlay support (placeholder for now)
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
  // Note: In production, you'd want to store this in localStorage or environment
  console.log(`Switching to ${enabled ? 'DEMO' : 'LIVE'} mode`)
  // This would require a restart in the current implementation
  // but could be made dynamic with state management
}

// Get available demo tickers
export function getAvailableTickers() {
  if (DEMO_MODE) {
    return getDemoTickers()
  }
  return ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA'] // Live API supported tickers
}
