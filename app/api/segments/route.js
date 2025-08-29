import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol parameter required' }, { status: 400 })
  }

  const FMP_API_KEY = process.env.FMP_API_KEY

  if (!FMP_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  try {
    // Fetch revenue by segments
    const url = `https://financialmodelingprep.com/api/v4/revenue-product-segmentation?symbol=${symbol}&structure=flat&apikey=${FMP_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      // Check if we have fallback segment data for major companies
      const fallbackSegments = getFallbackSegments(symbol.toUpperCase())
      if (fallbackSegments.length > 0) {
        return NextResponse.json({
          segments: fallbackSegments,
          dataSource: 'fallback',
          message: 'Using fallback segment data'
        })
      }
      
      return NextResponse.json({
        segments: [],
        dataSource: 'none',
        message: 'No segment data available'
      })
    }

    // Get the most recent year's data
    const latestData = data[0]
    
    if (!latestData || !latestData['2023']) {
      // Try to get any available year data
      const availableYears = Object.keys(latestData).filter(key => key.match(/^\d{4}$/))
      if (availableYears.length === 0) {
        return NextResponse.json({
          segments: [],
          dataSource: 'none',
          message: 'No segment data available'
        })
      }
      
      const yearData = latestData[availableYears[availableYears.length - 1]]
      if (!yearData) {
        return NextResponse.json({
          segments: [],
          dataSource: 'none', 
          message: 'No valid segment data found'
        })
      }
    }

    // Process the segment data
    const yearData = latestData['2023'] || latestData['2022'] || latestData['2021']
    const segments = []
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16', '#f97316']

    let colorIndex = 0
    for (const [segmentName, revenue] of Object.entries(yearData)) {
      if (typeof revenue === 'number' && revenue > 0) {
        segments.push({
          name: formatSegmentName(segmentName),
          value: Math.round((revenue / 1000000) * 100) / 100, // Convert to millions and round
          itemStyle: { color: colors[colorIndex % colors.length] }
        })
        colorIndex++
      }
    }

    if (segments.length === 0) {
      return NextResponse.json({
        segments: [],
        dataSource: 'none',
        message: 'No valid segment revenue data'
      })
    }

    // Convert to percentages
    const totalRevenue = segments.reduce((sum, seg) => sum + seg.value, 0)
    const segmentPercentages = segments.map(seg => ({
      ...seg,
      value: Math.round((seg.value / totalRevenue) * 100)
    }))

    return NextResponse.json({
      segments: segmentPercentages,
      dataSource: 'live',
      totalRevenue: Math.round(totalRevenue),
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Segments API error:', error)
    const fallbackSegments = getFallbackSegments(symbol.toUpperCase())
    
    return NextResponse.json({
      segments: fallbackSegments,
      dataSource: fallbackSegments.length > 0 ? 'fallback' : 'none',
      message: fallbackSegments.length > 0 ? 'Using fallback segment data' : 'No segment data available'
    })
  }
}

function formatSegmentName(name) {
  // Clean up segment names
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces before capital letters
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letters
    .replace(/And/g, '&') // Replace 'And' with '&'
    .trim()
}

function getFallbackSegments(symbol) {
  // Fallback segment data for major companies
  const fallbackMap = {
    'GOOGL': [
      { name: 'Search & Other', value: 57, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 11, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 13, itemStyle: { color: '#f59e0b' } },
      { name: 'Network', value: 12, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets', value: 7, itemStyle: { color: '#ef4444' } }
    ],
    'MSFT': [
      { name: 'Productivity & Business', value: 43, itemStyle: { color: '#3b82f6' } },
      { name: 'Intelligent Cloud', value: 38, itemStyle: { color: '#10b981' } },
      { name: 'More Personal Computing', value: 19, itemStyle: { color: '#f59e0b' } }
    ],
    'AAPL': [
      { name: 'iPhone', value: 52, itemStyle: { color: '#3b82f6' } },
      { name: 'Services', value: 24, itemStyle: { color: '#10b981' } },
      { name: 'Mac', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'iPad', value: 7, itemStyle: { color: '#8b5cf6' } },
      { name: 'Wearables', value: 6, itemStyle: { color: '#ef4444' } }
    ],
    'AMZN': [
      { name: 'AWS', value: 70, itemStyle: { color: '#3b82f6' } },
      { name: 'North America', value: 18, itemStyle: { color: '#10b981' } },
      { name: 'International', value: 8, itemStyle: { color: '#f59e0b' } },
      { name: 'Advertising', value: 4, itemStyle: { color: '#8b5cf6' } }
    ],
    'NVDA': [
      { name: 'Data Center', value: 87, itemStyle: { color: '#3b82f6' } },
      { name: 'Gaming', value: 10, itemStyle: { color: '#10b981' } },
      { name: 'Professional Visualization', value: 2, itemStyle: { color: '#f59e0b' } },
      { name: 'Automotive', value: 1, itemStyle: { color: '#8b5cf6' } }
    ],
    'CRM': [
      { name: 'Sales Cloud', value: 24, itemStyle: { color: '#3b82f6' } },
      { name: 'Service Cloud', value: 28, itemStyle: { color: '#10b981' } },
      { name: 'Marketing & Commerce', value: 18, itemStyle: { color: '#f59e0b' } },
      { name: 'Platform & Other', value: 30, itemStyle: { color: '#8b5cf6' } }
    ]
  }

  return fallbackMap[symbol] || []
}
