'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Navigation({ isHomePage = false }) {
  const [pathname, setPathname] = useState('')
  const actualPathname = usePathname()

  // Handle hydration mismatch
  useEffect(() => {
    setPathname(actualPathname)
  }, [actualPathname])

  // Determine if we're in light mode (homepage) or dark mode
  const isLightMode = isHomePage || pathname === '/'
  
  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-200 ${
      isLightMode 
        ? 'bg-white/95 border-gray-200' 
        : 'bg-black/20 border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-xl font-bold transition-colors ${
                isLightMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                  : 'text-white'
              }`}
            >
              ValuationPro
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/" 
                className={`transition-colors ${
                  pathname === '/' 
                    ? (isLightMode ? 'text-blue-600 font-medium' : 'text-cyan-400') 
                    : (isLightMode ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white')
                }`}
              >
                Home
              </Link>
              <Link 
                href="/report" 
                className={`transition-colors ${
                  pathname === '/report' 
                    ? (isLightMode ? 'text-blue-600 font-medium' : 'text-cyan-400') 
                    : (isLightMode ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white')
                }`}
              >
                Analysis
              </Link>
              <Link 
                href="/news" 
                className={`transition-colors ${
                  pathname === '/news' 
                    ? (isLightMode ? 'text-blue-600 font-medium' : 'text-cyan-400') 
                    : (isLightMode ? 'text-gray-600 hover:text-gray-900' : 'text-gray-300 hover:text-white')
                }`}
              >
                News
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Demo status indicator */}
            <div className={`hidden md:flex items-center space-x-2 px-3 py-1 rounded-full ${
              isLightMode 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-green-500/10 border border-green-400/20'
            }`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-xs font-medium ${
                isLightMode ? 'text-green-700' : 'text-green-400'
              }`}>
                Demo Active
              </span>
            </div>
            
            {/* CTA Button */}
            {isLightMode ? (
              <Link 
                href="/report" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Demo
              </Link>
            ) : (
              <Link 
                href="/" 
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white/20"
              >
                Home
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile menu (simplified for now) */}
        <div className="md:hidden mt-4 flex space-x-4">
          <Link 
            href="/" 
            className={`text-sm transition-colors ${
              pathname === '/' 
                ? (isLightMode ? 'text-blue-600 font-medium' : 'text-cyan-400') 
                : (isLightMode ? 'text-gray-600' : 'text-gray-300')
            }`}
          >
            Home
          </Link>
          <Link 
            href="/report" 
            className={`text-sm transition-colors ${
              pathname === '/report' 
                ? (isLightMode ? 'text-blue-600 font-medium' : 'text-cyan-400') 
                : (isLightMode ? 'text-gray-600' : 'text-gray-300')
            }`}
          >
            Analysis
          </Link>
          <Link 
            href="/news" 
            className={`text-sm transition-colors ${
              pathname === '/news' 
                ? (isLightMode ? 'text-blue-600 font-medium' : 'text-cyan-400') 
                : (isLightMode ? 'text-gray-600' : 'text-gray-300')
            }`}
          >
            News
          </Link>
        </div>
      </div>
    </nav>
  )
}
