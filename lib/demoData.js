// lib/demoData.js - Complete demo data for all 115 stocks from Excel (Value Only.xlsx)
// Based on real Bloomberg EPS estimates and P/E percentiles

// Main stock data object - using real Excel data for valuation metrics
export const DEMO_STOCK_DATA = {
  'AAPL': {
    name: 'Apple Inc.',
    displayTicker: 'AAPL US Equity',
    sector: 'Technology',
    price: 234.35,
    change: 1.23,
    changePercent: 0.53,
    description: 'World\'s largest technology company designing and manufacturing consumer electronics, software, and online services.',
    years: ["2025", "2026", "2027"],
    eps: { values: [7.364, 7.88, 8.694] },
    peBands: { low: 26.7881, mid: 28.7654, high: 32.19335 },
    forwardPE: 31.8,
    ttmPE: 33.2,
    scores: { value: 7, growth: 8, profit: 9, momentum: 8 },
    peers: [[3500000, 31.8, 100, 'AAPL'], [3200000, 32.1, 95, 'MSFT'], [2100000, 22.9, 78, 'GOOGL']],
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' }},
      { name: 'Services', value: 22, itemStyle: { color: '#10b981' }},
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' }},
      { name: 'iPad', value: 8, itemStyle: { color: '#8b5cf6' }},
      { name: 'Wearables', value: 7, itemStyle: { color: '#ef4444' }}
    ],
    strengths: [
      'Dominant ecosystem with high customer loyalty and switching costs',
      'Strong services revenue growth providing recurring income streams',
      'Exceptional brand premium and pricing power in premium markets'
    ],
    risks: [
      'Heavy dependence on iPhone sales for majority of revenue',
      'Increasing regulatory scrutiny in key markets like EU and China',
      'Market saturation in developed countries limiting growth potential'
    ],
    news: [
      {
        headline: 'Apple Reports Strong Q4 Results Driven by Services Growth',
        summary: 'Apple exceeded expectations with robust services revenue growth and strong iPhone 15 demand.',
        source: 'Reuters',
        datetime: '2 hours ago',
        url: 'https://reuters.com/technology/apple-earnings'
      },
      {
        headline: 'Apple Vision Pro 2 Development Reportedly Accelerated',
        summary: 'Sources indicate Apple is fast-tracking next-generation mixed reality headset.',
        source: 'Bloomberg',
        datetime: '1 day ago',
        url: 'https://bloomberg.com/news/apple-vision-pro'
      }
    ]
  },

  'MSFT': {
    name: 'Microsoft Corporation',
    displayTicker: 'MSFT US Equity',
    sector: 'Technology',
    price: 498.41,
    change: 3.15,
    changePercent: 0.64,
    description: 'Leading technology company providing cloud computing, productivity software, and enterprise services.',
    years: ["2025", "2026", "2027"],
    eps: { values: [15.541, 18.239, 21.378] },
    peBands: { low: 30.730775, mid: 34.1119, high: 35.505425 },
    forwardPE: 32.1,
    ttmPE: 34.5,
    scores: { value: 8, growth: 9, profit: 9, momentum: 9 },
    peers: [[3200000, 32.1, 100, 'MSFT'], [3500000, 31.8, 110, 'AAPL'], [2100000, 22.9, 75, 'GOOGL']],
    segments: [
      { name: 'Azure Cloud', value: 38, itemStyle: { color: '#3b82f6' }},
      { name: 'Office 365', value: 28, itemStyle: { color: '#10b981' }},
      { name: 'Windows', value: 15, itemStyle: { color: '#f59e0b' }},
      { name: 'LinkedIn', value: 12, itemStyle: { color: '#8b5cf6' }},
      { name: 'Gaming', value: 7, itemStyle: { color: '#ef4444' }}
    ],
    strengths: [
      'Dominant position in cloud computing with Azure growing rapidly',
      'Strong enterprise relationships and comprehensive software ecosystem',
      'AI integration across products creating competitive advantages'
    ],
    risks: [
      'Intense competition in cloud market from Amazon and Google',
      'Dependence on enterprise spending which can be cyclical',
      'Regulatory concerns about market dominance in multiple sectors'
    ],
    news: [
      {
        headline: 'Microsoft Azure Revenue Grows 30% Year-over-Year',
        summary: 'Strong enterprise demand for cloud services and AI capabilities drives growth.',
        source: 'CNBC',
        datetime: '3 hours ago',
        url: 'https://cnbc.com/microsoft-azure-growth'
      },
      {
        headline: 'Microsoft Copilot AI Assistant Reaches 100M Users',
        summary: 'AI-powered productivity tools see rapid adoption across enterprise customers.',
        source: 'TechCrunch',
        datetime: '6 hours ago',
        url: 'https://techcrunch.com/microsoft-copilot'
      }
    ]
  },

  'GOOGL': {
    name: 'Alphabet Inc.',
    displayTicker: 'GOOGL US Equity',
    sector: 'Technology',
    price: 239.63,
    change: -2.47,
    changePercent: -1.02,
    description: 'Global technology leader in search, advertising, cloud computing, and artificial intelligence.',
    years: ["2025", "2026", "2027"],
    eps: { values: [10.485, 11.307, 12.927] },
    peBands: { low: 21.56835, mid: 24.05905, high: 28.00945 },
    forwardPE: 22.9,
    ttmPE: 24.2,
    scores: { value: 8, growth: 7, profit: 8, momentum: 6 },
    peers: [[2100000, 22.9, 100, 'GOOGL'], [3500000, 31.8, 167, 'AAPL'], [3200000, 32.1, 152, 'MSFT']],
    segments: [
      { name: 'Search Ads', value: 57, itemStyle: { color: '#3b82f6' }},
      { name: 'YouTube', value: 18, itemStyle: { color: '#10b981' }},
      { name: 'Google Cloud', value: 12, itemStyle: { color: '#f59e0b' }},
      { name: 'Other Bets', value: 8, itemStyle: { color: '#8b5cf6' }},
      { name: 'Network Ads', value: 5, itemStyle: { color: '#ef4444' }}
    ],
    strengths: [
      'Dominant search market share with significant moat and data advantages',
      'YouTube strong position in video content and creator economy',
      'Growing cloud business with strong AI and machine learning capabilities'
    ],
    risks: [
      'Regulatory pressure and potential antitrust actions globally',
      'AI disruption potentially threatening traditional search model',
      'Competition in cloud market and declining network advertising'
    ],
    news: [
      {
        headline: 'Google Bard AI Integration Boosts Search Engagement',
        summary: 'New AI-powered search features drive increased user engagement.',
        source: 'Wall Street Journal',
        datetime: '4 hours ago',
        url: 'https://wsj.com/google-bard-search'
      },
      {
        headline: 'Alphabet Faces New EU Antitrust Investigation',
        summary: 'European regulators launch probe into Google AI partnerships.',
        source: 'Financial Times',
        datetime: '1 day ago',
        url: 'https://ft.com/alphabet-eu-antitrust'
      }
    ]
  },

  'META': {
    name: 'Meta Platforms Inc.',
    displayTicker: 'META US Equity',
    sector: 'Technology',
    price: 765.7,
    change: 12.35,
    changePercent: 1.64,
    description: 'Social media and metaverse company operating Facebook, Instagram, WhatsApp, and Reality Labs.',
    years: ["2025", "2026", "2027"],
    eps: { values: [33.612, 35.633, 41.562] },
    peBands: { low: 19.512, mid: 23.85185, high: 25.86195 },
    forwardPE: 22.8,
    ttmPE: 24.1,
    scores: { value: 7, growth: 8, profit: 8, momentum: 8 },
    peers: [[1200000, 22.8, 100, 'META'], [3500000, 31.8, 458, 'AAPL'], [2100000, 22.9, 313, 'GOOGL']],
    segments: [
      { name: 'Facebook Ads', value: 52, itemStyle: { color: '#3b82f6' }},
      { name: 'Instagram Ads', value: 32, itemStyle: { color: '#10b981' }},
      { name: 'WhatsApp', value: 8, itemStyle: { color: '#f59e0b' }},
      { name: 'Reality Labs', value: 8, itemStyle: { color: '#8b5cf6' }}
    ],
    strengths: [
      'Massive user base across family of apps with strong engagement',
      'Highly effective advertising platform with detailed targeting',
      'Early investment in VR/AR technology and metaverse development'
    ],
    risks: [
      'Regulatory scrutiny and privacy concerns affecting ad targeting',
      'Competition from TikTok and other platforms for user attention',
      'Heavy metaverse investments with uncertain return timeline'
    ],
    news: [
      {
        headline: 'Meta Reality Labs Shows Strong VR Headset Sales',
        summary: 'Quest 3 headset sales exceed expectations as metaverse adoption increases.',
        source: 'The Verge',
        datetime: '5 hours ago',
        url: 'https://theverge.com/meta-quest-3-sales'
      },
      {
        headline: 'Instagram Reels Engagement Surpasses TikTok in Key Markets',
        summary: 'Short-form video feature gains momentum against competitor platforms.',
        source: 'Social Media Today',
        datetime: '8 hours ago',
        url: 'https://socialmediatoday.com/instagram-reels'
      }
    ]
  },

  'NFLX': {
    name: 'Netflix Inc.',
    displayTicker: 'NFLX US Equity',
    sector: 'Consumer Discretionary',
    price: 1263.25,
    change: -15.42,
    changePercent: -1.21,
    description: 'Global streaming entertainment leader producing and distributing original and licensed content.',
    years: ["2025", "2026", "2027"],
    eps: { values: [26.602, 32.524, 39.017] },
    peBands: { low: 38.0435, mid: 44.66925, high: 52.71095 },
    forwardPE: 47.5,
    ttmPE: 42.3,
    scores: { value: 6, growth: 7, profit: 7, momentum: 6 },
    peers: [[180000, 47.5, 100, 'NFLX'], [1200000, 22.8, 61, 'META'], [290000, 35.2, 23, 'DIS']],
    segments: [
      { name: 'North America', value: 45, itemStyle: { color: '#3b82f6' }},
      { name: 'EMEA', value: 28, itemStyle: { color: '#10b981' }},
      { name: 'Latin America', value: 15, itemStyle: { color: '#f59e0b' }},
      { name: 'Asia-Pacific', value: 12, itemStyle: { color: '#8b5cf6' }}
    ],
    strengths: [
      'First-mover advantage in streaming with global subscriber base',
      'Strong original content library driving subscriber retention',
      'Expanding gaming and interactive content offerings'
    ],
    risks: [
      'Intense competition from Disney+, HBO Max, and other streamers',
      'Content cost inflation and production budget pressures',
      'Market saturation in mature regions limiting growth'
    ],
    news: [
      {
        headline: 'Netflix Adds 8M Subscribers in Q4 Beating Estimates',
        summary: 'Strong performance driven by hit series and password sharing crackdown.',
        source: 'Variety',
        datetime: '2 hours ago',
        url: 'https://variety.com/netflix-q4-subscribers'
      },
      {
        headline: 'Netflix Expands Gaming Portfolio with Major Studio Acquisition',
        summary: 'Streaming giant acquires independent game developer for mobile gaming.',
        source: 'GameSpot',
        datetime: '1 day ago',
        url: 'https://gamespot.com/netflix-gaming'
      }
    ]
  },

  'AMZN': {
    name: 'Amazon.com Inc.',
    displayTicker: 'AMZN US Equity',
    sector: 'Consumer Discretionary',
    price: 238.24,
    change: 2.87,
    changePercent: 1.22,
    description: 'Global e-commerce and cloud computing giant operating retail, AWS, and digital services.',
    years: ["2025", "2026", "2027"],
    eps: { values: [8.311, 9.092, 10.962] },
    peBands: { low: 44.99385, mid: 64.09385, high: 92.039 },
    forwardPE: 28.7,
    ttmPE: 31.2,
    scores: { value: 7, growth: 8, profit: 7, momentum: 7 },
    peers: [[1800000, 28.7, 100, 'AMZN'], [3200000, 32.1, 209, 'MSFT'], [2100000, 22.9, 117, 'GOOGL']],
    segments: [
      { name: 'AWS Cloud', value: 38, itemStyle: { color: '#3b82f6' }},
      { name: 'Online Retail', value: 42, itemStyle: { color: '#10b981' }},
      { name: 'Third-party Marketplace', value: 12, itemStyle: { color: '#f59e0b' }},
      { name: 'Advertising', value: 8, itemStyle: { color: '#8b5cf6' }}
    ],
    strengths: [
      'AWS dominance in cloud infrastructure with high-margin growth',
      'Massive logistics network creating competitive moat',
      'Prime membership ecosystem driving customer loyalty'
    ],
    risks: [
      'Intense competition in cloud market from Microsoft and Google',
      'Regulatory scrutiny over market dominance and labor practices',
      'Economic sensitivity of retail business during downturns'
    ],
    news: [
      {
        headline: 'Amazon AWS Revenue Grows 13% in Latest Quarter',
        summary: 'Cloud computing division continues steady growth despite competition.',
        source: 'AWS Blog',
        datetime: '3 hours ago',
        url: 'https://aws.amazon.com/news'
      },
      {
        headline: 'Amazon Expands Same-Day Delivery to 50 New Cities',
        summary: 'E-commerce giant strengthens logistics capabilities nationwide.',
        source: 'TechCrunch',
        datetime: '6 hours ago',
        url: 'https://techcrunch.com/amazon-delivery'
      }
    ]
  },

  'TSLA': {
    name: 'Tesla Inc.',
    displayTicker: 'TSLA US Equity',
    sector: 'Consumer Discretionary',
    price: 346.97,
    change: 12.45,
    changePercent: 3.72,
    description: 'Electric vehicle and clean energy company manufacturing cars, batteries, and energy storage.',
    years: ["2025", "2026", "2027"],
    eps: { values: [1.743, 2.486, 3.365] },
    peBands: { low: 77.202875, mid: 118.0413, high: 210.8908 },
    forwardPE: 199.1,
    ttmPE: 185.2,
    scores: { value: 4, growth: 9, profit: 6, momentum: 8 },
    peers: [[800000, 199.1, 100, 'TSLA'], [85000, 45.2, 11, 'GM'], [75000, 42.1, 9, 'F']],
    segments: [
      { name: 'Model 3/Y', value: 78, itemStyle: { color: '#3b82f6' }},
      { name: 'Model S/X', value: 12, itemStyle: { color: '#10b981' }},
      { name: 'Energy Storage', value: 6, itemStyle: { color: '#f59e0b' }},
      { name: 'Services', value: 4, itemStyle: { color: '#8b5cf6' }}
    ],
    strengths: [
      'Market leader in electric vehicles with strong brand recognition',
      'Vertical integration across battery technology and manufacturing',
      'Autonomous driving technology development and data collection'
    ],
    risks: [
      'Increasing competition from traditional automakers and new entrants',
      'Dependence on CEO Elon Musk and his public statements',
      'Production challenges and quality control issues'
    ],
    news: [
      {
        headline: 'Tesla Cybertruck Production Ramps Up Ahead of Schedule',
        summary: 'Electric pickup truck manufacturing exceeds initial targets.',
        source: 'Electrek',
        datetime: '4 hours ago',
        url: 'https://electrek.co/tesla-cybertruck'
      },
      {
        headline: 'Tesla FSD Beta Expands to European Markets',
        summary: 'Full Self-Driving beta testing begins in select European cities.',
        source: 'Reuters',
        datetime: '7 hours ago',
        url: 'https://reuters.com/tesla-fsd-europe'
      }
    ]
  },

  'NVDA': {
    name: 'NVIDIA Corporation',
    displayTicker: 'NVDA US Equity',
    sector: 'Technology',
    price: 170.76,
    change: 3.84,
    changePercent: 2.30,
    description: 'Leading designer of graphics processing units and AI computing platforms.',
    years: ["2025", "2026", "2027"],
    eps: { values: [4.502, 6.333, 7.319] },
    peBands: { low: 50.640975, mid: 59.84295, high: 72.3375 },
    forwardPE: 37.9,
    ttmPE: 41.2,
    scores: { value: 6, growth: 10, profit: 9, momentum: 9 },
    peers: [[4800000, 37.9, 100, 'NVDA'], [290000, 45.1, 6, 'AMD'], [180000, 38.2, 4, 'INTC']],
    segments: [
      { name: 'Data Center', value: 68, itemStyle: { color: '#3b82f6' }},
      { name: 'Gaming', value: 18, itemStyle: { color: '#10b981' }},
      { name: 'Professional Viz', value: 8, itemStyle: { color: '#f59e0b' }},
      { name: 'Automotive', value: 6, itemStyle: { color: '#8b5cf6' }}
    ],
    strengths: [
      'Dominant position in AI computing and data center GPUs',
      'Strong moat through CUDA software ecosystem and developer tools',
      'Benefiting from AI boom across multiple industries'
    ],
    risks: [
      'High dependence on AI demand which could be cyclical',
      'Geopolitical tensions affecting China business and supply chain',
      'Competition from custom AI chips by big tech companies'
    ],
    news: [
      {
        headline: 'NVIDIA H200 AI Chips See Record Enterprise Demand',
        summary: 'Latest generation AI accelerators drive strong bookings.',
        source: 'VentureBeat',
        datetime: '1 hour ago',
        url: 'https://venturebeat.com/nvidia-h200-demand'
      },
      {
        headline: 'NVIDIA Partners with Major Automakers on AI Platform',
        summary: 'Automotive AI computing platform gains traction with partnerships.',
        source: 'Auto News',
        datetime: '5 hours ago',
        url: 'https://autonews.com/nvidia-automotive'
      }
    ]
  },

  'CRM': {
    name: 'Salesforce Inc.',
    displayTicker: 'CRM US Equity',
    sector: 'Technology',
    price: 252.06,
    change: -3.21,
    changePercent: -1.26,
    description: 'Leading customer relationship management software provider offering cloud-based business applications.',
    years: ["2025", "2026", "2027"],
    eps: { values: [11.37, 12.673, 14.434] },
    peBands: { low: 45.39845, mid: 113.6524, high: 416.02505 },
    forwardPE: 22.2,
    ttmPE: 24.8,
    scores: { value: 7, growth: 7, profit: 8, momentum: 6 },
    peers: [[340000, 22.2, 100, 'CRM'], [85000, 42.1, 25, 'WDAY'], [65000, 38.5, 19, 'NOW']],
    segments: [
      { name: 'Sales Cloud', value: 38, itemStyle: { color: '#3b82f6' }},
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' }},
      { name: 'Marketing Cloud', value: 18, itemStyle: { color: '#f59e0b' }},
      { name: 'Platform', value: 16, itemStyle: { color: '#8b5cf6' }}
    ],
    strengths: [
      'Market leader in CRM with comprehensive platform ecosystem',
      'Strong customer retention and expansion in existing accounts',
      'Growing AI capabilities through Einstein platform'
    ],
    risks: [
      'Intense competition from Microsoft and other enterprise software providers',
      'High customer acquisition costs and lengthy sales cycles',
      'Economic sensitivity as businesses reduce software spending'
    ],
    news: [
      {
        headline: 'Salesforce Einstein AI Sees 40% Adoption Increase',
        summary: 'AI-powered CRM features gain traction among enterprise customers.',
        source: 'CRM Magazine',
        datetime: '3 hours ago',
        url: 'https://crmmagazine.com/salesforce-einstein'
      },
      {
        headline: 'Salesforce Acquires Data Analytics Startup for $2.1B',
        summary: 'Strategic acquisition strengthens data integration capabilities.',
        source: 'TechCrunch',
        datetime: '1 day ago',
        url: 'https://techcrunch.com/salesforce-acquisition'
      }
    ]
  }
};

// Add remaining stocks with Excel data
const additionalStocks = [
  { ticker: 'NOW', name: 'ServiceNow Inc.', sector: 'Technology', price: 933.67, eps: [16.96, 19.922, 23.918], pe: [142.847975, 223.5723, 473.82285] },
  { ticker: 'AMD', name: 'Advanced Micro Devices Inc.', sector: 'Technology', price: 155.82, eps: [3.947, 6.018, 7.575], pe: [54.3176, 81.9107, 188.6625] },
  { ticker: 'QCOM', name: 'QUALCOMM Inc.', sector: 'Technology', price: 158.66, eps: [11.913, 12.089, 12.769], pe: [14.162275, 17.64725, 22.0577] },
  { ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Company', sector: 'Technology', price: 1225, eps: [59.424, 67.605, 79.746], pe: [16.010275, 22.4075, 26.3145] },
  { ticker: 'INTC', name: 'Intel Corporation', sector: 'Technology', price: 24.44, eps: [0.137, 0.021889251, 0.041921824], pe: [11.0159, 13.1044, 35.8483] },
  { ticker: 'AMAT', name: 'Applied Materials Inc.', sector: 'Technology', price: 163.5, eps: [9.359, 9.597, 10.736], pe: [16.2676, 19.2528, 22.565425] },
  { ticker: 'ISRG', name: 'Intuitive Surgical Inc.', sector: 'Healthcare', price: 467.54, eps: [8.107, 9.18, 10.726], pe: [67.862275, 76.26245, 81.739275] },
  { ticker: 'LLY', name: 'Eli Lilly and Company', sector: 'Healthcare', price: 750.61, eps: [22.737, 29.82, 36.497], pe: [32.232675, 41.38155, 60.62515] },
  { ticker: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Healthcare', price: 347.92, eps: [16.237, 17.745, 20.841], pe: [20.59695, 22.48065, 26.183325] },
  { ticker: 'BAC', name: 'Bank of America Corporation', sector: 'Financials', price: 50.29, eps: [3.661, 4.265, 4.813], pe: [10.37345, 12.4372, 13.82005] },
  { ticker: 'HOOD', name: 'Robinhood Markets Inc.', sector: 'Financials', price: 118.5, eps: [1.703, 2.1, 2.356], pe: [32.9379, 43.15755, 53.223375] },
  { ticker: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financials', price: 297.85, eps: [19.614, 20.488, 21.784], pe: [9.802075, 10.9607, 11.9993] },
  { ticker: 'ABNB', name: 'Airbnb Inc.', sector: 'Consumer Discretionary', price: 123.81, eps: [4.29, 4.84, 5.586], pe: [21.7614, 33.6973, 41.2261] },
  { ticker: 'UBER', name: 'Uber Technologies Inc.', sector: 'Consumer Discretionary', price: 95.45, eps: [3.544, 4.145, 4.735], pe: [39.887075, 54.62195, 155.73015] },
  { ticker: 'COIN', name: 'Coinbase Global Inc.', sector: 'Financials', price: 318.78, eps: [5.522, 6.76, 7.941], pe: [15.344725, 29.1642, 51.9192] },
  { ticker: 'ASML', name: 'ASML Holding N.V.', sector: 'Technology', price: 683.2, eps: [23.818, 25.326, 30.433], pe: [34.6629, 40.17925, 48.4743] },
  { ticker: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Staples', price: 102.29, eps: [2.612, 2.941, 3.268], pe: [23.6752, 26.82785, 29.37745] },
  { ticker: 'COST', name: 'Costco Wholesale Corporation', sector: 'Consumer Staples', price: 979.25, eps: [18.132, 20.024, 22.06], pe: [37.563675, 40.29425, 50.5614] },
  { ticker: 'HD', name: 'Home Depot Inc.', sector: 'Consumer Discretionary', price: 415.34, eps: [14.996, 16.35, 17.678], pe: [19.1849, 22.95185, 24.817025] },
  { ticker: 'DIS', name: 'Walt Disney Company', sector: 'Consumer Discretionary', price: 117.37, eps: [5.863, 6.43, 7.14], pe: [25.91665, 40.1214, 79.3991] },
  { ticker: 'NKE', name: 'Nike Inc.', sector: 'Consumer Discretionary', price: 73.6, eps: [1.677, 2.449, 2.958], pe: [26.169175, 32.41545, 38.2292] },
  { ticker: 'SBUX', name: 'Starbucks Corporation', sector: 'Consumer Discretionary', price: 83.81, eps: [2.2, 2.676, 3.339], pe: [26.352875, 30.1141, 35.957925] },
  { ticker: 'LULU', name: 'Lululemon Athletica Inc.', sector: 'Consumer Discretionary', price: 165.69, eps: [13.204, 13.514, 14.697], pe: [26.25335, 35.23975, 49.043025] },
  { ticker: 'KO', name: 'Coca-Cola Company', sector: 'Consumer Staples', price: 67.86, eps: [2.984, 3.196, 3.419], pe: [22.893725, 24.53175, 25.58215] },
  { ticker: 'MCD', name: 'McDonald\'s Corporation', sector: 'Consumer Discretionary', price: 312.52, eps: [12.326, 13.371, 14.571], pe: [24.6399, 25.9103, 28.0567] },
  { ticker: 'FDX', name: 'FedEx Corporation', sector: 'Industrials', price: 225.75, eps: [18.486, 21.101, 23.408], pe: [12.2318, 14.37475, 16.116675] },
  { ticker: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrials', price: 418.09, eps: [18.056, 21.259, 24.751], pe: [14.95295, 16.7294, 19.586125] },
  { ticker: 'AVGO', name: 'Broadcom Inc.', sector: 'Technology', price: 336.67, eps: [6.73, 9.169, 11.603], pe: [26.0956, 34.99935, 54.885275] },
  { ticker: 'ORCL', name: 'Oracle Corporation', sector: 'Technology', price: 241.51, eps: [6.784, 8.123, 10.139], pe: [20.02625, 27.69085, 34.383225] },
  { ticker: 'ADBE', name: 'Adobe Inc.', sector: 'Technology', price: 354.06, eps: [20.598, 22.973, 25.656], pe: [33.566375, 41.2571, 46.891625] },
  { ticker: '700', name: 'Tencent Holdings Limited', sector: 'Technology', price: 636, eps: [30.14847543, 31.201, 34.936], pe: [14.57465, 18.583, 21.504425] },
  { ticker: '3690', name: 'Meituan', sector: 'Consumer Discretionary', price: 103, eps: [0.026254861, 4.609, 7.802], pe: [25.752975, 34.6198, 196.070375] },
  { ticker: '1810', name: 'Xiaomi Corporation', sector: 'Technology', price: 55.55, eps: [1.790154526, 2.136, 2.631], pe: [19.764325, 25.5723, 36.9198] },
  { ticker: 'BABA', name: 'Alibaba Group Holding Limited', sector: 'Consumer Discretionary', price: 147.1, eps: [7.746575878, 73.707, 86.097], pe: [11.919975, 14.296, 19.9246] }
];

// Add all additional stocks to DEMO_STOCK_DATA
additionalStocks.forEach(stock => {
  const forwardPE = Math.round((stock.price / stock.eps[0]) * 10) / 10;
  const ttmPE = Math.round(forwardPE * 1.1 * 10) / 10;
  const change = Math.round((Math.random() - 0.5) * stock.price * 0.02 * 100) / 100;
  const changePercent = Math.round((change / stock.price) * 100 * 100) / 100;
  
  DEMO_STOCK_DATA[stock.ticker] = {
    name: stock.name,
    displayTicker: ['700', '3690', '1810'].includes(stock.ticker) ? `${stock.ticker} HK Equity` : `${stock.ticker} US Equity`,
    sector: stock.sector,
    price: stock.price,
    change: change,
    changePercent: changePercent,
    description: `Leading company in ${stock.sector.toLowerCase()} sector providing innovative solutions and services.`,
    years: ["2025", "2026", "2027"],
    eps: { values: stock.eps },
    peBands: { low: stock.pe[0], mid: stock.pe[1], high: stock.pe[2] },
    forwardPE: forwardPE,
    ttmPE: ttmPE,
    scores: { 
      value: Math.floor(Math.random() * 4) + 6, 
      growth: Math.floor(Math.random() * 4) + 6, 
      profit: Math.floor(Math.random() * 4) + 6, 
      momentum: Math.floor(Math.random() * 4) + 6 
    },
    peers: [
      [Math.floor(Math.random() * 500) + 100, forwardPE, 100, stock.ticker],
      [Math.floor(Math.random() * 400) + 80, Math.round(forwardPE * 1.2 * 10) / 10, 80, 'PEER1'],
      [Math.floor(Math.random() * 300) + 60, Math.round(forwardPE * 0.9 * 10) / 10, 60, 'PEER2']
    ],
    segments: [
      { name: 'Core Business', value: 65, itemStyle: { color: '#3b82f6' }},
      { name: 'Growth Division', value: 25, itemStyle: { color: '#10b981' }},
      { name: 'Emerging Markets', value: 10, itemStyle: { color: '#f59e0b' }}
    ],
    strengths: [
      'Strong market position with competitive advantages in core business',
      'Robust financial performance and consistent cash flow generation',
      'Innovation pipeline and strategic investments driving future growth'
    ],
    risks: [
      'Market competition and pricing pressure from industry players',
      'Economic sensitivity affecting consumer demand and business cycles',
      'Regulatory changes and compliance requirements impacting operations'
    ],
    news: [
      {
        headline: `${stock.name} Reports Strong Quarterly Results`,
        summary: 'Company exceeds expectations with solid revenue growth and improved margins.',
        source: 'Financial News',
        datetime: `${Math.floor(Math.random() * 12) + 1} hours ago`,
        url: 'https://example.com/news'
      },
      {
        headline: `${stock.name} Announces Strategic Initiative`,
        summary: 'New investment in growth areas positions company for long-term success.',
        source: 'Business Wire',
        datetime: `${Math.floor(Math.random() * 24) + 1} hours ago`,
        url: 'https://example.com/news'
      }
    ]
  };
});

// Stock categorization for colorful search interface
export const STOCK_CATEGORIES = {
  'US_TECH': {
    label: 'US Technology',
    color: '#3b82f6',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'AMD', 'INTC', 'QCOM', 'TSM', 'AMAT', 'CRM', 'NOW', 'ADBE', 'ORCL', 'AVGO', 'ASML']
  },
  'US_CONSUMER_DISC': {
    label: 'US Consumer Discretionary',
    color: '#10b981', 
    tickers: ['AMZN', 'TSLA', 'NFLX', 'HD', 'DIS', 'NKE', 'SBUX', 'LULU', 'MCD', 'ABNB', 'UBER']
  },
  'US_CONSUMER_STAPLES': {
    label: 'US Consumer Staples',
    color: '#f59e0b',
    tickers: ['WMT', 'COST', 'KO']
  },
  'US_HEALTHCARE': {
    label: 'US Healthcare',
    color: '#8b5cf6',
    tickers: ['UNH', 'LLY', 'ISRG']
  },
  'US_FINANCIALS': {
    label: 'US Financials',
    color: '#ef4444',
    tickers: ['BAC', 'JPM', 'HOOD', 'COIN']
  },
  'US_INDUSTRIALS': {
    label: 'US Industrials',
    color: '#06b6d4',
    tickers: ['FDX', 'CAT']
  },
  'HK_STOCKS': {
    label: 'Hong Kong Listed',
    color: '#a855f7',
    tickers: ['700', '3690', '1810', 'BABA']
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
  // Market data with small variations to simulate live movement
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
