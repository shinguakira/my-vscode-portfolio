"use client"

import { Menu } from "lucide-react"
import type React from "react"

import { useTheme } from "@/contexts/theme-context"
import type { FileItem, SearchResult } from "@/types"

import { ChangelogPanel } from "./changelog-panel"
import { ExplorerPanel } from "./explorer-panel"
import { ExtensionsPanel } from "./extensions-panel"
import { GitHistoryPanel } from "./git-history-panel"
import { SearchPanel } from "./search-panel"

interface SidebarContainerProps {
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  searchMode: boolean
  historyMode: boolean
  diffMode: boolean
  extensionsMode: boolean
  searchQuery: string
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchResults: SearchResult[]
  openSearchResult: (result: SearchResult) => void
  fileTree: FileItem[]
  openFolders: string[]
  toggleFolder: (folderName: string) => void
  openFile: (file: FileItem, path: string[]) => void
  openExtension: (extensionId: string) => void
}

function getModeTitle(
  searchMode: boolean,
  historyMode: boolean,
  diffMode: boolean,
  extensionsMode: boolean,
) {
  if (searchMode) return "Search"
  if (historyMode) return "History"
  if (diffMode) return "Changelog"
  if (extensionsMode) return "Extensions"
  return "Explorer"
}

export function SidebarContainer({
  sidebarCollapsed,
  setSidebarCollapsed,
  searchMode,
  historyMode,
  diffMode,
  extensionsMode,
  searchQuery,
  handleSearchChange,
  searchResults,
  openSearchResult,
  fileTree,
  openFolders,
  toggleFolder,
  openFile,
  openExtension,
}: SidebarContainerProps) {
  const { bgSidebar, bgMain, textPrimary } = useTheme()
  const isExplorer = !searchMode && !historyMode && !diffMode && !extensionsMode

  return (
    <div
      className={`border-r transition-all duration-200 flex flex-col shrink-0 h-full ${sidebarCollapsed ? "w-0" : "w-full"}`}
      style={{ backgroundColor: bgSidebar, borderColor: bgMain }}
    >
      {!sidebarCollapsed && (
        <>
          <div
            className="h-6 sm:h-7 md:h-9 px-1 sm:px-2 md:px-4 flex items-center justify-between text-[8px] sm:text-[10px] md:text-[11px] uppercase tracking-wide shrink-0"
            style={{ color: textPrimary }}
          >
            <span className="truncate">
              {getModeTitle(searchMode, historyMode, diffMode, extensionsMode)}
            </span>
            <button onClick={() => setSidebarCollapsed(true)}>
              <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ maxWidth: "600px" }}>
            {extensionsMode && !searchMode && !historyMode && !diffMode && (
              <ExtensionsPanel openExtension={openExtension} />
            )}

            {searchMode && !historyMode && !diffMode && !extensionsMode && (
              <SearchPanel
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                searchResults={searchResults}
                openSearchResult={openSearchResult}
              />
            )}

            {historyMode && !searchMode && !diffMode && !extensionsMode && <GitHistoryPanel />}

            {diffMode && !searchMode && !historyMode && !extensionsMode && <ChangelogPanel />}

            {isExplorer && (
              <ExplorerPanel
                fileTree={fileTree}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
                openFile={openFile}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
