// app/report/page.js - FIXED for build errors
'use client'
import { Suspense } from 'react'
import ReportContent from '@/components/ReportContent'

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading Analysis</h2>
        <p className="text-gray-400">Preparing stock report...</p>
      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ReportContent />
    </Suspense>
  )
}
