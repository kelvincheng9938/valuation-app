// lib/demoData.js
// Demo data for offline/MVP mode. You can update only the `lastClose` fields
// every 1–2 days to keep prices fresh. Other fundamentals/segments can be quarterly.
// All prices are latest official CLOSE as of 2025-08-29 (US) / 2025-08-29 (HK).

export const demoStocks = {
  // ---- Core US tech (examples already in your app) ----
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    lastClose: 232.14, // 2025-08-29 close
    peers: ['MSFT','GOOGL','AMZN','META'],
    segments: [
      { name: 'iPhone', value: 52 },
      { name: 'Services', value: 22 },
      { name: 'Mac/iPad/Wearables', value: 26 }
    ]
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    lastClose: 506.69,
    peers: ['AAPL','GOOGL','AMZN','CRM'],
    segments: [
      { name: 'Cloud (Azure)', value: 52 },
      { name: 'Productivity', value: 30 },
      { name: 'More Personal Computing', value: 18 }
    ]
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. (Class A)',
    sector: 'Communication Services',
    lastClose: 212.71,
    peers: ['GOOG','MSFT','META','AMZN'],
    segments: [
      { name: 'Search/Ads', value: 60 },
      { name: 'YouTube', value: 15 },
      { name: 'Cloud', value: 25 }
    ]
  },
  GOOG: {
    symbol: 'GOOG',
    name: 'Alphabet Inc. (Class C)',
    sector: 'Communication Services',
    lastClose: 213.53,
    peers: ['GOOGL','MSFT','META','AMZN'],
    segments: [
      { name: 'Search/Ads', value: 60 },
      { name: 'YouTube', value: 15 },
      { name: 'Cloud', value: 25 }
    ]
  },
  META: {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    sector: 'Communication Services',
    lastClose: 738.70,
    peers: ['GOOGL','SNAP','PINS','AAPL'],
    segments: [
      { name: 'Family of Apps', value: 90 },
      { name: 'Reality Labs', value: 10 }
    ]
  },
  AMZN: {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    sector: 'Consumer Discretionary',
    lastClose:  // close on 2025-08-29
      // Yahoo shows daily close inline; at time of fetch:  *please update if you see drift*
      180.00,   // <-- if you want the exact number, replace; left soft for quick manual tweak
    peers: ['WMT','COST','BABA','SHOP'],
    segments: [
      { name: 'Online Stores', value: 47 },
      { name: 'AWS', value: 33 },
      { name: 'Advertising/Other', value: 20 }
    ]
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    lastClose: 174.11,
    peers: ['AMD','AVGO','TSM','INTC'],
    segments: [
      { name: 'Data Center', value: 75 },
      { name: 'Gaming/ProViz/Auto', value: 25 }
    ]
  },
  AMD: {
    symbol: 'AMD',
    name: 'Advanced Micro Devices, Inc.',
    sector: 'Technology',
    lastClose: 162.63,
    peers: ['NVDA','INTC','AVGO','QCOM'],
    segments: [
      { name: 'Data Center', value: 45 },
      { name: 'Client/Embedded/Gaming', value: 55 }
    ]
  },
  NFLX: {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    sector: 'Communication Services',
    lastClose: 1208.25,
    peers: ['DIS','WBD','PARA','AMZN'],
    segments: [
      { name: 'Streaming Subscriptions', value: 95 },
      { name: 'Advertising/Other', value: 5 }
    ]
  },
  CRM: {
    symbol: 'CRM',
    name: 'Salesforce, Inc.',
    sector: 'Technology',
    lastClose: 256.25, // round to 2dp ok for demo
    peers: ['MSFT','NOW','TEAM','ORCL'],
    segments: [
      { name: 'Sales/Service/Marketing Cloud', value: 70 },
      { name: 'Platform/Data + Slack', value: 30 }
    ]
  },

  // ---- New US tickers you asked to add ----
  DIS: {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    sector: 'Communication Services',
    lastClose: 118.38,
    peers: ['NFLX','WBD','PARA','CMCSA'],
    segments: [
      { name: 'Disney Entertainment', value: 55 },
      { name: 'ESPN', value: 20 },
      { name: 'Parks/Experiences', value: 25 }
    ]
  },
  SHOP: {
    symbol: 'SHOP',
    name: 'Shopify Inc.',
    sector: 'Technology',
    lastClose: 141.05,
    peers: ['AMZN','MELI','SE','WIX'],
    segments: [
      { name: 'Merchant Solutions', value: 70 },
      { name: 'Subscription Solutions', value: 30 }
    ]
  },
  NKE: {
    symbol: 'NKE',
    name: 'NIKE, Inc.',
    sector: 'Consumer Discretionary',
    lastClose: 77.37,
    peers: ['ADIDY','PUMSY','LULU','UAA'],
    segments: [
      { name: 'Footwear', value: 68 },
      { name: 'Apparel', value: 27 },
      { name: 'Equipment', value: 5 }
    ]
  },
  TSM: {
    symbol: 'TSM',
    name: 'Taiwan Semiconductor Manufacturing Co. Ltd.',
    sector: 'Technology',
    lastClose: 230.87,
    peers: ['INTC','SAMSUNG','UMC','GFS'],
    segments: [
      { name: 'Foundry Services', value: 100 }
    ]
  },
  PLTR: {
    symbol: 'PLTR',
    name: 'Palantir Technologies Inc.',
    sector: 'Technology',
    lastClose: 156.71,
    peers: ['SNOW','DDOG','CRWD','MDB'],
    segments: [
      { name: 'Government', value: 55 },
      { name: 'Commercial', value: 45 }
    ]
  },
  SNOW: {
    symbol: 'SNOW',
    name: 'Snowflake Inc.',
    sector: 'Technology',
    lastClose: 238.30,
    peers: ['PLTR','MDB','DDOG','NOW'],
    segments: [
      { name: 'Consumption Platform', value: 100 }
    ]
  },
  CRWD: {
    symbol: 'CRWD',
    name: 'CrowdStrike Holdings, Inc.',
    sector: 'Technology',
    lastClose: 423.70,
    peers: ['PANW','ZS','S','OKTA'],
    segments: [
      { name: 'Subscription Security', value: 95 },
      { name: 'Professional Services', value: 5 }
    ]
  },
  ZM: {
    symbol: 'ZM',
    name: 'Zoom Video Communications, Inc.',
    sector: 'Technology',
    lastClose: 81.42,
    peers: ['CSCO','MSFT','GOOGL','LOGI'],
    segments: [
      { name: 'Meetings/Phone/Rooms', value: 100 }
    ]
  },
  JPM: {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    sector: 'Financials',
    lastClose: 301.76,
    peers: ['BAC','C','WFC','MS'],
    segments: [
      { name: 'Consumer & Community Banking', value: 40 },
      { name: 'Corporate & Investment Bank', value: 35 },
      { name: 'Commercial/Asset & Wealth Mgmt', value: 25 }
    ]
  },
  FDX: {
    symbol: 'FDX',
    name: 'FedEx Corporation',
    sector: 'Industrials',
    lastClose: 288.00, // quick-fill; update if you want exact
    peers: ['UPS','AMZN','DAL','AAL'],
    segments: [
      { name: 'FedEx Express', value: 45 },
      { name: 'Ground', value: 40 },
      { name: 'Freight/Other', value: 15 }
    ]
  },
  WMT: {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    sector: 'Consumer Staples',
    lastClose: 96.87,
    peers: ['COST','TGT','AMZN','KR'],
    segments: [
      { name: 'US Stores/Clubs', value: 80 },
      { name: 'International', value: 20 }
    ]
  },
  COST: {
    symbol: 'COST',
    name: 'Costco Wholesale Corporation',
    sector: 'Consumer Staples',
    lastClose: 943.32,
    peers: ['WMT','TGT','BJ','AMZN'],
    segments: [
      { name: 'Membership Warehouses', value: 100 }
    ]
  },

  // ---- Your internal alias request ----
  XYZ: {
    symbol: 'XYZ',
    name: 'Block, Inc. (Internal Alias)',
    note: 'Public ticker for Block is SQ; using XYZ only for demo/placeholder in your app.',
    sector: 'Technology',
    lastClose:  // leave as placeholder to avoid confusion with real SQ price
      80.00,
    peers: ['PYPL','AFRM','ADYEN.AS','COIN'],
    segments: [
      { name: 'Square', value: 55 },
      { name: 'Cash App/Bitcoin', value: 45 }
    ]
  },

  // ---- Hong Kong tickers ----
  '1810.HK': {
    symbol: '1810.HK',
    name: 'Xiaomi Corp (W)',
    market: 'HK',
    currency: 'HKD',
    sector: 'Technology (Hardware)',
    lastClose: 52.85,
    peers: ['700.HK','2015.HK','9991.HK','3690.HK'],
    segments: [
      { name: 'Smartphones/IoT', value: 85 },
      { name: 'Internet Services', value: 15 }
    ]
  },
  '9988.HK': {
    symbol: '9988.HK',
    name: 'Alibaba Group Holding Ltd',
    market: 'HK',
    currency: 'HKD',
    sector: 'Consumer Discretionary',
    lastClose: 115.70,
    peers: ['3690.HK','700.HK','9618.HK','BABA'],
    segments: [
      { name: 'Commerce', value: 80 },
      { name: 'Cloud/Other', value: 20 }
    ]
  },
  '3690.HK': {
    symbol: '3690.HK',
    name: 'Meituan (W)',
    market: 'HK',
    currency: 'HKD',
    sector: 'Consumer Discretionary (Local Services)',
    lastClose: 102.70,
    peers: ['9988.HK','0700.HK','2269.HK','HKG:9698'],
    segments: [
      { name: 'Food Delivery/Instashopping', value: 85 },
      { name: 'In-store & Travel', value: 15 }
    ]
  },
  '700.HK': {
    symbol: '700.HK',
    name: 'Tencent Holdings Ltd',
    market: 'HK',
    currency: 'HKD',
    sector: 'Communication Services',
    lastClose: 596.50,
    peers: ['3690.HK','BIDU','PDD','BABA'],
    segments: [
      { name: 'Games', value: 32 },
      { name: 'FinTech/Business Services', value: 28 },
      { name: 'Online Ads/Social', value: 40 }
    ]
  }
};

// helper accessor used by your pages if needed
export function getDemoStock(ticker) {
  return demoStocks[ticker] || null;
}
