"use client"

import { ChevronDown, ChevronRight } from "lucide-react"

import { useTheme } from "@/contexts/theme-context"
import { IconFromKey } from "@/lib/icon-map"
import type { FileItem } from "@/types"

interface ExplorerPanelProps {
  fileTree: FileItem[]
  openFolders: string[]
  toggleFolder: (folderName: string) => void
  openFile: (file: FileItem, path: string[]) => void
}

export function ExplorerPanel({
  fileTree,
  openFolders,
  toggleFolder,
  openFile,
}: ExplorerPanelProps) {
  const { textPrimary, textSecondary, bgHover } = useTheme()
  const renderFileTree = (items: FileItem[], level = 0, path: string[] = []) => {
    return items.map((item) => {
      const itemPath = [...path, item.name]
      const isOpen = openFolders.includes(itemPath.join("/"))

      if (item.type === "folder") {
        return (
          <div key={item.name}>
            <button
              onClick={() => toggleFolder(itemPath.join("/"))}
              className="flex items-center gap-0.5 sm:gap-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[11px] md:text-[13px] select-none"
              style={{
                paddingLeft: `${level * 6 + 6}px`,
                color: textPrimary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = bgHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              {isOpen ? (
                <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
              ) : (
                <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 shrink-0" />
              )}
              <span className="mr-0.5 sm:mr-1 shrink-0">
                <IconFromKey iconKey={item.icon} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </span>
              <span className="truncate">{item.name}</span>
            </button>
            {isOpen && item.children && (
              <div>{renderFileTree(item.children, level + 1, itemPath)}</div>
            )}
          </div>
        )
      }

      return (
        <button
          key={item.name}
          onClick={() => openFile(item, path)}
          className="flex items-center gap-0.5 sm:gap-1 w-full px-1 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[11px] md:text-[13px] select-none"
          style={{
            paddingLeft: `${level * 6 + 18}px`,
            color: textPrimary,
          }}
          data-tutorial={`file-${item.name}`}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = bgHover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          <span className="mr-0.5 sm:mr-1 shrink-0">
            <IconFromKey iconKey={item.icon} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </span>
          <span className="truncate">{item.name}</span>
        </button>
      )
    })
  }

  return (
    <div className="py-2">
      <div
        className="px-2 md:px-4 py-1 text-[10px] md:text-[11px] font-bold uppercase flex items-center gap-1 cursor-pointer"
        style={{ color: textSecondary }}
      >
        <ChevronDown className="w-3 h-3" />
        <span>PORTFOLIO</span>
      </div>
      {renderFileTree(fileTree)}
    </div>
  )
}
