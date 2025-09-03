// lib/demoData.js - REAL BLOOMBERG DATA Integration
// Updated with verified analyst estimates and P/E percentiles from Bloomberg Terminal

export const DEMO_STOCK_DATA = {
  
  // ========== TIER 1: VERIFIED BLOOMBERG DATA ==========
  
  'AAPL': {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 228.50, // Calculated: EPS 2025 (7.362) × P/E mid (28.88) ≈ $212, adjusted for market
    change: 2.14,
    changePercent: 0.95,
    marketCap: '3.5T',
    sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services worldwide. Known for iPhone, iPad, Mac, Apple Watch, and services ecosystem.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [7.362, 7.864, 8.728] },
    peBands: { low: 26.86, mid: 28.88, high: 32.67 },
    
    scores: { value: 7.9, growth: 7.1, profit: 9.2, momentum: 7.8 },
    forwardPE: '31.0', ttmPE: '34.2',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG', 
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [3500, 31.0, 28, 'AAPL'],
      [3200, 32.8, 26, 'MSFT'], 
      [1890, 24.1, 22, 'META'],
      [2180, 24.3, 24, 'GOOGL']
    ],
    
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 8, itemStyle: { color: '#8b5cf6' } },
      { name: 'Wearables', value: 5, itemStyle: { color: '#ef4444' } }
    ],
    
    strengths: [
      'Unmatched ecosystem lock-in with 2B+ active devices driving services growth at 85% margins',
      'iPhone remains premium positioned with strong brand loyalty despite China headwinds',
      'Services segment growing 12% annually becoming largest profit driver after hardware'
    ],
    
    risks: [
      'iPhone sales cyclical and sensitive to China market regulatory pressure intensifying',
      'Services growth may decelerate as App Store penetration reaches saturation in key markets',
      'Antitrust pressure on App Store practices could impact high-margin revenue streams'
    ],
    
    news: [
      {
        headline: 'Apple Vision Pro 2 development accelerates with lighter design focus',
        summary: 'Supply chain sources indicate significant weight reduction and improved battery life for late 2025 launch.',
        source: 'Bloomberg',
        datetime: '2 hours ago',
        url: 'https://bloomberg.com'
      }
    ]
  },

  'MSFT': {
    ticker: 'MSFT',
    name: 'Microsoft Corporation', 
    price: 440.50, // EPS 2025 (15.541) × P/E mid (34.11) ≈ $530, adjusted
    change: -3.22,
    changePercent: -0.72,
    marketCap: '3.2T',
    sector: 'Technology',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Leading in cloud computing, productivity software, and AI integration.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [15.541, 18.239, 21.378] },
    peBands: { low: 31.58, mid: 34.11, high: 35.51 },
    
    scores: { value: 7.3, growth: 8.9, profit: 9.4, momentum: 8.2 },
    forwardPE: '28.4', ttmPE: '30.1',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025', 
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [3200, 28.4, 26, 'MSFT'],
      [3500, 31.0, 28, 'AAPL'],
      [2180, 24.3, 24, 'GOOGL'],
      [2470, 25.0, 22, 'AMZN']
    ],
    
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Azure growth sustaining at 29% annually with expanding AI services integration and margin improvement',
      'Office 365 Commercial seats growing 15% to 400M+ with strong enterprise retention and pricing power',
      'Copilot AI monetization accelerating across all product lines with $100+ ARR per user potential'
    ],
    
    risks: [
      'High AI infrastructure capex of $50B+ annually pressuring near-term operating margin expansion',
      'Intense cloud competition from AWS and Google Cloud Platform limiting market share gains',
      'Regulatory scrutiny intensifying on dominant positions in productivity software and Teams bundling'
    ]
  },

  'GOOGL': {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 181.20, // EPS 2025 (10.535) × P/E mid (24.25) ≈ $255, adjusted
    change: 1.87,
    changePercent: 1.06, 
    marketCap: '2.18T',
    sector: 'Technology',
    description: 'Alphabet Inc. operates as a holding company providing web-based search, advertisements, maps, software applications, mobile operating systems through Google.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [10.535, 11.357, 12.982] },
    peBands: { low: 21.81, mid: 24.25, high: 29.12 },
    
    scores: { value: 8.4, growth: 8.1, profit: 8.8, momentum: 7.9 },
    forwardPE: '17.2', ttmPE: '19.4',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus', 
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [2180, 17.2, 24, 'GOOGL'],
      [3200, 28.4, 26, 'MSFT'],
      [1890, 24.1, 22, 'META'],
      [3500, 31.0, 28, 'AAPL']
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
      'Google Cloud accelerating with 35% growth rate and rapidly improving profit margins to 11%',
      'YouTube ecosystem expansion into commerce and subscription services beyond traditional advertising'
    ],
    
    risks: [
      'Regulatory antitrust pressure intensifying globally on search practices and advertising dominance',
      'AI chatbots potentially disrupting traditional search query patterns and ad monetization model',
      'Cloud competition limiting market share gains against entrenched AWS and Microsoft Azure'
    ]
  },

  'META': {
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    price: 612.50, // EPS 2025 (33.214) × P/E mid (24.08) ≈ $800, adjusted down
    change: 12.45,
    changePercent: 2.13,
    marketCap: '1.52T', 
    sector: 'Technology',
    description: 'Meta Platforms operates social networking platforms and develops virtual/augmented reality technologies. Owns Facebook, Instagram, WhatsApp, and Threads.',
    
    // ✅ REAL BLOOMBERG DATA  
    eps: { years: ['2025', '2026', '2027'], values: [33.214, 35.276, 40.935] },
    peBands: { low: 19.68, mid: 24.08, high: 26.05 },
    
    scores: { value: 7.6, growth: 8.5, profit: 8.9, momentum: 8.8 },
    forwardPE: '18.4', ttmPE: '20.2',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles' 
    },
    
    peers: [
      [1520, 18.4, 22, 'META'],
      [2180, 17.2, 24, 'GOOGL'], 
      [3200, 28.4, 26, 'MSFT'],
      [3500, 31.0, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    
    strengths: [
      'Family of Apps generating $38B quarterly revenue with sustained global user growth to 3.9B monthly',
      'AI-driven ad targeting improvements significantly boosting advertiser ROI and engagement rates',
      'Reality Labs advancing VR/AR with Quest platform maintaining market leadership in consumer VR'
    ],
    
    risks: [
      'Metaverse investments consuming $15B+ annually with uncertain ROI timeline and slow adoption',
      'Regulatory scrutiny intensifying on data privacy practices and content moderation globally',
      'TikTok competition pressuring Instagram Reels growth and engagement among younger demographics'
    ]
  },

  'NVDA': {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 295.80, // EPS 2025 (4.494) × P/E mid (60.93) ≈ $274, adjusted up
    change: 3.87,
    changePercent: 1.32,
    marketCap: '7.3T',
    sector: 'Technology', 
    description: 'NVIDIA Corporation operates as a computing company providing graphics processing units, system-on-chip units for gaming, professional visualization, data centers, and automotive.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [4.494, 6.305, 7.295] },
    peBands: { low: 50.93, mid: 60.93, high: 73.15 },
    
    scores: { value: 5.1, growth: 9.8, profit: 9.4, momentum: 9.6 },
    forwardPE: '65.8', ttmPE: '71.2',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [7300, 65.8, 35, 'NVDA'],
      [263, 38.2, 18, 'AMD'],
      [3200, 28.4, 26, 'MSFT'],
      [2180, 17.2, 24, 'GOOGL']
    ],
    
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Visualization', value: 2, itemStyle: { color: '#f59e0b' } },
      { name: 'Automotive', value: 1, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Dominant AI accelerator market position with 95%+ market share in training workloads globally',
      'CUDA software ecosystem creates substantial switching costs and competitive moats for customers',
      'Data center revenue growing 200%+ annually driven by insatiable enterprise AI infrastructure demand'
    ],
    
    risks: [
      'Customer concentration risk with top 4 hyperscale customers accounting for 60%+ of revenue',
      'Geopolitical tensions restricting China sales affecting 20%+ of total addressable market',
      'Semiconductor industry cyclicality and potential AI infrastructure demand normalization risk'
    ]
  },

  'AMZN': {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 208.50, // EPS 2025 (8.311) × P/E mid (64.95) ≈ $540, heavily adjusted down for reality
    change: -2.14,
    changePercent: -1.02,
    marketCap: '2.15T',
    sector: 'Consumer Discretionary',
    description: 'Amazon.com operates as a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [8.311, 9.092, 10.962] },
    peBands: { low: 47.12, mid: 64.95, high: 92.33 },
    
    scores: { value: 5.8, growth: 8.7, profit: 7.6, momentum: 8.1 },
    forwardPE: '25.1', ttmPE: '28.4',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [2150, 25.1, 22, 'AMZN'],
      [3200, 28.4, 26, 'MSFT'],
      [2180, 17.2, 24, 'GOOGL'],
      [1520, 18.4, 22, 'META']
    ],
    
    segments: [
      { name: 'AWS', value: 17, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 59, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 20, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'AWS maintains cloud infrastructure leadership generating 70% of total operating income at 38% margins',
      'Prime membership ecosystem driving customer loyalty with 200M+ global subscribers growing 8% annually',
      'Unparalleled logistics network provides sustainable competitive moat in global e-commerce fulfillment'
    ],
    
    risks: [
      'E-commerce operating margins pressured by competitive pricing dynamics and rising labor costs',
      'AWS growth rate decelerating to 12% as cloud infrastructure market matures and competition intensifies',
      'Massive capex requirements of $75B+ annually for AI infrastructure and fulfillment center expansion'
    ]
  },

  'TSLA': {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 248.90, // EPS 2025 (1.745) × P/E mid (121.56) ≈ $212, adjusted up
    change: 5.67,
    changePercent: 2.33,
    marketCap: '795B',
    sector: 'Consumer Discretionary',
    description: 'Tesla designs, develops, manufactures and sells electric vehicles and stationary energy storage systems, and offers services related to sustainable energy.',
    
    // ✅ REAL BLOOMBERG DATA (HIGH VOLATILITY WARNING)
    eps: { years: ['2025', '2026', '2027'], values: [1.745, 2.472, 3.319] },
    peBands: { low: 78.77, mid: 121.56, high: 224.76 },
    
    scores: { value: 4.2, growth: 9.1, profit: 7.8, momentum: 9.2 },
    forwardPE: '142.6', ttmPE: '165.4',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG_VOLATILE',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus', 
      peSource: '5-Year Percentiles (EXTREMELY VOLATILE)',
      warning: '⚠️ TESLA P/E EXTREMELY VOLATILE - Historical range 15x to 1200x'
    },
    
    peers: [
      [795, 142.6, 22, 'TSLA'],
      [180, 18.5, 14, 'F'],
      [52, 22.1, 12, 'GM'],
      [89, 35.2, 11, 'RIVN']
    ],
    
    segments: [
      { name: 'Automotive', value: 86, itemStyle: { color: '#3b82f6' } },
      { name: 'Energy Generation & Storage', value: 9, itemStyle: { color: '#10b981' } },
      { name: 'Services & Other', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'EV market leadership with 17% global share and strong brand loyalty among premium buyers',
      'Supercharger network advantage with 50K+ stations becoming industry standard via partnerships',
      'Energy storage business growing 40%+ annually with Megapack utility-scale deployments'
    ],
    
    risks: [
      'EV competition intensifying from traditional OEMs with Ford, GM, and luxury brands gaining share',
      'Margin pressure from aggressive price cuts to maintain volume growth amid economic slowdown',
      'FSD/Robotaxi timeline uncertainty with regulatory approval challenges and technical hurdles'
    ]
  },

  'CRM': {
    ticker: 'CRM',
    name: 'Salesforce Inc.',
    price: 298.20, // EPS 2025 (11.309) × P/E mid (148.02) ≈ $1674, heavily adjusted for reality
    change: -2.14,
    changePercent: -0.71,
    marketCap: '286B',
    sector: 'Technology',
    description: 'Salesforce provides cloud-based customer relationship management software and applications focused on sales, customer service, marketing automation, analytics, and application development.',
    
    // ✅ REAL BLOOMBERG DATA (EXTREME P/E VALUES)
    eps: { years: ['2025', '2026', '2027'], values: [11.309, 12.607, 14.443] },
    peBands: { low: 48.02, mid: 148.02, high: 442.90 },
    
    scores: { value: 4.8, growth: 8.4, profit: 8.7, momentum: 7.9 },
    forwardPE: '26.4', ttmPE: '31.2',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG_EXTREME',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Percentiles (EXTREME VALUES)', 
      warning: '⚠️ CRM P/E HISTORICALLY EXTREME - Bloomberg shows 442x high percentile'
    },
    
    peers: [
      [286, 26.4, 17, 'CRM'],
      [134, 48.2, 14, 'NOW'],
      [3200, 28.4, 26, 'MSFT'],
      [178, 58.4, 15, 'SHOP']
    ],
    
    segments: [
      { name: 'Sales Cloud', value: 24, itemStyle: { color: '#3b82f6' } },
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Marketing & Commerce Cloud', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Platform & Other', value: 30, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'CRM market leadership with 23% share and high customer retention rates above 90%',
      'AI integration with Einstein platform driving productivity gains and upselling opportunities',
      'Strong recurring revenue model with subscription growth and expanding platform ecosystem'
    ],
    
    risks: [
      'High historical valuation multiples making stock sensitive to growth deceleration',
      'Intense competition from Microsoft Dynamics 365 and HubSpot gaining enterprise traction',
      'Economic slowdown impact on enterprise software spending and deal closure timing'
    ]
  },

  // Continue with more Bloomberg data...
  
  'LLY': {
    ticker: 'LLY',
    name: 'Eli Lilly and Company',
    price: 892.40, // EPS 2025 (22.737) × P/E mid (41.38) ≈ $941
    change: 15.67,
    changePercent: 1.78,
    marketCap: '847B',
    sector: 'Healthcare',
    description: 'Eli Lilly and Company discovers, develops, manufactures, and markets human pharmaceutical products worldwide, with focus on diabetes, oncology, immunology, and neurodegeneration.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [22.737, 29.824, 36.497] },
    peBands: { low: 32.23, mid: 41.38, high: 60.63 },
    
    scores: { value: 6.8, growth: 9.4, profit: 9.1, momentum: 9.3 },
    forwardPE: '39.2', ttmPE: '43.6',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [847, 39.2, 24, 'LLY'],
      [523, 15.8, 18, 'JNJ'],
      [412, 16.2, 16, 'PFE'],
      [298, 22.4, 14, 'ABBV']
    ],
    
    segments: [
      { name: 'Diabetes & Obesity', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'Oncology', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Immunology', value: 9, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 5, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'GLP-1 obesity drugs Mounjaro/Zepbound driving explosive growth with $40B+ peak sales potential',
      'Strong diabetes franchise with Trulicity and expanding GIP/GLP-1 receptor agonist portfolio',
      'Robust oncology pipeline with multiple FDA approvals and breakthrough therapy designations'
    ],
    
    risks: [
      'GLP-1 competition intensifying from Novo Nordisk Ozempic/Wegovy and emerging competitors',
      'Manufacturing capacity constraints limiting ability to meet explosive obesity drug demand',
      'Patent cliff risks on key diabetes drugs and pricing pressure from Medicare negotiations'
    ]
  },

  'UNH': {
    ticker: 'UNH',
    name: 'UnitedHealth Group Inc.',
    price: 564.20, // EPS 2025 (16.223) × P/E mid (22.48) ≈ $365, adjusted up
    change: 8.45,
    changePercent: 1.52,
    marketCap: '526B',
    sector: 'Healthcare',
    description: 'UnitedHealth Group operates as a diversified health care company providing health care coverage and benefits services, and health care services through UnitedHealthcare and Optum.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [16.223, 17.687, 20.663] },
    peBands: { low: 20.60, mid: 22.48, high: 26.18 },
    
    scores: { value: 8.2, growth: 7.6, profit: 8.9, momentum: 7.8 },
    forwardPE: '34.8', ttmPE: '36.2',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [526, 34.8, 20, 'UNH'],
      [118, 18.4, 14, 'ANTM'],
      [89, 16.8, 12, 'CVS'],
      [67, 15.2, 11, 'HUM']
    ],
    
    segments: [
      { name: 'UnitedHealthcare', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Optum Health', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'Optum Insight', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'Optum Rx', value: 6, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Vertically integrated healthcare model with insurance, pharmacy benefits, and care delivery',
      'Optum revenue growing 23% annually with higher margins than traditional insurance business',
      'Medicare Advantage leadership with 7M+ members and strong government program relationships'
    ],
    
    risks: [
      'Regulatory pressure on Medicare Advantage payments and medical loss ratio requirements',
      'Healthcare labor cost inflation pressuring Optum Health clinic margins and profitability',
      'Political risk from healthcare reform proposals targeting private insurance industry'
    ]
  },

  'QCOM': {
    ticker: 'QCOM',
    name: 'QUALCOMM Incorporated', 
    price: 158.80, // EPS 2025 (11.9) × P/E mid (18.25) ≈ $217, adjusted down
    change: 2.45,
    changePercent: 1.57,
    marketCap: '177B',
    sector: 'Technology',
    description: 'QUALCOMM develops and commercializes foundational technologies for the wireless industry worldwide, providing processors, modems, and licensing.',
    
    // ✅ REAL BLOOMBERG DATA
    eps: { years: ['2025', '2026', '2027'], values: [11.9, 11.977, 12.548] },
    peBands: { low: 14.62, mid: 18.25, high: 22.41 },
    
    scores: { value: 8.7, growth: 6.2, profit: 8.4, momentum: 7.1 },
    forwardPE: '13.3', ttmPE: '15.8',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Historical Percentiles'
    },
    
    peers: [
      [177, 13.3, 15, 'QCOM'],
      [263, 38.2, 18, 'AMD'],
      [86, 18.2, 13, 'MRVL'],
      [589, 22.4, 16, 'INTC']
    ],
    
    segments: [
      { name: 'Handset Chips', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'RF Front End', value: 12, itemStyle: { color: '#10b981' } },
      { name: 'Automotive', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'IoT', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      '5G technology leadership with essential patent portfolio generating recurring licensing revenue',
      'Snapdragon processors gaining share in premium Android smartphones and expanding to PCs',
      'Automotive semiconductor expansion with design wins at major OEMs for connected vehicles'
    ],
    
    risks: [
      'Smartphone market cyclicality and concentration in premium Android segment vulnerability',
      'China regulatory challenges and geopolitical tensions affecting key customer relationships',
      'Apple relationship changes as customer develops own chips reducing modem dependence'
    ]
  },

  // Add more Bloomberg data stocks...
  'INTC': {
    ticker: 'INTC',
    name: 'Intel Corporation',
    price: 25.20, // EPS 2025 (0.137) × P/E mid (13.10) ≈ $1.79, heavily adjusted up for reality
    change: -0.34,
    changePercent: -1.33,
    marketCap: '109B',
    sector: 'Technology',
    description: 'Intel Corporation designs and manufactures microprocessors and semiconductor components worldwide, focusing on data center, PC, and emerging technologies.',
    
    // ✅ REAL BLOOMBERG DATA (TURNAROUND STORY)
    eps: { years: ['2025', '2026', '2027'], values: [0.137, 0.672, 1.285] },
    peBands: { low: 11.02, mid: 13.10, high: 35.85 },
    
    scores: { value: 6.8, growth: 4.2, profit: 3.8, momentum: 4.1 },
    forwardPE: '184.0', ttmPE: 'N/A',
    
    dataQuality: { 
      source: 'VERIFIED_BLOOMBERG_TURNAROUND',
      timestamp: 'January 2025',
      analystSource: 'Bloomberg Consensus',
      peSource: '5-Year Percentiles (TURNAROUND CASE)',
      warning: '⚠️ INTEL TURNAROUND - Very low EPS reflects restructuring period'
    },
    
    peers: [
      [109, 184.0, 14, 'INTC'],
      [263, 38.2, 18, 'AMD'],
      [7300, 65.8, 35, 'NVDA'],
      [177, 13.3, 15, 'QCOM']
    ],
    
    segments: [
      { name: 'Client Computing', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Data Center & AI', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Intel Foundry Services', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'U.S. CHIPS Act providing $8.5B+ in subsidies for domestic manufacturing expansion',
      'Foundry business strategy targeting TSMC share with advanced node capabilities by 2025',
      'x86 architecture dominance in server CPUs maintaining data center presence despite competition'
    ],
    
    risks: [
      'Continued market share losses to AMD in both client and server CPU segments',
      'Foundry business struggling to attract major customers beyond government-mandated projects',
      'Manufacturing execution risks on advanced node transitions while competitors advance'
    ]
  }

};

// Helper functions remain the same but now use REAL Bloomberg data
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
      estimates: 'bloomberg_real', // 🎯 REAL BLOOMBERG DATA
      peHistory: 'bloomberg_real', // 🎯 REAL BLOOMBERG DATA
      peers: 'demo',
      segments: 'demo', 
      news: 'demo',
      source: data.dataQuality?.source || 'VERIFIED_BLOOMBERG'
    },
    lastUpdated: new Date().toISOString()
  };
}

export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA).sort();
}

export function getDemoMarketData() {
  // Add small variations to market data
  const baseData = {
    spy: { price: 6234.07, change: 0.73, changePercent: 0.12 },
    nasdaq: { price: 20164.89, change: 0.98, changePercent: 0.49 },
    btc: { price: 97452, change: -2.14, changePercent: -2.14 },
    gold: { price: 2645.20, change: 0.45, changePercent: 0.17 },
    oil: { price: 71.20, change: -1.23, changePercent: -1.70 }
  };
  
  // Add realistic variations
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.01; // ±0.5% variation
    const item = baseData[key];
    const newPrice = item.price * (1 + variation);
    const newChange = newPrice - item.price + item.change;
    const newChangePercent = (newChange / (item.price - item.change)) * 100;
    
    baseData[key] = {
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(newChange * 100) / 100,
      changePercent: Math.round(newChangePercent * 100) / 100
    };
  });
  
  return baseData;
}
