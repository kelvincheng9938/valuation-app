// app/api/news/realtime/route.js
import { NextResponse } from 'next/server'

// Cache for storing the latest data
let newsCache = {
  marketData: null,
  generalNews: [],
  breakingNews: [],
  lastUpdated: null,
  error: null
}

// Cache duration: 30 seconds for breaking news, 2 minutes for market data
const BREAKING_NEWS_CACHE = 30 * 1000
const MARKET_DATA_CACHE = 2 * 60 * 1000

// Major tickers to monitor for breaking news
const MAJOR_TICKERS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'TSLA', 'META', 'CRM', 'NFLX', 'AMD']

async function fetchLiveMarketData() {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY
  
  if (!FINNHUB_API_KEY) {
    throw new Error('Finnhub API key not found')
  }
  
  const marketData = {}
  
  // Market indices and commodities to track
  const symbols = [
    { symbol: 'SPY', key: 'spy', name: 'S&P 500' },
    { symbol: 'QQQ', key: 'nasdaq', name: 'NASDAQ' },
    { symbol: 'BINANCE:BTCUSDT', key: 'btc', name: 'Bitcoin' },
    { symbol: 'OANDA:XAUUSD', key: 'gold', name: 'Gold' },
    { symbol: 'OANDA:WTIUSD', key: 'oil', name: 'WTI Oil' }
  ]
  
  console.log('🔄 Fetching live market data from Finnhub...')
  
  for (const { symbol, key, name } of symbols) {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
        { 
          headers: { 'User-Agent': 'ValuationPro/1.0' },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.c && data.c > 0) { // Current price exists
          const price = data.c
          const change = data.d || 0
          const changePercent = data.dp || 0
          
          marketData[key] = {
            price: price,
            change: changePercent, // Using percentage change
            changePercent: changePercent,
            name: name,
            symbol: symbol
          }
          
          console.log(`✅ ${name}: $${price} (${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`)
        }
      }
    } catch (error) {
      console.log(`❌ Failed to fetch ${name}:`, error.message)
    }
  }
  
  return marketData
}

async function fetchBreakingNews() {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY
  const FMP_API_KEY = process.env.FMP_API_KEY
  
  if (!FINNHUB_API_KEY && !FMP_API_KEY) {
    throw new Error('No API keys found')
  }
  
  const allNews = []
  
  // Fetch general market news from Finnhub
  if (FINNHUB_API_KEY) {
    try {
      console.log('🔄 Fetching general market news from Finnhub...')
      
      const today = new Date()
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
      
      const fromDate = yesterday.toISOString().split('T')[0]
      const toDate = today.toISOString().split('T')[0]
      
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=general&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`,
        { 
          headers: { 'User-Agent': 'ValuationPro/1.0' },
          signal: AbortSignal.timeout(8000)
        }
      )
      
      if (response.ok) {
        const newsData = await response.json()
        
        if (Array.isArray(newsData)) {
          for (const article of newsData.slice(0, 8)) { // Top 8 articles
            if (article.headline && article.source && article.datetime) {
              allNews.push({
                headline: article.headline,
                summary: article.summary || article.headline.substring(0, 150) + '...',
                source: article.source,
                datetime: formatNewsTime(article.datetime),
                url: article.url || '#',
                category: article.category || 'general',
                isBreaking: isBreakingNews(article.headline),
                timestamp: article.datetime
              })
            }
          }
          console.log(`✅ Fetched ${newsData.length} general news articles`)
        }
      }
    } catch (error) {
      console.log('❌ Finnhub general news failed:', error.message)
    }
  }
  
  // Fetch company-specific breaking news for major tickers
  if (FINNHUB_API_KEY) {
    for (const ticker of MAJOR_TICKERS.slice(0, 5)) { // Limit to 5 tickers to avoid rate limits
      try {
        const today = new Date()
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
        
        const fromDate = yesterday.toISOString().split('T')[0]
        const toDate = today.toISOString().split('T')[0]
        
        const response = await fetch(
          `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`,
          { 
            headers: { 'User-Agent': 'ValuationPro/1.0' },
            signal: AbortSignal.timeout(5000)
          }
        )
        
        if (response.ok) {
          const companyNews = await response.json()
          
          if (Array.isArray(companyNews)) {
            for (const article of companyNews.slice(0, 2)) { // Top 2 per company
              if (article.headline && article.source && article.datetime) {
                const isBreaking = isBreakingNews(article.headline)
                
                allNews.push({
                  headline: article.headline,
                  summary: article.summary || article.headline.substring(0, 150) + '...',
                  source: article.source,
                  datetime: formatNewsTime(article.datetime),
                  url: article.url || '#',
                  category: 'company',
                  ticker: ticker,
                  isBreaking: isBreaking,
                  timestamp: article.datetime
                })
              }
            }
          }
        }
      } catch (error) {
        console.log(`❌ Failed to fetch news for ${ticker}:`, error.message)
      }
    }
  }
  
  // Sort by timestamp (newest first) and remove duplicates
  const uniqueNews = removeDuplicateNews(allNews)
  uniqueNews.sort((a, b) => b.timestamp - a.timestamp)
  
  // Separate breaking news from general news
  const breakingNews = uniqueNews.filter(article => article.isBreaking).slice(0, 3)
  const generalNews = uniqueNews.filter(article => !article.isBreaking).slice(0, 9)
  
  console.log(`✅ Processed ${uniqueNews.length} total articles (${breakingNews.length} breaking, ${generalNews.length} general)`)
  
  return { breakingNews, generalNews }
}

function isBreakingNews(headline) {
  const breakingKeywords = [
    'breaking', 'announces', 'reports', 'beats', 'misses', 'guidance',
    'acquisition', 'merger', 'partnership', 'launches', 'debuts',
    'earnings', 'revenue', 'profit', 'loss', 'ceo', 'layoffs',
    'investigation', 'lawsuit', 'settlement', 'fda approval',
    'stock split', 'dividend', 'buyback'
  ]
  
  const headlineLower = headline.toLowerCase()
  return breakingKeywords.some(keyword => headlineLower.includes(keyword))
}

function formatNewsTime(timestamp) {
  const now = Date.now() / 1000
  const newsTime = timestamp
  const diffMinutes = Math.floor((now - newsTime) / 60)
  
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

function removeDuplicateNews(newsArray) {
  const seen = new Set()
  return newsArray.filter(article => {
    const key = article.headline.toLowerCase().substring(0, 50)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function getFallbackData() {
  return {
    marketData: {
      spy: { price: 6045.23, change: 0.85, changePercent: 0.85, name: 'S&P 500', symbol: 'SPY' },
      nasdaq: { price: 19892.15, change: 1.12, changePercent: 1.12, name: 'NASDAQ', symbol: 'QQQ' },
      btc: { price: 94650, change: -1.85, changePercent: -1.85, name: 'Bitcoin', symbol: 'BTC' },
      gold: { price: 2647.30, change: 0.32, changePercent: 0.32, name: 'Gold', symbol: 'GOLD' },
      oil: { price: 69.85, change: -0.98, changePercent: -0.98, name: 'WTI Oil', symbol: 'OIL' }
    },
    breakingNews: [
      {
        headline: 'Live News API Connected',
        summary: 'Real-time financial news system is now active and monitoring major market events.',
        source: 'System',
        datetime: 'Just now',
        url: '#',
        isBreaking: true
      }
    ],
    generalNews: [
      {
        headline: 'Market Tracking Active',
        summary: 'Monitoring AAPL, MSFT, GOOGL, NVDA, TSLA and other major stocks for breaking news.',
        source: 'ValuationPro',
        datetime: 'Just now',
        url: '#'
      }
    ]
  }
}

export async function GET() {
  try {
    const now = Date.now()
    const lastUpdate = newsCache.lastUpdated ? new Date(newsCache.lastUpdated).getTime() : 0
    
    // Check cache validity - use shorter cache for breaking news detection
    const cacheAge = now - lastUpdate
    const shouldRefresh = cacheAge > BREAKING_NEWS_CACHE
    
    if (newsCache.marketData && !shouldRefresh) {
      console.log('📦 Returning cached real-time data')
      return NextResponse.json({
        ...newsCache,
        cached: true,
        cacheAge: Math.floor(cacheAge / 1000)
      })
    }
    
    console.log('🔄 Fetching fresh real-time data...')
    
    // Fetch live data
    const [marketData, newsData] = await Promise.allSettled([
      fetchLiveMarketData(),
      fetchBreakingNews()
    ])
    
    let finalMarketData = {}
    let finalBreakingNews = []
    let finalGeneralNews = []
    
    if (marketData.status === 'fulfilled') {
      finalMarketData = marketData.value
    }
    
    if (newsData.status === 'fulfilled') {
      finalBreakingNews = newsData.value.breakingNews
      finalGeneralNews = newsData.value.generalNews
    }
    
    // If we got some data, update cache
    if (Object.keys(finalMarketData).length > 0 || finalGeneralNews.length > 0) {
      newsCache = {
        marketData: finalMarketData,
        breakingNews: finalBreakingNews,
        generalNews: finalGeneralNews,
        lastUpdated: new Date().toISOString(),
        error: null
      }
      
      return NextResponse.json({
        ...newsCache,
        source: 'live_apis',
        success: true,
        cached: false,
        cacheAge: 0
      })
    } else {
      // Fallback to demo data
      console.log('⚠️ No live data available, using fallback')
      const fallbackData = getFallbackData()
      
      return NextResponse.json({
        ...fallbackData,
        source: 'fallback',
        success: false,
        cached: false,
        error: 'Live APIs unavailable'
      })
    }
    
  } catch (error) {
    console.error('❌ Real-time news API error:', error)
    
    // Return fallback data
    const fallbackData = getFallbackData()
    
    return NextResponse.json({
      ...fallbackData,
      source: 'fallback',
      success: false,
      error: error.message
    }, { status: 200 }) // Don't return 500, just mark as fallback
  }
}

// Manual refresh endpoint
export async function POST() {
  try {
    console.log('🔄 Manual refresh requested for real-time data')
    
    // Force refresh by clearing cache
    newsCache.lastUpdated = null
    
    // Call GET to fetch fresh data
    return GET()
    
  } catch (error) {
    console.error('❌ Manual refresh error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to refresh real-time data',
        message: error.message,
        success: false
      },
      { status: 500 }
    )
  }
}
