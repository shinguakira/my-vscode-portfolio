"use client"

import type { Project } from "@shinguakira/portfolio-api-types"
import { ExternalLink, Github, X } from "lucide-react"
import { useState } from "react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useProjectsData } from "@/hooks/use-projects-data"
import { resolveApiImageUrl } from "@/lib/api/client"

import type { PreviewTheme } from "@/types"

const GRADIENTS = [
  "from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-teal-500 to-green-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-500",
]

function getGradient(index: number) {
  return GRADIENTS[index % GRADIENTS.length]
}

export function ExtensionGallery({ theme }: { theme: PreviewTheme }) {
  const locale = useLocale()
  const { data: projects, loading, error } = useProjectsData()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (loading) return <LoadingState />
  if (error) return <ErrorState message={error} />
  if (!projects || projects.length === 0) return null

  if (theme === "professional") {
    return (
      <div className="min-h-full bg-white">
        <div className="max-w-4xl mx-auto px-8 py-24">
          <div className="mb-16 border-b border-gray-200 pb-8">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-3">
              {locale === "en" ? "Projects" : "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u4E00\u89A7"}
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "en" ? "Click to view details" : "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u8A73\u7D30\u3092\u8868\u793A"}
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="border border-gray-200 p-6 hover:border-gray-400 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                    <img
                      src={resolveApiImageUrl(project.image ?? "")}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs border border-gray-300 text-gray-600 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-200">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-gray-200">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base mb-4">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Project Image */}
                <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                    Links
                  </h3>
                  <div className="flex gap-3">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Repository</span>
                        <ExternalLink className="w-3 h-3 text-gray-400" />
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition bg-gray-900 hover:bg-gray-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (theme === "innovative") {
    return (
      <div className="min-h-full bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400">
              PROJECTS
            </h1>
            <p className="text-2xl text-gray-400 font-light">
              {locale === "en" ? "Click to view details" : "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u8A73\u7D30\u3092\u8868\u793A"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => {
              const gradient = getGradient(index)
              return (
                <div
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  className="group relative cursor-pointer"
                >
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500`}
                  />
                  <div className="relative bg-black border border-gray-800 rounded-3xl p-6 h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shrink-0`}
                      >
                        <img
                          src={resolveApiImageUrl(project.image ?? "")}
                          alt={project.title}
                          className="w-full h-full object-cover rounded-[calc(1rem-2px)]"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">{project.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full border border-teal-500/40 text-teal-400 bg-teal-500/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Innovative Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const idx = projects.findIndex((p) => p.title === selectedProject.title)
                const gradient = getGradient(idx >= 0 ? idx : 0)
                return (
                  <>
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-30`}
                    />
                    <div className="relative bg-black border border-gray-800 rounded-3xl overflow-hidden">
                      {/* Header */}
                      <div className="p-6 md:p-8 border-b border-gray-800">
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
                        >
                          <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col md:flex-row gap-6">
                          <div
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shrink-0`}
                          >
                            <img
                              src={resolveApiImageUrl(selectedProject.image ?? "")}
                              alt={selectedProject.title}
                              className="w-full h-full object-cover rounded-[calc(1rem-2px)]"
                            />
                          </div>
                          <div className="flex-1">
                            <h2
                              className={`text-2xl md:text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}
                            >
                              {selectedProject.title}
                            </h2>
                            <p className="text-gray-400 text-sm md:text-base mb-4">
                              {selectedProject.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 space-y-6">
                        {/* Project Image */}
                        <div className="aspect-video rounded-xl overflow-hidden border border-gray-800">
                          <img
                            src={resolveApiImageUrl(selectedProject.image ?? "")}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Technologies */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-400 mb-3">Technologies</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 text-xs rounded-full border border-teal-500/40 text-teal-400 bg-teal-500/10"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Links */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-400 mb-3">Links</h3>
                          <div className="flex gap-3">
                            {selectedProject.githubUrl && (
                              <a
                                href={selectedProject.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 hover:bg-gray-800 transition"
                              >
                                <Github className="w-4 h-4" />
                                <span className="text-sm">Repository</span>
                                <ExternalLink className="w-3 h-3 text-gray-500" />
                              </a>
                            )}
                            {selectedProject.liveUrl && (
                              <a
                                href={selectedProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition bg-gradient-to-r ${gradient}`}
                              >
                                <ExternalLink className="w-4 h-4" />
                                <span className="text-sm font-medium">Live Demo</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Modern theme (default)
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-8 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-xl text-slate-400">
            {locale === "en" ? "Click to view details" : "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u8A73\u7D30\u3092\u8868\u793A"}
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => {
            const gradient = getGradient(index)
            return (
              <div
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="p-6 bg-slate-900/50 border border-slate-800 backdrop-blur hover:border-slate-600 transition-all cursor-pointer group rounded-xl shadow-sm"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <img
                      src={resolveApiImageUrl(project.image ?? "")}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-[calc(1rem-2px)]"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white truncate mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md border px-2 py-1 bg-slate-800 text-slate-300 border-slate-700 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modern Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-sm"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-800">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                {(() => {
                  const idx = projects.findIndex((p) => p.title === selectedProject.title)
                  const gradient = getGradient(idx >= 0 ? idx : 0)
                  return (
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${gradient} p-0.5 shrink-0`}
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover rounded-[calc(1rem-2px)]"
                      />
                    </div>
                  )
                })()}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base mb-4">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Project Image */}
              <div className="aspect-video rounded-xl overflow-hidden border border-slate-700">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 mb-3">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md border px-3 py-1.5 bg-teal-500/10 text-teal-400 border-teal-500/30 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 mb-3">Links</h3>
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Repository</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition bg-teal-600 hover:bg-teal-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
