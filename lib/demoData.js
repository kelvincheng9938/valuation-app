// lib/demoData.js - Complete Demo Dataset for 25 Major Stocks
// This will be replaced with real API data when you go live

export const DEMO_STOCK_DATA = {
  // Technology Giants
  'AAPL': {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 228.87,
    change: 2.14,
    changePercent: 0.95,
    marketCap: '3.5T',
    sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services. The company is best known for its iPhone, iPad, Mac, Apple Watch, and services ecosystem including the App Store, Apple Music, and iCloud.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [7.25, 8.15, 9.08]
    },
    
    peBands: { low: 24.0, mid: 28.5, high: 33.0 },
    scores: { value: 6.2, growth: 7.8, profit: 9.1, momentum: 7.4 },
    forwardPE: '31.6',
    ttmPE: '34.8',
    
    peers: [
      [3500, 31.6, 28, 'AAPL'],
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
      'Unmatched ecosystem lock-in with 2B+ active devices globally',
      'Services revenue growing 12% annually with 85%+ gross margins',
      'Strong brand loyalty and premium pricing power across all categories'
    ],
    
    risks: [
      'iPhone sales cyclical with China market regulatory pressure intensifying',
      'Services growth may decelerate as App Store penetration matures',
      'Antitrust pressure on App Store practices could impact high-margin revenue'
    ],
    
    news: [
      {
        headline: 'Apple Vision Pro 2 rumors suggest lighter design for late 2025',
        summary: 'Industry sources point to significant weight reduction and improved battery life in next generation.',
        source: 'AppleInsider',
        datetime: '2 hours ago',
        url: 'https://appleinsider.com'
      },
      {
        headline: 'iPhone 16 sales outpacing iPhone 15 in key Asian markets',
        summary: 'Strong demand for AI-powered features driving upgrade cycle acceleration beyond expectations.',
        source: 'Reuters',
        datetime: '5 hours ago',
        url: 'https://reuters.com'
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
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [13.45, 15.68, 18.22]
    },
    
    peBands: { low: 26.0, mid: 30.5, high: 36.0 },
    scores: { value: 7.1, growth: 8.4, profit: 9.3, momentum: 8.0 },
    forwardPE: '32.8',
    ttmPE: '35.2',
    
    peers: [
      [3200, 32.8, 26, 'MSFT'],
      [3500, 31.6, 28, 'AAPL'],
      [2180, 22.4, 24, 'GOOGL'],
      [2470, 38.2, 22, 'AMZN']
    ],
    
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Azure growing 29% annually with expanding AI services integration and margin improvement',
      'Office 365 Commercial growing 15% with 400M+ paid seats and strong retention',
      'Copilot AI monetization accelerating across all product lines with $100+ ARR per user'
    ],
    
    risks: [
      'High AI infrastructure capex pressuring near-term operating margin expansion potential',
      'Intense cloud competition from AWS and Google Cloud Platform limiting market share gains',
      'Regulatory scrutiny on dominant positions in productivity software and cloud services'
    ],
    
    news: [
      {
        headline: 'Microsoft Copilot adoption surges 85% in enterprise segment',
        summary: 'Q1 results show accelerating AI revenue contribution across Office 365 and Teams platforms.',
        source: 'Bloomberg',
        datetime: '1 hour ago',
        url: 'https://bloomberg.com'
      },
      {
        headline: 'Azure OpenAI Service sees 10x usage growth from developers',
        summary: 'Strong demand for GPT-4 and custom model training driving cloud revenue acceleration.',
        source: 'TechCrunch',
        datetime: '4 hours ago',
        url: 'https://techcrunch.com'
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
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [7.95, 9.12, 10.45]
    },
    
    peBands: { low: 18.5, mid: 22.8, high: 27.2 },
    scores: { value: 8.1, growth: 7.9, profit: 8.7, momentum: 7.6 },
    forwardPE: '22.4',
    ttmPE: '24.8',
    
    peers: [
      [2180, 22.4, 24, 'GOOGL'],
      [3200, 32.8, 26, 'MSFT'],
      [1890, 26.2, 22, 'META'],
      [3500, 31.6, 28, 'AAPL']
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
      'Google Cloud accelerating with 35% growth rate and rapidly improving profit margins',
      'YouTube ecosystem expansion into commerce and subscription services beyond traditional ads'
    ],
    
    risks: [
      'Regulatory antitrust pressure intensifying globally on search practices and market dominance',
      'AI chatbots potentially disrupting traditional search query patterns and ad monetization',
      'Cloud competition limiting market share gains against entrenched AWS and Microsoft Azure'
    ],
    
    news: [
      {
        headline: 'Google Cloud wins major AI contract with automotive manufacturer',
        summary: 'Multi-year deal worth $2.3B includes AI model training and deployment services for autonomous vehicles.',
        source: 'TechCrunch',
        datetime: '3 hours ago',
        url: 'https://techcrunch.com'
      },
      {
        headline: 'Alphabet reports Waymo expansion to three new cities',
        summary: 'Autonomous vehicle service launching in Austin, Atlanta, and Miami by end of 2025.',
        source: 'The Verge',
        datetime: '7 hours ago',
        url: 'https://theverge.com'
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
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [22.85, 26.74, 31.12]
    },
    
    peBands: { low: 20.0, mid: 24.5, high: 29.0 },
    scores: { value: 7.8, growth: 8.2, profit: 8.9, momentum: 8.7 },
    forwardPE: '26.2',
    ttmPE: '28.4',
    
    peers: [
      [1520, 26.2, 22, 'META'],
      [2180, 22.4, 24, 'GOOGL'],
      [3200, 32.8, 26, 'MSFT'],
      [3500, 31.6, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    
    strengths: [
      'Family of Apps generating $38B quarterly revenue with sustained strong user growth globally',
      'AI-driven ad targeting improvements significantly boosting advertiser ROI and engagement rates',
      'Reality Labs advancing VR/AR technology with Quest platform maintaining market leadership position'
    ],
    
    risks: [
      'Metaverse investments consuming $15B+ annually with uncertain ROI timeline and adoption challenges',
      'Regulatory scrutiny intensifying on data privacy practices and content moderation policies',
      'TikTok competition pressuring Instagram Reels and Facebook user engagement, especially among younger demographics'
    ],
    
    news: [
      {
        headline: 'Meta Quest 3S sales exceed expectations in holiday quarter',
        summary: 'Affordable VR headset driving mainstream adoption with 40% unit growth over previous generation.',
        source: 'The Information',
        datetime: '4 hours ago',
        url: 'https://theinformation.com'
      },
      {
        headline: 'Instagram Threads reaches 200 million monthly active users',
        summary: 'Twitter alternative showing sustained growth with improved engagement metrics year-over-year.',
        source: 'Social Media Today',
        datetime: '6 hours ago',
        url: 'https://socialmediatoday.com'
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
    description: 'Amazon.com, Inc. operates as a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence. The company operates through North America, International, and Amazon Web Services segments.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [5.44, 7.12, 8.95]
    },
    
    peBands: { low: 32.0, mid: 38.5, high: 46.0 },
    scores: { value: 6.8, growth: 8.6, profit: 7.4, momentum: 7.9 },
    forwardPE: '38.2',
    ttmPE: '42.1',
    
    peers: [
      [2150, 38.2, 22, 'AMZN'],
      [3200, 32.8, 26, 'MSFT'],
      [2180, 22.4, 24, 'GOOGL'],
      [1520, 26.2, 22, 'META']
    ],
    
    segments: [
      { name: 'AWS', value: 17, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 59, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 20, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'AWS maintains cloud infrastructure leadership generating 70% of total operating income',
      'Prime membership ecosystem driving customer loyalty with 200M+ global subscribers and growing',
      'Unparalleled logistics network provides sustainable competitive moat in global e-commerce operations'
    ],
    
    risks: [
      'E-commerce operating margins pressured by competitive pricing dynamics and rising labor costs',
      'AWS growth rate decelerating as cloud infrastructure market matures and competition intensifies',
      'Massive capex requirements for AI infrastructure buildout and fulfillment center expansion'
    ],
    
    news: [
      {
        headline: 'Amazon AWS announces new AI chip to compete with Nvidia',
        summary: 'Trainium2 processors promise 40% better performance per dollar for large-scale model training.',
        source: 'AWS News',
        datetime: '6 hours ago',
        url: 'https://aws.amazon.com'
      },
      {
        headline: 'Prime Video ad-supported tier drives 25% revenue increase',
        summary: 'Advertising integration showing strong advertiser demand and subscriber retention rates.',
        source: 'Variety',
        datetime: '8 hours ago',
        url: 'https://variety.com'
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
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [2.95, 4.12, 5.78]
    },
    
    peBands: { low: 35.0, mid: 49.5, high: 68.0 },
    scores: { value: 5.4, growth: 9.8, profit: 9.2, momentum: 9.4 },
    forwardPE: '49.6',
    ttmPE: '54.2',
    
    peers: [
      [3600, 49.6, 30, 'NVDA'],
      [240, 28.4, 18, 'AMD'],
      [3200, 32.8, 26, 'MSFT'],
      [2180, 22.4, 24, 'GOOGL']
    ],
    
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Visualization', value: 2, itemStyle: { color: '#f59e0b' } },
      { name: 'Automotive', value: 1, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Dominant AI accelerator market position with 95%+ market share in training workloads',
      'CUDA software ecosystem creates substantial switching costs and competitive moats for customers',
      'Data center revenue growing 200%+ annually driven by insatiable AI infrastructure demand'
    ],
    
    risks: [
      'Customer concentration risk with top 5 hyperscale customers accounting for 60%+ of total revenue',
      'Geopolitical tensions restricting China sales affecting 20%+ of total addressable market opportunity',
      'Semiconductor industry cyclicality and potential AI infrastructure demand normalization over time'
    ],
    
    news: [
      {
        headline: 'NVIDIA announces next-generation Blackwell architecture rollout',
        summary: 'B200 chips entering volume production with 2.5x performance improvement over current H100 generation.',
        source: 'NVIDIA',
        datetime: '1 hour ago',
        url: 'https://nvidia.com'
      },
      {
        headline: 'Major cloud providers increase NVIDIA chip orders for 2025',
        summary: 'AWS, Microsoft, and Google expanding AI infrastructure with multi-billion dollar commitments.',
        source: 'Reuters',
        datetime: '3 hours ago',
        url: 'https://reuters.com'
      }
    ]
  },

  // Additional major stocks (abbreviated for space)
  'AMD': {
    ticker: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    price: 121.33,
    change: -1.87,
    changePercent: -1.52,
    marketCap: '196B',
    sector: 'Technology',
    description: 'Advanced Micro Devices designs and manufactures microprocessors, graphics processing units, and related technologies for business and consumer markets.',
    eps: { years: ['2025', '2026', '2027'], values: [4.27, 5.18, 6.44] },
    peBands: { low: 20.0, mid: 28.5, high: 38.0 },
    scores: { value: 7.2, growth: 8.1, profit: 7.8, momentum: 6.9 },
    forwardPE: '28.4', ttmPE: '31.7',
    peers: [[196, 28.4, 16, 'AMD'], [3600, 49.6, 30, 'NVDA']],
    segments: [
      { name: 'Data Center & AI', value: 48, itemStyle: { color: '#3b82f6' } },
      { name: 'Client', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Gaming', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Embedded', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Data center market share gains with EPYC processors', 'Competitive AI accelerator roadmap', 'Diversified semiconductor portfolio'],
    risks: ['Limited AI GPU market share vs NVIDIA', 'PC market cyclicality', 'Intel competition'],
    news: [{ headline: 'AMD MI300X gains cloud adoption', summary: 'AI inference workloads growing', source: 'Tech News', datetime: '5 hours ago', url: '#' }]
  },

  'TSLA': {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.98,
    change: 5.67,
    changePercent: 2.33,
    marketCap: '795B',
    sector: 'Consumer Discretionary',
    description: 'Tesla designs, develops, manufactures and sells electric vehicles and stationary energy storage systems, and offers services related to its products.',
    eps: { years: ['2025', '2026', '2027'], values: [4.85, 6.72, 8.93] },
    peBands: { low: 35.0, mid: 51.0, high: 72.0 },
    scores: { value: 5.2, growth: 8.9, profit: 7.6, momentum: 8.8 },
    forwardPE: '51.3', ttmPE: '58.6',
    peers: [[795, 51.3, 22, 'TSLA'], [180, 18.5, 14, 'F']],
    segments: [
      { name: 'Automotive', value: 86, itemStyle: { color: '#3b82f6' } },
      { name: 'Energy Generation', value: 9, itemStyle: { color: '#10b981' } },
      { name: 'Services', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['EV market leadership position', 'FSD technology advancement', 'Supercharger network expansion'],
    risks: ['EV competition intensifying', 'Margin pressure from price cuts', 'FSD regulatory uncertainty'],
    news: [{ headline: 'Tesla Cybertruck production ramping', summary: 'Q4 deliveries exceeded guidance', source: 'Electrek', datetime: '3 hours ago', url: '#' }]
  },

  'NFLX': {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    price: 918.54,
    change: 8.23,
    changePercent: 0.90,
    marketCap: '394B',
    sector: 'Communication Services',
    description: 'Netflix is a streaming entertainment service with over 270 million paid memberships in over 190 countries enjoying TV series, documentaries and feature films.',
    eps: { years: ['2025', '2026', '2027'], values: [19.45, 22.87, 26.54] },
    peBands: { low: 28.0, mid: 35.0, high: 45.0 },
    scores: { value: 6.9, growth: 7.8, profit: 8.4, momentum: 8.1 },
    forwardPE: '47.2', ttmPE: '42.8',
    peers: [[394, 47.2, 18, 'NFLX'], [145, 18.2, 16, 'DIS']],
    segments: [
      { name: 'Streaming', value: 88, itemStyle: { color: '#3b82f6' } },
      { name: 'Advertising', value: 12, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Global streaming leadership', 'Ad-tier growth acceleration', 'Content investment moat'],
    risks: ['Market saturation in developed regions', 'Content cost inflation', 'Streaming competition'],
    news: [{ headline: 'Netflix ad-tier reaches 40M users', summary: 'Strong advertising revenue growth', source: 'Variety', datetime: '5 hours ago', url: '#' }]
  },

  // Add simplified entries for remaining stocks to reach 25 total
  'BAC': {
    ticker: 'BAC', name: 'Bank of America Corp', price: 46.83, change: 0.67, changePercent: 1.45,
    marketCap: '362B', sector: 'Financials', forwardPE: '12.2', ttmPE: '13.8',
    eps: { years: ['2025', '2026', '2027'], values: [3.85, 4.12, 4.38] },
    peBands: { low: 9.0, mid: 12.5, high: 16.0 },
    scores: { value: 8.4, growth: 6.8, profit: 8.2, momentum: 7.1 },
    description: 'Bank of America Corporation operates as a bank holding company providing banking and financial products and services.',
    peers: [[362, 12.2, 18, 'BAC'], [578, 14.5, 20, 'JPM']],
    segments: [{ name: 'Consumer Banking', value: 52, itemStyle: { color: '#3b82f6' } }, { name: 'Global Banking', value: 22, itemStyle: { color: '#10b981' } }, { name: 'Global Markets', value: 18, itemStyle: { color: '#f59e0b' } }, { name: 'Wealth Management', value: 8, itemStyle: { color: '#8b5cf6' } }],
    strengths: ['Largest US deposit base', 'Strong digital banking platform', 'Diversified revenue streams'],
    risks: ['Interest rate sensitivity', 'Credit loss provisions', 'Regulatory capital requirements'],
    news: [{ headline: 'BAC reports strong Q4 trading revenue', summary: 'Market volatility boosts trading income', source: 'Financial Times', datetime: '4 hours ago', url: '#' }]
  },

  'CAT': {
    ticker: 'CAT', name: 'Caterpillar Inc.', price: 412.76, change: 2.34, changePercent: 0.57,
    marketCap: '218B', sector: 'Industrials', forwardPE: '18.4', ttmPE: '19.7',
    eps: { years: ['2025', '2026', '2027'], values: [22.45, 24.18, 25.89] },
    peBands: { low: 14.0, mid: 18.0, high: 22.0 },
    scores: { value: 7.9, growth: 6.4, profit: 8.1, momentum: 6.8 },
    description: 'Caterpillar Inc. manufactures construction and mining equipment, diesel and natural gas engines, industrial gas turbines, and diesel-electric locomotives.',
    peers: [[218, 18.4, 16, 'CAT'], [128, 16.2, 14, 'DE']],
    segments: [{ name: 'Construction Industries', value: 42, itemStyle: { color: '#3b82f6' } }, { name: 'Resource Industries', value: 28, itemStyle: { color: '#10b981' } }, { name: 'Energy & Transportation', value: 23, itemStyle: { color: '#f59e0b' } }, { name: 'Financial Products', value: 7, itemStyle: { color: '#8b5cf6' } }],
    strengths: ['Infrastructure spending tailwinds', 'Mining sector strength', 'Services revenue growth'],
    risks: ['Cyclical market exposure', 'China market sensitivity', 'Supply chain pressures'],
    news: [{ headline: 'CAT benefits from infrastructure spending', summary: 'Strong order book from construction projects', source: 'Construction Equipment', datetime: '6 hours ago', url: '#' }]
  },

  'COST': {
    ticker: 'COST', name: 'Costco Wholesale Corp', price: 928.45, change: 12.87, changePercent: 1.41,
    marketCap: '412B', sector: 'Consumer Staples', forwardPE: '49.0', ttmPE: '46.2',
    eps: { years: ['2025', '2026', '2027'], values: [18.95, 20.84, 22.91] },
    peBands: { low: 35.0, mid: 42.0, high: 50.0 },
    scores: { value: 6.1, growth: 7.9, profit: 8.8, momentum: 8.3 },
    description: 'Costco Wholesale Corporation operates membership warehouses offering branded and private-label products at low prices.',
    peers: [[412, 49.0, 18, 'COST'], [685, 28.5, 22, 'WMT']],
    segments: [{ name: 'Merchandise', value: 89, itemStyle: { color: '#3b82f6' } }, { name: 'Membership Fees', value: 11, itemStyle: { color: '#10b981' } }],
    strengths: ['Membership model with 90%+ renewal rates', 'Kirkland private label success', 'International expansion opportunity'],
    risks: ['Premium valuation multiple', 'E-commerce competition', 'Wage and supply chain inflation'],
    news: [{ headline: 'Costco membership fee increase announced', summary: 'First increase since 2017 takes effect next month', source: 'RetailWire', datetime: '8 hours ago', url: '#' }]
  }

  // Continue pattern for remaining stocks: ADBE, AMAT, ASML, BRK.B, DIS, FDX, HD, ISRG, KO, MCD, NKE, QCOM, UBER, COIN
  // Each following the same comprehensive structure
};

// Helper functions
export function getDemoStockData(ticker) {
  const data = DEMO_STOCK_DATA[ticker.toUpperCase()];
  if (!data) return null;
  
  // Add small realistic price variation to simulate "live" movement
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
  // Add small variations to market data too
  const baseData = {
    spy: { price: 5974.07, change: 0.73 },
    nasdaq: { price: 19764.89, change: 0.98 },
    btc: { price: 94852, change: -2.14 },
    gold: { price: 2635.20, change: 0.45 },
    oil: { price: 70.10, change: -1.23 }
  };
  
  // Add realistic variations
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.01; // ±0.5% variation
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
