"use client"

import { useCallback, useSyncExternalStore } from "react"

import { DEFAULT_SETTINGS } from "@/constants/vscode-config"
import type { PreviewTheme, VSCodeSettings } from "@/types"

const STORAGE_KEY = "vscode-settings"

let listeners: Array<() => void> = []
let cachedRaw: string | null = null
let cachedSettings: VSCodeSettings = DEFAULT_SETTINGS

function subscribe(listener: () => void) {
  listeners = [...listeners, listener]
  return () => {
    listeners = listeners.filter((l) => l !== listener)
  }
}

function parseSettings(raw: string | null): VSCodeSettings {
  if (!raw) return DEFAULT_SETTINGS
  try {
    const parsed = JSON.parse(raw)
    return {
      backgroundColor: parsed.backgroundColor || DEFAULT_SETTINGS.backgroundColor,
      textColor: parsed.textColor || DEFAULT_SETTINGS.textColor,
      accentColor: parsed.accentColor || DEFAULT_SETTINGS.accentColor,
      fontSize: parsed.fontSize || DEFAULT_SETTINGS.fontSize,
      previewTheme: parsed.previewTheme || DEFAULT_SETTINGS.previewTheme,
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function getSnapshot(): VSCodeSettings {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedSettings = parseSettings(raw)
  }
  return cachedSettings
}

function getServerSnapshot(): VSCodeSettings {
  return DEFAULT_SETTINGS
}

function writeSettings(newSettings: VSCodeSettings) {
  const raw = JSON.stringify(newSettings)
  localStorage.setItem(STORAGE_KEY, raw)
  cachedRaw = raw
  cachedSettings = newSettings
  for (const listener of listeners) {
    listener()
  }
}

export function useSettings() {
  const settings = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const saveSettings = useCallback((newSettings: VSCodeSettings) => {
    writeSettings(newSettings)
  }, [])

  const changePreviewTheme = useCallback((themeId: string) => {
    const current = getSnapshot()
    writeSettings({ ...current, previewTheme: themeId as PreviewTheme })
  }, [])

  return { settings, saveSettings, changePreviewTheme }
}
