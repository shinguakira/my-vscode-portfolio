"use client"

import { useCallback, useEffect, useState } from "react"

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(240)
  const [terminalHeight, setTerminalHeight] = useState(200)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [terminalOpen, setTerminalOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const isSmallMobile = width < 640
      const isMobileScreen = width < 1024

      setIsMobile(isMobileScreen)

      if (isSmallMobile) {
        setSidebarCollapsed(true)
        setTerminalOpen(false)
        setSidebarWidth(Math.min(160, width - 60))
        setTerminalHeight(120)
      } else if (isMobileScreen) {
        setSidebarCollapsed(true)
        setTerminalOpen(false)
        setSidebarWidth(Math.min(200, width - 80))
        setTerminalHeight(150)
      } else {
        setSidebarCollapsed(false)
        setSidebarWidth(280)
        setTerminalHeight(200)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMainAreaClick = useCallback(() => {
    if (isMobile && !sidebarCollapsed) {
      setSidebarCollapsed(true)
    }
  }, [isMobile, sidebarCollapsed])

  const handleSidebarResize = (delta: number) => {
    setSidebarWidth((prev) => Math.max(200, Math.min(600, prev + delta)))
  }

  const handleTerminalResize = (delta: number) => {
    setTerminalHeight((prev) => Math.max(150, Math.min(800, prev - delta)))
  }

  return {
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
  }
}
