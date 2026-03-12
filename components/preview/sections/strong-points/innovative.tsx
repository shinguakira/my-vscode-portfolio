"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useStrongPointsData } from "@/hooks/use-strong-points-data"

const GRADIENTS = [
  "from-emerald-500 to-cyan-500",
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-purple-500",
  "from-purple-500 to-pink-500",
  "from-pink-500 to-rose-500",
  "from-rose-500 to-orange-500",
  "from-orange-500 to-amber-500",
  "from-amber-500 to-yellow-500",
  "from-teal-500 to-emerald-500",
]

export function InnovativeStrongPoints() {
  const locale = useLocale()
  const { data: strongPoints, loading, error } = useStrongPointsData()

  if (loading) return <LoadingState />
  if (error || !strongPoints) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 short:px-2 py-20 short:py-6">
        <div className="text-center mb-20 short:mb-6">
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
            STRENGTHS
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 font-light">What Makes Me Different</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 short:gap-3">
          {strongPoints.map((item, i) => {
            const gradient = GRADIENTS[i % GRADIENTS.length]
            return (
              <div key={i} className="group relative">
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500`}
                />
                <div className="relative bg-black border border-gray-800 rounded-3xl p-10 short:p-4">
                  <div
                    className={`text-8xl short:text-3xl font-black mb-4 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${gradient} opacity-30`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className={`text-3xl short:text-lg font-black mb-3 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                  >
                    {item.question}
                  </h3>
                  <p className="text-xl short:text-sm text-gray-400">{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
