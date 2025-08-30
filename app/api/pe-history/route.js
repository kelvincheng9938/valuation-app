function getFallbackPEBands(symbol) {
  const fallbackMap = {
    'GOOGL': { low: 20.5, mid: 22.5, high: 25.2 },
    'MSFT': { low: 28.0, mid: 32.0, high: 36.0 },
    'AAPL': { low: 24.0, mid: 28.0, high: 32.0 },
    'AMZN': { low: 35.0, mid: 42.0, high: 50.0 },
    'NVDA': { low: 45.0, mid: 60.0, high: 80.0 },
    'AMD': { low: 18.0, mid: 23.0, high: 32.0 }, // Add AMD
    'CRM': { low: 25.0, mid: 30.0, high: 35.0 },
    'TSLA': { low: 40.0, mid: 60.0, high: 90.0 },
    'META': { low: 18.0, mid: 22.0, high: 26.0 }
  }

  return fallbackMap[symbol] || { low: 18.0, mid: 22.0, high: 28.0 }
}
