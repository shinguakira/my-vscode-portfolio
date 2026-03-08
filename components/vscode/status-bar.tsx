"use client"
import { AlertTriangle, Bell, Check, GitBranch, PanelBottom, XCircle } from "lucide-react"

import { useTheme } from "@/contexts/theme-context"

interface StatusBarProps {
  terminalOpen: boolean
  setTerminalOpen: (open: boolean) => void
}

export function StatusBar({ terminalOpen, setTerminalOpen }: StatusBarProps) {
  const { accentColor } = useTheme()
  return (
    <div
      className="h-4 sm:h-5 md:h-6 flex items-center justify-between px-1 sm:px-2 md:px-3 text-[7px] sm:text-[9px] md:text-[11px] shrink-0 select-none z-10"
      style={{
        backgroundColor: accentColor,
        color: "#ffffff",
      }}
    >
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
        <div className="flex items-center gap-0.5 sm:gap-1 hover:bg-white/20 px-0.5 sm:px-1 py-0.5 rounded cursor-pointer">
          <GitBranch className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
          <span>main</span>
        </div>
        <div className="hidden sm:flex items-center gap-0.5 sm:gap-1 hover:bg-white/20 px-0.5 sm:px-1 py-0.5 rounded cursor-pointer">
          <XCircle className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
          <span>0</span>
          <AlertTriangle className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 ml-0.5" />
          <span>0</span>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className="flex items-center gap-0.5 hover:bg-white/20 px-0.5 sm:px-1 py-0.5 rounded cursor-pointer"
          title={terminalOpen ? "Close Terminal" : "Open Terminal"}
        >
          <PanelBottom className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
        </button>
        <div className="hidden lg:flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
          <span>Ln 12, Col 45</span>
        </div>
        <div className="flex items-center gap-0.5 hover:bg-white/20 px-0.5 sm:px-1 py-0.5 rounded cursor-pointer">
          <span>UTF-8</span>
        </div>
        <div className="hidden md:flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
          <span>TSX</span>
        </div>
        <div className="hidden lg:flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
          <Check className="w-3 h-3" />
          <span>Prettier</span>
        </div>
        <div className="hover:bg-white/20 px-0.5 sm:px-1 py-0.5 rounded cursor-pointer">
          <Bell className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
        </div>
      </div>
    </div>
  )
}
