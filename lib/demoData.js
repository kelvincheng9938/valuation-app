// lib/demoData.js
// Demo dataset with daily CLOSE prices (from your GoogleFinance sheet).
// Valuation model requires: `eps` (analyst estimates) + `peBands` (company-specific fwd P/E bands).
// Sources snapshot (2025-08-29 JST):
// - EPS consensus: Yahoo Finance "Analysis" pages (per ticker)
// - Forward P/E context: Yahoo/GuruFocus/YCharts snapshots
// NOTE: Update `price` every 1–2 days; review EPS/P/E bands quarterly.

export const DEMO_STOCK_DATA = {
  // ======= US Mega/Tech =======
  'AAPL': {
    ticker:'AAPL', name:'Apple Inc.', sector:'Technology', marketCap:'3.6T',
    price:232.14,
    eps:{ years:['2025','2026','2027'], values:[7.25,7.90,8.55] },
    peBands:{ low:24, mid:28, high:33 },
    scores:{ value:6.2, growth:7.8, profit:9.1, momentum:7.4 },
    peers:['MSFT','GOOGL','AMZN','META'],
    segments:[ {name:'iPhone',value:52},{name:'Services',value:22},{name:'Mac/iPad/Wearables',value:26} ],
    strengths:['Ecosystem','Cash flow'], risks:['Regulation','Hardware cycles'], news:[]
  },

  'MSFT': {
    ticker:'MSFT', name:'Microsoft Corporation', sector:'Technology', marketCap:'3.5T',
    price:506.69,
    eps:{ years:['2025','2026','2027'], values:[12.9,14.3,15.9] },
    peBands:{ low:28, mid:32, high:40 }, // historical fwd PE distribution for MSFT
    scores:{ value:7.2, growth:8.8, profit:9.5, momentum:8.2 },
    peers:['AAPL','GOOGL','AMZN','CRM'],
    segments:[ {name:'Productivity & Business',value:43},{name:'Intelligent Cloud',value:38},{name:'More Personal Computing',value:19} ],
    strengths:['Cloud leadership','AI'], risks:['Competition','Regulation'], news:[]
  },

  'GOOGL': {
    ticker:'GOOGL', name:'Alphabet Inc.', sector:'Communication Services', marketCap:'2.2T',
    price:212.91,
    eps:{ years:['2025','2026','2027'], values:[7.8,8.7,9.6] }, // Yahoo Finance consensus snapshot
    peBands:{ low:22, mid:25, high:30 },
    scores:{ value:7.5, growth:7.9, profit:9.0, momentum:7.2 },
    peers:['META','NFLX','DIS'],
    segments:[ {name:'Search/Ads',value:60},{name:'YouTube',value:15},{name:'Cloud & Other',value:25} ],
    strengths:['Ads scale','Cloud growth'], risks:['Ad cyclicality','Regulation'], news:[]
  },

  'AMZN': {
    ticker:'AMZN', name:'Amazon.com, Inc.', sector:'Consumer Discretionary', marketCap:'2.6T',
    price:229.00,
    eps:{ years:['2025','2026','2027'], values:[4.8,6.3,7.9] },
    peBands:{ low:25, mid:30, high:38 },
    scores:{ value:6.1, growth:8.8, profit:8.2, momentum:7.9 },
    peers:['WMT','COST','SHOP'],
    segments:[ {name:'Online Stores',value:47},{name:'AWS',value:33},{name:'Ads/Other',value:20} ],
    strengths:['Scale','AWS','Ads'], risks:['Margins','Regulation'], news:[]
  },

  'NVDA': {
    ticker:'NVDA', name:'NVIDIA Corporation', sector:'Technology', marketCap:'3.0T',
    price:174.11,
    eps:{ years:['2025','2026','2027'], values:[4.8,5.6,6.3] },
    peBands:{ low:35, mid:45, high:60 },
    scores:{ value:5.5, growth:9.8, profit:9.6, momentum:9.0 },
    peers:['AMD','INTC','QCOM','TSM'],
    segments:[ {name:'Data Center',value:75},{name:'Gaming',value:15},{name:'Other',value:10} ],
    strengths:['AI leadership','CUDA'], risks:['Cyclicality','Supply'], news:[]
  },

  'AMD': {
    ticker:'AMD', name:'Advanced Micro Devices, Inc.', sector:'Technology', marketCap:'450B',
    price:162.63,
    eps:{ years:['2025','2026','2027'], values:[5.2,6.1,7.5] },
    peBands:{ low:30, mid:35, high:40 },
    scores:{ value:6.3, growth:8.9, profit:8.4, momentum:8.6 },
    peers:['NVDA','INTC','QCOM'],
    segments:[ {name:'Data Center',value:55},{name:'Client',value:25},{name:'Gaming',value:15},{name:'Embedded',value:5} ],
    strengths:['EPYC gains','AI accelerator ramp'], risks:['Competition','PC cycle'], news:[]
  },

  // ======= Platforms / Media =======
  'NFLX': {
    ticker:'NFLX', name:'Netflix, Inc.', sector:'Communication Services', marketCap:'280B',
    price:1208.25,
    // EPS upgraded to reflect current consensus trajectory (Yahoo Finance Analysis snapshot)
    eps:{ years:['2025','2026','2027'], values:[31.0,36.0,41.0] },
    // Forward P/E bands aligned with current ~46x fwd PE and historical range
    // Sources: Yahoo Finance key statistics (Forward P/E ~47x), GuruFocus fwd PE (~46x) and long-run P/E context
    peBands:{ low:35, mid:45, high:55 },
    scores:{ value:6.8, growth:7.9, profit:8.7, momentum:8.4 },
    peers:['DIS','WBD','PARA'],
    segments:[ {name:'Streaming',value:95},{name:'Ads/Other',value:5} ],
    strengths:['Global reach','Content engine'], risks:['Competition','Content cost'], news:[]
  },

  'DIS': {
    ticker:'DIS', name:'The Walt Disney Company', sector:'Communication Services', marketCap:'170B',
    price:118.38,
    eps:{ years:['2025','2026','2027'], values:[5.1,6.0,6.8] }, // Yahoo snapshot
    peBands:{ low:18, mid:22, high:26 },
    scores:{ value:6.1, growth:6.8, profit:7.2, momentum:6.5 },
    peers:['NFLX','WBD','PARA'],
    segments:[ {name:'Entertainment',value:55},{name:'Parks & Experiences',value:30},{name:'Sports (ESPN)',value:15} ],
    strengths:['Brands/IP','Parks cash flow'], risks:['Linear TV declines','Streaming costs'], news:[]
  },

  'META': {
    ticker:'META', name:'Meta Platforms, Inc.', sector:'Communication Services', marketCap:'1.2T',
    price:515.25,
    eps:{ years:['2025','2026','2027'], values:[19.5,21.8,24.1] },
    peBands:{ low:20, mid:24, high:30 },
    scores:{ value:7.0, growth:8.3, profit:9.0, momentum:8.0 },
    peers:['GOOGL','NFLX','DIS'],
    segments:[ {name:'Family of Apps',value:97},{name:'Reality Labs',value:3} ],
    strengths:['Ads reach','Engagement'], risks:['Regulation','Competition'], news:[]
  },

  // ======= Software / Cloud =======
  'CRM': {
    ticker:'CRM', name:'Salesforce, Inc.', sector:'Technology', marketCap:'300B',
    price:256.25,
    eps:{ years:['2025','2026','2027'], values:[9.5,11.2,12.8] },
    peBands:{ low:25, mid:30, high:35 },
    scores:{ value:6.0, growth:8.2, profit:8.5, momentum:7.9 },
    peers:['MSFT','NOW','ADBE'],
    segments:[ {name:'Subscription & Support',value:94},{name:'Professional Services',value:6} ],
    strengths:['Enterprise CRM leader'], risks:['Macro IT spend','Competition'], news:[]
  },

  'NOW': {
    ticker:'NOW', name:'ServiceNow, Inc.', sector:'Technology', marketCap:'180B',
    price:917.46,
    eps:{ years:['2025','2026','2027'], values:[14.8,17.2,19.7] },
    peBands:{ low:30, mid:38, high:48 },
    scores:{ value:6.2, growth:8.5, profit:8.8, momentum:8.1 },
    peers:['CRM','ADBE','ORCL'],
    segments:[ {name:'Subscription',value:95},{name:'Services',value:5} ],
    strengths:['Workflow platform'], risks:['Competition'], news:[]
  },

  'SNOW': {
    ticker:'SNOW', name:'Snowflake Inc.', sector:'Information Technology', marketCap:'60B',
    price:238.30,
    eps:{ years:['2025','2026','2027'], values:[1.20,1.60,2.10] }, // Yahoo snapshot
    peBands:{ low:40, mid:55, high:70 },
    scores:{ value:4.8, growth:8.6, profit:5.8, momentum:7.0 },
    peers:['CRM','ADBE','MDB'],
    segments:[ {name:'Data Cloud',value:100} ],
    strengths:['Consumption model'], risks:['Optimization headwinds','Competition'], news:[]
  },

  'PLTR': {
    ticker:'PLTR', name:'Palantir Technologies Inc.', sector:'Information Technology', marketCap:'70B',
    price:156.71,
    eps:{ years:['2025','2026','2027'], values:[0.42,0.56,0.72] }, // Yahoo snapshot
    peBands:{ low:35, mid:45, high:60 },
    scores:{ value:5.0, growth:8.2, profit:6.0, momentum:7.5 },
    peers:['CRM','SNOW','DDOG'],
    segments:[ {name:'Government',value:55},{name:'Commercial',value:45} ],
    strengths:['Sticky gov contracts','AI platforms'], risks:['Valuation','Contract timing'], news:[]
  },

  // ======= Cybersecurity =======
  'CRWD': {
    ticker:'CRWD', name:'CrowdStrike Holdings, Inc.', sector:'Information Technology', marketCap:'90B',
    price:423.70,
    eps:{ years:['2025','2026','2027'], values:[3.9,5.1,6.4] },
    peBands:{ low:40, mid:55, high:70 },
    scores:{ value:5.2, growth:9.0, profit:6.6, momentum:8.5 },
    peers:['PANW','ZS','S'],
    segments:[ {name:'Security Subscriptions',value:95},{name:'Professional Services',value:5} ],
    strengths:['Falcon platform','Net retention'], risks:['Competition','Valuation'], news:[]
  },

  // ======= Collaboration / Comms =======
  'ZM': {
    ticker:'ZM', name:'Zoom Video Communications, Inc.', sector:'Information Technology', marketCap:'18B',
    price:81.42,
    eps:{ years:['2025','2026','2027'], values:[4.45,4.70,5.00] },
    peBands:{ low:16, mid:20, high:26 },
    scores:{ value:7.0, growth:5.8, profit:7.2, momentum:5.9 },
    peers:['MSFT','GOOGL'],
    segments:[ {name:'Meetings',value:70},{name:'Phone/Contact Center',value:30} ],
    strengths:['Profit discipline','Enterprise upsell'], risks:['Competition','Growth decel'], news:[]
  },

  // ======= Financials / Banks =======
  'JPM': {
    ticker:'JPM', name:'JPMorgan Chase & Co.', sector:'Financials', marketCap:'590B',
    price:301.42,
    eps:{ years:['2025','2026','2027'], values:[16.8,17.4,18.2] },
    peBands:{ low:9, mid:11, high:13 },
    scores:{ value:7.6, growth:5.2, profit:8.5, momentum:6.0 },
    peers:['BAC','C','WFC'],
    segments:[ {name:'Consumer & Community Banking',value:40},{name:'CIB',value:35},{name:'AWM/Commercial',value:25} ],
    strengths:['Scale & ROE','Risk mgmt'], risks:['Credit cycle','Regulation'], news:[]
  },

  // ======= Industrials / Logistics =======
  'FDX': {
    ticker:'FDX', name:'FedEx Corporation', sector:'Industrials', marketCap:'70B',
    price:231.07,
    eps:{ years:['2025','2026','2027'], values:[17.2,18.5,20.1] },
    peBands:{ low:12, mid:14, high:17 },
    scores:{ value:7.2, growth:5.9, profit:7.0, momentum:6.1 },
    peers:['UPS'],
    segments:[ {name:'Express',value:45},{name:'Ground',value:40},{name:'Freight/Other',value:15} ],
    strengths:['Network scale'], risks:['Macro/fuel/labor'], news:[]
  },

  // ======= Staples / Retail =======
  'WMT': {
    ticker:'WMT', name:'Walmart Inc.', sector:'Consumer Staples', marketCap:'570B',
    price:96.98,
    eps:{ years:['2025','2026','2027'], values:[2.62,2.85,3.10] },
    peBands:{ low:20, mid:24, high:28 },
    scores:{ value:6.9, growth:6.1, profit:7.6, momentum:6.8 },
    peers:['COST','TGT','AMZN'],
    segments:[ {name:'US',value:70},{name:'International',value:20},{name:'Sam’s Club',value:10} ],
    strengths:['Scale & EDLP','Omni-channel'], risks:['Margins','Competition'], news:[]
  },

  'COST': {
    ticker:'COST', name:'Costco Wholesale Corporation', sector:'Consumer Staples', marketCap:'350B',
    price:943.32,
    eps:{ years:['2025','2026','2027'], values:[16.8,18.9,21.0] },
    peBands:{ low:30, mid:38, high:48 },
    scores:{ value:6.0, growth:7.2, profit:9.0, momentum:8.0 },
    peers:['WMT','TGT'],
    segments:[ {name:'Membership & Retail',value:100} ],
    strengths:['Membership flywheel'], risks:['Valuation'], news:[]
  },

  // ======= Consumer Brands =======
  'NKE': {
    ticker:'NKE', name:'NIKE, Inc.', sector:'Consumer Discretionary', marketCap:'150B',
    price:77.37,
    eps:{ years:['2025','2026','2027'], values:[3.1,3.5,3.9] },
    peBands:{ low:20, mid:24, high:28 },
    scores:{ value:6.5, growth:6.8, profit:8.0, momentum:6.2 },
    peers:['LULU','UAA'],
    segments:[ {name:'Footwear',value:68},{name:'Apparel',value:27},{name:'Equipment',value:5} ],
    strengths:['Brand power','Global distribution'], risks:['Consumer cycles','Inventory'], news:[]
  },

  'SHOP': {
    ticker:'SHOP', name:'Shopify Inc.', sector:'Information Technology', marketCap:'85B',
    price:141.05,
    eps:{ years:['2025','2026','2027'], values:[1.25,1.60,2.10] }, // Yahoo snapshot
    peBands:{ low:40, mid:55, high:70 },
    scores:{ value:5.6, growth:8.6, profit:6.8, momentum:7.2 },
    peers:['AMZN','MELI','ETSY'],
    segments:[ {name:'Merchant Solutions',value:60},{name:'Subscription Solutions',value:35},{name:'Other',value:5} ],
    strengths:['SMB enablement','Ecosystem'], risks:['Take-rate','Competition'], news:[]
  },

  // ======= Healthcare =======
  'UNH': {
    ticker:'UNH', name:'UnitedHealth Group', sector:'Healthcare', marketCap:'281B',
    price:309.87,
    // EPS cut in 2025; rebuild gradually — align demo with current street reset
    eps:{ years:['2025','2026','2027'], values:[16.0,18.0,20.0] }, // based on recent guidance reset & coverage notes
    peBands:{ low:12, mid:14, high:16 }, // Managed care typical range given uncertainty
    scores:{ value:7.2, growth:4.8, profit:8.2, momentum:4.5 },
    peers:['HUM','CI','ANTM'],
    segments:[ {name:'UnitedHealthcare',value:75},{name:'Optum',value:25} ],
    strengths:['Scale','Integration'], risks:['Medical cost trend','Regulation'], news:[]
  },

  // ======= Semis / Foundry =======
  'TSM': {
    ticker:'TSM', name:'Taiwan Semiconductor Mfg. Co. Ltd.', sector:'Technology', marketCap:'1.0T',
    price:230.87,
    eps:{ years:['2025','2026','2027'], values:[6.2,6.9,7.6] },
    peBands:{ low:22, mid:26, high:32 },
    scores:{ value:7.1, growth:7.8, profit:9.2, momentum:7.7 },
    peers:['AMD','INTC'],
    segments:[ {name:'Foundry Services',value:100} ],
    strengths:['Node leadership','Scale'], risks:['Geopolitics','Cycle'], news:[]
  },

  'QCOM': {
    ticker:'QCOM', name:'Qualcomm Inc.', sector:'Technology', marketCap:'180B',
    price:160.73,
    eps:{ years:['2025','2026','2027'], values:[10.1,11.2,12.3] },
    peBands:{ low:16, mid:20, high:25 },
    scores:{ value:7.0, growth:6.5, profit:8.6, momentum:6.8 },
    peers:['AAPL','AVGO','NVDA'],
    segments:[ {name:'Handset',value:60},{name:'RF/IoT/Auto',value:40} ],
    strengths:['5G leadership'], risks:['Apple insourcing'], news:[]
  },

  'INTC': {
    ticker:'INTC', name:'Intel Corporation', sector:'Technology', marketCap:'110B',
    price:24.35,
    eps:{ years:['2025','2026','2027'], values:[1.10,1.60,2.00] },
    peBands:{ low:12, mid:15, high:20 },
    scores:{ value:6.0, growth:5.8, profit:6.2, momentum:5.0 },
    peers:['AMD','NVDA','QCOM'],
    segments:[ {name:'Client',value:45},{name:'Data Center',value:30},{name:'Foundry/Other',value:25} ],
    strengths:['Scale'], risks:['Competition'], news:[]
  },

  // ======= Pharma =======
  'LLY': {
    ticker:'LLY', name:'Eli Lilly & Co.', sector:'Healthcare', marketCap:'780B',
    price:732.58,
    eps:{ years:['2025','2026','2027'], values:[13.2,16.0,18.8] },
    peBands:{ low:35, mid:45, high:55 },
    scores:{ value:6.5, growth:9.2, profit:9.5, momentum:8.8 },
    peers:['NVO','PFE','MRK'],
    segments:[ {name:'Diabetes/Obesity',value:55},{name:'Oncology',value:25},{name:'Other',value:20} ],
    strengths:['GLP-1 leadership'], risks:['Competition','Manufacturing'], news:[]
  },

  // ======= Payments / Fintech =======
  'XYZ': {
    ticker:'XYZ', name:'Block, Inc. (demo alias of SQ)', sector:'Information Technology', marketCap:'70B',
    price:79.64,
    eps:{ years:['2025','2026','2027'], values:[2.6,3.2,4.0] },
    peBands:{ low:20, mid:25, high:30 },
    scores:{ value:6.0, growth:8.4, profit:7.1, momentum:7.8 },
    peers:['PYPL','COIN','V'],
    segments:[ {name:'Square',value:55},{name:'Cash App',value:35},{name:'Bitcoin/Other',value:10} ],
    strengths:['Two-sided ecosystem'], risks:['Fintech competition','Margins'], news:[]
  },

  'COIN': {
    ticker:'COIN', name:'Coinbase Global, Inc.', sector:'Financial Services', marketCap:'82B',
    price:304.54,
    eps:{ years:['2025','2026','2027'], values:[8.95,12.45,16.78] },
    peBands:{ low:15, mid:22, high:35 },
    scores:{ value:6.8, growth:9.2, profit:6.4, momentum:9.1 },
    peers:['PYPL','HOOD','XYZ'],
    segments:[ {name:'Transactions',value:78},{name:'Subscriptions',value:15},{name:'Other',value:7} ],
    strengths:['Regulated leader'], risks:['Crypto volatility'], news:[]
  },

  'HOOD': {
    ticker:'HOOD', name:'Robinhood Markets, Inc.', sector:'Financial Services', marketCap:'30B',
    price:104.03,
    eps:{ years:['2025','2026','2027'], values:[1.12,1.45,1.78] },
    peBands:{ low:18, mid:25, high:35 },
    scores:{ value:7.2, growth:8.4, profit:6.8, momentum:8.9 },
    peers:['COIN','PYPL','XYZ'],
    segments:[ {name:'Transaction',value:45},{name:'Net Interest',value:35},{name:'Gold/Other',value:20} ],
    strengths:['Mobile-first'], risks:['Regulatory'], news:[]
  },

  // ======= Beverages / QSR =======
  'KO': {
    ticker:'KO', name:'Coca-Cola Co.', sector:'Consumer Staples', marketCap:'300B',
    price:68.99,
    eps:{ years:['2025','2026','2027'], values:[2.80,2.95,3.10] },
    peBands:{ low:20, mid:24, high:28 },
    scores:{ value:7.0, growth:5.8, profit:8.8, momentum:6.0 },
    peers:['PEP','KDP'],
    segments:[ {name:'Sparkling',value:65},{name:'Still',value:25},{name:'Other',value:10} ],
    strengths:['Global distribution'], risks:['Sugar regulation'], news:[]
  },

  'MCD': {
    ticker:'MCD', name:'McDonald’s Corporation', sector:'Consumer Discretionary', marketCap:'230B',
    price:313.54,
    eps:{ years:['2025','2026','2027'], values:[12.2,13.1,14.0] },
    peBands:{ low:22, mid:26, high:30 },
    scores:{ value:6.8, growth:6.2, profit:9.0, momentum:6.7 },
    peers:['YUM','QSR'],
    segments:[ {name:'Franchised',value:85},{name:'Company Stores',value:15} ],
    strengths:['Brand & scale'], risks:['Consumer demand'], news:[]
  },

  'HD': {
    ticker:'HD', name:'The Home Depot, Inc.', sector:'Consumer Discretionary', marketCap:'415B',
    price:406.77,
    eps:{ years:['2025','2026','2027'], values:[17.1,18.5,19.9] },
    peBands:{ low:20, mid:24, high:29 },
    scores:{ value:7.2, growth:6.8, profit:8.9, momentum:7.5 },
    peers:['LOW','COST'],
    segments:[ {name:'Home Improvement Retail',value:100} ],
    strengths:['Scale'], risks:['Housing cycle'], news:[]
  },

  'ABNB': {
    ticker:'ABNB', name:'Airbnb, Inc.', sector:'Consumer Discretionary', marketCap:'85B',
    price:130.53,
    eps:{ years:['2025','2026','2027'], values:[5.3,5.9,6.6] },
    peBands:{ low:22, mid:27, high:33 },
    scores:{ value:6.8, growth:7.6, profit:8.0, momentum:7.1 },
    peers:['UBER','BKNG'],
    segments:[ {name:'Nights & Experiences',value:92},{name:'Other',value:8} ],
    strengths:['Asset-light'], risks:['Regulation','Travel cycles'], news:[]
  },

  'UBER': {
    ticker:'UBER', name:'Uber Technologies, Inc.', sector:'Industrials', marketCap:'180B',
    price:93.75,
    eps:{ years:['2025','2026','2027'], values:[1.48,2.20,2.85] },
    peBands:{ low:25, mid:32, high:40 },
    scores:{ value:6.2, growth:8.5, profit:7.0, momentum:8.0 },
    peers:['LYFT','DASH','ABNB'],
    segments:[ {name:'Mobility',value:55},{name:'Delivery',value:40},{name:'Freight/Other',value:5} ],
    strengths:['Network effects'], risks:['Competition'], news:[]
  },

  // ======= HK (prices in HKD for demo) =======
  '700.HK': {
    ticker:'700.HK', name:'Tencent Holdings Ltd.', sector:'Communication Services', marketCap:'420B',
    price:605.00,
    eps:{ years:['2025','2026','2027'], values:[14.5,16.0,17.5] },
    peBands:{ low:16, mid:20, high:26 },
    scores:{ value:7.0, growth:7.5, profit:8.6, momentum:6.8 },
    peers:['3690.HK','9988.HK','1810.HK'],
    segments:[ {name:'Games',value:32},{name:'Ads/Social',value:40},{name:'FinTech/Cloud',value:28} ],
    strengths:['Ecosystem'], risks:['Regulation'], news:[]
  },

  '9988.HK': {
    ticker:'9988.HK', name:'Alibaba Group Holding Ltd.', sector:'Consumer/Tech', marketCap:'190B',
    price:137.10,
    eps:{ years:['2025','2026','2027'], values:[7.1,7.9,8.6] },
    peBands:{ low:12, mid:15, high:20 },
    scores:{ value:7.2, growth:7.0, profit:7.8, momentum:6.4 },
    peers:['3690.HK','700.HK','1810.HK'],
    segments:[ {name:'Commerce',value:70},{name:'Cloud',value:20},{name:'Logistics/Other',value:10} ],
    strengths:['Platform scale'], risks:['Regulation'], news:[]
  },

  '3690.HK': {
    ticker:'3690.HK', name:'Meituan (W)', sector:'Consumer/Local Services', marketCap:'100B',
    price:103.00,
    eps:{ years:['2025','2026','2027'], values:[3.2,4.1,5.0] },
    peBands:{ low:20, mid:25, high:32 },
    scores:{ value:5.9, growth:8.2, profit:6.8, momentum:6.6 },
    peers:['9988.HK','700.HK','1810.HK'],
    segments:[ {name:'Food Delivery',value:60},{name:'In-Store & Hotel',value:30},{name:'Other',value:10} ],
    strengths:['Local services network'], risks:['Competition','Margins'], news:[]
  },

  '1810.HK': {
    ticker:'1810.HK', name:'Xiaomi Corporation (W)', sector:'Consumer Electronics', marketCap:'50B',
    price:54.00,
    eps:{ years:['2025','2026','2027'], values:[1.10,1.25,1.40] },
    peBands:{ low:16, mid:20, high:26 },
    scores:{ value:6.2, growth:7.1, profit:6.5, momentum:6.0 },
    peers:['700.HK','9988.HK','3690.HK'],
    segments:[ {name:'Smartphones',value:60},{name:'IoT & Lifestyle',value:25},{name:'Internet Services',value:15} ],
    strengths:['Ecosystem'], risks:['Competition','Margins'], news:[]
  }
};

// ---- Helpers (unchanged) ----
export function getDemoStockData(symbol) {
  if (!symbol) return null;
  const key = String(symbol).toUpperCase();
  return DEMO_STOCK_DATA[key] || null;
}
export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA);
}
export function getDemoMarketData() {
  return {
    SPY:  { price: 520.10, change: 0, changePercent: +0.12 },
    QQQ:  { price: 470.20, change: 0, changePercent: +0.18 },
    BTC:  { price: 62000,  change: 0, changePercent: -0.25 },
    GOLD: { price: 2360,   change: 0, changePercent: +0.10 },
    WTI:  { price: 79.8,   change: 0, changePercent: -0.15 }
  };
}
