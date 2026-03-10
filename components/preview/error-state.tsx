"use client"

export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="text-center max-w-md px-8">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-lg font-semibold text-red-400 mb-2">Failed to load data</h2>
        <p className="text-slate-400 text-sm mb-4">{message ?? "An unexpected error occurred."}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  )
}
