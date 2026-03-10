"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useProfileData } from "@/hooks/use-profile-data"

export function ProfessionalProfile() {
  const locale = useLocale()
  const { data: profile, loading, error } = useProfileData()

  if (loading) return <LoadingState />
  if (error || !profile) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto px-8 short:px-4 py-24 short:py-8">
        <div className="mb-24 short:mb-6 border-b border-gray-200 pb-16 short:pb-4">
          <div className="flex items-start gap-8 short:gap-4 mb-8 short:mb-4">
            <div className="w-32 h-32 short:w-16 short:h-16 rounded-full bg-gray-900 flex items-center justify-center text-4xl short:text-xl font-bold text-white shrink-0">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="pt-4">
              <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1 tracking-tight">
                {profile.name}
              </h1>
              <p className="text-2xl short:text-sm text-gray-600 mb-4 short:mb-2 font-light">
                {profile.title}
              </p>
              <p className="text-gray-700 leading-relaxed max-w-xl short:text-sm">
                {profile.summary}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 short:mb-4">
          <h2 className="text-3xl short:text-xl font-serif font-bold text-gray-900 mb-8 short:mb-3">
            {locale === "en" ? "About" : "自己紹介"}
          </h2>
          <p className="text-gray-700 leading-relaxed short:text-sm">{profile.bio}</p>
        </div>

        {profile.socialLinks.length > 0 && (
          <div className="border-t border-gray-200 pt-12 short:pt-4">
            <h2 className="text-3xl short:text-xl font-serif font-bold text-gray-900 mb-8 short:mb-3">
              {locale === "en" ? "Connect" : "コネクト"}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 short:gap-3">
              {profile.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 p-6 short:p-3 rounded text-center hover:border-gray-400 transition-colors"
                >
                  <div className="text-sm text-gray-600 uppercase tracking-wide">
                    {link.platform}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
