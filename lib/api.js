export async function fetchStockData(ticker) {
  await delay(500 + Math.random() * 1000);
  
  const stockInfo = STOCK_DATABASE[ticker.toUpperCase()];
  
  if (!stockInfo) {
    // Better fallback data for unknown tickers
    const randomPrice = Math.floor(Math.random() * 200 + 50); // $50-250
    const randomMarketCap = Math.floor(Math.random() * 500 + 20); // 20B-520B
    const forwardPE = Math.floor(Math.random() * 25 + 15); // 15-40x
    const ttmPE = Math.floor(Math.random() * 30 + 20); // 20-50x (clean number)
    
    return {
      ticker: ticker.toUpperCase(),
      name: `${ticker.toUpperCase()} Corporation`,
      price: randomPrice,
      marketCap: randomMarketCap + 'B',
      forwardPE: forwardPE.toString(),
      ttmPE: ttmPE, // Clean integer instead of long decimal
      sector: 'Technology',
      description: `${ticker.toUpperCase()} operates in the technology sector with focus on innovation and growth. This is simulated data for demonstration purposes.`,
      eps: { years: ['2025', '2026', '2027'], values: [5.0, 6.2, 7.8] },
      peBands: { low: 20, mid: 25, high: 30 },
      scores: { 
        value: Math.floor(Math.random() * 4 + 6), // 6-10 range
        growth: Math.floor(Math.random() * 4 + 6), 
        profit: Math.floor(Math.random() * 4 + 6), 
        momentum: Math.floor(Math.random() * 4 + 6) 
      },
      // Better peers data - include some real companies for context
      peers: [
        [randomMarketCap, forwardPE, 15, ticker.toUpperCase()],
        [2180, 22.5, 22, 'GOOGL'],
        [3790, 33.2, 26, 'MSFT'], 
        [3450, 30.1, 24, 'AAPL']
      ],
      segments: [
        { name: 'Core Business', value: 60, itemStyle: { color: '#3b82f6' } },
        { name: 'Growth Areas', value: 25, itemStyle: { color: '#10b981' } },
        { name: 'Other', value: 15, itemStyle: { color: '#f59e0b' } }
      ],
      strengths: [
        'Strong market position in core business',
        'Innovative product development pipeline',
        'Experienced management team'
      ],
      risks: [
        'Competitive market pressures',
        'Economic sensitivity and cyclical exposure',
        'Regulatory challenges in key markets'
      ],
      news: [
        { headline: `${ticker.toUpperCase()} reports quarterly earnings`, source: 'Financial News', datetime: 'Just now', url: 'https://finance.yahoo.com' },
        { headline: `Analysts update ${ticker.toUpperCase()} price targets`, source: 'Market Watch', datetime: '1 hour ago', url: 'https://marketwatch.com' }
      ]
    };
  }

  return {
    ...stockInfo,
    ticker: ticker.toUpperCase()
  };
}

// Keep the rest of the file the same (STOCK_DATABASE and other functions)
