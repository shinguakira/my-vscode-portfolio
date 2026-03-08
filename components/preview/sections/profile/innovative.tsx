"use client"

import { getProfileStats } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function InnovativeProfile() {
  const locale = useLocale()
  const stats = getProfileStats(locale)
  const STAT_COLORS = [
    "from-cyan-500 to-blue-500",
    "from-purple-500 to-pink-500",
    "from-pink-500 to-red-500",
  ]

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-6xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <div className="mb-32 short:mb-6 text-center">
          <div className="mb-12 short:mb-4 inline-block relative">
            <div className="w-40 h-40 short:w-16 short:h-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl rotate-6 animate-pulse" />
              <div className="absolute inset-2 bg-black rounded-3xl flex items-center justify-center text-6xl short:text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                AS
              </div>
            </div>
          </div>
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 leading-none">
            {locale === "en" ? (
              <>
                <span className="inline-block animate-bounce delay-100 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Create
                </span>
                <span className="inline-block text-white mx-4">the</span>
                <span className="inline-block animate-bounce delay-300 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Future
                </span>
              </>
            ) : (
              <>
                <span className="inline-block animate-bounce delay-100 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  未来
                </span>
                <span className="inline-block text-white mx-4">を</span>
                <span className="inline-block animate-bounce delay-300 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  創る
                </span>
              </>
            )}
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 mb-12 short:mb-4 max-w-3xl mx-auto font-light tracking-wide">
            {locale === "en"
              ? "Designing next-generation digital experiences with innovative technology"
              : "革新的なテクノロジーで、次世代のデジタル体験をデザインします"}
          </p>
          <div className="flex justify-center gap-6 short:gap-3">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
              <button className="relative px-8 short:px-4 py-4 short:py-2 bg-black rounded-2xl text-white font-bold text-lg short:text-sm">
                {locale === "en" ? "View Projects" : "プロジェクトを見る"}
              </button>
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
              <button className="relative px-8 short:px-4 py-4 short:py-2 bg-black rounded-2xl text-white font-bold text-lg short:text-sm">
                {locale === "en" ? "Contact Me" : "お問い合わせ"}
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 short:gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${STAT_COLORS[i]} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500`}
              />
              <div className="relative bg-black border border-gray-800 rounded-2xl p-8 short:p-3 text-center">
                <div
                  className={`text-5xl short:text-2xl font-black mb-2 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${STAT_COLORS[i]}`}
                >
                  {stat.num}
                </div>
                <div className="text-gray-400 text-lg short:text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
