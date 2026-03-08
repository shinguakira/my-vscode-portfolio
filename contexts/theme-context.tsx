"use client"

import type React from "react"
import { createContext, useContext, useMemo } from "react"

import { adjustBrightness } from "@/lib/color-utils"
import type { VSCodeSettings } from "@/types"
import type { DerivedColors } from "@/types/theme"

interface ThemeContextValue extends DerivedColors {
  settings: VSCodeSettings
  accentColor: string
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({
  settings,
  children,
}: {
  settings: VSCodeSettings
  children: React.ReactNode
}) {
  const value = useMemo<ThemeContextValue>(() => {
    const bgMain = settings.backgroundColor || "#0d0d0d"
    const textPrimary = settings.textColor || "#cccccc"

    return {
      settings,
      accentColor: settings.accentColor,
      bgMain,
      bgSidebar: adjustBrightness(bgMain, 7),
      bgActivityBar: adjustBrightness(bgMain, 13),
      bgTitleBar: adjustBrightness(bgMain, 11),
      bgHover: adjustBrightness(bgMain, 18),
      bgTab: adjustBrightness(bgMain, 7),
      textPrimary,
      textSecondary: adjustBrightness(textPrimary, -50),
      textMuted: adjustBrightness(textPrimary, -80),
    }
  }, [settings])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
