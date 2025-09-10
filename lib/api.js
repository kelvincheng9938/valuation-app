// lib/api.js - Updated with Google Sheet Overlay System
import { getDemoStockData, getDemoTickers, getDemoMarketData, DEMO_STOCK_DATA } from './demoData'
import { getOverlayUrl, fetchCsvText, parseCsvToObjects, indexByTicker, applyOverlay } from './sheetOverlay'

const DEMO_MODE = true

export async function fetchStockData(ticker) {
  try {
    console.log(`Fetching data for ${ticker} - Demo Mode: ${DEMO_MODE}`)
    
    // Get base data first
    const baseData = getDemoStockData(ticker)
    if (!baseData) {
      throw new Error(`Demo data not available for "${ticker.toUpperCase()}". Available tickers: ${getDemoTickers().join(', ')}`)
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

    return baseData
  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
  }
}

// Keep your existing functions
export async function getAllStockData() {
  // ... (your existing getAllStockData function)
}

export function getAvailableTickers() {
  return getDemoTickers()
}

// ... (keep other existing functions)
