"use client"

import { useState } from "react"

import { getFileTree } from "@/constants/portfolio-data"
import type { FileItem, SearchResult } from "@/types"

export function useFileSearch(openFile: (file: FileItem, path: string[]) => void, locale: string) {
  const fileTree = getFileTree(locale)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

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
