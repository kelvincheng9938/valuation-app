// lib/sheetOverlay.js - Google Sheet CSV Overlay System
// Overlays daily CSV data onto base demo data

export function getOverlayUrl() {
  // Read from environment variable, fallback to placeholder
  const envUrl = process.env.NEXT_PUBLIC_DAILY_CSV_URL
  
  if (!envUrl || envUrl === '<PASTE_MY_GOOGLE_SHEET_CSV_URL_HERE>') {
    console.warn('⚠️  NEXT_PUBLIC_DAILY_CSV_URL not configured, skipping overlay')
    return null
  }
  
  return envUrl
}

export async function fetchCsvText(url) {
  if (!url) return null
  
  console.log('🔄 Fetching CSV from:', url)
  
  const response = await fetch(url, { 
    cache: 'no-store',
    headers: {
      'Accept': 'text/csv,text/plain,*/*'
    }
  })
  
  if (!response.ok) {
    throw new Error(`CSV fetch failed: ${response.status} ${response.statusText}`)
  }
  
  const csvText = await response.text()
  console.log('✅ CSV fetched successfully, length:', csvText.length)
  
  return csvText
}

export function parseCsvToObjects(csvText) {
  if (!csvText || csvText.trim().length === 0) {
    console.warn('⚠️  Empty CSV text')
    return []
  }
  
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) {
    console.warn('⚠️  CSV has no data rows')
    return []
  }
  
  // Parse header row
  const headers = parseCsvLine(lines[0])
  console.log('📋 CSV Headers:', headers)
  
  // Expected headers from your spec
  const expectedHeaders = [
    'Ticker', 'EPS_2025', 'EPS_2026', 'EPS_2027', 'p25', 'p50', 'p75',
    'Target_2025_low', 'Target_2025_mid', 'Target_2025_high',
    'Target_2026_low', 'Target_2026_mid', 'Target_2026_high',
    'Target_2027_low', 'Target_2027_mid', 'Target_2027_high',
    'Mkt_Price', 'Value Score', 'Growth Score', 'Profit Score', 'Momentum Score',
    'Peer1', 'Peer1 PE', 'Peer1 Market Cap', 'Peer2', 'Peer2 PE', 'Peer2 Market Cap',
    'Peer3', 'Peer3 PE', 'Peer3 Market Cap', 'Peer4', 'Peer4 PE', 'Peer4 Market Cap',
    'Segment 1', '%', 'Segment 2', '%', 'Segment 3', '%', 'Segment 4', '%', 'Segment 5', '%', 'Segment 6', '%',
    'Strength 1', 'Strength 2', 'Strength 3', 'Risk 1', 'Risk 2', 'Risk 3',
    'News 1', 'Link', 'News 2', 'Link', 'Last_Updated_UTC'
  ]
  
  // Check for missing critical headers
  const missingHeaders = expectedHeaders.filter(h => !headers.includes(h))
  if (missingHeaders.length > 0) {
    console.warn('⚠️  Missing expected headers:', missingHeaders)
  }
  
  // Parse data rows
  const objects = []
  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i])
    
    if (values.length === 0 || values.every(v => !v || v.trim() === '')) {
      continue // Skip empty rows
    }
    
    const obj = {}
    headers.forEach((header, index) => {
      const value = values[index] || ''
      obj[header.trim()] = value.trim()
    })
    
    // Only include rows with a valid ticker
    if (obj.Ticker && obj.Ticker.trim()) {
      objects.push(obj)
    }
  }
  
  console.log(`✅ Parsed ${objects.length} data rows from CSV`)
  return objects
}

function parseCsvLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  let i = 0
  
  while (i < line.length) {
    const char = line[i]
    const next = line[i + 1]
    
    if (char === '"') {
      if (inQuotes && next === '"') {
        // Escaped quote
        current += '"'
        i += 2
      } else {
        // Toggle quote state
        inQuotes = !inQuotes
        i++
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current)
      current = ''
      i++
    } else {
      // Regular character
      current += char
      i++
    }
  }
  
  // Add the last field
  result.push(current)
  
  return result
}

export function indexByTicker(rows) {
  const map = new Map()
  
  rows.forEach(row => {
    const ticker = row.Ticker?.trim()?.toUpperCase()
    if (ticker) {
      map.set(ticker, row)
      console.log(`🔑 Indexed ticker: ${ticker}`)
    }
  })
  
  console.log(`✅ Created overlay index with ${map.size} tickers`)
  return map
}

export function applyOverlay(baseData, overlayMap) {
  if (!overlayMap || overlayMap.size === 0) {
    console.log('📊 No overlay data, returning base data unchanged')
    return baseData
  }
  
  console.log('🔄 Applying overlay to base data...')
  console.log('📋 Available overlay tickers:', Array.from(overlayMap.keys()).sort())
  console.log('📋 Base data tickers:', baseData.map(s => s.ticker).sort())
  
  const result = []
  
  // Process existing base data tickers
  baseData.forEach(stock => {
    const ticker = stock.ticker?.toUpperCase()
    const overlayData = overlayMap.get(ticker)
    
    // Special debug for AAPL
    if (ticker === 'AAPL') {
      console.log(`🍎 AAPL Debug:`)
      console.log(`  Base ticker: "${ticker}"`)
      console.log(`  Has overlay data: ${!!overlayData}`)
      console.log(`  Overlay map has AAPL: ${overlayMap.has('AAPL')}`)
      console.log(`  Overlay map keys containing 'AAPL':`, Array.from(overlayMap.keys()).filter(k => k.includes('AAPL')))
      if (overlayData) {
        console.log(`  Overlay price: ${overlayData.Mkt_Price}`)
      }
    }
    
    if (overlayData) {
      console.log(`🎯 Overlaying data for ${ticker}`)
      const updatedStock = applyOverlayToStock(stock, overlayData)
      result.push(updatedStock)
    } else {
      console.log(`❌ No overlay data found for ${ticker}`)
      // No overlay data for this ticker, keep original
      result.push(stock)
    }
  })
  
  // Add any new tickers from overlay that aren't in base data
  overlayMap.forEach((overlayData, ticker) => {
    const existsInBase = baseData.some(stock => stock.ticker?.toUpperCase() === ticker)
    if (!existsInBase) {
      console.log(`➕ Adding new ticker from overlay: ${ticker}`)
      const newStock = createStockFromOverlay(overlayData)
      result.push(newStock)
    }
  })
  
  console.log(`✅ Overlay applied successfully. Total stocks: ${result.length}`)
  return result
}

function applyOverlayToStock(baseStock, overlayData) {
  const updated = { ...baseStock }
  
  try {
    // Update price data
    if (overlayData.Mkt_Price) {
      const newPrice = parseFloat(overlayData.Mkt_Price)
      if (!isNaN(newPrice)) {
        updated.price = newPrice
        // Recalculate change (simplified)
        updated.change = newPrice - (baseStock.price || newPrice)
        updated.changePercent = ((updated.change / (baseStock.price || newPrice)) * 100)
      }
    }
    
    // Update EPS data
    if (overlayData.EPS_2025 || overlayData.EPS_2026 || overlayData.EPS_2027) {
      updated.eps = updated.eps || {}
      updated.eps.values = []
      
      if (overlayData.EPS_2025) {
        const eps2025 = parseFloat(overlayData.EPS_2025)
        if (!isNaN(eps2025)) updated.eps.values.push(eps2025)
      }
      
      if (overlayData.EPS_2026) {
        const eps2026 = parseFloat(overlayData.EPS_2026)
        if (!isNaN(eps2026)) updated.eps.values.push(eps2026)
      }
      
      if (overlayData.EPS_2027) {
        const eps2027 = parseFloat(overlayData.EPS_2027)
        if (!isNaN(eps2027)) updated.eps.values.push(eps2027)
      }
    }
    
    // Update PE bands
    if (overlayData.p25 || overlayData.p50 || overlayData.p75) {
      updated.peBands = {}
      
      if (overlayData.p25) {
        const p25 = parseFloat(overlayData.p25)
        if (!isNaN(p25)) updated.peBands.low = p25
      }
      
      if (overlayData.p50) {
        const p50 = parseFloat(overlayData.p50)
        if (!isNaN(p50)) updated.peBands.mid = p50
      }
      
      if (overlayData.p75) {
        const p75 = parseFloat(overlayData.p75)
        if (!isNaN(p75)) updated.peBands.high = p75
      }
    }
    
    // Update scores
    if (overlayData['Value Score']) {
      const score = parseFloat(overlayData['Value Score'])
      if (!isNaN(score)) {
        updated.scores = updated.scores || {}
        updated.scores.value = Math.max(0, Math.min(10, score))
      }
    }
    
    if (overlayData['Growth Score']) {
      const score = parseFloat(overlayData['Growth Score'])
      if (!isNaN(score)) {
        updated.scores = updated.scores || {}
        updated.scores.growth = Math.max(0, Math.min(10, score))
      }
    }
    
    if (overlayData['Profit Score']) {
      const score = parseFloat(overlayData['Profit Score'])
      if (!isNaN(score)) {
        updated.scores = updated.scores || {}
        updated.scores.profitability = Math.max(0, Math.min(10, score))
      }
    }
    
    if (overlayData['Momentum Score']) {
      const score = parseFloat(overlayData['Momentum Score'])
      if (!isNaN(score)) {
        updated.scores = updated.scores || {}
        updated.scores.momentum = Math.max(0, Math.min(10, score))
      }
    }
    
    // Update peers
    const peers = []
    for (let i = 1; i <= 4; i++) {
      const name = overlayData[`Peer${i}`]
      const pe = overlayData[`Peer${i} PE`]
      const marketCap = overlayData[`Peer${i} Market Cap`]
      
      if (name && name.trim()) {
        const peer = { name: name.trim() }
        
        if (pe) {
          const peNum = parseFloat(pe)
          if (!isNaN(peNum)) peer.pe = peNum
        }
        
        if (marketCap) {
          const mcNum = parseFloat(marketCap)
          if (!isNaN(mcNum)) peer.marketCap = mcNum
        }
        
        peers.push(peer)
      }
    }
    
    if (peers.length > 0) {
      updated.peers = peers
    }
    
    // Update segments
    const segments = []
    for (let i = 1; i <= 6; i++) {
      const name = overlayData[`Segment ${i}`]
      const percent = overlayData['%'] // Note: This might need adjustment based on actual CSV structure
      
      if (name && name.trim() && percent) {
        const percentNum = parseFloat(percent)
        if (!isNaN(percentNum)) {
          segments.push({
            name: name.trim(),
            value: percentNum,
            itemStyle: { color: getSegmentColor(i - 1) }
          })
        }
      }
    }
    
    if (segments.length > 0) {
      updated.segments = segments
    }
    
    // Update strengths and risks
    const strengths = []
    const risks = []
    
    for (let i = 1; i <= 3; i++) {
      const strength = overlayData[`Strength ${i}`]
      const risk = overlayData[`Risk ${i}`]
      
      if (strength && strength.trim()) {
        strengths.push(strength.trim())
      }
      
      if (risk && risk.trim()) {
        risks.push(risk.trim())
      }
    }
    
    if (strengths.length > 0) {
      updated.strengths = strengths
    }
    
    if (risks.length > 0) {
      updated.risks = risks
    }
    
    // Update news
    const news = []
    for (let i = 1; i <= 2; i++) {
      const headline = overlayData[`News ${i}`]
      const link = overlayData['Link'] // Note: This might need adjustment
      
      if (headline && headline.trim()) {
        news.push({
          headline: headline.trim(),
          summary: '', // No summary in CSV
          source: 'Google Sheet',
          datetime: overlayData.Last_Updated_UTC || 'Recently',
          url: (link && link.trim()) ? link.trim() : '#'
        })
      }
    }
    
    if (news.length > 0) {
      updated.news = news
    }
    
    // Mark as overlayed
    updated.dataQuality = {
      ...baseStock.dataQuality,
      overlayed: true,
      overlaySource: 'google_sheet',
      lastOverlayUpdate: overlayData.Last_Updated_UTC || new Date().toISOString()
    }
    
  } catch (error) {
    console.error(`❌ Error applying overlay for ${baseStock.ticker}:`, error)
  }
  
  return updated
}

function createStockFromOverlay(overlayData) {
  // Create a minimal stock object from overlay data
  const ticker = overlayData.Ticker.toUpperCase()
  
  const newStock = {
    ticker: ticker,
    name: `${ticker} Corporation`, // Placeholder name
    sector: 'Unknown',
    price: parseFloat(overlayData.Mkt_Price) || 0,
    change: 0,
    changePercent: 0,
    marketCap: 0,
    eps: {
      values: []
    },
    peBands: {},
    scores: {},
    peers: [],
    segments: [],
    strengths: [],
    risks: [],
    news: [],
    dataQuality: {
      quote: 'google_sheet',
      estimates: 'google_sheet',
      peHistory: 'google_sheet',
      peers: 'google_sheet',
      segments: 'google_sheet',
      news: 'google_sheet',
      source: 'GOOGLE_SHEET_OVERLAY',
      overlayed: true,
      overlaySource: 'google_sheet'
    }
  }
  
  // Apply overlay data using the same logic
  return applyOverlayToStock(newStock, overlayData)
}

function getSegmentColor(index) {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']
  return colors[index % colors.length]
}

// Safe number parsing with fallback
function safeParseFloat(value, fallback = 0) {
  const num = parseFloat(value)
  return isNaN(num) ? fallback : num
}
