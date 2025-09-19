// components/ErrorBoundary.js - MAKE SURE IT EXPORTS DEFAULT
'use client'
import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg">
          <div className="text-red-400 font-medium">Something went wrong</div>
          <div className="text-sm text-red-300 mt-1">
            {this.props.fallback || 'Please refresh the page'}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
