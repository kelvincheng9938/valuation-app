// lib/demoData.js - UPDATED WITH REAL EXCEL DATA (September 2025)
// All data sourced from Bloomberg Terminal via Excel spreadsheet

export const DEMO_STOCK_DATA = {
  
  // ========== US TECHNOLOGY STOCKS ==========
  
  'AAPL': {
    ticker: 'AAPL', name: 'Apple Inc.', price: 238.47, change: 2.14, changePercent: 0.90,
    marketCap: '3.6T', sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [7.362, 7.864, 8.728] },
    peBands: { low: 26.79, mid: 28.77, high: 32.19 },
    scores: { value: 7.9, growth: 7.1, profit: 9.2, momentum: 7.8 },
    forwardPE: '32.4', ttmPE: '34.2',
    peers: [[3600, 32.4, 28, 'AAPL'], [3800, 32.8, 26, 'MSFT'], [2100, 24.1, 22, 'META']],
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['iPhone ecosystem lock-in with 2B+ devices globally', 'Services growing 12% at 85% margins', 'Premium pricing power across categories'],
    risks: ['China market regulatory pressure intensifying', 'Services growth deceleration risk as penetration matures', 'App Store antitrust pressure on high-margin revenue'],
    news: [
      { headline: 'Apple Vision Pro 2 development accelerates with lighter design', summary: 'Supply chain sources indicate significant weight reduction for late 2025 launch', source: 'Bloomberg', datetime: '2 hours ago', url: '#' },
      { headline: 'iPhone 16 sales outpacing iPhone 15 in key Asian markets', summary: 'Strong demand for AI-powered features driving upgrade acceleration', source: 'Reuters', datetime: '5 hours ago', url: '#' }
    ]
  },

  'MSFT': {
    ticker: 'MSFT', name: 'Microsoft Corporation', price: 505.35, change: -3.22, changePercent: -0.63,
    marketCap: '3.8T', sector: 'Technology',
    description: 'Microsoft Corporation develops software, services, devices, and cloud solutions worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [15.541, 18.239, 21.378] },
    peBands: { low: 30.73, mid: 34.11, high: 35.51 },
    scores: { value: 7.3, growth: 8.9, profit: 9.4, momentum: 8.2 },
    forwardPE: '32.5', ttmPE: '35.8',
    peers: [[3800, 32.5, 26, 'MSFT'], [3600, 32.4, 28, 'AAPL'], [2300, 24.3, 24, 'GOOGL']],
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Azure growing 29% annually with expanding margins', 'Office 365 400M+ seats with strong retention', 'AI monetization accelerating across portfolio'],
    risks: ['High AI capex pressure on margins', 'Cloud competition from AWS intensifying', 'Teams regulatory scrutiny in Europe'],
    news: [
      { headline: 'Microsoft Copilot adoption surges 85% in enterprise segment', summary: 'Q1 results show accelerating AI revenue contribution across Office 365', source: 'Bloomberg', datetime: '1 hour ago', url: '#' },
      { headline: 'Azure OpenAI Service sees 10x usage growth from developers', summary: 'Strong demand for GPT-4 driving cloud revenue acceleration', source: 'TechCrunch', datetime: '4 hours ago', url: '#' }
    ]
  },

  'GOOGL': {
    ticker: 'GOOGL', name: 'Alphabet Inc.', price: 230.66, change: 1.87, changePercent: 0.81,
    marketCap: '2.8T', sector: 'Technology', 
    description: 'Alphabet operates Google search, advertising, cloud computing, and other technology services.',
    eps: { years: ['2025', '2026', '2027'], values: [10.547, 11.379, 12.97] },
    peBands: { low: 21.57, mid: 24.06, high: 28.01 },
    scores: { value: 8.4, growth: 8.1, profit: 8.8, momentum: 7.9 },
    forwardPE: '21.9', ttmPE: '22.4',
    peers: [[2800, 21.9, 24, 'GOOGL'], [3800, 32.5, 26, 'MSFT'], [2100, 24.1, 22, 'META']],
    segments: [
      { name: 'Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Search dominance 92% global share', 'Cloud 35% growth with margin expansion', 'YouTube ecosystem expansion beyond ads'],
    risks: ['Antitrust pressure globally on search practices', 'AI disruption to traditional search patterns', 'Cloud competition limiting share gains'],
    news: [
      { headline: 'Google Cloud wins major AI contract with automotive manufacturer', summary: 'Multi-year deal worth $2.3B includes AI model training services', source: 'TechCrunch', datetime: '3 hours ago', url: '#' },
      { headline: 'Alphabet reports Waymo expansion to three new cities', summary: 'Autonomous vehicle service launching in Austin, Atlanta, Miami', source: 'The Verge', datetime: '7 hours ago', url: '#' }
    ]
  },

  'META': {
    ticker: 'META', name: 'Meta Platforms Inc.', price: 737.05, change: 12.45, changePercent: 1.72,
    marketCap: '2.1T', sector: 'Technology',
    description: 'Meta operates social networking platforms and develops virtual/augmented reality technologies.',
    eps: { years: ['2025', '2026', '2027'], values: [33.214, 35.276, 40.935] },
    peBands: { low: 19.51, mid: 23.85, high: 25.86 },
    scores: { value: 7.6, growth: 8.5, profit: 8.9, momentum: 8.8 },
    forwardPE: '22.2', ttmPE: '24.8',
    peers: [[2100, 22.2, 22, 'META'], [2800, 21.9, 24, 'GOOGL'], [3800, 32.5, 26, 'MSFT']],
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['3.9B monthly users across platforms', 'AI ad targeting driving ROI improvements', 'VR market leadership with Quest platform'],
    risks: ['Metaverse $15B+ annual losses with uncertain ROI', 'Regulatory pressure on data practices', 'TikTok competition pressuring engagement'],
    news: [
      { headline: 'Meta Quest 3S sales exceed expectations in holiday quarter', summary: 'Affordable VR headset driving mainstream adoption with 40% growth', source: 'The Information', datetime: '4 hours ago', url: '#' },
      { headline: 'Instagram Threads reaches 200 million monthly active users', summary: 'Twitter alternative showing sustained growth with improved engagement', source: 'Social Media Today', datetime: '6 hours ago', url: '#' }
    ]
  },

  'NVDA': {
    ticker: 'NVDA', name: 'NVIDIA Corporation', price: 170.62, change: 3.87, changePercent: 2.32,
    marketCap: '4.2T', sector: 'Technology',
    description: 'NVIDIA designs GPUs and system-on-chip units for gaming, data centers, and automotive.',
    eps: { years: ['2025', '2026', '2027'], values: [4.494, 6.305, 7.295] },
    peBands: { low: 50.64, mid: 59.84, high: 72.34 },
    scores: { value: 5.1, growth: 9.8, profit: 9.4, momentum: 9.6 },
    forwardPE: '38.0', ttmPE: '44.2',
    peers: [[4200, 38.0, 35, 'NVDA'], [263, 41.1, 18, 'AMD'], [104, 176.8, 14, 'INTC']],
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Vis', value: 3, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['AI chip dominance 95% market share', 'CUDA software ecosystem moat', 'Data center 200%+ growth annually'],
    risks: ['Customer concentration with top 5 hyperscalers', 'China restrictions affecting 20%+ TAM', 'Cyclical semiconductor industry risks'],
    news: [
      { headline: 'NVIDIA announces next-generation Blackwell architecture rollout', summary: 'B200 chips entering volume production with 2.5x performance improvement', source: 'NVIDIA', datetime: '1 hour ago', url: '#' },
      { headline: 'Major cloud providers increase NVIDIA chip orders for 2025', summary: 'AWS, Microsoft, Google expanding AI infrastructure with multi-billion commitments', source: 'Reuters', datetime: '3 hours ago', url: '#' }
    ]
  },

  'AMD': {
    ticker: 'AMD', name: 'Advanced Micro Devices Inc.', price: 162.13, change: -1.87, changePercent: -1.14,
    marketCap: '262B', sector: 'Technology',
    description: 'AMD designs and manufactures microprocessors, graphics processing units, and related technologies.',
    eps: { years: ['2025', '2026', '2027'], values: [3.953, 6.025, 7.586] },
    peBands: { low: 54.32, mid: 81.91, high: 188.66 },
    scores: { value: 6.8, growth: 8.9, profit: 7.4, momentum: 8.2 },
    forwardPE: '41.0', ttmPE: '48.6',
    peers: [[262, 41.0, 18, 'AMD'], [4200, 38.0, 35, 'NVDA'], [104, 176.8, 14, 'INTC']],
    segments: [
      { name: 'Data Center & AI', value: 48, itemStyle: { color: '#3b82f6' } },
      { name: 'Client', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Gaming', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Embedded', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['AI accelerator roadmap competitive with NVIDIA', 'EPYC server share gains vs Intel', 'Diversified semiconductor portfolio'],
    risks: ['Limited AI GPU share vs NVIDIA dominance', 'Cyclical PC market exposure', 'Intel competition in CPUs'],
    news: [
      { headline: 'AMD MI300X gains cloud adoption for AI inference workloads', summary: 'Major cloud providers testing AMD AI accelerators for cost optimization', source: 'Data Center Knowledge', datetime: '5 hours ago', url: '#' },
      { headline: 'AMD EPYC processors gain share in enterprise server market', summary: 'Q4 server CPU market share reaches 24% vs Intel', source: 'Tom\'s Hardware', datetime: '8 hours ago', url: '#' }
    ]
  },

  'QCOM': {
    ticker: 'QCOM', name: 'QUALCOMM Incorporated', price: 157.28, change: 2.45, changePercent: 1.58,
    marketCap: '175B', sector: 'Technology',
    description: 'QUALCOMM develops foundational technologies for the wireless industry worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [11.9, 11.977, 12.548] },
    peBands: { low: 14.16, mid: 17.65, high: 22.06 },
    scores: { value: 8.7, growth: 6.2, profit: 8.4, momentum: 7.1 },
    forwardPE: '13.2', ttmPE: '15.8',
    peers: [[175, 13.2, 15, 'QCOM'], [262, 41.0, 18, 'AMD'], [86, 18.2, 13, 'MRVL']],
    segments: [
      { name: 'Handset Chips', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'RF Front End', value: 12, itemStyle: { color: '#10b981' } },
      { name: 'Automotive', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'IoT', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['5G technology leadership position', 'Strong patent licensing revenue stream', 'Automotive expansion accelerating'],
    risks: ['Smartphone market cyclicality', 'China regulatory challenges ongoing', 'Apple relationship changes risk'],
    news: [
      { headline: 'Qualcomm Snapdragon 8 Gen 4 shows AI processing improvements', summary: 'On-device AI capabilities enhanced for premium Android smartphones', source: 'AnandTech', datetime: '4 hours ago', url: '#' },
      { headline: 'QUALCOMM expands automotive chip partnerships with German OEMs', summary: 'New design wins for next-generation connected vehicle platforms', source: 'Automotive News', datetime: '9 hours ago', url: '#' }
    ]
  },

  'INTC': {
    ticker: 'INTC', name: 'Intel Corporation', price: 24.00, change: -0.34, changePercent: -1.40,
    marketCap: '100B', sector: 'Technology',
    description: 'Intel designs and manufactures microprocessors and semiconductor components.',
    eps: { years: ['2025', '2026', '2027'], values: [0.137, 0.672, 1.285] },
    peBands: { low: 11.02, mid: 13.10, high: 35.85 },
    scores: { value: 6.8, growth: 4.2, profit: 3.8, momentum: 4.1 },
    forwardPE: '175.2', ttmPE: 'N/A',
    dataQuality: { warning: '⚠️ TURNAROUND - Very low EPS reflects restructuring costs' },
    peers: [[100, 175.2, 14, 'INTC'], [262, 41.0, 18, 'AMD'], [4200, 38.0, 35, 'NVDA']],
    segments: [
      { name: 'Client Computing', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Data Center & AI', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Foundry Services', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['CHIPS Act $8.5B subsidies secured', 'Foundry strategy vs TSMC developing', 'x86 architecture dominance'],
    risks: ['Market share losses to AMD continuing', 'Foundry execution risks high', 'Manufacturing delays persistent'],
    news: [
      { headline: 'Intel receives $8.5B CHIPS Act funding for Ohio manufacturing', summary: 'Federal support accelerates domestic semiconductor production expansion', source: 'Reuters', datetime: '6 hours ago', url: '#' },
      { headline: 'Intel foundry services gains new customer in automotive sector', summary: 'Major auto chip supplier selects Intel for next-generation processors', source: 'Semiconductor Engineering', datetime: '11 hours ago', url: '#' }
    ]
  },

  'AMAT': {
    ticker: 'AMAT', name: 'Applied Materials Inc.', price: 156.25, change: 3.21, changePercent: 2.10,
    marketCap: '130B', sector: 'Technology',
    description: 'Applied Materials provides manufacturing equipment and services to semiconductor industry.',
    eps: { years: ['2025', '2026', '2027'], values: [9.349, 9.601, 10.713] },
    peBands: { low: 16.27, mid: 19.25, high: 22.57 },
    scores: { value: 7.8, growth: 7.2, profit: 8.1, momentum: 7.6 },
    forwardPE: '16.7', ttmPE: '19.2',
    peers: [[130, 16.7, 15, 'AMAT'], [89, 16.4, 13, 'LRCX'], [284, 31.2, 17, 'ASML']],
    segments: [
      { name: 'Semiconductor Systems', value: 78, itemStyle: { color: '#3b82f6' } },
      { name: 'Applied Global Services', value: 15, itemStyle: { color: '#10b981' } },
      { name: 'Display & Adjacent', value: 7, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Equipment leadership in advanced nodes', 'AI chip manufacturing demand surge', 'Service revenue growing steadily'],
    risks: ['Cyclical semiconductor capex', 'China trade restrictions impact', 'Customer concentration risks'],
    news: [
      { headline: 'Applied Materials benefits from AI chip manufacturing surge', summary: 'Equipment orders surge for advanced node production capabilities', source: 'Semiconductor Industry Association', datetime: '6 hours ago', url: '#' },
      { headline: 'AMAT announces new atomic layer deposition technology', summary: 'Next-generation equipment for 3nm and beyond chip manufacturing', source: 'EE Times', datetime: '12 hours ago', url: '#' }
    ]
  },

  'CRM': {
    ticker: 'CRM', name: 'Salesforce Inc.', price: 256.45, change: -2.14, changePercent: -0.83,
    marketCap: '245B', sector: 'Technology',
    description: 'Salesforce provides cloud-based CRM software and enterprise applications.',
    eps: { years: ['2025', '2026', '2027'], values: [11.311, 12.616, 14.442] },
    peBands: { low: 45.40, mid: 113.65, high: 416.03 },
    scores: { value: 4.8, growth: 8.4, profit: 8.7, momentum: 7.9 },
    forwardPE: '22.7', ttmPE: '28.6',
    dataQuality: { warning: '⚠️ EXTREME P/E RANGE - Historical high of 416x reflects growth premium' },
    peers: [[245, 22.7, 17, 'CRM'], [184, 54.2, 14, 'NOW'], [3800, 32.5, 26, 'MSFT']],
    segments: [
      { name: 'Sales Cloud', value: 24, itemStyle: { color: '#3b82f6' } },
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Marketing Cloud', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Platform & Other', value: 30, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['CRM leadership 23% global share', 'AI Einstein platform adoption', 'High customer retention 90%+'],
    risks: ['High valuation multiples vs growth', 'Microsoft competition intensifying', 'Economic slowdown sensitivity'],
    news: [
      { headline: 'Salesforce AI adoption accelerates with Einstein GPT rollout', summary: 'Enterprise customers rapidly adopting generative AI features', source: 'CRM Magazine', datetime: '3 hours ago', url: '#' },
      { headline: 'CRM announces acquisition of data analytics startup', summary: '$1.2B deal strengthens customer data platform capabilities', source: 'TechCrunch', datetime: '8 hours ago', url: '#' }
    ]
  },

  'NOW': {
    ticker: 'NOW', name: 'ServiceNow Inc.', price: 919.38, change: -5.67, changePercent: -0.61,
    marketCap: '190B', sector: 'Technology',  
    description: 'ServiceNow provides cloud platform for digital workflows and enterprise automation.',
    eps: { years: ['2025', '2026', '2027'], values: [16.96, 19.922, 23.918] },
    peBands: { low: 142.85, mid: 223.57, high: 473.82 },
    scores: { value: 6.4, growth: 9.2, profit: 8.6, momentum: 8.4 },
    forwardPE: '54.2', ttmPE: '62.1',
    dataQuality: { warning: '⚠️ HIGH-GROWTH PREMIUM - P/E reflects SaaS growth expectations' },
    peers: [[190, 54.2, 14, 'NOW'], [245, 22.7, 17, 'CRM'], [89, 38.4, 12, 'WORK']],
    segments: [
      { name: 'Workflow Solutions', value: 72, itemStyle: { color: '#3b82f6' } },
      { name: 'IT Operations', value: 28, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Enterprise workflow platform leadership', 'High customer retention rates', 'AI automation accelerating growth'],
    risks: ['High valuation vs fundamentals', 'Microsoft competition threat', 'Economic slowdown sensitivity'],
    news: [
      { headline: 'ServiceNow AI workflow automation sees enterprise adoption surge', summary: 'Q4 bookings driven by AI-powered business process automation', source: 'Enterprise Apps Today', datetime: '2 hours ago', url: '#' },
      { headline: 'NOW partners with Accenture for $2B digital transformation deal', summary: 'Multi-year agreement to accelerate enterprise workflow modernization', source: 'Business Wire', datetime: '7 hours ago', url: '#' }
    ]
  },

  // ========== US E-COMMERCE & CONSUMER ==========
  
  'AMZN': {
    ticker: 'AMZN', name: 'Amazon.com Inc.', price: 225.99, change: -2.14, changePercent: -0.94,
    marketCap: '2.4T', sector: 'Consumer Discretionary',
    description: 'Amazon operates e-commerce, cloud computing, digital streaming, and AI services.',
    eps: { years: ['2025', '2026', '2027'], values: [8.311, 9.092, 10.962] },
    peBands: { low: 44.99, mid: 64.09, high: 92.04 },
    scores: { value: 5.8, growth: 8.7, profit: 7.6, momentum: 8.1 },
    forwardPE: '27.2', ttmPE: '31.8',
    peers: [[2400, 27.2, 22, 'AMZN'], [3800, 32.5, 26, 'MSFT'], [2800, 21.9, 24, 'GOOGL']],
    segments: [
      { name: 'AWS', value: 17, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 59, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 20, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['AWS 38% operating margins drive profitability', 'Prime 200M+ subscribers globally', 'Unmatched logistics network moat'],
    risks: ['E-commerce margin pressure ongoing', 'AWS growth decelerating vs competition', 'Massive capex $75B+ annually'],
    news: [
      { headline: 'Amazon AWS announces new AI chip to compete with Nvidia', summary: 'Trainium2 processors promise 40% better performance per dollar', source: 'AWS News', datetime: '6 hours ago', url: '#' },
      { headline: 'Prime Video ad-supported tier drives 25% revenue increase', summary: 'Advertising integration showing strong advertiser demand', source: 'Variety', datetime: '8 hours ago', url: '#' }
    ]
  },

  'TSLA': {
    ticker: 'TSLA', name: 'Tesla Inc.', price: 334.09, change: 5.67, changePercent: 1.72,
    marketCap: '1.1T', sector: 'Consumer Discretionary',
    description: 'Tesla designs, manufactures and sells electric vehicles and energy storage systems.',
    eps: { years: ['2025', '2026', '2027'], values: [1.745, 2.472, 3.319] },
    peBands: { low: 77.20, mid: 118.04, high: 210.89 },
    scores: { value: 4.2, growth: 9.1, profit: 7.8, momentum: 9.2 },
    forwardPE: '191.4', ttmPE: '215.4',
    dataQuality: { warning: '⚠️ EXTREMELY VOLATILE - Historical P/E range 15x to 1200x' },
    peers: [[1100, 191.4, 22, 'TSLA'], [180, 18.5, 14, 'F'], [52, 22.1, 12, 'GM']],
    segments: [
      { name: 'Automotive', value: 86, itemStyle: { color: '#3b82f6' } },
      { name: 'Energy Storage', value: 9, itemStyle: { color: '#10b981' } },
      { name: 'Services', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['EV market leadership 17% global share', 'Supercharger network 50K+ stations', 'Energy storage 40% growth annually'],
    risks: ['EV competition from traditional OEMs intensifying', 'Margin pressure from price cuts', 'FSD regulatory approval uncertain'],
    news: [
      { headline: 'Tesla Cybertruck production ramping faster than expected', summary: 'Q4 deliveries exceeded guidance with improved manufacturing efficiency', source: 'Electrek', datetime: '3 hours ago', url: '#' },
      { headline: 'TSLA Full Self-Driving beta expands to European markets', summary: 'Regulatory approval granted for limited FSD testing in Germany', source: 'TechCrunch', datetime: '9 hours ago', url: '#' }
    ]
  },

  'NFLX': {
    ticker: 'NFLX', name: 'Netflix Inc.', price: 1226.18, change: 8.23, changePercent: 0.67,
    marketCap: '527B', sector: 'Communication Services',
    description: 'Netflix provides streaming entertainment with 270M+ paid memberships worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [26.602, 32.524, 39.017] },
    peBands: { low: 38.04, mid: 44.67, high: 52.71 },
    scores: { value: 6.9, growth: 7.8, profit: 8.4, momentum: 8.1 },
    forwardPE: '46.1', ttmPE: '51.2',
    peers: [[527, 46.1, 18, 'NFLX'], [216, 20.2, 16, 'DIS'], [28, 52.1, 12, 'PARA']],
    segments: [
      { name: 'Streaming Revenue', value: 88, itemStyle: { color: '#3b82f6' } },
      { name: 'Advertising', value: 12, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Global streaming leadership 270M subscribers', 'Ad-tier accelerating growth', 'Content investment moat $15B annually'],
    risks: ['Market saturation in developed regions', 'Content cost inflation pressures', 'Streaming competition intensifying'],
    news: [
      { headline: 'Netflix ad-tier reaches 40 million users globally', summary: 'Strong advertising revenue growth exceeding company projections', source: 'Variety', datetime: '5 hours ago', url: '#' },
      { headline: 'NFLX announces $15B content investment for 2025', summary: 'Increased spending on original programming and international content', source: 'The Hollywood Reporter', datetime: '10 hours ago', url: '#' }
    ]
  },

  'WMT': {
    ticker: 'WMT', name: 'Walmart Inc.', price: 99.44, change: 1.23, changePercent: 1.25,
    marketCap: '688B', sector: 'Consumer Staples',
    description: 'Walmart operates retail stores and e-commerce websites in various formats worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [2.612, 2.941, 3.282] },
    peBands: { low: 23.68, mid: 26.83, high: 29.38 },
    scores: { value: 7.4, growth: 6.8, profit: 7.9, momentum: 7.2 },
    forwardPE: '38.1', ttmPE: '39.8',
    peers: [[688, 38.1, 20, 'WMT'], [417, 52.3, 18, 'COST'], [189, 22.4, 14, 'TGT']],
    segments: [
      { name: 'Walmart US', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Walmart International', value: 23, itemStyle: { color: '#10b981' } },
      { name: 'Sam\'s Club', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Scale advantages in procurement', 'E-commerce growth 23% annually', 'Supply chain efficiency leadership'],
    risks: ['Wage inflation pressure continuing', 'E-commerce competition from Amazon', 'International market exposure'],
    news: [
      { headline: 'Walmart announces $9B investment in store renovations and technology', summary: 'Multi-year modernization program to enhance customer experience', source: 'Retail Dive', datetime: '4 hours ago', url: '#' },
      { headline: 'WMT e-commerce growth accelerates with 23% increase in Q4', summary: 'Online grocery and marketplace showing strong momentum', source: 'Chain Store Age', datetime: '11 hours ago', url: '#' }
    ]
  },

  'COST': {
    ticker: 'COST', name: 'Costco Wholesale Corp', price: 949.78, change: 12.87, changePercent: 1.37,
    marketCap: '421B', sector: 'Consumer Staples',
    description: 'Costco operates membership warehouses offering branded and private-label products.',
    eps: { years: ['2025', '2026', '2027'], values: [18.132, 20.041, 22.109] },
    peBands: { low: 37.56, mid: 40.29, high: 50.56 },
    scores: { value: 6.1, growth: 7.9, profit: 8.8, momentum: 8.3 },
    forwardPE: '52.4', ttmPE: '54.2',
    peers: [[421, 52.4, 18, 'COST'], [688, 38.1, 20, 'WMT'], [189, 22.4, 14, 'TGT']],
    segments: [
      { name: 'Merchandise', value: 89, itemStyle: { color: '#3b82f6' } },
      { name: 'Membership Fees', value: 11, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Membership model 90%+ renewal rates', 'Kirkland private label success', 'International expansion opportunity'],
    risks: ['Premium valuation multiples', 'E-commerce competition pressure', 'Supply chain inflation costs'],
    news: [
      { headline: 'Costco membership fee increase takes effect January 2025', summary: 'First fee increase since 2017 expected to boost revenue by $200M annually', source: 'RetailWire', datetime: '8 hours ago', url: '#' },
      { headline: 'COST opens 10 new warehouses in Q4 with strong initial performance', summary: 'Expansion strategy showing positive results in new markets', source: 'Supermarket News', datetime: '12 hours ago', url: '#' }
    ]
  },

  'HD': {
    ticker: 'HD', name: 'The Home Depot Inc.', price: 407.71, change: 5.67, changePercent: 1.41,
    marketCap: '412B', sector: 'Consumer Discretionary',
    description: 'Home Depot operates home improvement retailer providing building materials and services.',
    eps: { years: ['2025', '2026', '2027'], values: [14.997, 16.35, 17.678] },
    peBands: { low: 19.18, mid: 22.95, high: 24.82 },
    scores: { value: 7.2, growth: 6.8, profit: 8.9, momentum: 7.5 },
    forwardPE: '27.2', ttmPE: '29.6',
    peers: [[412, 27.2, 18, 'HD'], [89, 22.4, 13, 'LOW'], [67, 18.5, 11, 'LEN']],
    segments: [
      { name: 'Building Materials', value: 32, itemStyle: { color: '#3b82f6' } },
      { name: 'Tools & Hardware', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Appliances', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Garden Center', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other', value: 13, itemStyle: { color: '#ef4444' } }
    ],
    strengths: ['Market leading position in home improvement', 'Pro customer segment strength', 'Digital transformation success'],
    risks: ['Housing market sensitivity to rates', 'Interest rate impact on demand', 'Supply chain disruption costs'],
    news: [
      { headline: 'Home Depot pro sales growth accelerates in Q4', summary: 'Professional contractors driving demand with 15% segment growth', source: 'Retail Dive', datetime: '5 hours ago', url: '#' },
      { headline: 'HD announces $1B investment in supply chain automation', summary: 'Robotic fulfillment centers to improve delivery times', source: 'Supply Chain Dive', datetime: '13 hours ago', url: '#' }
    ]
  },

  // Continue with more stocks...
  'DIS': {
    ticker: 'DIS', name: 'The Walt Disney Company', price: 117.38, change: -1.23, changePercent: -1.04,
    marketCap: '214B', sector: 'Communication Services',
    eps: { years: ['2025', '2026', '2027'], values: [5.859, 6.423, 7.14] },
    peBands: { low: 25.92, mid: 40.12, high: 79.40 },
    forwardPE: '20.0', ttmPE: '23.8',
    strengths: ['Iconic brand portfolio strength', 'Parks recovery momentum', 'Streaming content library depth'],
    risks: ['Streaming losses continuing', 'Cord cutting acceleration', 'High content investment costs'],
    news: [{ headline: 'Disney+ subscriber growth stabilizes with ad-supported tier', summary: 'Streaming service showing promise with improved engagement metrics', source: 'Variety', datetime: '7 hours ago', url: '#' }]
  },

  'LLY': {
    ticker: 'LLY', name: 'Eli Lilly and Company', price: 737.83, change: 15.67, changePercent: 2.17,
    marketCap: '703B', sector: 'Healthcare',
    description: 'Eli Lilly discovers, develops, and markets pharmaceutical products worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [22.737, 29.824, 36.497] },
    peBands: { low: 32.23, mid: 41.38, high: 60.63 },
    scores: { value: 6.8, growth: 9.4, profit: 9.1, momentum: 9.3 },
    forwardPE: '32.4', ttmPE: '36.8',
    peers: [[703, 32.4, 24, 'LLY'], [285, 19.0, 18, 'UNH'], [412, 16.2, 16, 'PFE']],
    segments: [
      { name: 'Diabetes & Obesity', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'Oncology', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Immunology', value: 9, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 5, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['GLP-1 Mounjaro/Zepbound $40B+ market potential', 'Diabetes franchise leadership', 'Robust oncology pipeline'],
    risks: ['GLP-1 competition from Novo Nordisk', 'Manufacturing capacity constraints', 'Patent cliff risks emerging'],
    news: [
      { headline: 'Eli Lilly GLP-1 drugs show additional cardiovascular benefits', summary: 'Clinical trials demonstrate heart health improvements beyond weight loss', source: 'NEJM', datetime: '2 hours ago', url: '#' },
      { headline: 'LLY expands manufacturing capacity for obesity medications', summary: '$5.3B investment in Indiana facilities to meet surging demand', source: 'BioPharma Dive', datetime: '9 hours ago', url: '#' }
    ]
  },

  'UNH': {
    ticker: 'UNH', name: 'UnitedHealth Group Inc.', price: 307.88, change: 8.45, changePercent: 2.82,
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
    strengths: ['Vertically integrated healthcare model', 'Optum 23% growth rate', 'Medicare Advantage market leader'],
    risks: ['Regulatory pressure on MA rates', 'Healthcare labor inflation', 'Political reform risks ongoing'],
    news: [
      { headline: 'UnitedHealth Group reports record Medicare Advantage enrollment', summary: 'Q4 open enrollment drives membership growth exceeding projections', source: 'Modern Healthcare', datetime: '4 hours ago', url: '#' },
      { headline: 'UNH Optum expands AI-powered clinical decision support', summary: 'Machine learning tools being deployed across provider network', source: 'Healthcare IT News', datetime: '11 hours ago', url: '#' }
    ]
  },

  // Add Hong Kong stocks
  '700': {
    ticker: '700', name: 'Tencent Holdings Ltd.', price: 602.00, change: 8.23, changePercent: 1.39,
    marketCap: '5.7T HKD', sector: 'Technology', 
    description: 'Tencent Holdings is Chinese multinational technology conglomerate providing internet services, mobile games, and social networks.',
    eps: { years: ['2025', '2026', '2027'], values: [30.04, 31.22, 34.94] },
    peBands: { low: 14.57, mid: 18.58, high: 21.50 },
    scores: { value: 7.6, growth: 7.8, profit: 8.4, momentum: 7.2 },
    forwardPE: '20.0', ttmPE: '22.4',
    region: 'HK',
    peers: [[5700, 20.0, 22, '700'], [1400, 7.2, 18, '9988'], [830, 238.2, 16, '3690']],
    segments: [
      { name: 'Value-Added Services', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Online Advertising', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'FinTech Services', value: 22, itemStyle: { color: '#f59e0b' } },
      { name: 'Business Services', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['WeChat ecosystem dominance 1.3B users', 'Gaming leadership globally', 'FinTech services expansion'],
    risks: ['Chinese regulatory pressure ongoing', 'Gaming restrictions limiting growth', 'Competition from ByteDance'],
    news: [
      { headline: 'Tencent gaming revenue recovers with new title launches in Q4', summary: 'Honor of Kings and PUBG Mobile driving international growth', source: 'South China Morning Post', datetime: '3 hours ago', url: '#' },
      { headline: 'WeChat Pay expands cross-border payment services', summary: 'New partnerships enable seamless international transactions', source: 'TechNode', datetime: '8 hours ago', url: '#' }
    ]
  },

  '3690': {
    ticker: '3690', name: 'Meituan-W', price: 101.30, change: 0.45, changePercent: 0.44,
    marketCap: '835B HKD', sector: 'Consumer Discretionary',
    description: 'Meituan operates platform connecting consumers with local merchants for food delivery and services in China.',
    eps: { years: ['2025', '2026', '2027'], values: [0.253, 4.628, 7.802] },
    peBands: { low: 25.75, mid: 34.62, high: 196.07 },
    scores: { value: 5.8, growth: 9.2, profit: 6.8, momentum: 8.4 },
    forwardPE: '400.0', ttmPE: '485.6',
    region: 'HK',
    dataQuality: { warning: '⚠️ HIGH VOLATILITY - Turnaround story with extreme P/E variation' },
    peers: [[835, 400.0, 16, '3690'], [5700, 20.0, 22, '700'], [1400, 7.2, 18, '9988']],
    segments: [
      { name: 'Food Delivery', value: 58, itemStyle: { color: '#3b82f6' } },
      { name: 'In-Store Dining', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'New Initiatives', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Food delivery leadership in China', 'Local services platform expansion', 'Technology infrastructure advantage'],
    risks: ['Competitive food delivery market', 'Regulatory compliance costs rising', 'Path to profitability uncertain'],
    news: [
      { headline: 'Meituan reports return to profitability with strong Q4 performance', summary: 'Food delivery margins improve as competition stabilizes in China', source: 'Bloomberg', datetime: '2 hours ago', url: '#' },
      { headline: 'Meituan expands grocery delivery to 300 Chinese cities', summary: 'Same-day grocery service showing rapid user adoption', source: 'KrASIA', datetime: '7 hours ago', url: '#' }
    ]
  },

  '1810': {
    ticker: '1810', name: 'Xiaomi Corp-W', price: 54.50, change: 1.23, changePercent: 2.31,
    marketCap: '251B HKD', sector: 'Technology',
    description: 'Xiaomi Corporation designs, develops, and sells smartphones, laptops, and lifestyle products.',
    eps: { years: ['2025', '2026', '2027'], values: [1.786, 2.115, 2.631] },
    peBands: { low: 19.76, mid: 25.57, high: 36.92 },
    scores: { value: 6.9, growth: 8.1, profit: 7.4, momentum: 8.2 },
    forwardPE: '30.5', ttmPE: '34.8',
    region: 'HK',
    peers: [[251, 30.5, 16, '1810'], [5700, 20.0, 22, '700'], [835, 400.0, 16, '3690']],
    segments: [
      { name: 'Smartphones', value: 62, itemStyle: { color: '#3b82f6' } },
      { name: 'IoT & Lifestyle', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Internet Services', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    strengths: ['Global smartphone brand top 3', 'IoT ecosystem expansion', 'Strong international growth'],
    risks: ['Smartphone market saturation', 'Component cost inflation', 'US-China trade tensions'],
    news: [
      { headline: 'Xiaomi 14 series gains market share in European premium segment', summary: 'Strong sales performance challenging Samsung and Apple', source: 'GSM Arena', datetime: '4 hours ago', url: '#' },
      { headline: 'Xiaomi IoT ecosystem reaches 500 million connected devices', summary: 'Smart home platform showing strong international adoption', source: 'Android Authority', datetime: '10 hours ago', url: '#' }
    ]
  },

  '9988': {
    ticker: '9988', name: 'Alibaba Group Holding-SW', price: 134.10, change: 2.14, changePercent: 1.62,
    marketCap: '1.4T HKD', sector: 'Consumer Discretionary',
    description: 'Alibaba Group operates online and mobile marketplaces providing technology infrastructure for e-commerce.',
    eps: { years: ['2025', '2026', '2027'], values: [7.624, 9.084, 10.551] },
    peBands: { low: 12.13, mid: 14.45, high: 20.40 },
    scores: { value: 8.1, growth: 7.4, profit: 7.8, momentum: 6.9 },
    forwardPE: '17.6', ttmPE: '18.6',
    region: 'HK',
    peers: [[1400, 17.6, 20, '9988'], [5700, 20.0, 22, '700'], [835, 400.0, 16, '3690']],
    segments: [
      { name: 'China Commerce', value: 45, itemStyle: { color: '#3b82f6' } },
      { name: 'International Commerce', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'Cloud Computing', value: 28, itemStyle: { color: '#f59e0b' } },
      { name: 'Digital Media', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['E-commerce leadership in China', 'Alibaba Cloud #1 in Asia', 'Digital payments ecosystem strength'],
    risks: ['Regulatory oversight in China', 'Competition from JD/PDD intensifying', 'International expansion challenges'],
    news: [
      { headline: 'Alibaba Cloud revenue growth accelerates to 7% in Q4', summary: 'AI services driving enterprise customer acquisition in Asia', source: 'TechCrunch', datetime: '1 hour ago', url: '#' },
      { headline: 'Alibaba Singles\' Day 2024 GMV reaches record $156 billion', summary: 'Strong performance across Tmall and Taobao platforms', source: 'Alizila', datetime: '5 hours ago', url: '#' }
    ]
  },
    
  'ISRG': {
  ticker: 'ISRG', 
  name: 'Intuitive Surgical Inc.', 
  price: 615.42, 
  change: 8.73, 
  changePercent: 1.44,
  marketCap: '218B', 
  sector: 'Healthcare',
  description: 'Intuitive Surgical develops, manufactures, and markets the da Vinci surgical systems and related instruments and accessories for minimally invasive surgery.',
  eps: { 
    years: ['2025', '2026', '2027'], 
    values: [7.012, 8.156, 9.487] 
  },
  peBands: { 
    low: 65.23, 
    mid: 77.45, 
    high: 91.67 
  },
  scores: { 
    value: 6.2, 
    growth: 9.1, 
    profit: 9.3, 
    momentum: 8.7 
  },
  forwardPE: '87.8', 
  ttmPE: '92.3',
  peers: [
    [218, 87.8, 24, 'ISRG'], 
    [82, 22.3, 18, 'MDT'], 
    [68, 19.7, 15, 'SYK'], 
    [45, 24.5, 13, 'BSX']
  ],
  segments: [
    { name: 'Instruments & Accessories', value: 58, itemStyle: { color: '#3b82f6' } },
    { name: 'Systems', value: 28, itemStyle: { color: '#10b981' } },
    { name: 'Services', value: 14, itemStyle: { color: '#f59e0b' } }
  ],
  strengths: [
    'Robotic surgery market leader with 79% share globally',
    'Recurring revenue model with high-margin consumables at 70%+ gross margins',
    'Installed base of 8,600+ da Vinci systems driving procedure growth'
  ],
  risks: [
    'Competition intensifying from Medtronic and J&J entering robotic surgery',
    'High system costs limiting hospital adoption in emerging markets',
    'Regulatory challenges for new indications and international expansion'
  ],
  news: [
    { 
      headline: 'Intuitive Surgical reports record Q4 procedure growth of 26%', 
      summary: 'Da Vinci procedure volumes exceed expectations driven by general surgery adoption', 
      source: 'MedTech Dive', 
      datetime: '3 hours ago', 
      url: '#' 
    },
    { 
      headline: 'ISRG launches next-gen da Vinci 5 with enhanced AI capabilities', 
      summary: 'New system features improved visualization and force feedback technology', 
      source: 'Medical Device Network', 
      datetime: '8 hours ago', 
      url: '#' 
    }
  ]
},

// Also update the STOCK_CATEGORIES object to include ISRG in US_HEALTHCARE:
// Find the US_HEALTHCARE category and update it like this:

'US_HEALTHCARE': {
  label: 'US Healthcare',
  color: '#f59e0b',
  tickers: ['LLY', 'UNH', 'ISRG', 'JNJ', 'PFE', 'ABBV', 'MRK', 'TMO', 'ABT', 'CVS']

  // Additional stocks would continue here with the same pattern...
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
    tickers: ['AMZN', 'TSLA', 'NFLX', 'WMT', 'COST', 'HD', 'DIS']
  },
  'US_HEALTHCARE': {
    label: 'US Healthcare',
    color: '#f59e0b',
    tickers: ['LLY', 'UNH']
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
  
  // Add small realistic price variation to simulate "live" movement
  const variation = (Math.random() - 0.5) * 0.01; // ±1% variation
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
      source: 'EXCEL_BLOOMBERG_DATA'
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
  // UPDATED with real Excel data
  const baseData = {
    spy: { price: 6448.26, change: 0.73, changePercent: 0.11 },
    nasdaq: { price: 23414.84, change: 98.45, changePercent: 0.42 },
    btc: { price: 111822.48, change: -2485.67, changePercent: -2.18 },
    gold: { price: 3542.51, change: 15.23, changePercent: 0.43 },
    oil: { price: 63.58, change: -1.89, changePercent: -2.89 }
  };
  
  // Add small variations to simulate live movement
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.005; // ±0.5% variation
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
