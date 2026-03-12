"use client"

import Image from "next/image"
import { useMemo } from "react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useSkillsData } from "@/hooks/use-skills-data"
import { resolveApiImageUrl } from "@/lib/api/client"

export function ProfessionalSkills() {
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
    <div className="min-h-full bg-white">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Skills & Technologies" : "スキルと技術"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">
            {locale === "en" ? "Expertise & Tech Stack" : "専門知識と技術スタック"}
          </p>
        </div>

        <div className="space-y-16 short:space-y-4">
          {grouped.map(([category, items]) => (
            <div key={category}>
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
                {category}
              </h2>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      {skill.picture && (
                        <div
                          className="flex size-8 items-center justify-center rounded-md p-1"
                          style={{ backgroundColor: "#ffffff" }}
                        >
                          <Image
                            src={resolveApiImageUrl(skill.picture)}
                            alt={skill.name}
                            width={24}
                            height={24}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                      <span className="text-gray-900 font-medium">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-sm">{skill.years}</span>
                      {skill.proficiency && (
                        <span className="px-3 py-1 text-sm font-bold border rounded bg-gray-100 text-gray-700 border-gray-300">
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
