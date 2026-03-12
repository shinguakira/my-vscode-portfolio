"use client"

import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useProjectsData } from "@/hooks/use-projects-data"
import { resolveApiImageUrl } from "@/lib/api/client"

const GRADIENTS = [
  "from-cyan-500 via-blue-500 to-purple-500",
  "from-purple-500 via-pink-500 to-red-500",
  "from-pink-500 via-red-500 to-orange-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-amber-500 via-orange-500 to-red-500",
  "from-blue-500 via-indigo-500 to-violet-500",
]

export function InnovativeProjects() {
  const locale = useLocale()
  const { data: projects, loading, error } = useProjectsData()

  if (loading) return <LoadingState />
  if (error || !projects) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-black">
      <div className="max-w-7xl mx-auto px-4 short:px-2 py-20 short:py-6">
        <h1 className="text-7xl short:text-3xl font-black mb-20 short:mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
          {locale === "en" ? "Innovative Projects" : "革新的プロジェクト"}
        </h1>

        <div className="space-y-32 short:space-y-6">
          {projects.map((project, i) => {
            const gradient = GRADIENTS[i % GRADIENTS.length]
            return (
              <div key={i} className="group relative">
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-700`}
                />
                <div className="relative bg-black border border-gray-800 rounded-3xl overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div
                      className={`relative flex items-center justify-center bg-gradient-to-br ${gradient} p-20 short:p-6`}
                    >
                      {project.image ? (
                        <Image
                          src={resolveApiImageUrl(project.image ?? "")}
                          alt={project.title}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      ) : (
                        <div className="text-6xl text-white/50">📁</div>
                      )}
                    </div>
                    <div className="p-12 short:p-4 flex flex-col justify-center">
                      <h3
                        className={`text-4xl short:text-xl font-black mb-4 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                      >
                        {project.title}
                      </h3>
                      <p className="text-xl short:text-sm text-gray-400 mb-8 short:mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 short:px-4 py-3 short:py-2 rounded-xl font-bold text-sm bg-gradient-to-r ${gradient} text-white flex items-center gap-2`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            {locale === "en" ? "View Details" : "詳細を見る"}
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 short:px-4 py-3 short:py-2 rounded-xl font-bold text-sm border-2 border-gray-700 text-white hover:border-gray-500 transition flex items-center gap-2"
                          >
                            <Github className="w-4 h-4" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
