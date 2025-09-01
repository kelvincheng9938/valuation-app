// lib/demoData.js
// Demo dataset - update only "price" every 1–2 days

export const DEMO_STOCK_DATA = {
  'AAPL': {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 232.14,
    marketCap: '3.6T',
    sector: 'Technology',
    eps: { years: ['2025','2026','2027'], values: [7.25,7.90,8.55] },
    peBands: { low: 24, mid: 28, high: 33 },
    scores: { value: 6.2, growth: 7.8, profit: 9.1, momentum: 7.4 },
    peers: ['MSFT','GOOGL','AMZN','META'],
    segments: [
      { name: 'iPhone', value: 52 },
      { name: 'Services', value: 22 },
      { name: 'Mac/iPad/Wearables', value: 26 }
    ],
    strengths: ['Ecosystem', 'Cash flow'],
    risks: ['Regulation','Hardware cycles'],
    news: []
  },

  'MSFT': {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    price: 506.69,
    marketCap: '3.5T',
    sector: 'Technology',
    eps: { years: ['2025','2026','2027'], values: [12.9,14.3,15.9] },
    peBands: { low: 28, mid: 32, high: 40 },
    scores: { value: 7.2, growth: 8.8, profit: 9.5, momentum: 8.2 },
    peers: ['AAPL','GOOGL','AMZN','CRM'],
    segments: [
      { name: 'Productivity & Business', value: 43 },
      { name: 'Cloud', value: 38 },
      { name: 'More Personal Computing', value: 19 }
    ],
    strengths: ['Cloud leadership','AI'],
    risks: ['Competition','Regulation'],
    news: []
  },

  'GOOGL': {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 212.91,
    marketCap: '2.2T',
    sector: 'Communication Services',
    eps: { years: ['2025','2026','2027'], values: [7.8,8.7,9.6] },
    peBands: { low: 22, mid: 25, high: 30 },
    scores: { value: 7.5, growth: 7.9, profit: 9.0, momentum: 7.2 },
    peers: ['META','NFLX','DIS'],
    segments: [
      { name: 'Search/Ads', value: 60 },
      { name: 'YouTube', value: 15 },
      { name: 'Cloud & Other', value: 25 }
    ],
    strengths: ['Ads scale','Cloud growth'],
    risks: ['Ad cyclicality','Regulation'],
    news: []
  },

  'NFLX': {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    price: 1208.25,
    marketCap: '280B',
    sector: 'Communication Services',
    eps: { years: ['2025','2026','2027'], values: [18.5,20.2,22.0] },
    peBands: { low: 24, mid: 28, high: 32 },
    scores: { value: 6.8, growth: 7.9, profit: 8.7, momentum: 8.4 },
    peers: ['DIS','WBD','PARA'],
    segments: [
      { name: 'Streaming', value: 95 },
      { name: 'Ads/Other', value: 5 }
    ],
    strengths: ['Global reach','Content'],
    risks: ['Competition','Content cost'],
    news: []
  },

  'AMZN': {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 229.00,
    marketCap: '2.4T',
    sector: 'Consumer Discretionary',
    eps: { years: ['2025','2026','2027'], values: [4.8,6.3,7.9] },
    peBands: { low: 25, mid: 30, high: 38 },
    scores: { value: 6.1, growth: 8.8, profit: 8.2, momentum: 7.9 },
    peers: ['WMT','COST','SHOP'],
    segments: [
      { name: 'Online Stores', value: 47 },
      { name: 'AWS', value: 33 },
      { name: 'Ads/Other', value: 20 }
    ],
    strengths: ['Scale','AWS','Ads'],
    risks: ['Margins','Regulation'],
    news: []
  },

  'TSLA': {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 333.86,
    marketCap: '800B',
    sector: 'Consumer Discretionary',
    eps: { years: ['2025','2026','2027'], values: [5.1,6.0,7.2] },
    peBands: { low: 35, mid: 45, high: 60 },
    scores: { value: 5.8, growth: 8.5, profit: 7.6, momentum: 8.1 },
    peers: ['F','GM','NIO'],
    segments: [
      { name: 'EVs', value: 85 },
      { name: 'Energy', value: 10 },
      { name: 'Services', value: 5 }
    ],
    strengths: ['Brand','Vertical integration'],
    risks: ['Competition','Pricing'],
    news: []
  },

  'NVDA': {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 174.11,
    marketCap: '3.0T',
    sector: 'Technology',
    eps: { years: ['2025','2026','2027'], values: [4.8,5.6,6.3] },
    peBands: { low: 35, mid: 45, high: 60 },
    scores: { value: 5.5, growth: 9.8, profit: 9.6, momentum: 9.0 },
    peers: ['AMD','INTC','QCOM','TSM'],
    segments: [
      { name: 'Data Center', value: 75 },
      { name: 'Gaming', value: 15 },
      { name: 'Other', value: 10 }
    ],
    strengths: ['AI leadership','CUDA'],
    risks: ['Cyclicality','Supply'],
    news: []
  },

  'CRM': {
    ticker: 'CRM',
    name: 'Salesforce Inc.',
    price: 256.25,
    sector: 'Technology',
    peers: ['MSFT','NOW','TEAM'],
    segments: [
      { name: 'Sales/Service Cloud', value: 70 },
      { name: 'Platform/Slack', value: 30 }
    ],
    strengths: ['CRM leader'], risks: ['Competition'], news: []
  },

  'NOW': {
    ticker: 'NOW',
    name: 'ServiceNow Inc.',
    price: 917.46,
    sector: 'Technology',
    peers: ['CRM','ADBE','ORCL'],
    segments: [
      { name: 'Subscription', value: 95 },
      { name: 'Services', value: 5 }
    ],
    strengths: ['Workflow automation'], risks: ['Competition'], news: []
  },

  'AMD': {
    ticker: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    price: 162.63,
    sector: 'Technology',
    peers: ['NVDA','INTC','QCOM'],
    segments: [
      { name: 'Data Center', value: 45 },
      { name: 'Client', value: 30 },
      { name: 'Gaming/Embedded', value: 25 }
    ],
    strengths: ['EPYC CPUs'], risks: ['PC cycle'], news: []
  },

  'QCOM': {
    ticker: 'QCOM',
    name: 'Qualcomm Inc.',
    price: 160.73,
    sector: 'Technology',
    peers: ['AAPL','AVGO','NVDA'],
    segments: [
      { name: 'Handset', value: 60 },
      { name: 'RF/IoT/Auto', value: 40 }
    ],
    strengths: ['5G leadership'], risks: ['Apple insourcing'], news: []
  },

  'TSM': {
    ticker: 'TSM',
    name: 'Taiwan Semiconductor Mfg.',
    price: 230.87,
    sector: 'Technology',
    peers: ['INTC','AMD','NVDA'],
    segments: [{ name: 'Foundry', value: 100 }],
    strengths: ['Node leadership'], risks: ['Geopolitics'], news: []
  },

  'INTC': {
    ticker: 'INTC',
    name: 'Intel Corp.',
    price: 24.35,
    sector: 'Technology',
    peers: ['AMD','NVDA','QCOM'],
    segments: [
      { name: 'Client Computing', value: 45 },
      { name: 'Data Center', value: 30 },
      { name: 'Foundry/Other', value: 25 }
    ],
    strengths: ['Scale'], risks: ['Competition'], news: []
  },

  'ISRG': {
    ticker: 'ISRG',
    name: 'Intuitive Surgical Inc.',
    price: 473.30,
    sector: 'Healthcare',
    peers: ['MDT','BSX','SYK'],
    segments: [
      { name: 'Instruments & Accessories', value: 60 },
      { name: 'Systems', value: 30 },
      { name: 'Services', value: 10 }
    ],
    strengths: ['da Vinci moat'], risks: ['Competition'], news: []
  },

  'LLY': {
    ticker: 'LLY',
    name: 'Eli Lilly & Co.',
    price: 732.58,
    sector: 'Healthcare',
    peers: ['PFE','NVO','MRK'],
    segments: [
      { name: 'Diabetes/Obesity', value: 55 },
      { name: 'Oncology', value: 25 },
      { name: 'Other', value: 20 }
    ],
    strengths: ['GLP-1 drugs'], risks: ['Patent cliffs'], news: []
  },

  'UNH': {
    ticker: 'UNH',
    name: 'UnitedHealth Group',
    price: 309.87,
    sector: 'Healthcare',
    peers: ['HUM','CI','ANTM'],
    segments: [
      { name: 'UnitedHealthcare', value: 75 },
      { name: 'Optum', value: 25 }
    ],
    strengths: ['Scale'], risks: ['Regulation'], news: []
  },

  'JPM': {
    ticker: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 301.42,
    sector: 'Financials',
    peers: ['BAC','C','WFC'],
    segments: [
      { name: 'Consumer Banking', value: 40 },
      { name: 'CIB', value: 35 },
      { name: 'AWM/Comm Banking', value: 25 }
    ],
    strengths: ['ROE','Scale'], risks: ['Credit cycle'], news: []
  },

  'XYZ': {
    ticker: 'XYZ',
    name: 'Block Inc. (alias)',
    price: 79.64,
    sector: 'Technology',
    peers: ['PYPL','COIN','ADYEN'],
    segments: [
      { name: 'Square', value: 55 },
      { name: 'Cash App', value: 35 },
      { name: 'Bitcoin/Other', value: 10 }
    ],
    strengths: ['Ecosystem'], risks: ['Crypto volatility'], news: []
  },

  'UBER': {
    ticker: 'UBER',
    name: 'Uber Technologies Inc.',
    price: 93.75,
    sector: 'Industrials',
    peers: ['LYFT','DASH','ABNB'],
    segments: [
      { name: 'Mobility', value: 55 },
      { name: 'Delivery', value: 40 },
      { name: 'Freight/Other', value: 5 }
    ],
    strengths: ['Network'], risks: ['Competition'], news: []
  },

  'COIN': {
    ticker: 'COIN',
    name: 'Coinbase Global Inc.',
    price: 304.54,
    sector: 'Financial Services',
    peers: ['PYPL','HOOD','XYZ'],
    segments: [
      { name: 'Transaction', value: 78 },
      { name: 'Subscription', value: 15 },
      { name: 'Other', value: 7 }
    ],
    strengths: ['US regulated'], risks: ['Crypto cycles'], news: []
  },

  'DIS': {
    ticker: 'DIS',
    name: 'Walt Disney Co.',
    price: 118.38,
    sector: 'Communication Services',
    peers: ['NFLX','WBD','PARA'],
    segments: [
      { name: 'Entertainment', value: 55 },
      { name: 'Parks', value: 30 },
      { name: 'Sports', value: 15 }
    ],
    strengths: ['Brands/IP'], risks: ['Linear TV'], news: []
  },

  'NKE': {
    ticker: 'NKE',
    name: 'Nike Inc.',
    price: 77.37,
    sector: 'Consumer Discretionary',
    peers: ['LULU','UAA','ADDYY'],
    segments: [
      { name: 'Footwear', value: 68 },
      { name: 'Apparel', value: 27 },
      { name: 'Equipment', value: 5 }
    ],
    strengths: ['Brand'], risks: ['Consumer cycle'], news: []
  },

  'KO': {
    ticker: 'KO',
    name: 'Coca-Cola Co.',
    price: 68.99,
    sector: 'Consumer Staples',
    peers: ['PEP','KDP','MNST'],
    segments: [
      { name: 'Sparkling Beverages', value: 65 },
      { name: 'Still Beverages', value: 25 },
      { name: 'Other', value: 10 }
    ],
    strengths: ['Global distribution'], risks: ['Sugar regulation'], news: []
  },

  'MCD': {
    ticker: 'MCD',
    name: 'McDonald’s Corp.',
    price: 313.54,
    sector: 'Consumer Discretionary',
    peers: ['YUM','QSR','WEN'],
    segments: [
      { name: 'Franchised Stores', value: 85 },
      { name: 'Company Stores', value: 15 }
    ],
    strengths: ['Brand','Scale'], risks: ['Consumer demand'], news: []
  },

  'WMT': {
    ticker: 'WMT',
    name: 'Walmart Inc.',
    price: 96.98,
    sector: 'Consumer Staples',
    peers: ['COST','TGT','AMZN'],
    segments: [
      { name: 'US Stores', value: 70 },
      { name: 'International', value: 20 },
      { name: 'Sam’s Club', value: 10 }
    ],
    strengths: ['Scale'], risks: ['Margins'], news: []
  },

  'COST': {
    ticker: 'COST',
    name: 'Costco Wholesale Corp.',
    price: 943.32,
    sector: 'Consumer Staples',
    peers: ['WMT','TGT','BJ'],
    segments: [{ name: 'Membership Warehouses', value: 100 }],
    strengths: ['Membership flywheel'], risks: ['Valuation'], news: []
  },

  // --- HK Stocks ---
  '700.HK': {
    ticker: '700.HK',
    name: 'Tencent Holdings Ltd',
    price: 605.00,
    sector: 'Communication Services',
    peers: ['3690.HK','9988.HK','1810.HK'],
    segments: [
      { name: 'Games', value: 32 },
      { name: 'Ads/Social', value: 40 },
      { name: 'FinTech/Cloud', value: 28 }
    ],
    strengths: ['Ecosystem'], risks: ['Regulation'], news: []
  },

  '9988.HK': {
    ticker: '9988.HK',
    name: 'Alibaba Group Holding',
    price: 137.10,
    sector: 'Consumer Discretionary',
    peers: ['3690.HK','700.HK','1810.HK'],
    segments: [
      { name: 'Commerce', value: 70 },
      { name: 'Cloud', value: 20 },
      { name: 'Logistics/Other', value: 10 }
    ],
    strengths: ['Ecosystem'], risks: ['Regulation'], news: []
  },

  '3690.HK': {
    ticker: '3690.HK',
    name: 'Meituan',
    price: 103.00,
    sector: 'Consumer Discretionary',
    peers: ['9988.HK','700.HK','1810.HK'],
    segments: [
      { name: 'Food Delivery', value: 60 },
      { name: 'Travel & In-store', value: 25 },
      { name: 'Other', value: 15 }
    ],
    strengths: ['Scale'], risks: ['Margins'], news: []
  },

  '1810.HK': {
    ticker: '1810.HK',
    name: 'Xiaomi Corp.',
    price: 54.00,
    sector: 'Technology',
    peers: ['700.HK','9988.HK','3690.HK'],
    segments: [
      { name: 'Smartphones', value: 60 },
      { name: 'IoT', value: 25 },
      { name: 'Internet Services', value: 15 }
    ],
    strengths: ['Hardware+Services'], risks: ['Margins'], news: []
  }
};

// Helpers
export function getDemoStockData(symbol) {
  return DEMO_STOCK_DATA[symbol] || null;
}
export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA);
}
export function getDemoMarketData() {
  return {
    SPY: { price: 520.1, change: 0, changePercent: +0.1 },
    QQQ: { price: 470.2, change: 0, changePercent: +0.2 },
    BTC: { price: 62000, change: 0, changePercent: -0.2 },
    GOLD: { price: 2360, change: 0, changePercent: +0.1 },
    WTI: { price: 79.8, change: 0, changePercent: -0.1 }
  };
}
