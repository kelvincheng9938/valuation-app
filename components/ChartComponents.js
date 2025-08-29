'use client';

let echartsLib = null;

export async function initCharts(stockData) {
  if (typeof window === 'undefined') return;

  // 動態載入 echarts（只載一次）
  if (!echartsLib) {
    const mod = await import('echarts');
    echartsLib = mod.default ?? mod;
  }
  const echarts = echartsLib;

  // 我們自己保存 instance，方便安全 resize
  const instances = [];
  const byId = (id) => document.getElementById(id);

  // ===== Sparkline（Value Score 小圖）=====
  const sparkEl = byId('band-spark');
  if (sparkEl) {
    const inst = echarts.init(sparkEl);
    instances.push(inst);
    inst.setOption({
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
  }

  // ===== Radar（Quality Radar）=====
  const radarEl = byId('qualityRadar');
  if (radarEl) {
    const inst = echarts.init(radarEl);
    instances.push(inst);
    const s = stockData?.scores || { value: 8.2, growth: 7.6, profit: 9.0, momentum: 6.9 };
    inst.setOption({
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
        data: [{ value: [s.value, s.growth, s.profit, s.momentum], areaStyle: { opacity: .25, color: '#06b6d4' } }]
      }]
    });
  }

  // ===== Valuation（Forward EPS × P/E Bands）=====
  const valEl = byId('valuationChart');
  if (valEl) {
    const inst = echarts.init(valEl);
    instances.push(inst);

    const eps = stockData?.eps || { years: ['2025','2026','2027'], values: [7.5,8.4,9.3] };
    const bands = stockData?.peBands || { low: 22, mid: 25, high: 30 };
    const current = Number(stockData?.price ?? 207.14);
    const currentLine = eps.years.map(() => current);

    const mk = (mul, color, name) => ({
      name,
      type: 'bar',
      data: eps.values.map(v => +(v * mul).toFixed(1)),
      itemStyle: { color }
    });

    inst.setOption({
      tooltip: { trigger: 'axis' },
      legend: {
        data: [`Low (${bands.low}x)`, `Mid (${bands.mid}x)`, `High (${bands.high}x)`, 'Current Price'],
        textStyle: { color: '#9fb0c3' }
      },
      grid: { left: 40, right: 20, top: 30, bottom: 40 },
      xAxis: { type: 'category', data: eps.years, axisLine: { lineStyle: { color: '#6b7c91' } } },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#6b7c91' } }, splitLine: { lineStyle: { color: 'rgba(255,255,255,.06)' } } },
      series: [
        mk(bands.low,  '#3b82f6', `Low (${bands.low}x)`),
        mk(bands.mid,  '#10b981', `Mid (${bands.mid}x)`),
        mk(bands.high, '#f59e0b', `High (${bands.high}x)`),
        { name: 'Current Price', type: 'line', data: currentLine, symbol: 'none', z: 5, lineStyle: { width: 2, color: '#ff4d4f' } }
      ]
    });
  }

  // ===== Peers（散點圖）=====
  const peersEl = byId('peersChart');
  if (peersEl) {
    const inst = echarts.init(peersEl);
    instances.push(inst);

    const peers = stockData?.peers ?? [
      [2250, 24.8, 22, 'GOOGL'],
      [3500, 35.0, 26, 'MSFT'],
      [2000, 45.0, 20, 'AMZN'],
      [1250, 28.0, 18, 'META']
    ];
    let labelsOn = true;

    inst.setOption({
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

    const btn = document.getElementById('toggleLabelsBtn');
    if (btn) {
      btn.onclick = () => {
        labelsOn = !labelsOn;
        btn.textContent = `Labels: ${labelsOn ? 'ON' : 'OFF'}`;
        inst.setOption({ series: [{ label: { show: labelsOn } }] });
      };
    }
  }

  // ===== Segment Pie（部門收入）=====
  const segEl = byId('segmentPie');
  if (segEl) {
    const inst = echarts.init(segEl);
    instances.push(inst);

    const seg = stockData?.segments ?? [
      { name: 'Search & Other', value: 56, itemStyle: { color: '#3b82f6' } },
      { name: 'YouTube Ads',   value: 12, itemStyle: { color: '#10b981' } },
      { name: 'Google Cloud',  value: 11, itemStyle: { color: '#f59e0b' } },
      { name: 'Network',       value: 15, itemStyle: { color: '#8b5cf6' } },
      { name: 'Other Bets',    value:  6, itemStyle: { color: '#ef4444' } }
    ];

    inst.setOption({
      legend: { top: 0, textStyle: { color: '#e6eef6' } },
      tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
      series: [{
        type: 'pie',
        radius: ['45%','75%'],
        center: ['50%','58%'],
        label: { color: '#e6eef6', fontSize: 12, formatter: '{b}\n{d}%' },
        data: seg
      }]
    });
  }

  // ===== 安全 resize =====
  const onResize = () => instances.forEach(i => i && i.resize());
  window.addEventListener('resize', onResize, { passive: true });
}
