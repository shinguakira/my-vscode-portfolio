"use client"

import { Calendar, ExternalLink, RefreshCw } from "lucide-react"
import { useState } from "react"

import { useLocale } from "@/contexts/locale-context"

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "shinguakira1022@gmail.com"

export function ProfessionalSchedule() {
  const locale = useLocale()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const t =
    locale === "en"
      ? {
          title: "Schedule",
          sub: "Availability & Calendar",
          loading: "Loading calendar...",
          error: "Unable to load calendar",
          refresh: "Refresh",
          open: "Open Full Calendar",
          tz: "Timezone: Asia/Tokyo (JST)",
          note: "Feel free to contact me to schedule a meeting or discuss availability.",
        }
      : {
          title: "スケジュール",
          sub: "空き状況カレンダー",
          loading: "カレンダーを読み込み中...",
          error: "カレンダーを読み込めませんでした",
          refresh: "更新",
          open: "フルカレンダーを開く",
          tz: "タイムゾーン: Asia/Tokyo (JST)",
          note: "ミーティングのスケジュールについてはお気軽にお問い合わせください。",
        }

  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=Asia%2FTokyo`

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-24 short:py-8">
        <div className="mb-12 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {t.title}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">{t.sub}</p>
          <p className="text-sm text-gray-400 mt-2">{t.tz}</p>
        </div>

        <div className="flex justify-center gap-3 mb-8 short:mb-4">
          <button
            onClick={() => window.location.reload()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            {t.refresh}
          </button>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            {t.open}
          </a>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-3 animate-pulse" />
                  <p className="text-gray-500 text-sm">{t.loading}</p>
                </div>
              </div>
            )}
            {error ? (
              <div className="flex items-center justify-center h-96 bg-gray-50">
                <div className="text-center">
                  <p className="text-red-600 mb-4">{t.error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm"
                  >
                    {t.refresh}
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                src={calendarUrl}
                style={{ border: 0 }}
                width="100%"
                className="h-96 md:h-[600px] w-full"
                title={t.title}
                onLoad={() => {
                  setLoading(false)
                  setError(false)
                }}
                onError={() => {
                  setLoading(false)
                  setError(true)
                }}
              />
            )}
          </div>
        </div>

        {!error && !loading && <p className="text-center text-gray-500 text-sm mt-8">{t.note}</p>}
      </div>
    </div>
  )
}
