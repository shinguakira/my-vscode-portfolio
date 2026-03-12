"use client"

import { ExternalLink, Heart, MessageCircle, Tag } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useArticlesData } from "@/hooks/use-articles-data"

export function ProfessionalArticles() {
  const locale = useLocale()
  const { data, loading, error } = useArticlesData()

  if (loading) return <LoadingState />
  if (error || !data) return <ErrorState message={error ?? undefined} />

  const t = locale === "en"
    ? { title: "Articles", sub: "Technical Blog Posts", total: "articles published" }
    : { title: "記事一覧", sub: "技術ブログ投稿", total: "件の記事を公開" }

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto px-8 short:px-4 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {t.title}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">{t.sub}</p>
          <p className="text-sm text-gray-400 mt-2">{data.totalCount} {t.total}</p>
        </div>

        <div className="divide-y divide-gray-100">
          {data.articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group py-6 short:py-3 first:pt-0"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg short:text-base font-medium text-gray-900 group-hover:text-blue-700 transition-colors mb-2 short:mb-1">
                    {article.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-3 short:mb-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        <Tag className="w-3 h-3" />
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{new Date(article.created_at).toLocaleDateString(locale === "en" ? "en-US" : "ja-JP")}</span>
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
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors shrink-0 mt-1.5" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
