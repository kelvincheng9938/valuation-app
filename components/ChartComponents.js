// components/ChartComponents.js - Professional Charts with Clear Visibility
'use client';

let echartsLib = null;

export async function initCharts(stockData) {
  if (typeof window === 'undefined') return;

  try {
    console.log('Initializing professional charts...');
    
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
        const instance = echarts.init(element, 'dark'); // Use dark theme
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

    // 1. Band Sparkline (Value trend indicator)
    safeCreateChart('band-spark', {
      grid: { left: 0, right: 0, top: 5, bottom: 0 },
      xAxis: { type: 'category', show: false, data: [0,1,2,3,4] },
      yAxis: { type: 'value', show: false },
      series: [{
        type: 'line',
        smooth: true,
        data: [6.5, 7.2, 7.9, 7.8, 7.9],
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(251, 146, 60, 0.4)' },
              { offset: 1, color: 'rgba(251, 146, 60, 0.1)' }
            ]
          }
        },
        lineStyle: { color: '#fb923c', width: 3 },
        showSymbol: false
      }]
    });

    // 2. Quality Radar Chart
    if (stockData?.scores) {
      const s = stockData.scores;
      console.log('Creating quality radar with scores:', s);
      
      safeCreateChart('qualityRadar', {
        backgroundColor: 'transparent',
        radar: {
          indicator: [
            { name: 'Value', max: 10, color: '#ffffff' },
            { name: 'Growth', max: 10, color: '#ffffff' },
            { name: 'Profit', max: 10, color: '#ffffff' },
            { name: 'Momentum', max: 10, color: '#ffffff' }
          ],
          radius: '70%',
          center: ['50%', '50%'],
          axisName: { 
            color: '#ffffff', 
            fontSize: 12,
            fontWeight: 'bold'
          },
          splitArea: { 
            areaStyle: { 
              color: ['rgba(107, 114, 128, 0.1)', 'rgba(107, 114, 128, 0.05)'] 
            } 
          },
          axisLine: { lineStyle: { color: 'rgba(107, 114, 128, 0.3)' } },
          splitLine: { lineStyle: { color: 'rgba(107, 114, 128, 0.3)' } }
        },
        series: [{
          type: 'radar',
          data: [{ 
            value: [s.value || 5, s.growth || 5, s.profit || 5, s.momentum || 5], 
            areaStyle: { 
              opacity: 0.3, 
              color: {
                type: 'radial',
                x: 0.5, y: 0.5, r: 0.5,
                colorStops: [
                  { offset: 0, color: 'rgba(6, 182, 212, 0.8)' },
                  { offset: 1, color: 'rgba(6, 182, 212, 0.2)' }
                ]
              }
            },
            lineStyle: { color: '#06b6d4', width: 3 },
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: { color: '#06b6d4' }
          }]
        }]
      });
    }

    // 3. Valuation Chart - Professional Style
    const eps = stockData?.eps;
    const bands = stockData?.peBands;
    const current = Number(stockData?.price || 0);

    if (eps && eps.years && eps.values && bands && current > 0) {
      console.log('Creating professional valuation chart...');
      
      const currentLine = eps.years.map(() => current);

      safeCreateChart('valuationChart', {
        backgroundColor: 'transparent',
        tooltip: { 
          trigger: 'axis',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          borderColor: '#374151',
          textStyle: { color: '#ffffff' },
          formatter: function(params) {
            let result = `<div style="font-weight: bold; margin-bottom: 8px;">${params[0].axisValue}</div>`;
            params.forEach(p => {
              const color = p.color;
              if (p.seriesName === 'Current Price') {
                result += `<div style="display: flex; align-items: center; margin-bottom: 4px;">
                  <span style="display: inline-block; width: 10px; height: 10px; background-color: ${color}; border-radius: 50%; margin-right: 8px;"></span>
                  <span>${p.seriesName}: <strong>$${p.value}</strong></span>
                </div>`;
              } else {
                result += `<div style="display: flex; align-items: center; margin-bottom: 4px;">
                  <span style="display: inline-block; width: 10px; height: 10px; background-color: ${color}; margin-right: 8px;"></span>
                  <span>${p.seriesName}: <strong>$${p.value}</strong></span>
                </div>`;
              }
            });
            return result;
          }
        },
        legend: {
          data: ['Low (25th)', 'Mid (50th)', 'High (75th)', 'Current Price'],
          textStyle: { color: '#ffffff', fontWeight: 'bold', fontSize: 13 },
          top: 10
        },
        grid: { left: 60, right: 30, top: 50, bottom: 40 },
        xAxis: { 
          type: 'category', 
          data: eps.years,
          axisLabel: { 
            color: '#ffffff', 
            fontSize: 14,
            fontWeight: 'bold'
          },
          axisLine: { lineStyle: { color: '#374151' } },
          axisTick: { lineStyle: { color: '#374151' } }
        },
        yAxis: { 
          type: 'value', 
          axisLabel: { 
            formatter: v => '$' + Math.round(v), 
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold'
          },
          splitLine: { lineStyle: { color: 'rgba(107, 114, 128, 0.2)' } },
          axisLine: { lineStyle: { color: '#374151' } }
        },
        series: [
          {
            name: 'Low (25th)',
            type: 'bar',
            data: eps.values.map(v => Math.round(v * bands.low)),
            barGap: 0,
            barWidth: '20%',
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#60a5fa' },
                  { offset: 1, color: '#3b82f6' }
                ]
              }
            }
          },
          {
            name: 'Mid (50th)', 
            type: 'bar',
            data: eps.values.map(v => Math.round(v * bands.mid)),
            barWidth: '20%',
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#4ade80' },
                  { offset: 1, color: '#10b981' }
                ]
              }
            }
          },
          {
            name: 'High (75th)',
            type: 'bar',
            data: eps.values.map(v => Math.round(v * bands.high)),
            barWidth: '20%',
            itemStyle: { 
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: '#fbbf24' },
                  { offset: 1, color: '#f59e0b' }
                ]
              }
            }
          },
          { 
            name: 'Current Price', 
            type: 'line', 
            data: currentLine, 
            symbol: 'circle',
            symbolSize: 8,
            z: 10, 
            lineStyle: { width: 4, color: '#ef4444' },
            itemStyle: { 
              color: '#ef4444',
              borderColor: '#ffffff',
              borderWidth: 2
            }
          }
        ]
      });
    }

    // 4. Peers Chart - Professional Scatter
    const peers = stockData?.peers;
    let peersChart = null;
    
    if (peers && peers.length > 0) {
      console.log('Creating professional peers chart...');
      
      let labelsOn = true;

      peersChart = safeCreateChart('peersChart', {
        backgroundColor: 'transparent',
        tooltip: {
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          borderColor: '#374151',
          textStyle: { color: '#ffffff' },
          formatter: p => {
            const [cap, pe, , name] = p.data;
            return `<div style="font-weight: bold; margin-bottom: 8px;">${name}</div>
                    <div>Market Cap: <strong>$${cap}B</strong></div>
                    <div>Forward P/E: <strong>${pe}x</strong></div>`;
          }
        },
        grid: { left: 70, right: 70, top: 30, bottom: 60 },
        xAxis: {
          type: 'value',
          name: 'Market Cap ($B)',
          nameLocation: 'middle',
          nameGap: 35,
          nameTextStyle: { 
            color: '#ffffff', 
            fontSize: 14,
            fontWeight: 'bold'
          },
          axisLine: { lineStyle: { color: '#374151' } },
          axisLabel: { 
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold'
          },
          splitLine: { lineStyle: { color: 'rgba(107, 114, 128, 0.2)' } }
        },
        yAxis: {
          type: 'value',
          name: 'Forward P/E',
          nameLocation: 'middle',
          nameGap: 50,
          nameTextStyle: { 
            color: '#ffffff', 
            fontSize: 14,
            fontWeight: 'bold'
          },
          axisLine: { lineStyle: { color: '#374151' } },
          axisLabel: { 
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold'
          },
          splitLine: { lineStyle: { color: 'rgba(107, 114, 128, 0.2)' } }
        },
        series: [{
          type: 'scatter',
          symbolSize: d => Math.max(15, Math.min(40, Math.sqrt(d[2] || 16) * 3)),
          data: peers,
          label: {
            show: labelsOn,
            formatter: p => p.data[3],
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: [2, 6],
            borderRadius: 4
          },
          itemStyle: { 
            opacity: 0.9, 
            color: {
              type: 'radial',
              x: 0.5, y: 0.5, r: 0.5,
              colorStops: [
                { offset: 0, color: '#06b6d4' },
                { offset: 1, color: '#0891b2' }
              ]
            },
            borderColor: '#ffffff',
            borderWidth: 2,
            shadowColor: 'rgba(6, 182, 212, 0.5)',
            shadowBlur: 10
          },
          emphasis: {
            itemStyle: {
              shadowColor: 'rgba(6, 182, 212, 0.8)',
              shadowBlur: 15
            }
          }
        }]
      });

      // Enhanced toggle button
      const btn = byId('toggleLabelsBtn');
      if (btn && peersChart) {
        btn.onclick = () => {
          labelsOn = !labelsOn;
          btn.textContent = `Labels: ${labelsOn ? 'ON' : 'OFF'}`;
          btn.className = labelsOn 
            ? 'bg-cyan-500 hover:bg-cyan-600 px-3 py-1 rounded-lg text-xs text-white font-medium'
            : 'bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-xs text-gray-300';
          peersChart.setOption({ 
            series: [{ label: { show: labelsOn } }] 
          }, { notMerge: false });
        };
      }
    }

    // 5. Professional Segment Pie Chart
    const segments = stockData?.segments;
    
    if (segments && segments.length > 0) {
      console.log('Creating professional segment chart...');
      
      safeCreateChart('segmentPie', {
        backgroundColor: 'transparent',
        legend: { 
          top: 10, 
          textStyle: { 
            color: '#ffffff', 
            fontSize: 12,
            fontWeight: 'bold'
          },
          itemGap: 15
        },
        tooltip: { 
          trigger: 'item',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          borderColor: '#374151',
          textStyle: { color: '#ffffff' },
          formatter: '{b}: <strong>{c}%</strong><br/>({d}% of total)'
        },
        series: [{
          type: 'pie',
          radius: ['50%','80%'],
          center: ['50%','60%'],
          avoidLabelOverlap: true,
          label: { 
            show: true,
            position: 'outside',
            color: '#ffffff', 
            fontSize: 11, 
            fontWeight: 'bold',
            formatter: '{b}\n{d}%',
            lineHeight: 16
          },
          labelLine: {
            show: true,
            lineStyle: { color: 'rgba(255, 255, 255, 0.5)' }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 15,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: segments.map((segment, index) => ({
            ...segment,
            itemStyle: {
              ...segment.itemStyle,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 5
            }
          }))
        }]
      });
    }

    // Enhanced resize handler
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

    console.log(`✅ Successfully initialized ${instances.length} professional charts`);

  } catch (error) {
    console.error('❌ Error initializing charts:', error);
  }
}
