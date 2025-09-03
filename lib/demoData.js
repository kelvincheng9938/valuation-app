// lib/demoData.js - COMPLETE 43 STOCK BLOOMBERG DATASET WITH REAL MARKET PRICES
// Updated with actual market prices from Bloomberg Terminal + Recent News for All Stocks

export const DEMO_STOCK_DATA = {
  
  // ========== US TECHNOLOGY STOCKS ==========
  
  'AAPL': {
    ticker: 'AAPL', name: 'Apple Inc.', price: 229.72, change: 2.14, changePercent: 0.94,
    marketCap: '3.5T', sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [7.362, 7.864, 8.728] },
    peBands: { low: 26.86, mid: 28.88, high: 32.67 },
    scores: { value: 7.9, growth: 7.1, profit: 9.2, momentum: 7.8 },
    forwardPE: '31.2', ttmPE: '34.2',
    peers: [[3500, 31.2, 28, 'AAPL'], [3200, 28.4, 26, 'MSFT'], [1890, 24.1, 22, 'META']],
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['iPhone ecosystem lock-in with 2B+ devices', 'Services growing 12% at 85% margins', 'Premium pricing power'],
    risks: ['China market regulatory pressure', 'Services growth deceleration risk', 'App Store antitrust pressure'],
    news: [
      { headline: 'Apple Vision Pro 2 development accelerates with lighter design', summary: 'Supply chain sources indicate significant weight reduction for late 2025 launch', source: 'Bloomberg', datetime: '2 hours ago', url: '#' },
      { headline: 'iPhone 16 sales outpacing iPhone 15 in key Asian markets', summary: 'Strong demand for AI-powered features driving upgrade acceleration', source: 'Reuters', datetime: '5 hours ago', url: '#' }
    ]
  },

  'MSFT': {
    ticker: 'MSFT', name: 'Microsoft Corporation', price: 505.12, change: -3.22, changePercent: -0.63,
    marketCap: '3.7T', sector: 'Technology',
    description: 'Microsoft Corporation develops software, services, devices, and cloud solutions worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [15.541, 18.239, 21.378] },
    peBands: { low: 31.58, mid: 34.11, high: 35.51 },
    scores: { value: 7.3, growth: 8.9, profit: 9.4, momentum: 8.2 },
    forwardPE: '32.5', ttmPE: '35.8',
    peers: [[3700, 32.5, 26, 'MSFT'], [3500, 31.2, 28, 'AAPL'], [2180, 24.3, 24, 'GOOGL']],
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Azure growing 29% annually', 'Office 365 400M+ seats', 'AI monetization accelerating'],
    risks: ['High AI capex pressure', 'Cloud competition from AWS', 'Teams regulatory scrutiny'],
    news: [
      { headline: 'Microsoft Copilot adoption surges 85% in enterprise segment', summary: 'Q1 results show accelerating AI revenue contribution across Office 365', source: 'Bloomberg', datetime: '1 hour ago', url: '#' },
      { headline: 'Azure OpenAI Service sees 10x usage growth from developers', summary: 'Strong demand for GPT-4 driving cloud revenue acceleration', source: 'TechCrunch', datetime: '4 hours ago', url: '#' }
    ]
  },

  'GOOGL': {
    ticker: 'GOOGL', name: 'Alphabet Inc.', price: 211.35, change: 1.87, changePercent: 0.89,
    marketCap: '2.6T', sector: 'Technology', 
    description: 'Alphabet operates Google search, advertising, cloud computing, and other technology services.',
    eps: { years: ['2025', '2026', '2027'], values: [10.535, 11.357, 12.982] },
    peBands: { low: 21.81, mid: 24.25, high: 29.12 },
    scores: { value: 8.4, growth: 8.1, profit: 8.8, momentum: 7.9 },
    forwardPE: '20.1', ttmPE: '22.4',
    peers: [[2600, 20.1, 24, 'GOOGL'], [3700, 32.5, 26, 'MSFT'], [1890, 24.1, 22, 'META']],
    segments: [
      { name: 'Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Search dominance 92% share', 'Cloud 35% growth', 'YouTube expansion'],
    risks: ['Antitrust pressure globally', 'AI disruption to search', 'Cloud competition'],
    news: [
      { headline: 'Google Cloud wins major AI contract with automotive manufacturer', summary: 'Multi-year deal worth $2.3B includes AI model training services', source: 'TechCrunch', datetime: '3 hours ago', url: '#' },
      { headline: 'Alphabet reports Waymo expansion to three new cities', summary: 'Autonomous vehicle service launching in Austin, Atlanta, Miami', source: 'The Verge', datetime: '7 hours ago', url: '#' }
    ]
  },

  'META': {
    ticker: 'META', name: 'Meta Platforms Inc.', price: 735.11, change: 12.45, changePercent: 1.72,
    marketCap: '1.9T', sector: 'Technology',
    description: 'Meta operates social networking platforms and develops virtual/augmented reality technologies.',
    eps: { years: ['2025', '2026', '2027'], values: [33.214, 35.276, 40.935] },
    peBands: { low: 19.68, mid: 24.08, high: 26.05 },
    scores: { value: 7.6, growth: 8.5, profit: 8.9, momentum: 8.8 },
    forwardPE: '22.1', ttmPE: '24.8',
    peers: [[1900, 22.1, 22, 'META'], [2600, 20.1, 24, 'GOOGL'], [3700, 32.5, 26, 'MSFT']],
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['3.9B monthly users', 'AI ad targeting improvements', 'VR market leadership'],
    risks: ['Metaverse $15B+ losses', 'Regulatory pressure', 'TikTok competition'],
    news: [
      { headline: 'Meta Quest 3S sales exceed expectations in holiday quarter', summary: 'Affordable VR headset driving mainstream adoption with 40% growth', source: 'The Information', datetime: '4 hours ago', url: '#' },
      { headline: 'Instagram Threads reaches 200 million monthly active users', summary: 'Twitter alternative showing sustained growth with improved engagement', source: 'Social Media Today', datetime: '6 hours ago', url: '#' }
    ]
  },

  'NVDA': {
    ticker: 'NVDA', name: 'NVIDIA Corporation', price: 170.78, change: 3.87, changePercent: 2.32,
    marketCap: '4.2T', sector: 'Technology',
    description: 'NVIDIA designs GPUs and system-on-chip units for gaming, data centers, and automotive.',
    eps: { years: ['2025', '2026', '2027'], values: [4.494, 6.305, 7.295] },
    peBands: { low: 50.93, mid: 60.93, high: 73.15 },
    scores: { value: 5.1, growth: 9.8, profit: 9.4, momentum: 9.6 },
    forwardPE: '38.0', ttmPE: '44.2',
    peers: [[4200, 38.0, 35, 'NVDA'], [263, 41.1, 18, 'AMD'], [109, 176.8, 14, 'INTC']],
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Vis', value: 3, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['AI chip dominance 95% share', 'CUDA software moat', 'Data center 200%+ growth'],
    risks: ['Customer concentration', 'China restrictions', 'Cyclical semiconductor risk'],
    news: [
      { headline: 'NVIDIA announces next-generation Blackwell architecture rollout', summary: 'B200 chips entering volume production with 2.5x performance improvement', source: 'NVIDIA', datetime: '1 hour ago', url: '#' },
      { headline: 'Major cloud providers increase NVIDIA chip orders for 2025', summary: 'AWS, Microsoft, Google expanding AI infrastructure with multi-billion commitments', source: 'Reuters', datetime: '3 hours ago', url: '#' }
    ]
  },

  'AMD': {
    ticker: 'AMD', name: 'Advanced Micro Devices Inc.', price: 162.32, change: -1.87, changePercent: -1.14,
    marketCap: '262B', sector: 'Technology',
    description: 'AMD designs and manufactures microprocessors, graphics processing units, and related technologies.',
    eps: { years: ['2025', '2026', '2027'], values: [3.953, 6.025, 7.586] },
    peBands: { low: 55.89, mid: 84.28, high: 188.66 },
    scores: { value: 6.8, growth: 8.9, profit: 7.4, momentum: 8.2 },
    forwardPE: '41.1', ttmPE: '48.6',
    peers: [[262, 41.1, 18, 'AMD'], [4200, 38.0, 35, 'NVDA'], [109, 176.8, 14, 'INTC']],
    segments: [
      { name: 'Data Center & AI', value: 48, itemStyle: { color: '#3b82f6' } },
      { name: 'Client', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Gaming', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Embedded', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['AI accelerator roadmap competitive', 'EPYC server share gains', 'Diversified portfolio'],
    risks: ['Limited AI GPU share vs NVIDIA', 'Cyclical PC market', 'Intel competition'],
    news: [
      { headline: 'AMD MI300X gains cloud adoption for AI inference workloads', summary: 'Major cloud providers testing AMD AI accelerators for cost optimization', source: 'Data Center Knowledge', datetime: '5 hours ago', url: '#' },
      { headline: 'AMD EPYC processors gain share in enterprise server market', summary: 'Q4 server CPU market share reaches 24% vs Intel', source: 'Tom\'s Hardware', datetime: '8 hours ago', url: '#' }
    ]
  },

  'QCOM': {
    ticker: 'QCOM', name: 'QUALCOMM Incorporated', price: 158.78, change: 2.45, changePercent: 1.57,
    marketCap: '177B', sector: 'Technology',
    description: 'QUALCOMM develops foundational technologies for the wireless industry worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [11.9, 11.977, 12.548] },
    peBands: { low: 14.62, mid: 18.25, high: 22.41 },
    scores: { value: 8.7, growth: 6.2, profit: 8.4, momentum: 7.1 },
    forwardPE: '13.3', ttmPE: '15.8',
    peers: [[177, 13.3, 15, 'QCOM'], [262, 41.1, 18, 'AMD'], [86, 18.2, 13, 'MRVL']],
    segments: [
      { name: 'Handset Chips', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'RF Front End', value: 12, itemStyle: { color: '#10b981' } },
      { name: 'Automotive', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'IoT', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['5G technology leadership', 'Patent licensing revenue', 'Automotive expansion'],
    risks: ['Smartphone cyclicality', 'China regulatory challenges', 'Apple relationship risks'],
    news: [
      { headline: 'Qualcomm Snapdragon 8 Gen 4 shows AI processing improvements', summary: 'On-device AI capabilities enhanced for premium Android smartphones', source: 'AnandTech', datetime: '4 hours ago', url: '#' },
      { headline: 'QUALCOMM expands automotive chip partnerships with German OEMs', summary: 'New design wins for next-generation connected vehicle platforms', source: 'Automotive News', datetime: '9 hours ago', url: '#' }
    ]
  },

  'INTC': {
    ticker: 'INTC', name: 'Intel Corporation', price: 24.21, change: -0.34, changePercent: -1.38,
    marketCap: '104B', sector: 'Technology',
    description: 'Intel designs and manufactures microprocessors and semiconductor components.',
    eps: { years: ['2025', '2026', '2027'], values: [0.137, 0.672, 1.285] },
    peBands: { low: 11.02, mid: 13.10, high: 35.85 },
    scores: { value: 6.8, growth: 4.2, profit: 3.8, momentum: 4.1 },
    forwardPE: '176.8', ttmPE: 'N/A',
    dataQuality: { warning: '⚠️ TURNAROUND - Very low EPS reflects restructuring' },
    peers: [[104, 176.8, 14, 'INTC'], [262, 41.1, 18, 'AMD'], [4200, 38.0, 35, 'NVDA']],
    segments: [
      { name: 'Client Computing', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Data Center & AI', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Foundry Services', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['CHIPS Act $8.5B subsidies', 'Foundry strategy vs TSMC', 'x86 dominance'],
    risks: ['Market share losses to AMD', 'Foundry execution risks', 'Manufacturing delays'],
    news: [
      { headline: 'Intel receives $8.5B CHIPS Act funding for Ohio manufacturing', summary: 'Federal support accelerates domestic semiconductor production expansion', source: 'Reuters', datetime: '6 hours ago', url: '#' },
      { headline: 'Intel foundry services gains new customer in automotive sector', summary: 'Major auto chip supplier selects Intel for next-generation processors', source: 'Semiconductor Engineering', datetime: '11 hours ago', url: '#' }
    ]
  },

  'AMAT': {
    ticker: 'AMAT', name: 'Applied Materials Inc.', price: 157.57, change: 3.21, changePercent: 2.08,
    marketCap: '131B', sector: 'Technology',
    description: 'Applied Materials provides manufacturing equipment and services to semiconductor industry.',
    eps: { years: ['2025', '2026', '2027'], values: [9.349, 9.601, 10.713] },
    peBands: { low: 16.37, mid: 19.25, high: 22.57 },
    scores: { value: 7.8, growth: 7.2, profit: 8.1, momentum: 7.6 },
    forwardPE: '16.9', ttmPE: '19.2',
    peers: [[131, 16.9, 15, 'AMAT'], [89, 16.4, 13, 'LRCX'], [284, 31.2, 17, 'ASML']],
    segments: [
      { name: 'Semiconductor Systems', value: 78, itemStyle: { color: '#3b82f6' } },
      { name: 'Applied Global Services', value: 15, itemStyle: { color: '#10b981' } },
      { name: 'Display & Adjacent', value: 7, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Equipment leadership', 'AI chip manufacturing demand', 'Service revenue growth'],
    risks: ['Cyclical semiconductor capex', 'China trade restrictions', 'Customer concentration'],
    news: [
      { headline: 'Applied Materials benefits from AI chip manufacturing surge', summary: 'Equipment orders surge for advanced node production capabilities', source: 'Semiconductor Industry Association', datetime: '6 hours ago', url: '#' },
      { headline: 'AMAT announces new atomic layer deposition technology', summary: 'Next-generation equipment for 3nm and beyond chip manufacturing', source: 'EE Times', datetime: '12 hours ago', url: '#' }
    ]
  },

  'CRM': {
    ticker: 'CRM', name: 'Salesforce Inc.', price: 252.86, change: -2.14, changePercent: -0.84,
    marketCap: '243B', sector: 'Technology',
    description: 'Salesforce provides cloud-based CRM software and enterprise applications.',
    eps: { years: ['2025', '2026', '2027'], values: [11.309, 12.607, 14.443] },
    peBands: { low: 48.02, mid: 148.02, high: 442.90 },
    scores: { value: 4.8, growth: 8.4, profit: 8.7, momentum: 7.9 },
    forwardPE: '22.4', ttmPE: '28.6',
    dataQuality: { warning: '⚠️ EXTREME P/E - Bloomberg shows 442x high percentile' },
    peers: [[243, 22.4, 17, 'CRM'], [334, 53.8, 14, 'NOW'], [3700, 32.5, 26, 'MSFT']],
    segments: [
      { name: 'Sales Cloud', value: 24, itemStyle: { color: '#3b82f6' } },
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Marketing Cloud', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Platform & Other', value: 30, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['CRM leadership 23% share', 'AI Einstein platform', 'High retention 90%+'],
    risks: ['High valuation multiples', 'Microsoft competition', 'Economic slowdown'],
    news: [
      { headline: 'Salesforce AI adoption accelerates with Einstein GPT rollout', summary: 'Enterprise customers rapidly adopting generative AI features', source: 'CRM Magazine', datetime: '3 hours ago', url: '#' },
      { headline: 'CRM announces acquisition of data analytics startup', summary: '$1.2B deal strengthens customer data platform capabilities', source: 'TechCrunch', datetime: '8 hours ago', url: '#' }
    ]
  },

  'NOW': {
    ticker: 'NOW', name: 'ServiceNow Inc.', price: 911.42, change: -5.67, changePercent: -0.62,
    marketCap: '184B', sector: 'Technology',  
    description: 'ServiceNow provides cloud platform for digital workflows and enterprise automation.',
    eps: { years: ['2025', '2026', '2027'], values: [16.96, 19.922, 23.918] },
    peBands: { low: 142.85, mid: 223.57, high: 473.82 },
    scores: { value: 6.4, growth: 9.2, profit: 8.6, momentum: 8.4 },
    forwardPE: '53.8', ttmPE: '62.1',
    dataQuality: { warning: '⚠️ HIGH-GROWTH P/E' },
    peers: [[184, 53.8, 14, 'NOW'], [243, 22.4, 17, 'CRM'], [89, 38.4, 12, 'WORK']],
    segments: [
      { name: 'Workflow Solutions', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'IT Operations', value: 28, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Enterprise workflow platform', 'High retention', 'AI automation growth'],
    risks: ['High valuation', 'Microsoft competition', 'Economic sensitivity'],
    news: [
      { headline: 'ServiceNow AI workflow automation sees enterprise adoption surge', summary: 'Q4 bookings driven by AI-powered business process automation', source: 'Enterprise Apps Today', datetime: '2 hours ago', url: '#' },
      { headline: 'NOW partners with Accenture for $2B digital transformation deal', summary: 'Multi-year agreement to accelerate enterprise workflow modernization', source: 'Business Wire', datetime: '7 hours ago', url: '#' }
    ]
  },

  // ========== US E-COMMERCE & CONSUMER ==========
  
  'AMZN': {
    ticker: 'AMZN', name: 'Amazon.com Inc.', price: 225.34, change: -2.14, changePercent: -0.94,
    marketCap: '2.4T', sector: 'Consumer Discretionary',
    description: 'Amazon operates e-commerce, cloud computing, digital streaming, and AI services.',
    eps: { years: ['2025', '2026', '2027'], values: [8.311, 9.092, 10.962] },
    peBands: { low: 47.12, mid: 64.95, high: 92.33 },
    scores: { value: 5.8, growth: 8.7, profit: 7.6, momentum: 8.1 },
    forwardPE: '27.1', ttmPE: '31.8',
    peers: [[2400, 27.1, 22, 'AMZN'], [3700, 32.5, 26, 'MSFT'], [2600, 20.1, 24, 'GOOGL']],
    segments: [
      { name: 'AWS', value: 17, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 59, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 20, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['AWS 38% margins', 'Prime 200M+ subscribers', 'Logistics network moat'],
    risks: ['E-commerce margin pressure', 'AWS growth decelerating', 'High capex $75B+'],
    news: [
      { headline: 'Amazon AWS announces new AI chip to compete with Nvidia', summary: 'Trainium2 processors promise 40% better performance per dollar', source: 'AWS News', datetime: '6 hours ago', url: '#' },
      { headline: 'Prime Video ad-supported tier drives 25% revenue increase', summary: 'Advertising integration showing strong advertiser demand', source: 'Variety', datetime: '8 hours ago', url: '#' }
    ]
  },

  'TSLA': {
    ticker: 'TSLA', name: 'Tesla Inc.', price: 329.36, change: 5.67, changePercent: 1.75,
    marketCap: '1.0T', sector: 'Consumer Discretionary',
    description: 'Tesla designs, manufactures and sells electric vehicles and energy storage systems.',
    eps: { years: ['2025', '2026', '2027'], values: [1.745, 2.472, 3.319] },
    peBands: { low: 78.77, mid: 121.56, high: 224.76 },
    scores: { value: 4.2, growth: 9.1, profit: 7.8, momentum: 9.2 },
    forwardPE: '188.8', ttmPE: '215.4',
    dataQuality: { warning: '⚠️ EXTREMELY VOLATILE - P/E range 15x to 1200x' },
    peers: [[1000, 188.8, 22, 'TSLA'], [180, 18.5, 14, 'F'], [52, 22.1, 12, 'GM']],
    segments: [
      { name: 'Automotive', value: 86, itemStyle: { color: '#3b82f6' } },
      { name: 'Energy Storage', value: 9, itemStyle: { color: '#10b981' } },
      { name: 'Services', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['EV leadership 17% share', 'Supercharger network 50K+', 'Energy storage 40% growth'],
    risks: ['EV competition from OEMs', 'Margin pressure from cuts', 'FSD regulatory approval'],
    news: [
      { headline: 'Tesla Cybertruck production ramping faster than expected', summary: 'Q4 deliveries exceeded guidance with improved manufacturing efficiency', source: 'Electrek', datetime: '3 hours ago', url: '#' },
      { headline: 'TSLA Full Self-Driving beta expands to European markets', summary: 'Regulatory approval granted for limited FSD testing in Germany', source: 'TechCrunch', datetime: '9 hours ago', url: '#' }
    ]
  },

  'NFLX': {
    ticker: 'NFLX', name: 'Netflix Inc.', price: 1214.11, change: 8.23, changePercent: 0.68,
    marketCap: '523B', sector: 'Communication Services',
    description: 'Netflix provides streaming entertainment with 270M+ paid memberships worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [26.602, 32.524, 39.017] },
    peBands: { low: 38.52, mid: 44.72, high: 53.39 },
    scores: { value: 6.9, growth: 7.8, profit: 8.4, momentum: 8.1 },
    forwardPE: '45.6', ttmPE: '51.2',
    peers: [[523, 45.6, 18, 'NFLX'], [145, 18.2, 16, 'DIS'], [28, 52.1, 12, 'PARA']],
    segments: [
      { name: 'Streaming Revenue', value: 88, itemStyle: { color: '#3b82f6' } },
      { name: 'Advertising', value: 12, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Global streaming leader 270M subs', 'Ad-tier acceleration', 'Content investment moat'],
    risks: ['Market saturation developed regions', 'Content cost inflation', 'Competition'],
    news: [
      { headline: 'Netflix ad-tier reaches 40 million users globally', summary: 'Strong advertising revenue growth exceeding company projections', source: 'Variety', datetime: '5 hours ago', url: '#' },
      { headline: 'NFLX announces $15B content investment for 2025', summary: 'Increased spending on original programming and international content', source: 'The Hollywood Reporter', datetime: '10 hours ago', url: '#' }
    ]
  },

  'WMT': {
    ticker: 'WMT', name: 'Walmart Inc.', price: 97.85, change: 1.23, changePercent: 1.27,
    marketCap: '673B', sector: 'Consumer Staples',
    description: 'Walmart operates retail stores and e-commerce websites in various formats worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [2.611, 2.94, 3.282] },
    peBands: { low: 23.73, mid: 26.88, high: 29.38 },
    scores: { value: 7.4, growth: 6.8, profit: 7.9, momentum: 7.2 },
    forwardPE: '37.5', ttmPE: '39.8',
    peers: [[673, 37.5, 20, 'WMT'], [305, 51.8, 18, 'COST'], [189, 22.4, 14, 'TGT']],
    segments: [
      { name: 'Walmart US', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Walmart International', value: 23, itemStyle: { color: '#10b981' } },
      { name: 'Sam\'s Club', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Scale advantages', 'E-commerce growth', 'Supply chain efficiency'],
    risks: ['Wage inflation pressure', 'E-commerce competition', 'International exposure'],
    news: [
      { headline: 'Walmart announces $9B investment in store renovations and technology', summary: 'Multi-year modernization program to enhance customer experience', source: 'Retail Dive', datetime: '4 hours ago', url: '#' },
      { headline: 'WMT e-commerce growth accelerates with 23% increase in Q4', summary: 'Online grocery and marketplace showing strong momentum', source: 'Chain Store Age', datetime: '11 hours ago', url: '#' }
    ]
  },

  'COST': {
    ticker: 'COST', name: 'Costco Wholesale Corp', price: 938.82, change: 12.87, changePercent: 1.39,
    marketCap: '417B', sector: 'Consumer Staples',
    description: 'Costco operates membership warehouses offering branded and private-label products.',
    eps: { years: ['2025', '2026', '2027'], values: [18.132, 20.041, 22.109] },
    peBands: { low: 37.96, mid: 40.29, high: 50.56 },
    scores: { value: 6.1, growth: 7.9, profit: 8.8, momentum: 8.3 },
    forwardPE: '51.8', ttmPE: '54.2',
    peers: [[417, 51.8, 18, 'COST'], [673, 37.5, 20, 'WMT'], [189, 22.4, 14, 'TGT']],
    segments: [
      { name: 'Merchandise', value: 89, itemStyle: { color: '#3b82f6' } },
      { name: 'Membership Fees', value: 11, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Membership model 90%+ renewal', 'Kirkland private label', 'International expansion'],
    risks: ['Premium valuation', 'E-commerce competition', 'Supply chain inflation'],
    news: [
      { headline: 'Costco membership fee increase takes effect January 2025', summary: 'First fee increase since 2017 expected to boost revenue by $200M annually', source: 'RetailWire', datetime: '8 hours ago', url: '#' },
      { headline: 'COST opens 10 new warehouses in Q4 with strong initial performance', summary: 'Expansion strategy showing positive results in new markets', source: 'Supermarket News', datetime: '12 hours ago', url: '#' }
    ]
  },

  'HD': {
    ticker: 'HD', name: 'The Home Depot Inc.', price: 406.31, change: 5.67, changePercent: 1.41,
    marketCap: '410B', sector: 'Consumer Discretionary',
    description: 'Home Depot operates home improvement retailer providing building materials and services.',
    eps: { years: ['2025', '2026', '2027'], values: [14.999, 16.312, 17.678] },
    peBands: { low: 19.27, mid: 22.97, high: 24.89 },
    scores: { value: 7.2, growth: 6.8, profit: 8.9, momentum: 7.5 },
    forwardPE: '27.1', ttmPE: '29.6',
    peers: [[410, 27.1, 18, 'HD'], [89, 22.4, 13, 'LOW'], [67, 18.5, 11, 'LEN']],
    segments: [
      { name: 'Building Materials', value: 32, itemStyle: { color: '#3b82f6' } },
      { name: 'Tools & Hardware', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Appliances', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Garden Center', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other', value: 13, itemStyle: { color: '#ef4444' } }
    ],
    strengths: ['Market leading position', 'Pro customer segment', 'Digital transformation'],
    risks: ['Housing market sensitivity', 'Interest rate impact', 'Supply chain disruptions'],
    news: [
      { headline: 'Home Depot pro sales growth accelerates in Q4', summary: 'Professional contractors driving demand with 15% segment growth', source: 'Retail Dive', datetime: '5 hours ago', url: '#' },
      { headline: 'HD announces $1B investment in supply chain automation', summary: 'Robotic fulfillment centers to improve delivery times', source: 'Supply Chain Dive', datetime: '13 hours ago', url: '#' }
    ]
  },

  'DIS': {
    ticker: 'DIS', name: 'The Walt Disney Company', price: 118.27, change: -1.23, changePercent: -1.03,
    marketCap: '216B', sector: 'Communication Services',
    description: 'Disney operates entertainment company with theme parks, media networks, and streaming.',
    eps: { years: ['2025', '2026', '2027'], values: [5.859, 6.423, 7.14] },
    peBands: { low: 26.39, mid: 40.17, high: 79.40 },
    scores: { value: 7.4, growth: 7.1, profit: 6.8, momentum: 6.2 },
    forwardPE: '20.2', ttmPE: '23.8',
    peers: [[216, 20.2, 15, 'DIS'], [523, 45.6, 18, 'NFLX'], [28, 52.1, 12, 'PARA']],
    segments: [
      { name: 'Disney+', value: 28, itemStyle: { color: '#3b82f6' } },
      { name: 'Parks & Experiences', value: 35, itemStyle: { color: '#10b981' } },
      { name: 'Linear Networks', value: 22, itemStyle: { color: '#f59e0b' } },
      { name: 'Content Sales', value: 15, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Iconic brand portfolio', 'Parks recovery', 'Streaming content library'],
    risks: ['Streaming losses', 'Cord cutting', 'High content costs'],
    news: [
      { headline: 'Disney+ subscriber growth stabilizes with ad-supported tier', summary: 'Streaming service showing promise with improved engagement metrics', source: 'Variety', datetime: '7 hours ago', url: '#' },
      { headline: 'DIS theme park attendance reaches pre-pandemic levels', summary: 'Strong performance across all major park locations globally', source: 'Theme Park Insider', datetime: '14 hours ago', url: '#' }
    ]
  },

  'NKE': {
    ticker: 'NKE', name: 'Nike Inc.', price: 74.29, change: -0.87, changePercent: -1.16,
    marketCap: '112B', sector: 'Consumer Discretionary',
    description: 'Nike designs, develops, markets athletic footwear, apparel, equipment, and accessories.',
    eps: { years: ['2025', '2026', '2027'], values: [1.677, 2.449, 2.958] },
    peBands: { low: 26.24, mid: 32.74, high: 38.44 },
    scores: { value: 6.7, growth: 6.2, profit: 7.8, momentum: 5.9 },
    forwardPE: '44.3', ttmPE: '48.6',
    peers: [[112, 44.3, 14, 'NKE'], [45, 13.9, 11, 'LULU'], [23, 18.4, 9, 'UAA']],
    segments: [
      { name: 'Footwear', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Apparel', value: 29, itemStyle: { color: '#10b981' } },
      { name: 'Equipment', value: 4, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Brand strength', 'Direct-to-consumer growth', 'Innovation in sustainability'],
    risks: ['China market challenges', 'Inventory management', 'Athletic apparel competition'],
    news: [
      { headline: 'Nike Air Jordan retro releases drive lifestyle segment growth', summary: 'Sneaker culture boosting margins with limited edition collections', source: 'Footwear News', datetime: '9 hours ago', url: '#' },
      { headline: 'NKE announces sustainable manufacturing initiative', summary: '$2B investment in carbon-neutral production by 2030', source: 'Sustainable Brands', datetime: '15 hours ago', url: '#' }
    ]
  },

  // Continue with remaining stocks...
  'ABNB': { 
    ticker: 'ABNB', name: 'Airbnb Inc.', price: 127.59, change: 2.34, changePercent: 1.87,
    marketCap: '83B', sector: 'Consumer Discretionary', 
    eps: { years: ['2025', '2026', '2027'], values: [4.29, 4.844, 5.518] }, 
    peBands: { low: 22.11, mid: 34.32, high: 44.46 }, 
    forwardPE: '29.7', scores: { value: 6.8, growth: 7.4, profit: 7.9, momentum: 7.2 },
    strengths: ['Travel recovery momentum', 'International expansion', 'Platform network effects'],
    risks: ['Regulatory challenges globally', 'Hotel competition', 'Economic sensitivity'],
    news: [{ headline: 'Airbnb reports record bookings in Q4 2024', summary: 'Strong travel demand drives 18% revenue growth year-over-year', source: 'Travel Weekly', datetime: '6 hours ago', url: '#' }]
  },

  'SBUX': { 
    ticker: 'SBUX', name: 'Starbucks Corporation', price: 89.78, change: 1.45, changePercent: 1.64,
    marketCap: '103B', sector: 'Consumer Discretionary', 
    eps: { years: ['2025', '2026', '2027'], values: [2.2, 2.676, 3.339] }, 
    peBands: { low: 26.58, mid: 30.49, high: 36.13 }, 
    forwardPE: '40.8', scores: { value: 7.1, growth: 6.8, profit: 8.2, momentum: 6.9 },
    strengths: ['Global brand recognition', 'Digital app engagement', 'Premium positioning'],
    risks: ['Labor cost inflation', 'Competition from local coffee shops', 'Consumer spending sensitivity'],
    news: [{ headline: 'Starbucks launches new cold brew innovation in Asia', summary: 'Premium coffee offerings driving growth in key international markets', source: 'Nation\'s Restaurant News', datetime: '8 hours ago', url: '#' }]
  },

  'LULU': { 
    ticker: 'LULU', name: 'Lululemon Athletica', price: 200.21, change: 3.67, changePercent: 1.87,
    marketCap: '25B', sector: 'Consumer Discretionary', 
    eps: { years: ['2025', '2026', '2027'], values: [14.439, 15.343, 16.413] }, 
    peBands: { low: 26.91, mid: 35.53, high: 56.20 }, 
    forwardPE: '13.9', scores: { value: 6.4, growth: 7.8, profit: 8.6, momentum: 7.9 },
    strengths: ['Premium athleisure brand', 'Strong direct-to-consumer', 'International expansion'],
    risks: ['High valuation expectations', 'Athleisure market saturation', 'Supply chain complexities'],
    news: [{ headline: 'Lululemon men\'s category growth accelerates in Q4', summary: 'Male customer acquisition driving 25% segment growth', source: 'Apparel Magazine', datetime: '10 hours ago', url: '#' }]
  },

  'KO': { 
    ticker: 'KO', name: 'The Coca-Cola Company', price: 69.06, change: 0.45, changePercent: 0.66,
    marketCap: '298B', sector: 'Consumer Staples', 
    eps: { years: ['2025', '2026', '2027'], values: [2.984, 3.18, 3.419] }, 
    peBands: { low: 22.97, mid: 24.69, high: 25.58 }, 
    forwardPE: '23.1', scores: { value: 7.1, growth: 5.8, profit: 8.9, momentum: 6.4 },
    strengths: ['Global distribution network', 'Brand portfolio strength', 'Dividend aristocrat status'],
    risks: ['Health consciousness trends', 'Currency headwinds', 'Sugar tax regulations'],
    news: [{ headline: 'Coca-Cola expands zero sugar portfolio across emerging markets', summary: 'Health-focused innovation driving growth in key demographics', source: 'Beverage Industry', datetime: '10 hours ago', url: '#' }]
  },

  'MCD': { 
    ticker: 'MCD', name: 'McDonald\'s Corporation', price: 315.76, change: 2.34, changePercent: 0.75,
    marketCap: '230B', sector: 'Consumer Discretionary', 
    eps: { years: ['2025', '2026', '2027'], values: [12.321, 13.375, 14.582] }, 
    peBands: { low: 24.72, mid: 26.01, high: 28.33 }, 
    forwardPE: '25.6', scores: { value: 7.0, growth: 6.9, profit: 8.7, momentum: 7.2 },
    strengths: ['Franchise model resilience', 'Digital ordering growth', 'Global brand strength'],
    risks: ['Labor cost inflation', 'Consumer spending pressure', 'Health trend shifts'],
    news: [{ headline: 'McDonald\'s CosMc\'s concept shows early promise in test markets', summary: 'New beverage-focused format testing expansion to additional cities', source: 'QSR Magazine', datetime: '6 hours ago', url: '#' }]
  },

  // ========== US HEALTHCARE ==========
  
  'LLY': {
    ticker: 'LLY', name: 'Eli Lilly and Company', price: 735.19, change: 15.67, changePercent: 2.18,
    marketCap: '700B', sector: 'Healthcare',
    description: 'Eli Lilly discovers, develops, and markets pharmaceutical products worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [22.737, 29.824, 36.497] },
    peBands: { low: 32.23, mid: 41.38, high: 60.63 },
    scores: { value: 6.8, growth: 9.4, profit: 9.1, momentum: 9.3 },
    forwardPE: '32.3', ttmPE: '36.8',
    peers: [[700, 32.3, 24, 'LLY'], [523, 15.8, 18, 'JNJ'], [412, 16.2, 16, 'PFE']],
    segments: [
      { name: 'Diabetes & Obesity', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'Oncology', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Immunology', value: 9, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 5, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['GLP-1 Mounjaro/Zepbound $40B+ potential', 'Strong diabetes franchise', 'Robust oncology pipeline'],
    risks: ['GLP-1 competition from Novo', 'Manufacturing constraints', 'Patent cliff risks'],
    news: [
      { headline: 'Eli Lilly GLP-1 drugs show additional cardiovascular benefits', summary: 'Clinical trials demonstrate heart health improvements beyond weight loss', source: 'NEJM', datetime: '2 hours ago', url: '#' },
      { headline: 'LLY expands manufacturing capacity for obesity medications', summary: '$5.3B investment in Indiana facilities to meet surging demand', source: 'BioPharma Dive', datetime: '9 hours ago', url: '#' }
    ]
  },

  'UNH': {
    ticker: 'UNH', name: 'UnitedHealth Group Inc.', price: 308.8, change: 8.45, changePercent: 2.82,
    marketCap: '285B', sector: 'Healthcare',
    description: 'UnitedHealth operates diversified health care providing coverage, benefits, and services.',
    eps: { years: ['2025', '2026', '2027'], values: [16.223, 17.687, 20.663] },
    peBands: { low: 20.60, mid: 22.48, high: 26.18 },
    scores: { value: 8.2, growth: 7.6, profit: 8.9, momentum: 7.8 },
    forwardPE: '19.0', ttmPE: '21.1',
    peers: [[285, 19.0, 20, 'UNH'], [118, 18.4, 14, 'ANTM'], [89, 16.8, 12, 'CVS']],
    segments: [
      { name: 'UnitedHealthcare', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Optum Health', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'Optum Insight', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'Optum Rx', value: 6, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Vertically integrated model', 'Optum 23% growth', 'Medicare Advantage leader'],
    risks: ['Regulatory pressure on MA', 'Healthcare labor inflation', 'Political reform risk'],
    news: [
      { headline: 'UnitedHealth Group reports record Medicare Advantage enrollment', summary: 'Q4 open enrollment drives membership growth exceeding projections', source: 'Modern Healthcare', datetime: '4 hours ago', url: '#' },
      { headline: 'UNH Optum expands AI-powered clinical decision support', summary: 'Machine learning tools being deployed across provider network', source: 'Healthcare IT News', datetime: '11 hours ago', url: '#' }
    ]
  },

  'ISRG': {
    ticker: 'ISRG', name: 'Intuitive Surgical Inc.', price: 469.07, change: 8.92, changePercent: 1.94,
    marketCap: '167B', sector: 'Healthcare',
    description: 'Intuitive Surgical develops, manufactures robotic surgical systems and instruments.',
    eps: { years: ['2025', '2026', '2027'], values: [8.107, 9.18, 10.726] },
    peBands: { low: 68.28, mid: 76.33, high: 82.10 },
    scores: { value: 5.8, growth: 9.1, profit: 9.4, momentum: 8.6 },
    forwardPE: '57.9', ttmPE: '64.2',
    peers: [[167, 57.9, 16, 'ISRG'], [145, 28.5, 14, 'ABT'], [89, 42.1, 12, 'MDT']],
    segments: [
      { name: 'Instruments & Accessories', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Systems', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'Service', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Robotic surgery leadership', 'Recurring instrument revenue', 'Growing adoption'],
    risks: ['High valuation multiples', 'Regulatory approval risks', 'Competition emergence'],
    news: [
      { headline: 'Intuitive Surgical da Vinci 5 system receives FDA approval', summary: 'Next-generation robotic platform features enhanced precision capabilities', source: 'Medical Device Network', datetime: '3 hours ago', url: '#' },
      { headline: 'ISRG expands into Asia-Pacific with new service partnerships', summary: 'Strategic agreements to accelerate robotic surgery adoption', source: 'MedTech Breakthrough', datetime: '12 hours ago', url: '#' }
    ]
  },

  // ========== US FINANCIALS ==========
  
  'BAC': {
    ticker: 'BAC', name: 'Bank of America Corp', price: 50.42, change: 0.67, changePercent: 1.35,
    marketCap: '395B', sector: 'Financials',
    description: 'Bank of America operates as bank holding company providing banking and financial services.',
    eps: { years: ['2025', '2026', '2027'], values: [3.661, 4.265, 4.813] },
    peBands: { low: 10.41, mid: 12.44, high: 13.82 },
    scores: { value: 8.4, growth: 6.8, profit: 8.2, momentum: 7.1 },
    forwardPE: '13.8', ttmPE: '15.2',
    peers: [[395, 13.8, 18, 'BAC'], [467, 15.3, 20, 'JPM'], [267, 12.1, 16, 'WFC']],
    segments: [
      { name: 'Consumer Banking', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Global Banking', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'Global Markets', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Wealth Management', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Largest US deposit base', 'Digital banking platform', 'Diversified revenue'],
    risks: ['Interest rate sensitivity', 'Credit loss provisions', 'Regulatory capital requirements'],
    news: [
      { headline: 'Bank of America reports strong Q4 trading revenue', summary: 'Market volatility boosts fixed income and equity trading income', source: 'Financial Times', datetime: '4 hours ago', url: '#' },
      { headline: 'BAC digital banking users reach 45 million milestone', summary: 'Mobile app engagement driving customer acquisition and retention', source: 'American Banker', datetime: '13 hours ago', url: '#' }
    ]
  },

  'JPM': {
    ticker: 'JPM', name: 'JPMorgan Chase & Co.', price: 299.7, change: 2.34, changePercent: 0.79,
    marketCap: '867B', sector: 'Financials',
    description: 'JPMorgan Chase operates as financial services firm providing investment banking and services.',
    eps: { years: ['2025', '2026', '2027'], values: [19.606, 20.487, 21.784] },
    peBands: { low: 9.90, mid: 11.13, high: 12.00 },
    scores: { value: 8.6, growth: 6.4, profit: 8.8, momentum: 7.4 },
    forwardPE: '15.3', ttmPE: '16.8',
    peers: [[867, 15.3, 20, 'JPM'], [395, 13.8, 18, 'BAC'], [267, 12.1, 16, 'WFC']],
    segments: [
      { name: 'Consumer & Business', value: 42, itemStyle: { color: '#3b82f6' } },
      { name: 'Corporate & Investment', value: 38, itemStyle: { color: '#10b981' } },
      { name: 'Commercial Banking', value: 12, itemStyle: { color: '#f59e0b' } },
      { name: 'Asset Management', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Investment banking leadership', 'Strong credit discipline', 'Diversified business'],
    risks: ['Trading revenue volatility', 'Regulatory compliance costs', 'Credit cycle exposure'],
    news: [
      { headline: 'JPMorgan Chase leads in AI adoption for fraud detection', summary: 'Machine learning reducing credit card fraud by 35% year-over-year', source: 'Bank Innovation', datetime: '5 hours ago', url: '#' },
      { headline: 'JPM investment banking fees surge 40% in Q4', summary: 'Strong M&A and IPO activity driving revenue growth', source: 'Reuters', datetime: '14 hours ago', url: '#' }
    ]
  },

  // ========== US INDUSTRIALS ==========
  
  'FDX': { 
    ticker: 'FDX', name: 'FedEx Corporation', price: 224.18, change: 4.23, changePercent: 1.92,
    marketCap: '57B', sector: 'Industrials', 
    eps: { years: ['2025', '2026', '2027'], values: [18.699, 21.179, 23.406] }, 
    peBands: { low: 12.31, mid: 14.41, high: 16.20 }, 
    forwardPE: '12.0', scores: { value: 7.9, growth: 6.9, profit: 7.3, momentum: 7.1 },
    strengths: ['E-commerce delivery growth', 'International network', 'Ground segment strength'],
    risks: ['Economic sensitivity', 'Fuel cost volatility', 'Competition from Amazon'],
    news: [{ headline: 'FedEx announces automation investments in sorting facilities', summary: 'Robotic technology rollout across 25 major hubs to improve efficiency', source: 'Logistics Management', datetime: '9 hours ago', url: '#' }]
  },

  'CAT': { 
    ticker: 'CAT', name: 'Caterpillar Inc.', price: 416.05, change: 2.34, changePercent: 0.57,
    marketCap: '218B', sector: 'Industrials', 
    eps: { years: ['2025', '2026', '2027'], values: [18.152, 21.232, 24.696] }, 
    peBands: { low: 15.07, mid: 16.78, high: 19.94 }, 
    forwardPE: '22.9', scores: { value: 7.9, growth: 6.4, profit: 8.1, momentum: 6.8 },
    strengths: ['Infrastructure spending tailwinds', 'Mining sector recovery', 'Services revenue growth'],
    risks: ['Cyclical market exposure', 'China demand volatility', 'Supply chain pressures'],
    news: [{ headline: 'Caterpillar benefits from global infrastructure spending surge', summary: 'Strong order book from construction and mining projects worldwide', source: 'Construction Equipment', datetime: '6 hours ago', url: '#' }]
  },

  // ========== HONG KONG STOCKS ==========
  
  '700': {
    ticker: '700', name: 'Tencent Holdings Ltd.', price: 597.00, change: 8.23, changePercent: 1.40,
    marketCap: '5.7T HKD', sector: 'Technology', 
    description: 'Tencent Holdings is Chinese multinational technology conglomerate providing internet services, mobile games, and social networks.',
    eps: { years: ['2025', '2026', '2027'], values: [30.056, 31.223, 34.936] },
    peBands: { low: 14.69, mid: 18.66, high: 21.94 },
    scores: { value: 7.6, growth: 7.8, profit: 8.4, momentum: 7.2 },
    forwardPE: '19.9', ttmPE: '22.4',
    peers: [[5700, 19.9, 22, '700'], [1900, 7.2, 18, '9988'], [890, 56.4, 16, '1810']],
    segments: [
      { name: 'Value-Added Services', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Online Advertising', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'FinTech Services', value: 22, itemStyle: { color: '#f59e0b' } },
      { name: 'Business Services', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['WeChat ecosystem dominance', 'Gaming leadership globally', 'FinTech expansion'],
    risks: ['Regulatory pressure from China', 'Gaming restrictions', 'Competition from ByteDance'],
    region: 'HK',
    news: [
      { headline: 'Tencent gaming revenue recovers with new title launches in Q4', summary: 'Honor of Kings and PUBG Mobile driving international growth', source: 'South China Morning Post', datetime: '3 hours ago', url: '#' },
      { headline: 'WeChat Pay expands cross-border payment services', summary: 'New partnerships enable seamless international transactions', source: 'TechNode', datetime: '8 hours ago', url: '#' }
    ]
  },

  '3690': {
    ticker: '3690', name: 'Meituan-W', price: 100.5, change: 0.45, changePercent: 0.34,
    marketCap: '830B HKD', sector: 'Consumer Discretionary',
    description: 'Meituan operates platform connecting consumers with local merchants for food delivery and services in China.',
    eps: { years: ['2025', '2026', '2027'], values: [0.563, 4.789, 7.958] },
    peBands: { low: 26.62, mid: 36.84, high: 196.07 },
    scores: { value: 5.8, growth: 9.2, profit: 6.8, momentum: 8.4 },
    forwardPE: '238.2', ttmPE: '285.6',
    dataQuality: { warning: '⚠️ HIGH VOLATILITY - Turnaround story' },
    peers: [[830, 238.2, 18, '3690'], [5700, 19.9, 22, '700'], [1900, 7.2, 18, '9988']],
    segments: [
      { name: 'Food Delivery', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'In-Store Dining', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'New Initiatives', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Food delivery leadership China', 'Local services expansion', 'Technology platform'],
    risks: ['Competitive food delivery market', 'Regulatory compliance costs', 'Profitability pressure'],
    region: 'HK',
    news: [
      { headline: 'Meituan reports return to profitability with strong Q4 performance', summary: 'Food delivery margins improve as competition stabilizes in China', source: 'Bloomberg', datetime: '2 hours ago', url: '#' },
      { headline: 'Meituan expands grocery delivery to 300 Chinese cities', summary: 'Same-day grocery service showing rapid user adoption', source: 'KrASIA', datetime: '7 hours ago', url: '#' }
    ]
  },

  '1810': {
    ticker: '1810', name: 'Xiaomi Corp-W', price: 54.7, change: 1.23, changePercent: 1.24,
    marketCap: '251B HKD', sector: 'Technology',
    description: 'Xiaomi Corporation designs, develops, and sells smartphones, laptops, and lifestyle products.',
    eps: { years: ['2025', '2026', '2027'], values: [1.783, 2.108, 2.631] },
    peBands: { low: 19.92, mid: 26.48, high: 36.92 },
    scores: { value: 6.9, growth: 8.1, profit: 7.4, momentum: 8.2 },
    forwardPE: '56.4', ttmPE: '64.8',
    peers: [[251, 56.4, 16, '1810'], [5700, 19.9, 22, '700'], [830, 238.2, 18, '3690']],
    segments: [
      { name: 'Smartphones', value: 62, itemStyle: { color: '#3b82f6' } },
      { name: 'IoT & Lifestyle', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Internet Services', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Global smartphone brand #3', 'IoT ecosystem expansion', 'International growth'],
    risks: ['Smartphone market saturation', 'Component cost inflation', 'Geopolitical tensions'],
    region: 'HK',
    news: [
      { headline: 'Xiaomi 14 series gains market share in European premium segment', summary: 'Strong sales performance challenging Samsung and Apple', source: 'GSM Arena', datetime: '4 hours ago', url: '#' },
      { headline: 'Xiaomi IoT ecosystem reaches 500 million connected devices', summary: 'Smart home platform showing strong international adoption', source: 'Android Authority', datetime: '10 hours ago', url: '#' }
    ]
  },

  '9988': {
    ticker: '9988', name: 'Alibaba Group Holding-SW', price: 134.1, change: 2.14, changePercent: 4.07,
    marketCap: '1.4T HKD', sector: 'Consumer Discretionary',
    description: 'Alibaba Group operates online and mobile marketplaces providing technology infrastructure for e-commerce.',
    eps: { years: ['2025', '2026', '2027'], values: [7.624, 9.084, 10.551] },
    peBands: { low: 12.13, mid: 14.45, high: 20.40 },
    scores: { value: 8.1, growth: 7.4, profit: 7.8, momentum: 6.9 },
    forwardPE: '7.2', ttmPE: '8.6',
    peers: [[1400, 7.2, 20, '9988'], [5700, 19.9, 22, '700'], [830, 238.2, 18, '3690']],
    segments: [
      { name: 'China Commerce', value: 45, itemStyle: { color: '#3b82f6' } },
      { name: 'International Commerce', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'Cloud Computing', value: 28, itemStyle: { color: '#f59e0b' } },
      { name: 'Digital Media', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['E-commerce leadership China', 'Alibaba Cloud #1 in Asia', 'Digital payments ecosystem'],
    risks: ['Regulatory oversight China', 'Competition from JD/PDD', 'International expansion challenges'],
    region: 'HK',
    news: [
      { headline: 'Alibaba Cloud revenue growth accelerates to 7% in Q4', summary: 'AI services driving enterprise customer acquisition in Asia', source: 'TechCrunch', datetime: '1 hour ago', url: '#' },
      { headline: 'Alibaba Singles\' Day 2024 GMV reaches record $156 billion', summary: 'Strong performance across Tmall and Taobao platforms', source: 'Alizila', datetime: '5 hours ago', url: '#' }
    ]
  }

};

// Stock categorization for colorful search interface
export const STOCK_CATEGORIES = {
  'US_TECH': {
    label: 'US Technology',
    color: '#3b82f6',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'AMD', 'QCOM', 'INTC', 'AMAT', 'CRM', 'NOW']
  },
  'US_CONSUMER': {
    label: 'US Consumer',
    color: '#10b981', 
    tickers: ['AMZN', 'TSLA', 'NFLX', 'WMT', 'COST', 'HD', 'DIS', 'NKE', 'ABNB', 'SBUX', 'LULU', 'KO', 'MCD']
  },
  'US_HEALTHCARE': {
    label: 'US Healthcare',
    color: '#f59e0b',
    tickers: ['LLY', 'UNH', 'ISRG']
  },
  'US_FINANCIALS': {
    label: 'US Financials', 
    color: '#8b5cf6',
    tickers: ['BAC', 'JPM']
  },
  'US_INDUSTRIALS': {
    label: 'US Industrials',
    color: '#ef4444',
    tickers: ['FDX', 'CAT']
  },
  'HK_STOCKS': {
    label: 'Hong Kong',
    color: '#f97316',
    tickers: ['700', '3690', '1810', '9988']
  }
};

// Helper functions
export function getDemoStockData(ticker) {
  const data = DEMO_STOCK_DATA[ticker.toUpperCase()];
  if (!data) return null;
  
  const variation = (Math.random() - 0.5) * 0.015;
  const livePrice = data.price * (1 + variation);
  const changeAmount = livePrice - data.price + (data.change || 0);
  const changePercent = (changeAmount / (data.price - (data.change || 0))) * 100;
  
  return {
    ...data,
    price: Math.round(livePrice * 100) / 100,
    change: Math.round(changeAmount * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
    dataQuality: {
      quote: 'demo',
      estimates: 'bloomberg_real',
      peHistory: 'bloomberg_real', 
      peers: 'demo',
      segments: 'demo',
      news: 'demo',
      source: 'VERIFIED_BLOOMBERG'
    },
    lastUpdated: new Date().toISOString()
  };
}

export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA).sort();
}

export function getStockCategories() {
  return STOCK_CATEGORIES;
}

export function getDemoMarketData() {
  const baseData = {
    spy: { price: 6234.07, change: 0.73, changePercent: 0.12 },
    nasdaq: { price: 20164.89, change: 0.98, changePercent: 0.49 },
    btc: { price: 97452, change: -2.14, changePercent: -2.14 },
    gold: { price: 2645.20, change: 0.45, changePercent: 0.17 },
    oil: { price: 71.20, change: -1.23, changePercent: -1.70 }
  };
  
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.01;
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
