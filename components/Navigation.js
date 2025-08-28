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
                className={currentPage === 'home' ? 'text-cyan-400' : 'text-gray-300'}
              >
                Home
              </button>
              <button
                onClick={() => setPage('report')}
                className={currentPage === 'report' ? 'text-cyan-400' : 'text-gray-300'}
              >
                Report
              </button>
              <button
                onClick={() => setPage('news')}
                className={currentPage === 'news' ? 'text-cyan-400' : 'text-gray-300'}
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
