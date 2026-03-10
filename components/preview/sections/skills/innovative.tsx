"use client"

import { useMemo } from "react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useSkillsData } from "@/hooks/use-skills-data"
import { resolveApiImageUrl } from "@/lib/api/client"

const CATEGORY_GRADIENTS: Record<string, string> = {
  Language: "from-cyan-400 to-blue-500",
  Frontend: "from-cyan-400 to-blue-500",
  Backend: "from-green-400 to-emerald-500",
  "AI / ML": "from-purple-400 to-pink-500",
  Infrastructure: "from-orange-400 to-amber-500",
  Database: "from-teal-400 to-cyan-500",
  DevOps: "from-yellow-400 to-orange-500",
  Testing: "from-rose-400 to-red-500",
  API: "from-violet-400 to-purple-500",
  "State Management": "from-indigo-400 to-blue-500",
  ORM: "from-amber-400 to-yellow-500",
  CSS: "from-sky-400 to-blue-500",
  Cloud: "from-blue-400 to-indigo-500",
  Others: "from-gray-400 to-gray-500",
}

export function InnovativeSkills() {
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
    <div className="min-h-full bg-black">
      <div className="max-w-7xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <h1 className="text-7xl short:text-3xl font-black mb-20 short:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          {locale === "en" ? "Technology Stack" : "テクノロジースタック"}
        </h1>

        <div className="space-y-16 short:space-y-6">
          {grouped.map(([category, items], catIndex) => {
            const gradient =
              CATEGORY_GRADIENTS[category] ?? "from-gray-400 to-gray-500"
            return (
              <div key={catIndex}>
                <h2
                  className={`text-3xl short:text-xl font-black mb-8 short:mb-3 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                >
                  {category}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {items.map((skill, i) => (
                    <div key={i} className="group relative">
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-br ${gradient} rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-500`}
                      />
                      <div className="relative bg-black border border-gray-800 rounded-2xl p-6 short:p-3 text-center h-full flex flex-col items-center justify-center">
                        {skill.picture && (
                          <div
                            className="flex size-10 items-center justify-center rounded-lg p-1.5 mb-2"
                            style={{ backgroundColor: "#ffffff" }}
                          >
                            <img
                              src={resolveApiImageUrl(skill.picture)}
                              alt={skill.name}
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          </div>
                        )}
                        <div
                          className={`text-2xl short:text-base font-black mb-3 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                        >
                          {skill.name}
                        </div>
                        <div className="flex items-center gap-3">
                          {skill.proficiency && (
                            <span className="text-lg short:text-sm font-bold text-white">
                              {skill.proficiency}
                            </span>
                          )}
                          <span className="text-gray-500 text-lg short:text-sm">{skill.years}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
