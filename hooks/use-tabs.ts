"use client"

import type React from "react"
import { useCallback, useMemo, useState } from "react"

import { getExtensions } from "@/constants/portfolio-data"
import type { Extension, FileItem, Tab } from "@/types"

export function useTabs(locale: string) {
  const extensions = getExtensions(locale)
  const [tabs, setTabs] = useState<Tab[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)

  const activeExtension = useMemo<Extension | null>(() => {
    if (activeTab?.startsWith("extensions/")) {
      const extId = activeTab.replace("extensions/", "")
      return extensions.find((e) => e.id === extId) || null
    }
    return null
  }, [activeTab, extensions])

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
      const extension = extensions.find((ext) => ext.id === extensionId)
      if (!extension) return

      const tabId = `extensions/${extensionId}`

      setTabs((prev) => {
        if (prev.find((tab) => tab.id === tabId)) return prev
        const newTab: Tab = {
          id: tabId,
          name: extension.displayName,
          icon: extension.icon,
          content: "",
          isDirty: false,
        }
        return [...prev, newTab]
      })
      setActiveTab(tabId)
    },
    [extensions],
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
