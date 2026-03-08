"use client"

import { GitCommitHorizontal, Plus } from "lucide-react"

import { getGitHistory } from "@/constants/portfolio-data"
import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"

export function GitHistoryPanel() {
  const locale = useLocale()
  const { accentColor, textPrimary, textSecondary, textMuted } = useTheme()
  const gitHistory = getGitHistory(locale)
  return (
    <div className="py-2">
      {gitHistory.map((commit) => (
        <div
          key={commit.hash}
          className="px-2 md:px-3 py-2 md:py-3 border-b border-opacity-10 relative"
        >
          <div className="absolute left-[15px] md:left-[19px] top-8 bottom-[-20px] w-[2px] bg-gray-700 opacity-30 last:hidden"></div>
          <div className="flex gap-2 md:gap-3">
            <div className="flex flex-col items-center mt-1">
              <div
                className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full z-10"
                style={{ backgroundColor: accentColor }}
              ></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] md:text-xs font-mono opacity-70"
                  style={{ color: accentColor }}
                >
                  {commit.hash}
                </span>
                <span
                  className="text-[9px] md:text-[10px] opacity-50"
                  style={{ color: textSecondary }}
                >
                  {commit.date}
                </span>
              </div>
              <div
                className="font-semibold text-[11px] md:text-sm mt-0.5 truncate"
                style={{ color: textPrimary }}
              >
                {commit.message}
              </div>
              <div
                className="text-[10px] md:text-xs mt-1 flex items-center gap-1 flex-wrap"
                style={{ color: textSecondary }}
              >
                <GitCommitHorizontal className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span className="truncate">{commit.company}</span>
                <span className="opacity-50">|</span>
                <span className="truncate">{commit.position}</span>
              </div>
              <div className="mt-2 space-y-1">
                {commit.changes.slice(0, 2).map((change, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-1.5 text-[10px] md:text-xs"
                    style={{ color: textMuted }}
                  >
                    <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{change}</span>
                  </div>
                ))}
                {commit.changes.length > 2 && (
                  <div className="text-[9px] md:text-[10px] pl-4" style={{ color: textMuted }}>
                    {locale === "en"
                      ? `+${commit.changes.length - 2} more`
                      : `他${commit.changes.length - 2}件`}
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
