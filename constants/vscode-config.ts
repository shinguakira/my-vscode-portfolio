// VS Code UIの配色とレイアウト定数

import type { PreviewTheme } from "@/types"

export const THEME_PRESETS = [
  {
    name: "ダークブラック",
    backgroundColor: "#0D0D0D",
    textColor: "#CCCCCC",
    accentColor: "#007ACC",
  },
  {
    name: "ミッドナイト",
    backgroundColor: "#1A1A2E",
    textColor: "#E0E0E0",
    accentColor: "#4A90E2",
  },
  {
    name: "ダークブルー",
    backgroundColor: "#0E1525",
    textColor: "#C5D4DD",
    accentColor: "#00D9FF",
  },
  {
    name: "ダークグリーン",
    backgroundColor: "#0D1B0E",
    textColor: "#C8E6C9",
    accentColor: "#4CAF50",
  },
  {
    name: "ダークパープル",
    backgroundColor: "#1A0D1F",
    textColor: "#E1BEE7",
    accentColor: "#9C27B0",
  },
  {
    name: "グレー",
    backgroundColor: "#1E1E1E",
    textColor: "#D4D4D4",
    accentColor: "#007ACC",
  },
]

export const THEME_PRESETS_EN = [
  { name: "Dark Black", backgroundColor: "#0D0D0D", textColor: "#CCCCCC", accentColor: "#007ACC" },
  { name: "Midnight", backgroundColor: "#1A1A2E", textColor: "#E0E0E0", accentColor: "#4A90E2" },
  { name: "Dark Blue", backgroundColor: "#0E1525", textColor: "#C5D4DD", accentColor: "#00D9FF" },
  { name: "Dark Green", backgroundColor: "#0D1B0E", textColor: "#C8E6C9", accentColor: "#4CAF50" },
  { name: "Dark Purple", backgroundColor: "#1A0D1F", textColor: "#E1BEE7", accentColor: "#9C27B0" },
  { name: "Gray", backgroundColor: "#1E1E1E", textColor: "#D4D4D4", accentColor: "#007ACC" },
]

export const getThemePresets = (locale: string) =>
  locale === "en" ? THEME_PRESETS_EN : THEME_PRESETS

export const PREVIEW_THEMES: Array<{ id: PreviewTheme; name: string; description: string }> = [
  {
    id: "modern",
    name: "モダン",
    description: "ダークテーマとグラデーションを使用した現代的なデザイン",
  },
  {
    id: "innovative",
    name: "革新的",
    description: "実験的で未来的な大胆なビジュアルデザイン",
  },
  {
    id: "professional",
    name: "プロフェッショナル",
    description: "洗練されたミニマルでエレガントなデザイン",
  },
]

export const PREVIEW_THEMES_EN: Array<{ id: PreviewTheme; name: string; description: string }> = [
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with dark theme and gradients",
  },
  {
    id: "innovative",
    name: "Innovative",
    description: "Experimental and futuristic bold visual design",
  },
  { id: "professional", name: "Professional", description: "Refined, minimal, and elegant design" },
]

export const getPreviewThemes = (locale: string) =>
  locale === "en" ? PREVIEW_THEMES_EN : PREVIEW_THEMES

export const DEFAULT_SETTINGS: {
  backgroundColor: string
  textColor: string
  accentColor: string
  fontSize: number
  previewTheme: PreviewTheme
} = {
  backgroundColor: "#0D0D0D",
  textColor: "#CCCCCC",
  accentColor: "#007ACC",
  fontSize: 14,
  previewTheme: "modern",
}
