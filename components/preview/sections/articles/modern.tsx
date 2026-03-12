"use client"

import { ExternalLink, Heart, MessageCircle, Tag } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useArticlesData } from "@/hooks/use-articles-data"

export function ModernArticles() {
  const locale = useLocale()
  const { data, loading, error } = useArticlesData()

  if (loading) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? undefined} />

  const t =
    locale === "en"
      ? { title: "Articles", sub: "Technical blog posts", total: "articles published" }
      : { title: "記事", sub: "技術ブログ投稿", total: "件の記事を公開中" }

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">{t.sub}</p>
          <p className="text-sm text-slate-500 mt-2">
            {data.totalCount} {t.total}
          </p>
        </div>

        <div className="space-y-4 short:space-y-2">
          {data.articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="rounded-xl p-6 short:p-3 bg-slate-900/50 border border-slate-800 backdrop-blur hover:border-emerald-500/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg short:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2 short:mb-1">
                      {article.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3 short:mb-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag.name}
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        >
                          <Tag className="w-3 h-3" />
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>
                        {new Date(article.created_at).toLocaleDateString(
                          locale === "en" ? "en-US" : "ja-JP",
                        )}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5" />
                        {article.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {article.comments_count}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
