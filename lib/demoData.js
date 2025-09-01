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

  'ADBE': {
    ticker: 'ADBE', name: 'Adobe Inc.', price: 512.78, change: -8.45, changePercent: -1.62,
    marketCap: '229B', sector: 'Technology', forwardPE: '24.8', ttmPE: '27.3',
    eps: { years: ['2025', '2026', '2027'], values: [20.65, 23.84, 27.12] },
    peBands: { low: 20.0, mid: 25.0, high: 32.0 },
    scores: { value: 7.3, growth: 8.7, profit: 8.9, momentum: 7.5 },
    description: 'Adobe Inc. operates as a diversified software company providing digital media and digital marketing solutions.',
    peers: [[229, 24.8, 16, 'ADBE'], [3200, 32.8, 26, 'MSFT']],
    segments: [
      { name: 'Digital Media', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Digital Experience', value: 27, itemStyle: { color: '#10b981' } },
      { name: 'Publishing', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Creative Cloud subscription dominance', 'Strong enterprise adoption', 'AI integration across products'],
    risks: ['Competition from free alternatives', 'Subscription fatigue', 'Economic sensitivity'],
    news: [{ headline: 'Adobe AI features boost Creative Cloud growth', summary: 'Firefly integration driving user engagement', source: 'TechCrunch', datetime: '4 hours ago', url: '#' }]
  },

  'AMAT': {
    ticker: 'AMAT', name: 'Applied Materials Inc.', price: 198.43, change: 3.21, changePercent: 1.64,
    marketCap: '167B', sector: 'Technology', forwardPE: '18.9', ttmPE: '20.7',
    eps: { years: ['2025', '2026', '2027'], values: [10.50, 11.84, 13.25] },
    peBands: { low: 14.0, mid: 18.0, high: 24.0 },
    scores: { value: 7.8, growth: 7.2, profit: 8.1, momentum: 7.6 },
    description: 'Applied Materials Inc. provides manufacturing equipment, services, and software to the semiconductor, display, and related industries.',
    peers: [[167, 18.9, 15, 'AMAT'], [89, 16.4, 13, 'LRCX']],
    segments: [
      { name: 'Semiconductor Systems', value: 78, itemStyle: { color: '#3b82f6' } },
      { name: 'Applied Global Services', value: 15, itemStyle: { color: '#10b981' } },
      { name: 'Display & Adjacent Markets', value: 7, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Semiconductor equipment leadership', 'AI chip manufacturing demand', 'Service revenue growth'],
    risks: ['Cyclical semiconductor industry', 'China trade restrictions', 'Customer concentration'],
    news: [{ headline: 'Applied Materials benefits from AI chip demand', summary: 'Equipment orders surge for advanced nodes', source: 'Semiconductor Industry', datetime: '6 hours ago', url: '#' }]
  },

  'ASML': {
    ticker: 'ASML', name: 'ASML Holding N.V.', price: 712.89, change: 15.67, changePercent: 2.25,
    marketCap: '284B', sector: 'Technology', forwardPE: '31.2', ttmPE: '34.8',
    eps: { years: ['2025', '2026', '2027'], values: [22.85, 26.45, 29.78] },
    peBands: { low: 25.0, mid: 32.0, high: 42.0 },
    scores: { value: 6.8, growth: 8.9, profit: 9.3, momentum: 8.4 },
    description: 'ASML Holding N.V. develops, produces, markets, sells, and services advanced semiconductor equipment systems.',
    peers: [[284, 31.2, 17, 'ASML'], [167, 18.9, 15, 'AMAT']],
    segments: [
      { name: 'EUV Systems', value: 62, itemStyle: { color: '#3b82f6' } },
      { name: 'DUV Systems', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Service & Field Options', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['EUV lithography monopoly', 'Advanced node demand', 'High barriers to entry'],
    risks: ['Geopolitical tensions with China', 'Cyclical customer capex', 'Technology transition risks'],
    news: [{ headline: 'ASML EUV systems in high demand for 3nm production', summary: 'Leading chipmakers increasing orders', source: 'Reuters', datetime: '2 hours ago', url: '#' }]
  },

  'BRK.B': {
    ticker: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 462.34, change: 2.87, changePercent: 0.62,
    marketCap: '1.0T', sector: 'Financial Services', forwardPE: '15.4', ttmPE: '16.8',
    eps: { years: ['2025', '2026', '2027'], values: [30.02, 32.85, 35.94] },
    peBands: { low: 12.0, mid: 15.5, high: 19.0 },
    scores: { value: 8.2, growth: 6.5, profit: 8.7, momentum: 7.0 },
    description: 'Berkshire Hathaway Inc. operates as a holding company owning subsidiaries engaged in various business activities.',
    peers: [[1000, 15.4, 22, 'BRK.B'], [362, 12.2, 18, 'BAC']],
    segments: [
      { name: 'Insurance', value: 45, itemStyle: { color: '#3b82f6' } },
      { name: 'Railroad', value: 20, itemStyle: { color: '#10b981' } },
      { name: 'Utilities & Energy', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Manufacturing', value: 17, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Diversified business portfolio', 'Strong insurance operations', 'Warren Buffett leadership'],
    risks: ['Succession planning concerns', 'Large cash deployment challenge', 'Regulatory scrutiny'],
    news: [{ headline: 'Berkshire Hathaway increases Apple stake', summary: 'Buffett adds to technology holdings', source: 'CNBC', datetime: '12 hours ago', url: '#' }]
  },

  'DIS': {
    ticker: 'DIS', name: 'The Walt Disney Company', price: 94.67, change: -1.23, changePercent: -1.28,
    marketCap: '172B', sector: 'Communication Services', forwardPE: '18.2', ttmPE: '21.4',
    eps: { years: ['2025', '2026', '2027'], values: [5.20, 6.15, 7.28] },
    peBands: { low: 15.0, mid: 19.0, high: 25.0 },
    scores: { value: 7.4, growth: 7.1, profit: 6.8, momentum: 6.2 },
    description: 'The Walt Disney Company operates as an entertainment company worldwide with theme parks, media networks, and studio entertainment.',
    peers: [[172, 18.2, 15, 'DIS'], [394, 47.2, 18, 'NFLX']],
    segments: [
      { name: 'Disney+', value: 28, itemStyle: { color: '#3b82f6' } },
      { name: 'Parks & Experiences', value: 35, itemStyle: { color: '#10b981' } },
      { name: 'Linear Networks', value: 22, itemStyle: { color: '#f59e0b' } },
      { name: 'Content Sales', value: 15, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Iconic brand portfolio', 'Theme park recovery', 'Streaming content library'],
    risks: ['Streaming losses continue', 'Cord cutting acceleration', 'High content costs'],
    news: [{ headline: 'Disney+ subscriber growth stabilizes', summary: 'Ad-supported tier showing promise', source: 'Variety', datetime: '7 hours ago', url: '#' }]
  },

  'FDX': {
    ticker: 'FDX', name: 'FedEx Corporation', price: 287.56, change: 4.23, changePercent: 1.49,
    marketCap: '72B', sector: 'Industrials', forwardPE: '14.8', ttmPE: '16.2',
    eps: { years: ['2025', '2026', '2027'], values: [19.42, 21.56, 23.78] },
    peBands: { low: 11.0, mid: 14.5, high: 18.0 },
    scores: { value: 7.9, growth: 6.9, profit: 7.3, momentum: 7.1 },
    description: 'FedEx Corporation provides transportation, e-commerce and business services worldwide through integrated business segments.',
    peers: [[72, 14.8, 13, 'FDX'], [134, 18.5, 14, 'UPS']],
    segments: [
      { name: 'Express', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Ground', value: 35, itemStyle: { color: '#10b981' } },
      { name: 'Freight', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'Services', value: 5, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['E-commerce delivery demand', 'International network', 'Cost reduction initiatives'],
    risks: ['Economic sensitivity', 'Fuel cost volatility', 'Competition from Amazon'],
    news: [{ headline: 'FedEx announces automation investments', summary: 'Robotic sorting facilities expanding', source: 'Logistics Management', datetime: '9 hours ago', url: '#' }]
  },

  'HD': {
    ticker: 'HD', name: 'The Home Depot Inc.', price: 412.89, change: 5.67, changePercent: 1.39,
    marketCap: '406B', sector: 'Consumer Discretionary', forwardPE: '24.2', ttmPE: '26.8',
    eps: { years: ['2025', '2026', '2027'], values: [17.06, 18.45, 19.92] },
    peBands: { low: 20.0, mid: 24.0, high: 29.0 },
    scores: { value: 7.2, growth: 6.8, profit: 8.9, momentum: 7.5 },
    description: 'The Home Depot, Inc. operates as a home improvement retailer providing building materials, home improvement products, and services.',
    peers: [[406, 24.2, 18, 'HD'], [89, 22.4, 13, 'LOW']],
    segments: [
      { name: 'Building Materials', value: 32, itemStyle: { color: '#3b82f6' } },
      { name: 'Tools & Hardware', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Appliances', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Garden Center', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other', value: 13, itemStyle: { color: '#ef4444' } }
    ],
    strengths: ['Market leading position', 'Strong pro customer segment', 'Digital transformation'],
    risks: ['Housing market sensitivity', 'Interest rate impact', 'Supply chain disruptions'],
    news: [{ headline: 'Home Depot pro sales growth accelerates', summary: 'Professional contractors driving demand', source: 'Retail Dive', datetime: '5 hours ago', url: '#' }]
  },

  'ISRG': {
    ticker: 'ISRG', name: 'Intuitive Surgical Inc.', price: 612.34, change: 8.92, changePercent: 1.48,
    marketCap: '216B', sector: 'Healthcare', forwardPE: '52.8', ttmPE: '58.4',
    eps: { years: ['2025', '2026', '2027'], values: [11.60, 13.85, 16.42] },
    peBands: { low: 40.0, mid: 52.0, high: 68.0 },
    scores: { value: 5.8, growth: 9.1, profit: 9.4, momentum: 8.6 },
    description: 'Intuitive Surgical, Inc. develops, manufactures, and markets robotic surgical systems and related instruments and accessories.',
    peers: [[216, 52.8, 16, 'ISRG'], [145, 28.5, 14, 'ABT']],
    segments: [
      { name: 'Instruments & Accessories', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Systems', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'Service', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Robotic surgery market leadership', 'Recurring revenue from instruments', 'Growing procedure adoption'],
    risks: ['High valuation multiples', 'Regulatory approval risks', 'Competition emergence'],
    news: [{ headline: 'Intuitive Surgical da Vinci 5 system launched', summary: 'Next-generation robotic platform rollout', source: 'Medical Device Network', datetime: '3 hours ago', url: '#' }]
  },

  'KO': {
    ticker: 'KO', name: 'The Coca-Cola Company', price: 63.78, change: 0.45, changePercent: 0.71,
    marketCap: '275B', sector: 'Consumer Staples', forwardPE: '23.8', ttmPE: '25.2',
    eps: { years: ['2025', '2026', '2027'], values: [2.68, 2.84, 3.01] },
    peBands: { low: 20.0, mid: 24.0, high: 28.0 },
    scores: { value: 7.1, growth: 5.8, profit: 8.9, momentum: 6.4 },
    description: 'The Coca-Cola Company manufactures, markets, and sells nonalcoholic beverages worldwide through various beverage concentrates and syrups.',
    peers: [[275, 23.8, 17, 'KO'], [198, 22.4, 15, 'PEP']],
    segments: [
      { name: 'Sparkling Soft Drinks', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Water, Sports & Coffee', value: 19, itemStyle: { color: '#10b981' } },
      { name: 'Juice & Dairy', value: 9, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 5, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Global brand recognition', 'Extensive distribution network', 'Dividend aristocrat status'],
    risks: ['Health consciousness trends', 'Currency headwinds', 'Sugar tax regulations'],
    news: [{ headline: 'Coca-Cola expands zero sugar portfolio', summary: 'Health-focused product innovation continues', source: 'Beverage Industry', datetime: '10 hours ago', url: '#' }]
  },

  'MCD': {
    ticker: 'MCD', name: 'McDonald\'s Corporation', price: 296.45, change: 2.34, changePercent: 0.80,
    marketCap: '214B', sector: 'Consumer Discretionary', forwardPE: '26.4', ttmPE: '28.1',
    eps: { years: ['2025', '2026', '2027'], values: [11.23, 12.15, 13.08] },
    peBands: { low: 22.0, mid: 26.0, high: 31.0 },
    scores: { value: 7.0, growth: 6.9, profit: 8.7, momentum: 7.2 },
    description: 'McDonald\'s Corporation operates and franchises McDonald\'s restaurants worldwide providing food and beverages.',
    peers: [[214, 26.4, 16, 'MCD'], [45, 24.8, 11, 'YUM']],
    segments: [
      { name: 'US Restaurants', value: 42, itemStyle: { color: '#3b82f6' } },
      { name: 'International Markets', value: 38, itemStyle: { color: '#10b981' } },
      { name: 'Corporate', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Franchise model resilience', 'Digital transformation success', 'Global brand strength'],
    risks: ['Labor cost inflation', 'Consumer discretionary pressure', 'Health trend shifts'],
    news: [{ headline: 'McDonald\'s CosMc\'s concept shows early promise', summary: 'New beverage-focused format testing expansion', source: 'QSR Magazine', datetime: '6 hours ago', url: '#' }]
  },

  'NKE': {
    ticker: 'NKE', name: 'Nike Inc.', price: 78.24, change: -0.87, changePercent: -1.10,
    marketCap: '117B', sector: 'Consumer Discretionary', forwardPE: '22.7', ttmPE: '25.4',
    eps: { years: ['2025', '2026', '2027'], values: [3.45, 3.78, 4.12] },
    peBands: { low: 18.0, mid: 24.0, high: 32.0 },
    scores: { value: 6.7, growth: 6.2, profit: 7.8, momentum: 5.9 },
    description: 'Nike, Inc. designs, develops, markets, and sells athletic footwear, apparel, equipment, accessories, and services worldwide.',
    peers: [[117, 22.7, 14, 'NKE'], [45, 26.8, 11, 'LULU']],
    segments: [
      { name: 'Footwear', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Apparel', value: 29, itemStyle: { color: '#10b981' } },
      { name: 'Equipment', value: 4, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Brand strength and pricing power', 'Direct-to-consumer growth', 'Innovation in sustainable materials'],
    risks: ['China market challenges', 'Inventory management issues', 'Athletic apparel competition'],
    news: [{ headline: 'Nike Air Jordan retro releases drive lifestyle growth', summary: 'Sneaker culture boosting margins', source: 'Footwear News', datetime: '9 hours ago', url: '#' }]
  },

  'QCOM': {
    ticker: 'QCOM', name: 'QUALCOMM Incorporated', price: 158.67, change: 2.45, changePercent: 1.57,
    marketCap: '177B', sector: 'Technology', forwardPE: '16.8', ttmPE: '18.4',
    eps: { years: ['2025', '2026', '2027'], values: [9.45, 10.82, 12.34] },
    peBands: { low: 12.0, mid: 16.0, high: 22.0 },
    scores: { value: 8.1, growth: 7.8, profit: 8.6, momentum: 7.9 },
    description: 'QUALCOMM Incorporated develops and commercializes foundational technologies for the wireless industry worldwide.',
    peers: [[177, 16.8, 15, 'QCOM'], [196, 28.4, 16, 'AMD']],
    segments: [
      { name: 'Handset Chips', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'RF Front End', value: 12, itemStyle: { color: '#10b981' } },
      { name: 'Automotive', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'IoT', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['5G technology leadership', 'Patent licensing revenue', 'Automotive expansion'],
    risks: ['Smartphone market cyclicality', 'China regulatory challenges', 'Apple relationship changes'],
    news: [{ headline: 'Qualcomm Snapdragon 8 Gen 4 shows AI improvements', summary: 'On-device AI processing capabilities enhanced', source: 'AnandTech', datetime: '4 hours ago', url: '#' }]
  },

  'UBER': {
    ticker: 'UBER', name: 'Uber Technologies Inc.', price: 67.89, change: 1.23, changePercent: 1.85,
    marketCap: '142B', sector: 'Technology', forwardPE: '28.4', ttmPE: '32.7',
    eps: { years: ['2025', '2026', '2027'], values: [2.39, 3.15, 4.02] },
    peBands: { low: 20.0, mid: 28.0, high: 38.0 },
    scores: { value: 6.9, growth: 8.5, profit: 7.1, momentum: 8.2 },
    description: 'Uber Technologies, Inc. develops and operates proprietary technology applications supporting various transportation and delivery services.',
    peers: [[142, 28.4, 14, 'UBER'], [78, 34.9, 13, 'LYFT']],
    segments: [
      { name: 'Mobility', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'Delivery', value: 32, itemStyle: { color: '#10b981' } },
      { name: 'Freight', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Market leading platform', 'Autonomous vehicle partnerships', 'Delivery growth acceleration'],
    risks: ['Regulatory challenges globally', 'Driver classification issues', 'Competition intensification'],
    news: [{ headline: 'Uber Eats market share gains in key cities', summary: 'Food delivery showing strong growth momentum', source: 'TechCrunch', datetime: '5 hours ago', url: '#' }]
  },

  'COIN': {
    ticker: 'COIN', name: 'Coinbase Global Inc.', price: 312.45, change: 18.67, changePercent: 6.35,
    marketCap: '78B', sector: 'Financial Services', forwardPE: '34.9', ttmPE: '28.2',
    eps: { years: ['2025', '2026', '2027'], values: [8.95, 12.45, 16.78] },
    peBands: { low: 15.0, mid: 22.0, high: 35.0 },
    scores: { value: 6.8, growth: 9.2, profit: 6.4, momentum: 9.1 },
    description: 'Coinbase Global, Inc. provides financial infrastructure and technology for the cryptoeconomy worldwide.',
    peers: [[78, 34.9, 13, 'COIN'], [24, 28.5, 11, 'HOOD']],
    segments: [
      { name: 'Transaction Revenue', value: 78, itemStyle: { color: '#3b82f6' } },
      { name: 'Subscription & Services', value: 15, itemStyle: { color: '#10b981' } },
      { name: 'Other', value: 7, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Leading US crypto exchange', 'Regulatory compliance advantage', 'Institutional services growth'],
    risks: ['Crypto market volatility', 'Regulatory uncertainty', 'Transaction revenue dependence'],
    news: [{ headline: 'Coinbase custody assets reach $150B milestone', summary: 'Institutional adoption accelerating', source: 'CoinDesk', datetime: '2 hours ago', url: '#' }]
  }
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
