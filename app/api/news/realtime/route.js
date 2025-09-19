// app/api/news/realtime/route.js
import { NextResponse } from 'next/server'

// Cache for storing the latest data
let dataCache = {
  marketData: null,
  news: [],
  events: [],
  lastUpdated: null,
  error: null
}

// Cache duration: 1 minute for testing, 5 minutes for production
const CACHE_DURATION = 1 * 60 * 1000 // 1 minute for now

async function fetchRealMarketData() {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY
  
  if (!FINNHUB_API_KEY) {
    console.log('❌ Finnhub API key not found')
    throw new Error('Finnhub API key not found')
  }
  
  console.log('🔄 Fetching market data from Finnhub...')
  
  const marketData = {}
  
  // Correct symbols for major indices
  const symbols = [
    { symbol: '^GSPC', key: 'spy', name: 'S&P 500' },      // S&P 500 Index
    { symbol: '^IXIC', key: 'nasdaq', name: 'NASDAQ' },     // NASDAQ Composite
    { symbol: 'BTC-USD', key: 'btc', name: 'Bitcoin' },     // Bitcoin
    { symbol: 'GC=F', key: 'gold', name: 'Gold' },          // Gold Futures
    { symbol: 'CL=F', key: 'oil', name: 'WTI Oil' }         // Crude Oil
  ]
  
  // Try multiple API approaches
  for (const { symbol, key, name } of symbols) {
    try {
      // Try Finnhub first
      let response = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
        { 
          headers: { 'User-Agent': 'ValuationPro/1.0' },
          signal: AbortSignal.timeout(8000)
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.c && data.c > 0) {
          const price = data.c
          const change = data.d || 0
          const changePercent = data.dp || 0
          
          marketData[key] = {
            price: price,
            change: changePercent,
            changePercent: changePercent,
            name: name,
            symbol: symbol,
            source: 'finnhub'
          }
          
          console.log(`✅ ${name}: $${price} (${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`)
          continue // Success, move to next symbol
        }
      }
      
      // If Finnhub fails, try Yahoo Finance alternative
      const yahooSymbol = symbol.replace('^', '%5E').replace('=F', '%3DF')
      response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}`,
        { 
          signal: AbortSignal.timeout(8000),
          headers: { 'User-Agent': 'Mozilla/5.0' }
        }
      )
      
      if (response.ok) {
        const yahooData = await response.json()
        const result = yahooData.chart?.result?.[0]
        
        if (result && result.meta) {
          const price = result.meta.regularMarketPrice || result.meta.previousClose
          const previousClose = result.meta.previousClose
          const change = price - previousClose
          const changePercent = (change / previousClose) * 100
          
          if (price > 0) {
            marketData[key] = {
              price: price,
              change: changePercent,
              changePercent: changePercent,
              name: name,
              symbol: symbol,
              source: 'yahoo'
            }
            
            console.log(`✅ ${name} (Yahoo): $${price} (${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(2)}%)`)
            continue
          }
        }
      }
      
      console.log(`❌ Failed to fetch ${name} from both APIs`)
      
    } catch (error) {
      console.log(`❌ Error fetching ${name}:`, error.message)
    }
  }
  
  // Manual data as last resort with realistic current values
  if (Object.keys(marketData).length === 0) {
    console.log('📝 Using current manual market data...')
    marketData.spy = { price: 6631.96, change: 0.5, changePercent: 0.5, name: 'S&P 500', source: 'manual' }
    marketData.nasdaq = { price: 21236.33, change: 0.8, changePercent: 0.8, name: 'NASDAQ', source: 'manual' }
    marketData.btc = { price: 98250, change: -1.2, changePercent: -1.2, name: 'Bitcoin', source: 'manual' }
    marketData.gold = { price: 2647.30, change: 0.3, changePercent: 0.3, name: 'Gold', source: 'manual' }
    marketData.oil = { price: 69.85, change: -0.9, changePercent: -0.9, name: 'WTI Oil', source: 'manual' }
  }
  
  return marketData
}

async function fetchGoogleNews() {
  console.log('🔄 Fetching financial news from Google News...')
  
  const newsItems = []
  
  // Multiple RSS feeds for comprehensive coverage
  const rssFeeds = [
    'https://news.google.com/rss/search?q=financial+news+earnings+stock+market&hl=en&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=NVDA+AAPL+MSFT+TSLA+earnings+announcement&hl=en&gl=US&ceid=US:en',
    'https://news.google.com/rss/search?q=federal+reserve+interest+rates+inflation&hl=en&gl=US&ceid=US:en'
  ]
  
  for (const feedUrl of rssFeeds) {
    try {
      const response = await fetch(feedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        },
        signal: AbortSignal.timeout(10000)
      })
      
      if (response.ok) {
        const xmlText = await response.text()
        const articles = parseGoogleNewsXML(xmlText)
        newsItems.push(...articles)
        console.log(`✅ Fetched ${articles.length} articles from Google News`)
      }
    } catch (error) {
      console.log('❌ Google News RSS failed:', error.message)
    }
  }
  
  // Remove duplicates and sort by time
  const uniqueNews = removeDuplicateNews(newsItems)
  uniqueNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
  
  return uniqueNews.slice(0, 12) // Top 12 articles
}

function parseGoogleNewsXML(xmlText) {
  const articles = []
  
  try {
    // Simple XML parsing for RSS items
    const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || []
    
    for (const itemXml of itemMatches.slice(0, 20)) { // Limit processing
      const title = extractXMLTag(itemXml, 'title')
      const link = extractXMLTag(itemXml, 'link')
      const pubDate = extractXMLTag(itemXml, 'pubDate')
      const description = extractXMLTag(itemXml, 'description')
      const source = extractXMLTag(itemXml, 'source')
      
      if (title && link) {
        articles.push({
          headline: cleanGoogleNewsTitle(title),
          summary: cleanDescription(description) || cleanGoogleNewsTitle(title).substring(0, 150) + '...',
          source: cleanSource(source) || 'Google News',
          datetime: formatGoogleNewsTime(pubDate),
          url: cleanGoogleNewsURL(link),
          pubDate: pubDate,
          isBreaking: isBreakingNews(title)
        })
      }
    }
  } catch (error) {
    console.log('❌ XML parsing error:', error.message)
  }
  
  return articles
}

function extractXMLTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 'i')
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

function cleanGoogleNewsTitle(title) {
  // Remove HTML entities and clean up
  return title
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .replace(/href="[^"]*"/g, '') // Remove href attributes
    .trim()
}

function cleanDescription(description) {
  if (!description) return ''
  
  return description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/href="[^"]*"/g, '') // Remove href attributes
    .replace(/https?:\/\/[^\s]+/g, '') // Remove URLs
    .substring(0, 200)
    .trim()
}

function cleanSource(source) {
  if (!source) return 'Google News'
  
  return source
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .trim() || 'Google News'
}

function cleanGoogleNewsURL(url) {
  // Clean Google News redirect URLs
  if (url.includes('news.google.com/rss/articles/')) {
    return url
  }
  return url.replace(/^https:\/\/news\.google\.com\/.*?url=/, '').split('&')[0] || url
}

function formatGoogleNewsTime(pubDate) {
  if (!pubDate) return 'Recently'
  
  try {
    const articleDate = new Date(pubDate)
    const now = new Date()
    const diffMs = now - articleDate
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return articleDate.toLocaleDateString()
  } catch {
    return 'Recently'
  }
}

function isBreakingNews(headline) {
  const breakingKeywords = [
    'breaking', 'announces', 'reports', 'beats', 'misses', 'guidance',
    'earnings', 'acquisition', 'merger', 'partnership', 'launches',
    'ceo', 'layoffs', 'investigation', 'fda approval', 'stock split',
    'dividend', 'buyback', 'halt', 'surge', 'plunge', 'alert'
  ]
  
  const headlineLower = headline.toLowerCase()
  return breakingKeywords.some(keyword => headlineLower.includes(keyword))
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

function generateUpcomingEvents() {
  const events = []
  const today = new Date()
  
  // Specific important upcoming events with correct dates
  const specificEvents = [
    {
      name: 'US Non-Farm Payrolls',
      description: 'Bureau of Labor Statistics - High Impact',
      date: 'Oct 3, 2025',
      time: '8:30 AM EST',
      impact: 'High'
    },
    {
      name: 'US Non-Farm Payrolls', 
      description: 'Bureau of Labor Statistics - High Impact',
      date: 'Nov 7, 2025',
      time: '8:30 AM EST',
      impact: 'High'
    },
    {
      name: 'Fed Interest Rate Decision',
      description: 'Federal Reserve FOMC Meeting - High Impact', 
      date: 'Dec 18, 2025',
      time: '2:00 PM EST',
      impact: 'High'
    },
    {
      name: 'US CPI Inflation Data',
      description: 'Bureau of Labor Statistics - High Impact',
      date: 'Oct 15, 2025', 
      time: '8:30 AM EST',
      impact: 'High'
    },
    {
      name: 'US GDP Growth Rate',
      description: 'Bureau of Economic Analysis - Medium Impact',
      date: 'Oct 30, 2025',
      time: '8:30 AM EST', 
      impact: 'Medium'
    },
    {
      name: 'US Retail Sales',
      description: 'Bureau of Labor Statistics - Medium Impact',
      date: 'Nov 15, 2025',
      time: '8:30 AM EST',
      impact: 'Medium'
    }
  ]
  
  return specificEvents.slice(0, 6)
}

export async function GET() {
  try {
    const now = Date.now()
    const lastUpdate = dataCache.lastUpdated ? new Date(dataCache.lastUpdated).getTime() : 0
    const cacheAge = now - lastUpdate
    
    // Check cache validity
    if (dataCache.marketData && cacheAge < CACHE_DURATION) {
      console.log('📦 Returning cached data')
      return NextResponse.json({
        ...dataCache,
        cached: true,
        cacheAge: Math.floor(cacheAge / 1000)
      })
    }
    
    console.log('🔄 Fetching fresh data...')
    
    // Fetch all data in parallel
    const [marketData, news, events] = await Promise.allSettled([
      fetchRealMarketData(),
      fetchGoogleNews(),
      Promise.resolve(generateUpcomingEvents())
    ])
    
    const result = {
      marketData: marketData.status === 'fulfilled' ? marketData.value : {},
      news: news.status === 'fulfilled' ? news.value : [],
      events: events.status === 'fulfilled' ? events.value : [],
      lastUpdated: new Date().toISOString(),
      source: 'google_news_apis',
      success: true,
      cached: false,
      cacheAge: 0,
      error: null
    }
    
    // Update cache
    dataCache = result
    
    console.log('✅ Fresh data fetched successfully:', {
      marketDataCount: Object.keys(result.marketData).length,
      newsCount: result.news.length,
      eventsCount: result.events.length
    })
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ API error:', error)
    
    // Return fallback data
    return NextResponse.json({
      marketData: {
        spy: { price: 6631.96, change: 0.5, changePercent: 0.5, name: 'S&P 500', source: 'fallback' },
        nasdaq: { price: 21236.33, change: 0.8, changePercent: 0.8, name: 'NASDAQ', source: 'fallback' },
        btc: { price: 98250, change: -1.2, changePercent: -1.2, name: 'Bitcoin', source: 'fallback' },
        gold: { price: 2647.30, change: 0.3, changePercent: 0.3, name: 'Gold', source: 'fallback' },
        oil: { price: 69.85, change: -0.9, changePercent: -0.9, name: 'WTI Oil', source: 'fallback' }
      },
      news: [
        {
          headline: 'Live Market Data API Active',
          summary: 'Real-time financial data system is now monitoring markets and news feeds.',
          source: 'System',
          datetime: 'Just now',
          url: '#',
          isBreaking: false
        }
      ],
      events: generateUpcomingEvents(),
      lastUpdated: new Date().toISOString(),
      source: 'fallback',
      success: false,
      error: error.message
    })
  }
}

// Manual refresh
export async function POST() {
  try {
    console.log('🔄 Manual refresh requested')
    dataCache.lastUpdated = null // Clear cache
    return GET()
  } catch (error) {
    console.error('❌ Manual refresh error:', error)
    return NextResponse.json({ error: 'Refresh failed', message: error.message }, { status: 500 })
  }
}
