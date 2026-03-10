"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useFaqData } from "@/hooks/use-faq-data"

export function InnovativeFaq() {
  const locale = useLocale()
  const { data: faqItems, loading, error } = useFaqData()

  if (loading) return <LoadingState />
  if (error || !faqItems) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <div className="text-center mb-16 short:mb-4">
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-400">
            FAQ
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 font-light">
            Frequently Asked Questions
          </p>
        </div>

        <div className="space-y-6 short:space-y-3">
          {faqItems.map((item, i) => (
            <div key={i} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-black border border-gray-800 rounded-2xl p-8 short:p-4">
                <div className="flex items-start gap-6 short:gap-3">
                  <div className="text-4xl short:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 shrink-0">
                    Q
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 short:mb-1">
                      <h3 className="text-xl short:text-base font-bold text-white">
                        {item.question}
                      </h3>
                      {item.category && (
                        <span className="inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 border border-orange-500/30 whitespace-nowrap">
                          {item.category}
                        </span>
                      )}
                      {item.size && (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-gray-800 text-gray-400 border border-gray-700 whitespace-nowrap">
                          {item.size}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 leading-relaxed short:text-sm">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 short:mt-4 text-center">
          <div className="inline-block group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
            <button className="relative px-10 short:px-6 py-5 short:py-2 bg-black rounded-2xl text-white font-bold text-xl short:text-sm">
              {locale === "en" ? "Feel free to contact us" : "お気軽にお問い合わせください"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
