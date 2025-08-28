export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      <h2 className="text-2xl font-bold mb-6">Market Snapshot</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="card p-4">
          <div className="text-xs text-gray-400 mb-1">S&P 500</div>
          <div className="text-xl font-bold">5,974.07</div>
          <div className="text-sm text-green-400">+0.73%</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-gray-400 mb-1">NASDAQ</div>
          <div className="text-xl font-bold">19,764.89</div>
          <div className="text-sm text-green-400">+0.98%</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-gray-400 mb-1">BTC-USD</div>
          <div className="text-xl font-bold">94,852</div>
          <div className="text-sm text-red-400">-2.14%</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-gray-400 mb-1">Gold</div>
          <div className="text-xl font-bold">2,635.20</div>
          <div className="text-sm text-green-400">+0.45%</div>
        </div>
        <div className="card p-4">
          <div className="text-xs text-gray-400 mb-1">Oil WTI</div>
          <div className="text-xl font-bold">70.10</div>
          <div className="text-sm text-red-400">-1.23%</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Latest News</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article className="card p-4">
          <div className="text-xs text-gray-400 mb-2">2 hours ago · Reuters</div>
          <h3 className="font-semibold mb-2">Fed Minutes Suggest Slower Rate Cuts</h3>
          <p className="text-sm text-gray-400">Federal Reserve officials indicated a cautious approach...</p>
        </article>
        <article className="card p-4">
          <div className="text-xs text-gray-400 mb-2">3 hours ago · Bloomberg</div>
          <h3 className="font-semibold mb-2">Tech Rally Continues on AI Optimism</h3>
          <p className="text-sm text-gray-400">Major technology stocks pushed indices higher...</p>
        </article>
        <article className="card p-4">
          <div className="text-xs text-gray-400 mb-2">4 hours ago · WSJ</div>
          <h3 className="font-semibold mb-2">China Data Shows Mixed Recovery</h3>
          <p className="text-sm text-gray-400">Latest indicators point to uneven economic recovery...</p>
        </article>
      </div>
    </div>
  )
}
