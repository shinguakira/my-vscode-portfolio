"use client"

import { FileText, Globe, HelpCircle, PanelBottom, Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { adjustBrightness } from "@/lib/color-utils"

interface TitleBarProps {
  terminalOpen: boolean
  setTerminalOpen: (open: boolean) => void
  searchQuery: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setSearchMode: (mode: boolean) => void
  onHelpClick?: () => void
}

export function TitleBar({
  terminalOpen,
  setTerminalOpen,
  searchQuery,
  handleSearchChange,
  setSearchMode,
  onHelpClick,
}: TitleBarProps) {
  const locale = useLocale()
  const { accentColor, bgMain, bgTitleBar, textPrimary, textSecondary } = useTheme()
  return (
    <div
      className="h-6 sm:h-7 md:h-9 flex items-center justify-between px-1 sm:px-2 md:px-4 text-[9px] sm:text-[10px] md:text-[13px] border-b shrink-0"
      style={{ backgroundColor: bgTitleBar, borderColor: bgMain, color: textPrimary }}
    >
      {/* 左側: アプリ名 */}
      <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 min-w-0">
        <FileText
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 shrink-0"
          style={{ color: accentColor }}
        />
        <span className="font-semibold text-[8px] sm:text-[10px] md:text-[13px] truncate">
          Portfolio
        </span>
        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className="p-0.5 sm:p-1 rounded hover:bg-white/10 transition-colors shrink-0"
          title={
            terminalOpen
              ? locale === "en"
                ? "Close Panel"
                : "パネルを閉じる"
              : locale === "en"
                ? "Open Panel"
                : "パネルを開く"
          }
          style={{ color: textSecondary }}
        >
          <PanelBottom className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
        </button>
        {onHelpClick && (
          <button
            onClick={onHelpClick}
            className="p-0.5 sm:p-1 rounded hover:bg-white/10 transition-colors shrink-0"
            title={locale === "en" ? "Help" : "ヘルプ"}
            style={{ color: textSecondary }}
            data-tutorial="help-button"
          >
            <HelpCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
          </button>
        )}
      </div>

      {/* 中央: 検索ボックス */}
      <div className="flex-1 max-w-xl mx-1 sm:mx-2 md:mx-4 flex justify-center">
        <div className="w-full max-w-[120px] sm:max-w-[180px] md:max-w-[400px] relative">
          <Search className="absolute left-1.5 sm:left-2 top-0.5 sm:top-1 md:top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 opacity-50" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setSearchMode(true)}
            placeholder={locale === "en" ? "Search" : "検索"}
            className="w-full pl-5 sm:pl-6 md:pl-8 pr-1 sm:pr-2 md:pr-3 py-0.5 text-[8px] sm:text-[10px] md:text-xs rounded border outline-none transition-all text-center focus:text-left"
            style={{
              backgroundColor: adjustBrightness(bgMain, 10),
              color: textPrimary,
              borderColor: adjustBrightness(bgMain, 20),
              caretColor: accentColor,
            }}
            onFocusCapture={(e) => {
              e.currentTarget.style.borderColor = accentColor
              e.currentTarget.style.backgroundColor = adjustBrightness(bgMain, 15)
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = adjustBrightness(bgMain, 20)
              e.currentTarget.style.backgroundColor = adjustBrightness(bgMain, 10)
            }}
          />
        </div>
      </div>

      {/* 右側: 言語切替 + ウィンドウ操作ボタン風 */}
      <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-4">
        <LanguageToggle />
        <div className="hidden lg:flex items-center gap-3">
          <div className="p-1 opacity-50">
            <div className="w-3.5 h-3.5 border border-current rounded-sm flex flex-col justify-end">
              <div className="h-[2px] w-full bg-current opacity-70"></div>
            </div>
          </div>
          <div className="p-1 opacity-50">
            <div className="w-3.5 h-3.5 grid grid-cols-2 gap-[1px]">
              <div className="border border-current rounded-[1px]"></div>
              <div className="border border-current rounded-[1px] opacity-50"></div>
            </div>
          </div>
          <div className="p-1 opacity-50">
            <div className="w-3.5 h-3.5 border border-current rounded-sm opacity-70"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { textPrimary, textSecondary } = useTheme()

  const switchLocale = () => {
    const nextLocale = locale === "ja" ? "en" : "ja"
    const segments = pathname.split("/")
    segments[1] = nextLocale
    router.push(segments.join("/"))
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-1.5 md:px-2 py-0.5 rounded hover:bg-white/10 transition-colors shrink-0"
      title={locale === "ja" ? "Switch to English" : "日本語に切替"}
      style={{ color: textSecondary }}
    >
      <Globe className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
      <span
        className="text-[8px] sm:text-[9px] md:text-[11px] font-medium"
        style={{ color: textPrimary }}
      >
        {locale === "ja" ? "EN" : "JA"}
      </span>
    </button>
  )
}
