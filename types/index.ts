export interface FileItem {
  name: string
  type: "file" | "folder"
  icon: string
  content?: string
  children?: FileItem[]
}

export interface GitCommit {
  hash: string
  date: string
  author: string
  message: string
  company: string
  position: string
  changes: string[]
}

export interface ChangelogChange {
  type: "added" | "improved" | "fixed" | "removed"
  description: string
}

export interface ChangelogEntry {
  version: string
  date: string
  type: "major" | "minor" | "patch"
  title: string
  changes: ChangelogChange[]
}

export interface Tab {
  id: string
  name: string
  icon: string
  content: string
  isDirty: boolean
}

export type PreviewTheme = "modern" | "innovative" | "professional"

export interface VSCodeSettings {
  backgroundColor: string
  textColor: string
  accentColor: string
  fontSize: number
  previewTheme: PreviewTheme
}

export interface SearchResult {
  file: FileItem
  path: string[]
  matches: Array<{ line: number; text: string; matchIndex: number }>
}

export interface Extension {
  id: string
  name: string
  displayName: string
  description: string
  version: string
  publisher: string
  icon: string
  categories: string[]
  tags: string[]
  downloads: number
  rating: number
  repository?: string
  homepage?: string
  features: string[]
  screenshots?: string[]
}
