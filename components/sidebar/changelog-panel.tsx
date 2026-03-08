"use client"

import { Minus, MoveRight, Plus } from "lucide-react"

import { getChangelog } from "@/constants/portfolio-data"
import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"

export function ChangelogPanel() {
  const locale = useLocale()
  const { accentColor, bgMain, textPrimary, textSecondary, textMuted } = useTheme()
  const changelog = getChangelog(locale)
  return (
    <div className="py-2">
      <div className="px-2 md:px-3 mb-3">
        <div
          className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider mb-1"
          style={{ color: textSecondary }}
        >
          {locale === "en" ? "Changelog" : "Changelog"}
        </div>
        <div className="text-[10px] md:text-xs" style={{ color: textMuted }}>
          {locale === "en" ? "Application changelog" : "アプリの変更履歴"}
        </div>
      </div>

      {changelog.map((entry, idx) => (
        <div
          key={entry.version}
          className="px-2 md:px-3 py-2 md:py-3 border-b relative"
          style={{ borderColor: bgMain }}
        >
          {idx < changelog.length - 1 && (
            <div className="absolute left-[15px] md:left-[19px] top-10 bottom-[-12px] w-[2px] bg-gray-700 opacity-30" />
          )}
          <div className="flex gap-2 md:gap-3">
            <div className="flex flex-col items-center mt-1">
              <div
                className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full z-10"
                style={{
                  backgroundColor:
                    entry.type === "major"
                      ? "#22c55e"
                      : entry.type === "minor"
                        ? accentColor
                        : "#6b7280",
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span
                  className="text-[10px] md:text-xs font-mono font-semibold"
                  style={{
                    color: entry.type === "major" ? "#22c55e" : accentColor,
                  }}
                >
                  v{entry.version}
                </span>
                <span
                  className="text-[9px] md:text-[10px] opacity-50 shrink-0"
                  style={{ color: textSecondary }}
                >
                  {entry.date}
                </span>
              </div>
              <div
                className="font-semibold text-[11px] md:text-sm mt-0.5 truncate"
                style={{ color: textPrimary }}
              >
                {entry.title}
              </div>
              <div className="mt-2 space-y-1">
                {entry.changes.slice(0, 3).map((change, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-1.5 text-[10px] md:text-xs"
                    style={{ color: textMuted }}
                  >
                    {change.type === "added" && (
                      <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 shrink-0 mt-0.5" />
                    )}
                    {change.type === "improved" && (
                      <MoveRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-500 shrink-0 mt-0.5" />
                    )}
                    {change.type === "fixed" && (
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-500 shrink-0 mt-0.5 font-bold text-center">
                        !
                      </div>
                    )}
                    {change.type === "removed" && (
                      <Minus className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <span className="line-clamp-1">{change.description}</span>
                  </div>
                ))}
                {entry.changes.length > 3 && (
                  <div className="text-[9px] md:text-[10px] pl-4" style={{ color: textMuted }}>
                    {locale === "en"
                      ? `+${entry.changes.length - 3} more`
                      : `他${entry.changes.length - 3}件`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
