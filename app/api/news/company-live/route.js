// app/api/news/company-live/route.js - Live company-specific news using Google News
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  const companyName = searchParams.get('name')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter required' }, { status: 400 })
  }

  try {
    console.log(`🔄 Fetching live company news for ${symbol}...`)
    
    // Fetch company-specific news from Google News
    const companyNews = await fetchCompanyNewsFromGoogle(symbol, companyName)
    
    if (companyNews && companyNews.length > 0) {
      console.log(`✅ Found ${companyNews.length} live news articles for ${symbol}`)
      return NextResponse.json({
        news: companyNews,
        dataSource: 'google_news_live',
        symbol: symbol,
        lastUpdated: new Date().toISOString()
      })
    } else {
      // Return fallback news with company context
      const fallbackNews = getFallbackCompanyNews(symbol, companyName)
      return NextResponse.json({
        news: fallbackNews,
        dataSource: 'fallback',
        symbol: symbol,
        message: `No recent live news found for ${symbol}`
      })
    }

  } catch (error) {
    console.error(`❌ Error fetching company news for ${symbol}:`, error)
    
    const fallbackNews = getFallbackCompanyNews(symbol, companyName)
    return NextResponse.json({
      news: fallbackNews,
      dataSource: 'fallback',
      symbol: symbol,
      message: 'Using fallback news - API error'
    })
  }
}

async function fetchCompanyNewsFromGoogle(symbol, companyName) {
  console.log(`🔄 Searching Google News for ${symbol} - ${companyName}`)
  
  const newsItems = []
  
  // Create targeted search queries for the company
  const queries = [
    `${symbol} stock earnings financial news`,
    `"${companyName}" earnings report stock`,
    `${symbol} ${companyName} financial results`,
    `${symbol} stock price analyst rating`
  ]
  
  for (const query of queries) {
    try {
      const encodedQuery = encodeURIComponent(query)
      const rssUrl = `https://news.google.com/rss/search?q=${encodedQuery}&hl=en&gl=US&ceid=US:en`
      
      console.log(`🔍 Searching: ${query}`)
      
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml'
        },
        signal: AbortSignal.timeout(8000)
      })
      
      if (response.ok) {
        const xmlText = await response.text()
        const articles = parseCompanyNewsXML(xmlText, symbol, companyName)
        newsItems.push(...articles)
        console.log(`✅ Found ${articles.length} articles from query: ${query}`)
      }
    } catch (error) {
      console.log(`❌ Query failed: ${query} - ${error.message}`)
    }
  }
  
  // Remove duplicates and filter for relevance
  const uniqueNews = removeDuplicateNews(newsItems)
  const relevantNews = filterRelevantNews(uniqueNews, symbol, companyName)
  
  // Sort by recency and limit to top 6
  relevantNews.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
  
  return relevantNews.slice(0, 6)
}

function parseCompanyNewsXML(xmlText, symbol, companyName) {
  const articles = []
  
  try {
    const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g) || []
    
    for (const itemXml of itemMatches.slice(0, 15)) { // Process more items for filtering
      const title = extractXMLTag(itemXml, 'title')
      const link = extractXMLTag(itemXml, 'link')
      const pubDate = extractXMLTag(itemXml, 'pubDate')
      const description = extractXMLTag(itemXml, 'description')
      const source = extractXMLTag(itemXml, 'source')
      
      if (title && link) {
        const cleanTitle = aggressiveCleanText(title)
        const cleanSummary = aggressiveCleanText(description) || cleanTitle.substring(0, 150) + '...'
        
        // Only add if title is clean and meaningful
        if (cleanTitle && 
            cleanTitle.length > 10 && 
            cleanTitle.length < 200 &&
            !hasHTMLArtifacts(cleanTitle)) {
          
          articles.push({
            headline: cleanTitle,
            summary: cleanSummary,
            source: cleanSource(source) || extractSourceFromTitle(cleanTitle) || 'Google News',
            datetime: formatGoogleNewsTime(pubDate),
            url: cleanGoogleNewsURL(link),
            pubDate: pubDate,
            isBreaking: isBreakingNews(cleanTitle),
            relevanceScore: calculateRelevanceScore(cleanTitle + ' ' + cleanSummary, symbol, companyName)
          })
        }
      }
    }
  } catch (error) {
    console.error('❌ XML parsing error:', error.message)
  }
  
  return articles
}

function calculateRelevanceScore(text, symbol, companyName) {
  const lowerText = text.toLowerCase()
  const lowerSymbol = symbol.toLowerCase()
  const lowerCompanyName = companyName ? companyName.toLowerCase() : ''
  
  let score = 0
  
  // High relevance for exact symbol match
  if (lowerText.includes(lowerSymbol)) score += 10
  
  // High relevance for company name match
  if (lowerCompanyName && lowerText.includes(lowerCompanyName)) score += 8
  
  // Medium relevance for financial keywords
  const financialKeywords = ['earnings', 'revenue', 'profit', 'stock', 'shares', 'dividend', 'analyst', 'rating', 'price target', 'quarterly', 'annual']
  financialKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) score += 2
  })
  
  // Low relevance for general business keywords
  const businessKeywords = ['announce', 'launch', 'partnership', 'acquisition', 'ceo', 'investment']
  businessKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) score += 1
  })
  
  return score
}

function filterRelevantNews(newsArray, symbol, companyName) {
  // Filter for articles with relevance score > 5 and sort by relevance
  return newsArray
    .filter(article => article.relevanceScore > 5)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
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

function getFallbackCompanyNews(symbol, companyName) {
  const companyDisplayName = companyName || `${symbol} Corporation`
  
  return [
    {
      headline: `${companyDisplayName} Financial Performance Analysis`,
      summary: `Latest financial metrics and market performance analysis for ${symbol}. Professional analysts continue to monitor key performance indicators.`,
      source: 'Financial Analysis Service',
      datetime: '2 hours ago',
      url: '#',
      isBreaking: false
    },
    {
      headline: `Market Update: ${symbol} Trading Activity`,
      summary: `Current market trends and trading patterns for ${companyDisplayName} shares in today's trading session.`,
      source: 'Market Intelligence',
      datetime: '4 hours ago', 
      url: '#',
      isBreaking: false
    },
    {
      headline: `${symbol} Sector Analysis and Outlook`,
      summary: `Industry analysis and competitive positioning assessment for ${companyDisplayName} within its sector.`,
      source: 'Sector Research',
      datetime: '6 hours ago',
      url: '#',
      isBreaking: false
    }
  ]
}

// Utility functions (copied from working news system)
function extractXMLTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>(.*?)<\/${tagName}>`, 'i')
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

function aggressiveCleanText(text) {
  if (!text) return ''
  
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s*<\s*a\s+[^>]*>\s*/gi, '')
    .replace(/\s*<\/a>\s*/gi, '')
    .replace(/<font[^>]*>/gi, '')
    .replace(/<\/font>/gi, '')
    .replace(/color="#[^"]*"/gi, '')
    .replace(/target="_blank"/gi, '')
    .replace(/href="[^"]*"/gi, '')
    .replace(/font color="[^"]*"/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/^\s*-\s*/, '')
    .replace(/\s*-\s*$/, '')
    .trim()
}

function hasHTMLArtifacts(text) {
  const htmlIndicators = [
    '<', '>', 'font color', 'target=', 'href=', 
    '</a>', '<a>', '</font>', '<font',
    'color="#', 'color=', '&lt;', '&gt;'
  ]
  
  const lowerText = text.toLowerCase()
  return htmlIndicators.some(indicator => lowerText.includes(indicator))
}

function extractSourceFromTitle(title) {
  const match = title.match(/\s*-\s*([^-]+)$/)
  if (match && match[1] && match[1].length < 50) {
    return match[1].trim()
  }
  return null
}

function cleanSource(source) {
  if (!source) return 'Google News'
  
  return source
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .trim() || 'Google News'
}

function cleanGoogleNewsURL(url) {
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
