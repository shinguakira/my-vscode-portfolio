"use client"

import { ExternalLink, Heart, MessageCircle, Tag } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useArticlesData } from "@/hooks/use-articles-data"

export function InnovativeArticles() {
  const locale = useLocale()
  const { data, loading, error } = useArticlesData()

  if (loading) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? undefined} />

  const t = locale === "en"
    ? { title: "ARTICLES", sub: "Technical Writing", total: "Published" }
    : { title: "ARTICLES", sub: "技術記事", total: "件公開" }

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 short:px-2 py-20 short:py-6">
        <div className="text-center mb-16 short:mb-4">
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
            {t.title}
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 font-light">{t.sub}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-emerald-400 font-bold text-lg">{data.totalCount}</span>
            <span className="text-gray-400 text-sm">{t.total}</span>
          </div>
        </div>

        <div className="space-y-6 short:space-y-3">
          {data.articles.map((article, i) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
              <div className="relative bg-black border border-gray-800 rounded-2xl p-5 short:p-2 group-hover:border-emerald-500/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-5 flex-1 min-w-0">
                    <div className="text-3xl short:text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-teal-600 shrink-0 w-10 text-center">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl short:text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-3 short:mb-1">
                        {article.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4 short:mb-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag.name}
                            className="inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-semibold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30"
                          >
                            <Tag className="w-3 h-3" />
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-5 text-sm text-gray-500">
                        <span>{new Date(article.created_at).toLocaleDateString(locale === "en" ? "en-US" : "ja-JP")}</span>
                        <span className="flex items-center gap-1.5 text-pink-400/70">
                          <Heart className="w-4 h-4" />
                          {article.likes_count}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4" />
                          {article.comments_count}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
