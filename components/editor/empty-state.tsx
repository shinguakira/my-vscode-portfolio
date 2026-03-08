"use client"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"

export function EmptyState() {
  const locale = useLocale()
  const { textPrimary } = useTheme()

  return (
    <div
      className="h-full flex flex-col items-center justify-center text-opacity-30 select-none px-4"
      style={{ color: textPrimary }}
    >
      <div className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 mb-2 md:mb-4 opacity-20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>
      <p className="text-[10px] md:text-xs lg:text-sm text-center">
        {locale === "en" ? "Select a file to open" : "ファイルを選択して開く"}
      </p>
      <p className="text-[8px] md:text-[10px] lg:text-xs mt-1 md:mt-2 opacity-50">
        {locale === "en" ? "⌘P to search files" : "⌘P でファイルを検索"}
      </p>
    </div>
  )
}
