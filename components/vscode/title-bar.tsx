"use client"

import { Bell, Download, FileText, Globe, HelpCircle, PanelBottom, Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { useNotificationsData } from "@/hooks/use-notifications-data"
import { usePwaInstall } from "@/hooks/use-pwa-install"
import { adjustBrightness } from "@/lib/color-utils"

import { NotificationPopup } from "./notification-popup"

interface TitleBarProps {
  terminalOpen: boolean
  setTerminalOpen: (open: boolean) => void
  searchQuery: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setSearchMode: (mode: boolean) => void
  onHelpClick?: () => void
  onOpenNotifications?: () => void
}

export function TitleBar({
  terminalOpen,
  setTerminalOpen,
  searchQuery,
  handleSearchChange,
  setSearchMode,
  onHelpClick,
  onOpenNotifications,
}: TitleBarProps) {
  const locale = useLocale()
  const { accentColor, bgMain, bgTitleBar, textPrimary, textSecondary } = useTheme()
  const [bellOpen, setBellOpen] = useState(false)
  const { data: notifications } = useNotificationsData()
  const hasNotifications = notifications && notifications.length > 0
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

      {/* 右側: インストール + 通知 + 言語切替 + ウィンドウ操作ボタン風 */}
      <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-4">
        <PwaInstallButton />
        <div className="relative">
          <button
            onClick={() => setBellOpen((v) => !v)}
            className="p-0.5 sm:p-1 rounded hover:bg-white/10 transition-colors shrink-0 relative"
            title={locale === "en" ? "Notifications" : "お知らせ"}
            style={{ color: textSecondary }}
          >
            <Bell className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
            {hasNotifications && (
              <span
                className="absolute top-0 right-0 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-current"
                style={{ backgroundColor: accentColor, borderColor: bgTitleBar }}
              />
            )}
          </button>
          <NotificationPopup
            open={bellOpen}
            onClose={() => setBellOpen(false)}
            onOpenFile={onOpenNotifications}
            position="top"
          />
        </div>
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

function PwaInstallButton() {
  const locale = useLocale()
  const { canInstall, isInstalled, isIOS, install } = usePwaInstall()
  const { textSecondary, accentColor, bgMain } = useTheme()
  const [showIOSTip, setShowIOSTip] = useState(false)

  if (isInstalled) return null

  // Android / Chrome: native install prompt
  if (canInstall) {
    return (
      <button
        onClick={install}
        className="p-0.5 sm:p-1 rounded hover:bg-white/10 transition-colors shrink-0"
        title={locale === "en" ? "Install App" : "アプリをインストール"}
        style={{ color: textSecondary }}
      >
        <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
      </button>
    )
  }

  // iOS: show tip to add to home screen
  if (isIOS) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowIOSTip((v) => !v)}
          className="p-0.5 sm:p-1 rounded hover:bg-white/10 transition-colors shrink-0"
          title={locale === "en" ? "Install App" : "アプリをインストール"}
          style={{ color: textSecondary }}
        >
          <Download className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
        </button>
        {showIOSTip && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowIOSTip(false)} />
            <div
              className="absolute right-0 top-full mt-1 z-50 p-3 rounded-md shadow-lg border text-[10px] sm:text-xs w-48 sm:w-56"
              style={{
                backgroundColor: bgMain,
                borderColor: accentColor,
                color: textSecondary,
              }}
            >
              <p className="leading-relaxed">
                {locale === "en" ? (
                  <>
                    Tap the <strong>Share</strong> button, then select{" "}
                    <strong>&quot;Add to Home Screen&quot;</strong> to install this app.
                  </>
                ) : (
                  <>
                    <strong>共有</strong>ボタンをタップし、
                    <strong>「ホーム画面に追加」</strong>を選択してインストールできます。
                  </>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    )
  }

  return null
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
