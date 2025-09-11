{/* Continue with all other sections... */}
              
              {/* 2. Valuation Analysis */}
              <section id="valuation" className="scroll-mt-24">
                <ErrorBoundary fallback="Valuation section failed to load">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Valuation Analysis</h2>
                    
                    {stockData?.eps?.values?.length > 0 && stockData?.peBands ? (
                      <>
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                          <span className="chip px-3 py-2">
                            EPS: {stockData.eps.values.join(' / ')}
                          </span>
                          <span className="chip px-3 py-2">
                            P/E Bands: {stockData.peBands.low}× / {stockData.peBands.mid}× / {stockData.peBands.high}×
                          </span>
                          <span className="chip px-3 py-2">
                            Current Price: ${stockData?.price?.toFixed(2) || '0.00'}
                          </span>
                          {stockData?.dataQuality?.warning && (
                            <span className="chip px-3 py-2 text-yellow-400">
                              ⚠️ {stockData.dataQuality.warning.split(' - ')[0]}
                            </span>
                          )}
                        </div>
                        <div id="valuationChart" className="chart-lg"></div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">📊</div>
                        <div className="text-xl font-medium mb-3">Valuation Analysis Unavailable</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? 'This ticker may have incomplete EPS data. Try AAPL, MSFT, GOOGL, or META for full analysis.'
                            : 'No forward EPS estimates available from analysts.'}
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 3. Quality Analysis */}
              <section id="quality" className="scroll-mt-24">
                <ErrorBoundary fallback="Quality analysis section failed to load">
                  <div className="card p-6">
                    <h2 className="text-2xl font-bold mb-6">Quality Analysis</h2>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold mb-4">Quality Radar</h3>
                        <div id="qualityRadar" className="chart"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4">Score Breakdown</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Value Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-orange-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.value || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.value?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Growth Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.growth || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.growth?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Profit Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.profit || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.profit?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Momentum Score</span>
                            <div className="flex items-center gap-3 w-32">
                              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-purple-400 rounded-full transition-all duration-300" 
                                  style={{width: `${(stockData?.scores?.momentum || 0) * 10}%`}}
                                ></div>
                              </div>
                              <span className="text-sm font-bold w-8">{stockData?.scores?.momentum?.toFixed(1) || '0.0'}</span>
                            </div>
                          </div>
                        </div>

                        {isDemoMode && (
                          <div className="mt-6 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                            <div className="text-xs text-blue-300/70">
                              💡 Quality scores are calculated using fundamental metrics including valuation, growth trajectory, profitability, and momentum indicators.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              </section>

              {/* 4. Peer Comparison */}
              <section id="peers" className="scroll-mt-24">
                <ErrorBoundary fallback="Peer comparison section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Peer Comparison</h2>
                      <div className="flex items-center gap-3">
                        {isDemoMode && (
                          <span className="chip px-2 py-1 text-blue-400 text-xs">
                            📊 Demo Peers
                          </span>
                        )}
                        <button id="toggleLabelsBtn" className="btn text-xs px-3 py-1">Labels: ON</button>
                      </div>
                    </div>
                    
                    {stockData?.peers?.length > 0 ? (
                      <>
                        <div className="mb-4">
                          <p className="text-sm ghost">
                            Forward P/E vs Market Cap comparison with sector peers. 
                            Bubble size represents relative market influence.
                          </p>
                        </div>
                        <div id="peersChart" className="chart"></div>
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">🏢</div>
                        <div className="text-xl font-medium mb-3">Peer Data Unavailable</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? 'Peer comparison data not available for this ticker. Try major stocks like AAPL, MSFT, or GOOGL.'
                            : 'No peer comparison data available for this ticker'}
                        </div>
                      </div>
                    )}

                    {/* Revenue Segments */}
                    {stockData?.segments?.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <h3 className="font-semibold mb-4">Revenue by Segment</h3>
                        <div className="grid lg:grid-cols-2 gap-6">
                          <div id="segmentPie" className="chart"></div>
                          <div className="space-y-3">
                            {stockData.segments.map((segment, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <div 
                                  className="w-4 h-4 rounded-full" 
                                  style={{ backgroundColor: segment.itemStyle.color }}
                                ></div>
                                <span className="text-sm flex-1">{segment.name}</span>
                                <span className="text-sm font-semibold">{segment.value}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 5. Investment Analysis */}
              <section id="analysis" className="scroll-mt-24">
                <ErrorBoundary fallback="Investment analysis section failed">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Investment Analysis</h2>
                      {isDemoMode && (
                        <span className="chip px-2 py-1 text-blue-400 text-xs">
                          🎯 Professional Analysis
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="ghost text-sm mb-4 flex items-center gap-2">
                          <span className="text-green-400">✓</span> Key Investment Strengths
                        </div>
                        <ul className="space-y-3 text-sm">
                          {stockData?.strengths?.map((strength, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-green-400 mt-1 text-xs">●</span>
                              <span className="leading-relaxed">{strength}</span>
                            </li>
                          )) || (
                            <li className="flex items-start gap-3">
                              <span className="text-green-400 mt-1">●</span>
                              <span>Loading investment strengths analysis...</span>
                            </li>
                          )}
                        </ul>
                      </div>
                      <div>
                        <div className="ghost text-sm mb-4 flex items-center gap-2">
                          <span className="text-red-400">⚠</span> Key Investment Risks
                        </div>
                        <ul className="space-y-3 text-sm">
                          {stockData?.risks?.map((risk, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-red-400 mt-1 text-xs">●</span>
                              <span className="leading-relaxed">{risk}</span>
                            </li>
                          )) || (
                            <li className="flex items-start gap-3">
                              <span className="text-red-400 mt-1">●</span>
                              <span>Loading investment risks analysis...</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    
                    {isDemoMode && (
                      <div className="mt-6 bg-blue-500/5 rounded-lg p-4 border border-blue-400/10">
                        <div className="text-xs text-blue-300/70">
                          💡 <span className="text-blue-400 font-medium">Professional Analysis:</span> These strengths and risks are based on 
                          current business fundamentals, market positioning, and industry dynamics. Analysis reflects comprehensive research 
                          of financial metrics, competitive landscape, and market trends.
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* 6. Latest News */}
              <section id="news" className="scroll-mt-24">
                <ErrorBoundary fallback="News section failed to load">
                  <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Latest Company News</h2>
                      <div className="flex items-center gap-2 text-sm ghost">
                        {isDemoMode ? (
                          <span className="chip px-2 py-1 text-blue-400 text-xs">📰 Demo News</span>
                        ) : (
                          stockData?.newsSource === 'live' && <span className="text-green-400">● Live</span>
                        )}
                        <span>{stockData?.news?.length || 0} items</span>
                      </div>
                    </div>
                    
                    {stockData?.news?.length > 0 ? (
                      <div className="space-y-4">
                        {stockData.news.slice(0, 6).map((item, i) => (
                          <article key={i} className="p-4 rounded-xl border border-white/10 hover:border-cyan-400/40 transition-all duration-200">
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-xs ghost">{item.source}</div>
                              <div className="text-xs ghost">{item.datetime}</div>
                            </div>
                            <h3 className="font-semibold mb-2 leading-relaxed">
                              {item.headline}
                            </h3>
                            {item.summary && item.summary !== item.headline && (
                              <p className="text-sm ghost leading-relaxed mb-3">{item.summary}</p>
                            )}
                            <a 
                              href={item.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors inline-flex items-center gap-1"
                            >
                              Read more 
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="text-yellow-400 text-4xl mb-4">📰</div>
                        <div className="text-xl font-medium mb-3">No Recent News</div>
                        <div className="text-ghost">
                          {isDemoMode 
                            ? `No recent news available in demo for ${ticker}. Major stocks like AAPL, MSFT, GOOGL have sample news articles.`
                            : `No recent news available for ${ticker}`
                          }
                        </div>
                      </div>
                    )}

                    {isDemoMode && stockData?.news?.length > 0 && (
                      <div className="mt-6 bg-blue-500/5 rounded-lg p-4 border border-blue-400/10">
                        <div className="text-xs text-blue-300/70">
                          📡 <span className="text-blue-400 font-medium">News Integration:</span> In live mode, this section automatically 
                          pulls the latest company-specific news, earnings announcements, and analyst updates from premium financial news sources 
                          with real-time updates throughout the trading day.
                        </div>
                      </div>
                    )}
                  </div>
                </ErrorBoundary>
              </section>

              {/* Ready to Go Live Footer */}
              {isDemoMode && (
                <div className="mt-12">
                  <div className="card p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-blue-400/20">
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold mb-2">🚀 Ready to Go Live?</div>
                      <div className="text-sm ghost mb-4">
                        This demo showcases institutional-grade stock analysis with {availableTickers.length || '115'} stocks including Hong Kong listings. 
                        When you're ready to launch with real-time data, simply switch to live API mode and all features will work with current market data.
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 text-xs">
                        <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Forward EPS Estimates</span>
                        <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Dynamic P/E Bands</span>
                        <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Peer Comparisons</span>
                        <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Quality Scoring</span>
                        <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Real-time News</span>
                        <span className="chip px-3 py-1 bg-green-500/20 text-green-400">✓ Bloomberg Data</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>

        </div>
      </ErrorBoundary>
    </>
  )
}
