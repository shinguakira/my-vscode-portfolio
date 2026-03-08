"use client"

import { Play, X } from "lucide-react"
import type React from "react"

import { useTheme } from "@/contexts/theme-context"
import { IconFromKey } from "@/lib/icon-map"
import { cn } from "@/lib/utils"
import type { Tab } from "@/types"

interface TabBarProps {
  tabs: Tab[]
  activeTab: string | null
  setActiveTab: (id: string) => void
  closeTab: (id: string, e: React.MouseEvent) => void
  previewMode: boolean
  setPreviewMode: (mode: boolean) => void
}

export function TabBar({
  tabs,
  activeTab,
  setActiveTab,
  closeTab,
  previewMode,
  setPreviewMode,
}: TabBarProps) {
  const { accentColor, bgTab, bgMain, textPrimary, textSecondary } = useTheme()
  if (tabs.length === 0) return null

  return (
    <div className="flex bg-[#0D0D0D] overflow-x-auto scrollbar-hide shrink-0">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 min-w-[60px] sm:min-w-[80px] md:min-w-[120px] max-w-[100px] sm:max-w-[150px] md:max-w-[200px] text-[9px] sm:text-[11px] md:text-[13px] border-r border-r-white/5 cursor-pointer group relative",
            activeTab === tab.id ? "bg-[#1E1E1E]" : "bg-[#141414]",
          )}
          style={{
            backgroundColor: activeTab === tab.id ? bgMain : bgTab,
            color: activeTab === tab.id ? textPrimary : textSecondary,
            borderTop: activeTab === tab.id ? `1px solid ${accentColor}` : "1px solid transparent",
          }}
        >
          <span className="shrink-0">
            <IconFromKey iconKey={tab.icon} className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </span>
          <span className="truncate flex-1">{tab.name}</span>
          <button
            onClick={(e) => closeTab(tab.id, e)}
            className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10"
          >
            <X className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
          </button>
        </div>
      ))}
      <div className="flex-1 border-b" style={{ borderColor: bgMain, backgroundColor: bgTab }} />

      {activeTab && (
        <div
          className="flex items-center px-1 sm:px-2 border-b"
          style={{ borderColor: bgMain, backgroundColor: bgTab }}
        >
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2 py-0.5 sm:py-1 text-[8px] sm:text-[10px] md:text-xs rounded hover:bg-white/10 transition-colors"
            style={{
              color: previewMode ? accentColor : textSecondary,
            }}
            title="Preview"
            data-tutorial="preview-button"
          >
            <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
            <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      )}
    </div>
  )
}
