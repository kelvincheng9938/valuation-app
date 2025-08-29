'use client'

export function initCharts(stockData) {
  if (typeof window === 'undefined') return
  
  // Dynamically import echarts only on client side
  import('echarts').then((echarts) => {
    const ECharts = echarts.default
    
    // Value Score Sparkline
    const sparkEl = document.getElementById('band-spark')
    if (sparkEl && sparkEl.clientWidth > 0) {
      const spark = ECharts.init(sparkEl)
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
    if (radarEl && radarEl.clientWidth > 0) {
      const radar = ECharts.init(radarEl)
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

    // Valuation Chart
    const valuationEl = document.getElementById('valuationChart')
    if (valuationEl && valuationEl.clientWidth > 0) {
      const valuation = ECharts.init(valuationEl)
      const eps = stockData?.eps || { years: ['2025', '2026', '2027'], values: [7.5, 8.4, 9.3] }
      const bands = stockData?.peBands || { low: 22, mid: 25, high: 30 }
      const currentPrice = stockData?.price || 207.14
      
      valuation.setOption({
        tooltip: { trigger: 'axis' },
        legend: {
          data: [`Low (${bands.low}x)`, `Mid (${bands.mid}x)`, `High (${bands.high}x)`, 'Current'],
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
            name: 'Current',
            type: 'line',
            data: eps.years.map(() => currentPrice),
            lineStyle: { width: 2, color: '#ff4d4f' },
            symbol: 'none'
          }
        ]
      })
    }
  }).catch(err => console.log('ECharts load error:', err))
}
