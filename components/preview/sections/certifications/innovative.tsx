"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useCertificationsData } from "@/hooks/use-certifications-data"

export function InnovativeCertifications() {
  const locale = useLocale()
  const { data: certifications, loading, error } = useCertificationsData()

  if (loading) return <LoadingState />
  if (error || !certifications) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-black">
      <div className="max-w-7xl mx-auto px-4 short:px-2 py-20 short:py-6">
        <h1 className="text-7xl short:text-3xl font-black mb-20 short:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          {locale === "en" ? "Certifications" : "資格"}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-black border border-gray-800 rounded-2xl p-6 short:p-3 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4 short:mb-2">
                  <div className="flex size-10 short:size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500">
                    <svg className="size-5 short:size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{cert.date}</span>
                </div>
                <h3 className="text-xl short:text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2 short:mb-1">
                  {cert.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 short:mb-2 flex-1">{cert.organization}</p>
                {cert.verifyLink && (
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {locale === "en" ? "Verify →" : "検証 →"}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
