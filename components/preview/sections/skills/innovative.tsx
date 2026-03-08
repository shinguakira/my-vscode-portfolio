"use client"

import { getSkillCategories } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

const CATEGORY_GRADIENTS: Record<string, string> = {
  フロントエンド: "from-cyan-400 to-blue-500",
  Frontend: "from-cyan-400 to-blue-500",
  バックエンド: "from-green-400 to-emerald-500",
  Backend: "from-green-400 to-emerald-500",
  "AI / ML": "from-purple-400 to-pink-500",
  インフラ: "from-orange-400 to-amber-500",
  Infrastructure: "from-orange-400 to-amber-500",
}

const SKILL_COLORS: Record<string, string> = {
  React: "from-cyan-500 to-blue-500",
  "Next.js": "from-blue-500 to-purple-500",
  TypeScript: "from-purple-500 to-pink-500",
  "Node.js": "from-green-500 to-emerald-500",
  Python: "from-emerald-500 to-teal-500",
  PostgreSQL: "from-teal-500 to-cyan-500",
  "OpenAI API": "from-purple-500 to-pink-500",
  LangChain: "from-pink-500 to-rose-500",
  RAG: "from-rose-500 to-red-500",
  AWS: "from-orange-500 to-amber-500",
  Docker: "from-amber-500 to-yellow-500",
  Terraform: "from-yellow-500 to-lime-500",
}

const SKILL_ICONS: Record<string, string> = {
  React: "⚛️",
  "Next.js": "▲",
  TypeScript: "TS",
  "Node.js": "🟢",
  Python: "🐍",
  PostgreSQL: "🗄️",
  "OpenAI API": "🤖",
  LangChain: "🔗",
  RAG: "📚",
  AWS: "☁️",
  Docker: "🐳",
  Terraform: "🏗️",
}

function getRankColor(rank: string) {
  switch (rank) {
    case "S":
      return "from-amber-400 to-yellow-500"
    case "A":
      return "from-rose-400 to-pink-500"
    case "B":
      return "from-violet-400 to-purple-500"
    case "C":
      return "from-blue-400 to-cyan-500"
    default:
      return "from-gray-400 to-gray-500"
  }
}

export function InnovativeSkills() {
  const locale = useLocale()
  const skillCategories = getSkillCategories(locale)

  return (
    <div className="min-h-full bg-black">
      <div className="max-w-7xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <h1 className="text-7xl short:text-3xl font-black mb-20 short:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
          {locale === "en" ? "Technology Stack" : "テクノロジースタック"}
        </h1>

        <div className="space-y-16 short:space-y-6">
          {skillCategories.map((category, catIndex) => {
            const gradient = CATEGORY_GRADIENTS[category.category] ?? "from-gray-400 to-gray-500"
            return (
              <div key={catIndex}>
                <h2
                  className={`text-3xl short:text-xl font-black mb-8 short:mb-3 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                >
                  {category.category}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.skills.map((skill, i) => {
                    const color = SKILL_COLORS[skill.name] ?? "from-gray-500 to-gray-600"
                    const icon = SKILL_ICONS[skill.name] ?? "💡"
                    return (
                      <div key={i} className="group relative">
                        <div
                          className={`absolute -inset-0.5 bg-gradient-to-br ${color} rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-500`}
                        />
                        <div className="relative bg-black border border-gray-800 rounded-2xl p-6 short:p-3 text-center h-full flex flex-col items-center justify-center">
                          <div className="text-5xl short:text-2xl mb-4 short:mb-1">{icon}</div>
                          <div
                            className={`text-2xl short:text-base font-black mb-3 short:mb-1 text-transparent bg-clip-text bg-gradient-to-r ${color}`}
                          >
                            {skill.name}
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-3xl short:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${getRankColor(skill.rank)}`}
                            >
                              {skill.rank}
                            </span>
                            <span className="text-gray-500 text-lg short:text-sm">
                              {skill.years}
                              {locale === "en" ? " yr(s)" : "年"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
