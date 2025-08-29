'use client'

export function initCharts(stockData) {
  if (typeof window === 'undefined') return
  
  const echarts = require('echarts')
  
  // Value Score Sparkline
  const sparkEl = document.getElementById('band-spark')
  if (sparkEl) {
    const spark = echarts.init(sparkEl)
    spark.setOption({
      grid: { left: 0, right: 0, top: 5, bottom: 0 },
      xAxis: { type: 'category', show: false },
      yAxis: { type: 'value', show: false },
      series: [{
        type: 'line',
        smooth: true,
        data: [22, 25, 30],
        areaStyle: { color: 'rgba(6,182,212,0.3)' },
        lineStyle: { color: '#06b6d4', width: 2 },
        showSymbol: false
      }]
    })
  }

  // Quality Radar
  const radarEl = document.getElementById('qualityRadar')
  if (radarEl) {
    const radar = echarts.init(radarEl)
    const scores = stockData?.scores || { value: 8.2, growth: 7.6, profit: 9.0, momentum: 6.9 }
    radar.setOption({
      radar: {
        indicator: [
          { name: 'Value', max: 10 },
          { name: 'Growth', max: 10 },
          { name: 'Profit', max: 10 },
          { name: 'Momentum', max: 10 }
        ],
        radius: '65%',
        axisName: { color: '#9fb0c3' }
      },
      series: [{
        type: 'radar',
        data: [{
          value: [scores.value, scores.growth, scores.profit, scores.momentum],
          areaStyle: { opacity: .25, color: '#06b6d4' }
        }]
      }]
    })
  }

  // Valuation Chart - Core Feature with Forward EPS
  const valuationEl = document.getElementById('valuationChart')
  if (valuationEl) {
    const valuation = echarts.init(valuationEl)
    const eps = stockData?.eps || { years: ['2025', '2026', '2027'], values: [7.5, 8.4, 9.3] }
    const bands = stockData?.peBands || { low: 22, mid: 25, high: 30 }
    const currentPrice = stockData?.price || 207.14
    
    valuation.setOption({
      tooltip: { trigger: 'axis' },
      legend: {
        data: [`Low (${bands.low}x)`, `Mid (${bands.mid}x)`, `High (${bands.high}x)`, 'Current Price'],
        textStyle: { color: '#9fb0c3' }
      },
      grid: { left: 40, right: 20, top: 30, bottom: 40 },
      xAxis: {
        type: 'category',
        data: eps.years,
        axisLine: { lineStyle: { color: '#6b7c91' } }
      },
      yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#6b7c91' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } }
      },
      series: [
        {
          name: `Low (${bands.low}x)`,
          type: 'bar',
          data: eps.values.map(v => (v * bands.low).toFixed(1)),
          itemStyle: { color: '#3b82f6' }
        },
        {
          name: `Mid (${bands.mid}x)`,
          type: 'bar',
          data: eps.values.map(v => (v * bands.mid).toFixed(1)),
          itemStyle: { color: '#10b981' }
        },
        {
          name: `High (${bands.high}x)`,
          type: 'bar',
          data: eps.values.map(v => (v * bands.high).toFixed(1)),
          itemStyle: { color: '#f59e0b' }
        },
        {
          name: 'Current Price',
          type: 'line',
          data: eps.years.map(() => currentPrice),
          lineStyle: { width: 2, color: '#ff4d4f' },
          symbol: 'none',
          z: 5
        }
      ]
    })
  }

  // Peers Chart
  const peersEl = document.getElementById('peersChart')
  if (peersEl) {
    const peers = echarts.init(peersEl)
    const peersData = stockData?.peers || [
      [2250, 24.8, 22, 'GOOGL'],
      [3500, 35.0, 26, 'MSFT'],
      [2000, 45.0, 20, 'AMZN'],
      [1250, 28.0, 18, 'META']
    ]
    
    let labelsOn = true
    peers.setOption({
      tooltip: {
        formatter: (p) => {
          const [cap, pe, , name] = p.data
          return `${name}<br/>Cap: $${(cap/1000).toFixed(1)}T<br/>Fwd P/E: ${pe}`
        }
      },
      grid: { left: 52, right: 52, top: 10, bottom: 40 },
      xAxis: {
        type: 'value',
        name: 'Market Cap ($B)',
        nameLocation: 'middle',
        nameGap: 25,
        axisLine: { lineStyle: { color: '#6b7c91' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } }
      },
      yAxis: {
        type: 'value',
        name: 'Forward P/E',
        nameLocation: 'middle',
        nameGap: 32,
        axisLine: { lineStyle: { color: '#6b7c91' } },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } }
      },
      series: [{
        type: 'scatter',
        symbolSize: (d) => Math.max(8, Math.sqrt(d[2] || 16) * 2),
        data: peersData,
        label: {
          show: labelsOn,
          formatter: (p) => p.data[3],
          color: '#e6eef6',
          fontSize: 11
        },
        itemStyle: { opacity: .9, color: '#06b6d4' }
      }]
    })
    
    const toggleBtn = document.getElementById('toggleLabelsBtn')
    if (toggleBtn) {
      toggleBtn.onclick = () => {
        labelsOn = !labelsOn
        toggleBtn.textContent = `Labels: ${labelsOn ? 'ON' : 'OFF'}`
        peers.setOption({ series: [{ label: { show: labelsOn } }] })
      }
    }
  }

  // Segment Pie
  const segmentEl = document.getElementById('segmentPie')
  if (segmentEl) {
    const segment = echarts.init(segmentEl)
    const segmentData = stockData?.segments || [
      { name: 'Search & Other', value: 56, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads', value: 12, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud', value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'Network', value: 15, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets', value: 6, itemStyle: { color: '#ef4444' } }
    ]
    
    segment.setOption({
      legend: { top: 0, textStyle: { color: '#e6eef6' } },
      tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
      series: [{
        type: 'pie',
        radius: ['45%', '75%'],
        center: ['50%', '58%'],
        label: {
          color: '#e6eef6',
          fontSize: 12,
          formatter: '{b}\n{d}%'
        },
        data: segmentData
      }]
    })
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    [sparkEl, radarEl, valuationEl, peersEl, segmentEl].forEach(el => {
      if (el && el._echarts_instance_) {
        el._echarts_instance_.resize()
      }
    })
  })
}
