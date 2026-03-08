"use client"

import { getProjectsProfessional } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function ProfessionalProjects() {
  const locale = useLocale()
  const projects = getProjectsProfessional(locale)

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-6xl mx-auto px-8 short:px-4 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Projects" : "プロジェクト"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">
            {locale === "en" ? "Selected works" : "選りすぐりの制作実績"}
          </p>
        </div>

        <div className="space-y-20 short:space-y-6">
          {projects.map((project) => (
            <div key={project.num} className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-2">
                <div className="text-6xl short:text-2xl font-bold text-gray-200">{project.num}</div>
              </div>
              <div className="md:col-span-10 border-l-2 border-gray-900 pl-8 short:pl-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl short:text-lg font-serif font-bold text-gray-900 mb-2 short:mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{project.client}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 short:mb-2 max-w-2xl short:text-sm">
                  {project.desc}
                </p>
                <div className="flex gap-4">
                  <button className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition">
                    {locale === "en" ? "View Details" : "詳細を見る"}
                  </button>
                  <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition">
                    {locale === "en" ? "Live Site" : "ライブサイト"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
