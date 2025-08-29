import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter required' }, { status: 400 })
  }

  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY

  if (!FINNHUB_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    // Get date range for last 30 days
    const toDate = new Date()
    const fromDate = new Date(toDate.getTime() - (30 * 24 * 60 * 60 * 1000))
    
    const fromDateStr = fromDate.toISOString().split('T')[0]
    const toDateStr = toDate.toISOString().split('T')[0]

    // Fetch company news
    const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromDateStr}&to=${toDateStr}&token=${FINNHUB_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({
        news: [],
        message: 'No recent news available'
      })
    }

    // Process and clean the news data
    const processedNews = data
      .filter(article => article.headline && article.url && article.datetime)
      .slice(0, 10) // Limit to 10 most recent articles
      .map(article => ({
        headline: cleanHeadline(article.headline),
        summary: article.summary || generateSummary(article.headline),
        source: article.source || 'Financial News',
        datetime: formatDateTime(article.datetime),
        url: article.url,
        image: article.image || null
      }))

    return NextResponse.json({
      news: processedNews,
      dataSource: 'live',
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('News API error:', error)
    
    // Return fallback news
    const fallbackNews = getFallbackNews(symbol.toUpperCase())
    
    return NextResponse.json({
      news: fallbackNews,
      dataSource: 'fallback',
      message: 'Using fallback news - API error'
    })
  }
}

function cleanHeadline(headline) {
  // Remove excessive capitalization and clean up headline
  return headline
    .replace(/[A-Z]{3,}/g, (match) => match.charAt(0) + match.slice(1).toLowerCase())
    .replace(/\s+/g, ' ')
    .trim()
}

function formatDateTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000)
  const now = new Date()
  const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
}

function generateSummary(headline) {
  // Generate a basic summary from headline
  if (headline.length > 80) {
    return headline.substring(0, 77) + '...'
  }
  return headline
}

function getFallbackNews(symbol) {
  const genericNews = [
    {
      headline: `${symbol} reports quarterly earnings`,
      summary: 'Company releases latest financial results and guidance.',
      source: 'Financial News',
      datetime: 'Just now',
      url: 'https://finance.yahoo.com'
    },
    {
      headline: `Analysts update ${symbol} price targets`,
      summary: 'Wall Street firms revise estimates following recent developments.',
      source: 'Market Watch',
      datetime: '2 hours ago',
      url: 'https://marketwatch.com'
    }
  ]

  // Company-specific fallback news
  const specificNews = {
    'GOOGL': [
      {
        headline: 'Alphabet unveils new AI features across Google products',
        summary: 'Google integrates advanced AI capabilities into search and cloud services.',
        source: 'Reuters',
        datetime: 'Just now',
        url: 'https://www.reuters.com/technology/'
      },
      {
        headline: 'Google Cloud margins expand as enterprise adoption grows', 
        summary: 'Cloud division shows strong growth with improved profitability metrics.',
        source: 'Bloomberg',
        datetime: '2 hours ago',
        url: 'https://www.bloomberg.com/technology/'
      }
    ],
    'MSFT': [
      {
        headline: 'Microsoft AI revenue surges as Copilot adoption accelerates',
        summary: 'Strong demand for AI-powered productivity tools drives growth.',
        source: 'Reuters', 
        datetime: 'Just now',
        url: 'https://www.reuters.com/technology/'
      },
      {
        headline: 'Azure gains market share against AWS in cloud infrastructure',
        summary: 'Microsoft\'s cloud platform continues to capture enterprise customers.',
        source: 'Bloomberg',
        datetime: '1 hour ago', 
        url: 'https://www.bloomberg.com/technology/'
      }
    ],
    'AAPL': [
      {
        headline: 'Apple iPhone 16 demand shows resilience in key markets',
        summary: 'Latest iPhone model maintains strong sales despite market headwinds.',
        source: 'Reuters',
        datetime: '30 min ago',
        url: 'https://www.reuters.com/technology/'
      },
      {
        headline: 'Services revenue growth accelerates with new tiers',
        summary: 'Apple\'s high-margin services business continues expansion.',
        source: 'WSJ',
        datetime: '2 hours ago',
        url: 'https://www.wsj.com/tech/'
      }
    ]
  }

  return specificNews[symbol] || genericNews
}
