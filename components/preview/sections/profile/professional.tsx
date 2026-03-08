"use client"

import {
  getProfileBackendProfessional,
  getProfileFrontendProfessional,
  getProfileStats,
} from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function ProfessionalProfile() {
  const locale = useLocale()
  const frontendSkills = getProfileFrontendProfessional(locale)
  const backendSkills = getProfileBackendProfessional(locale)
  const stats = getProfileStats(locale)

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto px-8 short:px-4 py-24 short:py-8">
        <div className="mb-24 short:mb-6 border-b border-gray-200 pb-16 short:pb-4">
          <div className="flex items-start gap-8 short:gap-4 mb-8 short:mb-4">
            <div className="w-32 h-32 short:w-16 short:h-16 rounded-full bg-gray-900 flex items-center justify-center text-4xl short:text-xl font-bold text-white shrink-0">
              AS
            </div>
            <div className="pt-4">
              <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1 tracking-tight">
                {locale === "en" ? "Akira Shingu" : "神宮 章"}
              </h1>
              <p className="text-2xl short:text-sm text-gray-600 mb-4 short:mb-2 font-light">
                {locale === "en" ? "Full-Stack Engineer" : "フルスタックエンジニア"}
              </p>
              <p className="text-gray-700 leading-relaxed max-w-xl short:text-sm">
                {locale === "en"
                  ? "With 5+ years of web development experience, I deliver high-quality products using modern tech stacks. I value clean code, excellent UX, and creating business value."
                  : "5年以上のWeb開発経験を持ち、モダンな技術スタックで高品質なプロダクトを提供します。クリーンなコード、優れたUX、そしてビジネス価値の創出を重視しています。"}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 short:mb-4">
          <h2 className="text-3xl short:text-xl font-serif font-bold text-gray-900 mb-8 short:mb-3">
            {locale === "en" ? "Specialties" : "専門分野"}
          </h2>
          <div className="grid md:grid-cols-2 gap-12 short:gap-4">
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                {locale === "en" ? "Frontend Development" : "フロントエンド開発"}
              </h3>
              <ul className="space-y-3">
                {frontendSkills.map((item) => (
                  <li key={item} className="text-gray-700 pl-4 border-l-2 border-gray-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                {locale === "en" ? "Backend Development" : "バックエンド開発"}
              </h3>
              <ul className="space-y-3">
                {backendSkills.map((item) => (
                  <li key={item} className="text-gray-700 pl-4 border-l-2 border-gray-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-12 short:pt-4">
          <h2 className="text-3xl short:text-xl font-serif font-bold text-gray-900 mb-8 short:mb-3">
            {locale === "en" ? "Achievements" : "実績"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 short:gap-3 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-gray-200 p-6 short:p-3 rounded">
                <div className="text-4xl short:text-xl font-bold text-gray-900 mb-2 short:mb-1">
                  {stat.num}
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
