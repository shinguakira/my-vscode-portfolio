"use client"

import { MoveRight, Plus } from "lucide-react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { useChangelogData } from "@/hooks/use-changelog-data"

// API returns nested locale objects {ja: {description}, en: {description}}
// but the TS type says flat {description: string}. Handle both at runtime.
function getChangeDescription(change: Record<string, unknown>, locale: string): string {
  if (typeof change.description === "string") return change.description
  const localized = locale === "ja" ? (change as any).ja : (change as any).en
  return localized?.description ?? ""
}

function versionType(version: string): "major" | "minor" | "patch" {
  const parts = version.split(".")
  const minor = Number(parts[1] ?? 0)
  const patch = Number(parts[2] ?? 0)
  if (minor === 0 && patch === 0) return "major"
  if (patch === 0) return "minor"
  return "patch"
}

export function ChangelogPanel() {
  const locale = useLocale()
  const { accentColor, bgMain, textPrimary, textSecondary, textMuted } = useTheme()
  const { data: changelog, loading, error } = useChangelogData()

  if (loading) {
    return (
      <div className="py-2 px-3">
        <div className="text-[10px] md:text-xs animate-pulse" style={{ color: textMuted }}>
          Loading changelog...
        </div>
      </div>
    )
  }

  if (error || !changelog) {
    return (
      <div className="py-2 px-3">
        <div className="text-[10px] md:text-xs" style={{ color: textMuted }}>
          Failed to load changelog
        </div>
      </div>
    )
  }

  return (
    <div className="py-2">
      <div className="px-2 md:px-3 mb-3">
        <div
          className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider mb-1"
          style={{ color: textSecondary }}
        >
          Changelog
        </div>
        <div className="text-[10px] md:text-xs" style={{ color: textMuted }}>
          Application changelog
        </div>
      </div>

      {changelog.map((entry, idx) => {
        const type = versionType(entry.version)
        const firstDesc = entry.changes[0] ? getChangeDescription(entry.changes[0] as any, locale) : ""
        const title = firstDesc.split("\n")[0].slice(0, 60)
        return (
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
                      type === "major"
                        ? "#22c55e"
                        : type === "minor"
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
                      color: type === "major" ? "#22c55e" : accentColor,
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
                  {title}
                </div>
                <div className="mt-2 space-y-1">
                  {entry.changes.slice(0, 3).map((change, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-1.5 text-[10px] md:text-xs"
                      style={{ color: textMuted }}
                    >
                      {change.type === "feature" && (
                        <Plus className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-500 shrink-0 mt-0.5" />
                      )}
                      {change.type === "improvement" && (
                        <MoveRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-blue-500 shrink-0 mt-0.5" />
                      )}
                      {change.type === "bugfix" && (
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 text-yellow-500 shrink-0 mt-0.5 font-bold text-center">
                          !
                        </div>
                      )}
                      <span className="line-clamp-1">{getChangeDescription(change as any, locale)}</span>
                    </div>
                  ))}
                  {entry.changes.length > 3 && (
                    <div className="text-[9px] md:text-[10px] pl-4" style={{ color: textMuted }}>
                      +{entry.changes.length - 3} more
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
