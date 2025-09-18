// lib/api.js - FIXED: Remove HK stock duplicates from top
// Switch between demo and live data modes + daily CSV overlay

import { getDemoStockData, getDemoTickers, getDemoMarketData, DEMO_STOCK_DATA } from './demoData'
import { getOverlayUrl, fetchCsvText, parseCsvToObjects, indexByTicker, applyOverlay } from './sheetOverlay'

// Configuration - set to true for demo mode, false for live APIs
const DEMO_MODE = true

// 🔥 FIXED: Hong Kong stock symbols to filter out from initial positions
const HK_STOCK_SYMBOLS = ['700', '3690', '1810', '9988'];

// 🔥 FIXED: Enhanced data loading with proper overlay-only ticker support
export async function fetchStockData(ticker) {
  try {
    console.log(`Fetching data for ${ticker} - Demo Mode: ${DEMO_MODE}`)
    
    let baseData = null
    let isOverlayOnly = false

    if (DEMO_MODE) {
      // Try to get demo data first
      const demoData = getDemoStockData(ticker)
      if (demoData) {
        baseData = demoData
        console.log(`✅ Found base demo data for ${ticker}`)
      } else {
        // 🔥 NEW: Create minimal base data for overlay-only tickers
        console.log(`⚠️ No base demo data for ${ticker}, will check overlay...`)
        isOverlayOnly = true
        baseData = createMinimalStockData(ticker)
      }
    } else {
      baseData = await fetchLiveStockData(ticker)
    }

    // 🔥 CRITICAL: Always try overlay, especially for overlay-only tickers
    try {
      const overlayUrl = getOverlayUrl()
      if (overlayUrl) {
        console.log('🔄 Applying Google Sheet overlay...')
        
        const csvText = await fetchCsvText(overlayUrl)
        if (csvText) {
          const rows = parseCsvToObjects(csvText)
          const overlayMap = indexByTicker(rows)
          
          // Check if ticker exists in overlay
          const hasOverlayData = overlayMap.has(ticker.toUpperCase())
          console.log(`🔍 Ticker ${ticker} in overlay: ${hasOverlayData}`)
          
          if (hasOverlayData) {
            // Apply overlay to single stock
            const overlayedData = applyOverlay([baseData], overlayMap)
            if (overlayedData && overlayedData.length > 0) {
              console.log(`✅ Google Sheet overlay applied successfully for ${ticker}`)
              return overlayedData[0]
            }
          } else if (isOverlayOnly) {
            // Ticker exists neither in demo nor overlay
            throw new Error(`Ticker "${ticker.toUpperCase()}" not found in data sources. Please verify the symbol.`)
          }
        }
      } else {
        console.log('⚠️ No Google Sheet overlay URL configured')
        if (isOverlayOnly) {
          throw new Error(`Ticker "${ticker.toUpperCase()}" not available. No overlay data source configured.`)
        }
      }
    } catch (overlayError) {
      console.warn('⚠️ Google Sheet overlay failed:', overlayError.message)
      if (isOverlayOnly) {
        // If this is an overlay-only ticker and overlay failed, we can't proceed
        throw new Error(`Ticker "${ticker.toUpperCase()}" not found. ${overlayError.message}`)
      }
    }

    // Return base data if overlay fails or ticker wasn't in overlay
    if (!isOverlayOnly) {
      console.log(`✅ Returning base data for ${ticker}`)
      return baseData
    } else {
      throw new Error(`Ticker "${ticker.toUpperCase()}" not found in available data sources.`)
    }

  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
  }
}

// 🔥 NEW: Create minimal stock data for overlay-only tickers
function createMinimalStockData(ticker) {
  return {
    ticker: ticker.toUpperCase(),
    name: `${ticker.toUpperCase()} Corporation`,
    sector: 'Unknown',
    price: 0,
    change: 0,
    changePercent: 0,
    marketCap: 'N/A',
    eps: null,
    peBands: null,
    scores: { value: 0, growth: 0, profit: 0, momentum: 0 },
    forwardPE: 'N/A',
    ttmPE: 'N/A',
    peers: [],
    segments: [],
    strengths: ['Loading from overlay data...'],
    risks: ['Loading from overlay data...'],
    news: [],
    description: 'Loading company information from overlay data...',
    dataQuality: {
      quote: 'overlay_only',
      estimates: 'overlay_only',
      peHistory: 'overlay_only',
      peers: 'overlay_only',
      segments: 'overlay_only',
      news: 'overlay_only',
      source: 'OVERLAY_ONLY'
    },
    lastUpdated: new Date().toISOString()
  }
}

// New function to get all stock data with overlay (for reports listing)
export async function getAllStockData() {
  try {
    console.log('🔄 Loading all stock data with overlay...')
    
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
          
          // 🔥 FIXED: Remove duplicates - filter out HK stocks from the mixed list
          const deduplicatedData = removeDuplicates(overlayedData)
          
          console.log(`✅ Google Sheet overlay applied and deduplicated: ${deduplicatedData.length} stocks`)
          return deduplicatedData
        }
      }
    } catch (overlayError) {
      console.warn('⚠️ Google Sheet overlay failed for all stocks, using base data:', overlayError.message)
    }

    return baseData

  } catch (error) {
    console.error('Error fetching all stock data:', error)
    return []
  }
}

// 🔥 NEW: Remove duplicate Hong Kong stocks, keeping only the ones that should be at the bottom
function removeDuplicates(stocksArray) {
  const seen = new Set()
  const result = []
  const hkStocksForBottom = []
  
  console.log('🔍 Before deduplication:', stocksArray.map(s => s.ticker))
  
  for (const stock of stocksArray) {
    const ticker = stock.ticker?.toUpperCase()
    
    if (!ticker) continue
    
    // If this is an HK stock
    if (HK_STOCK_SYMBOLS.includes(ticker)) {
      if (!seen.has(ticker)) {
        // First time seeing this HK stock - save it for the bottom
        hkStocksForBottom.push(stock)
        seen.add(ticker)
        console.log(`🇭🇰 Saved HK stock for bottom: ${ticker}`)
      } else {
        console.log(`🗑️ Skipping duplicate HK stock: ${ticker}`)
      }
    } else {
      // For US stocks, just add them normally (no duplicates expected)
      if (!seen.has(ticker)) {
        result.push(stock)
        seen.add(ticker)
        console.log(`🇺🇸 Added US stock: ${ticker}`)
      } else {
        console.log(`🗑️ Skipping duplicate US stock: ${ticker}`)
      }
    }
  }
  
  // Add HK stocks at the end
  result.push(...hkStocksForBottom)
  
  console.log('✅ After deduplication:', result.map(s => s.ticker))
  console.log(`📊 Final count: ${result.length} stocks (${result.length - hkStocksForBottom.length} US + ${hkStocksForBottom.length} HK)`)
  
  return result
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

// Get available tickers including overlay data
export async function getAvailableTickers() {
  try {
    // Get all stock data including overlay (this will now be deduplicated)
    const allStocks = await getAllStockData()
    
    // Extract tickers and sort them, ensuring no duplicates
    const allTickers = [...new Set(allStocks
      .map(stock => stock.ticker?.toUpperCase())
      .filter(Boolean))]
    
    // 🔥 FIXED: Apply the same sorting logic to ensure US stocks first, HK stocks last
    const sortedTickers = allTickers.sort((a, b) => {
      const aIsHK = HK_STOCK_SYMBOLS.includes(a)
      const bIsHK = HK_STOCK_SYMBOLS.includes(b)
      
      // If both are HK or both are US, sort alphabetically
      if (aIsHK === bIsHK) {
        return a.localeCompare(b)
      }
      
      // US stocks (-1) come FIRST, HK stocks (+1) go to BOTTOM
      return aIsHK ? 1 : -1
    })
    
    console.log(`📋 Available tickers (${sortedTickers.length}):`, sortedTickers.slice(0, 20), '...')
    console.log(`📊 Base stocks: ${allStocks.filter(s => !s.dataQuality?.overlayed).length}`)
    console.log(`📊 Overlay stocks: ${allStocks.filter(s => s.dataQuality?.overlayed).length}`)
    console.log(`📊 Total unique tickers: ${sortedTickers.length}`)
    console.log(`🇺🇸 US stocks at top: ${sortedTickers.filter(t => !HK_STOCK_SYMBOLS.includes(t)).slice(0, 10)}`)
    console.log(`🇭🇰 HK stocks at bottom: ${sortedTickers.filter(t => HK_STOCK_SYMBOLS.includes(t))}`)
    
    return sortedTickers
    
  } catch (error) {
    console.error('Error getting available tickers:', error)
    
    // Fallback to base demo tickers if overlay fails
    if (DEMO_MODE) {
      return getDemoTickers()
    }
    return ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA'] // Live API supported tickers
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
