'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import ThemeToggle from './ThemeToggle'
import SearchModal from './SearchModal'

export default function Navigation({ isHomePage = false }) {
  const [pathname, setPathname] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const actualPathname = usePathname()
  const { data: session, status } = useSession()

  // Handle hydration mismatch
  useEffect(() => {
    setPathname(actualPathname)
  }, [actualPathname])

  // Handle scroll effect for sticky nav
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = () => {
    signIn('google', { 
      callbackUrl: pathname || '/report'
    })
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  const navLinks = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/report', label: 'Analysis', icon: '📊' },
    { href: '/news', label: 'Market News', icon: '📰' },
    { href: '/watchlist', label: 'Watchlist', icon: '⭐' },
    { href: '/resources', label: 'Resources', icon: '📚' }
  ]
  
  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'nav-scrolled shadow-lg' 
          : 'nav-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300 transform group-hover:scale-110">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hidden sm:block">
                  ValuationPro
                </span>
              </Link>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className={`nav-link px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                      pathname === link.href 
                        ? 'nav-link-active' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="search-button p-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center space-x-2"
                aria-label="Search stocks"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:block text-sm">Search</span>
                <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-white/10 rounded">⌘K</kbd>
              </button>

              {/* Notifications Bell (for logged-in users) */}
              {session && (
                <button className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              )}

              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* Auth Section */}
              <div className="flex items-center space-x-3">
                {status === 'loading' ? (
                  <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                ) : session ? (
                  <div className="flex items-center space-x-3">
                    <img 
                      src={session.user?.image || '/default-avatar.png'} 
                      alt={session.user?.name || 'User'}
                      className="w-8 h-8 rounded-full border-2 border-cyan-400/30"
                    />
                    <button
                      onClick={handleLogout}
                      className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="btn-primary px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40"
                  >
                    Sign In
                  </button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg mb-2 transition-all ${
                    pathname === link.href
                      ? 'bg-cyan-400/20 text-cyan-400'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Spacer for fixed navigation */}
      <div className="h-16"></div>
    </>
  )
}
