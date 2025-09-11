// lib/demoData.js - Updated with expanded categories for 115+ stocks
// This file now includes dynamic category generation and modern categorization

import { getAllStockData } from './api'

// Enhanced stock categorization for 115+ stocks
export const STOCK_CATEGORIES = {
  'US_MEGA_TECH': {
    label: '🚀 US Mega Tech',
    color: '#3b82f6',
    tickers: ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA', 'TSLA']
  },
  'US_TECH_GROWTH': {
    label: '⚡ Tech Growth',
    color: '#8b5cf6', 
    tickers: ['CRM', 'NOW', 'ADBE', 'INTC', 'AMD', 'QCOM', 'AMAT', 'NFLX']
  },
  'US_HEALTHCARE': {
    label: '🏥 Healthcare',
    color: '#10b981',
    tickers: ['LLY', 'UNH', 'JNJ', 'PFE', 'ABBV', 'TMO', 'DHR', 'ISRG']
  },
  'US_FINANCE': {
    label: '🏦 Financial',
    color: '#f59e0b',
    tickers: ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'AXP', 'BRK.B']
  },
  'US_CONSUMER': {
    label: '🛍️ Consumer',
    color: '#ef4444',
    tickers: ['WMT', 'HD', 'MCD', 'NKE', 'SBUX', 'TGT', 'COST', 'LOW']
  },
  'HK_GIANTS': {
    label: '🇭🇰 HK Giants',
    color: '#f97316',
    tickers: ['700', '9988', '1810', '3690', '2318', '1398', '939', '1299']
  },
  'POPULAR': {
    label: '🔥 Most Analyzed',
    color: '#ec4899',
    tickers: ['AAPL', 'TSLA', 'NVDA', 'META', '700', 'MSFT', 'GOOGL', 'AMZN']
  }
};

// Your existing demo stock data (keep all of this)
export const DEMO_STOCK_DATA = {
  'AAPL': {
    ticker: 'AAPL', name: 'Apple Inc.', price: 260.45, change: 2.87, changePercent: 1.11,
    marketCap: '3.9T', sector: 'Technology',
    description: 'Apple designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
    eps: { years: ['2025', '2026', '2027'], values: [7.40, 8.35, 9.12] },
    peBands: { low: 28.8, mid: 31.2, high: 35.1 },
    scores: { value: 6.8, growth: 8.3, profit: 9.1, momentum: 7.9 },
    forwardPE: '35.2', ttmPE: '33.8',
    peers: [[3900, 35.2, 33, 'AAPL'], [3800, 32.5, 26, 'MSFT'], [2300, 24.3, 24, 'GOOGL']],
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 7, itemStyle: { color: '#8b5cf6' } },
      { name: 'Wearables', value: 6, itemStyle: { color: '#ef4444' } }
    ],
    strengths: ['iPhone 15 cycle driving 12% revenue growth', 'Services margin expansion to 71% (highest ever)', 'China recovery accelerating (+13% local sales)'],
    risks: ['EU regulation pressure on App Store fees', 'iPhone unit sales declining in mature markets', 'Supply chain concentrated in China (geopolitical risk)'],
    news: [
      { headline: 'Apple Vision Pro manufacturing ramp exceeds expectations', summary: 'Supply chain sources report 40% increase in component orders', source: 'Reuters', datetime: '2 hours ago', url: '#' },
      { headline: 'iPhone 15 Pro Max demand strongest in 3 years', summary: 'Lead times extend to 4-6 weeks across all markets', source: 'Bloomberg', datetime: '5 hours ago', url: '#' }
    ]
  },

  'MSFT': {
    ticker: 'MSFT', name: 'Microsoft Corporation', price: 502.87, change: 8.23, changePercent: 1.66,
    marketCap: '3.8T', sector: 'Technology',
    description: 'Microsoft develops, licenses, and supports software, services, devices, and solutions worldwide.',
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
    eps: { years: ['2025', '2026', '2027'], values: [8.92, 10.43, 12.18] },
    peBands: { low: 22.1, mid: 25.0, high: 29.8 },
    scores: { value: 8.1, growth: 7.6, profit: 8.8, momentum: 7.4 },
    forwardPE: '25.9', ttmPE: '27.2',
    peers: [[2800, 25.9, 22, 'GOOGL'], [3800, 32.5, 26, 'MSFT'], [1200, 28.1, 19, 'META']],
    segments: [
      { name: 'Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } },
      { name: 'Network', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets', value: 7, itemStyle: { color: '#ef4444' } }
    ],
    strengths: ['Search dominance with 92% global market share', 'Cloud growth acceleration (35% YoY) gaining share', 'YouTube advertising recovery (+12% growth return)'],
    risks: ['Regulatory pressure intensifying globally', 'AI search competition from Microsoft/OpenAI', 'Traffic acquisition costs rising (+15% YoY)'],
    news: [
      { headline: 'Google Cloud wins $2.3B Department of Defense contract', summary: 'Multi-year deal strengthens competitive position against AWS and Azure', source: 'WSJ', datetime: '3 hours ago', url: '#' },
      { headline: 'Bard integration drives 23% increase in Search engagement', summary: 'AI-powered answers keeping users on platform longer', source: 'TechCrunch', datetime: '6 hours ago', url: '#' }
    ]
  },

  'META': {
    ticker: 'META', name: 'Meta Platforms Inc.', price: 682.47, change: 12.34, changePercent: 1.84,
    marketCap: '1.7T', sector: 'Technology',
    description: 'Meta Platforms operates Facebook, Instagram, WhatsApp, and Reality Labs (VR/AR).',
    eps: { years: ['2025', '2026', '2027'], values: [24.31, 28.92, 33.47] },
    peBands: { low: 18.2, mid: 21.8, high: 26.3 },
    scores: { value: 7.8, growth: 8.7, profit: 8.9, momentum: 8.1 },
    forwardPE: '28.1', ttmPE: '26.4',
    peers: [[1700, 28.1, 19, 'META'], [2800, 25.9, 22, 'GOOGL'], [1400, 45.2, 31, 'NFLX']],
    segments: [
      { name: 'Family of Apps', value: 97, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 3, itemStyle: { color: '#10b981' } }
    ],
    strengths: ['Instagram Reels competing effectively vs TikTok', 'WhatsApp Business monetization accelerating', 'Reality Labs losses narrowing (-$4B vs -$8B)'],
    risks: ['Apple ATT impact still affecting ad targeting', 'TikTok regulatory uncertainty creates volatility', 'Metaverse spending remains unprofitable'],
    news: [
      { headline: 'Instagram Threads reaches 130M daily active users', summary: 'Twitter competitor gaining traction with younger demographics', source: 'The Verge', datetime: '4 hours ago', url: '#' },
      { headline: 'Meta AI assistant integrated across all platforms', summary: 'ChatGPT competitor rolling out to 3 billion users globally', source: 'Reuters', datetime: '7 hours ago', url: '#' }
    ]
  },

  '700': {
    ticker: '700', name: 'Tencent Holdings', price: 320.60, change: -2.80, changePercent: -0.87,
    marketCap: '306B', sector: 'Technology',
    description: 'Tencent is a Chinese multinational technology conglomerate focusing on gaming, social media, and fintech.',
    eps: { years: ['2025', '2026', '2027'], values: [18.45, 21.23, 24.67] },
    peBands: { low: 14.2, mid: 16.8, high: 19.4 },
    scores: { value: 8.4, growth: 7.1, profit: 8.3, momentum: 6.9 },
    forwardPE: '17.4', ttmPE: '18.9',
    peers: [[306, 17.4, 15, '700'], [285, 16.2, 14, '9988'], [89, 12.3, 11, '1810']],
    segments: [
      { name: 'Value Added Services', value: 48, itemStyle: { color: '#3b82f6' } },
      { name: 'Online Advertising', value: 17, itemStyle: { color: '#10b981' } },
      { name: 'FinTech', value: 23, itemStyle: { color: '#f59e0b' } },
      { name: 'Business Services', value: 12, itemStyle: { color: '#8b5cf6' } }
    ],
    strengths: ['Gaming revenue recovery (+7% as regulations ease)', 'WeChat Pay domestic dominance (900M+ users)', 'International gaming expansion (Level Infinite)'],
    risks: ['Regulatory uncertainty in China continues', 'Competition intensifying in short video (Douyin)', 'Margin pressure from increased content costs'],
    news: [
      { headline: 'Tencent gaming approvals resume after 18-month freeze', summary: 'Honor of Kings and PUBG Mobile get new content approvals', source: 'SCMP', datetime: '1 hour ago', url: '#' },
      { headline: 'WeChat Mini Programs reach 500M daily users', summary: 'Super-app ecosystem driving fintech and commerce growth', source: 'Reuters', datetime: '5 hours ago', url: '#' }
    ]
  }

  // Continue with other stocks from your original data...
  // Keep all your existing DEMO_STOCK_DATA entries here
};

// Dynamic category system that adapts to available stocks
export async function getAvailableCategories() {
  try {
    // Get all stocks from Google Sheet overlay
    const allStocks = await getAllStockData()
    const availableTickers = allStocks.map(stock => stock.ticker)
    
    // Filter categories to only show those with available stocks
    const availableCategories = {}
    
    Object.entries(STOCK_CATEGORIES).forEach(([key, category]) => {
      const availableInCategory = category.tickers.filter(ticker => 
        availableTickers.includes(ticker)
      )
      
      if (availableInCategory.length > 0) {
        availableCategories[key] = {
          ...category,
          tickers: availableInCategory,
          count: availableInCategory.length
        }
      }
    })
    
    // Add "ALL" category for complete stock list
    if (availableTickers.length > 0) {
      availableCategories['ALL'] = {
        label: `📊 All Stocks`,
        color: '#6b7280',
        tickers: availableTickers.slice(0, 20), // Show first 20 in preview
        count: availableTickers.length,
        isComplete: true
      }
    }
    
    return availableCategories
  } catch (error) {
    console.error('Error getting available categories:', error)
    return STOCK_CATEGORIES // Fallback to static categories
  }
}

// Helper functions (keep all existing ones)
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
