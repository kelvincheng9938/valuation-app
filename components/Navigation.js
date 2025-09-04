'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const [pathname, setPathname] = useState('')
  const actualPathname = usePathname()

  // Handle hydration mismatch
  useEffect(() => {
    setPathname(actualPathname)
  }, [actualPathname])
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-white">ValuationPro</Link>
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
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <span className="text-xs ghost hidden md:inline">API: Connected</span>
            <div className="w-2 h-2 bg-green-500 rounded-full market-badge"></div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className={`block px-3 py-2 rounded-lg ${pathname === '/' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'} transition-colors`}
            >
              🏠 Home
            </Link>
            <Link 
              href="/report" 
              className={`block px-3 py-2 rounded-lg ${pathname === '/report' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'} transition-colors`}
            >
              📊 Analysis
            </Link>
            <Link 
              href="/news" 
              className={`block px-3 py-2 rounded-lg ${pathname === '/news' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'} transition-colors`}
            >
              📰 News
            </Link>
            <Link 
              href="/admin" 
              className={`block px-3 py-2 rounded-lg ${pathname === '/admin' ? 'text-cyan-400 bg-cyan-400/10' : 'text-gray-300 hover:text-white hover:bg-white/5'} transition-colors`}
            >
              ⚙️ Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
