"use client"

import { useMemo, useState } from "react"

import type { FileItem, SearchResult } from "@/types"
import { useProjectsData } from "./use-projects-data"

export function useFileSearch(openFile: (file: FileItem, path: string[]) => void, locale: string) {
  const { data: projects } = useProjectsData()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const fileTree = useMemo<FileItem[]>(() => {
    if (!projects) return []
    return projects.map((p) => ({
      name: `${p.title.toLowerCase().replace(/\s+/g, "-")}.md`,
      type: "file" as const,
      icon: "markdown",
      content: `# ${p.title}\n\n${p.description}\n\n## Technologies\n${p.technologies.join(", ")}`,
    }))
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
