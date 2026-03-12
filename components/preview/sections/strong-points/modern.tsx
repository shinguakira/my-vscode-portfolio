"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useStrongPointsData } from "@/hooks/use-strong-points-data"

export function ModernStrongPoints() {
  const locale = useLocale()
  const { data: strongPoints, loading, error } = useStrongPointsData()

  if (loading) return <LoadingState />
  if (error || !strongPoints) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {locale === "en" ? "Strengths & Highlights" : "強み・アピールポイント"}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">
            {locale === "en" ? "" : "What Makes Me Stand Out"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 short:gap-3 mb-12 short:mb-4">
          {strongPoints.map((item, i) => (
            <div
              key={i}
              className="rounded-xl shadow-sm p-5 short:p-2 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all group"
            >
              <h3 className="text-2xl short:text-base font-bold mb-3 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                {item.question}
              </h3>
              <p className="text-slate-400 leading-relaxed short:text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
