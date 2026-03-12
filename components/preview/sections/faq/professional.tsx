"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useFaqData } from "@/hooks/use-faq-data"

export function ProfessionalFaq() {
  const locale = useLocale()
  const { data: faqItems, loading, error } = useFaqData()

  if (loading) return <LoadingState />
  if (error || !faqItems) return <ErrorState message={error ?? undefined} />

  // Group by category
  const categories = new Map<string, typeof faqItems>()
  for (const item of faqItems) {
    const cat = item.category || "Other"
    const list = categories.get(cat) ?? []
    list.push(item)
    categories.set(cat, list)
  }

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-full mx-auto px-4 short:px-2 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Frequently Asked Questions" : "よくある質問"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">
            {locale === "en" ? "" : "Frequently Asked Questions"}
          </p>
        </div>

        <div className="space-y-0">
          {Array.from(categories.entries()).map(([category, items]) => (
            <div key={category} className="mb-12 short:mb-4">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
                {category}
              </h2>
              <div className="space-y-6">
                {items.map((item, i) => (
                  <div key={i} className="grid md:grid-cols-12 gap-4">
                    <div className="md:col-span-5">
                      <p className="font-medium text-gray-900">{item.question}</p>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-gray-600 leading-relaxed text-sm">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-12 short:pt-4 text-center">
          <p className="text-gray-600 mb-6">
            {locale === "en"
              ? "If you have any other questions, feel free to contact us."
              : "その他ご不明点がございましたら、お気軽にお問い合わせください。"}
          </p>
          <button className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
            {locale === "en" ? "Contact us" : "お問い合わせ"}
          </button>
        </div>
      </div>
    </div>
  )
}
