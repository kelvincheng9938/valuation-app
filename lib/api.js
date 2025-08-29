// Stock data database - realistic data for different tickers
const STOCK_DATABASE = {
  'GOOGL': {
    name: 'Alphabet Inc.',
    price: 175.84,
    marketCap: '2.18T',
    forwardPE: '22.5',
    ttmPE: 25.8,
    sector: 'Communication Services',
    description: 'Alphabet operates through Google Search & YouTube advertising, with Google Cloud accelerating growth. The company continues investing in generative AI and infrastructure.',
    eps: { years: ['2025', '2026', '2027'], values: [7.82, 8.94, 10.15] },
    peBands: { low: 20.5, mid: 22.5, high: 25.2 },
    scores: { value: 8.2, growth: 7.6, profit: 9.0, momentum: 6.9 },
    peers: [[2180, 22.5, 22, 'GOOGL'], [3790, 33.2, 26, 'MSFT'], [2470, 42.8, 20, 'AMZN'], [1890, 26.5, 18, 'META']],
    segments: [
      { name: 'Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } },
      { name: 'Network', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets', value: 7, itemStyle: { color: '#ef4444' } }
    ],
    strengths: [
      'Search & YouTube ecosystem moat, stable ad demand',
      'Cloud profitability improving with structural growth', 
      'Strong cash flow and R&D investment, complete AI positioning'
    ],
    risks: [
      'Antitrust and privacy regulatory pressure persists',
      'Ad business macro-sensitive; competition intense',
      'Generative AI changing search behavior patterns'
    ],
    news: [
      { headline: 'Alphabet unveils new AI features across Google products', source: 'Reuters', datetime: 'Just now', url: 'https://www.reuters.com/technology/' },
      { headline: 'Google Cloud margins expand as enterprise adoption grows', source: 'Bloomberg', datetime: '2 hours ago', url: 'https://www.bloomberg.com/technology/' }
    ]
  },
  'MSFT': {
    name: 'Microsoft Corporation',
    price: 509.64,
    marketCap: '3.79T',
    forwardPE: '33.2',
    ttmPE: 37.4,
    sector: 'Technology',
    description: 'Microsoft develops and licenses software (Windows, Office, GitHub), operates Azure as a hyperscale cloud platform, and monetizes enterprise services.',
    eps: { years: ['2026', '2027', '2028'], values: [15.34, 17.93, 21.04] },
    peBands: { low: 32.4, mid: 33.6, high: 34.5 },
    scores: { value: 7.2, growth: 7.8, profit: 9.2, momentum: 6.5 },
    peers: [[3790, 33.2, 26, 'MSFT'], [3450, 30.3, 24, 'AAPL'], [2180, 22.5, 22, 'GOOGL'], [2470, 42.8, 20, 'AMZN']],
    segments: [
      { name: 'Productivity & Business', value: 43, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 38, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: [
      'Azure growth and AI monetization across 365/Copilot',
      'Operating leverage and best-in-class margins',
      'Diversified cash engines across multiple products'
    ],
    risks: [
      'Capex intensity and AI ROI timing challenges',
      'Regulatory scrutiny across multiple jurisdictions', 
      'Cloud competition and gaming volatility'
    ],
    news: [
      { headline: 'Microsoft AI revenue surges as Copilot adoption accelerates', source: 'Reuters', datetime: 'Just now', url: 'https://www.reuters.com/technology/' },
      { headline: 'Azure gains market share against AWS in cloud infrastructure', source: 'Bloomberg', datetime: '1 hour ago', url: 'https://www.bloomberg.com/technology/' }
    ]
  },
  'AAPL': {
    name: 'Apple Inc.',
    price: 229.87,
    marketCap: '3.45T',
    forwardPE: '30.1',
    ttmPE: 33.8,
    sector: 'Technology',
    description: 'Apple designs, manufactures and markets smartphones, personal computers, tablets, wearables and accessories, and sells related services.',
    eps: { years: ['2025', '2026', '2027'], values: [7.63, 8.45, 9.28] },
    peBands: { low: 28.5, mid: 30.1, high: 32.8 },
    scores: { value: 6.8, growth: 6.2, profit: 9.5, momentum: 7.8 },
    peers: [[3450, 30.1, 24, 'AAPL'], [3790, 33.2, 26, 'MSFT'], [2180, 22.5, 22, 'GOOGL'], [1890, 26.5, 18, 'META']],
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 7, itemStyle: { color: '#8b5cf6' } },
      { name: 'Wearables', value: 6, itemStyle: { color: '#ef4444' } }
    ],
    strengths: [
      'iPhone ecosystem lock-in with premium pricing power',
      'Services revenue growing with high margins',
      'Strong brand loyalty and hardware design'
    ],
    risks: [
      'iPhone sales cyclical and China dependency',
      'Services growth may decelerate over time',
      'Regulatory pressure on App Store practices'
    ],
    news: [
      { headline: 'Apple iPhone 16 demand shows resilience in key markets', source: 'Reuters', datetime: '30 min ago', url: 'https://www.reuters.com/technology/' },
      { headline: 'Services revenue growth accelerates with new tiers', source: 'WSJ', datetime: '2 hours ago', url: 'https://www.wsj.com/tech/' }
    ]
  },
  'AMZN': {
    name: 'Amazon.com, Inc.',
    price: 218.22,
    marketCap: '2.47T',
    forwardPE: '42.8',
    ttmPE: 47.2,
    sector: 'Consumer Discretionary',
    description: 'Amazon operates through North America, International, and Amazon Web Services (AWS) business segments.',
    eps: { years: ['2025', '2026', '2027'], values: [5.10, 6.85, 8.92] },
    peBands: { low: 38.5, mid: 42.8, high: 48.2 },
    scores: { value: 6.1, growth: 8.9, profit: 7.8, momentum: 8.2 },
    peers: [[2470, 42.8, 20, 'AMZN'], [3790, 33.2, 26, 'MSFT'], [2180, 22.5, 22, 'GOOGL'], [3450, 30.1, 24, 'AAPL']],
    segments: [
      { name: 'AWS', value: 70, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: [
      'AWS dominance in cloud infrastructure',
      'Prime ecosystem drives customer loyalty',
      'Logistics network and fulfillment capabilities'
    ],
    risks: [
      'Retail margins under competitive pressure',
      'AWS growth may decelerate as market matures',
      'Regulatory scrutiny of market dominance'
    ],
    news: [
      { headline: 'AWS revenue growth reaccelerates on AI demand', source: 'Bloomberg', datetime: '45 min ago', url: 'https://www.bloomberg.com/technology/' },
      { headline: 'Amazon logistics improvements drive margins', source: 'Reuters', datetime: '3 hours ago', url: 'https://www.reuters.com/business/' }
    ]
  },
  'NVDA': {
    name: 'NVIDIA Corporation',
    price: 143.65,
    marketCap: '3.52T',
    forwardPE: '65.8',
    ttmPE: 78.4,
    sector: 'Technology',
    description: 'NVIDIA designs graphics processing units for gaming, cryptocurrency mining, professional markets, and system-on-chip units.',
    eps: { years: ['2025', '2026', '2027'], values: [2.18, 3.45, 4.92] },
    peBands: { low: 58.2, mid: 65.8, high: 75.6 },
    scores: { value: 4.2, growth: 9.8, profit: 8.9, momentum: 9.5 },
    peers: [[3520, 65.8, 28, 'NVDA'], [650, 48.2, 16, 'AMD'], [3790, 33.2, 26, 'MSFT'], [2180, 22.5, 22, 'GOOGL']],
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Visualization', value: 2, itemStyle: { color: '#f59e0b' } },
      { name: 'Automotive', value: 1, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: [
      'AI training and inference chip dominance',
      'Data center revenue explosion from AI demand',
      'Strong moat in high-performance computing'
    ],
    risks: [
      'Extreme valuation vulnerability to AI cycles',
      'Geopolitical export restrictions affecting business',
      'Competition from custom chips by cloud providers'
    ],
    news: [
      { headline: 'NVIDIA data center revenue beats on AI demand', source: 'Reuters', datetime: '15 min ago', url: 'https://www.reuters.com/technology/' },
      { headline: 'Competition heats up as AMD launches new AI chips', source: 'WSJ', datetime: '1 hour ago', url: 'https://www.wsj.com/tech/' }
    ]
  },
  'CRM': {
    name: 'Salesforce, Inc.',
    price: 315.22,
    marketCap: '290B',
    forwardPE: '35.5',
    ttmPE: 41.8,
    sector: 'Application Software',
    description: 'Salesforce provides customer relationship management technology that brings companies and customers together.',
    eps: { years: ['2025', '2026', '2027'], values: [8.88, 10.45, 12.18] },
    peBands: { low: 32.2, mid: 35.5, high: 39.8 },
    scores: { value: 7.8, growth: 7.1, profit: 8.2, momentum: 6.4 },
    peers: [[290, 35.5, 18, 'CRM'], [3790, 33.2, 26, 'MSFT'], [380, 20.2, 14, 'ORCL'], [170, 41.0, 14, 'NOW']],
    segments: [
      { name: 'Sales Cloud', value: 24, itemStyle: { color: '#3b82f6' } },
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Marketing & Commerce', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Platform & Other', value: 30, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: [
      'CRM market leadership with strong renewal rates',
      'Multi-cloud product suite drives cross-sell',
      'Data Cloud and AI integration improving economics'
    ],
    risks: [
      'Intense competition from Microsoft and others',
      'Seat-based licensing sensitive to macro cycles',
      'Large acquisitions pressuring margins'
    ],
    news: [
      { headline: 'Salesforce AI features drive higher engagement', source: 'Bloomberg', datetime: '20 min ago', url: 'https://www.bloomberg.com/technology/' },
      { headline: 'Data Cloud adoption accelerates with enterprises', source: 'Reuters', datetime: '2 hours ago', url: 'https://www.reuters.com/technology/' }
    ]
  }
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

export async function fetchMarketData() {
  await delay(300);
  return {
    spy: { price: 5974.07, change: 0.73 },
    nasdaq: { price: 19764.89, change: 0.98 },
    btc: { price: 94852, change: -2.14 }
  };
}

export async function fetchNews() {
  await delay(200);
  return [
    {
      headline: 'Fed Minutes Suggest Slower Rate Cuts in 2025',
      summary: 'Federal Reserve officials indicated a more cautious approach to monetary easing amid persistent inflation concerns.',
      source: 'Reuters',
      datetime: '2 hours ago',
      url: 'https://www.reuters.com/markets/'
    },
    {
      headline: 'Tech Giants Lead Market Rally on AI Optimism',
      summary: 'Major technology stocks pushed indices higher as investors bet on continued AI-driven growth.',
      source: 'Bloomberg',
      datetime: '3 hours ago',
      url: 'https://www.bloomberg.com/technology/'
    },
    {
      headline: 'China Economic Data Shows Mixed Recovery Signals',
      summary: 'Latest indicators from China point to uneven recovery as manufacturing rebounds while property remains weak.',
      source: 'WSJ',
      datetime: '4 hours ago',
      url: 'https://www.wsj.com/world/china/'
    }
  ];
}
