export default function HomePage({ setPage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          Institutional-Grade Stock Valuation
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
          Professional analysis powered by forward EPS estimates and dynamic P/E bands
        </p>
        <button
          onClick={() => setPage('report')}
          className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:shadow-lg transition"
        >
          Start Analysis →
        </button>
      </section>
    </div>
  )
}
