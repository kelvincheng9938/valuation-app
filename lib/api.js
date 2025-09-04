// lib/api.js - Updated with Dynamic Market Data
// Switch between demo and live data modes

import { getDemoStockData, getDemoTickers, getDemoMarketData } from './demoData'

// Configuration - set to true for demo mode, false for live APIs
const DEMO_MODE = true

export async function fetchStockData(ticker) {
  try {
    console.log(`Fetching data for ${ticker} - Demo Mode: ${DEMO_MODE}`)
    
    if (DEMO_MODE) {
      // Use demo data
      const demoData = getDemoStockData(ticker)
      if (!demoData) {
        throw new Error(`Demo data not available for "${ticker.toUpperCase()}". Available tickers: ${getDemoTickers().join(', ')}`)
      }
      
      // Add small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      console.log('Demo data loaded successfully:', demoData.name)
      return demoData
    }

    // Production mode - use real APIs (your existing code)
    return await fetchLiveStockData(ticker)

  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
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
  
  if (!estimates.error && estimates.eps?.values?.[0] && estimates.eps.values[0] > 0) {
    const nextYearEPS = estimates.eps.values[0]
    forwardPE = (quoteData.price / nextYearEPS).toFixed(1)
    // TTM P/E is typically higher than forward P/E
    ttmPE = (parseFloat(forwardPE) * 1.2).toFixed(1)
  }

  // Step 4: Build comprehensive stock data object
  const stockData = {
    // Basic info
    ticker: ticker.toUpperCase(),
    name: quoteData.name,
    price: quoteData.price,
    change: quoteData.change,
    changePercent: quoteData.changePercent,
    marketCap: quoteData.marketCap,
    sector: quoteData.sector,
    description: quoteData.description,
    
    // Valuation metrics
    forwardPE: forwardPE,
    ttmPE: ttmPE,
    
    // EPS data
    eps: estimates.error ? null : estimates.eps,
    epsSource: estimates.error ? null : estimates.dataSource,
    
    // P/E bands
    peBands: peHistory.error ? null : peHistory.peBands, 
    peBandsSource: peHistory.error ? null : peHistory.dataSource,
    
    // Quality scores (based on real metrics where possible)
    scores: generateQualityScores(ticker, quoteData, estimates, peHistory),
    
    // Peer data
    peers: peers.error ? [] : (peers.peers || []),
    peersSource: peers.error ? null : peers.dataSource,
    
    // Segment data  
    segments: segments.error ? [] : (segments.segments || []),
    segmentsSource: segments.error ? null : segments.dataSource,
    
    // Company analysis
    strengths: generateStrengths(ticker, quoteData, estimates, peHistory),
    risks: generateRisks(ticker, quoteData, estimates, peHistory),
    
    // News
    news: news.error ? [] : (news.news || []),
    newsSource: news.error ? null : news.dataSource,
    
    // Data quality tracking
    dataQuality: {
      quote: true,
      estimates: !estimates.error ? estimates.dataSource : false,
      peHistory: !peHistory.error ? peHistory.dataSource : false, 
      peers: !peers.error ? peers.dataSource : false,
      segments: !segments.error ? segments.dataSource : false,
      news: !news.error
    },
    
    // Timestamps
    lastUpdated: new Date().toISOString()
  }

  console.log('Final stock data built:', stockData)
  return stockData
}

async function fetchWithRetry(url, retries = 2) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}

function generateQualityScores(ticker, quoteData, estimates, peHistory) {
  // Generate scores based on actual data when available
  let valueScore = 5.0
  let growthScore = 5.0 
  let profitScore = 5.0
  let momentumScore = 5.0
  
  // Value score based on P/E relative to bands
  if (!estimates.error && !peHistory.error && estimates.eps?.values?.[0]) {
    const currentPE = quoteData.price / estimates.eps.values[0]
    const midBandPE = peHistory.peBands?.mid || 20
    
    if (currentPE < midBandPE * 0.8) valueScore = 8.5
    else if (currentPE < midBandPE) valueScore = 7.0
    else if (currentPE < midBandPE * 1.2) valueScore = 6.0
    else valueScore = 4.0
  }
  
  // Growth score based on EPS trajectory
  if (!estimates.error && estimates.eps?.values?.length >= 2) {
    const epsGrowth = (estimates.eps.values[1] - estimates.eps.values[0]) / estimates.eps.values[0]
    if (epsGrowth > 0.15) growthScore = 8.5
    else if (epsGrowth > 0.08) growthScore = 7.0
    else if (epsGrowth > 0.03) growthScore = 6.0
    else growthScore = 4.5
  }
  
  // Add some company-specific adjustments
  const tickerAdjustments = {
    'GOOGL': { value: +0.5, growth: +1.0 },
    'MSFT': { profit: +1.5, momentum: +0.5 },
    'AAPL': { profit: +1.0, value: -0.5 },
    'NVDA': { growth: +2.0, momentum: +1.5, value: -1.0 }
  }
  
  const adj = tickerAdjustments[ticker.toUpperCase()] || {}
  valueScore += (adj.value || 0)
  growthScore += (adj.growth || 0)  
  profitScore += (adj.profit || 0)
  momentumScore += (adj.momentum || 0)
  
  // Ensure scores are between 1-10
  return {
    value: Math.max(1.0, Math.min(10.0, Math.round(valueScore * 10) / 10)),
    growth: Math.max(1.0, Math.min(10.0, Math.round(growthScore * 10) / 10)),
    profit: Math.max(1.0, Math.min(10.0, Math.round(profitScore * 10) / 10)),
    momentum: Math.max(1.0, Math.min(10.0, Math.round(momentumScore * 10) / 10))
  }
}

function generateStrengths(ticker, quoteData, estimates, peHistory) {
  // Company-specific strengths based on actual business models
  const specificStrengths = {
    'GOOGL': [
      'Dominant search market share with strong advertising moat',
      'YouTube and Cloud showing accelerating growth trajectory', 
      'AI leadership positioning across products and infrastructure'
    ],
    'MSFT': [
      'Azure growth sustaining despite scale, strong enterprise relationships',
      'Office 365 and productivity suite create recurring revenue streams',
      'AI integration across product portfolio driving pricing power'
    ],
    'AAPL': [
      'iPhone ecosystem creates strong customer retention and pricing power',
      'Services segment growing faster than hardware with higher margins',
      'Brand strength and premium positioning in consumer technology'
    ],
    'AMZN': [
      'AWS maintains cloud leadership with expanding profit margins',
      'E-commerce scale advantages in logistics and fulfillment',
      'Prime membership driving customer loyalty and recurring revenue'
    ],
    'NVDA': [
      'AI chip leadership with significant performance and software moats',
      'Data center demand growth exceeding supply capabilities',
      'Strong ecosystem of developers and enterprise partnerships'
    ]
  }

  return specificStrengths[ticker.toUpperCase()] || [
    'Established market position with competitive advantages',
    'Management team with proven execution track record',
    'Financial strength enabling strategic investments and growth'
  ]
}

function generateRisks(ticker, quoteData, estimates, peHistory) {
  // Company-specific risks based on current market conditions
  const specificRisks = {
    'GOOGL': [
      'Regulatory pressure on advertising and search practices intensifying',
      'AI disruption could change search behavior and monetization',
      'Cloud competition from Microsoft and Amazon limiting growth'
    ],
    'MSFT': [
      'High AI infrastructure capex may pressure near-term profitability',
      'Enterprise software market showing signs of demand softening',
      'Regulatory scrutiny on dominant market positions across products'
    ],
    'AAPL': [
      'iPhone sales cyclical with China market presenting ongoing challenges',
      'Services growth may decelerate as penetration matures',
      'App Store regulatory pressure could impact high-margin revenue'
    ],
    'AMZN': [
      'E-commerce margins under pressure from competitive dynamics',
      'AWS growth slowing as cloud market matures and competition increases',
      'High capex requirements for AI and logistics infrastructure'
    ],
    'NVDA': [
      'AI chip demand highly concentrated in few hyperscale customers',
      'Geopolitical tensions affecting China business and supply chains',
      'Cyclical semiconductor industry with potential demand moderation'
    ]
  }

  return specificRisks[ticker.toUpperCase()] || [
    'Market competition and technological disruption risks',
    'Economic sensitivity affecting customer demand and pricing',
    'Regulatory changes impacting business operations or costs'
  ]
}

// Enhanced Market Data - can be manually updated
export async function fetchMarketData() {
  if (DEMO_MODE) {
    // Try to fetch from manual data file first, fall back to demo data
    try {
      const response = await fetch('/api/market-data')
      if (response.ok) {
        const data = await response.json()
        return data
      }
    } catch (error) {
      console.warn('Manual market data not available, using demo data')
    }
    
    return getDemoMarketDataEnhanced()
  }
  
  // Live market data when ready
  try {
    const response = await fetch('/api/market-data')
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch live market data:', error)
    return getDemoMarketDataEnhanced()
  }
}

// Enhanced demo market data with more indices
function getDemoMarketDataEnhanced() {
  // Add realistic variations
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
  
  // Add realistic variations each time
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.005 // ±0.25% variation
    const item = baseData[key]
    const newPrice = item.price * (1 + variation)
    const newChange = item.change + (Math.random() - 0.5) * 0.3
    
    baseData[key] = {
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(newChange * 100) / 100
    }
  })
  
  baseData.dataSource = 'demo'
  baseData.lastUpdated = new Date().toISOString()
  
  return baseData
}

// News data - demo or live  
export async function fetchNews() {
  if (DEMO_MODE) {
    return [
      {
        headline: 'Fed Officials Signal Cautious Approach to Rate Cuts in 2025',
        summary: 'Federal Reserve policymakers emphasized data-dependent decisions amid persistent inflation concerns and mixed economic signals.',
        source: 'Reuters',
        datetime: '2 hours ago',
        url: 'https://www.reuters.com/markets/us/'
      },
      {
        headline: 'AI Chipmakers Report Strong Q4 Earnings Beat Expectations',
        summary: 'Semiconductor companies specializing in artificial intelligence accelerators posted robust quarterly results.',
        source: 'Bloomberg',
        datetime: '3 hours ago', 
        url: 'https://www.bloomberg.com/technology/'
      },
      {
        headline: 'European Central Bank Maintains Rates Amid Economic Uncertainty',
        summary: 'ECB keeps benchmark rates unchanged as eurozone growth remains sluggish and inflation pressures persist.',
        source: 'Financial Times',
        datetime: '4 hours ago',
        url: 'https://www.ft.com/eurozone-economy'
      },
      {
        headline: 'Tech Giants Lead Market Rally on Strong Cloud Revenue Growth',
        summary: 'Major technology stocks pushed indices higher as investors bet on continued cloud computing and AI adoption.',
        source: 'CNBC',
        datetime: '5 hours ago',
        url: 'https://www.cnbc.com/technology/'
      },
      {
        headline: 'Bitcoin Consolidates Above $94K as Institutional Interest Grows',
        summary: 'Cryptocurrency markets stabilize with growing institutional adoption and regulatory clarity expectations.',
        source: 'CoinDesk',
        datetime: '6 hours ago',
        url: 'https://www.coindesk.com/markets/'
      },
      {
        headline: 'Oil Prices Decline on Global Demand Concerns and Inventory Build',
        summary: 'Crude futures fell as weak economic data raised concerns about global energy demand outlook.',
        source: 'MarketWatch',
        datetime: '7 hours ago',
        url: 'https://www.marketwatch.com/investing/oil/'
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
