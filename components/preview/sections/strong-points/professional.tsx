"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useStrongPointsData } from "@/hooks/use-strong-points-data"

export function ProfessionalStrongPoints() {
  const locale = useLocale()
  const { data: strongPoints, loading, error } = useStrongPointsData()

  if (loading) return <LoadingState />
  if (error || !strongPoints) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto px-8 short:px-4 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Strengths & Highlights" : "強み・専門性"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">
            {locale === "en" ? "" : "What I Bring to the Table"}
          </p>
        </div>

        <div className="space-y-12 short:space-y-4 mb-16 short:mb-4">
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
              {locale === "en" ? "Key Strengths" : "主な強み"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {strongPoints.map((item, i) => (
                <div key={i} className="border-l-2 border-gray-900 pl-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
