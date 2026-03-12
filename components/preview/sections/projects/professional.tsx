"use client"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useProjectsData } from "@/hooks/use-projects-data"

export function ProfessionalProjects() {
  const locale = useLocale()
  const { data: projects, loading, error } = useProjectsData()

  if (loading) return <LoadingState />
  if (error || !projects) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-6xl mx-auto px-4 short:px-2 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Projects" : "プロジェクト"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">
            {locale === "en" ? "Selected works" : "選りすぐりの制作実績"}
          </p>
        </div>

        <div className="space-y-20 short:space-y-6">
          {projects.map((project, i) => (
            <div key={i} className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-2">
                <div className="text-6xl short:text-2xl font-bold text-gray-200">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="md:col-span-10 border-l-2 border-gray-900 pl-8 short:pl-4">
                <h3 className="text-3xl short:text-lg font-serif font-bold text-gray-900 mb-2 short:mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 short:mb-2 max-w-2xl short:text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-gray-300 text-gray-700 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                    >
                      {locale === "en" ? "Live Site" : "ライブサイト"}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition"
                    >
                      GitHub
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
