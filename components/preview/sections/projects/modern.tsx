"use client"

import { ExternalLink, Github } from "lucide-react"

import { getProjects } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

export function ModernProjects() {
  const locale = useLocale()
  const projects = getProjects(locale)

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-8 short:px-4 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {locale === "en" ? "Projects" : "プロジェクト"}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">
            {locale === "en"
              ? "Key projects I've developed"
              : "これまでに開発した主要なプロジェクト"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 short:gap-3">
          {projects.map((project, i) => (
            <div
              key={i}
              className="rounded-xl shadow-sm group bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`h-48 short:h-24 bg-gradient-to-br ${project.color} flex items-center justify-center text-6xl short:text-3xl`}
              >
                {project.icon}
              </div>
              <div className="p-6 short:p-3">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md text-xs font-medium bg-slate-800 text-slate-300 border-0 hover:bg-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    {locale === "en" ? "Demo" : "デモ"}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    <Github className="w-4 h-4" />
                    {locale === "en" ? "Code" : "コード"}
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
