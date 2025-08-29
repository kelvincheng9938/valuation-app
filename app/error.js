'use client'

export default function Error({ error, reset }) {
  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center">
      <div className="card p-8 max-w-md mx-auto text-center">
        <div className="text-red-400 text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
        <p className="ghost text-sm mb-6">
          A client-side exception occurred. This could be due to a temporary network issue or a browser compatibility problem.
        </p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="btn-primary w-full py-2 rounded-lg"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="btn w-full py-2 rounded-lg"
          >
            Go to Homepage
          </button>
        </div>
        <div className="mt-6 text-xs ghost">
          If the problem persists, try refreshing your browser or clearing your cache.
        </div>
      </div>
    </div>
  )
}
