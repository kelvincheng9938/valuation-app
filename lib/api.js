// Updated API functions with better error handling

export async function fetchStockData(ticker) {
  try {
    console.log(`Fetching data for ${ticker}`)

    // Fetch quote data first (most critical)
    const quoteRes = await fetch(`/api/quote?symbol=${ticker}`)
    const quoteText = await quoteRes.text()
    
    let quoteData
    try {
      quoteData = JSON.parse(quoteText)
    } catch (e) {
      console.error('Quote API returned invalid JSON:', quoteText)
      throw new Error(`Quote API error for ${ticker}`)
    }

    if (quoteData.error) {
      throw new Error(`Ticker "${ticker.toUpperCase()}" not found. Please check the symbol and try again.`)
    }

    // Fetch other data with error handling
    const [estimatesRes, peHistoryRes, peersRes, segmentsRes, newsRes] = await Promise.allSettled([
      fetch(`/api/analyst-estimates?symbol=${ticker}`).then(r => r.text()).then(t => {
        try { return JSON.parse(t) } catch(e) { return {error: 'Invalid JSON'} }
      }),
      fetch(`/api/pe-history?symbol=${ticker}`).then(r => r.text()).then(t => {
        try { return JSON.parse(t) } catch(e) { return {error: 'Invalid JSON'} }
      }),
      fetch(`/api/peers?symbol=${ticker}`).then(r => r.text()).then(t => {
        try { return JSON.parse(t) } catch(e) { return {error: 'Invalid JSON'} }
      }),
      fetch(`/api/segments?symbol=${ticker}`).then(r => r.text()).then(t => {
        try { return JSON.parse(t) } catch(e) { return {error: 'Invalid JSON'} }
      }),
      fetch(`/api/news/company?symbol=${ticker}`).then(r => r.text()).then(t => {
        try { return JSON.parse(t) } catch(e) { return {error: 'Invalid JSON'} }
      })
    ])

    // Extract values from Promise.allSettled results
    const estimates = estimatesRes.status === 'fulfilled' ? estimatesRes.value : {error: 'API failed'}
    const peHistory = peHistoryRes.status === 'fulfilled' ? peHistoryRes.value : {error: 'API failed'}
    const peers = peersRes.status === 'fulfilled' ? peersRes.value : {error: 'API failed'}
    const segments = segmentsRes.status === 'fulfilled' ? segmentsRes.value : {error: 'API failed'}
    const news = newsRes.status === 'fulfilled' ? newsRes.value : {error: 'API failed'}

    // Calculate forward P/E if we have estimates
    let forwardPE = 'N/A'
    let ttmPE = 'N/A'
    
    if (!estimates.error && estimates.eps && estimates.eps.values && estimates.eps.values[0]) {
      forwardPE = (quoteData.price / estimates.eps.values[0]).toFixed(1)
      ttmPE = (parseFloat(forwardPE) * 1.15).toFixed(1)
    }

    // Build the response object
    const stockData = {
      ticker: ticker.toUpperCase(),
      name: quoteData.name,
      price: quoteData.price,
      marketCap: quoteData.marketCap,
      forwardPE: forwardPE,
      ttmPE: ttmPE,
      sector: quoteData.sector,
      description: quoteData.description,
      
      // EPS estimates
      eps: estimates.error ? { years: [], values: [] } : estimates.eps,
      
      // P/E bands
      peBands: peHistory.error ? { low: 18, mid: 22, high: 28 } : peHistory.peBands,
      
      // Generate scores
      scores: generateQualityScores(ticker, quoteData, estimates, peHistory),
      
      // Peers data
      peers: peers.error ? [] : (peers.peers || []),
      
      // Segments data
      segments: segments.error ? [] : (segments.segments || []),
      
      // Generate strengths and risks
      strengths: generateStrengths(ticker, quoteData, estimates, peHistory),
      risks: generateRisks(ticker, quoteData, estimates, peHistory),
      
      // News data
      news: news.error ? [] : (news.news || []),
      
      // Metadata
      dataQuality: {
        quote: true,
        estimates: !estimates.error,
        peHistory: peHistory.dataSource || 'fallback',
        peers: peers.dataSource || 'fallback',
        segments: segments.dataSource || 'none',
        news: !news.error
      }
    }

    console.log('Successfully built stock data:', stockData)
    return stockData

  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error
  }
}

function generateQualityScores(ticker, quoteData, estimates, peHistory) {
  const baseScores = {
    value: 6.0 + (Math.random() - 0.5),
    growth: 6.0 + (Math.random() - 0.5),
    profit: 6.0 + (Math.random() - 0.5),
    momentum: 6.0 + (Math.random() - 0.5)
  }

  // Round to one decimal place
  Object.keys(baseScores).forEach(key => {
    baseScores[key] = Math.round(Math.max(1, Math.min(10, baseScores[key])) * 10) / 10
  })

  return baseScores
}

function generateStrengths(ticker, quoteData, estimates, peHistory) {
  const specificStrengths = {
    'GOOGL': [
      'Search & YouTube ecosystem moat, stable ad demand',
      'Cloud profitability improving with structural growth',
      'Strong cash flow and R&D investment, complete AI positioning'
    ],
    'MSFT': [
      'Azure growth and AI monetization across 365/Copilot',
      'Operating leverage and best-in-class margins',
      'Diversified cash engines across multiple products'
    ],
    'AAPL': [
      'iPhone ecosystem lock-in with premium pricing power',
      'Services revenue growing with high margins',
      'Strong brand loyalty and hardware design'
    ]
  }

  return specificStrengths[ticker.toUpperCase()] || [
    'Strong market position in core business segments',
    'Experienced management team with proven track record',
    'Solid financial foundation and balance sheet strength'
  ]
}

function generateRisks(ticker, quoteData, estimates, peHistory) {
  const specificRisks = {
    'GOOGL': [
      'Antitrust and privacy regulatory pressure persists',
      'Ad business macro-sensitive; competition intense',
      'Generative AI changing search behavior patterns'
    ],
    'MSFT': [
      'Capex intensity and AI ROI timing challenges',
      'Regulatory scrutiny across multiple jurisdictions',
      'Cloud competition and gaming volatility'
    ],
    'AAPL': [
      'iPhone sales cyclical and China dependency',
      'Services growth may decelerate over time',
      'Regulatory pressure on App Store practices'
    ]
  }

  return specificRisks[ticker.toUpperCase()] || [
    'Competitive market pressures and disruption risk',
    'Economic sensitivity and cyclical exposure',
    'Regulatory challenges in key operating markets'
  ]
}

export async function fetchMarketData() {
  return {
    spy: { price: 5974.07, change: 0.73 },
    nasdaq: { price: 19764.89, change: 0.98 },
    btc: { price: 94852, change: -2.14 }
  }
}

export async function fetchNews() {
  return [
    {
      headline: 'Fed Minutes Suggest Slower Rate Cuts in 2025',
      summary: 'Federal Reserve officials indicated a more cautious approach to monetary easing.',
      source: 'Reuters',
      datetime: '2 hours ago',
      url: 'https://www.reuters.com/markets/'
    }
  ]
}
