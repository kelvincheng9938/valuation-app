// lib/demoData.js
// Demo dataset for your valuation app (static close prices; easy to maintain).
// Update `price` fields every 1–2 days; other fields (peers/segments/eps) can be quarterly.
// Fields kept simple and consistent with your current components.

// ==============================
// Helper: tiny color palette
// ==============================
const C = {
  green: '#10b981',
  blue:  '#60a5fa',
  amber: '#f59e0b',
  teal:  '#14b8a6',
  rose:  '#fb7185',
  indigo:'#818cf8',
  slate: '#94a3b8'
};

// ==============================
// Core Demo Stock Database
// - price = last market close (static; update manually as needed)
// - change/changePercent set to 0 for demo stability
// - peers format: [capB, forwardPE, ttmPE, 'SYMBOL']
// - segments: [{name, value, itemStyle?}]
// ==============================
export const DEMO_STOCK_DATA = {
  // ======= US Mega/Large Tech =======
  'AAPL': {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    marketCap: '3.6T',
    price: 236.10, change: 0.00, changePercent: 0.00,
    ttmPE: 35.1, forwardPE: 32.0,
    eps: { years: ['2025','2026','2027'], values: [7.25, 7.90, 8.55] },
    peBands: { low: 24, mid: 28, high: 33 },
    scores: { value: 6.2, growth: 7.8, profit: 9.2, momentum: 7.4 },
    peers: [
      [3600, 32.0, 35.1, 'AAPL'],
      [3300, 33.5, 38.0, 'MSFT'],
      [2000, 27.0, 30.5, 'GOOGL'],
      [1900, 26.5, 27.8, 'META']
    ],
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: C.blue } },
      { name: 'Mac & iPad', value: 20, itemStyle: { color: C.indigo } },
      { name: 'Wearables', value: 10, itemStyle: { color: C.teal } },
      { name: 'Services', value: 18, itemStyle: { color: C.green } }
    ],
    strengths: ['Iconic ecosystem', 'Cash generation', 'Services expansion'],
    risks: ['Hardware cycles', 'Regulatory scrutiny', 'Supply chain']
  },

  'MSFT': {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    marketCap: '3.5T',
    price: 420.50, change: 0.00, changePercent: 0.00,
    ttmPE: 39.5, forwardPE: 33.0,
    eps: { years: ['2025','2026','2027'], values: [12.9, 14.3, 15.9] },
    peBands: { low: 28, mid: 32, high: 40 },
    scores: { value: 7.2, growth: 8.8, profit: 9.5, momentum: 8.2 },
    peers: [
      [3500, 33.0, 39.5, 'MSFT'],
      [3600, 32.0, 35.1, 'AAPL'],
      [2000, 26.0, 29.5, 'GOOGL'],
      [700,  40.0, 55.0, 'CRM']
    ],
    segments: [
      { name: 'Productivity & Business', value: 43, itemStyle: { color: C.indigo } },
      { name: 'Intelligent Cloud', value: 38, itemStyle: { color: C.teal } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: C.blue } }
    ],
    strengths: ['Cloud leadership', 'Enterprise lock-in', 'AI integration'],
    risks: ['Competition', 'Regulatory risk']
  },

  'GOOGL': {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Communication Services',
    marketCap: '2.2T',
    price: 181.30, change: 0.00, changePercent: 0.00,
    ttmPE: 29.2, forwardPE: 25.0,
    eps: { years: ['2025','2026','2027'], values: [7.8, 8.7, 9.6] },
    peBands: { low: 22, mid: 25, high: 30 },
    scores: { value: 7.5, growth: 7.9, profit: 9.0, momentum: 7.2 },
    peers: [
      [2200, 25.0, 29.2, 'GOOGL'],
      [1900, 26.5, 27.8, 'META'],
      [280,  28.0, 32.0, 'NFLX'],
      [170,  21.0, 30.2, 'DIS']
    ],
    segments: [
      { name: 'Advertising', value: 76, itemStyle: { color: C.amber } },
      { name: 'Cloud', value: 12, itemStyle: { color: C.teal } },
      { name: 'Other Bets & Misc', value: 12, itemStyle: { color: C.slate } }
    ],
    strengths: ['Search/Ads scale', 'Cloud growth', 'AI infra'],
    risks: ['Ad cyclicality', 'Regulation', 'Competition']
  },

  'META': {
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    sector: 'Communication Services',
    marketCap: '1.2T',
    price: 515.25, change: 0.00, changePercent: 0.00,
    ttmPE: 27.8, forwardPE: 24.5,
    eps: { years: ['2025','2026','2027'], values: [19.5, 21.8, 24.1] },
    peBands: { low: 20, mid: 24, high: 30 },
    scores: { value: 7.0, growth: 8.3, profit: 9.0, momentum: 8.0 },
    peers: [
      [1200, 24.5, 27.8, 'META'],
      [2200, 25.0, 29.2, 'GOOGL'],
      [280,  28.0, 32.0, 'NFLX'],
      [170,  21.0, 30.2, 'DIS']
    ],
    segments: [
      { name: 'Family of Apps', value: 97, itemStyle: { color: C.indigo } },
      { name: 'Reality Labs', value: 3, itemStyle: { color: C.rose } }
    ],
    strengths: ['Ads reach', 'Engagement', 'Cash flow'],
    risks: ['Regulation', 'Reels/TikTok competition', 'Hardware bets']
  },

  'AMZN': {
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'Consumer Discretionary',
    marketCap: '2.4T',
    price: 188.80, change: 0.00, changePercent: 0.00,
    ttmPE: 58.0, forwardPE: 35.0,
    eps: { years: ['2025','2026','2027'], values: [4.8, 6.3, 7.9] },
    peBands: { low: 25, mid: 30, high: 38 },
    scores: { value: 6.1, growth: 8.8, profit: 8.2, momentum: 7.9 },
    peers: [
      [2400, 35.0, 58.0, 'AMZN'],
      [120,  45.0, 85.5, 'SHOP'],
      [210,  20.0, 24.0, 'QCOM'],
      [85,   45.0, 45.0, 'MELI']
    ],
    segments: [
      { name: 'Online Stores', value: 41, itemStyle: { color: C.blue } },
      { name: 'AWS', value: 17, itemStyle: { color: C.teal } },
      { name: 'Third-Party & Ads', value: 42, itemStyle: { color: C.green } }
    ],
    strengths: ['Scale', 'AWS margin', 'Ads growth'],
    risks: ['Margins sensitivity', 'Regulation', 'Competition']
  },

  'NVDA': {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    marketCap: '3.0T',
    price: 124.60, change: 0.00, changePercent: 0.00, // post-split demo
    ttmPE: 75.0, forwardPE: 45.0,
    eps: { years: ['2025','2026','2027'], values: [4.8, 5.6, 6.3] },
    peBands: { low: 35, mid: 45, high: 60 },
    scores: { value: 5.5, growth: 9.8, profit: 9.6, momentum: 9.0 },
    peers: [
      [3000, 45.0, 75.0, 'NVDA'],
      [450,  35.0, 45.1, 'AMD'],
      [180,  18.0, 28.0, 'INTC'],
      [210,  20.0, 24.0, 'QCOM']
    ],
    segments: [
      { name: 'Data Center', value: 82, itemStyle: { color: C.teal } },
      { name: 'Gaming', value: 12, itemStyle: { color: C.indigo } },
      { name: 'Pro Viz & Auto', value: 6, itemStyle: { color: C.amber } }
    ],
    strengths: ['AI leadership', 'CUDA moat'],
    risks: ['Cyclicality', 'Supply constraints', 'Regulation']
  },

  'AMD': {
    ticker: 'AMD',
    name: 'Advanced Micro Devices, Inc.',
    sector: 'Technology',
    marketCap: '450B',
    price: 161.20, change: 0.00, changePercent: 0.00,
    ttmPE: 45.1, forwardPE: 35.0,
    eps: { years: ['2025','2026','2027'], values: [5.2, 6.1, 7.5] },
    peBands: { low: 30, mid: 35, high: 40 },
    scores: { value: 6.3, growth: 8.9, profit: 8.4, momentum: 8.6 },
    peers: [
      [450, 35.0, 45.1, 'AMD'],
      [3000,45.0, 75.0, 'NVDA'],
      [180, 18.0, 28.0, 'INTC'],
      [210, 20.0, 24.0, 'QCOM']
    ],
    segments: [
      { name: 'Data Center', value: 55, itemStyle: { color: C.teal } },
      { name: 'Client', value: 25, itemStyle: { color: C.blue } },
      { name: 'Gaming', value: 15, itemStyle: { color: C.indigo } },
      { name: 'Embedded', value: 5, itemStyle: { color: C.amber } }
    ],
    strengths: ['EPYC share gains', 'AI accelerator ramp'],
    risks: ['Competition', 'PC cycle', 'Pricing power']
  },

  'TSLA': {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Consumer Discretionary',
    marketCap: '800B',
    price: 238.40, change: 0.00, changePercent: 0.00,
    ttmPE: 55.0, forwardPE: 45.0,
    eps: { years: ['2025','2026','2027'], values: [5.1, 6.0, 7.2] },
    peBands: { low: 35, mid: 45, high: 60 },
    scores: { value: 5.8, growth: 8.5, profit: 7.6, momentum: 8.1 },
    peers: [
      [800, 45.0, 55.0, 'TSLA'],
      [65,  20.0, 24.0, 'F'],
      [50,  14.0, 18.0, 'GM']
    ],
    segments: [
      { name: 'EV Vehicles', value: 85, itemStyle: { color: C.indigo } },
      { name: 'Energy/Storage', value: 10, itemStyle: { color: C.teal } },
      { name: 'Services', value: 5, itemStyle: { color: C.slate } }
    ],
    strengths: ['Brand & scale', 'Vertical integration'],
    risks: ['Competition', 'Pricing', 'Regulatory']
  },

  'NFLX': {
    ticker: 'NFLX',
    name: 'Netflix, Inc.',
    sector: 'Communication Services',
    marketCap: '280B',
    price: 690.20, change: 0.00, changePercent: 0.00,
    ttmPE: 32.0, forwardPE: 28.0,
    eps: { years: ['2025','2026','2027'], values: [18.5, 20.2, 22.0] },
    peBands: { low: 24, mid: 28, high: 32 },
    scores: { value: 6.8, growth: 7.9, profit: 8.7, momentum: 8.4 },
    peers: [
      [280, 28.0, 32.0, 'NFLX'],
      [170, 21.0, 30.2, 'DIS'],
      [60,  14.0, 18.0, 'WBD'],
      [12,  12.0, 16.0, 'PARA']
    ],
    segments: [
      { name: 'Streaming', value: 100, itemStyle: { color: C.indigo } }
    ],
    strengths: ['Global scale', 'Content engine'],
    risks: ['Content costs', 'Competition']
  },

  'CRM': {
    ticker: 'CRM',
    name: 'Salesforce, Inc.',
    sector: 'Technology',
    marketCap: '700B',
    price: 295.60, change: 0.00, changePercent: 0.00,
    ttmPE: 55.0, forwardPE: 40.0,
    eps: { years: ['2025','2026','2027'], values: [9.5, 11.2, 12.8] },
    peBands: { low: 25, mid: 30, high: 35 },
    scores: { value: 6.0, growth: 8.2, profit: 8.5, momentum: 7.9 },
    peers: [
      [700, 40.0, 55.0, 'CRM'],
      [250, 32.0, 45.0, 'NOW'],
      [180, 28.0, 38.0, 'ADBE']
    ],
    segments: [
      { name: 'Subscription & Support', value: 94, itemStyle: { color: C.teal } },
      { name: 'Professional Services', value: 6, itemStyle: { color: C.slate } }
    ],
    strengths: ['Enterprise CRM leader', 'High retention'],
    risks: ['Macro IT spend', 'Competition']
  },

  // ======= Your requested NEW/Key demo tickers =======

  'DIS': {
    ticker: 'DIS',
    name: 'The Walt Disney Company',
    sector: 'Communication Services',
    marketCap: '170B',
    price: 95.40, change: 0.00, changePercent: 0.00,
    ttmPE: 30.2, forwardPE: 21.0,
    eps: { years: ['2025','2026','2027'], values: [5.1, 6.0, 6.8] },
    peBands: { low: 18, mid: 22, high: 26 },
    scores: { value: 6.1, growth: 6.8, profit: 7.2, momentum: 6.5 },
    peers: [
      [170, 21.0, 30.2, 'DIS'],
      [280, 28.0, 32.0, 'NFLX'],
      [60,  14.0, 18.0, 'WBD'],
      [12,  12.0, 16.0, 'PARA']
    ],
    segments: [
      { name: 'Entertainment', value: 55, itemStyle: { color: C.indigo } },
      { name: 'Parks & Experiences', value: 30, itemStyle: { color: C.green } },
      { name: 'Sports (ESPN)', value: 15, itemStyle: { color: C.amber } }
    ],
    strengths: ['Brands & IP', 'Parks cash flow'],
    risks: ['Linear TV declines', 'Content costs']
  },

  'SHOP': {
    ticker: 'SHOP',
    name: 'Shopify Inc.',
    sector: 'Information Technology',
    marketCap: '85B',
    price: 65.10, change: 0.00, changePercent: 0.00,
    ttmPE: 85.5, forwardPE: 55.0,
    eps: { years: ['2025','2026','2027'], values: [1.25, 1.60, 2.10] },
    peBands: { low: 40, mid: 55, high: 70 },
    scores: { value: 5.6, growth: 8.6, profit: 6.8, momentum: 7.2 },
    peers: [
      [85,  55.0, 85.5, 'SHOP'],
      [2400,35.0, 58.0, 'AMZN'],
      [120, 45.0, 45.0, 'MELI'],
      [12,  25.0, 28.0, 'ETSY']
    ],
    segments: [
      { name: 'Merchant Solutions', value: 60, itemStyle: { color: C.teal } },
      { name: 'Subscription Solutions', value: 35, itemStyle: { color: C.indigo } },
      { name: 'Other', value: 5, itemStyle: { color: C.slate } }
    ],
    strengths: ['SMB enablement', 'Ecosystem'],
    risks: ['Take-rate pressure', 'Competition']
  },

  'NKE': {
    ticker: 'NKE',
    name: 'NIKE, Inc.',
    sector: 'Consumer Discretionary',
    marketCap: '150B',
    price: 89.70, change: 0.00, changePercent: 0.00,
    ttmPE: 30.0, forwardPE: 25.0,
    eps: { years: ['2025','2026','2027'], values: [3.1, 3.5, 3.9] },
    peBands: { low: 20, mid: 24, high: 28 },
    scores: { value: 6.5, growth: 6.8, profit: 8.0, momentum: 6.2 },
    peers: [
      [150, 25.0, 30.0, 'NKE'],
      [60,  22.0, 28.0, 'LULU'],
      [10,  18.0, 22.0, 'UA']
    ],
    segments: [
      { name: 'Footwear', value: 65, itemStyle: { color: C.indigo } },
      { name: 'Apparel', value: 30, itemStyle: { color: C.green } },
      { name: 'Equipment', value: 5, itemStyle: { color: C.slate } }
    ],
    strengths: ['Brand power', 'Global distribution'],
    risks: ['Consumer demand cycles', 'Inventory']
  },

  'TSM': {
    ticker: 'TSM',
    name: 'Taiwan Semiconductor Mfg. Co. Ltd.',
    sector: 'Technology',
    marketCap: '1.0T',
    price: 165.40, change: 0.00, changePercent: 0.00,
    ttmPE: 32.0, forwardPE: 25.0,
    eps: { years: ['2025','2026','2027'], values: [6.2, 6.9, 7.6] },
    peBands: { low: 22, mid: 26, high: 32 },
    scores: { value: 7.1, growth: 7.8, profit: 9.2, momentum: 7.7 },
    peers: [
      [1000,25.0, 32.0, 'TSM'],
      [450, 35.0, 45.1, 'AMD'],
      [180, 18.0, 28.0, 'INTC']
    ],
    segments: [
      { name: 'Foundry Services', value: 100, itemStyle: { color: C.teal } }
    ],
    strengths: ['Node leadership', 'Scale'],
    risks: ['Geopolitics', 'Cycle']
  },

  'PLTR': {
    ticker: 'PLTR',
    name: 'Palantir Technologies Inc.',
    sector: 'Information Technology',
    marketCap: '70B',
    price: 30.80, change: 0.00, changePercent: 0.00,
    ttmPE: 72.0, forwardPE: 48.0,
    eps: { years: ['2025','2026','2027'], values: [0.42, 0.56, 0.72] },
    peBands: { low: 35, mid: 45, high: 60 },
    scores: { value: 5.0, growth: 8.2, profit: 6.0, momentum: 7.5 },
    peers: [
      [70, 48.0, 72.0, 'PLTR'],
      [295,40.0, 55.0, 'CRM'],
      [180,38.0, 45.0, 'ADBE']
    ],
    segments: [
      { name: 'Government', value: 55, itemStyle: { color: C.indigo } },
      { name: 'Commercial', value: 45, itemStyle: { color: C.teal } }
    ],
    strengths: ['Sticky gov contracts', 'AI platforms'],
    risks: ['Valuation', 'Contract timing']
  },

  'SNOW': {
    ticker: 'SNOW',
    name: 'Snowflake Inc.',
    sector: 'Information Technology',
    marketCap: '60B',
    price: 165.50, change: 0.00, changePercent: 0.00,
    ttmPE: 0.0, forwardPE: 55.0,
    eps: { years: ['2025','2026','2027'], values: [1.20, 1.60, 2.10] },
    peBands: { low: 40, mid: 55, high: 70 },
    scores: { value: 4.8, growth: 8.6, profit: 5.8, momentum: 7.0 },
    peers: [
      [60, 55.0, 0.0, 'SNOW'],
      [295,40.0, 55.0, 'CRM'],
      [180,38.0, 45.0, 'ADBE']
    ],
    segments: [
      { name: 'Data Cloud', value: 100, itemStyle: { color: C.teal } }
    ],
    strengths: ['Consumption model', 'Ecosystem'],
    risks: ['Optimization headwinds', 'Competition']
  },

  'CRWD': {
    ticker: 'CRWD',
    name: 'CrowdStrike Holdings, Inc.',
    sector: 'Information Technology',
    marketCap: '90B',
    price: 300.30, change: 0.00, changePercent: 0.00,
    ttmPE: 82.0, forwardPE: 58.0,
    eps: { years: ['2025','2026','2027'], values: [3.9, 5.1, 6.4] },
    peBands: { low: 40, mid: 55, high: 70 },
    scores: { value: 5.2, growth: 9.0, profit: 6.6, momentum: 8.5 },
    peers: [
      [90, 58.0, 82.0, 'CRWD'],
      [60, 55.0, 0.0, 'SNOW'],
      [180,38.0, 45.0, 'ADBE']
    ],
    segments: [
      { name: 'Security Subscriptions', value: 95, itemStyle: { color: C.indigo } },
      { name: 'Pro Services', value: 5,  itemStyle: { color: C.slate } }
    ],
    strengths: ['Falcon platform', 'Net retention'],
    risks: ['Competition', 'Valuation']
  },

  'ZM': {
    ticker: 'ZM',
    name: 'Zoom Video Communications, Inc.',
    sector: 'Information Technology',
    marketCap: '18B',
    price: 62.40, change: 0.00, changePercent: 0.00,
    ttmPE: 21.0, forwardPE: 18.0,
    eps: { years: ['2025','2026','2027'], values: [4.45, 4.70, 5.00] },
    peBands: { low: 16, mid: 20, high: 26 },
    scores: { value: 7.0, growth: 5.8, profit: 7.2, momentum: 5.9 },
    peers: [
      [18, 18.0, 21.0, 'ZM'],
      [295,40.0, 55.0, 'CRM'],
      [180,38.0, 45.0, 'ADBE']
    ],
    segments: [
      { name: 'Meetings', value: 70, itemStyle: { color: C.indigo } },
      { name: 'Phone/Contact Center', value: 30, itemStyle: { color: C.teal } }
    ],
    strengths: ['Profit discipline', 'Enterprise upsell'],
    risks: ['Competition', 'Growth decel']
  },

  'JPM': {
    ticker: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financials',
    marketCap: '590B',
    price: 208.90, change: 0.00, changePercent: 0.00,
    ttmPE: 12.0, forwardPE: 11.0,
    eps: { years: ['2025','2026','2027'], values: [16.8, 17.4, 18.2] },
    peBands: { low: 9, mid: 11, high: 13 },
    scores: { value: 7.6, growth: 5.2, profit: 8.5, momentum: 6.0 },
    peers: [
      [590,11.0, 12.0, 'JPM'],
      [260,10.0, 12.0, 'BAC'],
      [150,9.5,  11.0, 'WFC']
    ],
    segments: [
      { name: 'Consumer & Community Banking', value: 45, itemStyle: { color: C.indigo } },
      { name: 'Corporate & Investment Bank', value: 35, itemStyle: { color: C.teal } },
      { name: 'Commercial & Asset Mgmt', value: 20, itemStyle: { color: C.green } }
    ],
    strengths: ['Scale & ROE', 'Risk mgmt'],
    risks: ['Credit cycle', 'Regulation']
  },

  'FDX': {
    ticker: 'FDX',
    name: 'FedEx Corporation',
    sector: 'Industrials',
    marketCap: '70B',
    price: 284.60, change: 0.00, changePercent: 0.00,
    ttmPE: 16.0, forwardPE: 14.0,
    eps: { years: ['2025','2026','2027'], values: [17.2, 18.5, 20.1] },
    peBands: { low: 12, mid: 14, high: 17 },
    scores: { value: 7.2, growth: 5.9, profit: 7.0, momentum: 6.1 },
    peers: [
      [70, 14.0, 16.0, 'FDX'],
      [140,15.0, 18.0, 'UPS']
    ],
    segments: [
      { name: 'Express', value: 55, itemStyle: { color: C.indigo } },
      { name: 'Ground',  value: 35, itemStyle: { color: C.teal } },
      { name: 'Freight', value: 10, itemStyle: { color: C.amber } }
    ],
    strengths: ['Network scale', 'Yield mgmt'],
    risks: ['Macro, fuel, labor']
  },

  'WMT': {
    ticker: 'WMT',
    name: 'Walmart Inc.',
    sector: 'Consumer Staples',
    marketCap: '570B',
    price: 74.80, change: 0.00, changePercent: 0.00, // post-split demo
    ttmPE: 30.0, forwardPE: 24.0,
    eps: { years: ['2025','2026','2027'], values: [2.62, 2.85, 3.10] },
    peBands: { low: 20, mid: 24, high: 28 },
    scores: { value: 6.9, growth: 6.1, profit: 7.6, momentum: 6.8 },
    peers: [
      [570,24.0, 30.0, 'WMT'],
      [350,28.0, 35.0, 'COST'],
      [40, 22.0, 25.0, 'TGT']
    ],
    segments: [
      { name: 'U.S.', value: 65, itemStyle: { color: C.indigo } },
      { name: 'International', value: 25, itemStyle: { color: C.teal } },
      { name: 'Sam’s Club', value: 10, itemStyle: { color: C.green } }
    ],
    strengths: ['Scale & EDLP', 'Omni-channel'],
    risks: ['Margins', 'Competition']
  },

  'COST': {
    ticker: 'COST',
    name: 'Costco Wholesale Corporation',
    sector: 'Consumer Staples',
    marketCap: '350B',
    price: 925.10, change: 0.00, changePercent: 0.00,
    ttmPE: 48.0, forwardPE: 38.0,
    eps: { years: ['2025','2026','2027'], values: [16.8, 18.9, 21.0] },
    peBands: { low: 30, mid: 38, high: 48 },
    scores: { value: 6.0, growth: 7.2, profit: 9.0, momentum: 8.0 },
    peers: [
      [350,38.0, 48.0, 'COST'],
      [570,24.0, 30.0, 'WMT'],
      [40, 22.0, 25.0, 'TGT']
    ],
    segments: [
      { name: 'Membership & Retail', value: 100, itemStyle: { color: C.teal } }
    ],
    strengths: ['Membership flywheel', 'Traffic'],
    risks: ['Valuation', 'Competition']
  },

  // ======= “XYZ” = Block, Inc. (per your note) =======
  'XYZ': {
    ticker: 'XYZ',
    name: 'Block, Inc.',
    sector: 'Information Technology',
    marketCap: '70B',
    price: 157.70, change: 0.00, changePercent: 0.00,
    ttmPE: 40.6, forwardPE: 26.0,
    eps: { years: ['2025','2026','2027'], values: [2.6, 3.2, 4.0] },
    peBands: { low: 20, mid: 25, high: 30 },
    scores: { value: 6.0, growth: 8.4, profit: 7.1, momentum: 7.8 },
    peers: [
      [70, 26.0, 40.6, 'XYZ'],
      [400,30.0, 38.0, 'V'],
      [380,28.0, 36.0, 'MA'],
      [30, 22.0, 28.0, 'SQ']
    ],
    segments: [
      { name: 'Cash App', value: 55, itemStyle: { color: C.indigo } },
      { name: 'Square Ecosystem', value: 35, itemStyle: { color: C.teal } },
      { name: 'Other', value: 10, itemStyle: { color: C.slate } }
    ],
    strengths: ['Consumer network effects', 'Merchant solutions'],
    risks: ['Fintech competition', 'Margins']
  },

  // ======= US Big-Box / Consumer / Misc (few extras) =======
  'HD': {
    ticker: 'HD',
    name: 'The Home Depot, Inc.',
    sector: 'Consumer Discretionary',
    marketCap: '360B',
    price: 385.20, change: 0.00, changePercent: 0.00,
    ttmPE: 25.0, forwardPE: 22.0,
    eps: { years: ['2025','2026','2027'], values: [15.6, 16.4, 17.3] },
    peBands: { low: 18, mid: 22, high: 26 },
    scores: { value: 6.9, growth: 5.8, profit: 8.8, momentum: 6.4 },
    peers: [
      [360,22.0,25.0,'HD'],
      [210,20.0,23.0,'LOW']
    ],
    segments: [
      { name: 'Home Improvement Retail', value: 100, itemStyle: { color: C.indigo } }
    ],
    strengths: ['Scale & pro customer'],
    risks: ['Housing cycle']
  },

  // ======= HK tickers you requested (demo approximations) =======
  '1810HK': {
    ticker: '1810HK',
    name: 'Xiaomi Corporation',
    sector: 'Consumer Electronics',
    marketCap: '50B',
    price: 17.30, change: 0.00, changePercent: 0.00, // HKD demo
    ttmPE: 24.0, forwardPE: 20.0,
    eps: { years: ['2025','2026','2027'], values: [1.10, 1.25, 1.40] },
    peBands: { low: 16, mid: 20, high: 26 },
    scores: { value: 6.2, growth: 7.1, profit: 6.5, momentum: 6.0 },
    peers: [
      [50, 20.0, 24.0, '1810HK'],
      [85, 25.0, 30.0, 'AAPL'],
      [85, 22.0, 28.0, 'SAMS'] // demo label
    ],
    segments: [
      { name: 'Smartphones', value: 60, itemStyle: { color: C.indigo } },
      { name: 'IoT & Lifestyle', value: 30, itemStyle: { color: C.teal } },
      { name: 'Internet Services', value: 10, itemStyle: { color: C.green } }
    ],
    strengths: ['Value hardware', 'Ecosystem'],
    risks: ['Competition', 'Margins']
  },

  '9988HK': {
    ticker: '9988HK',
    name: 'Alibaba Group Holding Ltd.',
    sector: 'Consumer/Tech',
    marketCap: '190B',
    price: 78.60, change: 0.00, changePercent: 0.00, // USD-ADR-like demo
    ttmPE: 18.0, forwardPE: 14.0,
    eps: { years: ['2025','2026','2027'], values: [7.1, 7.9, 8.6] },
    peBands: { low: 12, mid: 15, high: 20 },
    scores: { value: 7.2, growth: 7.0, profit: 7.8, momentum: 6.4 },
    peers: [
      [190,14.0,18.0,'9988HK'],
      [85, 55.0,85.5,'SHOP'],
      [2400,35.0,58.0,'AMZN']
    ],
    segments: [
      { name: 'Commerce', value: 70, itemStyle: { color: C.indigo } },
      { name: 'Cloud', value: 12, itemStyle: { color: C.teal } },
      { name: 'Logistics & Other', value: 18, itemStyle: { color: C.slate } }
    ],
    strengths: ['Platform scale', 'Cloud option'],
    risks: ['Regulatory', 'Competition']
  },

  '3690HK': {
    ticker: '3690HK',
    name: 'Meituan',
    sector: 'Consumer/Local Services',
    marketCap: '100B',
    price: 120.40, change: 0.00, changePercent: 0.00, // HKD demo
    ttmPE: 36.0, forwardPE: 25.0,
    eps: { years: ['2025','2026','2027'], values: [3.2, 4.1, 5.0] },
    peBands: { low: 20, mid: 25, high: 32 },
    scores: { value: 5.9, growth: 8.2, profit: 6.8, momentum: 6.6 },
    peers: [
      [100,25.0,36.0,'3690HK'],
      [280,28.0,32.0,'NFLX'],
      [85, 55.0,85.5,'SHOP']
    ],
    segments: [
      { name: 'Food Delivery', value: 60, itemStyle: { color: C.teal } },
      { name: 'In-Store & Hotel', value: 30, itemStyle: { color: C.indigo } },
      { name: 'Other', value: 10, itemStyle: { color: C.slate } }
    ],
    strengths: ['Local services network'],
    risks: ['Competition', 'Margins']
  },

  '700HK': {
    ticker: '700HK',
    name: 'Tencent Holdings Ltd.',
    sector: 'Communication Services / Tech',
    marketCap: '420B',
    price: 320.50, change: 0.00, changePercent: 0.00, // HKD demo
    ttmPE: 24.0, forwardPE: 20.0,
    eps: { years: ['2025','2026','2027'], values: [14.5, 16.0, 17.5] },
    peBands: { low: 16, mid: 20, high: 26 },
    scores: { value: 7.0, growth: 7.5, profit: 8.6, momentum: 6.8 },
    peers: [
      [420,20.0,24.0,'700HK'],
      [2200,25.0,29.2,'GOOGL'],
      [1200,24.5,27.8,'META']
    ],
    segments: [
      { name: 'Online Games', value: 33, itemStyle: { color: C.indigo } },
      { name: 'Social Ads', value: 34, itemStyle: { color: C.amber } },
      { name: 'Fintech & Cloud', value: 33, itemStyle: { color: C.teal } }
    ],
    strengths: ['Ecosystem & network effects'],
    risks: ['Regulatory', 'Macro']
  }
};

// ==============================
// Helpers
// ==============================

// Deep clone utility to avoid accidental mutations in React state
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Get a single stock by ticker (case-insensitive). Returns null if not found.
export function getDemoStockData(symbol) {
  if (!symbol) return null;
  const key = String(symbol).toUpperCase();
  const data = DEMO_STOCK_DATA[key];
  return data ? deepClone(data) : null;
}

// Return available demo tickers (array of strings)
export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA);
}

// Compact market snapshot for your Home/News top row (static demo values)
export function getDemoMarketData() {
  // % changes kept small to look sane on demo
  return {
    SPY:  { price: 520.10, change: 0.0, changePercent: +0.12 },
    QQQ:  { price: 470.20, change: 0.0, changePercent: +0.18 },
    BTC:  { price: 62000,  change: 0,   changePercent: -0.25 },
    GOLD: { price: 2360,   change: 0,   changePercent: +0.10 },
    WTI:  { price: 79.8,   change: 0,   changePercent: -0.15 }
  };
}
