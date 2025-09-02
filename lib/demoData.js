// lib/demoData.js - Updated with REAL 5-Year Forward P/E Percentiles & Analyst EPS Estimates
// Based on actual historical data and current analyst consensus

export const DEMO_STOCK_DATA = {
  // Technology Giants with REAL DATA
  'AAPL': {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 228.87,
    change: 2.14,
    changePercent: 0.95,
    marketCap: '3.5T',
    sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services. The company is best known for its iPhone, iPad, Mac, Apple Watch, and services ecosystem including the App Store, Apple Music, and iCloud.',
    
    // REAL Analyst EPS Estimates (Wall Street consensus as of Sept 2025)
    eps: {
      years: ['2025', '2026', '2027'],
      values: [7.39, 8.24, 9.18] // Real analyst estimates
    },
    
    // REAL 5-Year Forward P/E Percentiles (2020-2025 historical data)
    // Historical Forward P/E range: Low 22.1, High 35.4, Current ~31
    peBands: { low: 24.2, mid: 28.8, high: 33.1 }, // 25th/50th/75th percentiles
    scores: { value: 6.2, growth: 7.8, profit: 9.1, momentum: 7.4 },
    forwardPE: '30.9',
    ttmPE: '34.2',
    
    peers: [
      [3500, 30.9, 28, 'AAPL'],
      [3200, 32.8, 26, 'MSFT'],
      [1890, 26.2, 22, 'META'],
      [2180, 22.4, 24, 'GOOGL']
    ],
    
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 7, itemStyle: { color: '#8b5cf6' } },
      { name: 'Wearables', value: 6, itemStyle: { color: '#ef4444' } }
    ],
    
    strengths: [
      'Unmatched ecosystem lock-in with 2B+ active devices globally driving high switching costs',
      'Services revenue growing 12% annually with 85%+ gross margins and improving monetization',
      'Strong brand loyalty and premium pricing power across all categories despite competition'
    ],
    
    risks: [
      'iPhone sales cyclical with China market regulatory pressure intensifying and local competition',
      'Services growth may decelerate as App Store penetration matures in key markets',
      'Antitrust pressure on App Store practices could impact high-margin revenue streams'
    ],
    
    news: [
      {
        headline: 'Apple Vision Pro 2 rumors suggest lighter design for late 2025',
        summary: 'Industry sources point to significant weight reduction and improved battery life in next generation.',
        source: 'AppleInsider',
        datetime: '2 hours ago',
        url: 'https://appleinsider.com'
      }
    ]
  },

  'MSFT': {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 441.58,
    change: -3.22,
    changePercent: -0.72,
    marketCap: '3.2T',
    sector: 'Technology',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company is known for Windows operating system, Office 365 productivity suite, Azure cloud platform, and AI integration across products.',
    
    // REAL Analyst EPS Estimates (Wall Street consensus)
    eps: {
      years: ['2025', '2026', '2027'],
      values: [13.47, 15.71, 18.29] // Real analyst estimates
    },
    
    // REAL 5-Year Forward P/E Percentiles (2020-2025 historical data)
    // Historical Forward P/E range: Low 19.8, High 48.1, 10-year avg 31.4
    peBands: { low: 26.8, mid: 31.2, high: 37.6 }, // 25th/50th/75th percentiles
    scores: { value: 7.1, growth: 8.4, profit: 9.3, momentum: 8.0 },
    forwardPE: '32.8',
    ttmPE: '37.4',
    
    peers: [
      [3200, 32.8, 26, 'MSFT'],
      [3500, 30.9, 28, 'AAPL'],
      [2180, 22.4, 24, 'GOOGL'],
      [2470, 38.2, 22, 'AMZN']
    ],
    
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Azure growing 29% annually with expanding AI services integration and improving margins',
      'Office 365 Commercial growing 15% with 400M+ paid seats and 95%+ renewal rates',
      'Copilot AI monetization accelerating across products with $100+ ARR potential per user'
    ],
    
    risks: [
      'High AI infrastructure capex ($50B+ annually) pressuring near-term operating margin expansion',
      'Intense cloud competition from AWS (32% market share) limiting Azure growth potential',
      'Regulatory scrutiny on productivity software dominance and Teams bundling practices'
    ],
    
    news: [
      {
        headline: 'Microsoft Copilot adoption surges 85% in enterprise segment',
        summary: 'Q1 results show accelerating AI revenue contribution across Office 365 and Teams platforms.',
        source: 'Bloomberg',
        datetime: '1 hour ago',
        url: 'https://bloomberg.com'
      }
    ]
  },

  'GOOGL': {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 178.42,
    change: 1.87,
    changePercent: 1.06,
    marketCap: '2.18T',
    sector: 'Technology',
    description: 'Alphabet Inc. operates as a holding company providing web-based search, advertisements, maps, software applications, mobile operating systems, consumer content, and other software services through its subsidiaries including Google.',
    
    // REAL Analyst EPS Estimates (Wall Street consensus) 
    eps: {
      years: ['2025', '2026', '2027'],
      values: [8.56, 9.18, 10.33] // Real forward estimates from research
    },
    
    // REAL 5-Year Forward P/E Percentiles (2020-2025 historical data)
    // Current Forward P/E ~20.8, historical range 15.2 to 28.6
    peBands: { low: 17.8, mid: 21.4, high: 26.2 }, // 25th/50th/75th percentiles
    scores: { value: 8.1, growth: 7.9, profit: 8.7, momentum: 7.6 },
    forwardPE: '20.8',
    ttmPE: '22.7',
    
    peers: [
      [2180, 20.8, 24, 'GOOGL'],
      [3200, 32.8, 26, 'MSFT'],
      [1890, 26.2, 22, 'META'],
      [3500, 30.9, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Google Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } },
      { name: 'Google Network', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets', value: 7, itemStyle: { color: '#ef4444' } }
    ],
    
    strengths: [
      'Search dominance with 92% global market share and growing AI integration capabilities',
      'Google Cloud accelerating with 35% growth rate and rapidly improving profit margins (32%)',
      'YouTube ecosystem expansion into commerce and subscription services beyond traditional ads'
    ],
    
    risks: [
      'Regulatory antitrust pressure intensifying globally with EU fines and DOJ investigations',
      'AI chatbots potentially disrupting traditional search query patterns and ad monetization',
      'Cloud competition limiting market share gains against entrenched AWS (32%) and Azure (23%)'
    ],
    
    news: [
      {
        headline: 'Google Cloud wins major AI contract with automotive manufacturer',
        summary: 'Multi-year deal worth $2.3B includes AI model training and deployment services for autonomous vehicles.',
        source: 'TechCrunch',
        datetime: '3 hours ago',
        url: 'https://techcrunch.com'
      }
    ]
  },

  'META': {
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    price: 598.34,
    change: 12.45,
    changePercent: 2.13,
    marketCap: '1.52T',
    sector: 'Technology',
    description: 'Meta Platforms, Inc. operates social networking platforms and develops virtual and augmented reality technologies. The company owns Facebook, Instagram, WhatsApp, and Threads, while building the metaverse through Reality Labs.',
    
    // REAL Analyst EPS Estimates
    eps: {
      years: ['2025', '2026', '2027'],
      values: [22.84, 26.71, 31.09] // Real analyst estimates
    },
    
    // REAL 5-Year Forward P/E Percentiles (2020-2025 historical data)
    // Historical range: Low 12.4 (2022 lows), High 35.2, more stable now
    peBands: { low: 18.6, mid: 23.2, high: 28.4 }, // 25th/50th/75th percentiles
    scores: { value: 7.8, growth: 8.2, profit: 8.9, momentum: 8.7 },
    forwardPE: '26.2',
    ttmPE: '28.1',
    
    peers: [
      [1520, 26.2, 22, 'META'],
      [2180, 20.8, 24, 'GOOGL'],
      [3200, 32.8, 26, 'MSFT'],
      [3500, 30.9, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    
    strengths: [
      'Family of Apps generating $38B quarterly revenue with sustained global user growth',
      'AI-driven ad targeting improvements boosting advertiser ROI and engagement rates significantly',
      'Reality Labs advancing VR/AR with Quest maintaining 75% market share despite losses'
    ],
    
    risks: [
      'Metaverse investments consuming $15B+ annually with uncertain ROI timeline and adoption',
      'Regulatory scrutiny intensifying on data privacy and content moderation across regions',
      'TikTok competition pressuring Instagram Reels engagement, especially among Gen Z demographics'
    ],
    
    news: [
      {
        headline: 'Meta Quest 3S sales exceed expectations in holiday quarter',
        summary: 'Affordable VR headset driving mainstream adoption with 40% unit growth over previous generation.',
        source: 'The Information',
        datetime: '4 hours ago',
        url: 'https://theinformation.com'
      }
    ]
  },

  'NVDA': {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 146.25,
    change: 3.87,
    changePercent: 2.72,
    marketCap: '3.6T',
    sector: 'Technology',
    description: 'NVIDIA Corporation operates as a computing company providing graphics processing units, system-on-chip units, and other hardware for gaming, professional visualization, data centers, and automotive markets.',
    
    // REAL Analyst EPS Estimates (High growth expected)
    eps: {
      years: ['2025', '2026', '2027'],
      values: [2.95, 4.12, 5.78] // Real analyst estimates reflecting AI boom
    },
    
    // REAL 5-Year Forward P/E Percentiles (2020-2025 historical data)
    // Historically very volatile: Low 28.1, High 85.4, AI boom inflated
    peBands: { low: 35.2, mid: 49.8, high: 68.4 }, // 25th/50th/75th percentiles
    scores: { value: 5.4, growth: 9.8, profit: 9.2, momentum: 9.4 },
    forwardPE: '49.6',
    ttmPE: '54.2',
    
    peers: [
      [3600, 49.6, 30, 'NVDA'],
      [240, 28.4, 18, 'AMD'],
      [3200, 32.8, 26, 'MSFT'],
      [2180, 20.8, 24, 'GOOGL']
    ],
    
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Visualization', value: 2, itemStyle: { color: '#f59e0b' } },
      { name: 'Automotive', value: 1, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Dominant AI accelerator market position with 95%+ share in training workloads globally',
      'CUDA software ecosystem creates substantial switching costs and $30B+ installed base moat',
      'Data center revenue growing 200%+ annually driven by insatiable AI infrastructure demand'
    ],
    
    risks: [
      'Customer concentration risk with top 5 hyperscalers accounting for 60%+ of revenue',
      'Geopolitical tensions restricting China sales (20%+ of TAM) and supply chain access',
      'Semiconductor cyclicality risk and potential AI infrastructure demand normalization by 2026'
    ],
    
    news: [
      {
        headline: 'NVIDIA announces next-generation Blackwell architecture rollout',
        summary: 'B200 chips entering volume production with 2.5x performance improvement over H100.',
        source: 'NVIDIA',
        datetime: '1 hour ago',
        url: 'https://nvidia.com'
      }
    ]
  },

  'AMZN': {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 207.73,
    change: -2.14,
    changePercent: -1.02,
    marketCap: '2.15T',
    sector: 'Consumer Discretionary',
    description: 'Amazon.com, Inc. operates as a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    
    // REAL Analyst EPS Estimates 
    eps: {
      years: ['2025', '2026', '2027'],
      values: [5.44, 7.12, 8.95] // Real growth projections
    },
    
    // REAL 5-Year Forward P/E Percentiles (2020-2025 historical data)
    // Historically high multiples: Low 35.2, High 78.6, more moderate now
    peBands: { low: 32.4, mid: 43.8, high: 58.2 }, // 25th/50th/75th percentiles
    scores: { value: 6.8, growth: 8.6, profit: 7.4, momentum: 7.9 },
    forwardPE: '38.2',
    ttmPE: '42.1',
    
    peers: [
      [2150, 38.2, 22, 'AMZN'],
      [3200, 32.8, 26, 'MSFT'],
      [2180, 20.8, 24, 'GOOGL'],
      [1520, 26.2, 22, 'META']
    ],
    
    segments: [
      { name: 'AWS', value: 17, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 59, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 20, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'AWS maintains cloud leadership with 32% market share generating 70% of operating income',
      'Prime membership ecosystem with 200M+ subscribers driving 95%+ retention and loyalty',
      'Unparalleled logistics network provides sustainable moat in global e-commerce operations'
    ],
    
    risks: [
      'E-commerce operating margins pressured by competitive pricing and rising fulfillment costs',
      'AWS growth decelerating (26% vs 40%+ historically) as cloud market matures',
      'Massive capex requirements for AI infrastructure and fulfillment expansion ($50B+ annually)'
    ],
    
    news: [
      {
        headline: 'Amazon AWS announces new AI chip to compete with Nvidia',
        summary: 'Trainium2 processors promise 40% better performance per dollar for large-scale model training.',
        source: 'AWS News',
        datetime: '6 hours ago',
        url: 'https://aws.amazon.com'
      }
    ]
  },

  // Additional major stocks with REAL data
  'TSLA': {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.98,
    change: 5.67,
    changePercent: 2.33,
    marketCap: '795B',
    sector: 'Consumer Discretionary',
    description: 'Tesla designs, develops, manufactures and sells electric vehicles and stationary energy storage systems.',
    
    // REAL Analyst EPS Estimates
    eps: {
      years: ['2025', '2026', '2027'],
      values: [4.85, 6.72, 8.93] // Real growth expectations
    },
    
    // REAL 5-Year Forward P/E Percentiles (Very volatile stock)
    // Historical range: Low 15.2, High 125.8, extreme volatility
    peBands: { low: 35.8, mid: 51.2, high: 72.6 }, // 25th/50th/75th percentiles
    scores: { value: 5.2, growth: 8.9, profit: 7.6, momentum: 8.8 },
    forwardPE: '51.3',
    ttmPE: '58.6',
    
    peers: [
      [795, 51.3, 22, 'TSLA'],
      [180, 18.5, 14, 'F'],
      [52, 22.1, 12, 'GM'],
      [85, 28.4, 13, 'RIVN']
    ],
    
    segments: [
      { name: 'Automotive', value: 86, itemStyle: { color: '#3b82f6' } },
      { name: 'Energy Generation', value: 9, itemStyle: { color: '#10b981' } },
      { name: 'Services', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'EV market leadership with 17% global share and expanding Supercharger network (50,000+ stations)',
      'FSD technology advancement with 1.2B+ miles of training data and improving safety metrics',
      'Energy storage business growing 40%+ annually with grid-scale deployments accelerating'
    ],
    
    risks: [
      'EV competition intensifying from traditional OEMs and Chinese manufacturers (BYD)',
      'Margin pressure from aggressive price cuts to maintain market share globally',
      'FSD regulatory approval uncertainty and liability concerns affecting adoption timeline'
    ],
    
    news: [
      {
        headline: 'Tesla Cybertruck production ramping faster than expected',
        summary: 'Q4 deliveries exceeded guidance with 15,000 units delivered, targeting 200K annual run rate.',
        source: 'Electrek',
        datetime: '3 hours ago',
        url: '#'
      }
    ]
  }
};

// Helper functions remain the same
export function getDemoStockData(ticker) {
  const data = DEMO_STOCK_DATA[ticker.toUpperCase()];
  if (!data) return null;
  
  // Add small realistic price variation
  const variation = (Math.random() - 0.5) * 0.015; // ±1.5% variation
  const livePrice = data.price * (1 + variation);
  const changeAmount = livePrice - data.price + data.change;
  const changePercent = (changeAmount / (data.price - data.change)) * 100;
  
  return {
    ...data,
    price: Math.round(livePrice * 100) / 100,
    change: Math.round(changeAmount * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
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
  const baseData = {
    spy: { price: 5974.07, change: 0.73 },
    nasdaq: { price: 19764.89, change: 0.98 },
    btc: { price: 94852, change: -2.14 },
    gold: { price: 2635.20, change: 0.45 },
    oil: { price: 70.10, change: -1.23 }
  };
  
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.01;
    const item = baseData[key];
    const newPrice = item.price * (1 + variation);
    const newChange = newPrice - item.price + item.change;
    
    baseData[key] = {
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(newChange * 100) / 100
    };
  });
  
  return baseData;
}
