// components/ChartComponents.js - Updated with better error handling
'use client';

let echartsLib = null;

export async function initCharts(stockData) {
  if (typeof window === 'undefined') return;

  try {
    console.log('Initializing charts with stockData:', stockData);
    
    // Load echarts
    if (!echartsLib) {
      const echartsModule = await import('echarts');
      echartsLib = echartsModule.default || echartsModule;
    }
    const echarts = echartsLib;

    const instances = [];
    const byId = (id) => document.getElementById(id);

    // Helper to safely create chart
    const safeCreateChart = (elementId, options) => {
      const element = byId(elementId);
      if (!element) {
        console.warn(`Element ${elementId} not found`);
        return null;
      }
      
      try {
        // Dispose existing chart first
        const existingChart = echarts.getInstanceByDom(element);
        if (existingChart) {
          existingChart.dispose();
        }
        
        element.innerHTML = '';
        const instance = echarts.init(element);
        instance.setOption(options, { notMerge: true });
        instances.push(instance);
        return instance;
      } catch (error) {
        console.error(`Error creating chart ${elementId}:`, error);
        if (element) {
          element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9fb0c3;font-size:14px;">Chart error</div>';
        }
        return null;
      }
    };

    // 1. Band Sparkline (simple trend line)
    safeCreateChart('band-spark', {
      grid: { left: 0, right: 0, top: 5, bottom: 0 },
      xAxis: { type: 'category', show: false, data: [0,1,2] },
      yAxis: { type: 'value', show: false },
      series: [{
        type: 'line',
        smooth: true,
        data: [22, 25, 30],
        areaStyle: { color: 'rgba(6,182,212,0.3)' },
        lineStyle: { color: '#06b6d4', width: 2 },
        showSymbol: false
      }]
    });

    // 2. Quality Radar Chart
    if (stockData?.scores) {
      const s = stockData.scores;
      console.log('Creating quality radar with scores:', s);
      
      safeCreateChart('qualityRadar', {
        radar: {
          indicator: [
            { name: 'Value', max: 10 },
            { name: 'Growth', max: 10 },
            { name: 'Profit', max: 10 },
            { name: 'Momentum', max: 10 }
          ],
          radius: '65%',
          axisName: { color: '#9fb0c3', fontSize: 11 },
          splitArea: { areaStyle: { color: ['rgba(255,255,255,.05)', 'rgba(255,255,255,.02)'] } }
        },
        series: [{
          type: 'radar',
          data: [{ 
            value: [s.value || 5, s.growth || 5, s.profit || 5, s.momentum || 5], 
            areaStyle: { opacity: .25, color: '#06b6d4' },
            lineStyle: { color: '#06b6d4', width: 2 },
            symbol: 'circle',
            symbolSize: 4
          }]
        }]
      });
    } else {
      console.warn('No scores data available for radar chart');
    }

    // 3. Valuation Chart
    const eps = stockData?.eps;
    const bands = stockData?.peBands;
    const current = Number(stockData?.price || 0);

    if (eps && eps.years && eps.values && bands && current > 0) {
      console.log('Creating valuation chart with:', { eps, bands, current });
      
      const currentLine = eps.years.map(() => current);

      safeCreateChart('valuationChart', {
        tooltip: { 
          trigger: 'axis',
          formatter: function(params) {
            let result = params[0].axisValue + '<br/>';
            params.forEach(p => {
              if (p.seriesName === 'Current Price') {
                result += `${p.marker} ${p.seriesName}: $${p.value}<br/>`;
              } else {
                result += `${p.marker} ${p.seriesName}: $${p.value}<br/>`;
              }
            });
            return result;
          }
        },
        legend: {
          data: ['Low (25th)', 'Mid (50th)', 'High (75th)', 'Current Price'],
          textStyle: { color: '#ffffff', fontWeight: 'bold', fontSize: 12 }
        },
        grid: { left: 45, right: 20, top: 35, bottom: 30 },
        xAxis: { 
          type: 'category', 
          data: eps.years, 
          axisLabel: { color: '#cfe3ff' }
        },
        yAxis: { 
          type: 'value', 
          axisLabel: { formatter: v => '$' + v.toFixed(0), color: '#cfe3ff' },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } }
        },
        series: [
          {
            name: 'Low (25th)',
            type: 'bar',
            data: eps.values.map(v => +(v * bands.low).toFixed(2)),
            barGap: 0,
            barWidth: '22%',
            itemStyle: { color: '#3b82f6' }
          },
          {
            name: 'Mid (50th)', 
            type: 'bar',
            data: eps.values.map(v => +(v * bands.mid).toFixed(2)),
            barWidth: '22%',
            itemStyle: { color: '#10b981' }
          },
          {
            name: 'High (75th)',
            type: 'bar',
            data: eps.values.map(v => +(v * bands.high).toFixed(2)),
            barWidth: '22%',
            itemStyle: { color: '#f59e0b' }
          },
          { 
            name: 'Current Price', 
            type: 'line', 
            data: currentLine, 
            symbol: 'circle',
            symbolSize: 6,
            z: 5, 
            lineStyle: { width: 3, color: '#ff6b6b' },
            itemStyle: { color: '#ff6b6b' }
          }
        ]
      });
    } else {
      console.warn('Insufficient data for valuation chart:', { eps, bands, current });
    }

    // 4. Peers Chart
    const peers = stockData?.peers;
    let peersChart = null;
    
    if (peers && peers.length > 0) {
      console.log('Creating peers chart with:', peers);
      
      let labelsOn = true;

      peersChart = safeCreateChart('peersChart', {
        tooltip: {
          formatter: p => {
            const [cap, pe, , name] = p.data;
            return `${name}<br/>Market Cap: $${cap}B<br/>Forward P/E: ${pe}x`;
          }
        },
        grid: { left: 52, right: 52, top: 20, bottom: 40 },
        xAxis: {
          type: 'value',
          name: 'Market Cap ($B)',
          nameLocation: 'middle',
          nameGap: 25,
          nameTextStyle: { color: '#9fb0c3' },
          axisLine: { lineStyle: { color: '#6b7c91' } },
          axisLabel: { color: '#cfe3ff' },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } }
        },
        yAxis: {
          type: 'value',
          name: 'Forward P/E',
          nameLocation: 'middle',
          nameGap: 35,
          nameTextStyle: { color: '#9fb0c3' },
          axisLine: { lineStyle: { color: '#6b7c91' } },
          axisLabel: { color: '#cfe3ff' },
          splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } }
        },
        series: [{
          type: 'scatter',
          symbolSize: d => Math.max(12, Math.min(35, Math.sqrt(d[2] || 16) * 2.5)),
          data: peers,
          label: {
            show: labelsOn,
            formatter: p => p.data[3],
            color: '#e6eef6',
            fontSize: 11,
            fontWeight: 'bold'
          },
          itemStyle: { 
            opacity: .9, 
            color: '#06b6d4',
            borderColor: '#ffffff',
            borderWidth: 1
          }
        }]
      });

      // Toggle button for peers
      const btn = byId('toggleLabelsBtn');
      if (btn && peersChart) {
        btn.onclick = () => {
          labelsOn = !labelsOn;
          btn.textContent = `Labels: ${labelsOn ? 'ON' : 'OFF'}`;
          peersChart.setOption({ 
            series: [{ label: { show: labelsOn } }] 
          }, { notMerge: false });
        };
      }
    } else {
      console.warn('No peers data available');
    }

    // 5. Segment Pie Chart
    const segments = stockData?.segments;
    
    if (segments && segments.length > 0) {
      console.log('Creating segment pie chart with:', segments);
      
      safeCreateChart('segmentPie', {
        legend: { 
          top: 0, 
          textStyle: { color: '#e6eef6', fontSize: 11 },
          itemGap: 8
        },
        tooltip: { 
          trigger: 'item', 
          formatter: '{b}: {c}%<br/>({d}% of total)'
        },
        series: [{
          type: 'pie',
          radius: ['45%','75%'],
          center: ['50%','58%'],
          label: { 
            color: '#e6eef6', 
            fontSize: 11, 
            formatter: '{b}\n{d}%',
            lineHeight: 14
          },
          labelLine: {
            lineStyle: { color: '#9fb0c3' }
          },
          data: segments
        }]
      });
    } else {
      console.warn('No segments data available');
    }

    // Resize handler
    const onResize = () => {
      instances.forEach(instance => {
        if (instance && !instance.isDisposed()) {
          try {
            instance.resize();
          } catch (error) {
            console.error('Error resizing chart:', error);
          }
        }
      });
    };
    
    window.removeEventListener('resize', onResize);
    window.addEventListener('resize', onResize, { passive: true });

    console.log(`Successfully initialized ${instances.length} charts`);

  } catch (error) {
    console.error('Error initializing charts:', error);
    
    // Show error message in chart containers
    const errorElements = ['band-spark', 'qualityRadar', 'valuationChart', 'peersChart', 'segmentPie'];
    errorElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9fb0c3;font-size:14px;">Chart loading failed</div>';
      }
    });
  }
}
