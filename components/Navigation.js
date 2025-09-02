'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navigation({ isHomePage = false }) {
  const [pathname, setPathname] = useState('')
  const actualPathname = usePathname()

  // Handle hydration mismatch
  useEffect(() => {
    setPathname(actualPathname)
  }, [actualPathname])
  
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              <span className="hero-title">ValuationPro</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`transition-colors ${
                  pathname === '/' 
                    ? 'text-cyan-400' 
                    : 'hover:text-white transition-colors'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/report" 
                className={`transition-colors ${
                  pathname === '/report' 
                    ? 'text-cyan-400' 
                    : 'hover:text-white transition-colors'
                }`}
              >
                Report
              </Link>
              <Link 
                href="/news" 
                className={`transition-colors ${
                  pathname === '/news' 
                    ? 'text-cyan-400' 
                    : 'hover:text-white transition-colors'
                }`}
              >
                News
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-xs ghost">API: Connected</span>
              <div className="w-2 h-2 bg-green-500 rounded-full market-badge"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
