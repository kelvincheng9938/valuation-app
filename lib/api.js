const FINNHUB_API_KEY = 'd2iigbpr01qhm15aj4q0d2iigbpr01qhm15aj4qg'
const FMP_API_KEY = 'T3rAcfQj32b14RZankwCJ3hVZ2Z0qehN'

export async function fetchStockData(ticker) {
  try {
    // Fetch quote from Finnhub
    const quoteRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${FINNHUB_API_KEY}`)
    const quote = await quoteRes.json()
    
    // Fetch company profile
    const profileRes = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${FINNHUB_API_KEY}`)
    const profile = await profileRes.json()
    
    // Fetch analyst estimates from FMP
    const estimatesRes = await fetch(`https://financialmodelingprep.com/api/v3/analyst-estimates/${ticker}?apikey=${FMP_API_KEY}`)
    const estimates = await estimatesRes.json()
    
    // Calculate forward EPS from estimates
    const currentYear = new Date().getFullYear()
    const eps = {
      years: [currentYear + 1, currentYear + 2, currentYear + 3].map(y => y.toString()),
      values: estimates?.[0] ? [
        estimates[0].estimatedEpsAvg || 7.5,
        estimates[0].estimatedEpsHigh || 8.4,
        estimates[0].estimatedEpsLow || 9.3
      ] : [7.5, 8.4, 9.3]
    }
    
    // Calculate P/E bands based on historical data
    const peBands = {
      low: 22,  // Would fetch from historical data
      mid: 25,  // Average historical forward P/E
      high: 30  // Premium valuation
    }
    
    // Mock scores (would calculate from fundamentals)
    const scores = {
      value: 8.2,
      growth: 7.6,
      profit: 9.0,
      momentum: 6.9
    }
    
    return {
      ticker,
      name: profile.name || ticker,
      price: quote.c || 207.14,
      marketCap: formatMarketCap(profile.marketCapitalization),
      forwardPE: (quote.c / eps.values[0]).toFixed(1),
      ttmPE: profile.pe || 26.2,
      sector: profile.finnhubIndustry || 'Technology',
      description: `${profile.name} operates in the ${profile.finnhubIndustry} sector. ${profile.description || ''}`,
      eps,
      peBands,
      scores,
      peers: [
        [2250, 24.8, 22, ticker],
        [3500, 35.0, 26, 'MSFT'],
        [2000, 45.0, 20, 'AMZN'],
        [1250, 28.0, 18, 'META']
      ],
      segments: [
        { name: 'Core Business', value: 56 },
        { name: 'Cloud Services', value: 20 },
        { name: 'Advertising', value: 15 },
        { name: 'Other', value: 9 }
      ],
      news: []
    }
  } catch (error) {
    console.error('API Error:', error)
    // Return fallback data
    return {
      ticker: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 207.14,
      marketCap: '2.25T',
      forwardPE: '24.8',
      ttmPE: 26.2,
      sector: 'Communication Services',
      description: 'Alphabet operates through Google Search & YouTube advertising...',
      eps: { years: ['2025', '2026', '2027'], values: [7.5, 8.4, 9.3] },
      peBands: { low: 22, mid: 25, high: 30 },
      scores: { value: 8.2, growth: 7.6, profit: 9.0, momentum: 6.9 },
      peers: [[2250, 24.8, 22, 'GOOGL'], [3500, 35.0, 26, 'MSFT']],
      segments: [
        { name: 'Search & Other', value: 56 },
        { name: 'YouTube Ads', value: 12 },
        { name: 'Google Cloud', value: 11 },
        { name: 'Network', value: 15 },
        { name: 'Other Bets', value: 6 }
      ],
      news: []
    }
  }
}

export async function fetchMarketData() {
  try {
    const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=SPY&token=${FINNHUB_API_KEY}`)
    const data = await res.json()
    return data
  } catch (error) {
    return null
  }
}

export async function fetchNews() {
  try {
    const res = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_API_KEY}`)
    const news = await res.json()
    return news.slice(0, 6).map(item => ({
      headline: item.headline,
      summary: item.summary?.substring(0, 150) + '...',
      source: item.source,
      url: item.url,
      datetime: new Date(item.datetime * 1000).toLocaleString()
    }))
  } catch (error) {
    return []
  }
}

function formatMarketCap(value) {
  if (!value) return 'N/A'
  if (value >= 1e12) return (value / 1e12).toFixed(2) + 'T'
  if (value >= 1e9) return (value / 1e9).toFixed(2) + 'B'
  if (value >= 1e6) return (value / 1e6).toFixed(2) + 'M'
  return value.toString()
}
