"use client"

import { ChevronRight } from "lucide-react"

import {
  getProfileAchievements,
  PROFILE_BACKEND_SKILLS,
  PROFILE_FRONTEND_SKILLS,
} from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

const BULLET_COLORS = ["bg-blue-500", "bg-purple-500", "bg-pink-500"]

export function ModernProfile() {
  const locale = useLocale()
  const achievements = getProfileAchievements(locale)

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-8 short:px-4 py-16 short:py-6">
        <div className="mb-20 short:mb-6 text-center">
          <div className="mb-8 short:mb-3 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 short:w-16 short:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl short:text-xl font-bold text-white shadow-2xl">
                AS
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-950" />
            </div>
          </div>
          <h1 className="text-6xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {locale === "en" ? "Full-Stack Engineer" : "フルスタックエンジニア"}
          </h1>
          <p className="text-xl short:text-sm text-slate-400 mb-8 short:mb-3 max-w-2xl mx-auto leading-relaxed">
            {locale === "en"
              ? "With 5+ years of web development experience, I create high-quality products using modern tech stacks"
              : "5年以上のWeb開発経験を持ち、モダンな技術スタックで高品質なプロダクトを創造します"}
          </p>
          <div className="flex justify-center gap-4">
            <span className="inline-flex items-center rounded-md text-xs font-medium px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white border-0 text-sm">
              {locale === "en" ? "Available for Hire" : "採用可能"}
            </span>
            <span className="inline-flex items-center rounded-md text-xs font-medium px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white border-0 text-sm">
              {locale === "en" ? "Remote Work" : "リモートワーク"}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 short:gap-3 mb-16 short:mb-4">
          <div className="rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur">
            <h3 className="text-2xl short:text-base font-bold mb-6 short:mb-2 text-white flex items-center gap-2">
              <span className="text-3xl short:text-lg">💻</span>
              {locale === "en" ? "Frontend" : "フロントエンド"}
            </h3>
            <div className="space-y-3">
              {PROFILE_FRONTEND_SKILLS.map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300 text-lg short:text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur">
            <h3 className="text-2xl short:text-base font-bold mb-6 short:mb-2 text-white flex items-center gap-2">
              <span className="text-3xl short:text-lg">⚙️</span>
              {locale === "en" ? "Backend" : "バックエンド"}
            </h3>
            <div className="space-y-3">
              {PROFILE_BACKEND_SKILLS.map((skill) => (
                <div key={skill} className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300 text-lg short:text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur">
          <h3 className="text-2xl short:text-base font-bold mb-6 short:mb-2 text-white flex items-center gap-2">
            <span className="text-3xl short:text-lg">🚀</span>
            {locale === "en" ? "Achievements" : "実績"}
          </h3>
          <div className="space-y-4 text-slate-300">
            {achievements.map((achievement, i) => (
              <div key={achievement} className="flex items-start gap-3">
                <div className={`w-2 h-2 ${BULLET_COLORS[i]} rounded-full mt-2`} />
                <p className="text-lg short:text-sm">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
