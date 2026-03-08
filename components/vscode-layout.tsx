"use client"

import { useCallback, useRef, useState } from "react"

import { EditorArea } from "@/components/editor/editor-area"
import { EmptyState } from "@/components/editor/empty-state"
import { ExtensionShowcase } from "@/components/extension-showcase"
import { LandscapePrompt } from "@/components/landscape-prompt"
import { PreviewPanel } from "@/components/preview/preview-panel"
import { ResizableDivider } from "@/components/resizable-divider"
import { SidebarContainer } from "@/components/sidebar/sidebar-container"
import { TerminalPanel } from "@/components/terminal-panel"
import { TutorialOverlay } from "@/components/tutorial-overlay"
import { ActivityBar } from "@/components/vscode/activity-bar"
import { SettingsPanel } from "@/components/vscode/settings-panel"
import { StatusBar } from "@/components/vscode/status-bar"
import { TabBar } from "@/components/vscode/tab-bar"
import { TitleBar } from "@/components/vscode/title-bar"
import { getFileTree } from "@/constants/portfolio-data"
import { useLocale } from "@/contexts/locale-context"
import { ThemeProvider, useTheme } from "@/contexts/theme-context"
import { useFileSearch } from "@/hooks/use-file-search"
import { useResponsive } from "@/hooks/use-responsive"
import { useSettings } from "@/hooks/use-settings"
import { useTabs } from "@/hooks/use-tabs"
import type { FileItem, SearchResult } from "@/types"

export function VSCodeLayout() {
  const { settings, saveSettings, changePreviewTheme } = useSettings()

  return (
    <ThemeProvider settings={settings}>
      <VSCodeLayoutInner saveSettings={saveSettings} changePreviewTheme={changePreviewTheme} />
    </ThemeProvider>
  )
}

function VSCodeLayoutInner({
  saveSettings,
  changePreviewTheme,
}: {
  saveSettings: (s: import("@/types").VSCodeSettings) => void
  changePreviewTheme: (themeId: string) => void
}) {
  const locale = useLocale()
  const { settings, bgMain, bgActivityBar, accentColor } = useTheme()
  const fileTree = getFileTree(locale)

  const {
    tabs,
    activeTab,
    setActiveTab,
    activeExtension,
    activeTabContent,
    openFile,
    openExtension,
    closeTab,
    updateTabContent,
  } = useTabs(locale)

  const {
    isMobile,
    sidebarWidth,
    terminalHeight,
    sidebarCollapsed,
    setSidebarCollapsed,
    terminalOpen,
    setTerminalOpen,
    handleMainAreaClick,
    handleSidebarResize,
    handleTerminalResize,
  } = useResponsive()

  const [openFolders, setOpenFolders] = useState<string[]>(["about", "projects"])
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [searchMode, setSearchMode] = useState(false)
  const [historyMode, setHistoryMode] = useState(false)
  const [diffMode, setDiffMode] = useState(false)
  const [extensionsMode, setExtensionsMode] = useState(false)

  const {
    searchQuery,
    searchResults,
    handleSearchChange,
    openSearchResult: openSearchResultRaw,
  } = useFileSearch(openFile, locale)

  const openSearchResult = useCallback(
    (result: SearchResult) => {
      openSearchResultRaw(result, setSearchMode)
    },
    [openSearchResultRaw],
  )

  const terminalCommandRef = useRef<((command: string) => void) | null>(null)
  const tutorialRestartRef = useRef<(() => void) | null>(null)

  const handleTutorialUIChange = useCallback(
    (uiState: {
      sidebarMode?: "explorer" | "search" | "gitHistory" | "gitDiff" | "extensions" | "settings"
      terminalOpen?: boolean
      sidebarCollapsed?: boolean
    }) => {
      if (uiState.sidebarCollapsed !== undefined) {
        setSidebarCollapsed(uiState.sidebarCollapsed)
      }
      if (uiState.terminalOpen !== undefined) {
        setTerminalOpen(uiState.terminalOpen)
      }
      if (uiState.sidebarMode) {
        setSearchMode(false)
        setHistoryMode(false)
        setDiffMode(false)
        setExtensionsMode(false)
        setSettingsOpen(false)

        switch (uiState.sidebarMode) {
          case "explorer":
            break
          case "search":
            setSearchMode(true)
            break
          case "gitHistory":
            setHistoryMode(true)
            break
          case "gitDiff":
            setDiffMode(true)
            break
          case "extensions":
            setExtensionsMode(true)
            break
          case "settings":
            setSettingsOpen(true)
            break
        }
      }
    },
    [setSidebarCollapsed, setTerminalOpen],
  )

  const handleTutorialOpenFile = useCallback(
    (fileName: string) => {
      const findFile = (
        items: FileItem[],
        path: string[] = [],
      ): { file: FileItem; path: string[] } | null => {
        for (const item of items) {
          if (item.type === "file" && item.name === fileName) {
            return { file: item, path }
          }
          if (item.type === "folder" && item.children) {
            const found = findFile(item.children, [...path, item.name])
            if (found) return found
          }
        }
        return null
      }

      const result = findFile(fileTree)
      if (result) {
        openFile(result.file, result.path)
      }
    },
    [openFile, fileTree],
  )

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) =>
      prev.includes(folderName) ? prev.filter((f) => f !== folderName) : [...prev, folderName],
    )
  }

  return (
    <>
      <LandscapePrompt />

      <TutorialOverlay
        onUIStateChange={handleTutorialUIChange}
        onOpenFile={handleTutorialOpenFile}
        onOpenExtension={openExtension}
        onTogglePreview={setPreviewMode}
        onRunCommand={(cmd) => terminalCommandRef.current?.(cmd)}
        onChangePreviewTheme={changePreviewTheme}
        onRestartRef={(fn) => {
          tutorialRestartRef.current = fn
        }}
      />

      <div
        className="h-screen w-full flex flex-col font-mono overflow-hidden"
        style={{ backgroundColor: bgMain }}
      >
        <TitleBar
          terminalOpen={terminalOpen}
          setTerminalOpen={setTerminalOpen}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          setSearchMode={setSearchMode}
          onHelpClick={() => tutorialRestartRef.current?.()}
        />

        <div className="flex flex-1 overflow-hidden">
          <div data-tutorial="activity-bar">
            <ActivityBar
              searchMode={searchMode}
              historyMode={historyMode}
              diffMode={diffMode}
              extensionsMode={extensionsMode}
              sidebarCollapsed={sidebarCollapsed}
              setSearchMode={setSearchMode}
              setHistoryMode={setHistoryMode}
              setDiffMode={setDiffMode}
              setExtensionsMode={setExtensionsMode}
              setSidebarCollapsed={setSidebarCollapsed}
              setSettingsOpen={setSettingsOpen}
            />
          </div>

          {!sidebarCollapsed && (
            <>
              <div
                style={{ width: `${sidebarWidth}px` }}
                className="shrink-0 flex flex-col"
                data-tutorial="sidebar"
              >
                <SidebarContainer
                  sidebarCollapsed={sidebarCollapsed}
                  setSidebarCollapsed={setSidebarCollapsed}
                  searchMode={searchMode}
                  historyMode={historyMode}
                  diffMode={diffMode}
                  extensionsMode={extensionsMode}
                  searchQuery={searchQuery}
                  handleSearchChange={handleSearchChange}
                  searchResults={searchResults}
                  openSearchResult={openSearchResult}
                  fileTree={fileTree}
                  openFolders={openFolders}
                  toggleFolder={toggleFolder}
                  openFile={openFile}
                  openExtension={openExtension}
                />
              </div>

              <ResizableDivider
                direction="vertical"
                onResize={handleSidebarResize}
                bgColor={bgActivityBar}
                hoverColor={accentColor}
              />
            </>
          )}

          <div
            className="flex-1 flex flex-col min-w-0"
            style={{ backgroundColor: bgMain }}
            onClick={handleMainAreaClick}
            onKeyDown={(e) => {
              if (e.key === "Escape" && isMobile) {
                setSidebarCollapsed(true)
              }
            }}
          >
            <TabBar
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              closeTab={closeTab}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />

            <div className="flex-1 overflow-hidden relative" data-tutorial="editor-area">
              {activeExtension ? (
                <ExtensionShowcase extension={activeExtension} />
              ) : activeTabContent ? (
                previewMode ? (
                  <div className="h-full overflow-auto">
                    <PreviewPanel
                      content={activeTabContent.content}
                      fileName={activeTabContent.name}
                      theme={settings.previewTheme}
                    />
                  </div>
                ) : (
                  <EditorArea
                    content={activeTabContent.content}
                    tabId={activeTabContent.id}
                    onContentChange={updateTabContent}
                  />
                )
              ) : (
                <EmptyState />
              )}
            </div>

            {terminalOpen && (
              <>
                <ResizableDivider
                  direction="horizontal"
                  onResize={handleTerminalResize}
                  bgColor={bgActivityBar}
                  hoverColor={accentColor}
                />
                <div
                  style={{ height: `${terminalHeight}px`, minHeight: "150px" }}
                  className="shrink-0 flex flex-col"
                  data-tutorial="terminal"
                >
                  <TerminalPanel
                    isOpen={true}
                    onCommandRef={(fn) => {
                      terminalCommandRef.current = fn
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <StatusBar terminalOpen={terminalOpen} setTerminalOpen={setTerminalOpen} />

        {settingsOpen && (
          <SettingsPanel onSave={saveSettings} onClose={() => setSettingsOpen(false)} />
        )}
      </div>
    </>
  )
}
