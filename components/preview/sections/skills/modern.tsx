"use client"

import { useMemo } from "react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useSkillsData } from "@/hooks/use-skills-data"
import { resolveApiImageUrl } from "@/lib/api/client"

export function ModernSkills() {
  const locale = useLocale()
  const { data: skills, loading, error } = useSkillsData()

  const grouped = useMemo(() => {
    if (!skills) return []
    const map = new Map<string, typeof skills>()
    for (const s of skills) {
      const list = map.get(s.category) ?? []
      list.push(s)
      map.set(s.category, list)
    }
    return Array.from(map.entries())
  }, [skills])

  if (loading) return <LoadingState />
  if (error || !skills) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {locale === "en" ? "Skill Set" : "スキルセット"}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">
            {locale === "en" ? "Tech Stack & Proficiency" : "技術スタックと習熟度"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 short:gap-3">
          {grouped.map(([category, items]) => (
            <div
              key={category}
              className="rounded-xl shadow-sm p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur"
            >
              <h3 className="text-xl short:text-base font-bold mb-6 short:mb-2 text-white">
                {category}
              </h3>
              <div className="space-y-3">
                {items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50"
                  >
                    <div className="flex items-center gap-3">
                      {skill.picture && (
                        <div className="flex size-8 items-center justify-center rounded-md p-1 bg-white">
                          <img
                            src={resolveApiImageUrl(skill.picture)}
                            alt={skill.name}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <span className="text-slate-300 font-medium">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 text-sm">{skill.years}</span>
                      {skill.proficiency && (
                        <span className="px-3 py-1 text-sm font-bold border rounded-lg bg-blue-500/20 text-blue-400 border-blue-500/50">
                          {skill.proficiency}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
