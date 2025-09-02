'use client'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs ghost hidden sm:inline">
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
      </span>
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="theme-icon">🌙</span>
        <div className="theme-toggle-slider"></div>
        <span className="theme-icon">☀️</span>
      </button>
    </div>
  )
}
