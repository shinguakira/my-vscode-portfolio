"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useCertificationsData } from "@/hooks/use-certifications-data"

export function ProfessionalCertifications() {
  const locale = useLocale()
  const { data: certifications, loading, error } = useCertificationsData()

  if (loading) return <LoadingState />
  if (error || !certifications) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Certifications" : "資格"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">
            {locale === "en" ? "Professional Credentials & Licenses" : "専門資格とライセンス"}
          </p>
        </div>

        <div className="space-y-6 short:space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-start gap-6 short:gap-3 py-6 short:py-3 border-b border-gray-100"
            >
              <div className="flex size-10 short:size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 mt-1">
                <svg className="size-5 short:size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg short:text-base font-semibold text-gray-900 mb-1">
                  {cert.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 short:mb-1">{cert.organization}</p>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm text-gray-500">{cert.date}</span>
                  {cert.verifyLink && (
                    <a
                      href={cert.verifyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 hover:text-gray-900 underline underline-offset-2 transition-colors"
                    >
                      {locale === "en" ? "Verify credential" : "資格を検証"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
