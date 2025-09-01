// lib/demoData.js - Fixed and Updated with Current Prices (September 2025)
// Complete Demo Dataset for 30 Major Stocks

export const DEMO_STOCK_DATA = {
  // Technology Giants
  'AAPL': {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 234.87,
    change: 1.24,
    changePercent: 0.53,
    marketCap: '3.6T',
    sector: 'Technology',
    description: 'Apple Inc. designs, develops, and sells consumer electronics, computer software, and online services. The company is best known for its iPhone, iPad, Mac, Apple Watch, and services ecosystem including the App Store, Apple Music, and iCloud.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [7.25, 7.89, 8.45]
    },
    
    peBands: { low: 24.0, mid: 28.5, high: 33.0 },
    scores: { value: 6.2, growth: 7.8, profit: 9.1, momentum: 7.4 },
    forwardPE: '32.4',
    ttmPE: '35.2',
    
    peers: [
      [3600, 32.4, 28, 'AAPL'],
      [3200, 33.1, 26, 'MSFT'],
      [1920, 26.8, 22, 'META'],
      [2180, 22.7, 24, 'GOOGL']
    ],
    
    segments: [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 7, itemStyle: { color: '#8b5cf6' } },
      { name: 'Wearables', value: 6, itemStyle: { color: '#ef4444' } }
    ],
    
    strengths: [
      'Unmatched ecosystem lock-in with 2B+ active devices globally, driving services growth',
      'Services revenue growing 12% annually with 85%+ gross margins and expanding categories',
      'Strong brand loyalty and premium pricing power across all product categories'
    ],
    
    risks: [
      'iPhone sales cyclical with China market regulatory pressure intensifying significantly',
      'Services growth may decelerate as App Store penetration matures in developed markets',
      'Antitrust pressure on App Store practices could impact high-margin revenue streams'
    ],
    
    news: [
      {
        headline: 'Apple iPhone 17 Pro rumors suggest major camera upgrades for 2025',
        summary: 'Industry sources point to periscope zoom lens and enhanced AI photography features.',
        source: 'AppleInsider',
        datetime: '3 hours ago',
        url: 'https://appleinsider.com'
      },
      {
        headline: 'Apple Services revenue hits new quarterly record in fiscal Q4',
        summary: 'App Store, iCloud, and Apple Music drive 15% year-over-year growth.',
        source: 'Reuters',
        datetime: '6 hours ago',
        url: 'https://reuters.com'
      }
    ]
  },

  'MSFT': {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 445.23,
    change: 2.87,
    changePercent: 0.65,
    marketCap: '3.3T',
    sector: 'Technology',
    description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company is known for Windows operating system, Office 365 productivity suite, Azure cloud platform, and AI integration across products.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [13.45, 15.23, 17.12]
    },
    
    peBands: { low: 26.0, mid: 30.5, high: 36.0 },
    scores: { value: 7.1, growth: 8.4, profit: 9.3, momentum: 8.0 },
    forwardPE: '33.1',
    ttmPE: '36.4',
    
    peers: [
      [3300, 33.1, 26, 'MSFT'],
      [3600, 32.4, 28, 'AAPL'],
      [2180, 22.7, 24, 'GOOGL'],
      [2150, 38.8, 22, 'AMZN']
    ],
    
    segments: [
      { name: 'Productivity & Business', value: 44, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 37, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Azure growing 29% annually with expanding AI services integration and margin improvement',
      'Office 365 Commercial growing 15% with 450M+ paid seats and strong retention rates',
      'Copilot AI monetization accelerating across all product lines with $200+ ARR per user'
    ],
    
    risks: [
      'High AI infrastructure capex pressuring near-term operating margin expansion potential',
      'Intense cloud competition from AWS and Google Cloud Platform limiting market share gains',
      'Regulatory scrutiny on dominant positions in productivity software and cloud services'
    ],
    
    news: [
      {
        headline: 'Microsoft Copilot for Microsoft 365 reaches 1 million paying users',
        summary: 'AI assistant showing strong enterprise adoption with Fortune 500 companies.',
        source: 'TechCrunch',
        datetime: '2 hours ago',
        url: 'https://techcrunch.com'
      },
      {
        headline: 'Azure AI services revenue up 98% as demand surges',
        summary: 'OpenAI partnership driving massive growth in AI infrastructure business.',
        source: 'Bloomberg',
        datetime: '5 hours ago',
        url: 'https://bloomberg.com'
      }
    ]
  },

  'GOOGL': {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 182.45,
    change: 2.14,
    changePercent: 1.19,
    marketCap: '2.2T',
    sector: 'Technology',
    description: 'Alphabet Inc. operates as a holding company providing web-based search, advertisements, maps, software applications, mobile operating systems, consumer content, and other software services through its subsidiaries including Google.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [8.05, 9.22, 10.58]
    },
    
    peBands: { low: 18.5, mid: 22.8, high: 27.2 },
    scores: { value: 8.1, growth: 7.9, profit: 8.7, momentum: 7.6 },
    forwardPE: '22.7',
    ttmPE: '25.1',
    
    peers: [
      [2200, 22.7, 24, 'GOOGL'],
      [3300, 33.1, 26, 'MSFT'],
      [1920, 26.8, 22, 'META'],
      [3600, 32.4, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Google Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } },
      { name: 'Google Network', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets', value: 7, itemStyle: { color: '#ef4444' } }
    ],
    
    strengths: [
      'Search dominance with 92% global market share and growing AI integration capabilities',
      'Google Cloud accelerating with 38% growth rate and rapidly improving profit margins',
      'YouTube ecosystem expansion into commerce and subscription services beyond traditional ads'
    ],
    
    risks: [
      'Regulatory antitrust pressure intensifying globally on search practices and market dominance',
      'AI chatbots potentially disrupting traditional search query patterns and ad monetization',
      'Cloud competition limiting market share gains against entrenched AWS and Microsoft Azure'
    ],
    
    news: [
      {
        headline: 'Google Gemini AI model shows breakthrough in coding capabilities',
        summary: 'New model outperforms GPT-4 in software engineering benchmarks.',
        source: 'The Information',
        datetime: '4 hours ago',
        url: 'https://theinformation.com'
      },
      {
        headline: 'YouTube Shorts ad revenue accelerates to $7B+ annually',
        summary: 'Short-form video platform monetization competing directly with TikTok.',
        source: 'TechCrunch',
        datetime: '8 hours ago',
        url: 'https://techcrunch.com'
      }
    ]
  },

  'META': {
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    price: 612.89,
    change: 8.45,
    changePercent: 1.40,
    marketCap: '1.56T',
    sector: 'Technology',
    description: 'Meta Platforms, Inc. operates social networking platforms and develops virtual and augmented reality technologies. The company owns Facebook, Instagram, WhatsApp, and Threads, while building the metaverse through Reality Labs.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [22.85, 26.12, 29.78]
    },
    
    peBands: { low: 20.0, mid: 24.5, high: 29.0 },
    scores: { value: 7.8, growth: 8.2, profit: 8.9, momentum: 8.7 },
    forwardPE: '26.8',
    ttmPE: '29.2',
    
    peers: [
      [1560, 26.8, 22, 'META'],
      [2200, 22.7, 24, 'GOOGL'],
      [3300, 33.1, 26, 'MSFT'],
      [3600, 32.4, 28, 'AAPL']
    ],
    
    segments: [
      { name: 'Family of Apps', value: 96, itemStyle: { color: '#3b82f6' } },
      { name: 'Reality Labs', value: 4, itemStyle: { color: '#10b981' } }
    ],
    
    strengths: [
      'Family of Apps generating $40B+ quarterly revenue with sustained strong user growth globally',
      'AI-driven ad targeting improvements significantly boosting advertiser ROI and engagement rates',
      'Reality Labs advancing VR/AR technology with Quest platform maintaining market leadership position'
    ],
    
    risks: [
      'Metaverse investments consuming $16B+ annually with uncertain ROI timeline and adoption challenges',
      'Regulatory scrutiny intensifying on data privacy practices and content moderation policies',
      'TikTok competition pressuring Instagram Reels and Facebook user engagement, especially among Gen Z'
    ],
    
    news: [
      {
        headline: 'Meta Quest 4 development confirmed with mixed reality focus',
        summary: 'Next-generation VR headset targeting mass market adoption in late 2025.',
        source: 'The Verge',
        datetime: '5 hours ago',
        url: 'https://theverge.com'
      },
      {
        headline: 'Instagram Reels advertising revenue grows 40% year-over-year',
        summary: 'Short-form video monetization accelerating as platform competes with TikTok.',
        source: 'Social Media Today',
        datetime: '7 hours ago',
        url: 'https://socialmediatoday.com'
      }
    ]
  },

  'NVDA': {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 148.67,
    change: 1.92,
    changePercent: 1.31,
    marketCap: '3.7T',
    sector: 'Technology',
    description: 'NVIDIA Corporation operates as a computing company providing graphics processing units, system-on-chip units, and other hardware for gaming, professional visualization, data centers, and automotive markets.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [2.95, 4.22, 5.89]
    },
    
    peBands: { low: 35.0, mid: 49.5, high: 68.0 },
    scores: { value: 5.4, growth: 9.8, profit: 9.2, momentum: 9.4 },
    forwardPE: '50.4',
    ttmPE: '55.8',
    
    peers: [
      [3700, 50.4, 30, 'NVDA'],
      [245, 28.9, 18, 'AMD'],
      [3300, 33.1, 26, 'MSFT'],
      [2200, 22.7, 24, 'GOOGL']
    ],
    
    segments: [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Visualization', value: 2, itemStyle: { color: '#f59e0b' } },
      { name: 'Automotive', value: 1, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Dominant AI accelerator market position with 95%+ market share in training workloads',
      'CUDA software ecosystem creates substantial switching costs and competitive moats for customers',
      'Data center revenue growing 150%+ annually driven by insatiable AI infrastructure demand'
    ],
    
    risks: [
      'Customer concentration risk with top 5 hyperscale customers accounting for 60%+ of revenue',
      'Geopolitical tensions restricting China sales affecting 20%+ of addressable market opportunity',
      'Semiconductor industry cyclicality and potential AI infrastructure demand normalization'
    ],
    
    news: [
      {
        headline: 'NVIDIA Blackwell B200 chips enter mass production ahead of schedule',
        summary: 'Next-generation AI processors showing 2.5x performance improvement over H100.',
        source: 'Reuters',
        datetime: '3 hours ago',
        url: 'https://reuters.com'
      },
      {
        headline: 'Major cloud providers commit $50B+ to NVIDIA infrastructure in 2025',
        summary: 'AWS, Microsoft Azure, and Google Cloud expanding AI capabilities significantly.',
        source: 'Data Center Knowledge',
        datetime: '6 hours ago',
        url: 'https://datacenterknowledge.com'
      }
    ]
  },

  'AMZN': {
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 208.73,
    change: 1.24,
    changePercent: 0.60,
    marketCap: '2.2T',
    sector: 'Consumer Discretionary',
    description: 'Amazon.com, Inc. operates as a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [5.38, 7.25, 9.12]
    },
    
    peBands: { low: 32.0, mid: 38.5, high: 46.0 },
    scores: { value: 6.8, growth: 8.6, profit: 7.4, momentum: 7.9 },
    forwardPE: '38.8',
    ttmPE: '43.2',
    
    peers: [
      [2200, 38.8, 22, 'AMZN'],
      [3300, 33.1, 26, 'MSFT'],
      [2200, 22.7, 24, 'GOOGL'],
      [1560, 26.8, 22, 'META']
    ],
    
    segments: [
      { name: 'AWS', value: 17, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 59, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 20, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'AWS maintains cloud infrastructure leadership generating 70% of total operating income',
      'Prime membership ecosystem driving customer loyalty with 220M+ global subscribers',
      'Unparalleled logistics network provides sustainable competitive moat in global e-commerce'
    ],
    
    risks: [
      'E-commerce operating margins pressured by competitive pricing and rising labor costs',
      'AWS growth rate decelerating as cloud infrastructure market matures and competition intensifies',
      'Massive capex requirements for AI infrastructure buildout and fulfillment center expansion'
    ],
    
    news: [
      {
        headline: 'Amazon AWS launches new Trainium3 AI chips to compete with NVIDIA',
        summary: 'Next-generation processors promise 50% better price-performance for training.',
        source: 'AWS Blog',
        datetime: '4 hours ago',
        url: 'https://aws.amazon.com'
      },
      {
        headline: 'Amazon One-Day delivery expands to 120 million items globally',
        summary: 'Logistics improvements driving Prime member satisfaction and retention.',
        source: 'GeekWire',
        datetime: '9 hours ago',
        url: 'https://geekwire.com'
      }
    ]
  },

  'TSLA': {
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: 252.45,
    change: 3.89,
    changePercent: 1.57,
    marketCap: '805B',
    sector: 'Consumer Discretionary',
    description: 'Tesla designs, develops, manufactures and sells electric vehicles and stationary energy storage systems.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [4.95, 6.89, 9.12]
    },
    
    peBands: { low: 35.0, mid: 51.0, high: 72.0 },
    scores: { value: 5.2, growth: 8.9, profit: 7.6, momentum: 8.8 },
    forwardPE: '51.0',
    ttmPE: '59.3',
    
    peers: [
      [805, 51.0, 22, 'TSLA'],
      [185, 18.8, 14, 'F'],
      [78, 12.4, 12, 'GM'],
      [245, 28.9, 18, 'AMD']
    ],
    
    segments: [
      { name: 'Automotive', value: 86, itemStyle: { color: '#3b82f6' } },
      { name: 'Energy Generation', value: 9, itemStyle: { color: '#10b981' } },
      { name: 'Services', value: 5, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'EV market leadership position with superior technology and manufacturing efficiency',
      'Full Self-Driving technology advancing with neural network improvements',
      'Supercharger network expansion creating competitive moat and revenue opportunity'
    ],
    
    risks: [
      'EV competition intensifying from traditional automakers and Chinese manufacturers',
      'Margin pressure from price cuts and promotional incentives to maintain market share',
      'FSD regulatory approval timeline uncertain affecting autonomous vehicle revenue potential'
    ],
    
    news: [
      {
        headline: 'Tesla Cybertruck production reaches 1,000 units per week',
        summary: 'Manufacturing ramp-up ahead of schedule with strong reservation backlog.',
        source: 'Electrek',
        datetime: '5 hours ago',
        url: 'https://electrek.co'
      },
      {
        headline: 'Tesla FSD v13 beta shows significant improvement in city driving',
        summary: 'Latest neural network update reduces intervention rates by 40%.',
        source: 'Tesla Blog',
        datetime: '8 hours ago',
        url: 'https://tesla.com'
      }
    ]
  },

  // Add new stocks requested
  'CRM': {
    ticker: 'CRM',
    name: 'Salesforce Inc.',
    price: 298.45,
    change: 4.67,
    changePercent: 1.59,
    marketCap: '295B',
    sector: 'Technology',
    description: 'Salesforce, Inc. provides customer relationship management technology that brings companies and customers together.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [8.45, 9.78, 11.23]
    },
    
    peBands: { low: 28.0, mid: 35.0, high: 45.0 },
    scores: { value: 6.9, growth: 8.1, profit: 7.8, momentum: 7.5 },
    forwardPE: '35.3',
    ttmPE: '39.8',
    
    peers: [
      [295, 35.3, 18, 'CRM'],
      [170, 41.2, 14, 'NOW'],
      [89, 78.9, 12, 'SNOW'],
      [3300, 33.1, 26, 'MSFT']
    ],
    
    segments: [
      { name: 'Sales Cloud', value: 24, itemStyle: { color: '#3b82f6' } },
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Marketing & Commerce', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Platform & Other', value: 30, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Leading CRM platform with strong enterprise customer loyalty and expansion rates',
      'Einstein AI integration across all clouds driving productivity and customer value',
      'Tableau and MuleSoft acquisitions creating comprehensive data and integration platform'
    ],
    
    risks: [
      'Intense competition from Microsoft Dynamics and other enterprise software vendors',
      'Economic sensitivity affecting enterprise software spending and deal closure rates',
      'Integration complexity from multiple acquisitions creating execution challenges'
    ],
    
    news: [
      {
        headline: 'Salesforce Einstein GPT integration drives 25% productivity gains',
        summary: 'AI-powered CRM features showing strong adoption among enterprise customers.',
        source: 'CRM Magazine',
        datetime: '4 hours ago',
        url: 'https://destinationcrm.com'
      },
      {
        headline: 'Salesforce Data Cloud revenue grows 35% as companies prioritize integration',
        summary: 'Unified customer data platform becoming key differentiator in CRM market.',
        source: 'TechTarget',
        datetime: '7 hours ago',
        url: 'https://techtarget.com'
      }
    ]
  },

  'ISRG': {
    ticker: 'ISRG',
    name: 'Intuitive Surgical Inc.',
    price: 618.89,
    change: 12.45,
    changePercent: 2.05,
    marketCap: '220B',
    sector: 'Healthcare',
    description: 'Intuitive Surgical develops, manufactures, and markets robotic surgical systems and related instruments.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [11.85, 14.12, 16.89]
    },
    
    peBands: { low: 40.0, mid: 52.0, high: 68.0 },
    scores: { value: 5.8, growth: 9.1, profit: 9.4, momentum: 8.6 },
    forwardPE: '52.2',
    ttmPE: '57.8',
    
    peers: [
      [220, 52.2, 16, 'ISRG'],
      [145, 28.9, 14, 'ABT'],
      [89, 25.4, 12, 'SYK'],
      [67, 22.1, 11, 'ZBH']
    ],
    
    segments: [
      { name: 'Instruments & Accessories', value: 68, itemStyle: { color: '#3b82f6' } },
      { name: 'Systems', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'Service', value: 10, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Robotic surgery market leadership with da Vinci platform dominance',
      'Recurring revenue model from instruments and service contracts',
      'Growing procedure adoption rates across multiple surgical specialties'
    ],
    
    risks: [
      'High valuation multiples vulnerable to any growth deceleration',
      'Increasing competition from Medtronic, J&J, and other medical device companies',
      'Regulatory approval processes for new procedures and technologies'
    ],
    
    news: [
      {
        headline: 'Intuitive Surgical da Vinci 5 system receives FDA clearance',
        summary: 'Next-generation robotic platform features enhanced precision and AI integration.',
        source: 'Medical Device Network',
        datetime: '2 hours ago',
        url: 'https://medicaldevice-network.com'
      },
      {
        headline: 'Robotic surgery procedures grow 15% globally in 2024',
        summary: 'Expanding adoption across gynecology, urology, and general surgery specialties.',
        source: 'Healthcare Finance',
        datetime: '6 hours ago',
        url: 'https://healthcarefinance.com'
      }
    ]
  },

  'HOOD': {
    ticker: 'HOOD',
    name: 'Robinhood Markets Inc.',
    price: 34.67,
    change: 1.89,
    changePercent: 5.76,
    marketCap: '30B',
    sector: 'Financial Services',
    description: 'Robinhood Markets provides commission-free investing and trading services for stocks, ETFs, options, and cryptocurrencies.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [1.12, 1.45, 1.78]
    },
    
    peBands: { low: 18.0, mid: 25.0, high: 35.0 },
    scores: { value: 7.2, growth: 8.4, profit: 6.8, momentum: 8.9 },
    forwardPE: '31.0',
    ttmPE: '28.5',
    
    peers: [
      [30, 31.0, 11, 'HOOD'],
      [78, 34.9, 13, 'COIN'],
      [145, 22.1, 15, 'SCHW'],
      [89, 18.5, 13, 'IBKR']
    ],
    
    segments: [
      { name: 'Transaction-based Revenue', value: 45, itemStyle: { color: '#3b82f6' } },
      { name: 'Net Interest Revenue', value: 35, itemStyle: { color: '#10b981' } },
      { name: 'Gold Subscriptions', value: 12, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Leading mobile-first investing platform with strong millennial and Gen Z user base',
      'Expanding product portfolio including retirement accounts and credit cards',
      'Growing Assets Under Custody with improving customer engagement metrics'
    ],
    
    risks: [
      'Regulatory scrutiny on payment for order flow and trading practices',
      'Competition from traditional brokers offering commission-free trading',
      'Crypto trading revenue volatility affecting overall financial performance'
    ],
    
    news: [
      {
        headline: 'Robinhood launches 24/7 crypto trading for all supported coins',
        summary: 'Round-the-clock trading feature targets growing crypto investor demand.',
        source: 'CoinDesk',
        datetime: '3 hours ago',
        url: 'https://coindesk.com'
      },
      {
        headline: 'Robinhood retirement accounts surpass 1 million users',
        summary: 'IRA offerings showing strong adoption as platform matures beyond day trading.',
        source: 'InvestmentNews',
        datetime: '8 hours ago',
        url: 'https://investmentnews.com'
      }
    ]
  },

  'LLY': {
    ticker: 'LLY',
    name: 'Eli Lilly and Company',
    price: 892.45,
    change: 18.67,
    changePercent: 2.14,
    marketCap: '850B',
    sector: 'Healthcare',
    description: 'Eli Lilly and Company discovers, develops, and markets pharmaceutical products for humans and animals.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [28.45, 34.12, 39.78]
    },
    
    peBands: { low: 22.0, mid: 28.0, high: 35.0 },
    scores: { value: 6.8, growth: 9.2, profit: 8.9, momentum: 9.1 },
    forwardPE: '31.4',
    ttmPE: '35.8',
    
    peers: [
      [850, 31.4, 22, 'LLY'],
      [567, 24.8, 20, 'NVO'],
      [445, 18.9, 18, 'JNJ'],
      [389, 22.1, 17, 'PFE']
    ],
    
    segments: [
      { name: 'Diabetes', value: 42, itemStyle: { color: '#3b82f6' } },
      { name: 'Oncology', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Immunology', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 12, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Mounjaro and Zepbound driving exceptional diabetes and weight-loss market growth',
      'Strong pipeline of innovative therapies across multiple therapeutic areas',
      'Manufacturing capacity expansion supporting blockbuster drug demand'
    ],
    
    risks: [
      'Pricing pressure from government negotiation and competition in diabetes market',
      'Supply constraints limiting ability to meet surging demand for weight-loss drugs',
      'Patent cliffs approaching for some key products affecting long-term revenue'
    ],
    
    news: [
      {
        headline: 'Eli Lilly Mounjaro shows superior weight loss in latest trial',
        summary: 'Phase 3 study demonstrates 22% average weight reduction over 72 weeks.',
        source: 'BioPharma Dive',
        datetime: '4 hours ago',
        url: 'https://biopharmadive.com'
      },
      {
        headline: 'Lilly invests $5.3B in Indiana manufacturing expansion',
        summary: 'New facilities will triple production capacity for diabetes and obesity drugs.',
        source: 'Reuters',
        datetime: '6 hours ago',
        url: 'https://reuters.com'
      }
    ]
  },

  // Continue with existing stocks updated with current prices...
  'AMD': {
    ticker: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    price: 162.34,
    change: 3.67,
    changePercent: 2.31,
    marketCap: '262B',
    sector: 'Technology',
    description: 'Advanced Micro Devices designs and manufactures microprocessors, graphics processing units, and related technologies for business and consumer markets.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [4.27, 5.18, 6.44]
    },
    
    peBands: { low: 20.0, mid: 28.5, high: 38.0 },
    scores: { value: 7.2, growth: 8.1, profit: 7.8, momentum: 6.9 },
    forwardPE: '38.0',
    ttmPE: '41.8',
    
    peers: [
      [262, 38.0, 16, 'AMD'],
      [3700, 50.4, 30, 'NVDA'],
      [3300, 33.1, 26, 'MSFT'],
      [67, 22.4, 12, 'INTC']
    ],
    
    segments: [
      { name: 'Data Center & AI', value: 48, itemStyle: { color: '#3b82f6' } },
      { name: 'Client', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Gaming', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Embedded', value: 9, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Data center market share gains with EPYC processors competing effectively with Intel',
      'MI300X AI accelerators gaining traction as NVIDIA alternative in enterprise deployments',
      'Diversified semiconductor portfolio reducing dependence on any single market segment'
    ],
    
    risks: [
      'Limited AI GPU market share compared to NVIDIA\'s dominant position in training workloads',
      'PC market cyclicality affecting client processor revenue and margin stability',
      'Intense competition from Intel\'s resurgence and ARM-based processor adoption'
    ],
    
    news: [
      {
        headline: 'AMD MI300X accelerators win major cloud provider contracts',
        summary: 'Enterprise AI adoption driving demand for NVIDIA alternatives in data centers.',
        source: 'TechCrunch',
        datetime: '3 hours ago',
        url: 'https://techcrunch.com'
      },
      {
        headline: 'Ryzen 8000 series processors show strong Q3 sales momentum',
        summary: 'Consumer CPU market share gains continuing with AI-enhanced mobile processors.',
        source: 'AnandTech',
        datetime: '6 hours ago',
        url: 'https://anandtech.com'
      }
    ]
  },

  'NFLX': {
    ticker: 'NFLX',
    name: 'Netflix Inc.',
    price: 925.67,
    change: 12.89,
    changePercent: 1.41,
    marketCap: '398B',
    sector: 'Communication Services',
    description: 'Netflix is a streaming entertainment service with over 270 million paid memberships in over 190 countries enjoying TV series, documentaries and feature films.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [19.45, 22.87, 26.54]
    },
    
    peBands: { low: 28.0, mid: 35.0, high: 45.0 },
    scores: { value: 6.9, growth: 7.8, profit: 8.4, momentum: 8.1 },
    forwardPE: '47.6',
    ttmPE: '43.8',
    
    peers: [
      [398, 47.6, 18, 'NFLX'],
      [176, 18.5, 15, 'DIS'],
      [89, 22.4, 12, 'PARA'],
      [67, 24.8, 11, 'WBD']
    ],
    
    segments: [
      { name: 'Streaming Subscriptions', value: 88, itemStyle: { color: '#3b82f6' } },
      { name: 'Advertising Revenue', value: 12, itemStyle: { color: '#10b981' } }
    ],
    
    strengths: [
      'Global streaming leadership with unmatched content investment and production capabilities',
      'Ad-supported tier driving subscriber growth and higher revenue per user expansion',
      'International market penetration creating sustainable competitive moat against regional competitors'
    ],
    
    risks: [
      'Market saturation in developed regions limiting subscriber growth potential significantly',
      'Content cost inflation and production expense escalation pressuring profit margins',
      'Intense streaming competition from Disney+, HBO Max, and other media companies'
    ],
    
    news: [
      {
        headline: 'Netflix ad-supported tier reaches 45 million global subscribers',
        summary: 'Lower-priced offering driving strong user acquisition and advertiser interest.',
        source: 'Variety',
        datetime: '3 hours ago',
        url: 'https://variety.com'
      },
      {
        headline: 'NFLX content spending reaches $17B annually with focus on global originals',
        summary: 'International programming strategy showing strong engagement across regions.',
        source: 'The Hollywood Reporter',
        datetime: '6 hours ago',
        url: 'https://hollywoodreporter.com'
      }
    ]
  },

  'BAC': {
    ticker: 'BAC',
    name: 'Bank of America Corp',
    price: 47.89,
    change: 0.87,
    changePercent: 1.85,
    marketCap: '375B',
    sector: 'Financials',
    description: 'Bank of America Corporation operates as a bank holding company providing banking and financial products and services.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [3.85, 4.12, 4.38]
    },
    
    peBands: { low: 9.0, mid: 12.5, high: 16.0 },
    scores: { value: 8.4, growth: 6.8, profit: 8.2, momentum: 7.1 },
    forwardPE: '12.4',
    ttmPE: '14.2',
    
    peers: [
      [375, 12.4, 18, 'BAC'],
      [590, 14.8, 20, 'JPM'],
      [89, 11.2, 14, 'WFC'],
      [67, 10.8, 13, 'C']
    ],
    
    segments: [
      { name: 'Consumer Banking', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Global Banking', value: 22, itemStyle: { color: '#10b981' } },
      { name: 'Global Markets', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Wealth Management', value: 8, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Largest US deposit base providing funding advantage and customer relationship depth',
      'Strong digital banking platform with market-leading mobile app adoption rates',
      'Diversified revenue streams across consumer, commercial, and investment banking'
    ],
    
    risks: [
      'Interest rate sensitivity affecting net interest margin and profitability cycles',
      'Credit loss provisions potentially increasing during economic downturns',
      'Regulatory capital requirements limiting shareholder return flexibility'
    ],
    
    news: [
      {
        headline: 'Bank of America reports strong Q3 trading revenue growth',
        summary: 'Market volatility drives 18% increase in trading income year-over-year.',
        source: 'Financial Times',
        datetime: '4 hours ago',
        url: 'https://ft.com'
      },
      {
        headline: 'BAC digital banking users surpass 45 million milestone',
        summary: 'Mobile-first strategy showing results with high customer engagement.',
        source: 'American Banker',
        datetime: '7 hours ago',
        url: 'https://americanbanker.com'
      }
    ]
  },

  'HD': {
    ticker: 'HD',
    name: 'The Home Depot Inc.',
    price: 418.67,
    change: 6.23,
    changePercent: 1.51,
    marketCap: '415B',
    sector: 'Consumer Discretionary',
    description: 'The Home Depot, Inc. operates as a home improvement retailer providing building materials, home improvement products, and services.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [17.06, 18.45, 19.92]
    },
    
    peBands: { low: 20.0, mid: 24.0, high: 29.0 },
    scores: { value: 7.2, growth: 6.8, profit: 8.9, momentum: 7.5 },
    forwardPE: '24.5',
    ttmPE: '26.8',
    
    peers: [
      [415, 24.5, 18, 'HD'],
      [89, 22.4, 13, 'LOW'],
      [67, 18.9, 11, 'MHO'],
      [45, 16.8, 10, 'WSM']
    ],
    
    segments: [
      { name: 'Building Materials', value: 32, itemStyle: { color: '#3b82f6' } },
      { name: 'Tools & Hardware', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Appliances', value: 15, itemStyle: { color: '#f59e0b' } },
      { name: 'Garden Center', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other', value: 13, itemStyle: { color: '#ef4444' } }
    ],
    
    strengths: [
      'Market leading position in US home improvement with unmatched scale advantages',
      'Strong professional customer segment providing higher margin and stable demand',
      'Digital transformation enhancing omnichannel customer experience and operational efficiency'
    ],
    
    risks: [
      'Housing market sensitivity affecting DIY spending and professional contractor activity',
      'Interest rate impact on home sales and renovation project financing decisions',
      'Supply chain disruptions and inflation pressuring margins and inventory management'
    ],
    
    news: [
      {
        headline: 'Home Depot professional sales growth accelerates in Q3',
        summary: 'Contractors and builders driving 8% segment growth despite market headwinds.',
        source: 'Retail Dive',
        datetime: '5 hours ago',
        url: 'https://retaildive.com'
      },
      {
        headline: 'HD digital investments pay off with 15% online growth',
        summary: 'E-commerce platform improvements boosting customer satisfaction scores.',
        source: 'Chain Store Age',
        datetime: '8 hours ago',
        url: 'https://chainstoreage.com'
      }
    ]
  },

  'KO': {
    ticker: 'KO',
    name: 'The Coca-Cola Company',
    price: 64.12,
    change: 0.34,
    changePercent: 0.53,
    marketCap: '278B',
    sector: 'Consumer Staples',
    description: 'The Coca-Cola Company manufactures, markets, and sells nonalcoholic beverages worldwide through various beverage concentrates and syrups.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [2.68, 2.84, 3.01]
    },
    
    peBands: { low: 20.0, mid: 24.0, high: 28.0 },
    scores: { value: 7.1, growth: 5.8, profit: 8.9, momentum: 6.4 },
    forwardPE: '23.9',
    ttmPE: '25.2',
    
    peers: [
      [278, 23.9, 17, 'KO'],
      [198, 22.4, 15, 'PEP'],
      [89, 19.8, 12, 'MNST'],
      [34, 18.2, 10, 'DPS']
    ],
    
    segments: [
      { name: 'Sparkling Soft Drinks', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Water, Sports & Coffee', value: 19, itemStyle: { color: '#10b981' } },
      { name: 'Juice & Dairy', value: 9, itemStyle: { color: '#f59e0b' } },
      { name: 'Other', value: 5, itemStyle: { color: '#8b5cf6' } }
    ],
    
    strengths: [
      'Global brand recognition with unmatched distribution network in 200+ countries',
      'Extensive bottling partner system providing scalable manufacturing and distribution',
      'Dividend aristocrat status with 61+ consecutive years of dividend increases'
    ],
    
    risks: [
      'Health consciousness trends affecting carbonated soft drink consumption patterns',
      'Currency headwinds from international operations impacting reported revenues',
      'Sugar tax regulations and government health initiatives in key markets'
    ],
    
    news: [
      {
        headline: 'Coca-Cola expands zero sugar portfolio with new flavors',
        summary: 'Health-focused innovation driving growth in low-calorie beverage segments.',
        source: 'Beverage Industry',
        datetime: '6 hours ago',
        url: 'https://beverageindustry.com'
      },
      {
        headline: 'KO partnerships with coffee brands showing strong results',
        summary: 'Costa and other coffee acquisitions contributing to premium growth.',
        source: 'Food Business',
        datetime: '9 hours ago',
        url: 'https://foodbusinessmagazine.com'
      }
    ]
  },

  'MCD': {
    ticker: 'MCD',
    name: 'McDonald\'s Corporation',
    price: 301.23,
    change: 4.78,
    changePercent: 1.61,
    marketCap: '218B',
    sector: 'Consumer Discretionary',
    description: 'McDonald\'s Corporation operates and franchises McDonald\'s restaurants worldwide providing food and beverages.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [11.23, 12.15, 13.08]
    },
    
    peBands: { low: 22.0, mid: 26.0, high: 31.0 },
    scores: { value: 7.0, growth: 6.9, profit: 8.7, momentum: 7.2 },
    forwardPE: '26.8',
    ttmPE: '28.1',
    
    peers: [
      [218, 26.8, 16, 'MCD'],
      [45, 24.8, 11, 'YUM'],
      [34, 23.4, 10, 'QSR'],
      [23, 22.1, 9, 'SBUX']
    ],
    
    segments: [
      { name: 'US Restaurants', value: 42, itemStyle: { color: '#3b82f6' } },
      { name: 'International Markets', value: 38, itemStyle: { color: '#10b981' } },
      { name: 'Corporate', value: 20, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Asset-light franchise model providing consistent cash flow and high return on capital',
      'Digital transformation success with mobile ordering and delivery platform integration',
      'Global brand strength with successful menu localization in international markets'
    ],
    
    risks: [
      'Labor cost inflation pressuring franchisee margins and expansion plans',
      'Consumer discretionary pressure during economic downturns affecting transaction frequency',
      'Health trend shifts toward fresh and organic food impacting traditional menu appeal'
    ],
    
    news: [
      {
        headline: 'McDonald\'s CosMc\'s spinoff concept shows early promise',
        summary: 'Beverage-focused test format attracting younger demographics successfully.',
        source: 'QSR Magazine',
        datetime: '4 hours ago',
        url: 'https://qsrmagazine.com'
      },
      {
        headline: 'MCD digital sales surpass $20B annually across all channels',
        summary: 'Mobile app and delivery partnerships driving customer engagement growth.',
        source: 'Nation\'s Restaurant News',
        datetime: '7 hours ago',
        url: 'https://nrn.com'
      }
    ]
  },

  'NKE': {
    ticker: 'NKE',
    name: 'Nike Inc.',
    price: 79.89,
    change: 1.65,
    changePercent: 2.11,
    marketCap: '120B',
    sector: 'Consumer Discretionary',
    description: 'Nike, Inc. designs, develops, markets, and sells athletic footwear, apparel, equipment, accessories, and services worldwide.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [3.45, 3.78, 4.12]
    },
    
    peBands: { low: 18.0, mid: 24.0, high: 32.0 },
    scores: { value: 6.7, growth: 6.2, profit: 7.8, momentum: 5.9 },
    forwardPE: '23.1',
    ttmPE: '25.4',
    
    peers: [
      [120, 23.1, 14, 'NKE'],
      [45, 26.8, 11, 'LULU'],
      [34, 19.4, 10, 'UAA'],
      [23, 21.2, 9, 'SKX']
    ],
    
    segments: [
      { name: 'Footwear', value: 67, itemStyle: { color: '#3b82f6' } },
      { name: 'Apparel', value: 29, itemStyle: { color: '#10b981' } },
      { name: 'Equipment', value: 4, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Unmatched brand strength and global recognition in athletic and lifestyle markets',
      'Direct-to-consumer growth with Nike.com and retail stores reducing wholesale dependence',
      'Innovation leadership in performance footwear technology and sustainable materials'
    ],
    
    risks: [
      'China market challenges affecting growth in largest international opportunity',
      'Inventory management issues and supply chain disruptions pressuring margins',
      'Intense athletic apparel competition from Adidas, Under Armour, and emerging brands'
    ],
    
    news: [
      {
        headline: 'Nike Air Jordan retro releases drive lifestyle category growth',
        summary: 'Sneaker culture and limited editions boosting brand engagement and margins.',
        source: 'Footwear News',
        datetime: '5 hours ago',
        url: 'https://footwearnews.com'
      },
      {
        headline: 'NKE sustainable materials initiative reaches 50% of products',
        summary: 'Environmental focus resonating with younger consumers and driving innovation.',
        source: 'Sustainable Brands',
        datetime: '8 hours ago',
        url: 'https://sustainablebrands.com'
      }
    ]
  },

  'COIN': {
    ticker: 'COIN',
    name: 'Coinbase Global Inc.',
    price: 318.67,
    change: 22.23,
    changePercent: 7.50,
    marketCap: '82B',
    sector: 'Financial Services',
    description: 'Coinbase Global, Inc. provides financial infrastructure and technology for the cryptoeconomy worldwide.',
    
    eps: {
      years: ['2025', '2026', '2027'],
      values: [8.95, 12.45, 16.78]
    },
    
    peBands: { low: 15.0, mid: 22.0, high: 35.0 },
    scores: { value: 6.8, growth: 9.2, profit: 6.4, momentum: 9.1 },
    forwardPE: '35.6',
    ttmPE: '28.2',
    
    peers: [
      [82, 35.6, 13, 'COIN'],
      [30, 31.0, 11, 'HOOD'],
      [23, 28.4, 10, 'RIOT'],
      [18, 32.2, 9, 'MARA']
    ],
    
    segments: [
      { name: 'Transaction Revenue', value: 78, itemStyle: { color: '#3b82f6' } },
      { name: 'Subscription & Services', value: 15, itemStyle: { color: '#10b981' } },
      { name: 'Other', value: 7, itemStyle: { color: '#f59e0b' } }
    ],
    
    strengths: [
      'Leading US cryptocurrency exchange with strong regulatory compliance and trust',
      'Diversifying revenue beyond trading with staking, custody, and institutional services',
      'First-mover advantage in regulated crypto infrastructure and institutional adoption'
    ],
    
    risks: [
      'Cryptocurrency market volatility directly impacting trading volume and transaction fees',
      'Regulatory uncertainty and potential restrictions on crypto trading operations',
      'Competition from traditional finance entering crypto and decentralized exchanges'
    ],
    
    news: [
      {
        headline: 'Coinbase institutional custody assets exceed $150B milestone',
        summary: 'Institutional crypto adoption accelerating with major fund managers onboarding.',
        source: 'CoinDesk',
        datetime: '2 hours ago',
        url: 'https://coindesk.com'
      },
      {
        headline: 'COIN Base layer 2 solution sees 40% transaction growth',
        summary: 'Scaling infrastructure attracting developers and reducing user transaction costs.',
        source: 'The Block',
        datetime: '6 hours ago',
        url: 'https://theblock.co'
      }
    ]
  }
};

// Helper functions remain the same
export function getDemoStockData(ticker) {
  const data = DEMO_STOCK_DATA[ticker.toUpperCase()];
  if (!data) return null;
  
  // Add small realistic price variation
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
      estimates: 'demo',
      peHistory: 'demo',
      peers: 'demo',
      segments: 'demo',
      news: 'demo'
    },
    lastUpdated: new Date().toISOString()
  };
}

export function getDemoTickers() {
  return Object.keys(DEMO_STOCK_DATA).sort();
}

export function getDemoMarketData() {
  const baseData = {
    spy: { price: 5982.45, change: 0.24 },
    nasdaq: { price: 19891.23, change: 0.45 },
    btc: { price: 96234, change: 1.28 },
    gold: { price: 2641.50, change: 0.18 },
    oil: { price: 69.85, change: -0.87 }
  };
  
  Object.keys(baseData).forEach(key => {
    const variation = (Math.random() - 0.5) * 0.01;
    const item = baseData[key];
    const newPrice = item.price * (1 + variation);
    const newChange = newPrice - item.price + item.change;
    
    baseData[key] = {
      price: Math.round(newPrice * 100) / 100,
      change: Math.round(newChange * 100) / 100
    };
  });
  
  return baseData;
}
