"use client"

import { Bell, Calendar } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useNotificationsData } from "@/hooks/use-notifications-data"

export function ProfessionalNotifications() {
  const locale = useLocale()
  const { data: notifications, loading, error } = useNotificationsData()

  if (loading) return <LoadingState />
  if (error || !notifications) return <ErrorState message={error ?? undefined} />

  const t =
    locale === "en"
      ? {
          title: "Notifications",
          sub: "Updates & Announcements",
          empty: "No notifications at this time.",
        }
      : { title: "お知らせ", sub: "更新情報・アナウンス", empty: "現在お知らせはありません。" }

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {t.title}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">{t.sub}</p>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">{t.empty}</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((item, i) => (
              <div key={i} className="py-8 short:py-4 first:pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <time className="text-sm text-gray-400">
                    {new Date(item.date).toLocaleDateString(locale === "en" ? "en-US" : "ja-JP")}
                  </time>
                </div>
                <h3 className="text-lg short:text-base font-medium text-gray-900 mb-2 short:mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
