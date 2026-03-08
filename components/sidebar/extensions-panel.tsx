"use client"

import { Download, ExternalLink, Github, Star } from "lucide-react"

import { getExtensions } from "@/constants/portfolio-data"
import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { IconFromKey } from "@/lib/icon-map"

interface ExtensionsPanelProps {
  openExtension: (extensionId: string) => void
}

export function ExtensionsPanel({ openExtension }: ExtensionsPanelProps) {
  const locale = useLocale()
  const { accentColor, bgMain, bgHover, textPrimary, textSecondary, textMuted } = useTheme()
  const extensions = getExtensions(locale)
  return (
    <div className="py-2">
      <div className="px-2 md:px-3 mb-3">
        <div
          className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider mb-2"
          style={{ color: textSecondary }}
        >
          {locale === "en" ? "Installed" : "インストール済み"}
        </div>
        <div className="text-[10px] md:text-xs" style={{ color: textMuted }}>
          {locale === "en"
            ? `${extensions.length} extensions`
            : `${extensions.length} 件の拡張機能`}
        </div>
      </div>

      {extensions.map((ext) => (
        <div
          key={ext.id}
          onClick={() => openExtension(ext.id)}
          className="px-2 md:px-3 py-2 md:py-3 border-b cursor-pointer transition-colors"
          style={{ borderColor: bgMain }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = bgHover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          <div className="flex items-start gap-2 md:gap-3">
            <div className="shrink-0">
              <IconFromKey
                iconKey={ext.icon}
                className="w-6 h-6 md:w-7 md:h-7"
                style={{ color: accentColor }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-[11px] md:text-sm truncate"
                style={{ color: textPrimary }}
              >
                {ext.displayName}
              </div>
              <div className="text-[10px] md:text-xs mt-0.5 truncate" style={{ color: textMuted }}>
                {ext.publisher}
              </div>
              <div
                className="text-[10px] md:text-xs mt-1 md:mt-2 line-clamp-2"
                style={{ color: textSecondary }}
              >
                {ext.description}
              </div>

              {/* タグ - モバイルでは2つまで */}
              <div className="flex flex-wrap gap-1 mt-1 md:mt-2">
                {ext.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] md:text-[10px] px-1 md:px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: bgHover, color: textSecondary }}
                  >
                    {tag}
                  </span>
                ))}
                {ext.tags.length > 2 && (
                  <span
                    className="text-[9px] md:text-[10px] px-1 py-0.5 hidden md:inline"
                    style={{ color: textMuted }}
                  >
                    +{ext.tags.length - 2}
                  </span>
                )}
              </div>

              <div
                className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2 text-[9px] md:text-[10px]"
                style={{ color: textMuted }}
              >
                <div className="flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-500 text-yellow-500" />
                  <span>{ext.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-2.5 h-2.5 md:w-3 md:h-3" />
                  <span>{(ext.downloads / 1000).toFixed(1)}K</span>
                </div>
                <span className="hidden md:inline">v{ext.version}</span>
              </div>

              {/* リンク - モバイルではアイコンのみ */}
              <div className="flex gap-1 md:gap-2 mt-1 md:mt-2">
                {ext.repository && (
                  <a
                    href={ext.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 rounded flex items-center gap-1 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: bgMain, color: accentColor }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    <span className="hidden md:inline">
                      {locale === "en" ? "Repository" : "リポジトリ"}
                    </span>
                  </a>
                )}
                {ext.homepage && (
                  <a
                    href={ext.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5 md:py-1 rounded flex items-center gap-1 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: bgMain, color: accentColor }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    <span className="hidden md:inline">{locale === "en" ? "Demo" : "デモ"}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
