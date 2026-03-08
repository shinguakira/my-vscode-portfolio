"use client"

import { GraduationCap } from "lucide-react"
import { useCallback, useMemo, useState } from "react"

import { useLocale } from "@/contexts/locale-context"
import { cn } from "@/lib/utils"

import { DetailModal } from "./detail-modal"
import {
  COL_W,
  durationJa,
  findOverlaps,
  fmtShort,
  GAP,
  getRange,
  monthsBetween,
  packColumns,
  parseDate,
  PX,
  RULER_W,
} from "./timeline-helpers"
import { variantStyles } from "./timeline-styles"

/* ─── Public types ─── */

export interface CareerProject {
  id: string
  name: string
  company: string
  role: string
  startDate: string // YYYY-MM
  endDate: string | "present" // YYYY-MM or "present"
  color: string // hex e.g. "#3ecfb0"
  tags: string[]
  description: string
  highlights: string[]
  teamSize?: number
}

export type TimelineVariant = "innovative" | "professional" | "modern"

/* ─── Education data ─── */

const educationData = {
  ja: { degree: "情報工学学士", university: "○○大学", year: "2019年卒業" },
  en: { degree: "B.S. in Computer Science", university: "XX University", year: "Graduated 2019" },
}

/* ─── Main exported component ─── */

export function CareerTimeline({
  projects,
  variant = "modern",
}: {
  projects: CareerProject[]
  variant?: TimelineVariant
}) {
  const locale = useLocale()
  const education = locale === "en" ? educationData.en : educationData.ja
  const s = variantStyles[variant]
  const { minD, maxD } = useMemo(() => getRange(projects), [projects])
  const totalH = useMemo(() => monthsBetween(minD, maxD) * PX, [minD, maxD])
  const columns = useMemo(() => packColumns(projects), [projects])
  const overlaps = useMemo(() => findOverlaps(projects), [projects])

  const years = useMemo(() => {
    const arr: { year: number; top: number }[] = []
    for (let y = minD.getFullYear(); y <= maxD.getFullYear(); y++) {
      arr.push({ year: y, top: monthsBetween(minD, new Date(y, 0)) * PX })
    }
    return arr
  }, [minD, maxD])

  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<CareerProject | null>(null)

  const isLit = useCallback(
    (id: string) => {
      if (!hovered) return true
      if (id === hovered) return true
      return overlaps.get(hovered)?.includes(id) ?? false
    },
    [hovered, overlaps],
  )

  const chartW = columns.count * (COL_W + GAP) - GAP

  return (
    <div className={s.wrapper}>
      {/* Background decorations (innovative only) */}
      {s.bg1 && (
        <div className="absolute inset-0">
          <div className={s.bg1} />
          <div className={s.bg2} />
        </div>
      )}

      <div className={s.inner}>
        {/* Title */}
        <div>
          <h1 className={s.title}>
            {variant === "innovative" ? "CAREER" : locale === "en" ? "Work Experience" : "職務経歴"}
          </h1>
          <p className={s.subtitle}>
            {variant === "innovative"
              ? "Professional Journey"
              : locale === "en"
                ? "Career and Achievements"
                : "これまでのキャリアと実績"}
          </p>
        </div>

        {/* Timeline chart */}
        <div className="overflow-x-auto pb-4 mb-8">
          <div
            className="relative flex"
            style={{ height: totalH + 32, minWidth: chartW + RULER_W + 16 }}
          >
            {/* Year ruler */}
            <div className="shrink-0 relative" style={{ width: RULER_W }}>
              {years.map(({ year, top }) => (
                <div key={year} className="absolute left-0 flex items-center gap-1" style={{ top }}>
                  <span className={cn("text-[10px] font-mono tabular-nums", s.rulerText)}>
                    {year}
                  </span>
                  <div className="w-1.5 h-px bg-current opacity-20" />
                </div>
              ))}
            </div>

            {/* Lane area */}
            <div className="relative" style={{ width: chartW }}>
              {/* Grid lines */}
              {years.map(({ year, top }) => (
                <div
                  key={`g-${year}`}
                  className={cn("absolute left-0 right-0 border-t border-dashed", s.gridLine)}
                  style={{ top }}
                />
              ))}

              {/* Blocks */}
              {projects.map((p) => {
                const start = parseDate(p.startDate)
                const end = parseDate(p.endDate)
                const top = monthsBetween(minD, start) * PX
                const height = Math.max(monthsBetween(start, end) * PX, 28)
                const col = columns.map.get(p.id) ?? 0
                const lit = isLit(p.id)
                const active = hovered === p.id
                const isParallel = hovered && hovered !== p.id && lit

                return (
                  <div
                    key={p.id}
                    className={cn(
                      "absolute rounded-lg transition-all duration-300 cursor-pointer group",
                      lit ? "opacity-100" : "opacity-[0.06]",
                      active && "z-20",
                    )}
                    style={{
                      top,
                      height,
                      left: col * (COL_W + GAP),
                      width: COL_W,
                    }}
                    onMouseEnter={() => setHovered(p.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setSelected(p)}
                  >
                    {/* Background */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-lg transition-all duration-300",
                        active
                          ? "ring-1 ring-current/20 shadow-lg shadow-black/20"
                          : isParallel
                            ? "ring-1 ring-current/10"
                            : "",
                      )}
                      style={{
                        backgroundColor: s.blockBg(p.color),
                        borderLeft: s.blockBorder(p.color),
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full px-3 py-2.5 flex flex-col overflow-hidden">
                      <div className="min-w-0">
                        <p
                          className="text-[11px] font-semibold leading-tight truncate"
                          style={{ color: s.nameColor(p.color) }}
                        >
                          {p.name}
                        </p>
                        {height > 55 && (
                          <p className={cn("text-[10px] mt-0.5 truncate", s.companyText)}>
                            {p.company}
                          </p>
                        )}
                        {height > 75 && (
                          <p className={cn("text-[9px] mt-0.5 truncate", s.roleText)}>{p.role}</p>
                        )}
                      </div>

                      {height > 105 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {p.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm"
                              style={{
                                backgroundColor: s.tagBg(p.color),
                                color: s.tagText(p.color),
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex-1 min-h-0" />

                      <div>
                        <span className={cn("text-[9px] font-mono block", s.dateLabelText)}>
                          {fmtShort(p.startDate)} - {fmtShort(p.endDate)}
                        </span>
                        {height > 65 && (
                          <span
                            className="text-[9px] font-mono font-medium mt-0.5 block"
                            style={{ color: s.durationColor(p.color) }}
                          >
                            {durationJa(p.startDate, p.endDate, locale)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className={s.educationBg}>
          <div className="flex items-center gap-4">
            {variant !== "professional" && (
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  s.educationGrad || "bg-blue-600/20",
                )}
              >
                <GraduationCap className="w-5 h-5 text-blue-400" />
              </div>
            )}
            {variant === "professional" && (
              <GraduationCap className="w-5 h-5 text-gray-500 shrink-0" />
            )}
            <div>
              <h3 className={s.educationTitle}>{education.degree}</h3>
              <p className={s.educationSub}>
                {education.university} / {education.year}
              </p>
            </div>
          </div>
        </div>
      </div>

      <DetailModal
        project={selected}
        allProjects={projects}
        overlaps={overlaps}
        onClose={() => setSelected(null)}
        variant={variant}
      />
    </div>
  )
}
