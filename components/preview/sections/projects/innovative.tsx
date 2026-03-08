"use client"

import { getProjectsInnovative } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function InnovativeProjects() {
  const locale = useLocale()
  const projects = getProjectsInnovative(locale)

  return (
    <div className="min-h-full bg-black">
      <div className="max-w-7xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <h1 className="text-7xl short:text-3xl font-black mb-20 short:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          {locale === "en" ? "Innovative Projects" : "革新的プロジェクト"}
        </h1>

        <div className="space-y-32 short:space-y-6">
          {projects.map((project, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-700`}
              />
              <div className="relative bg-black border border-gray-800 rounded-3xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div
                    className={`flex items-center justify-center text-[120px] short:text-[48px] bg-gradient-to-br ${project.gradient} p-20 short:p-6`}
                  >
                    {project.icon}
                  </div>
                  <div className="p-12 short:p-4 flex flex-col justify-center">
                    <h3
                      className={`text-4xl short:text-xl font-black mb-4 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r ${project.gradient}`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xl short:text-sm text-gray-400 mb-8 short:mb-3 leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="flex gap-4">
                      <button
                        className={`px-6 short:px-4 py-3 short:py-2 rounded-xl font-bold text-sm bg-gradient-to-r ${project.gradient} text-white`}
                      >
                        {locale === "en" ? "View Details" : "詳細を見る"}
                      </button>
                      <button className="px-6 short:px-4 py-3 short:py-2 rounded-xl font-bold text-sm border-2 border-gray-700 text-white hover:border-gray-500 transition">
                        GitHub
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
