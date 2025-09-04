<div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={pathname === '/' ? 'text-cyan-400' : 'text-gray-300 hover:text-white transition-colors'}
              >
                Home
              </Link>
              <Link 
                href="/report" 
                className={pathname === '/report' ? 'text-cyan-400' : 'text-gray-300 hover:text-white transition-colors'}
              >
                Report
              </Link>
              <Link 
                href="/news" 
                className={pathname === '/news' ? 'text-cyan-400' : 'text-gray-300 hover:text-white transition-colors'}
              >
                News
              </Link>
              <Link 
                href="/admin" 
                className={`${pathname === '/admin' ? 'text-cyan-400' : 'text-gray-300 hover:text-white'} transition-colors text-sm`}
              >
                ⚙️ Admin
              </Link>
            </div>
