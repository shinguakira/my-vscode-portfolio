"use client"

import { Calendar, ExternalLink, RefreshCw } from "lucide-react"
import { useState } from "react"

import { useLocale } from "@/contexts/locale-context"

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "shinguakira1022@gmail.com"

export function ModernSchedule() {
  const locale = useLocale()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const t = locale === "en"
    ? { title: "Schedule", sub: "View my availability", loading: "Loading calendar...", error: "Unable to load calendar", refresh: "Refresh", open: "Open Full Calendar", tz: "Timezone: Asia/Tokyo (JST)", note: "Feel free to contact me to schedule a meeting." }
    : { title: "スケジュール", sub: "空き状況をご確認いただけます", loading: "カレンダーを読み込み中...", error: "カレンダーを読み込めませんでした", refresh: "更新", open: "フルカレンダーを開く", tz: "タイムゾーン: Asia/Tokyo (JST)", note: "ミーティングのスケジュールについてはお気軽にお問い合わせください。" }

  const calendarUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(CALENDAR_ID)}&ctz=Asia%2FTokyo`

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-16 short:py-6">
        <div className="mb-10 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">{t.sub}</p>
          <p className="text-sm text-slate-500 mt-2">{t.tz}</p>
        </div>

        <div className="flex justify-center gap-3 mb-6 short:mb-3">
          <button
            onClick={() => window.location.reload()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition text-sm disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            {t.refresh}
          </button>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            {t.open}
          </a>
        </div>

        <div className="rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur overflow-hidden">
          <div className="relative">
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/90">
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3 animate-pulse" />
                  <p className="text-slate-400 text-sm">{t.loading}</p>
                </div>
              </div>
            )}
            {error ? (
              <div className="flex items-center justify-center h-96 bg-slate-900/50">
                <div className="text-center">
                  <p className="text-red-400 mb-4">{t.error}</p>
                  <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition text-sm">
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
          <p className="text-center text-slate-500 text-sm mt-6">{t.note}</p>
        )}
      </div>
    </div>
  )
}
