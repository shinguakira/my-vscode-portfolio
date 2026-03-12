"use client"

import { ExternalLink, FolderCode, Github } from "lucide-react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { useProjectsData } from "@/hooks/use-projects-data"
import { resolveApiImageUrl } from "@/lib/api/client"

interface ExtensionsPanelProps {
  openExtension: (extensionId: string) => void
}

export function ExtensionsPanel({ openExtension }: ExtensionsPanelProps) {
  const locale = useLocale()
  const { accentColor, bgMain, bgHover, textPrimary, textSecondary, textMuted } = useTheme()
  const { data: projects, loading, error } = useProjectsData()

  if (loading) {
    return (
      <div className="py-2 px-3">
        <div className="text-[10px] md:text-xs animate-pulse" style={{ color: textMuted }}>
          {locale === "en" ? "Loading projects..." : "プロジェクトを読み込み中..."}
        </div>
      </div>
    )
  }

  if (error || !projects) {
    return (
      <div className="py-2 px-3">
        <div className="text-[10px] md:text-xs" style={{ color: textMuted }}>
          {locale === "en" ? "Failed to load projects" : "プロジェクトの読み込みに失敗しました"}
        </div>
      </div>
    )
  }

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
          {locale === "en" ? `${projects.length} extensions` : `${projects.length} 件の拡張機能`}
        </div>
      </div>

      {projects.map((project, i) => (
        <div
          key={i}
          onClick={() => openExtension(String(i))}
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
              {project.image ? (
                <img
                  src={resolveApiImageUrl(project.image ?? "")}
                  alt={project.title}
                  className="w-6 h-6 md:w-7 md:h-7 rounded object-cover"
                />
              ) : (
                <FolderCode className="w-6 h-6 md:w-7 md:h-7" style={{ color: accentColor }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-[11px] md:text-sm truncate"
                style={{ color: textPrimary }}
              >
                {project.title}
              </div>
              <div
                className="text-[10px] md:text-xs mt-1 md:mt-2 line-clamp-2"
                style={{ color: textSecondary }}
              >
                {project.description}
              </div>

              {/* タグ - モバイルでは2つまで */}
              <div className="flex flex-wrap gap-1 mt-1 md:mt-2">
                {project.technologies.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] md:text-[10px] px-1 md:px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: bgHover, color: textSecondary }}
                  >
                    {tag}
                  </span>
                ))}
                {project.technologies.length > 2 && (
                  <span
                    className="text-[9px] md:text-[10px] px-1 py-0.5 hidden md:inline"
                    style={{ color: textMuted }}
                  >
                    +{project.technologies.length - 2}
                  </span>
                )}
              </div>

              {/* リンク - モバイルではアイコンのみ */}
              <div className="flex gap-1 md:gap-2 mt-1 md:mt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
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
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
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
