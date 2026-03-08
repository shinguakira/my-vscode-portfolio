"use client"

import { useTheme } from "@/contexts/theme-context"

interface EditorAreaProps {
  content: string
  tabId: string
  onContentChange: (tabId: string, content: string) => void
}

export function EditorArea({ content, tabId, onContentChange }: EditorAreaProps) {
  const { settings, textPrimary, textSecondary } = useTheme()

  return (
    <div className="h-full overflow-auto">
      <div className="flex min-h-full">
        <div
          className="w-6 md:w-8 lg:w-12 flex flex-col items-end pr-1 md:pr-2 pt-2 md:pt-4 select-none opacity-50 text-[9px] md:text-[10px] lg:text-xs font-mono shrink-0"
          style={{ color: textSecondary }}
        >
          {content.split("\n").map((_: string, i: number) => (
            <div key={i} className="h-4 md:h-5 lg:h-6 leading-4 md:leading-5 lg:leading-6">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => onContentChange(tabId, e.target.value)}
          className="flex-1 bg-transparent border-none outline-none resize-none p-1 md:p-2 lg:p-4 font-mono text-[10px] md:text-[11px] lg:text-sm leading-4 md:leading-5 lg:leading-6 whitespace-pre min-w-0"
          style={{
            color: textPrimary,
            fontSize: `${Math.max(settings.fontSize - 3, 9)}px`,
          }}
          spellCheck={false}
        />
      </div>
    </div>
  )
}
