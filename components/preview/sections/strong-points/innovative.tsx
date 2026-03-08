"use client"

import { getAchievementStats, getStrengths } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function InnovativeStrongPoints() {
  const locale = useLocale()
  const STRENGTHS = getStrengths(locale)
  const ACHIEVEMENT_STATS = getAchievementStats(locale)

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <div className="text-center mb-20 short:mb-6">
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
            STRENGTHS
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 font-light">What Makes Me Different</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 short:gap-3 mb-20 short:mb-6">
          {STRENGTHS.map((item, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500`}
              />
              <div className="relative bg-black border border-gray-800 rounded-3xl p-10 short:p-4">
                <div
                  className={`text-8xl short:text-3xl font-black mb-4 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${item.color} opacity-30`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className={`text-3xl short:text-lg font-black mb-3 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}
                >
                  {item.title}
                </h3>
                <p className="text-xl short:text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-4 gap-6 short:gap-3">
          {ACHIEVEMENT_STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 short:p-3 border border-gray-800 rounded-2xl bg-black/50"
            >
              <div className="text-4xl short:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2 short:mb-1">
                {stat.num}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
