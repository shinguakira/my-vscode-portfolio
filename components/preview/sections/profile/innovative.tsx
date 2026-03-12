"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useProfileData } from "@/hooks/use-profile-data"

export function InnovativeProfile() {
  const locale = useLocale()
  const { data: profile, loading, error } = useProfileData()

  if (loading) return <LoadingState />
  if (error || !profile) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 short:px-2 py-20 short:py-6">
        <div className="mb-32 short:mb-6 text-center">
          <div className="mb-12 short:mb-4 inline-block relative">
            <div className="w-40 h-40 short:w-16 short:h-16 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl rotate-6 animate-pulse" />
              <div className="absolute inset-2 bg-black rounded-3xl flex items-center justify-center text-6xl short:text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
          </div>
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 leading-none">
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {profile.title}
            </span>
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 mb-12 short:mb-4 max-w-3xl mx-auto font-light tracking-wide">
            {profile.summary}
          </p>
          <div className="flex justify-center gap-6 short:gap-3">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
              <button className="relative px-4 short:px-2 py-4 short:py-2 bg-black rounded-2xl text-white font-bold text-lg short:text-sm">
                {locale === "en" ? "View Projects" : "プロジェクトを見る"}
              </button>
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
              <button className="relative px-4 short:px-2 py-4 short:py-2 bg-black rounded-2xl text-white font-bold text-lg short:text-sm">
                {locale === "en" ? "Contact Me" : "お問い合わせ"}
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl p-8 short:p-3 bg-black/50 border border-gray-800">
          <p className="text-xl short:text-sm text-gray-300 leading-relaxed text-center">
            {profile.bio}
          </p>
        </div>
      </div>
    </div>
  )
}
