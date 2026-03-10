"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useProfileData } from "@/hooks/use-profile-data"

export function ModernProfile() {
  const locale = useLocale()
  const { data: profile, loading, error } = useProfileData()

  if (loading) return <LoadingState />
  if (error || !profile) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-8 short:px-4 py-16 short:py-6">
        <div className="mb-20 short:mb-6 text-center">
          <div className="mb-8 short:mb-3 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 short:w-16 short:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl short:text-xl font-bold text-white shadow-2xl">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-950" />
            </div>
          </div>
          <h1 className="text-6xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {profile.title}
          </h1>
          <p className="text-xl short:text-sm text-slate-400 mb-8 short:mb-3 max-w-2xl mx-auto leading-relaxed">
            {profile.summary}
          </p>
          <div className="flex justify-center gap-4">
            <span className="inline-flex items-center rounded-md text-xs font-medium px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white border-0 text-sm">
              {locale === "en" ? "Available for Hire" : "採用可能"}
            </span>
            <span className="inline-flex items-center rounded-md text-xs font-medium px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white border-0 text-sm">
              {profile.location}
            </span>
          </div>
        </div>

        <div className="rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur">
          <h3 className="text-2xl short:text-base font-bold mb-6 short:mb-2 text-white flex items-center gap-2">
            <span className="text-3xl short:text-lg">📝</span>
            {locale === "en" ? "About" : "自己紹介"}
          </h3>
          <p className="text-slate-300 text-lg short:text-sm leading-relaxed">{profile.bio}</p>
        </div>

        {profile.socialLinks.length > 0 && (
          <div className="mt-8 short:mt-3 rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur">
            <h3 className="text-2xl short:text-base font-bold mb-6 short:mb-2 text-white flex items-center gap-2">
              <span className="text-3xl short:text-lg">🔗</span>
              {locale === "en" ? "Links" : "リンク"}
            </h3>
            <div className="space-y-3">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span className="text-slate-300 text-lg short:text-sm">{link.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
