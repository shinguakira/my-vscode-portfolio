"use client"

import { ChevronUp, Trash2 } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"

import { getGitHistory } from "@/constants/portfolio-data"
import {
  TERMINAL_HELP_TEXT,
  TERMINAL_INITIAL_LOGS,
  TERMINAL_LS_FILES,
  TERMINAL_START_SEQUENCE,
} from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"
import { adjustBrightness } from "@/lib/color-utils"
import { cn } from "@/lib/utils"

interface TerminalPanelProps {
  isOpen: boolean
  onCommandRef?: (fn: (command: string) => void) => void
}

interface LogEntry {
  id: number
  type: "command" | "output" | "error" | "success" | "info"
  content: string
  timestamp?: string
}

export function TerminalPanel({ isOpen, onCommandRef }: TerminalPanelProps) {
  const locale = useLocale()
  const gitHistory = getGitHistory(locale)
  const { settings } = useTheme()
  const [logs, setLogs] = useState<LogEntry[]>(
    TERMINAL_INITIAL_LOGS.map((content, i) => ({ id: i + 1, type: "info" as const, content })),
  )
  const [input, setInput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const logsEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("TERMINAL")

  const bgPanel = settings.backgroundColor
  const textPrimary = settings.textColor

  const borderColor = adjustBrightness(bgPanel, 20)

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    scrollToBottom()
  }, [isOpen, logs])

  const handleCommand = useCallback(
    async (cmd: string) => {
      const trimmedCmd = cmd.trim()

      setLogs((prev) => [
        ...prev,
        { id: Date.now(), type: "command", content: `user@portfolio:~$ ${trimmedCmd}` },
      ])
      setInput("")

      if (!trimmedCmd) return

      if (trimmedCmd === "clear" || trimmedCmd === "cls") {
        setLogs([])
        return
      }

      if (trimmedCmd === "help") {
        setLogs((prev) => [
          ...prev,
          ...TERMINAL_HELP_TEXT.map((text, i) => ({
            id: Date.now() + i,
            type: "info" as const,
            content: text,
          })),
        ])
        return
      }

      if (trimmedCmd === "ls") {
        setLogs((prev) => [
          ...prev,
          { id: Date.now(), type: "info", content: TERMINAL_LS_FILES.join("  ") },
        ])
        return
      }

      if (
        trimmedCmd === "npm run start" ||
        trimmedCmd === "npm start" ||
        trimmedCmd === "yarn start"
      ) {
        setIsRunning(true)

        for (const line of TERMINAL_START_SEQUENCE) {
          await new Promise((r) => setTimeout(r, 300))
          setLogs((prev) => [...prev, { id: Date.now(), type: "info", content: line }])
        }

        const sortedHistory = [...gitHistory].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )

        for (const commit of sortedHistory) {
          await new Promise((r) => setTimeout(r, 800))
          setLogs((prev) => [
            ...prev,
            {
              id: Date.now(),
              type: "success",
              content: `[${commit.date}] ${commit.company} - ${commit.position}`,
              timestamp: commit.date,
            },
          ])

          await new Promise((r) => setTimeout(r, 200))
          setLogs((prev) => [
            ...prev,
            {
              id: Date.now(),
              type: "info",
              content: `  └─ ${commit.message}`,
            },
          ])
        }

        await new Promise((r) => setTimeout(r, 500))
        setLogs((prev) => [
          ...prev,
          { id: Date.now(), type: "success", content: "✨  Compile Distributed Successfully" },
        ])
        setIsRunning(false)
        return
      }

      setLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "error",
          content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`,
        },
      ])
    },
    [gitHistory],
  )

  useEffect(() => {
    if (onCommandRef) {
      onCommandRef(handleCommand)
    }
  }, [onCommandRef, handleCommand])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isRunning) {
      handleCommand(input)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="h-full border-t flex flex-col font-mono text-[9px] sm:text-[11px] md:text-sm"
      style={{
        backgroundColor: bgPanel,
        borderColor: borderColor,
        color: textPrimary,
      }}
    >
      {/* ターミナルタブヘッダー */}
      <div
        className="flex items-center px-1 sm:px-2 md:px-4 border-b h-6 sm:h-7 md:h-9 select-none shrink-0"
        style={{ borderColor }}
      >
        <div className="flex gap-2 sm:gap-4 md:gap-6 text-[8px] sm:text-[9px] md:text-[11px] font-medium tracking-wide overflow-x-auto">
          {["TERMINAL", "OUTPUT", "PROBLEMS"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "h-6 sm:h-7 md:h-9 relative px-0.5 sm:px-1 transition-colors hover:text-opacity-100 whitespace-nowrap",
                activeTab === tab ? "text-opacity-100" : "text-opacity-60",
              )}
              style={{
                color: activeTab === tab ? textPrimary : textPrimary,
                borderBottom: activeTab === tab ? `1px solid ${settings.accentColor}` : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setLogs([])}
            className="p-0.5 sm:p-1 rounded hover:bg-white/10"
            title="Clear"
          >
            <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
          </button>
          <button className="p-0.5 sm:p-1 rounded hover:bg-white/10" title="Maximize">
            <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
          </button>
        </div>
      </div>

      {/* ターミナルコンテンツ */}
      <div
        className="flex-1 overflow-auto p-1 sm:p-2 font-mono text-[8px] sm:text-[10px] md:text-[13px]"
        onClick={() => inputRef.current?.focus()}
      >
        {logs.map((log) => (
          <div
            key={log.id}
            className="leading-4 sm:leading-5 md:leading-6 whitespace-pre-wrap break-all"
          >
            <span
              className={cn(
                log.type === "error"
                  ? "text-red-400"
                  : log.type === "success"
                    ? "text-green-400"
                    : log.type === "command"
                      ? "font-bold"
                      : "opacity-90",
              )}
              style={{ color: log.type === "command" ? textPrimary : undefined }}
            >
              {log.content}
            </span>
          </div>
        ))}

        <div className="flex items-center mt-0.5 sm:mt-1">
          <span className="mr-1 sm:mr-2 text-green-400">$</span>
          <span className="mr-1 sm:mr-2 text-cyan-400 hidden sm:inline">portfolio</span>
          <span className="mr-1 sm:mr-2 text-yellow-400 hidden md:inline">git:(main)</span>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none border-none p-0 m-0 text-[8px] sm:text-[10px] md:text-[13px]"
              style={{ color: textPrimary, caretColor: textPrimary }}
              disabled={isRunning}
              autoComplete="off"
              spellCheck="false"
              placeholder="help"
            />
          </div>
        </div>
        <div ref={logsEndRef} />
      </div>
    </div>
  )
}
