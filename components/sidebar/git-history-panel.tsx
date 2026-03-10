"use client"

import { GitCommitHorizontal, Plus } from "lucide-react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { useExperienceData } from "@/hooks/use-experience-data"

function generateHash(company: string, index: number): string {
  // Use a simple numeric hash to avoid btoa failures with non-ASCII characters
  let h = 0
  const str = `${company}-${index}`
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(h).toString(16).padStart(7, "0").slice(0, 7)
}

export function GitHistoryPanel() {
  const locale = useLocale()
  const { accentColor, textPrimary, textSecondary, textMuted } = useTheme()
  const { data, loading, error } = useExperienceData()

  if (loading) return <div className="py-2 px-3"><div className="text-[10px] md:text-xs animate-pulse" style={{ color: textMuted }}>Loading...</div></div>
  if (error || !data) return <div className="py-2 px-3"><div className="text-[10px] md:text-xs" style={{ color: textMuted }}>Failed to load</div></div>

  return (
    <div className="py-2">
      {data.map((experience, index) => {
        const hash = generateHash(experience.company, index)
        const message = experience.projectOverview || experience.role
        const changes = experience.description

        return (
          <div
            key={hash}
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
                    {hash}
                  </span>
                  <span
                    className="text-[9px] md:text-[10px] opacity-50"
                    style={{ color: textSecondary }}
                  >
                    {experience.period}
                  </span>
                </div>
                <div
                  className="font-semibold text-[11px] md:text-sm mt-0.5 truncate"
                  style={{ color: textPrimary }}
                >
                  {message}
                </div>
                <div
                  className="text-[10px] md:text-xs mt-1 flex items-center gap-1 flex-wrap"
                  style={{ color: textSecondary }}
                >
                  <GitCommitHorizontal className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  <span className="truncate">{experience.company}</span>
                  <span className="opacity-50">|</span>
                  <span className="truncate">{experience.role}</span>
                </div>
                <div className="mt-2 space-y-1">
                  {changes.slice(0, 2).map((change, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-1.5 text-[10px] md:text-xs"
                      style={{ color: textMuted }}
                    >
                      <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{change}</span>
                    </div>
                  ))}
                  {changes.length > 2 && (
                    <div className="text-[9px] md:text-[10px] pl-4" style={{ color: textMuted }}>
                      {locale === "en"
                        ? `+${changes.length - 2} more`
                        : `他${changes.length - 2}件`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
