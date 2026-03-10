"use client"

import { ExternalLink, Github } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useProjectsData } from "@/hooks/use-projects-data"
import { resolveApiImageUrl } from "@/lib/api/client"


export function ModernProjects() {
  const locale = useLocale()
  const { data: projects, loading, error } = useProjectsData()

  if (loading) return <LoadingState />
  if (error || !projects) return <ErrorState message={error ?? undefined} />

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
              {project.image && (
                <div className="h-48 short:h-24 bg-slate-800 overflow-hidden">
                  <img
                    src={resolveApiImageUrl(project.image ?? "")}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 short:p-3">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md text-xs font-medium bg-slate-800 text-slate-300 border-0 hover:bg-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {locale === "en" ? "Demo" : "デモ"}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      {locale === "en" ? "Code" : "コード"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
