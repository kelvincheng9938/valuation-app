export async function fetchStockData(ticker) {
  // Return mock data for now to ensure app works
  return {
    ticker: ticker || 'GOOGL',
    name: 'Alphabet Inc.',
    price: 207.14,
    marketCap: '2.25T',
    forwardPE: '24.8',
    ttmPE: 26.2,
    sector: 'Communication Services',
    description: 'Alphabet operates through Google Search & YouTube advertising, with Google Cloud accelerating growth.',
    eps: { years: ['2025', '2026', '2027'], values: [7.5, 8.4, 9.3] },
    peBands: { low: 22, mid: 25, high: 30 },
    scores: { value: 8.2, growth: 7.6, profit: 9.0, momentum: 6.9 },
    peers: [[2250, 24.8, 22, 'GOOGL'], [3500, 35.0, 26, 'MSFT'], [2000, 45.0, 20, 'AMZN']],
    segments: [
      { name: 'Search & Other', value: 56 },
      { name: 'YouTube Ads', value: 12 },
      { name: 'Google Cloud', value: 11 },
      { name: 'Network', value: 15 },
      { name: 'Other Bets', value: 6 }
    ],
    news: [
      { headline: 'Alphabet unveils new AI features', source: 'Reuters', datetime: 'Just now' },
      { headline: 'Cloud growth accelerates', source: 'Bloomberg', datetime: '2 hours ago' }
    ]
  }
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
      headline: 'Fed Minutes Suggest Slower Rate Cuts',
      summary: 'Federal Reserve officials indicated a cautious approach...',
      source: 'Reuters',
      datetime: '2 hours ago'
    },
    {
      headline: 'Tech Rally Continues on AI Optimism',
      summary: 'Major technology stocks pushed indices higher...',
      source: 'Bloomberg',
      datetime: '3 hours ago'
    }
  ]
}
