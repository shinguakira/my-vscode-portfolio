"use client"

import { ChevronRight, Download, ExternalLink, Github, Star, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

import { getExtensions } from "@/constants/portfolio-data"
import { EXTENSION_COLOR_MAP } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"
import { IconFromKey } from "@/lib/icon-map"
import type { Extension, PreviewTheme } from "@/types"

export function ExtensionGallery({ theme }: { theme: PreviewTheme }) {
  const locale = useLocale()
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null)
  const extensions = getExtensions(locale)

  const colorMap = EXTENSION_COLOR_MAP

  if (theme === "professional") {
    return (
      <div className="min-h-full bg-white">
        <div className="max-w-4xl mx-auto px-8 py-24">
          <div className="mb-16 border-b border-gray-200 pb-8">
            <h1 className="text-5xl font-serif font-bold text-gray-900 mb-3">
              {locale === "en" ? "Projects" : "プロジェクト一覧"}
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "en" ? "Click to view details" : "クリックして詳細を表示"}
            </p>
          </div>

          <div className="space-y-6">
            {extensions.map((ext) => (
              <div
                key={ext.id}
                onClick={() => setSelectedExtension(ext)}
                className="border border-gray-200 p-6 hover:border-gray-400 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <IconFromKey iconKey={ext.icon} className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{ext.displayName}</h3>
                      <span className="text-sm text-gray-500">v{ext.version}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{ext.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {ext.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        {(ext.downloads / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Modal - Extension Showcase Style */}
        {selectedExtension && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedExtension(null)}
          >
            <div
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-gray-200">
                <button
                  onClick={() => setSelectedExtension(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                    <IconFromKey
                      iconKey={selectedExtension.icon}
                      className="w-10 h-10 md:w-12 md:h-12 text-gray-600"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
                      {selectedExtension.displayName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-500">
                      <span>{selectedExtension.publisher}</span>
                      <span>v{selectedExtension.version}</span>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base mb-4">
                      {selectedExtension.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm">
                        <Star className="w-4 h-4 text-amber-500" fill="#f59e0b" />
                        <span className="text-gray-900 font-medium">
                          {selectedExtension.rating}
                        </span>
                        <span className="text-gray-500">/5.0</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-sm">
                        <Download className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-900 font-medium">
                          {selectedExtension.downloads.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Main Content */}
                <div className="lg:col-span-2 p-6 md:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-200">
                  {/* Screenshots */}
                  {selectedExtension.screenshots && selectedExtension.screenshots.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Screenshots</h3>
                      <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 relative">
                        <Image
                          src={selectedExtension.screenshots[0] || "/placeholder.svg"}
                          alt={selectedExtension.displayName}
                          className="w-full h-full object-cover"
                          fill
                        />
                      </div>
                      {selectedExtension.screenshots.length > 1 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                          {selectedExtension.screenshots.map((screenshot, index) => (
                            <div
                              key={index}
                              className="shrink-0 w-24 h-14 rounded-md overflow-hidden border border-gray-200 opacity-70 hover:opacity-100 transition cursor-pointer relative"
                            >
                              <Image
                                src={screenshot || "/placeholder.svg"}
                                alt={`Screenshot ${index + 1}`}
                                className="w-full h-full object-cover"
                                fill
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Features</h3>
                    <div className="grid gap-2">
                      {selectedExtension.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                        >
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gray-900">
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="p-6 md:p-8 space-y-6">
                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExtension.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs border border-gray-300 text-gray-600 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExtension.categories.map((category) => (
                        <span
                          key={category}
                          className="px-3 py-1.5 text-xs rounded bg-gray-100 text-gray-600"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">
                      Links
                    </h3>
                    <div className="space-y-2">
                      {selectedExtension.repository && (
                        <a
                          href={selectedExtension.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">Repository</span>
                          <ExternalLink className="w-3 h-3 ml-auto text-gray-400" />
                        </a>
                      )}
                      {selectedExtension.homepage && (
                        <a
                          href={selectedExtension.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-lg text-white transition bg-gray-900 hover:bg-gray-800"
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
              {locale === "en" ? "Click to view details" : "クリックして詳細を表示"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {extensions.map((ext) => (
              <div
                key={ext.id}
                onClick={() => setSelectedExtension(ext)}
                className="group relative cursor-pointer"
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${colorMap[ext.id] || "from-teal-500 to-green-500"} rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-500`}
                />
                <div className="relative bg-black border border-gray-800 rounded-3xl p-6 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorMap[ext.id] || "from-teal-500 to-green-500"} flex items-center justify-center`}
                    >
                      <IconFromKey iconKey={ext.icon} className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">{ext.displayName}</h3>
                      <span className="text-xs text-gray-500">v{ext.version}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ext.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {(ext.downloads / 1000).toFixed(1)}K downloads
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      {"★".repeat(Math.floor(ext.rating))}
                      <span className="text-gray-500 ml-1">{ext.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Innovative Modal - Extension Showcase Style */}
        {selectedExtension && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedExtension(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${colorMap[selectedExtension.id] || "from-teal-500 to-green-500"} rounded-3xl blur opacity-30`}
              />
              <div className="relative bg-black border border-gray-800 rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gray-800">
                  <button
                    onClick={() => setSelectedExtension(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${colorMap[selectedExtension.id] || "from-teal-500 to-green-500"} flex items-center justify-center shrink-0`}
                    >
                      <IconFromKey
                        iconKey={selectedExtension.icon}
                        className="w-10 h-10 md:w-12 md:h-12 text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <h2
                        className={`text-2xl md:text-3xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${colorMap[selectedExtension.id] || "from-teal-500 to-green-500"}`}
                      >
                        {selectedExtension.displayName}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-gray-500">
                        <span>{selectedExtension.publisher}</span>
                        <span>v{selectedExtension.version}</span>
                      </div>
                      <p className="text-gray-400 text-sm md:text-base mb-4">
                        {selectedExtension.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 text-sm">
                          <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                          <span className="text-white font-medium">{selectedExtension.rating}</span>
                          <span className="text-gray-500">/5.0</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 text-sm">
                          <Download className="w-4 h-4 text-teal-400" />
                          <span className="text-white font-medium">
                            {selectedExtension.downloads.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Main Content */}
                  <div className="lg:col-span-2 p-6 md:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-gray-800">
                    {/* Screenshots */}
                    {selectedExtension.screenshots && selectedExtension.screenshots.length > 0 && (
                      <div>
                        <h3
                          className={`text-lg font-bold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r ${colorMap[selectedExtension.id] || "from-teal-500 to-green-500"}`}
                        >
                          <span className="text-teal-400">|</span> Screenshots
                        </h3>
                        <div className="aspect-video rounded-xl overflow-hidden border border-gray-800 relative">
                          <Image
                            src={selectedExtension.screenshots[0] || "/placeholder.svg"}
                            alt={selectedExtension.displayName}
                            className="w-full h-full object-cover"
                            fill
                          />
                        </div>
                        {selectedExtension.screenshots.length > 1 && (
                          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                            {selectedExtension.screenshots.map((screenshot, index) => (
                              <div
                                key={index}
                                className="shrink-0 w-24 h-14 rounded-lg overflow-hidden border border-gray-700 opacity-70 hover:opacity-100 transition cursor-pointer relative"
                              >
                                <Image
                                  src={screenshot || "/placeholder.svg"}
                                  alt={`Screenshot ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  fill
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Features */}
                    <div>
                      <h3
                        className={`text-lg font-bold mb-4 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r ${colorMap[selectedExtension.id] || "from-teal-500 to-green-500"}`}
                      >
                        <span className="text-teal-400">|</span> Features
                      </h3>
                      <div className="grid gap-2">
                        {selectedExtension.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg bg-gray-900/50"
                          >
                            <div
                              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br ${colorMap[selectedExtension.id] || "from-teal-500 to-green-500"}`}
                            >
                              <ChevronRight className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedExtension.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-3 py-1.5 text-xs rounded-full border border-teal-500/40 text-teal-400 bg-teal-500/10`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 mb-3">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedExtension.categories.map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1.5 text-xs rounded-lg bg-gray-900 text-gray-400"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 mb-3">Links</h3>
                      <div className="space-y-2">
                        {selectedExtension.repository && (
                          <a
                            href={selectedExtension.repository}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-3 rounded-lg bg-gray-900 text-gray-300 hover:bg-gray-800 transition"
                          >
                            <Github className="w-4 h-4" />
                            <span className="text-sm">Repository</span>
                            <ExternalLink className="w-3 h-3 ml-auto text-gray-500" />
                          </a>
                        )}
                        {selectedExtension.homepage && (
                          <a
                            href={selectedExtension.homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 p-3 rounded-lg text-white transition bg-gradient-to-r ${colorMap[selectedExtension.id] || "from-teal-500 to-green-500"}`}
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
            {locale === "en" ? "Click to view details" : "クリックして詳細を表示"}
          </p>
        </div>

        <div className="space-y-6">
          {extensions.map((ext) => (
            <div
              key={ext.id}
              onClick={() => setSelectedExtension(ext)}
              className="p-6 bg-slate-900/50 border border-slate-800 backdrop-blur hover:border-slate-600 transition-all cursor-pointer group rounded-xl shadow-sm"
            >
              <div className="flex items-start gap-5">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorMap[ext.id] || "from-teal-500 to-emerald-500"} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                >
                  <IconFromKey iconKey={ext.icon} className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white truncate">{ext.displayName}</h3>
                    <span className="text-sm text-slate-500 shrink-0">v{ext.version}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{ext.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ext.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border px-2 py-1 bg-slate-800 text-slate-300 border-slate-700 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-slate-500">
                      <span className="text-slate-300 font-medium">
                        {(ext.downloads / 1000).toFixed(1)}K
                      </span>{" "}
                      downloads
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      {"★".repeat(Math.floor(ext.rating))}
                      <span className="text-slate-500 ml-1">{ext.rating}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Modal - Extension Showcase Style */}
      {selectedExtension && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedExtension(null)}
        >
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-xl shadow-sm"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-slate-800">
              <button
                onClick={() => setSelectedExtension(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${colorMap[selectedExtension.id] || "from-teal-500 to-emerald-500"} flex items-center justify-center shrink-0`}
                >
                  <IconFromKey
                    iconKey={selectedExtension.icon}
                    className="w-10 h-10 md:w-12 md:h-12 text-white"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {selectedExtension.displayName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-sm text-slate-500">
                    <span>{selectedExtension.publisher}</span>
                    <span>v{selectedExtension.version}</span>
                  </div>
                  <p className="text-slate-400 text-sm md:text-base mb-4">
                    {selectedExtension.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-sm">
                      <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                      <span className="text-white font-medium">{selectedExtension.rating}</span>
                      <span className="text-slate-500">/5.0</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-sm">
                      <Download className="w-4 h-4 text-teal-400" />
                      <span className="text-white font-medium">
                        {selectedExtension.downloads.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
              {/* Main Content */}
              <div className="lg:col-span-2 p-6 md:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-800">
                {/* Screenshots */}
                {selectedExtension.screenshots && selectedExtension.screenshots.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-teal-400">|</span> Screenshots
                    </h3>
                    <div className="aspect-video rounded-xl overflow-hidden border border-slate-700 relative">
                      <Image
                        src={selectedExtension.screenshots[0] || "/placeholder.svg"}
                        alt={selectedExtension.displayName}
                        className="w-full h-full object-cover"
                        fill
                      />
                    </div>
                    {selectedExtension.screenshots.length > 1 && (
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                        {selectedExtension.screenshots.map((screenshot, index) => (
                          <div
                            key={index}
                            className="shrink-0 w-24 h-14 rounded-lg overflow-hidden border border-slate-700 opacity-70 hover:opacity-100 transition cursor-pointer relative"
                          >
                            <Image
                              src={screenshot || "/placeholder.svg"}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-full object-cover"
                              fill
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-teal-400">|</span> Features
                  </h3>
                  <div className="grid gap-2">
                    {selectedExtension.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br ${colorMap[selectedExtension.id] || "from-teal-500 to-emerald-500"}`}
                        >
                          <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="p-6 md:p-8 space-y-6">
                {/* Tech Stack */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExtension.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-md border px-3 py-1.5 bg-teal-500/10 text-teal-400 border-teal-500/30 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExtension.categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 text-slate-400"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 mb-3">Links</h3>
                  <div className="space-y-2">
                    {selectedExtension.repository && (
                      <a
                        href={selectedExtension.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Repository</span>
                        <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                      </a>
                    )}
                    {selectedExtension.homepage && (
                      <a
                        href={selectedExtension.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg text-white transition bg-teal-600 hover:bg-teal-700"
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
        </div>
      )}
    </div>
  )
}
