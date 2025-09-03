                        <span className="leading-relaxed">{risk}</span>
                      </li>
                    )) || (
                      <li className="text-sm ghost">Loading risks analysis...</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* News Section */}
          <section className="mt-4">
            <div className="card p-4">
              <div className="font-medium mb-4">Latest Company News</div>
              
              {stockData.news?.length > 0 ? (
                <ul className="divide-y divide-white/10">
                  {stockData.news.slice(0, 6).map((item, i) => (
                    <li key={i} className="py-3">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block hover:bg-white/5 -mx-2 px-2 py-2 rounded transition-all"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs ghost">{item.source}</div>
                          <div className="text-xs ghost">{item.datetime}</div>
                        </div>
                        <div className="text-sm hover:text-cyan-400 font-medium mb-1">
                          {item.headline}
                        </div>
                        {item.summary && (
                          <div className="text-xs ghost">{item.summary}</div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <div className="text-yellow-400 mb-2">📰</div>
                  <div className="text-sm ghost">No recent news available</div>
                </div>
              )}
            </div>
          </section>
        </div>
      </ErrorBoundary>
    </>
  )
}
