'use client'
import { useState } from 'react'
import HomePage from '@/components/HomePage'
import ReportPage from '@/components/ReportPage'
import NewsPage from '@/components/NewsPage'
import Navigation from '@/components/Navigation'
import './globals.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} setPage={setCurrentPage} />
      <main>
        {currentPage === 'home' && <HomePage setPage={setCurrentPage} />}
        {currentPage === 'report' && <ReportPage />}
        {currentPage === 'news' && <NewsPage />}
      </main>
    </div>
  )
}
