"use client"

import { getAchievementStats, getSoftSkills, getStrengths } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function ProfessionalStrongPoints() {
  const locale = useLocale()
  const STRENGTHS = getStrengths(locale)
  const SOFT_SKILLS = getSoftSkills(locale)
  const ACHIEVEMENT_STATS = getAchievementStats(locale)

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
              {locale === "en" ? "Technical Strengths" : "技術的な強み"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {STRENGTHS.map((item) => (
                <div key={item.title} className="border-l-2 border-gray-900 pl-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
              {locale === "en" ? "Soft Skills" : "ソフトスキル"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {SOFT_SKILLS.map((item) => (
                <div key={item.title}>
                  <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.items.map((i) => (
                      <li key={i} className="text-sm text-gray-600 pl-3 border-l border-gray-300">
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12 short:pt-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">
            {locale === "en" ? "Achievement Summary" : "実績サマリー"}
          </h2>
          <div className="grid md:grid-cols-4 gap-6 short:gap-3 text-center">
            {ACHIEVEMENT_STATS.map((stat) => (
              <div key={stat.label} className="border border-gray-200 p-6 short:p-3">
                <div className="text-3xl short:text-xl font-bold text-gray-900 mb-1">
                  {stat.num}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
