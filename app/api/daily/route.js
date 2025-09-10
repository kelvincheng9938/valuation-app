// app/api/daily/route.js - Optional server route to bypass CORS issues
import { NextResponse } from 'next/server'

export async function GET(request) {
  try {
    const csvUrl = process.env.NEXT_PUBLIC_DAILY_CSV_URL
    
    if (!csvUrl || csvUrl === '<PASTE_MY_GOOGLE_SHEET_CSV_URL_HERE>') {
      return NextResponse.json(
        { error: 'Daily CSV URL not configured' }, 
        { status: 400 }
      )
    }

    console.log('🔄 Fetching CSV via server route from:', csvUrl)

    const response = await fetch(csvUrl, {
      headers: {
        'Accept': 'text/csv,text/plain,*/*',
        'User-Agent': 'Mozilla/5.0 (compatible; StockAnalyzer/1.0)'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`CSV fetch failed: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    
    console.log('✅ CSV fetched successfully via server, length:', csvText.length)

    return new NextResponse(csvText, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })

  } catch (error) {
    console.error('❌ Server CSV fetch error:', error)
    
    return NextResponse.json(
      { error: `Failed to fetch CSV: ${error.message}` }, 
      { status: 500 }
    )
  }
}
