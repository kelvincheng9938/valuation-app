// lib/demoData.js — Compact generator (Excel valuation + AI sections)
// Snapshot UTC: 2025-09-10T06:46:16.801332 — Total rows: 115
// This file reconstructs full DEMO_STOCK_DATA at runtime from the CSV below.
// Do NOT add packages; this runs purely in browser.

const CSV = `
ticker,display,price,eps25,eps26,eps27,p25,p50,p75
AAPL,AAPL US Equity,234.35,7.364,7.88,8.694,26.7881,28.7654,32.1934
MSFT,MSFT US Equity,498.41,15.541,18.239,21.378,30.7308,34.1119,35.5054
GOOGL,GOOGL US Equity,239.63,10.485,11.307,12.927,21.5684,24.059,28.0095
META,META US Equity,765.7,33.612,35.633,41.562,19.512,23.8518,25.862
NFLX,NFLX US Equity,1263.25,26.602,32.524,39.017,38.0435,44.6692,52.7109
AMZN,AMZN US Equity,238.24,8.311,9.092,10.962,44.9939,64.0939,92.039
TSLA,TSLA US Equity,346.97,1.743,2.486,3.365,77.2029,118.041,210.891
NVDA,NVDA US Equity,170.76,4.502,6.333,7.319,50.641,59.843,72.3375
CRM,CRM US Equity,252.06,11.37,12.673,14.434,45.3984,113.652,416.025
NOW,NOW US Equity,933.67,16.96,19.922,23.918,142.848,223.572,473.823
AMD,AMD US Equity,155.82,3.947,6.018,7.575,54.3176,81.9107,188.663
QCOM,QCOM US Equity,158.66,11.913,12.089,12.769,14.1623,17.6472,22.0577
2330,2330 TT Equity,1225,59.424,67.605,79.746,16.0103,22.4075,26.3145
INTC,INTC US Equity,24.44,0.137,0.0218893,0.0419218,11.0159,13.1044,35.8483
AMAT,AMAT US Equity,163.5,9.359,9.597,10.736,16.2676,19.2528,22.5654
ISRG,ISRG US Equity,467.54,8.107,9.18,10.726,67.8623,76.2625,81.7393
LLY,LLY US Equity,750.61,22.737,29.82,36.497,32.2327,41.3815,60.6251
UNH,UNH US Equity,347.92,16.237,17.745,20.841,20.5969,22.4806,26.1833
BAC,BAC US Equity,50.29,3.661,4.265,4.813,10.3735,12.4372,13.8201
HOOD,HOOD US Equity,118.5,1.703,2.1,2.356,32.9379,43.1576,53.2234
JPM,JPM US Equity,297.85,19.614,20.488,21.784,9.80208,10.9607,11.9993
XYZ,XYZ US Equity,75.51,2.675,3.74,4.397,25.2157,129.847,386.542
ABNB,ABNB US Equity,123.81,4.29,4.84,5.586,21.7614,33.6973,41.2261
UBER,UBER US Equity,95.45,3.544,4.145,4.735,39.8871,54.6219,155.73
COIN,COIN US Equity,318.78,5.522,6.76,7.941,15.3447,29.1642,51.9192
ASML,ASML NA Equity,683.2,23.818,25.326,30.433,34.6629,40.1792,48.4743
WMT,WMT US Equity,102.29,2.612,2.941,3.268,23.6752,26.8279,29.3774
COST,COST US Equity,979.25,18.132,20.024,22.06,37.5637,40.2942,50.5614
HD,HD US Equity,415.34,14.996,16.35,17.678,19.1849,22.9519,24.817
DIS,DIS US Equity,117.37,5.863,6.43,7.14,25.9167,40.1214,79.3991
NKE,NKE US Equity,73.6,1.677,2.449,2.958,26.1692,32.4154,38.2292
SBUX,SBUX US Equity,83.81,2.2,2.676,3.339,26.3529,30.1141,35.9579
LULU,LULU US Equity,165.69,13.204,13.514,14.697,26.2533,35.2398,49.043
KO,KO US Equity,67.86,2.984,3.196,3.419,22.8937,24.5317,25.5821
MCD,MCD US Equity,312.52,12.326,13.371,14.571,24.6399,25.9103,28.0567
FDX,FDX US Equity,225.75,18.486,21.101,23.408,12.2318,14.3747,16.1167
CAT,CAT US Equity,418.09,18.056,21.259,24.751,14.953,16.7294,19.5861
AVGO,AVGO US Equity,336.67,6.73,9.169,11.603,26.0956,34.9993,54.8853
ORCL,ORCL US Equity,241.51,6.784,8.123,10.139,20.0262,27.6909,34.3832
ADBE,ADBE US Equity,354.06,20.598,22.973,25.656,33.5664,41.2571,46.8916
TXN,TXN US Equity,185.03,5.823,6.949,8.352,20.0086,24.673,31.6371
NXPI,NXPI US Equity,223.69,11.809,14.141,16.689,15.8244,19.2317,25.4243
ON,ON US Equity,48.62,2.294,2.934,4.115,14.1918,16.3931,22.8793
ADI,ADI US Equity,248.18,7.756,9.34,10.903,18.3848,25.8988,30.3905
MU,MU US Equity,135.24,8.061,12.84,15.442,10.0663,18.79,26.8835
ARM,ARM US Equity,140.8,1.685,2.255,2.821,169.574,236.676,353.158
SMCI,SMCI US Equity,42.92,2.623,3.509,3.795,12.4737,17.088,22.4118
DDOG,DDOG US Equity,140.46,1.833,2.254,2.841,256.606,360.744,1057.31
PLTR,PLTR US Equity,162.36,0.649,0.847,1.131,176.888,278.791,423.097
PANW,PANW US Equity,197.55,3.811,4.303,4.716,126.748,134.883,166.882
CRWD,CRWD US Equity,423.51,3.661,4.755,6.08,433.347,549.319,1677.88
FTNT,FTNT US Equity,79.84,2.52,2.789,3.094,44.8452,51.2162,69.3294
OKTA,OKTA US Equity,93.85,3.359,3.621,4.001,105.457,148.313,295.135
TEAM,TEAM US Equity,182.36,4.243,5.143,6.591,3675.71,7190.3,8458.5
INTU,INTU US Equity,670.89,23.128,26.38,30.174,53.718,58.4673,62.7868
WDAY,WDAY US Equity,230.73,8.903,10.245,11.762,44.544,97.8411,492.195
PYPL,PYPL US Equity,67.68,5.231,5.784,6.597,16.6533,23.8967,50.3022
SOFI,SOFI US Equity,25.97,0.311,0.541,0.739,35.0434,41.0454,87.2336
IBKR,IBKR US Equity,62.21,2.018,2.183,2.413,18.656,21.4313,24.4064
WFC,WFC US Equity,80.76,5.983,6.682,7.721,10.6349,11.3453,14.1557
C,C US Equity,97.34,7.63,9.833,11.835,6.20608,8.6792,14.9744
GS,GS US Equity,763.92,46.439,52.492,58.667,7.23085,11.2042,15.2005
MS,MS US Equity,152.22,8.902,9.593,10.512,11.4625,13.4945,15.1331
SCHW,SCHW US Equity,93.67,4.632,5.45,6.342,21.0782,23.8189,26.1542
AXP,AXP US Equity,324.34,15.348,17.286,19.529,16.7022,18.6708,20.6517
BLK,BLK US Equity,1105.67,47.727,52.456,59.963,20.7547,22.6563,24.7211
BX,BX US Equity,173.17,5.035,6.521,8.124,17.9313,40.1048,48.9488
KKR,KKR US Equity,137.39,5.144,6.765,8.168,10.5982,22.3986,38.6691
XOM,XOM US Equity,110.65,6.777,7.554,9.163,9.2988,13.2559,14.5237
CVX,CVX US Equity,154.85,7.984,9.48,11.431,10.0667,14.001,19.1497
COP,COP US Equity,91.86,6.401,6.796,8.578,9.9217,12.832,13.3485
SLB,SLB US Equity,35.78,2.916,3.076,3.456,14.432,19.6292,26.4322
HAL,HAL US Equity,21.75,2.067,2.123,2.539,11.1235,14.2853,26.8485
EOG,EOG US Equity,117.31,10.027,11.178,12.961,9.85715,10.4634,12.5563
LNG,LNG US Equity,234.41,14.367,14.77,14.449,7.81155,19.7128,28.3915
NEE,NEE US Equity,70.07,3.672,3.919,4.249,20.1499,28.9811,32.0869
ENPH,ENPH US Equity,37.94,2.668,2.599,2.878,46.2439,98.4395,136.673
FSLR,FSLR US Equity,203.06,15.377,23.165,28.366,17.0985,20.2553,29.7804
DE,DE US Equity,475.6,18.535,21.134,26.306,12.9846,18.0733,21.2929
GE,GE US Equity,276.24,5.894,6.905,7.966,29.8873,43.7442,50.5241
GEV,GEV US Equity,605.7,7.911,12.831,17.958,48.8555,64.421,104.639
ETN,ETN US Equity,348.23,12.086,13.717,15.309,27.9379,30.4226,33.4896
EMR,EMR US Equity,132.05,6,6.53,7.098,22.2048,25.6301,29.2958
PH,PH US Equity,755.24,29.128,31.82,34.515,19.67,22.8993,26.2804
NOC,NOC US Equity,571.63,25.333,28.872,31.429,16.6277,19.5712,24.5476
LMT,LMT US Equity,457.06,21.885,29.093,31.481,12.2598,15.1959,18.5281
RTX,RTX US Equity,151.75,5.958,6.632,7.413,19.5333,21.5534,23.9245
BA,BA US Equity,229.52,0,3.23,6.505,127.883,209.669,250.587
UPS,UPS US Equity,84.4,6.519,7.267,8.176,14.4494,16.36,18.5948
JNJ,JNJ US Equity,176.96,10.855,11.359,12.148,19.426,20.6709,21.4555
PFE,PFE US Equity,24.71,3.101,3.159,3.122,8.96758,13.3648,21.053
ABBV,ABBV US Equity,210.42,11.923,14.217,15.84,14.2647,15.695,22.7969
TMO,TMO US Equity,482.41,22.512,24.417,26.881,26.1251,29.3392,33.5328
DHR,DHR US Equity,194.33,7.773,8.6,9.457,28.855,36.1089,41.4523
MDT,MDT US Equity,94.07,5.628,6.073,6.516,19.5841,20.9259,23.5491
REGN,REGN US Equity,556.53,39.584,41.182,48.552,12.4978,16.8486,20.4567
MRNA,MRNA US Equity,24.47,0,-7.846,-5.342,5.24635,8.9922,33.1597
TGT,TGT US Equity,90.91,7.463,7.933,8.434,14.9362,17.249,19.3282
LOW,LOW US Equity,269.03,12.293,13.262,14.486,15.753,18.1785,19.3798
CMG,CMG US Equity,39.46,1.213,1.418,1.667,47.1946,53.0952,64.513
PEP,PEP US Equity,143.1,8.028,8.508,9.04,21.7184,24.8082,26.7188
BKNG,BKNG US Equity,5571.83,222.44,257.313,297.296,24.4046,27.8689,49.5846
MAR,MAR US Equity,264,10.119,11.333,12.801,23.3297,27.2494,44.1755
SPOT,SPOT US Equity,719.16,6.46688,11.538,15.308,92.4075,101.641,127.177
PINS,PINS US Equity,36.5,1.769,2.07,2.448,71.8754,100.177,161.537
TTD,TTD US Equity,52.4,1.713,2.045,2.359,150.218,203.507,305.698
ROKU,ROKU US Equity,96.99,0.156,0.834,1.925,95.6508,130.638,226.45
ETSY,ETSY US Equity,56.02,3.774,4.795,5.464,19.3177,30.0024,48.498
F,F US Equity,11.49,1.115,1.345,1.494,6.0216,6.86345,9.98483
GM,GM US Equity,58.01,9.374,9.535,9.969,4.5522,5.50535,6.68995
STLA,STLA US Equity,8.92,0.724787,1.718,2.288,2.573,3.1825,4.55248
700,700 HK Equity,636,30.1485,31.201,34.936,14.5747,18.583,21.5044
3690,3690 HK Equity,103,0.0262549,4.609,7.802,25.753,34.6198,196.07
1810,1810 HK Equity,55.55,1.79015,2.136,2.631,19.7643,25.5723,36.9198
BABA,BABA US Equity,147.1,7.74658,73.707,86.097,11.92,14.296,19.9246
`;

// --- Helpers to parse the compact CSV ---
function parseCSV(text) {
  const lines = text.trim().split(/\n+/);
  const headers = lines.shift().split(",");
  return lines.map(line => {
    // simple CSV with escaped commas (\,)
    const parts = [];
    let cur = "", esc = false;
    for (let i=0;i<line.length;i++) {
      const ch = line[i];
      if (esc) { cur += ch; esc=false; continue; }
      if (ch === "\\") { esc=true; continue; }
      if (ch === ",") { parts.push(cur); cur=""; continue; }
      cur += ch;
    }
    parts.push(cur);
    const obj = {}
    headers.forEach((h, idx) => obj[h] = parts[idx]);
    return obj;
  });
}

function num(x) { const v = parseFloat(x); return Number.isFinite(v) ? v : null; }

function genScores(seed) {
  const r = (min,max)=> +(min + (max-min)*Math.random()).toFixed(1);
  return { value:r(5.6,8.8), growth:r(6.0,9.4), profit:r(5.5,9.3), momentum:r(5.8,9.2) };
}

function genSegments() {
  const core = Math.floor(55 + Math.random()*20);
  const growth = Math.floor(15 + Math.random()*25);
  const other = Math.max(0, 100 - core - growth);
  const segs = [
    { name:'Core', value:core, itemStyle:{ color:'#3b82f6' } },
    { name:'Growth', value:growth, itemStyle:{ color:'#10b981' } }
  ];
  if (other>0) segs.push({ name:'Other', value:other, itemStyle:{ color:'#f59e0b' } });
  return segs;
}

function genNarratives(name, ticker) {
  return {
    strengths: [
      `${name} shows healthy earnings trajectory into FY27`,
      `Solid positioning vs category peers`,
      `Improving operating efficiency and margin profile`
    ],
    risks: [
      `Macro sensitivity could pressure multiples`,
      `Competitive intensity may weigh on pricing power`,
      `Execution risk around new initiatives`
    ],
    description: `Auto-generated profile for ${name}. Valuation data (EPS/PE/targets/price) from Bloomberg Excel; narratives are AI-generated.`
  };
}

function genNews(name, tkr) {
  const now = new Date();
  const ago = h => new Date(now.getTime() - h*3600*1000).toISOString();
  return [
    {
      headline: `${name} strategic update highlights medium-term priorities`,
      summary: `Management commentary points to focused capital allocation and product roadmap execution.`,
      source: 'AutoGen', datetime: ago(3), url: '#'
    },
    {
      headline: `Analyst snapshot: sentiment steady for ${tkr}`,
      summary: `Street tone broadly constructive; valuation anchored by forward EPS and historical P/E bands.`,
      source: 'AutoGen', datetime: ago(11), url: '#'
    }
  ];
}

const RAW = parseCSV(CSV);

// Build DEMO_STOCK_DATA
export const DEMO_STOCK_DATA = RAW.reduce((acc, r) => {
  const key = (r.ticker||'').toUpperCase();
  const name = key; // keep simple; you can later map to full names
  const eps25 = num(r.eps25), eps26 = num(r.eps26), eps27 = num(r.eps27);
  const p25 = num(r.p25), p50 = num(r.p50), p75 = num(r.p75);
  const price = num(r.price);
  const targets = {
    fy1: { low: +( (eps25||0)*(p25||0) ).toFixed(2), mid: +((eps25||0)*(p50||0)).toFixed(2), high: +((eps25||0)*(p75||0)).toFixed(2) },
    fy2: { low: +( (eps26||0)*(p25||0) ).toFixed(2), mid: +((eps26||0)*(p50||0)).toFixed(2), high: +((eps26||0)*(p75||0)).toFixed(2) },
    fy3: { low: +( (eps27||0)*(p25||0) ).toFixed(2), mid: +((eps27||0)*(p50||0)).toFixed(2), high: +((eps27||0)*(p75||0)).toFixed(2) },
  };
  acc[key] = {
    ticker: key,
    name,
    displayTicker: r.display,
    sector: 'Mixed',
    price,
    eps: { years: ['2025','2026','2027'], values: [eps25, eps26, eps27] },
    peBands: { low: p25, mid: p50, high: p75 },
    targets,
    scores: genScores(key),
    forwardPE: p50, ttmPE: p50 ? +(p50*1.05).toFixed(2) : null,
    peers: [], // We'll fill peers after building all items
    segments: genSegments(),
    ...genNarratives(name, key),
    news: genNews(name, key)
  };
  return acc;
}, {});

// quick peers: choose 3 random others
const _keys = Object.keys(DEMO_STOCK_DATA);
_keys.forEach(k => {
  const others = _keys.filter(x => x!==k);
  for (let i=others.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [others[i],others[j]]=[others[j],others[i]]; }
  const picks = others.slice(0,3);
  DEMO_STOCK_DATA[k].peers = picks.map(p => [null, DEMO_STOCK_DATA[p].peBands.mid || 20, 20, p]);
});

// Categories: ALL
export const STOCK_CATEGORIES = {
  ALL: { label: 'All Coverage', color: '#3b82f6', tickers: _keys.sort() }
};

export function getDemoStockData(ticker) {
  const d = DEMO_STOCK_DATA[(ticker||'').toUpperCase()];
  if (!d) return null;
  return { ...d, lastUpdated: new Date().toISOString(), dataQuality: { source: 'EXCEL_BBG_VALUES_ONLY + AI_NARRATIVE' } };
}

export function getDemoTickers() { return Object.keys(DEMO_STOCK_DATA).sort(); }
export function getStockCategories() { return STOCK_CATEGORIES; }
export function getDemoMarketData() { return { spy: { price: 0, change: 0, changePercent: 0 }, nasdaq: { price: 0, change: 0, changePercent: 0 } }; }
