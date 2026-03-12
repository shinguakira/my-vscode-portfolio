"use client"

import { Bell, Calendar, X } from "lucide-react"
import { useEffect, useRef } from "react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { useNotificationsData } from "@/hooks/use-notifications-data"

interface NotificationPopupProps {
  open: boolean
  onClose: () => void
  onOpenFile?: () => void
  position?: "top" | "bottom"
}

export function NotificationPopup({
  open,
  onClose,
  onOpenFile,
  position = "bottom",
}: NotificationPopupProps) {
  const locale = useLocale()
  const { bgSidebar, textPrimary, textSecondary, textMuted, accentColor } = useTheme()
  const { data: notifications, loading } = useNotificationsData()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open, onClose])

  if (!open) return null

  const t =
    locale === "en"
      ? {
          title: "Notifications",
          empty: "No notifications",
          viewAll: "View All",
          loading: "Loading...",
        }
      : {
          title: "お知らせ",
          empty: "お知らせはありません",
          viewAll: "すべて表示",
          loading: "読み込み中...",
        }

  return (
    <div
      ref={ref}
      className={`absolute right-0 w-80 max-h-96 rounded-md shadow-2xl border border-white/10 overflow-hidden z-50 ${
        position === "top" ? "top-full mt-1" : "bottom-full mb-1"
      }`}
      style={{ backgroundColor: bgSidebar }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <span className="text-xs font-semibold" style={{ color: textPrimary }}>
          {t.title}
        </span>
        <button onClick={onClose} className="hover:opacity-70 transition-opacity">
          <X className="w-3.5 h-3.5" style={{ color: textMuted }} />
        </button>
      </div>

      <div className="overflow-y-auto max-h-72">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-xs" style={{ color: textMuted }}>
              {t.loading}
            </p>
          </div>
        ) : !notifications || notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Bell className="w-8 h-8 mb-2" style={{ color: textMuted }} />
            <p className="text-xs" style={{ color: textMuted }}>
              {t.empty}
            </p>
          </div>
        ) : (
          notifications.map((item, i) => (
            <div
              key={i}
              className="px-3 py-2.5 border-b border-white/5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${accentColor}33` }}
                >
                  <Bell className="w-3.5 h-3.5" style={{ color: accentColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium leading-snug mb-0.5"
                    style={{ color: textPrimary }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-[11px] leading-relaxed mb-1 line-clamp-2"
                    style={{ color: textSecondary }}
                  >
                    {item.content}
                  </p>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" style={{ color: textMuted }} />
                    <span className="text-[10px]" style={{ color: textMuted }}>
                      {new Date(item.date).toLocaleDateString(locale === "en" ? "en-US" : "ja-JP")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications && notifications.length > 0 && onOpenFile && (
        <div className="px-3 py-2 border-t border-white/10">
          <button
            onClick={() => {
              onOpenFile()
              onClose()
            }}
            className="w-full text-center text-xs py-1 rounded hover:bg-white/10 transition-colors"
            style={{ color: accentColor }}
          >
            {t.viewAll}
          </button>
        </div>
      )}
    </div>
  )
}
