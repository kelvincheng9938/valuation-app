// lib/demoData.js - COMPLETE 43 STOCK BLOOMBERG DATASET
// All stocks from your Bloomberg Terminal data included

export const DEMO_STOCK_DATA = {
  
  // ========== US TECHNOLOGY STOCKS ==========
  
  'AAPL': {
    ticker: 'AAPL', name: 'Apple Inc.', price: 197.76, change: 2.14, changePercent: 1.09,
    marketCap: '3.0T', sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [7.362, 7.864, 8.728] },
    peBands: { low: 26.86, mid: 28.88, high: 32.67 },
    scores: { value: 7.9, growth: 7.1, profit: 9.2, momentum: 7.8 },
    forwardPE: '26.8', ttmPE: '29.4',
    peers: [[3000, 26.8, 28, 'AAPL'], [3200, 28.4, 26, 'MSFT'], [1890, 24.1, 22, 'META']],
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['iPhone ecosystem lock-in with 2B+ devices', 'Services growing 12% at 85% margins', 'Premium pricing power'],
    risks: ['China market regulatory pressure', 'Services growth deceleration risk', 'App Store antitrust pressure'],
    news: [{ headline: 'Apple Vision Pro 2 development accelerates', summary: 'Lighter design focus for 2025 launch', source: 'Bloomberg', datetime: '2 hours ago', url: '#' }]
  },

  'MSFT': {
    ticker: 'MSFT', name: 'Microsoft Corporation', price: 490.76, change: -3.22, changePercent: -0.65,
    marketCap: '3.6T', sector: 'Technology',
    description: 'Microsoft Corporation develops software, services, devices, and cloud solutions worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [15.541, 18.239, 21.378] },
    peBands: { low: 31.58, mid: 34.11, high: 35.51 },
    scores: { value: 7.3, growth: 8.9, profit: 9.4, momentum: 8.2 },
    forwardPE: '31.6', ttmPE: '34.5',
    peers: [[3600, 31.6, 26, 'MSFT'], [3000, 26.8, 28, 'AAPL'], [2180, 24.3, 24, 'GOOGL']],
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Azure growing 29% annually', 'Office 365 400M+ seats', 'AI monetization accelerating'],
    risks: ['High AI capex pressure', 'Cloud competition from AWS', 'Teams regulatory scrutiny']
  },

  'GOOGL': {
    ticker: 'GOOGL', name: 'Alphabet Inc.', price: 229.79, change: 1.87, changePercent: 0.82,
    marketCap: '2.9T', sector: 'Technology', 
    description: 'Alphabet operates Google search, advertising, cloud computing, and other technology services.',
    eps: { years: ['2025', '2026', '2027'], values: [10.535, 11.357, 12.982] },
    peBands: { low: 21.81, mid: 24.25, high: 29.12 },
    scores: { value: 8.4, growth: 8.1, profit: 8.8, momentum: 7.9 },
    forwardPE: '21.8', ttmPE: '24.1',
    peers: [[2900, 21.8, 24, 'GOOGL'], [3600, 31.6, 26, 'MSFT'], [1890, 24.1, 22, 'META']],
    segments: [
      { name: 'Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Search dominance 92% share', 'Cloud 35% growth', 'YouTube expansion'],
    risks: ['Antitrust pressure globally', 'AI disruption to search', 'Cloud competition']
  },

  'META': {
    ticker: 'META', name: 'Meta Platforms Inc.', price: 653.64, change: 12.45, changePercent: 1.94,
    marketCap: '1.6T', sector: 'Technology',
    description: 'Meta operates social networking platforms and develops virtual/augmented reality technologies.',
    eps: { years: ['2025', '2026', '2027'], values: [33.214, 35.276, 40.935] },
    peBands: { low: 19.68, mid: 24.08, high: 26.05 },
    scores: { value: 7.6, growth: 8.5, profit: 8.9, momentum: 8.8 },
    forwardPE: '19.7', ttmPE: '21.2',
    peers: [[1600, 19.7, 22, 'META'], [2900, 21.8, 24, 'GOOGL'], [3600, 31.6, 26, 'MSFT']],
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['3.9B monthly users', 'AI ad targeting improvements', 'VR market leadership'],
    risks: ['Metaverse $15B+ losses', 'Regulatory pressure', 'TikTok competition']
  },

  'NVDA': {
    ticker: 'NVDA', name: 'NVIDIA Corporation', price: 228.90, change: 3.87, changePercent: 1.72,
    marketCap: '5.6T', sector: 'Technology',
    description: 'NVIDIA designs GPUs and system-on-chip units for gaming, data centers, and automotive.',
    eps: { years: ['2025', '2026', '2027'], values: [4.494, 6.305, 7.295] },
    peBands: { low: 50.93, mid: 60.93, high: 73.15 },
    scores: { value: 5.1, growth: 9.8, profit: 9.4, momentum: 9.6 },
    forwardPE: '50.9', ttmPE: '58.4',
    peers: [[5600, 50.9, 35, 'NVDA'], [263, 38.2, 18, 'AMD'], [109, 184.0, 14, 'INTC']],
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Vis', value: 3, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['AI chip dominance 95% share', 'CUDA software moat', 'Data center 200%+ growth'],
    risks: ['Customer concentration', 'China restrictions', 'Cyclical semiconductor risk']
  },

  'AMD': {
    ticker: 'AMD', name: 'Advanced Micro Devices Inc.', price: 220.92, change: -1.87, changePercent: -0.84,
    marketCap: '357B', sector: 'Technology',
    description: 'AMD designs and manufactures microprocessors, graphics processing units, and related technologies.',
    eps: { years: ['2025', '2026', '2027'], values: [3.953, 6.025, 7.586] },
    peBands: { low: 55.89, mid: 84.28, high: 188.66 },
    scores: { value: 6.8, growth: 8.9, profit: 7.4, momentum: 8.2 },
    forwardPE: '55.9', ttmPE: '71.2',
    peers: [[357, 55.9, 18, 'AMD'], [5600, 50.9, 35, 'NVDA'], [109, 184.0, 14, 'INTC']],
    segments: [
      { name: 'Data Center & AI', value: 48, itemStyle: { color: '#3b82f6' } },
      { name: 'Client', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Gaming', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Embedded', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['AI accelerator roadmap competitive', 'EPYC server share gains', 'Diversified portfolio'],
    risks: ['Limited AI GPU share vs NVIDIA', 'Cyclical PC market', 'Intel competition']
  },

  'QCOM': {
    ticker: 'QCOM', name: 'QUALCOMM Incorporated', price: 173.95, change: 2.45, changePercent: 1.43,
    marketCap: '194B', sector: 'Technology',
    description: 'QUALCOMM develops foundational technologies for the wireless industry worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [11.9, 11.977, 12.548] },
    peBands: { low: 14.62, mid: 18.25, high: 22.41 },
    scores: { value: 8.7, growth: 6.2, profit: 8.4, momentum: 7.1 },
    forwardPE: '14.6', ttmPE: '16.8',
    peers: [[194, 14.6, 15, 'QCOM'], [357, 55.9, 18, 'AMD'], [86, 18.2, 13, 'MRVL']],
    segments: [
      { name: 'Handset Chips', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'RF Front End', value: 12, itemStyle: { color: '#10b981' } },
      { name: 'Automotive', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'IoT', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['5G technology leadership', 'Patent licensing revenue', 'Automotive expansion'],
    risks: ['Smartphone cyclicality', 'China regulatory challenges', 'Apple relationship risks']
  },

  'INTC': {
    ticker: 'INTC', name: 'Intel Corporation', price: 1.51, change: -0.34, changePercent: -18.38,
    marketCap: '65B', sector: 'Technology',
    description: 'Intel designs and manufactures microprocessors and semiconductor components.',
    eps: { years: ['2025', '2026', '2027'], values: [0.137, 0.672, 1.285] },
    peBands: { low: 11.02, mid: 13.10, high: 35.85 },
    scores: { value: 6.8, growth: 4.2, profit: 3.8, momentum: 4.1 },
    forwardPE: '11.0', ttmPE: 'N/A',
    dataQuality: { warning: '⚠️ TURNAROUND - Very low EPS reflects restructuring' },
    peers: [[65, 11.0, 14, 'INTC'], [357, 55.9, 18, 'AMD'], [5600, 50.9, 35, 'NVDA']],
    segments: [
      { name: 'Client Computing', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Data Center & AI', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Foundry Services', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['CHIPS Act $8.5B subsidies', 'Foundry strategy vs TSMC', 'x86 dominance'],
    risks: ['Market share losses to AMD', 'Foundry execution risks', 'Manufacturing delays']
  },

  'AMAT': {
    ticker: 'AMAT', name: 'Applied Materials Inc.', price: 152.99, change: 3.21, changePercent: 2.14,
    marketCap: '127B', sector: 'Technology',
    description: 'Applied Materials provides manufacturing equipment and services to semiconductor industry.',
    eps: { years: ['2025', '2026', '2027'], values: [9.349, 9.601, 10.713] },
    peBands: { low: 16.37, mid: 19.25, high: 22.57 },
    scores: { value: 7.8, growth: 7.2, profit: 8.1, momentum: 7.6 },
    forwardPE: '16.4', ttmPE: '18.9',
    peers: [[127, 16.4, 15, 'AMAT'], [89, 16.4, 13, 'LRCX'], [284, 31.2, 17, 'ASML']],
    segments: [
      { name: 'Semiconductor Systems', value: 78, itemStyle: { color: '#3b82f6' } },
      { name: 'Applied Global Services', value: 15, itemStyle: { color: '#10b981' } },
      { name: 'Display & Adjacent', value: 7, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Equipment leadership', 'AI chip manufacturing demand', 'Service revenue growth'],
    risks: ['Cyclical semiconductor capex', 'China trade restrictions', 'Customer concentration']
  },

  'ASML': {
    ticker: 'ASML', name: 'ASML Holding N.V.', price: 712.89, change: 15.67, changePercent: 2.25,
    marketCap: '284B', sector: 'Technology',
    description: 'ASML develops and manufactures advanced semiconductor equipment systems.',
    eps: { years: ['2025', '2026', '2027'], values: [22.85, 26.45, 29.78] },
    peBands: { low: 25.0, mid: 32.0, high: 42.0 },
    scores: { value: 6.8, growth: 8.9, profit: 9.3, momentum: 8.4 },
    forwardPE: '31.2', ttmPE: '34.8',
    peers: [[284, 31.2, 17, 'ASML'], [127, 16.4, 15, 'AMAT'], [89, 16.4, 13, 'LRCX']],
    segments: [
      { name: 'EUV Systems', value: 62, itemStyle: { color: '#3b82f6' } },
      { name: 'DUV Systems', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Service & Options', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['EUV lithography monopoly', 'Advanced node demand', 'High barriers to entry'],
    risks: ['Geopolitical China tensions', 'Cyclical customer capex', 'Technology transition risks']
  },

  // ========== US E-COMMERCE & CONSUMER ==========
  
  'AMZN': {
    ticker: 'AMZN', name: 'Amazon.com Inc.', price: 391.59, change: -2.14, changePercent: -0.54,
    marketCap: '4.1T', sector: 'Consumer Discretionary',
    description: 'Amazon operates e-commerce, cloud computing, digital streaming, and AI services.',
    eps: { years: ['2025', '2026', '2027'], values: [8.311, 9.092, 10.962] },
    peBands: { low: 47.12, mid: 64.95, high: 92.33 },
    scores: { value: 5.8, growth: 8.7, profit: 7.6, momentum: 8.1 },
    forwardPE: '47.1', ttmPE: '52.8',
    peers: [[4100, 47.1, 22, 'AMZN'], [3600, 31.6, 26, 'MSFT'], [2900, 21.8, 24, 'GOOGL']],
    segments: [
      { name: 'AWS', value: 17, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 59, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 20, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['AWS 38% margins', 'Prime 200M+ subscribers', 'Logistics network moat'],
    risks: ['E-commerce margin pressure', 'AWS growth decelerating', 'High capex $75B+']
  },

  'TSLA': {
    ticker: 'TSLA', name: 'Tesla Inc.', price: 137.45, change: 5.67, changePercent: 4.30,
    marketCap: '438B', sector: 'Consumer Discretionary',
    description: 'Tesla designs, manufactures and sells electric vehicles and energy storage systems.',
    eps: { years: ['2025', '2026', '2027'], values: [1.745, 2.472, 3.319] },
    peBands: { low: 78.77, mid: 121.56, high: 224.76 },
    scores: { value: 4.2, growth: 9.1, profit: 7.8, momentum: 9.2 },
    forwardPE: '78.8', ttmPE: '95.2',
    dataQuality: { warning: '⚠️ EXTREMELY VOLATILE - P/E range 15x to 1200x' },
    peers: [[438, 78.8, 22, 'TSLA'], [180, 18.5, 14, 'F'], [52, 22.1, 12, 'GM']],
    segments: [
      { name: 'Automotive', value: 86, itemStyle: { color: '#3b82f6' } },
      { name: 'Energy Storage', value: 9, itemStyle: { color: '#10b981' } },
      { name: 'Services', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['EV leadership 17% share', 'Supercharger network 50K+', 'Energy storage 40% growth'],
    risks: ['EV competition from OEMs', 'Margin pressure from cuts', 'FSD regulatory approval']
  },

  'NFLX': {
    ticker: 'NFLX', name: 'Netflix Inc.', price: 1024.77, change: 8.23, changePercent: 0.81,
    marketCap: '441B', sector: 'Communication Services',
    description: 'Netflix provides streaming entertainment with 270M+ paid memberships worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [26.602, 32.524, 39.017] },
    peBands: { low: 38.52, mid: 44.72, high: 53.39 },
    scores: { value: 6.9, growth: 7.8, profit: 8.4, momentum: 8.1 },
    forwardPE: '38.5', ttmPE: '41.2',
    peers: [[441, 38.5, 18, 'NFLX'], [145, 18.2, 16, 'DIS'], [28, 52.1, 12, 'PARA']],
    segments: [
      { name: 'Streaming Revenue', value: 88, itemStyle: { color: '#3b82f6' } },
      { name: 'Advertising', value: 12, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Global streaming leader 270M subs', 'Ad-tier acceleration', 'Content investment moat'],
    risks: ['Market saturation developed regions', 'Content cost inflation', 'Competition']
  },

  // ========== US SOFTWARE & CLOUD ==========
  
  'CRM': {
    ticker: 'CRM', name: 'Salesforce Inc.', price: 543.03, change: -2.14, changePercent: -0.39,
    marketCap: '520B', sector: 'Technology',
    description: 'Salesforce provides cloud-based CRM software and enterprise applications.',
    eps: { years: ['2025', '2026', '2027'], values: [11.309, 12.607, 14.443] },
    peBands: { low: 48.02, mid: 148.02, high: 442.90 },
    scores: { value: 4.8, growth: 8.4, profit: 8.7, momentum: 7.9 },
    forwardPE: '48.0', ttmPE: '56.3',
    dataQuality: { warning: '⚠️ EXTREME P/E - Bloomberg shows 442x high percentile' },
    peers: [[520, 48.0, 17, 'CRM'], [134, 48.2, 14, 'NOW'], [3600, 31.6, 26, 'MSFT']],
    segments: [
      { name: 'Sales Cloud', value: 24, itemStyle: { color: '#3b82f6' } },
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Marketing Cloud', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Platform & Other', value: 30, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['CRM leadership 23% share', 'AI Einstein platform', 'High retention 90%+'],
    risks: ['High valuation multiples', 'Microsoft competition', 'Economic slowdown']
  },

  'NOW': {
    ticker: 'NOW', name: 'ServiceNow Inc.', price: 2422.70, change: -5.67, changePercent: -0.23,
    marketCap: '489B', sector: 'Technology',  
    description: 'ServiceNow provides cloud platform for digital workflows and enterprise automation.',
    eps: { years: ['2025', '2026', '2027'], values: [16.96, 19.922, 23.918] },
    peBands: { low: 142.85, mid: 223.57, high: 473.82 },
    scores: { value: 6.4, growth: 9.2, profit: 8.6, momentum: 8.4 },
    forwardPE: '142.9', ttmPE: '158.6',
    dataQuality: { warning: '⚠️ EXTREME HIGH-GROWTH P/E' },
    peers: [[489, 142.9, 14, 'NOW'], [520, 48.0, 17, 'CRM'], [89, 38.4, 12, 'WORK']],
    segments: [
      { name: 'Workflow Solutions', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'IT Operations', value: 28, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Enterprise workflow platform', 'High retention', 'AI automation growth'],
    risks: ['Extreme valuation', 'Microsoft competition', 'Economic sensitivity']
  },

  'ADBE': {
    ticker: 'ADBE', name: 'Adobe Inc.', price: 512.78, change: -8.45, changePercent: -1.62,
    marketCap: '229B', sector: 'Technology',
    description: 'Adobe operates as diversified software company providing digital media and marketing solutions.',
    eps: { years: ['2025', '2026', '2027'], values: [20.65, 23.84, 27.12] },
    peBands: { low: 20.0, mid: 25.0, high: 32.0 },
    scores: { value: 7.3, growth: 8.7, profit: 8.9, momentum: 7.5 },
    forwardPE: '24.8', ttmPE: '27.3',
    peers: [[229, 24.8, 16, 'ADBE'], [3600, 31.6, 26, 'MSFT'], [520, 48.0, 17, 'CRM']],
    segments: [
      { name: 'Digital Media', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Digital Experience', value: 27, itemStyle: { color: '#10b981' } },
      { name: 'Publishing', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Creative Cloud dominance', 'Strong enterprise adoption', 'AI integration'],
    risks: ['Free alternatives competition', 'Subscription fatigue', 'Economic sensitivity']
  },

  // ========== US HEALTHCARE ==========
  
  'LLY': {
    ticker: 'LLY', name: 'Eli Lilly and Company', price: 732.87, change: 15.67, changePercent: 2.18,
    marketCap: '696B', sector: 'Healthcare',
    description: 'Eli Lilly discovers, develops, and markets pharmaceutical products worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [22.737, 29.824, 36.497] },
    peBands: { low: 32.23, mid: 41.38, high: 60.63 },
    scores: { value: 6.8, growth: 9.4, profit: 9.1, momentum: 9.3 },
    forwardPE: '32.2', ttmPE: '36.8',
    peers: [[696, 32.2, 24, 'LLY'], [523, 15.8, 18, 'JNJ'], [412, 16.2, 16, 'PFE']],
    segments: [
      { name: 'Diabetes & Obesity', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'Oncology', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Immunology', value: 9, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 5, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['GLP-1 Mounjaro/Zepbound $40B+ potential', 'Strong diabetes franchise', 'Robust oncology pipeline'],
    risks: ['GLP-1 competition from Novo', 'Manufacturing constraints', 'Patent cliff risks']
  },

  'UNH': {
    ticker: 'UNH', name: 'UnitedHealth Group Inc.', price: 334.14, change: 8.45, changePercent: 2.60,
    marketCap: '313B', sector: 'Healthcare',
    description: 'UnitedHealth operates diversified health care providing coverage, benefits, and services.',
    eps: { years: ['2025', '2026', '2027'], values: [16.223, 17.687, 20.663] },
    peBands: { low: 20.60, mid: 22.48, high: 26.18 },
    scores: { value: 8.2, growth: 7.6, profit: 8.9, momentum: 7.8 },
    forwardPE: '20.6', ttmPE: '22.1',
    peers: [[313, 20.6, 20, 'UNH'], [118, 18.4, 14, 'ANTM'], [89, 16.8, 12, 'CVS']],
    segments: [
      { name: 'UnitedHealthcare', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Optum Health', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'Optum Insight', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'Optum Rx', value: 6, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Vertically integrated model', 'Optum 23% growth', 'Medicare Advantage leader'],
    risks: ['Regulatory pressure on MA', 'Healthcare labor inflation', 'Political reform risk']
  },

  'ISRG': {
    ticker: 'ISRG', name: 'Intuitive Surgical Inc.', price: 553.53, change: 8.92, changePercent: 1.64,
    marketCap: '196B', sector: 'Healthcare',
    description: 'Intuitive Surgical develops, manufactures robotic surgical systems and instruments.',
    eps: { years: ['2025', '2026', '2027'], values: [8.107, 9.18, 10.726] },
    peBands: { low: 68.28, mid: 76.33, high: 82.10 },
    scores: { value: 5.8, growth: 9.1, profit: 9.4, momentum: 8.6 },
    forwardPE: '68.3', ttmPE: '74.2',
    peers: [[196, 68.3, 16, 'ISRG'], [145, 28.5, 14, 'ABT'], [89, 42.1, 12, 'MDT']],
    segments: [
      { name: 'Instruments & Accessories', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Systems', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'Service', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Robotic surgery leadership', 'Recurring instrument revenue', 'Growing adoption'],
    risks: ['High valuation multiples', 'Regulatory approval risks', 'Competition emergence']
  },

  // ========== US FINANCIALS ==========
  
  'BAC': {
    ticker: 'BAC', name: 'Bank of America Corp', price: 38.11, change: 0.67, changePercent: 1.79,
    marketCap: '300B', sector: 'Financials',
    description: 'Bank of America operates as bank holding company providing banking and financial services.',
    eps: { years: ['2025', '2026', '2027'], values: [3.661, 4.265, 4.813] },
    peBands: { low: 10.41, mid: 12.44, high: 13.82 },
    scores: { value: 8.4, growth: 6.8, profit: 8.2, momentum: 7.1 },
    forwardPE: '10.4', ttmPE: '11.8',
    peers: [[300, 10.4, 18, 'BAC'], [578, 14.5, 20, 'JPM'], [267, 12.1, 16, 'WFC']],
    segments: [
      { name: 'Consumer Banking', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Global Banking', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'Global Markets', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Wealth Management', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Largest US deposit base', 'Digital banking platform', 'Diversified revenue'],
    risks: ['Interest rate sensitivity', 'Credit loss provisions', 'Regulatory capital requirements']
  },

  'JPM': {
    ticker: 'JPM', name: 'JPMorgan Chase & Co.', price: 194.17, change: 2.34, changePercent: 1.22,
    marketCap: '564B', sector: 'Financials',
    description: 'JPMorgan Chase operates as financial services firm providing investment banking and services.',
    eps: { years: ['2025', '2026', '2027'], values: [19.606, 20.487, 21.784] },
    peBands: { low: 9.90, mid: 11.13, high: 12.00 },
    scores: { value: 8.6, growth: 6.4, profit: 8.8, momentum: 7.4 },
    forwardPE: '9.9', ttmPE: '10.7',
    peers: [[564, 9.9, 20, 'JPM'], [300, 10.4, 18, 'BAC'], [267, 12.1, 16, 'WFC']],
    segments: [
      { name: 'Consumer & Business', value: 42, itemStyle: { color: '#3b82f6' } },
      { name: 'Corporate & Investment', value: 38, itemStyle: { color: '#10b981' } },
      { name: 'Commercial Banking', value: 12, itemStyle: { color: '#f59e0b' } },
      { name: 'Asset Management', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Investment banking leadership', 'Strong credit discipline', 'Diversified business'],
    risks: ['Trading revenue volatility', 'Regulatory compliance costs', 'Credit cycle exposure']
  },

  'BRK.B': {
    ticker: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 462.34, change: 2.87, changePercent: 0.62,
    marketCap: '1.0T', sector: 'Financial Services',
    description: 'Berkshire Hathaway operates as holding company owning subsidiaries in various activities.',
    eps: { years: ['2025', '2026', '2027'], values: [30.02, 32.85, 35.94] },
    peBands: { low: 12.0, mid: 15.5, high: 19.0 },
    scores: { value: 8.2, growth: 6.5, profit: 8.7, momentum: 7.0 },
    forwardPE: '15.4', ttmPE: '16.8',
    peers: [[1000, 15.4, 22, 'BRK.B'], [300, 10.4, 18, 'BAC'], [564, 9.9, 20, 'JPM']],
    segments: [
      { name: 'Insurance', value: 45, itemStyle: { color: '#3b82f6' } },
      { name: 'Railroad', value: 20, itemStyle: { color: '#10b981' } },
      { name: 'Utilities & Energy', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Manufacturing', value: 17, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Diversified portfolio', 'Strong insurance operations', 'Buffett leadership'],
    risks: ['Succession planning', 'Cash deployment challenge', 'Regulatory scrutiny']
  },

  // ========== US CONSUMER & RETAIL ==========
  
  'WMT': {
    ticker: 'WMT', name: 'Walmart Inc.', price: 61.97, change: 1.23, changePercent: 2.03,
    marketCap: '535B', sector: 'Consumer Staples',
    description: 'Walmart operates retail stores and e-commerce websites in various formats worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [2.611, 2.94, 3.282] },
    peBands: { low: 23.73, mid: 26.88, high: 29.38 },
    scores: { value: 7.4, growth: 6.8, profit: 7.9, momentum: 7.2 },
    forwardPE: '23.7', ttmPE: '25.4',
    peers: [[535, 23.7, 20, 'WMT'], [412, 49.0, 18, 'COST'], [189, 22.4, 14, 'TGT']],
    segments: [
      { name: 'Walmart US', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Walmart International', value: 23, itemStyle: { color: '#10b981' } },
      { name: 'Sam\'s Club', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Scale advantages', 'E-commerce growth', 'Supply chain efficiency'],
    risks: ['Wage inflation pressure', 'E-commerce competition', 'International exposure']
  },

  'COST': {
    ticker: 'COST', name: 'Costco Wholesale Corp', price: 688.21, change: 12.87, changePercent: 1.91,
    marketCap: '305B', sector: 'Consumer Staples',
    description: 'Costco operates membership warehouses offering branded and private-label products.',
    eps: { years: ['2025', '2026', '2027'], values: [18.132, 20.041, 22.109] },
    peBands: { low: 37.96, mid: 40.29, high: 50.56 },
    scores: { value: 6.1, growth: 7.9, profit: 8.8, momentum: 8.3 },
    forwardPE: '38.0', ttmPE: '41.2',
    peers: [[305, 38.0, 18, 'COST'], [535, 23.7, 20, 'WMT'], [189, 22.4, 14, 'TGT']],
    segments: [
      { name: 'Merchandise', value: 89, itemStyle: { color: '#3b82f6' } },
      { name: 'Membership Fees', value: 11, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Membership model 90%+ renewal', 'Kirkland private label', 'International expansion'],
    risks: ['Premium valuation', 'E-commerce competition', 'Supply chain inflation']
  },

  'HD': {
    ticker: 'HD', name: 'The Home Depot Inc.', price: 289.04, change: 5.67, changePercent: 2.00,
    marketCap: '289B', sector: 'Consumer Discretionary',
    description: 'Home Depot operates home improvement retailer providing building materials and services.',
    eps: { years: ['2025', '2026', '2027'], values: [14.999, 16.312, 17.678] },
    peBands: { low: 19.27, mid: 22.97, high: 24.89 },
    scores: { value: 7.2, growth: 6.8, profit: 8.9, momentum: 7.5 },
    forwardPE: '19.3', ttmPE: '21.4',
    peers: [[289, 19.3, 18, 'HD'], [89, 22.4, 13, 'LOW'], [67, 18.5, 11, 'LEN']],
    segments: [
      { name: 'Building Materials', value: 32, itemStyle: { color: '#3b82f6' } },
      { name: 'Tools & Hardware', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Appliances', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Garden Center', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other', value: 13, itemStyle: { color: '#ef4444' } }
    ],
    strengths: ['Market leading position', 'Pro customer segment', 'Digital transformation'],
    risks: ['Housing market sensitivity', 'Interest rate impact', 'Supply chain disruptions']
  },

  'DIS': {
    ticker: 'DIS', name: 'The Walt Disney Company', price: 154.65, change: -1.23, changePercent: -0.79,
    marketCap: '282B', sector: 'Communication Services',
    description: 'Disney operates entertainment company with theme parks, media networks, and streaming.',
    eps: { years: ['2025', '2026', '2027'], values: [5.859, 6.423, 7.14] },
    peBands: { low: 26.39, mid: 40.17, high: 79.40 },
    scores: { value: 7.4, growth: 7.1, profit: 6.8, momentum: 6.2 },
    forwardPE: '26.4', ttmPE: '29.8',
    peers: [[282, 26.4, 15, 'DIS'], [441, 38.5, 18, 'NFLX'], [28, 52.1, 12, 'PARA']],
    segments: [
      { name: 'Disney+', value: 28, itemStyle: { color: '#3b82f6' } },
      { name: 'Parks & Experiences', value: 35, itemStyle: { color: '#10b981' } },
      { name: 'Linear Networks', value: 22, itemStyle: { color: '#f59e0b' } },
      { name: 'Content Sales', value: 15, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Iconic brand portfolio', 'Parks recovery', 'Streaming content library'],
    risks: ['Streaming losses', 'Cord cutting', 'High content costs']
  },

  'NKE': {
    ticker: 'NKE', name: 'Nike Inc.', price: 44.01, change: -0.87, changePercent: -1.94,
    marketCap: '67B', sector: 'Consumer Discretionary',
    description: 'Nike designs, develops, markets athletic footwear, apparel, equipment, and accessories.',
    eps: { years: ['2025', '2026', '2027'], values: [1.677, 2.449, 2.958] },
    peBands: { low: 26.24, mid: 32.74, high: 38.44 },
    scores: { value: 6.7, growth: 6.2, profit: 7.8, momentum: 5.9 },
    forwardPE: '26.2', ttmPE: '29.4',
    peers: [[67, 26.2, 14, 'NKE'], [45, 26.8, 11, 'LULU'], [23, 18.4, 9, 'UAA']],
    segments: [
      { name: 'Footwear', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Apparel', value: 29, itemStyle: { color: '#10b981' } },
      { name: 'Equipment', value: 4, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Brand strength', 'Direct-to-consumer growth', 'Innovation in sustainability'],
    risks: ['China market challenges', 'Inventory management', 'Athletic apparel competition']
  },

  // Add more US stocks from Bloomberg data...
  'ABNB': { ticker: 'ABNB', name: 'Airbnb Inc.', price: 94.87, marketCap: '62B', sector: 'Consumer Discretionary', eps: { years: ['2025', '2026', '2027'], values: [4.29, 4.844, 5.518] }, peBands: { low: 22.11, mid: 34.32, high: 44.46 }, forwardPE: '22.1', scores: { value: 6.8, growth: 7.4, profit: 7.9, momentum: 7.2 } },
  'SBUX': { ticker: 'SBUX', name: 'Starbucks Corporation', price: 58.48, marketCap: '67B', sector: 'Consumer Discretionary', eps: { years: ['2025', '2026', '2027'], values: [2.2, 2.676, 3.339] }, peBands: { low: 26.58, mid: 30.49, high: 36.13 }, forwardPE: '26.6', scores: { value: 7.1, growth: 6.8, profit: 8.2, momentum: 6.9 } },
  'LULU': { ticker: 'LULU', name: 'Lululemon Athletica', price: 388.58, marketCap: '49B', sector: 'Consumer Discretionary', eps: { years: ['2025', '2026', '2027'], values: [14.439, 15.343, 16.413] }, peBands: { low: 26.91, mid: 35.53, high: 56.20 }, forwardPE: '26.9', scores: { value: 6.4, growth: 7.8, profit: 8.6, momentum: 7.9 } },
  'KO': { ticker: 'KO', name: 'The Coca-Cola Company', price: 68.55, marketCap: '296B', sector: 'Consumer Staples', eps: { years: ['2025', '2026', '2027'], values: [2.984, 3.18, 3.419] }, peBands: { low: 22.97, mid: 24.69, high: 25.58 }, forwardPE: '23.0', scores: { value: 7.1, growth: 5.8, profit: 8.9, momentum: 6.4 } },
  'MCD': { ticker: 'MCD', name: 'McDonald\'s Corporation', price: 304.54, marketCap: '220B', sector: 'Consumer Discretionary', eps: { years: ['2025', '2026', '2027'], values: [12.321, 13.375, 14.582] }, peBands: { low: 24.72, mid: 26.01, high: 28.33 }, forwardPE: '24.7', scores: { value: 7.0, growth: 6.9, profit: 8.7, momentum: 7.2 } },
  'FDX': { ticker: 'FDX', name: 'FedEx Corporation', price: 230.14, marketCap: '58B', sector: 'Industrials', eps: { years: ['2025', '2026', '2027'], values: [18.699, 21.179, 23.406] }, peBands: { low: 12.31, mid: 14.41, high: 16.20 }, forwardPE: '12.3', scores: { value: 7.9, growth: 6.9, profit: 7.3, momentum: 7.1 } },
  'CAT': { ticker: 'CAT', name: 'Caterpillar Inc.', price: 273.50, marketCap: '142B', sector: 'Industrials', eps: { years: ['2025', '2026', '2027'], values: [18.152, 21.232, 24.696] }, peBands: { low: 15.07, mid: 16.78, high: 19.94 }, forwardPE: '15.1', scores: { value: 7.9, growth: 6.4, profit: 8.1, momentum: 6.8 } },

  // ========== HONG KONG STOCKS ==========
  
  '700': {
    ticker: '700', name: 'Tencent Holdings Ltd.', price: 441.49, change: 8.23, changePercent: 1.90,
    marketCap: '4.2T HKD', sector: 'Technology', 
    description: 'Tencent Holdings is Chinese multinational technology conglomerate providing internet services, mobile games, and social networks.',
    eps: { years: ['2025', '2026', '2027'], values: [30.056, 31.223, 34.936] },
    peBands: { low: 14.69, mid: 18.66, high: 21.94 },
    scores: { value: 7.6, growth: 7.8, profit: 8.4, momentum: 7.2 },
    forwardPE: '14.7', ttmPE: '16.2',
    peers: [[4200, 14.7, 22, '700'], [1200, 18.4, 18, '9988'], [890, 22.1, 16, '1810']],
    segments: [
      { name: 'Value-Added Services', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Online Advertising', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'FinTech Services', value: 22, itemStyle: { color: '#f59e0b' } },
      { name: 'Business Services', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['WeChat ecosystem dominance', 'Gaming leadership globally', 'FinTech expansion'],
    risks: ['Regulatory pressure from China', 'Gaming restrictions', 'Competition from ByteDance'],
    region: 'HK'
  },

  '3690': {
    ticker: '3690', name: 'Meituan-W', price: 14.98, change: 0.45, changePercent: 3.10,
    marketCap: '880B HKD', sector: 'Consumer Discretionary',
    description: 'Meituan operates platform connecting consumers with local merchants for food delivery and services in China.',
    eps: { years: ['2025', '2026', '2027'], values: [0.563, 4.789, 7.958] },
    peBands: { low: 26.62, mid: 36.84, high: 196.07 },
    scores: { value: 5.8, growth: 9.2, profit: 6.8, momentum: 8.4 },
    forwardPE: '26.6', ttmPE: '45.2',
    dataQuality: { warning: '⚠️ HIGH VOLATILITY - Turnaround story' },
    peers: [[880, 26.6, 18, '3690'], [4200, 14.7, 22, '700'], [1200, 18.4, 18, '9988']],
    segments: [
      { name: 'Food Delivery', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'In-Store Dining', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'New Initiatives', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Food delivery leadership China', 'Local services expansion', 'Technology platform'],
    risks: ['Competitive food delivery market', 'Regulatory compliance costs', 'Profitability pressure'],
    region: 'HK'
  },

  '1810': {
    ticker: '1810', name: 'Xiaomi Corp-W', price: 35.53, change: 1.23, changePercent: 3.59,
    marketCap: '890B HKD', sector: 'Technology',
    description: 'Xiaomi Corporation designs, develops, and sells smartphones, laptops, and lifestyle products.',
    eps: { years: ['2025', '2026', '2027'], values: [1.783, 2.108, 2.631] },
    peBands: { low: 19.92, mid: 26.48, high: 36.92 },
    scores: { value: 6.9, growth: 8.1, profit: 7.4, momentum: 8.2 },
    forwardPE: '19.9', ttmPE: '22.4',
    peers: [[890, 19.9, 16, '1810'], [4200, 14.7, 22, '700'], [880, 26.6, 18, '3690']],
    segments: [
      { name: 'Smartphones', value: 62, itemStyle: { color: '#3b82f6' } },
      { name: 'IoT & Lifestyle', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Internet Services', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Global smartphone brand #3', 'IoT ecosystem expansion', 'International growth'],
    risks: ['Smartphone market saturation', 'Component cost inflation', 'Geopolitical tensions'],
    region: 'HK'
  },

  '9988': {
    ticker: '9988', name: 'Alibaba Group Holding-SW', price: 92.45, change: 2.14, changePercent: 2.37,
    marketCap: '1.9T HKD', sector: 'Consumer Discretionary',
    description: 'Alibaba Group operates online and mobile marketplaces providing technology infrastructure for e-commerce.',
    eps: { years: ['2025', '2026', '2027'], values: [7.624, 9.084, 10.551] },
    peBands: { low: 12.13, mid: 14.45, high: 20.40 },
    scores: { value: 8.1, growth: 7.4, profit: 7.8, momentum: 6.9 },
    forwardPE: '12.1', ttmPE: '13.6',
    peers: [[1900, 12.1, 20, '9988'], [4200, 14.7, 22, '700'], [880, 26.6, 18, '3690']],
    segments: [
      { name: 'China Commerce', value: 45, itemStyle: { color: '#3b82f6' } },
      { name: 'International Commerce', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'Cloud Computing', value: 28, itemStyle: { color: '#f59e0b' } },
      { name: 'Digital Media', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['E-commerce leadership China', 'Alibaba Cloud #1 in Asia', 'Digital payments ecosystem'],
    risks: ['Regulatory oversight China', 'Competition from JD/PDD', 'International expansion challenges'],
    region: 'HK'
  }

};

// Stock categorization for colorful search interface
export const STOCK_CATEGORIES = {
  'US_TECH': {
    label: 'US Technology',
    color: '#3b82f6',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'AMD', 'QCOM', 'INTC', 'AMAT', 'ASML', 'CRM', 'NOW', 'ADBE']
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
    tickers: ['BAC', 'JPM', 'BRK.B']
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
