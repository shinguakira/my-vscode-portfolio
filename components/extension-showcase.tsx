"use client"

import type { Project } from "@shinguakira/portfolio-api-types"
import { ExternalLink, FolderCode, Github, Tag } from "lucide-react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { resolveApiImageUrl } from "@/lib/api/client"
import { adjustBrightness } from "@/lib/color-utils"

interface ExtensionShowcaseProps {
  extension: Project
}

export function ExtensionShowcase({ extension }: ExtensionShowcaseProps) {
  const locale = useLocale()
  const { settings } = useTheme()

  const bgMain = settings.backgroundColor || "#0d0d0d"
  const textPrimary = settings.textColor || "#cccccc"
  const accentColor = settings.accentColor || "#007acc"
  const bgCard = adjustBrightness(bgMain, 8)
  const bgCardHover = adjustBrightness(bgMain, 12)
  const textSecondary = adjustBrightness(textPrimary, -30)
  const textMuted = adjustBrightness(textPrimary, -50)
  const borderColor = adjustBrightness(bgMain, 20)

  return (
    <div className="h-full overflow-auto p-4 md:p-8" style={{ backgroundColor: bgMain }}>
      {/* Header */}
      <div
        className="rounded-xl p-6 md:p-8 mb-6"
        style={{
          backgroundColor: bgCard,
          border: `1px solid ${borderColor}`,
        }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image or icon */}
          <div
            className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
            style={{
              background: extension.image
                ? undefined
                : `linear-gradient(135deg, ${accentColor}20, ${accentColor}40)`,
              border: `2px solid ${accentColor}50`,
            }}
          >
            {extension.image ? (
              <img
                src={resolveApiImageUrl(extension.image ?? "")}
                alt={extension.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <FolderCode className="w-10 h-10 md:w-14 md:h-14" style={{ color: accentColor }} />
            )}
          </div>

          {/* Meta */}
          <div className="flex-1 min-w-0">
            <h1
              className="text-2xl md:text-3xl font-bold mb-2 truncate"
              style={{ color: textPrimary }}
            >
              {extension.title}
            </h1>

            <p
              className="text-sm md:text-base mb-4 leading-relaxed"
              style={{ color: textSecondary }}
            >
              {extension.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {extension.githubUrl && (
                <a
                  href={extension.githubUrl}
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
              {extension.liveUrl && (
                <a
                  href={extension.liveUrl}
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

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main - Project image */}
        <div className="lg:col-span-2 space-y-6">
          {extension.image && (
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
                {locale === "en" ? "Preview" : "プレビュー"}
              </h2>
              <div
                className="aspect-video rounded-lg overflow-hidden relative"
                style={{ border: `1px solid ${borderColor}` }}
              >
                <img
                  src={resolveApiImageUrl(extension.image ?? "")}
                  alt={extension.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tech Stack */}
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
              {extension.technologies.map((tag) => (
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

          {/* Links */}
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
              {extension.githubUrl && (
                <a
                  href={extension.githubUrl}
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
              {extension.liveUrl && (
                <a
                  href={extension.liveUrl}
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
