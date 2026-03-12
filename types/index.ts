export interface FileItem {
  name: string
  type: "file" | "folder"
  icon: string
  content?: string
  children?: FileItem[]
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

export interface Notification {
  title: string
  content: string
  date: string
}

export interface ArticleTag {
  name: string
  versions: string[]
}

export interface Article {
  id: string
  title: string
  url: string
  created_at: string
  updated_at: string
  likes_count: number
  comments_count: number
  stocks_count: number
  reactions_count: number
  tags: ArticleTag[]
}

export interface ArticlesData {
  totalCount: number
  articles: Article[]
}

