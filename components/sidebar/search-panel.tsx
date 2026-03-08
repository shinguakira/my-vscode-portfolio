"use client"

import type React from "react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { adjustBrightness } from "@/lib/color-utils"
import type { SearchResult } from "@/types"

interface SearchPanelProps {
  searchQuery: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchResults: SearchResult[]
  openSearchResult: (result: SearchResult) => void
}

export function SearchPanel({
  searchQuery,
  handleSearchChange,
  searchResults,
  openSearchResult,
}: SearchPanelProps) {
  const locale = useLocale()
  const { accentColor, bgMain, bgHover, textPrimary, textSecondary, textMuted } = useTheme()
  return (
    <div className="px-2 py-2 flex flex-col gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={locale === "en" ? "Search..." : "検索..."}
        className="w-full px-2 md:px-3 py-1.5 md:py-2 text-[11px] md:text-sm rounded border outline-none focus:ring-1"
        style={{
          backgroundColor: bgMain,
          color: textPrimary,
          borderColor: adjustBrightness(bgMain, 30),
          caretColor: accentColor,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = accentColor
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = adjustBrightness(bgMain, 30)
        }}
      />

      <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
        {searchResults.length === 0 && searchQuery && (
          <div className="px-2 py-4 text-[11px] md:text-sm" style={{ color: textMuted }}>
            {locale === "en" ? "No results found" : "結果が見つかりませんでした"}
          </div>
        )}

        {searchResults.map((result, idx) => (
          <div key={idx} className="mb-3">
            <button
              onClick={() => openSearchResult(result)}
              className="flex items-center gap-2 px-2 py-1 text-[11px] md:text-sm font-medium w-full text-left rounded"
              style={{ color: textPrimary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = bgHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <span>{result.file.icon}</span>
              <span className="truncate">{result.path.join("/")}</span>
              <span
                className="ml-auto text-[10px] md:text-xs px-1 md:px-1.5 py-0.5 rounded shrink-0"
                style={{ backgroundColor: bgHover, color: textSecondary }}
              >
                {result.matches.length}
              </span>
            </button>

            <div className="ml-4 md:ml-6 mt-1">
              {result.matches.slice(0, 3).map((match, matchIdx) => (
                <div
                  key={matchIdx}
                  className="text-[10px] md:text-xs py-1 px-2 mb-1 rounded cursor-pointer truncate"
                  style={{ color: textSecondary }}
                  onClick={() => openSearchResult(result)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = bgHover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                >
                  <span style={{ color: textMuted }}>{match.line}:</span>{" "}
                  {match.text.substring(0, match.matchIndex)}
                  <span
                    style={{
                      backgroundColor: accentColor + "30",
                      color: accentColor,
                    }}
                  >
                    {match.text.substring(match.matchIndex, match.matchIndex + searchQuery.length)}
                  </span>
                  {match.text.substring(match.matchIndex + searchQuery.length)}
                </div>
              ))}
              {result.matches.length > 3 && (
                <div className="text-[10px] md:text-xs px-2 py-1" style={{ color: textMuted }}>
                  {locale === "en"
                    ? `+${result.matches.length - 3} more matches...`
                    : `+${result.matches.length - 3} 件の一致...`}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
