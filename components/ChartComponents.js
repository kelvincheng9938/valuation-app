'use client';

let echartsLib = null;

// Get current theme colors
function getThemeColors() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  
  return {
    background: isDark ? '#151c25' : '#ffffff',
    textColor: isDark ? '#e6eef6' : '#1e293b',
    axisColor: isDark ? '#9fb0c3' : '#64748b',
    lineColor: isDark ? 'rgba(255,255,255,.08)' : '#f1f5f9',
    splitLineColor: isDark ? 'rgba(255,255,255,.08)' : '#f1f5f9',
    legendColor: isDark ? '#ffffff' : '#1e293b'
  };
}

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
    const themeColors = getThemeColors();

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
        
        // Apply theme-aware background
        const themedOptions = {
          ...options,
          backgroundColor: themeColors.background
        };
        
        instance.setOption(themedOptions);
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

    // Quality Radar
    const s = stockData?.scores || { value: 8.2, growth: 7.6, profit: 9.0, momentum: 6.9 };
    safeCreateChart('qualityRadar', {
      backgroundColor: themeColors.background,
      radar: {
        indicator: [
          { name: 'Value', max: 10 },
          { name: 'Growth', max: 10 },
          { name: 'Profit', max: 10 },
          { name: 'Momentum', max: 10 }
        ],
        radius: '65%',
        axisName: { 
          color: themeColors.axisColor,
          fontSize: 12
        },
        axisLine: {
          lineStyle: { color: themeColors.lineColor }
        },
        splitLine: {
          lineStyle: { color: themeColors.lineColor }
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(6,182,212,0.05)', 'rgba(6,182,212,0.02)']
          }
        }
      },
      series: [{
        type: 'radar',
        data: [{ 
          value: [s.value, s.growth, s.profit, s.momentum], 
          areaStyle: { opacity: .25, color: '#06b6d4' },
          lineStyle: { color: '#06b6d4' },
          itemStyle: { color: '#06b6d4' }
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
        backgroundColor: themeColors.background,
        tooltip: { 
          trigger: 'axis',
          backgroundColor: themeColors.background,
          borderColor: themeColors.lineColor,
          textStyle: { color: themeColors.textColor }
        },
        legend: {
          data: [`Low (25th)`, `Mid (50th)`, `High (75th)`, 'Current Price'],
          textStyle: { 
            color: themeColors.legendColor, 
            fontWeight: 'bold', 
            fontSize: 13 
          },
          top: 10
        },
        grid: { left: 45, right: 20, top: 40, bottom: 30 },
        xAxis: { 
          type: 'category', 
          data: eps.years, 
          axisLabel: { color: themeColors.axisColor },
          axisLine: { lineStyle: { color: themeColors.lineColor } }
        },
        yAxis: { 
          type: 'value', 
          axisLabel: { 
            formatter: v => '$' + v, 
            color: themeColors.axisColor 
          },
          splitLine: { 
            lineStyle: { color: themeColors.splitLineColor } 
          },
          axisLine: { lineStyle: { color: themeColors.lineColor } }
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
            symbol: 'circle',
            symbolSize: 6,
            z: 5, 
            lineStyle: { width: 3, color: '#ff6b6b' },
            itemStyle: { color: '#ff6b6b' }
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
        backgroundColor: themeColors.background,
        tooltip: {
          formatter: p => {
            const [cap, pe,, name] = p.data;
            return `${name}<br/>Cap: $${(cap/1000).toFixed(1)}T<br/>Fwd P/E: ${pe}`;
          },
          backgroundColor: themeColors.background,
          borderColor: themeColors.lineColor,
          textStyle: { color: themeColors.textColor }
        },
        grid: { left: 60, right: 40, top: 20, bottom: 50 },
        xAxis: {
          type: 'value',
          name: 'Market Cap ($B)',
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: { color: themeColors.axisColor },
          axisLine: { lineStyle: { color: themeColors.lineColor } },
          axisLabel: { color: themeColors.axisColor },
          splitLine: { lineStyle: { color: themeColors.splitLineColor } }
        },
        yAxis: {
          type: 'value',
          name: 'Forward P/E',
          nameLocation: 'middle',
          nameGap: 40,
          nameTextStyle: { color: themeColors.axisColor },
          axisLine: { lineStyle: { color: themeColors.lineColor } },
          axisLabel: { color: themeColors.axisColor },
          splitLine: { lineStyle: { color: themeColors.splitLineColor } }
        },
        series: [{
          type: 'scatter',
          symbolSize: d => Math.max(8, Math.sqrt(d[2] || 16) * 2),
          data: peers,
          label: {
            show: labelsOn,
            formatter: p => p.data[3],
            color: themeColors.textColor,
            fontSize: 11,
            fontWeight: 'bold'
          },
          itemStyle: { 
            opacity: .9, 
            color: '#06b6d4',
            borderColor: themeColors.background,
            borderWidth: 2
          }
        }]
      });

      // Toggle button for peers
      const btn = document.getElementById('toggleLabelsBtn');
      if (btn && peersChart) {
        btn.onclick = () => {
          labelsOn = !labelsOn;
          btn.textContent = `Labels: ${labelsOn ? 'ON' : 'OFF'}`;
          peersChart.setOption({ 
            series: [{ 
              label: { 
                show: labelsOn,
                color: themeColors.textColor
              } 
            }] 
          });
        };
      }
    }

    // Segment Pie - Check if segments data is available
    const segments = stockData?.segments;

    if (segments && segments.length > 0) {
      safeCreateChart('segmentPie', {
        backgroundColor: themeColors.background,
        legend: { 
          top: 0, 
          textStyle: { color: themeColors.textColor } 
        },
        tooltip: { 
          trigger: 'item', 
          formatter: '{b}: {c}%',
          backgroundColor: themeColors.background,
          borderColor: themeColors.lineColor,
          textStyle: { color: themeColors.textColor }
        },
        series: [{
          type: 'pie',
          radius: ['45%','75%'],
          center: ['50%','58%'],
          label: { 
            color: themeColors.textColor, 
            fontSize: 12, 
            formatter: '{b}\n{d}%' 
          },
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

    // Return instances for external theme updates
    return instances;

  } catch (error) {
    console.error('Error initializing charts:', error);
    
    // Show error message in chart containers
    const errorElements = ['qualityRadar', 'valuationChart', 'peersChart', 'segmentPie'];
    errorElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#9fb0c3;font-size:14px;">Chart loading failed</div>';
      }
    });
  }
}

// Function to update chart themes when theme changes
export function updateChartsTheme() {
  if (typeof window === 'undefined' || !echartsLib) return;
  
  const echarts = echartsLib;
  const chartElements = ['qualityRadar', 'valuationChart', 'peersChart', 'segmentPie'];
  
  chartElements.forEach(elementId => {
    const element = document.getElementById(elementId);
    if (element) {
      const chart = echarts.getInstanceByDom(element);
      if (chart && !chart.isDisposed()) {
        const themeColors = getThemeColors();
        
        // Update chart background and colors
        chart.setOption({
          backgroundColor: themeColors.background
        }, { notMerge: false });
      }
    }
  });
}
