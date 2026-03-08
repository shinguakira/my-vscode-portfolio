"use client"

import { X } from "lucide-react"
import React, { useEffect, useState } from "react"

import { getPreviewThemes, getThemePresets } from "@/constants/vscode-config"
import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { adjustBrightness } from "@/lib/color-utils"
import type { VSCodeSettings } from "@/types"

interface SettingsPanelProps {
  onSave: (newSettings: VSCodeSettings) => void
  onClose: () => void
}

export function SettingsPanel({ onSave, onClose }: SettingsPanelProps) {
  const locale = useLocale()
  const { settings, bgMain, bgActivityBar, textPrimary, textSecondary } = useTheme()
  const THEME_PRESETS = getThemePresets(locale)
  const PREVIEW_THEMES = getPreviewThemes(locale)
  const [localSettings, setLocalSettings] = useState(settings)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth < 640 || window.innerHeight < 400)
    }
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  const handleSave = () => {
    onSave(localSettings)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-1 sm:p-2 md:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-lg shadow-2xl overflow-hidden flex flex-col border ${
          isSmallScreen
            ? "w-[95vw] max-h-[95vh]"
            : "w-full max-w-[95vw] sm:max-w-[500px] md:max-w-[600px] max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh]"
        }`}
        style={{ backgroundColor: bgMain, borderColor: bgActivityBar, color: textPrimary }}
      >
        {/* ヘッダー */}
        <div
          className={`flex items-center justify-between border-b shrink-0 ${isSmallScreen ? "px-2 py-1.5" : "px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4"}`}
          style={{ borderColor: bgActivityBar }}
        >
          <h2
            className={`font-semibold ${isSmallScreen ? "text-xs" : "text-sm sm:text-base md:text-lg"}`}
          >
            {locale === "en" ? "Settings" : "設定"}
          </h2>
          <button
            onClick={onClose}
            className="p-0.5 sm:p-1 rounded transition-colors"
            style={{ color: textSecondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = adjustBrightness(bgMain, 20)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            <X className={isSmallScreen ? "w-3.5 h-3.5" : "w-4 h-4 sm:w-5 sm:h-5"} />
          </button>
        </div>

        {/* コンテンツ */}
        <div className={`overflow-y-auto flex-1 ${isSmallScreen ? "p-2" : "p-2 sm:p-4 md:p-6"}`}>
          <div className={isSmallScreen ? "space-y-2" : "space-y-3 sm:space-y-4 md:space-y-6"}>
            {/* テーマプリセット */}
            <div>
              <label
                className={`block font-medium ${isSmallScreen ? "text-[10px] mb-1" : "text-xs sm:text-sm mb-1.5 sm:mb-2 md:mb-3"}`}
                style={{ color: textPrimary }}
              >
                {locale === "en" ? "Theme Presets" : "テーマプリセット"}
              </label>
              <div
                className={`grid grid-cols-3 ${isSmallScreen ? "gap-1" : "gap-1.5 sm:gap-2 md:gap-3"}`}
              >
                {THEME_PRESETS.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() =>
                      setLocalSettings({
                        ...localSettings,
                        backgroundColor: theme.backgroundColor,
                        textColor: theme.textColor,
                        accentColor: theme.accentColor,
                      })
                    }
                    className={`rounded border-2 transition-all text-left ${isSmallScreen ? "p-1" : "p-1.5 sm:p-2 md:p-3"}`}
                    style={{
                      backgroundColor: theme.backgroundColor,
                      borderColor:
                        localSettings.backgroundColor === theme.backgroundColor
                          ? localSettings.accentColor
                          : "transparent",
                      color: theme.textColor,
                    }}
                  >
                    <div
                      className={`font-medium ${isSmallScreen ? "text-[8px]" : "text-[10px] sm:text-xs md:text-sm"}`}
                    >
                      {theme.name}
                    </div>
                    <div
                      className={`flex gap-0.5 ${isSmallScreen ? "mt-0.5" : "mt-1 sm:mt-1.5 md:mt-2"}`}
                    >
                      <div
                        className={`rounded-full ${isSmallScreen ? "w-2 h-2" : "w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4"}`}
                        style={{ backgroundColor: theme.accentColor }}
                      ></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* カラー設定（スマホ時は折りたたみ表示） */}
            {!isSmallScreen && (
              <>
                {/* 背景色 */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{ color: textPrimary }}
                  >
                    {locale === "en" ? "Background Color" : "背景色"}
                  </label>
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <input
                      type="color"
                      value={localSettings.backgroundColor}
                      onChange={(e) =>
                        setLocalSettings({ ...localSettings, backgroundColor: e.target.value })
                      }
                      className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10 rounded cursor-pointer border"
                      style={{ borderColor: bgActivityBar }}
                    />
                    <input
                      type="text"
                      value={localSettings.backgroundColor}
                      onChange={(e) =>
                        setLocalSettings({ ...localSettings, backgroundColor: e.target.value })
                      }
                      className="flex-1 px-2 py-1 sm:px-3 sm:py-2 rounded border font-mono text-xs sm:text-sm outline-none"
                      style={{
                        backgroundColor: adjustBrightness(bgMain, 10),
                        borderColor: bgActivityBar,
                        color: textPrimary,
                      }}
                    />
                  </div>
                </div>

                {/* 文字色 */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{ color: textPrimary }}
                  >
                    {locale === "en" ? "Text Color" : "文字色"}
                  </label>
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <input
                      type="color"
                      value={localSettings.textColor}
                      onChange={(e) =>
                        setLocalSettings({ ...localSettings, textColor: e.target.value })
                      }
                      className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10 rounded cursor-pointer border"
                      style={{ borderColor: bgActivityBar }}
                    />
                    <input
                      type="text"
                      value={localSettings.textColor}
                      onChange={(e) =>
                        setLocalSettings({ ...localSettings, textColor: e.target.value })
                      }
                      className="flex-1 px-2 py-1 sm:px-3 sm:py-2 rounded border font-mono text-xs sm:text-sm outline-none"
                      style={{
                        backgroundColor: adjustBrightness(bgMain, 10),
                        borderColor: bgActivityBar,
                        color: textPrimary,
                      }}
                    />
                  </div>
                </div>

                {/* アクセントカラー */}
                <div>
                  <label
                    className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
                    style={{ color: textPrimary }}
                  >
                    {locale === "en" ? "Accent Color" : "アクセントカラー"}
                  </label>
                  <div className="flex gap-2 sm:gap-3 items-center">
                    <input
                      type="color"
                      value={localSettings.accentColor}
                      onChange={(e) =>
                        setLocalSettings({ ...localSettings, accentColor: e.target.value })
                      }
                      className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10 rounded cursor-pointer border"
                      style={{ borderColor: bgActivityBar }}
                    />
                    <input
                      type="text"
                      value={localSettings.accentColor}
                      onChange={(e) =>
                        setLocalSettings({ ...localSettings, accentColor: e.target.value })
                      }
                      className="flex-1 px-2 py-1 sm:px-3 sm:py-2 rounded border font-mono text-xs sm:text-sm outline-none"
                      style={{
                        backgroundColor: adjustBrightness(bgMain, 10),
                        borderColor: bgActivityBar,
                        color: textPrimary,
                      }}
                    />
                  </div>
                </div>
              </>
            )}

            {/* フォントサイズ */}
            <div>
              <label
                className={`block font-medium ${isSmallScreen ? "text-[10px] mb-0.5" : "text-xs sm:text-sm mb-1 sm:mb-2"}`}
                style={{ color: textPrimary }}
              >
                {locale === "en" ? "Font Size" : "フォントサイズ"}: {localSettings.fontSize}px
              </label>
              <input
                type="range"
                min="10"
                max="24"
                value={localSettings.fontSize}
                onChange={(e) =>
                  setLocalSettings({ ...localSettings, fontSize: Number(e.target.value) })
                }
                className="w-full"
                style={{
                  accentColor: localSettings.accentColor,
                }}
              />
            </div>

            {/* プレビューテーマ */}
            <div data-tutorial="preview-theme-selector">
              <label
                className={`block font-medium ${isSmallScreen ? "text-[10px] mb-1" : "text-xs sm:text-sm mb-1.5 sm:mb-2 md:mb-3"}`}
                style={{ color: textPrimary }}
              >
                {locale === "en" ? "Preview Theme" : "プレビューテーマ"}
              </label>
              <div
                className={`grid grid-cols-3 ${isSmallScreen ? "gap-1" : "gap-1.5 sm:gap-2 md:gap-3"}`}
              >
                {PREVIEW_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setLocalSettings({ ...localSettings, previewTheme: theme.id })}
                    className={`rounded border-2 transition-all text-left ${isSmallScreen ? "p-1" : "p-1.5 sm:p-2 md:p-4"}`}
                    style={{
                      backgroundColor: adjustBrightness(bgMain, 10),
                      borderColor:
                        localSettings.previewTheme === theme.id
                          ? localSettings.accentColor
                          : bgActivityBar,
                      color: textPrimary,
                    }}
                  >
                    <div
                      className={`font-medium ${isSmallScreen ? "text-[8px]" : "text-[10px] sm:text-xs md:text-sm mb-0.5 sm:mb-1"}`}
                    >
                      {theme.name}
                    </div>
                    {!isSmallScreen && (
                      <div
                        className="text-[9px] sm:text-xs opacity-60"
                        style={{ color: textSecondary }}
                      >
                        {theme.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* フッター */}
        <div
          className={`flex items-center justify-end border-t shrink-0 ${isSmallScreen ? "gap-1.5 px-2 py-1.5" : "gap-2 sm:gap-3 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4"}`}
          style={{ borderColor: bgActivityBar }}
        >
          <button
            onClick={onClose}
            className={`rounded transition-colors ${isSmallScreen ? "px-2 py-1 text-[10px]" : "px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm"}`}
            style={{ color: textSecondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = adjustBrightness(bgMain, 20)
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            {locale === "en" ? "Cancel" : "キャンセル"}
          </button>
          <button
            onClick={handleSave}
            className={`rounded transition-colors font-medium ${isSmallScreen ? "px-2 py-1 text-[10px]" : "px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm"}`}
            style={{ backgroundColor: localSettings.accentColor, color: "#ffffff" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1"
            }}
          >
            {locale === "en" ? "Save" : "保存"}
          </button>
        </div>
      </div>
    </div>
  )
}
