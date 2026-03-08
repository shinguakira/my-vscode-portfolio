"use client"

import { Calendar, Users, X } from "lucide-react"
import { useCallback, useEffect, useRef } from "react"

import { useLocale } from "@/contexts/locale-context"
import { cn } from "@/lib/utils"

import type { CareerProject, TimelineVariant } from "./career-timeline"
import { durationJa, fmtLong } from "./timeline-helpers"
import { variantStyles } from "./timeline-styles"

export function DetailModal({
  project,
  allProjects,
  overlaps,
  onClose,
  variant = "modern",
}: {
  project: CareerProject | null
  allProjects: CareerProject[]
  overlaps: Map<string, string[]>
  onClose: () => void
  variant?: TimelineVariant
}) {
  const locale = useLocale()
  const overlayRef = useRef<HTMLDivElement>(null)
  const s = variantStyles[variant]

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (project) {
      document.addEventListener("keydown", handleKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [project, handleKey])

  if (!project) return null

  const parallelIds = overlaps.get(project.id) ?? []
  const parallel = allProjects.filter((p) => parallelIds.includes(p.id))

  return (
    <div
      ref={overlayRef}
      className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", s.overlayBg)}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
    >
      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          s.modalBg,
        )}
      >
        <div className="h-1 w-full" style={{ backgroundColor: project.color }} />

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold tracking-tight" style={{ color: project.color }}>
                {project.name}
              </h3>
              <p className="text-sm mt-0.5" style={{ color: s.modalCompany(project.color) }}>
                {project.company}
              </p>
              <p className={cn("text-xs mt-0.5", s.modalMeta)}>{project.role}</p>
            </div>
            <button
              onClick={onClose}
              className={cn(
                "shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                s.modalMeta,
                "hover:opacity-80",
              )}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Duration + team */}
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className={cn("text-xs font-mono flex items-center gap-1", s.modalMeta)}>
              <Calendar className="w-3 h-3" />
              {fmtLong(project.startDate)} &rarr; {fmtLong(project.endDate)}
            </span>
            <span
              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${project.color}18`, color: project.color }}
            >
              {durationJa(project.startDate, project.endDate, locale)}
            </span>
            {project.teamSize && (
              <span className={cn("text-xs font-mono flex items-center gap-1", s.modalMeta)}>
                <Users className="w-3 h-3" />{" "}
                {locale === "en" ? `${project.teamSize} members` : `${project.teamSize}名`}
              </span>
            )}
          </div>

          {/* Description */}
          <p className={cn("mt-4 text-sm leading-relaxed", s.modalText)}>{project.description}</p>

          {/* Highlights */}
          {project.highlights.length > 0 && (
            <div className="mt-5">
              <p
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider mb-2",
                  s.modalSectionTitle,
                )}
              >
                Highlights
              </p>
              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className={cn("text-sm", s.modalText)}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-1 rounded-md"
                style={{
                  backgroundColor: s.modalTagBg(project.color),
                  color: s.modalTagText(project.color),
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Parallel projects */}
          {parallel.length > 0 && (
            <div className="mt-6 pt-4 border-t border-current/10">
              <p
                className={cn(
                  "text-[10px] font-mono uppercase tracking-wider mb-3",
                  s.modalSectionTitle,
                )}
              >
                {locale === "en" ? "Parallel Projects" : "並行プロジェクト"}
              </p>
              <div className="space-y-2">
                {parallel.map((pp) => (
                  <div
                    key={pp.id}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={{ backgroundColor: s.parallelRowBg(pp.color) }}
                  >
                    <div
                      className="shrink-0 w-1.5 h-7 rounded-full"
                      style={{ backgroundColor: pp.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate" style={{ color: pp.color }}>
                        {pp.name}
                      </p>
                      <p className={cn("text-[10px] truncate", s.parallelCompany)}>{pp.company}</p>
                    </div>
                    <span className={cn("shrink-0 text-[9px] font-mono", s.modalMeta)}>
                      {durationJa(pp.startDate, pp.endDate, locale)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
