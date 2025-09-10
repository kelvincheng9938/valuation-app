// lib/demoData.js - Complete demo data for all 115 stocks from Excel (Value Only.xlsx)
// Based on real Bloomberg EPS estimates and P/E percentiles

// Company metadata for proper naming and sectors
const companyInfo = {
  'AAPL': { name: 'Apple Inc.', sector: 'Technology' },
  'MSFT': { name: 'Microsoft Corporation', sector: 'Technology' },
  'GOOGL': { name: 'Alphabet Inc.', sector: 'Technology' },
  'META': { name: 'Meta Platforms Inc.', sector: 'Technology' },
  'NFLX': { name: 'Netflix Inc.', sector: 'Consumer Discretionary' },
  'AMZN': { name: 'Amazon.com Inc.', sector: 'Consumer Discretionary' },
  'TSLA': { name: 'Tesla Inc.', sector: 'Consumer Discretionary' },
  'NVDA': { name: 'NVIDIA Corporation', sector: 'Technology' },
  'CRM': { name: 'Salesforce Inc.', sector: 'Technology' },
  'NOW': { name: 'ServiceNow Inc.', sector: 'Technology' },
  'AMD': { name: 'Advanced Micro Devices Inc.', sector: 'Technology' },
  'QCOM': { name: 'QUALCOMM Inc.', sector: 'Technology' },
  'TSM': { name: 'Taiwan Semiconductor Manufacturing Company', sector: 'Technology' },
  'INTC': { name: 'Intel Corporation', sector: 'Technology' },
  'AMAT': { name: 'Applied Materials Inc.', sector: 'Technology' },
  'ISRG': { name: 'Intuitive Surgical Inc.', sector: 'Healthcare' },
  'LLY': { name: 'Eli Lilly and Company', sector: 'Healthcare' },
  'UNH': { name: 'UnitedHealth Group Inc.', sector: 'Healthcare' },
  'BAC': { name: 'Bank of America Corporation', sector: 'Financials' },
  'HOOD': { name: 'Robinhood Markets Inc.', sector: 'Financials' },
  'JPM': { name: 'JPMorgan Chase & Co.', sector: 'Financials' },
  'XYZ': { name: 'XYZ Corporation', sector: 'Technology' },
  'ABNB': { name: 'Airbnb Inc.', sector: 'Consumer Discretionary' },
  'UBER': { name: 'Uber Technologies Inc.', sector: 'Consumer Discretionary' },
  'COIN': { name: 'Coinbase Global Inc.', sector: 'Financials' },
  'ASML': { name: 'ASML Holding N.V.', sector: 'Technology' },
  'WMT': { name: 'Walmart Inc.', sector: 'Consumer Staples' },
  'COST': { name: 'Costco Wholesale Corporation', sector: 'Consumer Staples' },
  'HD': { name: 'Home Depot Inc.', sector: 'Consumer Discretionary' },
  'DIS': { name: 'Walt Disney Company', sector: 'Consumer Discretionary' },
  'NKE': { name: 'Nike Inc.', sector: 'Consumer Discretionary' },
  'SBUX': { name: 'Starbucks Corporation', sector: 'Consumer Discretionary' },
  'LULU': { name: 'Lululemon Athletica Inc.', sector: 'Consumer Discretionary' },
  'KO': { name: 'Coca-Cola Company', sector: 'Consumer Staples' },
  'MCD': { name: 'McDonald\'s Corporation', sector: 'Consumer Discretionary' },
  'FDX': { name: 'FedEx Corporation', sector: 'Industrials' },
  'CAT': { name: 'Caterpillar Inc.', sector: 'Industrials' },
  'AVGO': { name: 'Broadcom Inc.', sector: 'Technology' },
  'ORCL': { name: 'Oracle Corporation', sector: 'Technology' },
  'ADBE': { name: 'Adobe Inc.', sector: 'Technology' },
  'TXN': { name: 'Texas Instruments Inc.', sector: 'Technology' },
  'NXPI': { name: 'NXP Semiconductors N.V.', sector: 'Technology' },
  'ON': { name: 'ON Semiconductor Corporation', sector: 'Technology' },
  'ADI': { name: 'Analog Devices Inc.', sector: 'Technology' },
  'MU': { name: 'Micron Technology Inc.', sector: 'Technology' },
  'ARM': { name: 'Arm Holdings plc', sector: 'Technology' },
  'SMCI': { name: 'Super Micro Computer Inc.', sector: 'Technology' },
  'DDOG': { name: 'Datadog Inc.', sector: 'Technology' },
  'PLTR': { name: 'Palantir Technologies Inc.', sector: 'Technology' },
  'PANW': { name: 'Palo Alto Networks Inc.', sector: 'Technology' },
  'CRWD': { name: 'CrowdStrike Holdings Inc.', sector: 'Technology' },
  'FTNT': { name: 'Fortinet Inc.', sector: 'Technology' },
  'OKTA': { name: 'Okta Inc.', sector: 'Technology' },
  'TEAM': { name: 'Atlassian Corporation', sector: 'Technology' },
  'INTU': { name: 'Intuit Inc.', sector: 'Technology' },
  'WDAY': { name: 'Workday Inc.', sector: 'Technology' },
  'PYPL': { name: 'PayPal Holdings Inc.', sector: 'Financials' },
  'SOFI': { name: 'SoFi Technologies Inc.', sector: 'Financials' },
  'IBKR': { name: 'Interactive Brokers Group Inc.', sector: 'Financials' },
  'WFC': { name: 'Wells Fargo & Company', sector: 'Financials' },
  'C': { name: 'Citigroup Inc.', sector: 'Financials' },
  'GS': { name: 'Goldman Sachs Group Inc.', sector: 'Financials' },
  'MS': { name: 'Morgan Stanley', sector: 'Financials' },
  'SCHW': { name: 'Charles Schwab Corporation', sector: 'Financials' },
  'AXP': { name: 'American Express Company', sector: 'Financials' },
  'BLK': { name: 'BlackRock Inc.', sector: 'Financials' },
  'BX': { name: 'Blackstone Inc.', sector: 'Financials' },
  'KKR': { name: 'KKR & Co. Inc.', sector: 'Financials' },
  'XOM': { name: 'Exxon Mobil Corporation', sector: 'Energy' },
  'CVX': { name: 'Chevron Corporation', sector: 'Energy' },
  'COP': { name: 'ConocoPhillips', sector: 'Energy' },
  'SLB': { name: 'SLB Limited', sector: 'Energy' },
  'HAL': { name: 'Halliburton Company', sector: 'Energy' },
  'EOG': { name: 'EOG Resources Inc.', sector: 'Energy' },
  'LNG': { name: 'Cheniere Energy Inc.', sector: 'Energy' },
  'NEE': { name: 'NextEra Energy Inc.', sector: 'Utilities' },
  'ENPH': { name: 'Enphase Energy Inc.', sector: 'Technology' },
  'FSLR': { name: 'First Solar Inc.', sector: 'Technology' },
  'DE': { name: 'Deere & Company', sector: 'Industrials' },
  'GE': { name: 'General Electric Company', sector: 'Industrials' },
  'GEV': { name: 'GE Vernova Inc.', sector: 'Industrials' },
  'ETN': { name: 'Eaton Corporation plc', sector: 'Industrials' },
  'EMR': { name: 'Emerson Electric Co.', sector: 'Industrials' },
  'PH': { name: 'Parker-Hannifin Corporation', sector: 'Industrials' },
  'NOC': { name: 'Northrop Grumman Corporation', sector: 'Industrials' },
  'LMT': { name: 'Lockheed Martin Corporation', sector: 'Industrials' },
  'RTX': { name: 'RTX Corporation', sector: 'Industrials' },
  'BA': { name: 'Boeing Company', sector: 'Industrials' },
  'UPS': { name: 'United Parcel Service Inc.', sector: 'Industrials' },
  'JNJ': { name: 'Johnson & Johnson', sector: 'Healthcare' },
  'PFE': { name: 'Pfizer Inc.', sector: 'Healthcare' },
  'ABBV': { name: 'AbbVie Inc.', sector: 'Healthcare' },
  'TMO': { name: 'Thermo Fisher Scientific Inc.', sector: 'Healthcare' },
  'DHR': { name: 'Danaher Corporation', sector: 'Healthcare' },
  'MDT': { name: 'Medtronic plc', sector: 'Healthcare' },
  'REGN': { name: 'Regeneron Pharmaceuticals Inc.', sector: 'Healthcare' },
  'MRNA': { name: 'Moderna Inc.', sector: 'Healthcare' },
  'TGT': { name: 'Target Corporation', sector: 'Consumer Discretionary' },
  'LOW': { name: 'Lowe\'s Companies Inc.', sector: 'Consumer Discretionary' },
  'CMG': { name: 'Chipotle Mexican Grill Inc.', sector: 'Consumer Discretionary' },
  'PEP': { name: 'PepsiCo Inc.', sector: 'Consumer Staples' },
  'BKNG': { name: 'Booking Holdings Inc.', sector: 'Consumer Discretionary' },
  'MAR': { name: 'Marriott International Inc.', sector: 'Consumer Discretionary' },
  'SPOT': { name: 'Spotify Technology S.A.', sector: 'Consumer Discretionary' },
  'PINS': { name: 'Pinterest Inc.', sector: 'Consumer Discretionary' },
  'TTD': { name: 'The Trade Desk Inc.', sector: 'Technology' },
  'ROKU': { name: 'Roku Inc.', sector: 'Consumer Discretionary' },
  'ETSY': { name: 'Etsy Inc.', sector: 'Consumer Discretionary' },
  'F': { name: 'Ford Motor Company', sector: 'Consumer Discretionary' },
  'GM': { name: 'General Motors Company', sector: 'Consumer Discretionary' },
  'STLA': { name: 'Stellantis N.V.', sector: 'Consumer Discretionary' },
  '700': { name: 'Tencent Holdings Limited', sector: 'Technology' },
  '3690': { name: 'Meituan', sector: 'Consumer Discretionary' },
  '1810': { name: 'Xiaomi Corporation', sector: 'Technology' },
  'BABA': { name: 'Alibaba Group Holding Limited', sector: 'Consumer Discretionary' }
};

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
      'YouTube\'s strong position in video content and creator economy',
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
        summary: 'European regulators launch probe into Google\'s AI partnerships.',
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
      'Content cost inflation and production budget press
