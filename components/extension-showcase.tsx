"use client"

import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Github,
  Package,
  Star,
  Tag,
  User,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { adjustBrightness } from "@/lib/color-utils"
import { IconFromKey } from "@/lib/icon-map"
import type { Extension } from "@/types"

interface ExtensionShowcaseProps {
  extension: Extension
}

export function ExtensionShowcase({ extension }: ExtensionShowcaseProps) {
  const locale = useLocale()
  const { settings } = useTheme()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const bgMain = settings.backgroundColor || "#0d0d0d"
  const textPrimary = settings.textColor || "#cccccc"
  const accentColor = settings.accentColor || "#007acc"
  const bgCard = adjustBrightness(bgMain, 8)
  const bgCardHover = adjustBrightness(bgMain, 12)
  const bgBadge = adjustBrightness(bgMain, 15)
  const textSecondary = adjustBrightness(textPrimary, -30)
  const textMuted = adjustBrightness(textPrimary, -50)
  const borderColor = adjustBrightness(bgMain, 20)

  const screenshots = extension.screenshots || []
  const hasScreenshots = screenshots.length > 0

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="h-full overflow-auto p-4 md:p-8" style={{ backgroundColor: bgMain }}>
      {/* ヘッダーセクション */}
      <div
        className="rounded-xl p-6 md:p-8 mb-6"
        style={{
          backgroundColor: bgCard,
          border: `1px solid ${borderColor}`,
        }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* アイコン */}
          <div
            className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shrink-0"
            style={{
              background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
              border: `2px solid ${accentColor}50`,
            }}
          >
            <IconFromKey
              iconKey={extension.icon}
              className="w-10 h-10 md:w-14 md:h-14"
              style={{ color: accentColor }}
            />
          </div>

          {/* メタ情報 */}
          <div className="flex-1 min-w-0">
            <h1
              className="text-2xl md:text-3xl font-bold mb-2 truncate"
              style={{ color: textPrimary }}
            >
              {extension.displayName}
            </h1>

            <div
              className="flex flex-wrap items-center gap-3 mb-4 text-sm"
              style={{ color: textSecondary }}
            >
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {extension.publisher}
              </span>
              <span className="flex items-center gap-1">
                <Package className="w-4 h-4" />v{extension.version}
              </span>
            </div>

            <p
              className="text-sm md:text-base mb-4 leading-relaxed"
              style={{ color: textSecondary }}
            >
              {extension.description}
            </p>

            {/* 統計情報 */}
            <div className="flex flex-wrap gap-4 mb-4">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                style={{ backgroundColor: bgBadge, color: textPrimary }}
              >
                <Star className="w-4 h-4" style={{ color: "#fbbf24" }} fill="#fbbf24" />
                <span className="font-medium">{extension.rating}</span>
                <span style={{ color: textMuted }}>/5.0</span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm"
                style={{ backgroundColor: bgBadge, color: textPrimary }}
              >
                <Download className="w-4 h-4" style={{ color: accentColor }} />
                <span className="font-medium">{extension.downloads.toLocaleString()}</span>
                <span style={{ color: textMuted }}>downloads</span>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-wrap gap-3">
              {extension.repository && (
                <a
                  href={extension.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: bgCardHover,
                    color: textPrimary,
                    border: `1px solid ${borderColor}`,
                  }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {extension.homepage && (
                <a
                  href={extension.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: accentColor,
                    color: "#ffffff",
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2カラムレイアウト */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className="rounded-xl p-6 overflow-hidden"
            style={{
              backgroundColor: bgCard,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: textPrimary }}
            >
              <span style={{ color: accentColor }}>▎</span>
              {locale === "en" ? "Screenshots" : "スクリーンショット"}
            </h2>

            {/* メイン画像表示エリア */}
            <div className="relative group">
              <div
                className="aspect-video rounded-lg flex items-center justify-center relative overflow-hidden"
                style={{
                  background: hasScreenshots
                    ? undefined
                    : `linear-gradient(135deg, ${accentColor}10, ${adjustBrightness(accentColor, -30)}20)`,
                  border: `1px solid ${borderColor}`,
                }}
              >
                {hasScreenshots ? (
                  <Image
                    src={screenshots[selectedImageIndex] || "/placeholder.svg"}
                    alt={`${extension.displayName} screenshot ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    fill
                  />
                ) : (
                  <div className="text-center z-10 p-6">
                    <div className="mb-4">
                      <IconFromKey
                        iconKey={extension.icon}
                        className="w-16 h-16"
                        style={{ color: accentColor }}
                      />
                    </div>
                    <p className="text-sm" style={{ color: textSecondary }}>
                      {locale === "en"
                        ? "No screenshots available"
                        : "スクリーンショットはありません"}
                    </p>
                  </div>
                )}

                {/* 左右ナビゲーションボタン */}
                {hasScreenshots && screenshots.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor: `${bgMain}cc`,
                        color: textPrimary,
                      }}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        backgroundColor: `${bgMain}cc`,
                        color: textPrimary,
                      }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* 画像カウンター */}
                {hasScreenshots && screenshots.length > 1 && (
                  <div
                    className="absolute bottom-3 right-3 px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: `${bgMain}cc`,
                      color: textPrimary,
                    }}
                  >
                    {selectedImageIndex + 1} / {screenshots.length}
                  </div>
                )}
              </div>

              {/* サムネイルギャラリー */}
              {hasScreenshots && screenshots.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                  {screenshots.map((screenshot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className="shrink-0 rounded-md overflow-hidden transition-all hover:scale-105 relative"
                      style={{
                        width: "120px",
                        height: "68px",
                        border:
                          selectedImageIndex === index
                            ? `2px solid ${accentColor}`
                            : `2px solid ${borderColor}`,
                        opacity: selectedImageIndex === index ? 1 : 0.6,
                      }}
                    >
                      <Image
                        src={screenshot || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 機能一覧 */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: bgCard,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: textPrimary }}
            >
              <span style={{ color: accentColor }}>▎</span>
              {locale === "en" ? "Key Features" : "主な機能"}
            </h2>
            <div className="grid gap-3">
              {extension.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg transition-colors"
                  style={{ backgroundColor: bgCardHover }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `${accentColor}30` }}
                  >
                    <Check className="w-3 h-3" style={{ color: accentColor }} />
                  </div>
                  <span className="text-sm" style={{ color: textPrimary }}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* 技術スタック */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: bgCard,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: textPrimary }}
            >
              <span style={{ color: accentColor }}>▎</span>
              {locale === "en" ? "Tech Stack" : "技術スタック"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {extension.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* カテゴリ */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: bgCard,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: textPrimary }}
            >
              <span style={{ color: accentColor }}>▎</span>
              {locale === "en" ? "Categories" : "カテゴリ"}
            </h2>
            <div className="flex flex-wrap gap-2">
              {extension.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    backgroundColor: bgBadge,
                    color: textSecondary,
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* プロジェクト情報 */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: bgCard,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: textPrimary }}
            >
              <span style={{ color: accentColor }}>▎</span>
              {locale === "en" ? "Project Info" : "プロジェクト情報"}
            </h2>
            <div className="space-y-3 text-sm">
              <div
                className="flex justify-between items-center py-2 border-b"
                style={{ borderColor }}
              >
                <span style={{ color: textMuted }}>
                  {locale === "en" ? "Version" : "バージョン"}
                </span>
                <span style={{ color: textPrimary }}>{extension.version}</span>
              </div>
              <div
                className="flex justify-between items-center py-2 border-b"
                style={{ borderColor }}
              >
                <span style={{ color: textMuted }}>{locale === "en" ? "Publisher" : "公開者"}</span>
                <span style={{ color: textPrimary }}>{extension.publisher}</span>
              </div>
              <div
                className="flex justify-between items-center py-2 border-b"
                style={{ borderColor }}
              >
                <span style={{ color: textMuted }}>
                  {locale === "en" ? "Downloads" : "ダウンロード"}
                </span>
                <span style={{ color: textPrimary }}>{extension.downloads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span style={{ color: textMuted }}>{locale === "en" ? "Rating" : "評価"}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3"
                      style={{
                        color: i < Math.floor(extension.rating) ? "#fbbf24" : textMuted,
                      }}
                      fill={i < Math.floor(extension.rating) ? "#fbbf24" : "none"}
                    />
                  ))}
                  <span className="ml-1" style={{ color: textPrimary }}>
                    {extension.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* リンク */}
          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: bgCard,
              border: `1px solid ${borderColor}`,
            }}
          >
            <h2
              className="text-lg font-semibold mb-4 flex items-center gap-2"
              style={{ color: textPrimary }}
            >
              <span style={{ color: accentColor }}>▎</span>
              {locale === "en" ? "Links" : "リンク"}
            </h2>
            <div className="space-y-2">
              {extension.repository && (
                <a
                  href={extension.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:opacity-80"
                  style={{ backgroundColor: bgCardHover, color: textPrimary }}
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">
                    {locale === "en" ? "View Repository" : "リポジトリを見る"}
                  </span>
                  <ExternalLink className="w-3 h-3 ml-auto" style={{ color: textMuted }} />
                </a>
              )}
              {extension.homepage && (
                <a
                  href={extension.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-lg transition-colors hover:opacity-80"
                  style={{ backgroundColor: bgCardHover, color: textPrimary }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">
                    {locale === "en" ? "View Demo" : "デモサイトを見る"}
                  </span>
                  <ExternalLink className="w-3 h-3 ml-auto" style={{ color: textMuted }} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
