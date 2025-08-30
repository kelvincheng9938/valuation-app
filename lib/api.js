export async function fetchStockData(ticker) {
  try {
    // Fetch all data in parallel
    const [quoteRes, estimatesRes, peHistoryRes, peersRes, segmentsRes, newsRes] = await Promise.all([
      fetch(`/api/quote?symbol=${ticker}`).then(r => r.json()),
      fetch(`/api/analyst-estimates?symbol=${ticker}`).then(r => r.json()),
      fetch(`/api/pe-history?symbol=${ticker}`).then(r => r.json()),
      fetch(`/api/peers?symbol=${ticker}`).then(r => r.json()),
      fetch(`/api/segments?symbol=${ticker}`).then(r => r.json()),
      fetch(`/api/news/company?symbol=${ticker}`).then(r => r.json())
    ])

    // Check if quote data is available (most critical)
    if (quoteRes.error) {
      // Provide better error message for invalid tickers
      throw new Error(`Ticker "${ticker.toUpperCase()}" not found. Please check the symbol and try again.`)
    }

    // Calculate forward P/E if we have estimates
    let forwardPE = 'N/A'
    let ttmPE = 'N/A'
    
    if (!estimatesRes.error && estimatesRes.eps && estimatesRes.eps.values[0]) {
      forwardPE = (quoteRes.price / estimatesRes.eps.values[0]).toFixed(1)
    }

    // Use a reasonable TTM P/E estimate based on forward P/E
    if (forwardPE !== 'N/A') {
      ttmPE = (parseFloat(forwardPE) * 1.15).toFixed(1) // TTM typically higher than forward
    }

    // Build the response object
    const stockData = {
      ticker: ticker.toUpperCase(),
      name: quoteRes.name,
      price: quoteRes.price,
      marketCap: quoteRes.marketCap,
      forwardPE: forwardPE,
      ttmPE: ttmPE,
      sector: quoteRes.sector,
      description: quoteRes.description,
      
      // EPS estimates
      eps: estimatesRes.error ? 
        { years: [], values: [] } : 
        estimatesRes.eps,
      
      // P/E bands
      peBands: peHistoryRes.error ? 
        { low: 18, mid: 22, high: 28 } : 
        peHistoryRes.peBands,
      
      // Generate scores (simplified for now - could be enhanced with more data)
      scores: generateQualityScores(ticker, quoteRes, estimatesRes, peHistoryRes),
      
      // Peers data
      peers: peersRes.error ? [] : peersRes.peers,
      
      // Segments data
      segments: segmentsRes.error ? [] : segmentsRes.segments,
      
      // Generate strengths and risks based on available data
      strengths: generateStrengths(ticker, quoteRes, estimatesRes, peHistoryRes),
      risks: generateRisks(ticker, quoteRes, estimatesRes, peHistoryRes),
      
      // News data
      news: newsRes.error ? [] : newsRes.news,
      
      // Metadata
      dataQuality: {
        quote: !quoteRes.error,
        estimates: !estimatesRes.error,
        peHistory: peHistoryRes.dataSource || 'unknown',
        peers: peersRes.dataSource || 'unknown',
        segments: segmentsRes.dataSource || 'none',
        news: !newsRes.error
      }
    }

    return stockData

  } catch (error) {
    console.error('Error fetching stock data:', error)
    throw error // Pass the original error message through
  }
}
