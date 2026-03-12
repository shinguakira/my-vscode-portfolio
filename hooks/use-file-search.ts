"use client"

import { useMemo, useState } from "react"

import type { FileItem, SearchResult } from "@/types"
import { useProjectsData } from "./use-projects-data"

export function useFileSearch(openFile: (file: FileItem, path: string[]) => void, locale: string) {
  const { data: projects } = useProjectsData()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const fileTree = useMemo<FileItem[]>(() => {
    const projectsContent = (projects ?? [])
      .map(
        (p) =>
          `  { title: "${p.title}", description: "${p.description}", technologies: [${p.technologies.map((t) => `"${t}"`).join(", ")}] }`,
      )
      .join(",\n")
    return [
      {
        name: "src",
        type: "folder" as const,
        icon: "folder",
        children: [
          { name: "projects.ts", type: "file" as const, icon: "typescript", content: `export const projects = [\n${projectsContent}\n]` },
        ],
      },
      { name: "articles.md", type: "file" as const, icon: "newspaper", content: "# Articles\n\nTechnical blog posts" },
      { name: "notifications.json", type: "file" as const, icon: "bell", content: "{\n  \"notifications\": []\n}" },
    ]
  }, [projects])

  const searchInFiles = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const results: SearchResult[] = []
    const searchLower = query.toLowerCase()

    const searchRecursive = (items: FileItem[], currentPath: string[] = []) => {
      items.forEach((item: FileItem) => {
        const itemPath = [...currentPath, item.name]

        if (item.type === "file" && item.content) {
          const lines = item.content.split("\n")
          const matches: Array<{ line: number; text: string; matchIndex: number }> = []

          lines.forEach((line: string, index: number) => {
            const lineLower = line.toLowerCase()
            const matchIndex = lineLower.indexOf(searchLower)

            if (matchIndex !== -1) {
              matches.push({
                line: index + 1,
                text: line.trim(),
                matchIndex,
              })
            }
          })

          if (matches.length > 0) {
            results.push({
              file: item,
              path: itemPath,
              matches,
            })
          }
        }

        if (item.type === "folder" && item.children) {
          searchRecursive(item.children, itemPath)
        }
      })
    }

    searchRecursive(fileTree)
    setSearchResults(results)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    searchInFiles(query)
  }

  const openSearchResult = (result: SearchResult, setSearchMode: (v: boolean) => void) => {
    const folderPath = result.path.slice(0, -1)
    openFile(result.file, folderPath)
    setSearchMode(false)
  }

  return {
    searchQuery,
    searchResults,
    handleSearchChange,
    openSearchResult,
  }
}
