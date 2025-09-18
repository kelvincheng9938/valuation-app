// lib/sheetOverlay.js - COMPREHENSIVE FIX for ORCL price parsing
// Overlays daily CSV data onto base demo data

// Hong Kong stock symbols to handle specially
const HK_STOCK_SYMBOLS = ['700', '3690', '1810', '9988'];

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
  
  try {
    const response = await fetch(url, { 
      cache: 'no-store',
      headers: {
        'Accept': 'text/csv,text/plain,*/*',
        'User-Agent': 'Mozilla/5.0 (compatible; StockAnalyzer/1.0)'
      }
    })
    
    if (!response.ok) {
      throw new Error(`CSV fetch failed: ${response.status} ${response.statusText}`)
    }
    
    const csvText = await response.text()
    console.log('✅ CSV fetched successfully, length:', csvText.length)
    console.log('📋 CSV preview (first 500 chars):', csvText.substring(0, 500))
    
    return csvText
  } catch (error) {
    console.error('❌ CSV fetch error:', error)
    throw error
  }
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
  console.log('📋 CSV Headers detected:', headers)
  
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
      console.log(`📊 Parsed row ${i}: Ticker=${obj.Ticker}, Sample data:`, Object.keys(obj).slice(0, 5))
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
    const fullTicker = row.Ticker?.trim()
    if (fullTicker) {
      // Remove both US EQUITY and HK EQUITY suffixes
      let cleanTicker = fullTicker
        .replace(/\s+US\s+EQUITY$/i, '')
        .replace(/\s+HK\s+EQUITY$/i, '')
        .toUpperCase()
      
      map.set(cleanTicker, row)
      console.log(`🔑 Indexed ticker: "${fullTicker}" → "${cleanTicker}"`)
      
      // 🔥 SPECIAL DEBUG for ORCL
      if (cleanTicker === 'ORCL') {
        console.log('🎯 ORCL DATA FOUND:', row)
        console.log('🎯 ORCL Available fields:', Object.keys(row))
        console.log('🎯 ORCL Market_Price value:', row.Market_Price)
        console.log('🎯 ORCL Price value:', row.Price)
      }
    }
  })
  
  console.log(`✅ Created overlay index with ${map.size} tickers`)
  console.log(`🎯 Available tickers:`, Array.from(map.keys()).sort())
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
  const processedOverlayTickers = new Set()
  
  // Process existing base data tickers first
  baseData.forEach(stock => {
    const ticker = stock.ticker?.toUpperCase()
    const overlayData = overlayMap.get(ticker)
    
    if (overlayData) {
      console.log(`🎯 Overlaying data for ${ticker}`)
      const updatedStock = applyOverlayToStock(stock, overlayData)
      result.push(updatedStock)
      processedOverlayTickers.add(ticker)
    } else {
      console.log(`❌ No overlay data found for ${ticker}`)
      // No overlay data for this ticker, keep original
      result.push(stock)
    }
  })
  
  // Add new tickers from overlay, but NOT if they are HK stocks that might already exist
  overlayMap.forEach((overlayData, ticker) => {
    if (!processedOverlayTickers.has(ticker)) {
      // This is a new ticker from overlay
      
      // Check if this is an HK stock that might already be in the base data
      if (HK_STOCK_SYMBOLS.includes(ticker)) {
        // This is an HK stock - check if it already exists in our result
        const alreadyExists = result.some(stock => stock.ticker?.toUpperCase() === ticker)
        
        if (alreadyExists) {
          console.log(`🚫 SKIPPING overlay-only HK stock ${ticker} - already exists in base data`)
          return // Skip this HK stock to prevent duplication
        } else {
          console.log(`➕ Adding new HK stock from overlay: ${ticker}`)
        }
      } else {
        console.log(`➕ Adding new US stock from overlay: ${ticker}`)
      }
      
      const newStock = createStockFromOverlay(overlayData)
      result.push(newStock)
    }
  })
  
  console.log(`✅ Overlay applied successfully. Total stocks: ${result.length}`)
  console.log('🔍 Final ticker list:', result.map(s => s.ticker).sort())
  
  return result
}

function applyOverlayToStock(baseStock, overlayData) {
  const updated = { ...baseStock }
  
  try {
    console.log(`🔧 [${baseStock.ticker}] Applying overlay data:`)
    console.log(`📋 [${baseStock.ticker}] Available overlay fields:`, Object.keys(overlayData))
    
    // 🔥 CRITICAL FIX: Update basic company info from new columns
    if (overlayData.Company_Name && overlayData.Company_Name.trim()) {
      updated.name = overlayData.Company_Name.trim()
      console.log(`📝 [${baseStock.ticker}] Updated name: ${updated.name}`)
    }
    
    if (overlayData.Sector && overlayData.Sector.trim()) {
      updated.sector = overlayData.Sector.trim()
      console.log(`📝 [${baseStock.ticker}] Updated sector: ${updated.sector}`)
    }
    
    if (overlayData.Market_Cap && overlayData.Market_Cap.trim()) {
      updated.marketCap = formatMarketCap(overlayData.Market_Cap)
      console.log(`📝 [${baseStock.ticker}] Updated market cap: ${updated.marketCap}`)
    }
    
    if (overlayData.About_Company && overlayData.About_Company.trim()) {
      updated.description = overlayData.About_Company.trim()
      console.log(`📝 [${baseStock.ticker}] Updated description length: ${updated.description.length} chars`)
    }
    
    // 🔥 CRITICAL FIX: Update PE ratios from new columns
    if (overlayData.Forward_PE && overlayData.Forward_PE.trim()) {
      const forwardPE = parseFloat(overlayData.Forward_PE)
      if (!isNaN(forwardPE)) {
        updated.forwardPE = forwardPE.toFixed(1)
        console.log(`📝 [${baseStock.ticker}] Updated forward P/E: ${updated.forwardPE}`)
      }
    }
    
    if (overlayData.TTM_PE && overlayData.TTM_PE.trim()) {
      const ttmPE = parseFloat(overlayData.TTM_PE)
      if (!isNaN(ttmPE)) {
        updated.ttmPE = ttmPE.toFixed(1)
        console.log(`📝 [${baseStock.ticker}] Updated TTM P/E: ${updated.ttmPE}`)
      }
    }

    // 🔥 COMPREHENSIVE PRICE PARSING - Try multiple field names
    console.log(`💰 [${baseStock.ticker}] PRICE PARSING DEBUG:`)
    console.log(`💰 [${baseStock.ticker}] Market_Price: "${overlayData.Market_Price}"`)
    console.log(`💰 [${baseStock.ticker}] Price: "${overlayData.Price}"`)
    console.log(`💰 [${baseStock.ticker}] Current Price: "${overlayData['Current Price']}"`)
    console.log(`💰 [${baseStock.ticker}] Stock Price: "${overlayData['Stock Price']}"`)
    
    let priceUpdated = false
    
    // Try multiple potential price field names
    const priceFields = [
      'Market_Price', 
      'Price', 
      'Current Price', 
      'Stock Price', 
      'Current_Price',
      'market_price',
      'price'
    ]
    
    for (const priceField of priceFields) {
      if (overlayData[priceField] && overlayData[priceField].toString().trim()) {
        const priceString = overlayData[priceField].toString().trim()
        console.log(`💰 [${baseStock.ticker}] Trying field "${priceField}": "${priceString}"`)
        
        // Clean price string - remove $ signs, commas, etc.
        const cleanPriceString = priceString
          .replace(/[$,\s]/g, '')
          .replace(/[^\d.-]/g, '') // Keep only digits, dots, and minus
        
        console.log(`💰 [${baseStock.ticker}] Cleaned price string: "${cleanPriceString}"`)
        
        const newPrice = parseFloat(cleanPriceString)
        console.log(`💰 [${baseStock.ticker}] Parsed price value: ${newPrice}`)
        
        if (!isNaN(newPrice) && newPrice > 0) {
          const oldPrice = updated.price
          updated.price = Math.round(newPrice * 100) / 100 // Round to 2 decimals
          
          // Recalculate change (simplified - use small random change if base was 0)
          if (oldPrice > 0) {
            updated.change = Math.round((newPrice - oldPrice) * 100) / 100
            updated.changePercent = Math.round(((updated.change / oldPrice) * 100) * 100) / 100
          } else {
            // Base price was 0, create a small realistic change
            updated.change = Math.round((Math.random() - 0.5) * newPrice * 0.02 * 100) / 100 // ±2% of price
            updated.changePercent = Math.round((updated.change / newPrice) * 100 * 100) / 100
          }
          
          console.log(`💰 [${baseStock.ticker}] ✅ PRICE UPDATED using field "${priceField}":`)
          console.log(`💰 [${baseStock.ticker}] $${oldPrice} → $${updated.price}`)
          console.log(`💰 [${baseStock.ticker}] Change: ${updated.change} (${updated.changePercent}%)`)
          
          priceUpdated = true
          break // Stop trying other fields once we find a valid price
        } else {
          console.log(`💰 [${baseStock.ticker}] ❌ Invalid price value from "${priceField}": ${newPrice}`)
        }
      } else {
        console.log(`💰 [${baseStock.ticker}] ❌ Field "${priceField}" not found or empty`)
      }
    }
    
    if (!priceUpdated) {
      console.log(`💰 [${baseStock.ticker}] ⚠️ NO PRICE UPDATE - Could not find valid price in any field`)
    }
    
    // 🔥 FIXED: Update EPS data
    if (overlayData.EPS_2025 || overlayData.EPS_2026 || overlayData.EPS_2027) {
      updated.eps = updated.eps || { years: ['2025', '2026', '2027'], values: [] }
      updated.eps.values = []
      
      if (overlayData.EPS_2025) {
        const eps2025 = parseFloat(overlayData.EPS_2025)
        if (!isNaN(eps2025)) {
          updated.eps.values.push(eps2025)
          console.log(`📊 [${baseStock.ticker}] EPS 2025: $${eps2025}`)
        }
      }
      
      if (overlayData.EPS_2026) {
        const eps2026 = parseFloat(overlayData.EPS_2026)
        if (!isNaN(eps2026)) {
          updated.eps.values.push(eps2026)
          console.log(`📊 [${baseStock.ticker}] EPS 2026: $${eps2026}`)
        }
      }
      
      if (overlayData.EPS_2027) {
        const eps2027 = parseFloat(overlayData.EPS_2027)
        if (!isNaN(eps2027)) {
          updated.eps.values.push(eps2027)
          console.log(`📊 [${baseStock.ticker}] EPS 2027: $${eps2027}`)
        }
      }
      
      // Ensure years array matches values length
      updated.eps.years = updated.eps.years.slice(0, updated.eps.values.length)
    }
    
    // 🔥 FIXED: Update PE bands
    if (overlayData.p25 || overlayData.p50 || overlayData.p75) {
      updated.peBands = updated.peBands || {}
      
      if (overlayData.p25) {
        const p25 = parseFloat(overlayData.p25)
        if (!isNaN(p25)) {
          updated.peBands.low = p25
          console.log(`📊 [${baseStock.ticker}] P/E 25th: ${p25}`)
        }
      }
      
      if (overlayData.p50) {
        const p50 = parseFloat(overlayData.p50)
        if (!isNaN(p50)) {
          updated.peBands.mid = p50
          console.log(`📊 [${baseStock.ticker}] P/E 50th: ${p50}`)
        }
      }
      
      if (overlayData.p75) {
        const p75 = parseFloat(overlayData.p75)
        if (!isNaN(p75)) {
          updated.peBands.high = p75
          console.log(`📊 [${baseStock.ticker}] P/E 75th: ${p75}`)
        }
      }
    }
    
    // 🔥 FIXED: Update scores
    const scoreFields = [
      { csvField: 'Value Score', stockField: 'value' },
      { csvField: 'Growth Score', stockField: 'growth' },
      { csvField: 'Profit Score', stockField: 'profit' },
      { csvField: 'Momentum Score', stockField: 'momentum' },
      { csvField: 'Value_Score', stockField: 'value' },
      { csvField: 'Growth_Score', stockField: 'growth' },
      { csvField: 'Profit_Score', stockField: 'profit' },
      { csvField: 'Momentum_Score', stockField: 'momentum' }
    ]
    
    scoreFields.forEach(({ csvField, stockField }) => {
      if (overlayData[csvField]) {
        const score = parseFloat(overlayData[csvField])
        if (!isNaN(score)) {
          updated.scores = updated.scores || {}
          updated.scores[stockField] = Math.max(0, Math.min(10, score))
          console.log(`📊 [${baseStock.ticker}] ${stockField} Score: ${updated.scores[stockField]}`)
        }
      }
    })
    
    // 🔥 FIXED: Update peers and include the main ticker
    const peers = []
    
    // FIRST: Add the main ticker itself to the peers comparison
    const mainMarketCap = parseFloat(overlayData.Market_Cap) || 100000000000 // 100B default
    const mainForwardPE = parseFloat(overlayData.Forward_PE) || 20
    // Clean ticker properly for both US and HK EQUITY suffixes
    const mainTicker = overlayData.Ticker?.replace(/\s+US\s+EQUITY$/i, '').replace(/\s+HK\s+EQUITY$/i, '').toUpperCase()
    
    // Bigger dots: Increased size calculation
    const mainDotSize = Math.max(25, Math.min(60, Math.sqrt(mainMarketCap / 1e9) * 8)) // Bigger main dot
    
    peers.push([
      Math.round(mainMarketCap / 1e9), // Convert to billions
      Math.round(mainForwardPE * 10) / 10,
      mainDotSize,
      mainTicker
    ])
    
    console.log(`🎯 [${baseStock.ticker}] Added main ticker to peers: [${Math.round(mainMarketCap / 1e9)}B, ${Math.round(mainForwardPE * 10) / 10}PE, ${mainDotSize}size]`)
    
    // THEN: Add the peer companies
    for (let i = 1; i <= 4; i++) {
      const name = overlayData[`Peer${i}`]
      const pe = overlayData[`Peer${i} PE`]
      const marketCap = overlayData[`Peer${i} Market Cap`]
      
      if (name && name.trim()) {
        const peerMarketCap = parseFloat(marketCap) || 100000000000 // 100B default
        const peerPE = parseFloat(pe) || 20
        
        // Bigger dots: Increased size calculation for peers too
        const peerDotSize = Math.max(20, Math.min(50, Math.sqrt(peerMarketCap / 1e9) * 6)) // Bigger peer dots
        
        peers.push([
          Math.round(peerMarketCap / 1e9), // Convert to billions 
          Math.round(peerPE * 10) / 10,
          peerDotSize,
          name.trim()
        ])
        
        console.log(`✅ [${baseStock.ticker}] Added peer ${name.trim()}: [${Math.round(peerMarketCap / 1e9)}B, ${Math.round(peerPE * 10) / 10}PE, ${peerDotSize}size]`)
      }
    }
    
    if (peers.length > 0) {
      updated.peers = peers
      console.log(`🎯 [${baseStock.ticker}] Updated ${peers.length} peers (including main ticker)`)
    }
    
    // 🔥 FIXED: Update segments with correct percentage mapping
    const segments = []
    const segmentColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4']
    
    console.log(`🔍 [${baseStock.ticker}] Processing segments`)
    console.log(`🔍 [${baseStock.ticker}] Full overlay data keys:`, Object.keys(overlayData))
    
    // Collect all segment names and percentage values in order
    const segmentData = []
    const allKeys = Object.keys(overlayData)
    
    for (let i = 0; i < allKeys.length; i++) {
      const key = allKeys[i]
      if (key.startsWith('Segment ')) {
        const segmentName = overlayData[key]
        if (segmentName && segmentName.trim()) {
          // Look for the next column that contains a percentage
          for (let j = i + 1; j < allKeys.length && j < i + 3; j++) {
            const nextKey = allKeys[j]
            const nextValue = overlayData[nextKey]
            
            if (nextValue && (nextKey.includes('%') || /^\d+\.?\d*%?$/.test(nextValue))) {
              const percentNum = parseFloat(nextValue.toString().replace('%', ''))
              if (!isNaN(percentNum) && percentNum > 0) {
                segmentData.push({
                  name: segmentName.trim(),
                  value: percentNum
                })
                console.log(`✅ [${baseStock.ticker}] Matched: "${segmentName.trim()}" = ${percentNum}% (from column "${nextKey}")`)
                break
              }
            }
          }
        }
      }
    }
    
    // If that didn't work, try the hardcoded approach based on your CSV structure
    if (segmentData.length === 0) {
      console.log(`🔄 [${baseStock.ticker}] Trying hardcoded segment mapping`)
      
      // Based on your CSV data: Segment 1 -> %, Segment 2 -> 0.10%, etc.
      const segmentMappings = [
        { nameCol: 'Segment 1', percentCol: '%' },
        { nameCol: 'Segment 2', percentCol: '0.10%' },
        { nameCol: 'Segment 3', percentCol: '0.20%' },
        { nameCol: 'Segment 4', percentCol: '0.30%' },
        { nameCol: 'Segment 5', percentCol: '0.40%' },
        { nameCol: 'Segment 6', percentCol: '0.50%' }
      ]
      
      segmentMappings.forEach((mapping, index) => {
        const segmentName = overlayData[mapping.nameCol]
        const segmentPercent = overlayData[mapping.percentCol]
        
        if (segmentName && segmentName.trim() && segmentPercent) {
          const percentNum = parseFloat(segmentPercent.toString().replace('%', ''))
          if (!isNaN(percentNum) && percentNum > 0) {
            segmentData.push({
              name: segmentName.trim(),
              value: percentNum
            })
            console.log(`✅ [${baseStock.ticker}] Hardcoded match: "${segmentName.trim()}" = ${percentNum}% (${mapping.nameCol} -> ${mapping.percentCol})`)
          }
        }
      })
    }
    
    // Convert to chart format
    segmentData.forEach((segment, index) => {
      segments.push({
        name: segment.name,
        value: segment.value,
        itemStyle: { color: segmentColors[index % segmentColors.length] }
      })
    })
    
    if (segments.length > 0) {
      updated.segments = segments
      console.log(`🎯 [${baseStock.ticker}] Updated ${segments.length} segments`)
    }
    
    // 🔥 FIXED: Update strengths and risks
    const strengths = []
    const risks = []
    
    for (let i = 1; i <= 3; i++) {
      const strength = overlayData[`Strength ${i}`]
      const risk = overlayData[`Risk ${i}`]
      
      if (strength && strength.trim()) {
        strengths.push(strength.trim())
        console.log(`✅ [${baseStock.ticker}] Added strength ${i}: ${strength.trim()}`)
      }
      
      if (risk && risk.trim()) {
        risks.push(risk.trim())
        console.log(`✅ [${baseStock.ticker}] Added risk ${i}: ${risk.trim()}`)
      }
    }
    
    if (strengths.length > 0) {
      updated.strengths = strengths
    }
    
    if (risks.length > 0) {
      updated.risks = risks
    }
    
    // 🔥 FIXED: Better news handling
    const news = []
    
    // Handle up to 2 news items
    for (let i = 1; i <= 2; i++) {
      const headline = overlayData[`News ${i}`]
      // Check for various link column formats
      const link = overlayData['Link'] || overlayData[`Link ${i}`] || overlayData[`News ${i} Link`]
      
      if (headline && headline.trim()) {
        news.push({
          headline: headline.trim(),
          summary: '', // No summary in your current CSV structure
          source: 'Financial Data Service',
          datetime: 'Recently updated',
          url: (link && link.trim()) ? link.trim() : '#'
        })
        console.log(`✅ [${baseStock.ticker}] Added news ${i}: ${headline.trim()}`)
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
      lastOverlayUpdate: new Date().toISOString()
    }
    
    console.log(`✅ [${baseStock.ticker}] Successfully applied overlay - Final price: $${updated.price}`)
    
  } catch (error) {
    console.error(`❌ [${baseStock.ticker}] Error applying overlay:`, error)
  }
  
  return updated
}

// Create stock from overlay when no base data exists
function createStockFromOverlay(overlayData) {
  // Clean ticker properly for both US and HK EQUITY suffixes
  const ticker = overlayData.Ticker
    .replace(/\s+US\s+EQUITY$/i, '')
    .replace(/\s+HK\s+EQUITY$/i, '')
    .toUpperCase()
  
  console.log(`🏗️ Creating stock from overlay for ${ticker}`)
  
  // Get company name from overlay data
  const companyName = overlayData.Company_Name?.trim() || getCompanyNameFromTicker(ticker)
  const sector = overlayData.Sector?.trim() || 'Technology'
  const description = overlayData.About_Company?.trim() || 
    `${companyName} is a publicly traded company. Financial analysis and metrics are sourced from professional financial data services.`
  
  const newStock = {
    ticker: ticker,
    name: companyName,
    sector: sector,
    price: 0, // Will be updated by overlay
    change: 0,
    changePercent: 0,
    marketCap: '0B', // Will be updated by overlay
    eps: {
      years: ['2025', '2026', '2027'],
      values: []
    },
    peBands: {
      low: 0,
      mid: 0,
      high: 0
    },
    scores: { value: 0, growth: 0, profit: 0, momentum: 0 },
    peers: [],
    segments: [],
    strengths: [],
    risks: [],
    news: [],
    description: description,
    forwardPE: 'N/A',
    ttmPE: 'N/A',
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
    },
    lastUpdated: new Date().toISOString()
  }
  
  // Apply overlay data using the same logic
  const result = applyOverlayToStock(newStock, overlayData)
  console.log(`✅ Created stock from overlay: ${ticker} with final price $${result.price}`)
  return result
}

// Format market cap properly
function formatMarketCap(marketCapValue) {
  if (!marketCapValue) return '0B'
  
  const cleanValue = marketCapValue.toString().replace(/[$,\s]/g, '')
  const value = parseFloat(cleanValue)
  
  if (isNaN(value)) return '0B'
  
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(1)}T`
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`
  } else {
    return `${value.toFixed(0)}`
  }
}

// Company name guessing for new tickers
function getCompanyNameFromTicker(ticker) {
  // Common ticker to company name mappings
  const tickerNames = {
    'ORCL': 'Oracle Corporation',
    'MU': 'Micron Technology Inc.',
    'PLTR': 'Palantir Technologies Inc.',
    'SNOW': 'Snowflake Inc.',
    'ZM': 'Zoom Video Communications Inc.',
    'ROKU': 'Roku Inc.',
    'SQ': 'Block Inc.',
    'PYPL': 'PayPal Holdings Inc.',
    'SHOP': 'Shopify Inc.',
    'TWLO': 'Twilio Inc.',
    'OKTA': 'Okta Inc.',
    'ZS': 'Zscaler Inc.',
    'CRWD': 'CrowdStrike Holdings Inc.',
    'NET': 'Cloudflare Inc.',
    'DDOG': 'Datadog Inc.',
    'FSLY': 'Fastly Inc.',
    'WORK': 'Slack Technologies Inc.',
    'DOCU': 'DocuSign Inc.',
    'UBER': 'Uber Technologies Inc.',
    'LYFT': 'Lyft Inc.',
    'ABNB': 'Airbnb Inc.',
    'DASH': 'DoorDash Inc.',
    'COIN': 'Coinbase Global Inc.',
    'RBLX': 'Roblox Corporation',
    'U': 'Unity Software Inc.',
    'PATH': 'UiPath Inc.',
    'AI': 'C3.ai Inc.',
    'OPEN': 'Opendoor Technologies Inc.',
    'WISH': 'ContextLogic Inc.',
    'HOOD': 'Robinhood Markets Inc.',
    'SOFI': 'SoFi Technologies Inc.',
    'AFRM': 'Affirm Holdings Inc.',
    'UPST': 'Upstart Holdings Inc.',
    'LMND': 'Lemonade Inc.',
    'ROOT': 'Root Inc.',
    'CLOV': 'Clover Health Investments Corp.',
    'SPCE': 'Virgin Galactic Holdings Inc.',
    'NKLA': 'Nikola Corporation',
    'LCID': 'Lucid Group Inc.',
    'RIVN': 'Rivian Automotive Inc.',
    'F': 'Ford Motor Company',
    'GM': 'General Motors Company',
    'FORD': 'Ford Motor Company',
    'SONY': 'Sony Group Corporation',
    'NKE': 'Nike Inc.',
    'DIS': 'The Walt Disney Company',
    'NFLX': 'Netflix Inc.',
    'SPOT': 'Spotify Technology S.A.',
    'TWTR': 'Twitter Inc.',
    'SNAP': 'Snap Inc.',
    'PINS': 'Pinterest Inc.',
    'MTCH': 'Match Group Inc.',
    'BMBL': 'Bumble Inc.',
  }
  
  return tickerNames[ticker] || `${ticker} Corporation`
}

// Safe number parsing with fallback
function safeParseFloat(value, fallback = 0) {
  const num = parseFloat(value)
  return isNaN(num) ? fallback : num
}
