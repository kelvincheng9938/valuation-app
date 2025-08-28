export default function HomePage({ setPage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          Institutional-Grade Stock Valuation
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Professional analysis powered by forward EPS estimates and dynamic P/E bands
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setPage('report')}
            className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition"
          >
            Start Analysis →
          </button>
          <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg text-lg hover:border-gray-400 transition">
            Watch Demo
          </button>
        </div>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose ValuationPro</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Dynamic Valuation</h3>
            <p className="text-gray-400">Forward EPS × historical P/E bands for accurate price targets</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Real-Time Data</h3>
            <p className="text-gray-400">Live quotes and analyst estimates from premium providers</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Quality Scoring</h3>
            <p className="text-gray-400">Multi-factor analysis across value, growth, and momentum</p>
          </div>
        </div>
      </section>
    </div>
  )
}
