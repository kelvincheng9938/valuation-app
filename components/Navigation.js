export default function Navigation({ currentPage, setPage }) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-white">ValuationPro</div>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setPage('home')}
                className={`transition ${currentPage === 'home' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
              >
                Home
              </button>
              <button
                onClick={() => setPage('report')}
                className={`transition ${currentPage === 'report' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
              >
                Report
              </button>
              <button
                onClick={() => setPage('news')}
                className={`transition ${currentPage === 'news' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}
              >
                News
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
