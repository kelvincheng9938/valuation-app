// lib/demoData.js - Fixed Demo Dataset
// Fixed: 1) Peers chart data format, 2) Updated market snapshot

export const DEMO_STOCK_DATA = {
  // ======= US Mega/Tech =======
  'AAPL': {
    ticker:'AAPL', name:'Apple Inc.', sector:'Technology', marketCap:'3.6T',
    price:232.14, change:2.14, changePercent:0.95,
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services. The company is best known for its iPhone, iPad, Mac, Apple Watch, and services ecosystem including the App Store, Apple Music, and iCloud.',
    eps:{ years:['2025','2026','2027'], values:[7.25,7.90,8.55] },
    peBands:{ low:24, mid:28, high:33 },
    scores:{ value:6.2, growth:7.8, profit:9.1, momentum:7.4 },
    forwardPE: '32.0', ttmPE: '35.2',
    // Fixed peers format: [marketCap($B), forwardPE, bubbleSize, ticker]
    peers: [
      [3600, 32.0, 28, 'AAPL'],
      [3200, 28.5, 26, 'MSFT'], 
      [2200, 25.8, 24, 'GOOGL'],
      [1200, 26.5, 22, 'META']
    ],
    segments:[ 
      {name:'iPhone',value:52, itemStyle:{color:'#3b82f6'}},
      {name:'Services',value:22, itemStyle:{color:'#10b981'}},
      {name:'Mac/iPad/Wearables',value:26, itemStyle:{color:'#f59e0b'}}
    ],
    strengths:['Ecosystem lock-in with 2B+ active devices', 'Services revenue growing 12% annually', 'Strong brand loyalty and premium pricing power'], 
    risks:['iPhone sales cyclical with China market pressure', 'Services growth may decelerate', 'Antitrust pressure on App Store practices'], 
    news:[
      {headline: 'Apple Vision Pro 2 rumors suggest lighter design for late 2025', summary: 'Industry sources point to significant weight reduction and improved battery life.', source: 'AppleInsider', datetime: '2 hours ago', url: 'https://appleinsider.com'},
      {headline: 'iPhone 16 sales outpacing iPhone 15 in key Asian markets', summary: 'Strong demand for AI-powered features driving upgrade cycle acceleration.', source: 'Reuters', datetime: '5 hours ago', url: 'https://reuters.com'}
    ],
    dataQuality: { quote: 'demo', estimates: 'demo', peHistory: 'demo', peers: 'demo', segments: 'demo' }
  },

  'MSFT': {
    ticker:'MSFT', name:'Microsoft Corporation', sector:'Technology', marketCap:'3.2T',
    price:506.69, change:-3.22, changePercent:-0.63,
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company is known for Windows operating system, Office 365 productivity suite, Azure cloud platform, and AI integration across products.',
    eps:{ years:['2025','2026','2027'], values:[12.9,14.3,15.9] },
    peBands:{ low:28, mid:32, high:40 },
    scores:{ value:7.2, growth:8.8, profit:9.5, momentum:8.2 },
    forwardPE: '39.3', ttmPE: '42.1',
    // Fixed peers format for MSFT
    peers: [
      [3200, 39.3, 26, 'MSFT'],
      [3600, 32.0, 28, 'AAPL'],
      [2200, 25.8, 24, 'GOOGL'], 
      [2500, 42.8, 22, 'AMZN'],
      [290, 35.5, 18, 'CRM']
    ],
    segments:[ 
      {name:'Productivity & Business',value:43, itemStyle:{color:'#3b82f6'}},
      {name:'Intelligent Cloud',value:38, itemStyle:{color:'#10b981'}},
      {name:'More Personal Computing',value:19, itemStyle:{color:'#f59e0b'}}
    ],
    strengths:['Azure growing 29% annually with expanding AI services', 'Office 365 Commercial growing 15% with 400M+ paid seats', 'Copilot AI monetization accelerating across all product lines'], 
    risks:['High AI infrastructure capex pressuring margins', 'Intense cloud competition from AWS and Google Cloud', 'Regulatory scrutiny on dominant positions'], 
    news:[
      {headline: 'Microsoft Copilot adoption surges 85% in enterprise segment', summary: 'Q1 results show accelerating AI revenue contribution across Office 365 and Teams platforms.', source: 'Bloomberg', datetime: '1 hour ago', url: 'https://bloomberg.com'},
      {headline: 'Azure OpenAI Service sees 10x usage growth from developers', summary: 'Strong demand for GPT-4 and custom model training driving cloud revenue acceleration.', source: 'TechCrunch', datetime: '4 hours ago', url: 'https://techcrunch.com'}
    ],
    dataQuality: { quote: 'demo', estimates: 'demo', peHistory: 'demo', peers: 'demo', segments: 'demo' }
  },

  'GOOGL': {
    ticker:'GOOGL', name:'Alphabet Inc.', sector:'Communication Services', marketCap:'2.2T',
    price:212.91, change:1.87, changePercent:0.89,
    description: 'Alphabet Inc. operates as a holding company providing web-based search, advertisements, maps, software applications, mobile operating systems, consumer content, and other software services through its subsidiaries including Google.',
    eps:{ years:['2025','2026','2027'], values:[7.8,8.7,9.6] },
    peBands:{ low:22, mid:25, high:30 },
    scores:{ value:7.5, growth:7.9, profit:9.0, momentum:7.2 },
    forwardPE: '27.3', ttmPE: '29.8',
    peers: [
      [2200, 27.3, 24, 'GOOGL'],
      [3200, 39.3, 26, 'MSFT'],
      [1200, 26.5, 22, 'META'],
      [280, 38.9, 18, 'NFLX']
    ],
    segments:[ 
      {name:'Search/Ads',value:60, itemStyle:{color:'#3b82f6'}},
      {name:'YouTube',value:15, itemStyle:{color:'#10b981'}},
      {name:'Cloud & Other',value:25, itemStyle:{color:'#f59e0b'}}
    ],
    strengths:['Search dominance with 92% global market share', 'Google Cloud accelerating with 35% growth rate', 'YouTube ecosystem expansion into commerce'], 
    risks:['Regulatory antitrust pressure intensifying globally', 'AI chatbots potentially disrupting search patterns', 'Cloud competition limiting market share gains'], 
    news:[
      {headline: 'Google Cloud wins major AI contract with automotive manufacturer', summary: 'Multi-year deal worth $2.3B includes AI model training and deployment services.', source: 'TechCrunch', datetime: '3 hours ago', url: 'https://techcrunch.com'},
      {headline: 'Alphabet reports Waymo expansion to three new cities', summary: 'Autonomous vehicle service launching in Austin, Atlanta, and Miami by end of 2025.', source: 'The Verge', datetime: '7 hours ago', url: 'https://theverge.com'}
    ],
    dataQuality: { quote: 'demo', estimates: 'demo', peHistory: 'demo', peers: 'demo', segments: 'demo' }
  },

  // Add basic data for other tickers
  'NVDA': {
    ticker:'NVDA', name:'NVIDIA Corporation', sector:'Technology', marketCap:'3.0T',
    price:174.11, change:3.87, changePercent:2.27,
    description: 'NVIDIA Corporation operates as a computing company providing graphics processing units, system-on-chip units, and other hardware for gaming, professional visualization, data centers, and automotive markets.',
    eps:{ years:['2025','2026','2027'], values:[4.8,5.6,6.3] },
    peBands:{ low:35, mid:45, high:60 },
    scores:{ value:5.5, growth:9.8, profit:9.6, momentum:9.0 },
    forwardPE: '36.3', ttmPE: '39.2',
    peers: [[3000, 36.3, 28, 'NVDA'], [450, 28.4, 18, 'AMD']],
    segments:[{name:'Data Center',value:75, itemStyle:{color:'#3b82f6'}}, {name:'Gaming',value:15, itemStyle:{color:'#10b981'}}, {name:'Other',value:10, itemStyle:{color:'#f59e0b'}}],
    strengths:['AI chip leadership', 'CUDA software ecosystem', 'Data center demand growth'], 
    risks:['Customer concentration risk', 'Geopolitical tensions', 'Semiconductor cyclicality'], 
    news:[],
    dataQuality: { quote: 'demo', estimates: 'demo', peHistory: 'demo', peers: 'demo', segments: 'demo' }
  },

  'META': {
    ticker:'META', name:'Meta Platforms, Inc.', sector:'Communication Services', marketCap:'1.2T',
    price:515.25, change:12.45, changePercent:2.48,
    description: 'Meta Platforms, Inc. operates social networking platforms and develops virtual and augmented reality technologies. The company owns Facebook, Instagram, WhatsApp, and Threads.',
    eps:{ years:['2025','2026','2027'], values:[19.5,21.8,24.1] },
    peBands:{ low:20, mid:24, high:30 },
    scores:{ value:7.0, growth:8.3, profit:9.0, momentum:8.0 },
    forwardPE: '26.4', ttmPE: '28.9',
    peers: [[1200, 26.4, 22, 'META'], [2200, 27.3, 24, 'GOOGL']],
    segments:[{name:'Family of Apps',value:97, itemStyle:{color:'#3b82f6'}}, {name:'Reality Labs',value:3, itemStyle:{color:'#10b981'}}],
    strengths:['Family of Apps generating $38B quarterly revenue', 'AI-driven ad targeting improvements', 'Reality Labs advancing VR/AR technology'], 
    risks:['Metaverse investments consuming $15B+ annually', 'Regulatory scrutiny intensifying', 'TikTok competition pressuring Instagram Reels'], 
    news:[],
    dataQuality: { quote: 'demo', estimates: 'demo', peHistory: 'demo', peers: 'demo', segments: 'demo' }
  },

  'AMZN': {
    ticker:'AMZN', name:'Amazon.com, Inc.', sector:'Consumer Discretionary', marketCap:'2.5T',
    price:229.00, change:-2.14, changePercent:-0.92,
    description: 'Amazon.com, Inc. operates as a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    eps:{ years:['2025','2026','2027'], values:[4.8,6.3,7.9] },
    peBands:{ low:25, mid:30, high:38 },
    scores:{ value:6.1, growth:8.8, profit:8.2, momentum:7.9 },
    forwardPE: '47.7', ttmPE: '52.1',
    peers: [[2500, 47.7, 22, 'AMZN'], [3200, 39.3, 26, 'MSFT']],
    segments:[{name:'Online Stores',value:47, itemStyle:{color:'#3b82f6'}}, {name:'AWS',value:33, itemStyle:{color:'#10b981'}}, {name:'Ads/Other',value:20, itemStyle:{color:'#f59e0b'}}],
    strengths:['AWS maintains cloud infrastructure leadership', 'Prime membership ecosystem', 'Unparalleled logistics network'], 
    risks:['E-commerce operating margins pressured', 'AWS growth rate decelerating', 'Massive capex requirements'], 
    news:[],
    dataQuality: { quote: 'demo', estimates: 'demo', peHistory: 'demo', peers: 'demo', segments: 'demo' }
  },

  // Add minimal data for other tickers to prevent errors
  'CRM': { ticker:'CRM', name:'Salesforce, Inc.', price:256.25, eps:{years:['2025','2026','2027'], values:[9.5,11.2,12.8]}, peBands:{low:25,mid:30,high:35}, scores:{value:6.0,growth:8.2,profit:8.5,momentum:7.9}, peers:[[290, 27.0, 18, 'CRM']], segments:[], strengths:['Enterprise CRM leader'], risks:['Competition'], news:[], dataQuality:{quote:'demo'} },
  'TSLA': { ticker:'TSLA', name:'Tesla Inc.', price:248.98, eps:{years:['2025','2026','2027'], values:[4.85,6.72,8.93]}, peBands:{low:35,mid:51,high:72}, scores:{value:5.2,growth:8.9,profit:7.6,momentum:8.8}, peers:[[795, 51.3, 22, 'TSLA']], segments:[], strengths:['EV leadership'], risks:['Competition'], news:[], dataQuality:{quote:'demo'} },
  'NFLX': { ticker:'NFLX', name:'Netflix, Inc.', price:1208.25, eps:{years:['2025','2026','2027'], values:[31.0,36.0,41.0]}, peBands:{low:35,mid:45,high:55}, scores:{value:6.8,growth:7.9,profit:8.7,momentum:8.4}, peers:[[280, 38.9, 18, 'NFLX']], segments:[], strengths:['Global streaming leadership'], risks:['Competition'], news:[], dataQuality:{quote:'demo'} },
  'AMD': { ticker:'AMD', name:'Advanced Micro Devices, Inc.', price:162.63, eps:{years:['2025','2026','2027'], values:[5.2,6.1,7.5]}, peBands:{low:30,mid:35,high:40}, scores:{value:6.3,growth:8.9,profit:8.4,momentum:8.6}, peers:[[450, 31.3, 16, 'AMD']], segments:[], strengths:['EPYC gains'], risks:['Competition'], news:[], dataQuality:{quote:'demo'} },
  'UBER': { ticker:'UBER', name:'Uber Technologies, Inc.', price:93.75, eps:{years:['2025','2026','2027'], values:[1.48,2.20,2.85]}, peBands:{low:25,mid:32,high:40}, scores:{value:6.2,growth:8.5,profit:7.0,momentum:8.0}, peers:[[180, 63.3, 14, 'UBER']], segments:[], strengths:['Network effects'], risks:['Competition'], news:[], dataQuality:{quote:'demo'} },
  'COIN': { ticker:'COIN', name:'Coinbase Global, Inc.', price:304.54, eps:{years:['2025','2026','2027'], values:[8.95,12.45,16.78]}, peBands:{low:15,mid:22,high:35}, scores:{value:6.8,growth:9.2,profit:6.4,momentum:9.1}, peers:[[82, 34.0, 13, 'COIN']], segments:[], strengths:['Regulated leader'], risks:['Crypto volatility'], news:[], dataQuality:{quote:'demo'} },
  'JPM': { ticker:'JPM', name:'JPMorgan Chase & Co.', price:301.42, eps:{years:['2025','2026','2027'], values:[16.8,17.4,18.2]}, peBands:{low:9,mid:11,high:13}, scores:{value:7.6,growth:5.2,profit:8.5,momentum:6.0}, peers:[[590, 17.9, 20, 'JPM']], segments:[], strengths:['Scale & ROE'], risks:['Credit cycle'], news:[], dataQuality:{quote:'demo'} },
  'HOOD': { ticker:'HOOD', name:'Robinhood Markets, Inc.', price:104.03, eps:{years:['2025','2026','2027'], values:[1.12,1.45,1.78]}, peBands:{low:18,mid:25,high:35}, scores:{value:7.2,growth:8.4,profit:6.8,momentum:8.9}, peers:[[30, 92.9, 11, 'HOOD']], segments:[], strengths:['Mobile-first'], risks:['Regulatory'], news:[], dataQuality:{quote:'demo'} },
  'UNH': { ticker:'UNH', name:'UnitedHealth Group', price:309.87, eps:{years:['2025','2026','2027'], values:[16.0,18.0,20.0]}, peBands:{low:12,mid:14,high:16}, scores:{value:7.2,growth:4.8,profit:8.2,momentum:4.5}, peers:[[281, 19.4, 17, 'UNH']], segments:[], strengths:['Scale','Integration'], risks:['Medical cost trend'], news:[], dataQuality:{quote:'demo'} },
  'LLY': { ticker:'LLY', name:'Eli Lilly & Co.', price:732.58, eps:{years:['2025','2026','2027'], values:[13.2,16.0,18.8]}, peBands:{low:35,mid:45,high:55}, scores:{value:6.5,growth:9.2,profit:9.5,momentum:8.8}, peers:[[780, 55.5, 22, 'LLY']], segments:[], strengths:['GLP-1 leadership'], risks:['Competition'], news:[], dataQuality:{quote:'demo'} },
  'HD': { ticker:'HD', name:'The Home Depot, Inc.', price:406.77, eps:{years:['2025','2026','2027'], values:[17.1,18.5,19.9]}, peBands:{low:20,mid:24,high:29}, scores:{value:7.2,growth:6.8,profit:8.9,momentum:7.5}, peers:[[415, 23.8, 18, 'HD']], segments:[], strengths:['Scale'], risks:['Housing cycle'], news:[], dataQuality:{quote:'demo'} },
  'MCD': { ticker:'MCD', name:'McDonald\'s Corporation', price:313.54, eps:{years:['2025','2026','2027'], values:[12.2,13.1,14.0]}, peBands:{low:22,mid:26,high:30}, scores:{value:6.8,growth:6.2,profit:9.0,momentum:6.7}, peers:[[230, 25.7, 16, 'MCD']], segments:[], strengths:['Brand & scale'], risks:['Consumer demand'], news:[], dataQuality:{quote:'demo'} },
  'KO': { ticker:'KO', name:'The Coca-Cola Company', price:68.99, eps:{years:['2025','2026','2027'], values:[2.80,2.95,3.10]}, peBands:{low:20,mid:24,high:28}, scores:{value:7.0,growth:5.8,profit:8.8,momentum:6.0}, peers:[[300, 24.6, 17, 'KO']], segments:[], strengths:['Global distribution'], risks:['Sugar regulation'], news:[], dataQuality:{quote:'demo'} },
  'NKE': { ticker:'NKE', name:'NIKE, Inc.', price:77.37, eps:{years:['2025','2026','2027'], values:[3.1,3.5,3.9]}, peBands:{low:20,mid:24,high:28}, scores:{value:6.5,growth:6.8,profit:8.0,momentum:6.2}, peers:[[150, 24.9, 15, 'NKE']], segments:[], strengths:['Brand power'], risks:['Consumer cycles'], news:[], dataQuality:{quote:'demo'} },
  'DIS': { ticker:'DIS', name:'The Walt Disney Company', price:118.38, eps:{years:['2025','2026','2027'], values:[5.1,6.0,6.8]}, peBands:{low:18,mid:22,high:26}, scores:{value:6.1,growth:6.8,profit:7.2,momentum:6.5}, peers:[[170, 23.2, 15, 'DIS']], segments:[], strengths:['Brands/IP'], risks:['Linear TV declines'], news:[], dataQuality:{quote:'demo'} },
  'FDX': { ticker:'FDX', name:'FedEx Corporation', price:231.07, eps:{years:['2025','2026','2027'], values:[17.2,18.5,20.1]}, peBands:{low:12,mid:14,high:17}, scores:{value:7.2,growth:5.9,profit:7.0,momentum:6.1}, peers:[[70, 13.4, 13, 'FDX']], segments:[], strengths:['Network scale'], risks:['Macro/fuel/labor'], news:[], dataQuality:{quote:'demo'} },
  'QCOM': { ticker:'QCOM', name:'Qualcomm Inc.', price:160.73, eps:{years:['2025','2026','2027'], values:[10.1,11.2,12.3]}, peBands:{low:16,mid:20,high:25}, scores:{value:7.0,growth:6.5,profit:8.6,momentum:6.8}, peers:[[180, 15.9, 15, 'QCOM']], segments:[], strengths:['5G leadership'], risks:['Apple insourcing'], news:[], dataQuality:{quote:'demo'} },
  'COST': { ticker:'COST', name:'Costco Wholesale Corporation', price:943.32, eps:{years:['2025','2026','2027'], values:[16.8,18.9,21.0]}, peBands:{low:30,mid:38,high:48}, scores:{value:6.0,growth:7.2,profit:9.0,momentum:8.0}, peers:[[350, 56.1, 18, 'COST']], segments:[], strengths:['Membership flywheel'], risks:['Valuation'], news:[], dataQuality:{quote:'demo'} },
  'TSM': { ticker:'TSM', name:'Taiwan Semiconductor Mfg. Co. Ltd.', price:230.87, eps:{years:['2025','2026','2027'], values:[6.2,6.9,7.6]}, peBands:{low:22,mid:26,high:32}, scores:{value:7.1,growth:7.8,profit:9.2,momentum:7.7}, peers:[[1000, 37.2, 24, 'TSM']], segments:[], strengths:['Node leadership'], risks:['Geopolitics'], news:[], dataQuality:{quote:'demo'} },
  'INTC': { ticker:'INTC', name:'Intel Corporation', price:24.35, eps:{years:['2025','2026','2027'], values:[1.10,1.60,2.00]}, peBands:{low:12,mid:15,high:20}, scores:{value:6.0,growth:5.8,profit:6.2,momentum:5.0}, peers:[[110, 22.1, 12, 'INTC']], segments:[], strengths:['Scale'], risks:['Competition'], news:[], dataQuality:{quote:'demo'} }
};

export function getDemoStockData(symbol) {
  if (!symbol) return null;
  const key = String(symbol).toUpperCase();
  const data = DEMO_STOCK_DATA[key];
  if (!data) return null;
  
  // Add required fields if missing
  return {
    ...data,
    description: data.description || `${data.name} is a company operating in the ${data.sector || 'business'} sector.`,
    change: data.change || 0,
    changePercent: data.changePercent || 0,
    marketCap: data.marketCap || 'N/A',
    lastUpdated: new Date().toISOString(),
    dataQuality: data.dataQuality || { quote: 'demo', estimates: 'demo', peHistory: 'demo', peers: 'demo', segments: 'demo' }
  };
}

export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA);
}

export function getDemoMarketData() {
  // Updated market data to current levels (January 2025)
  return {
    spy: { price: 6460.12, change: 0.24, changePercent: 0.24 },
    nasdaq: { price: 21750.89, change: 0.45, changePercent: 0.45 },
    btc: { price: 96234, change: 1.28, changePercent: 1.28 },
    gold: { price: 2641.50, change: 0.18, changePercent: 0.18 },
    oil: { price: 69.85, change: -0.87, changePercent: -0.87 }
  };
}
