'use client'
import { useEffect } from 'react'

export default function ReportPage() {
  useEffect(() => {
    // Chart initialization will go here
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <header className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-semibold">Alphabet Inc. (GOOGL)</h1>
            <span className="text-sm text-gray-400">Updated: Just now</span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-12 gap-4">
        <aside className="col-span-12 lg:col-span-3 space-y-3">
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">Value Score</div>
              <div className="text-lg font-semibold">8.2</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">Growth Score</div>
              <div className="text-lg font-semibold">7.6</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">Profitability</div>
              <div className="text-lg font-semibold">9.0</div>
            </div>
          </div>
          <div className="card p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">Momentum</div>
              <div className="text-lg font-semibold">6.9</div>
            </div>
          </div>
        </aside>

        <div className="col-span-12 lg:col-span-9 space-y-4">
          <div className="card p-4">
            <div className="font-medium mb-2">About the Company</div>
            <p className="text-sm text-gray-300 mb-4">
              Alphabet operates through Google Search & YouTube advertising, with Google Cloud accelerating growth.
            </p>
            <div className="grid grid-cols-4 gap-3">
              <div className="chip px-3 py-2 text-center">
                <div className="text-xs text-gray-400">Market Cap</div>
                <div className="font-medium">$2.25T</div>
              </div>
              <div className="chip px-3 py-2 text-center">
                <div className="text-xs text-gray-400">Forward P/E</div>
                <div className="font-medium">24.8</div>
              </div>
              <div className="chip px-3 py-2 text-center">
                <div className="text-xs text-gray-400">TTM P/E</div>
                <div className="font-medium">26.2</div>
              </div>
              <div className="chip px-3 py-2 text-center">
                <div className="text-xs text-gray-400">Sector</div>
                <div className="font-medium">Tech</div>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="font-medium mb-2">Valuation Model</div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              [Valuation Chart Placeholder - ECharts will render here]
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
