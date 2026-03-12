"use client"

import { Bell, Calendar } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useNotificationsData } from "@/hooks/use-notifications-data"

export function InnovativeNotifications() {
  const locale = useLocale()
  const { data: notifications, loading, error } = useNotificationsData()

  if (loading) return <LoadingState />
  if (error || !notifications) return <ErrorState message={error ?? undefined} />

  const t =
    locale === "en"
      ? { title: "NOTIFICATIONS", sub: "What's New", empty: "No notifications yet" }
      : { title: "NOTIFICATIONS", sub: "最新情報", empty: "お知らせはまだありません" }

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 short:px-2 py-20 short:py-6">
        <div className="text-center mb-16 short:mb-4">
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400">
            {t.title}
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 font-light">{t.sub}</p>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">{t.empty}</p>
          </div>
        ) : (
          <div className="space-y-6 short:space-y-3">
            {notifications.map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-black border border-gray-800 rounded-2xl p-5 short:p-2">
                  <div className="flex items-start gap-6 short:gap-3">
                    <div className="w-14 h-14 short:w-10 short:h-10 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center shrink-0">
                      <Bell className="w-7 h-7 short:w-5 short:h-5 text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl short:text-base font-bold text-white mb-3 short:mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-4 short:mb-2 short:text-sm">
                        {item.content}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(item.date).toLocaleDateString(
                            locale === "en" ? "en-US" : "ja-JP",
                          )}
                        </span>
                      </div>
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
