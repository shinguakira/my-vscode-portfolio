"use client"

import { Calendar, ExternalLink, RefreshCw } from "lucide-react"
import { useState } from "react"

import { useLocale } from "@/contexts/locale-context"

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "shinguakira1022@gmail.com"

export function InnovativeSchedule() {
  const locale = useLocale()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const t = locale === "en"
    ? { title: "SCHEDULE", sub: "My Availability", loading: "Loading calendar...", error: "Unable to load calendar", refresh: "Refresh", open: "Open Full Calendar", tz: "Timezone: Asia/Tokyo (JST)", note: "Feel free to contact me to schedule a meeting." }
    : { title: "SCHEDULE", sub: "空き状況", loading: "カレンダーを読み込み中...", error: "カレンダーを読み込めませんでした", refresh: "更新", open: "フルカレンダーを開く", tz: "タイムゾーン: Asia/Tokyo (JST)", note: "ミーティングのスケジュールについてはお気軽にお問い合わせください。" }

  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=Asia%2FTokyo`

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <div className="text-center mb-14 short:mb-6">
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400">
            {t.title}
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 font-light">{t.sub}</p>
          <p className="text-sm text-gray-600 mt-2">{t.tz}</p>
        </div>

        <div className="flex justify-center gap-4 mb-8 short:mb-4">
          <button
            onClick={() => window.location.reload()}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:bg-gray-800 transition text-sm font-medium disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            {t.refresh}
          </button>
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition" />
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 px-5 py-2.5 bg-black rounded-xl text-white font-bold text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              {t.open}
            </a>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-20" />
          <div className="relative bg-black border border-gray-800 rounded-2xl overflow-hidden">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/90">
                <div className="text-center">
                  <Calendar className="w-10 h-10 text-green-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-400">{t.loading}</p>
                </div>
              </div>
            )}
            {error ? (
              <div className="flex items-center justify-center h-96 bg-black">
                <div className="text-center">
                  <p className="text-red-400 mb-4">{t.error}</p>
                  <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-gray-300 hover:bg-gray-800 transition text-sm">
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
                onLoad={() => { setLoading(false); setError(false) }}
                onError={() => { setLoading(false); setError(true) }}
              />
            )}
          </div>
        </div>

        {!error && !loading && (
          <p className="text-center text-gray-500 text-sm mt-8">{t.note}</p>
        )}
      </div>
    </div>
  )
}
