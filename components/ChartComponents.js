'use client';

let echartsLib = null;

export async function initCharts(stockData) {
  if (typeof window === 'undefined') return;

  try {
    // Load echarts
    if (!echartsLib) {
      const echartsModule = await import('echarts');
      echartsLib = echartsModule.default || echartsModule;
    }
    const echarts = echartsLib;

    const instances = [];
    const byId = (id) => document.getElementById(id);

    // Helper to safely create chart - ALWAYS dispose old ones first
    const safeCreateChart = (elementId, options) => {
      const element = byId(elementId);
      if (!element) return null;
      
      try {
        // ALWAYS dispose existing chart first
        const existingChart = echarts.getInstanceByDom(element);
        if (existingChart) {
          existingChart.dispose();
        }
        
        // Clear the element
        element.innerHTML = '';
        
        const instance = echarts.init(element);
        instance.setOption(options);
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

    // Sparkline
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

    // Quality Radar
    const s = stockData?.scores || { value: 8.2, growth: 7.6, profit: 9.0, momentum: 6.9 };
    safeCreateChart('qualityRadar', {
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
          value: [s.value, s.growth, s.profit, s.momentum], 
          areaStyle: { opacity: .25, color: '#06b6d4' } 
        }]
      }]
    });

   // Valuation Chart - Check if EPS data is available
const eps = stockData?.eps;
const bands = stockData?.peBands;
const current = Number(stockData?.price);

// Only create chart if we have EPS data
if (eps && eps.years && eps.years.length > 0 && eps.values && eps.values.length > 0) {
  const currentLine = eps.years.map(() => current);

  safeCreateChart('valuationChart', {
    tooltip: { trigger: 'axis' },
    legend: {
      data: [`Low (25th)`, `Mid (50th)`, `High (75th)`, 'Current Price'],
      textStyle: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 }
    },
    grid: { left: 45, right: 20, top: 30, bottom: 30 },
    xAxis: { 
      type: 'category', 
      data: eps.years, 
      axisLabel: { color: '#cfe3ff' }
    },
    yAxis: { 
      type: 'value', 
      axisLabel: { formatter: v => '$' + v, color: '#cfe3ff' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,.08)' } }
    },
    series: [
      {
        name: 'Low (25th)',
        type: 'bar',
        data: eps.values.map(v => +(v * bands.low).toFixed(2)),
        barGap: 0,
        itemStyle: { color: '#3b82f6' }
      },
      {
        name: 'Mid (50th)',
        type: 'bar', 
        data: eps.values.map(v => +(v * bands.mid).toFixed(2)),
        itemStyle: { color: '#10b981' }
      },
      {
        name: 'High (75th)',
        type: 'bar',
        data: eps.values.map(v => +(v * bands.high).toFixed(2)), 
        itemStyle: { color: '#f59e0b' }
      },
      { 
        name: 'Current Price', 
        type: 'line', 
        data: currentLine, 
        symbol: 'none', 
        z: 5, 
        lineStyle: { width: 2, color: '#ff6b6b' } 
      }
    ]
  });
}
  // Peers Chart - Check if peers data is available
const peers = stockData?.peers;
let peersChart = null;

if (peers && peers.length > 0) {
  let labelsOn = true;

  peersChart = safeCreateChart('peersChart', {
    tooltip: {
      formatter: p => {
        const [cap, pe,, name] = p.data;
        return `${name}<br/>Cap: $${(cap/1000).toFixed(1)}T<br/>Fwd P/E: ${pe}`;
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
      symbolSize: d => Math.max(8, Math.sqrt(d[2] || 16) * 2),
      data: peers,
      label: {
        show: labelsOn,
        formatter: p => p.data[3],
        color: '#e6eef6',
        fontSize: 11
      },
      itemStyle: { opacity: .9, color: '#06b6d4' }
    }]
  });

  // Toggle button for peers
  const btn = document.getElementById('toggleLabelsBtn');
  if (btn && peersChart) {
    btn.onclick = () => {
      labelsOn = !labelsOn;
      btn.textContent = `Labels: ${labelsOn ? 'ON' : 'OFF'}`;
      peersChart.setOption({ series: [{ label: { show: labelsOn } }] });
    };
  }
}

    // Toggle button for peers
    const btn = document.getElementById('toggleLabelsBtn');
    if (btn && peersChart) {
      btn.onclick = () => {
        labelsOn = !labelsOn;
        btn.textContent = `Labels: ${labelsOn ? 'ON' : 'OFF'}`;
        peersChart.setOption({ series: [{ label: { show: labelsOn } }] });
      };
    }

  // Segment Pie - Check if segments data is available
const segments = stockData?.segments;

if (segments && segments.length > 0) {
  safeCreateChart('segmentPie', {
    legend: { top: 0, textStyle: { color: '#e6eef6' } },
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    series: [{
      type: 'pie',
      radius: ['45%','75%'],
      center: ['50%','58%'],
      label: { color: '#e6eef6', fontSize: 12, formatter: '{b}\n{d}%' },
      data: segments
    }]
  });
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
