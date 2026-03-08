import type { FileItem } from "@/types"

export function getPreviewType(name: string) {
  if (!name) return "default"
  if (name.includes("strong-points")) return "strong-points"
  if (name.includes("faq")) return "faq"
  if (name.includes("profile") || name.includes("about")) return "profile"
  if (name.includes("experience")) return "experience"
  if (name.includes("README")) return "readme"
  if (name.includes("featured") || name.includes("projects")) return "projects"
  if (name.includes("skills")) return "skills"
  if (name.includes("contact")) return "contact"
  return "default"
}

export function findFileInTree(
  items: FileItem[],
  fileName: string,
  path: string[] = [],
): { file: FileItem; path: string[] } | null {
  for (const item of items) {
    if (item.type === "file" && item.name === fileName) {
      return { file: item, path }
    }
    if (item.type === "folder" && item.children) {
      const found = findFileInTree(item.children, fileName, [...path, item.name])
      if (found) return found
    }
  }
  return null
}
