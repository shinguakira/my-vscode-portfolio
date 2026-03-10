"use client"

import type { Project } from "@shinguakira/portfolio-api-types"
import type React from "react"
import { useCallback, useMemo, useState } from "react"

import type { FileItem, Tab } from "@/types"
import { useProjectsData } from "./use-projects-data"

export function useTabs(locale: string) {
  const { data: projects } = useProjectsData()
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const activeExtension = useMemo<Project | null>(() => {
    if (activeTab?.startsWith("extensions/") && projects) {
      const extId = activeTab.replace("extensions/", "")
      const idx = Number(extId)
      return projects[idx] ?? null
    }
    return null
  }, [activeTab, projects])

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)

  const openFile = useCallback((file: FileItem, path: string[] = []) => {
    const fileId = [...path, file.name].join("/")

    setTabs((prev) => {
      if (prev.find((tab) => tab.id === fileId)) return prev
      const newTab: Tab = {
        id: fileId,
        name: file.name,
        icon: file.icon,
        content: file.content || "",
        isDirty: false,
      }
      return [...prev, newTab]
    })
    setActiveTab(fileId)
  }, [])

  const openExtension = useCallback(
    (extensionId: string) => {
      if (!projects) return
      const idx = Number(extensionId)
      const project = projects[idx]
      if (!project) return

      const tabId = `extensions/${extensionId}`

      setTabs((prev) => {
        if (prev.find((tab) => tab.id === tabId)) return prev
        const newTab: Tab = {
          id: tabId,
          name: project.title,
          icon: "folder-code",
          content: "",
          isDirty: false,
        }
        return [...prev, newTab]
      })
      setActiveTab(tabId)
    },
    [projects],
  )

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()

    setTabs((prev) => {
      const filtered = prev.filter((tab) => tab.id !== tabId)

      if (activeTab === tabId) {
        const closedIndex = prev.findIndex((tab) => tab.id === tabId)
        const nextTab = filtered[closedIndex] || filtered[closedIndex - 1] || null
        setActiveTab(nextTab?.id || null)
      }

      return filtered
    })
  }

  const updateTabContent = (tabId: string, content: string) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === tabId ? { ...tab, content, isDirty: true } : tab)),
    )
  }

  return {
    tabs,
    activeTab,
    setActiveTab,
    activeExtension,
    activeTabContent,
    openFile,
    openExtension,
    closeTab,
    updateTabContent,
  }
}
