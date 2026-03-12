"use client"

import { Bell, Calendar } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useNotificationsData } from "@/hooks/use-notifications-data"

export function ModernNotifications() {
  const locale = useLocale()
  const { data: notifications, loading, error } = useNotificationsData()

  if (loading) return <LoadingState />
  if (error || !notifications) return <ErrorState message={error ?? undefined} />

  const t = locale === "en"
    ? { title: "Notifications", sub: "Latest updates and announcements", empty: "No notifications" }
    : { title: "お知らせ", sub: "最新のお知らせ・アナウンス", empty: "お知らせはありません" }

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">{t.sub}</p>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500">{t.empty}</p>
          </div>
        ) : (
          <div className="space-y-4 short:space-y-2">
            {notifications.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-6 short:p-3 bg-slate-900/50 border border-slate-800 backdrop-blur hover:border-violet-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 short:mb-1">
                      <h3 className="text-lg short:text-base font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed mb-3 short:mb-1 short:text-sm">{item.content}</p>
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.date).toLocaleDateString(locale === "en" ? "en-US" : "ja-JP")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
