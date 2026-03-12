"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useCertificationsData } from "@/hooks/use-certifications-data"

export function ModernCertifications() {
  const locale = useLocale()
  const { data: certifications, loading, error } = useCertificationsData()

  if (loading) return <LoadingState />
  if (error || !certifications) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {locale === "en" ? "Certifications" : "資格"}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">
            {locale === "en" ? "Professional Credentials & Licenses" : "専門資格とライセンス"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 short:gap-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-xl shadow-sm p-6 short:p-3 bg-slate-900/50 border border-slate-800 backdrop-blur hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg short:text-base font-bold text-white mb-2 short:mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3 short:mb-1">{cert.organization}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {cert.date}
                    </span>
                    {cert.verifyLink && (
                      <a
                        href={cert.verifyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                      >
                        {locale === "en" ? "Verify" : "検証"}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex size-12 short:size-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <svg
                    className="size-6 short:size-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
