import { NextResponse } from 'next/server'

export async function GET(request) {
  const FMP_API_KEY = process.env.FMP_API_KEY
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY
  
  const results = {}
  
  // Test FMP endpoints for GOOGL
  const fmpTests = [
    {
      name: 'FMP Analyst Estimates',
      url: `https://financialmodelingprep.com/api/v3/analyst-estimates/GOOGL?apikey=${FMP_API_KEY}`
    },
    {
      name: 'FMP Key Metrics', 
      url: `https://financialmodelingprep.com/api/v3/key-metrics/GOOGL?limit=5&apikey=${FMP_API_KEY}`
    },
    {
      name: 'FMP Ratios',
      url: `https://financialmodelingprep.com/api/v3/ratios/GOOGL?limit=5&apikey=${FMP_API_KEY}`
    },
    {
      name: 'FMP Profile',
      url: `https://financialmodelingprep.com/api/v3/profile/GOOGL?apikey=${FMP_API_KEY}`
    }
  ]
  
  for (const test of fmpTests) {
    try {
      const response = await fetch(test.url)
      const data = await response.json()
      
      results[test.name] = {
        status: response.status,
        success: response.ok,
        dataLength: Array.isArray(data) ? data.length : 'Not array',
        sample: Array.isArray(data) ? data[0] : data,
        error: data.error || null
      }
    } catch (error) {
      results[test.name] = {
        status: 'ERROR',
        success: false,
        error: error.message
      }
    }
  }
  
  // Test Finnhub
  try {
    const finnhubResponse = await fetch(`https://finnhub.io/api/v1/quote?symbol=GOOGL&token=${FINNHUB_API_KEY}`)
    const finnhubData = await finnhubResponse.json()
    
    results['Finnhub Quote'] = {
      status: finnhubResponse.status,
      success: finnhubResponse.ok,
      data: finnhubData
    }
  } catch (error) {
    results['Finnhub Quote'] = {
      status: 'ERROR',
      success: false,
      error: error.message
    }
  }
  
  return NextResponse.json({
    message: 'API Debug Results',
    apiKeys: {
      fmp: FMP_API_KEY ? `${FMP_API_KEY.substring(0, 8)}...` : 'MISSING',
      finnhub: FINNHUB_API_KEY ? `${FINNHUB_API_KEY.substring(0, 8)}...` : 'MISSING'
    },
    results
  })
}
