// components/ReportContent.js - FIXED: Remove HK stock duplication
// Replace the loadAvailableTickers function around line 70

const loadAvailableTickers = async () => {
  try {
    setTickersLoading(true)
    console.log('🔄 Loading available tickers with HK stocks at bottom only...')
    
    const tickers = await getAvailableTickers()
    
    // 🔥 FIXED: Ensure HK stocks appear only once at the bottom
    const sortedTickers = tickers.sort((a, b) => {
      const aIsHK = ['700', '3690', '1810', '9988'].includes(a)
      const bIsHK = ['700', '3690', '1810', '9988'].includes(b)
      
      // If both are HK stocks, sort them in specific order
      if (aIsHK && bIsHK) {
        const hkOrder = ['700', '9988', '3690', '1810']
        return hkOrder.indexOf(a) - hkOrder.indexOf(b)
      }
      
      // If both are US stocks, sort alphabetically
      if (!aIsHK && !bIsHK) {
        return a.localeCompare(b)
      }
      
      // 🔥 CRITICAL: US stocks (-1) come FIRST, HK stocks (+1) go to BOTTOM
      return aIsHK ? 1 : -1
    })
    
    // 🔥 ENSURE NO DUPLICATES: Remove any duplicate tickers
    const uniqueTickers = [...new Set(sortedTickers)]
    
    setAvailableTickers(uniqueTickers)
    setFilteredTickers(uniqueTickers)
    
    console.log(`✅ Loaded ${uniqueTickers.length} unique tickers (no duplicates)`)
    console.log('🎯 US stocks (first 10):', uniqueTickers.filter(t => !['700', '3690', '1810', '9988'].includes(t)).slice(0, 10))
    console.log('🌏 HK stocks (at bottom):', uniqueTickers.filter(t => ['700', '3690', '1810', '9988'].includes(t)))
    
    // 🔥 VERIFY NO DUPLICATES
    const hkCount = uniqueTickers.filter(t => ['700', '3690', '1810', '9988'].includes(t)).length
    const totalUniqueCount = new Set(uniqueTickers).size
    console.log(`🔍 Verification: ${hkCount} HK stocks, ${totalUniqueCount} total unique tickers`)
    
  } catch (error) {
    console.error('❌ Error loading available tickers:', error)
    setAvailableTickers([])
    setFilteredTickers([])
  } finally {
    setTickersLoading(false)
  }
}
