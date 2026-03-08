"use client"

import { RotateCcw } from "lucide-react"

import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"

export function LandscapePrompt() {
  const locale = useLocale()
  const { bgMain, textPrimary, accentColor } = useTheme()

  return (
    <div
      className="landscape-prompt fixed inset-0 z-50 hidden flex-col items-center justify-center p-6 text-center"
      style={{ backgroundColor: bgMain }}
    >
      <div className="animate-pulse mb-6" style={{ color: accentColor }}>
        <RotateCcw className="w-16 h-16 mx-auto" />
      </div>
      <h2 className="text-xl font-bold mb-3" style={{ color: textPrimary }}>
        {locale === "en" ? "Please view in landscape" : "横向きでご覧ください"}
      </h2>
      <p className="text-sm opacity-70 max-w-xs" style={{ color: textPrimary }}>
        {locale === "en"
          ? "For the best experience with this VS Code-style portfolio, please rotate your device to landscape orientation."
          : "VS Code風のポートフォリオを快適にご覧いただくために、デバイスを横向き（ランドスケープ）にしてください。"}
      </p>
      <div className="mt-8 text-xs opacity-50" style={{ color: textPrimary }}>
        {locale === "en"
          ? "Or we recommend accessing from a PC"
          : "または、PCでのアクセスをお勧めします"}
      </div>
    </div>
  )
}
