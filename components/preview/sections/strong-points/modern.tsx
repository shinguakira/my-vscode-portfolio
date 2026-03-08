"use client"

import { ChevronRight } from "lucide-react"

import { getAchievementStats, getSoftSkills, getStrengths } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function ModernStrongPoints() {
  const locale = useLocale()
  const STRENGTHS = getStrengths(locale)
  const SOFT_SKILLS = getSoftSkills(locale)
  const ACHIEVEMENT_STATS = getAchievementStats(locale)

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-8 short:px-4 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {locale === "en" ? "Strengths & Highlights" : "強み・アピールポイント"}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">
            {locale === "en" ? "" : "What Makes Me Stand Out"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 short:gap-3 mb-12 short:mb-4">
          {STRENGTHS.map((item, i) => (
            <div
              key={i}
              className="rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all group"
            >
              <div
                className={`w-16 h-16 short:w-10 short:h-10 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl short:text-xl mb-6 short:mb-2 group-hover:scale-110 transition-transform`}
              >
                {item.icon}
              </div>
              <h3
                className={`text-2xl short:text-base font-bold mb-3 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}
              >
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed short:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur mb-8 short:mb-3">
          <h3 className="text-2xl short:text-base font-bold mb-6 short:mb-2 text-white flex items-center gap-3">
            <span className="text-3xl short:text-lg">💬</span>
            {locale === "en" ? "Soft Skills" : "ソフトスキル"}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {SOFT_SKILLS.map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-semibold text-white mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-400">
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 short:gap-2">
          {ACHIEVEMENT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl shadow-sm p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur text-center"
            >
              <div
                className={`text-3xl short:text-xl font-bold mb-2 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
              >
                {stat.num}
              </div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
