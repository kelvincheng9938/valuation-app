// lib/demoData.js - Updated with your financial table data + all required fields

export const DEMO_STOCK_DATA = {
  'AAPL': {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 229.72,
    change: 5.08,
    changePercent: 2.59,
    marketCap: '3.5T',
    sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services. The company is best known for its iPhone, iPad, Mac, Apple Watch, and services ecosystem including the App Store, Apple Music, and iCloud.',
    
    // Updated with your table data
    eps: {
      years: ['2025', '2026', '2027'],
      values: [7.362, 7.864, 8.728]
    },
    
    // P/E bands from your table (p25, p50, p75)
    peBands: { 
      low: 26.86, 
      mid: 28.88, 
      high: 32.67 
    },
    
    // Calculated metrics
    forwardPE: (229.72 / 7.362).toFixed(1), // 31.2
    ttmPE: '34.2',
    
    // Quality scores (keep existing for demo)
    scores: { value: 7.9, growth: 7.1, profit: 9.2, momentum: 7.8 },
    
    // Peers data (required for chart)
    peers: [
      [3500, 31.2, 28, 'AAPL'],
      [3200, 32.8, 26, 'MSFT'], 
      [1890, 26.2, 22, 'META'],
      [2180, 22.4, 24, 'GOOGL']
    ],
    
    // Revenue segments (required for pie chart)
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 7, itemStyle: { color: '#8b5cf6' } },
      { name: 'Wearables', value: 6, itemStyle: { color: '#ef4444' } }
    ],
    
    // Investment strengths (required)
    strengths: [
      'Unmatched ecosystem lock-in with 2B+ active devices globally',
      'Services revenue growing 12% annually with 85%+ gross margins',
      'Strong brand loyalty and premium pricing power across all categories'
    ],
    
    // Investment risks (required)
    risks: [
      'iPhone sales cyclical with China market regulatory pressure intensifying',
      'Services growth may decelerate as App Store penetration matures',
      'Antitrust pressure on App Store practices could impact high-margin revenue'
    ],
    
    // Company news (required)
    news: [
      {
        headline: 'Apple Vision Pro 2 rumors suggest lighter design for late 2025',
        summary: 'Industry sources point to significant weight reduction and improved battery life.',
        source: 'AppleInsider',
        datetime: '2 hours ago',
        url: 'https://appleinsider.com'
      },
      {
        headline: 'iPhone 16 sales outpacing iPhone 15 in key Asian markets',
        summary: 'Strong demand for AI-powered features driving upgrade cycle acceleration.',
        source: 'Reuters', 
        datetime: '5 hours ago',
        url: 'https://reuters.com'
      }
    ]
  },

  'MSFT': {
    ticker: 'MSFT',
    name: 'Microsoft Corporation', 
    price: 505.12,
    change: -8.22,
    changePercent: -1.60,
    marketCap: '3.2T',
    sector: 'Technology',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company is known for Windows operating system, Office 365 productivity suite, Azure cloud platform, and AI integration across products.',
    
    // Updated with your table data
    eps: {
      years: ['2025', '2026', '2027'],
      values: [15.541, 18.239, 21.378]
    },
    
    peBands: { 
      low: 31.58, 
      mid: 34.11, 
      high: 35.51 
    },
    
    forwardPE: (505.12 / 15.541).toFixed(1), // 32.5
    ttmPE: '35.2',
    scores: { value: 7.1, growth: 8.4, profit: 9.3, momentum: 8.0 },
    
    peers: [
      [3200, 32.5, 26, 'MSFT'],
      [3500, 31.2, 28, 'AAPL'],
      [2180, 22.4, 24, 'GOOGL'],
      [2470, 38.2, 22, 'AMZN']
    ],
    
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Azure growing 29% annually with expanding AI services integration',
      'Office 365 Commercial growing 15% with 400M+ paid seats',  
      'Copilot AI monetization accelerating across all product lines'
    ],
    
    risks: [
      'High AI infrastructure capex pressuring near-term margins',
      'Intense cloud competition from AWS and Google Cloud Platform',
      'Regulatory scrutiny on dominant positions in productivity software'
    ],
    
    news: [
      {
        headline: 'Microsoft Copilot adoption surges 85% in enterprise segment',
        summary: 'Q1 results show accelerating AI revenue contribution across Office 365.',
        source: 'Bloomberg',
        datetime: '1 hour ago', 
        url: 'https://bloomberg.com'
      }
    ]
  },

  'GOOGL': {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 211.35,
    change: 1.87,
    changePercent: 0.89,
    marketCap: '2.18T',
    sector: 'Technology',
    description: 'Alphabet Inc. operates as a holding company providing web-based search, advertisements, maps, software applications, mobile operating systems, consumer content, and other software services through its subsidiaries including Google.',
    
    eps: {
      years: ['2025', '2026', '2027'], 
      values: [10.535, 11.357, 12.982]
    },
    
    peBands: { 
      low: 21.81, 
      mid: 24.25, 
      high: 29.12 
    },
    
    forwardPE: (211.35 / 10.535).toFixed(1), // 20.1
    ttmPE: '22.4',
    scores: { value: 8.1, growth: 7.9, profit: 8.7, momentum: 7.6 },
    
    peers: [
      [2180, 20.1, 24, 'GOOGL'],
      [3200, 32.5, 26, 'MSFT'],
      [1890, 26.2, 22, 'META'],
      [3500, 31.2, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Google Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } },
      { name: 'Google Network', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets', value: 7, itemStyle: { color: '#ef4444' } }
    ],
    
    strengths: [
      'Search dominance with 92% global market share and AI integration',
      'Google Cloud accelerating with 35% growth rate and improving margins',
      'YouTube ecosystem expansion into commerce beyond traditional ads'
    ],
    
    risks: [
      'Regulatory antitrust pressure intensifying globally on search practices',
      'AI chatbots potentially disrupting traditional search patterns',
      'Cloud competition limiting market share gains against AWS/Azure'
    ],
    
    news: [
      {
        headline: 'Google Cloud wins major AI contract with automotive manufacturer',
        summary: 'Multi-year deal worth $2.3B includes AI model training for autonomous vehicles.',
        source: 'TechCrunch',
        datetime: '3 hours ago',
        url: 'https://techcrunch.com'
      }
    ]
  },

  'META': {
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    price: 735.11,
    change: 12.45,
    changePercent: 1.72,
    marketCap: '1.52T', 
    sector: 'Technology',
    description: 'Meta Platforms, Inc. operates social networking platforms and develops virtual and augmented reality technologies. The company owns Facebook, Instagram, WhatsApp, and Threads, while building the metaverse through Reality Labs.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [33.214, 35.276, 40.935]
    },
    
    peBands: { 
      low: 19.68, 
      mid: 24.08, 
      high: 26.05 
    },
    
    forwardPE: (735.11 / 33.214).toFixed(1), // 22.1
    ttmPE: '26.2',
    scores: { value: 7.8, growth: 8.2, profit: 8.9, momentum: 8.7 },
    
    peers: [
      [1520, 22.1, 22, 'META'],
      [2180, 20.1, 24, 'GOOGL'], 
      [3200, 32.5, 26, 'MSFT'],
      [3500, 31.2, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    
    strengths: [
      'Family of Apps generating $38B quarterly revenue with strong user growth',
      'AI-driven ad targeting improvements boosting advertiser ROI significantly',
      'Reality Labs advancing VR/AR with Quest platform market leadership'
    ],
    
    risks: [
      'Metaverse investments consuming $15B+ annually with uncertain timeline',
      'Regulatory scrutiny on data privacy and content moderation intensifying',
      'TikTok competition pressuring Instagram Reels engagement'
    ],
    
    news: [
      {
        headline: 'Meta Quest 3S sales exceed expectations in holiday quarter',
        summary: 'Affordable VR headset driving mainstream adoption with 40% unit growth.',
        source: 'The Information',
        datetime: '4 hours ago',
        url: 'https://theinformation.com'
      }
    ]
  }

  // Add other tickers following the same pattern...
  // You can add NFLX, AMZN, TSLA, NVDA etc. using the same structure
};

// Helper functions remain the same
export function getDemoStockData(ticker) {
  const data = DEMO_STOCK_DATA[ticker.toUpperCase()];
  if (!data) return null;
  
  return {
    ...data,
    dataQuality: {
      quote: 'demo',
      estimates: 'demo', 
      peHistory: 'demo',
      peers: 'demo',
      segments: 'demo',
      news: 'demo'
    },
    lastUpdated: new Date().toISOString()
  };
}

export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA).sort();
}

export function getDemoMarketData() {
  return {
    spy: { price: 5974.07, change: 0.73 },
    nasdaq: { price: 19764.89, change: 0.98 },
    btc: { price: 94852, change: -2.14 },
    gold: { price: 2635.20, change: 0.45 },
    oil: { price: 70.10, change: -1.23 }
  };
}
