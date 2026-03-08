"use client"

import { ChevronLeft, ChevronRight, HelpCircle, X } from "lucide-react"
import type React from "react"
import { useCallback, useEffect, useState } from "react"

import { getTutorialSteps, type TutorialStep } from "@/constants/tutorial-steps"
import { useLocale } from "@/contexts/locale-context"
import { useTheme } from "@/contexts/theme-context"

interface TutorialOverlayProps {
  onUIStateChange: (state: NonNullable<TutorialStep["uiState"]>) => void
  onOpenFile?: (fileName: string) => void
  onOpenExtension?: (extensionId: string) => void
  onTogglePreview?: (on: boolean) => void
  onRunCommand?: (command: string) => void
  onChangePreviewTheme?: (themeId: string) => void
  onRestartRef?: (fn: () => void) => void
}

export function TutorialOverlay({
  onUIStateChange,
  onOpenFile,
  onOpenExtension,
  onTogglePreview,
  onRunCommand,
  onChangePreviewTheme,
  onRestartRef,
}: TutorialOverlayProps) {
  const locale = useLocale()
  const { accentColor, bgSidebar: backgroundColor, textPrimary: textColor } = useTheme()
  const TUTORIAL_STEPS = getTutorialSteps(locale)
  const [showInitialModal, setShowInitialModal] = useState(false)
  const [isTutorialActive, setIsTutorialActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  // Check for small screens (iPhone SE landscape ~568x320)
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setIsSmallScreen(width < 768 || height < 400)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    const dontShow = localStorage.getItem("portfolio-tutorial-dont-show")
    if (dontShow !== "true") {
      const timer = setTimeout(() => setShowInitialModal(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const updateTargetPosition = useCallback(() => {
    if (!isTutorialActive) return
    const step = TUTORIAL_STEPS[currentStep]
    const element = document.querySelector(step.targetSelector)
    if (element) {
      setTargetRect(element.getBoundingClientRect())
    }
  }, [currentStep, isTutorialActive, TUTORIAL_STEPS])

  const executeStepAction = useCallback(
    (step: TutorialStep) => {
      if (!step.action) return

      switch (step.action.type) {
        case "openFile":
          if (onOpenFile && step.action.payload) {
            onOpenFile(step.action.payload)
          }
          break
        case "openExtension":
          if (onOpenExtension && step.action.payload) {
            onOpenExtension(step.action.payload)
          }
          break
        case "togglePreview":
          if (onTogglePreview) {
            onTogglePreview(step.action.payload === "on")
          }
          break
        case "runCommand":
          if (onRunCommand && step.action.payload) {
            onRunCommand(step.action.payload)
          }
          break
        case "changePreviewTheme":
          if (onChangePreviewTheme && step.action.payload) {
            onChangePreviewTheme(step.action.payload)
          }
          // Scroll to preview theme selector in settings panel
          setTimeout(() => {
            const previewThemeSection = document.querySelector(
              "[data-tutorial='preview-theme-selector']",
            )
            if (previewThemeSection) {
              previewThemeSection.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          }, 200)
          break
        case "showPreviewWithTheme":
          // First change the theme
          if (onChangePreviewTheme && step.action.payload) {
            onChangePreviewTheme(step.action.payload)
          }
          // Then open file and enable preview with sufficient delay
          setTimeout(() => {
            if (onOpenFile) {
              onOpenFile("profile.md")
            }
            // Wait for file to open before enabling preview
            setTimeout(() => {
              if (onTogglePreview) {
                onTogglePreview(true)
              }
            }, 200)
          }, 100)
          break
      }
    },
    [onOpenFile, onOpenExtension, onTogglePreview, onRunCommand, onChangePreviewTheme],
  )

  useEffect(() => {
    if (!isTutorialActive) return
    const step = TUTORIAL_STEPS[currentStep]

    if (step.uiState) {
      onUIStateChange(step.uiState)
    }

    const actionTimer = setTimeout(() => {
      executeStepAction(step)
    }, 150)

    const positionTimer = setTimeout(updateTargetPosition, 300)

    return () => {
      clearTimeout(actionTimer)
      clearTimeout(positionTimer)
    }
  }, [
    currentStep,
    isTutorialActive,
    onUIStateChange,
    updateTargetPosition,
    executeStepAction,
    TUTORIAL_STEPS,
  ])

  useEffect(() => {
    if (!isTutorialActive) return
    window.addEventListener("resize", updateTargetPosition)
    window.addEventListener("scroll", updateTargetPosition)
    return () => {
      window.removeEventListener("resize", updateTargetPosition)
      window.removeEventListener("scroll", updateTargetPosition)
    }
  }, [isTutorialActive, updateTargetPosition])

  const startTutorial = () => {
    setShowInitialModal(false)
    setIsTutorialActive(true)
    setCurrentStep(0)
  }

  const skipTutorial = () => {
    setShowInitialModal(false)
    if (dontShowAgain) {
      localStorage.setItem("portfolio-tutorial-dont-show", "true")
    }
  }

  const nextStep = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      endTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const endTutorial = () => {
    setIsTutorialActive(false)
    onUIStateChange({ sidebarMode: "explorer", terminalOpen: false, sidebarCollapsed: false })
    if (onTogglePreview) {
      onTogglePreview(false)
    }
  }

  const restartTutorial = useCallback(() => {
    setShowInitialModal(false)
    setIsTutorialActive(true)
    setCurrentStep(0)
  }, [])

  useEffect(() => {
    if (onRestartRef) {
      onRestartRef(restartTutorial)
    }
  }, [onRestartRef, restartTutorial])

  // Initial modal - responsive for mobile landscape
  if (showInitialModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-2">
        <div
          className={`rounded-lg shadow-2xl ${isSmallScreen ? "max-w-[90vw] max-h-[90vh] p-3" : "max-w-md p-6"}`}
          style={{ backgroundColor, color: textColor }}
        >
          <div className={`flex items-center gap-2 ${isSmallScreen ? "mb-2" : "gap-3 mb-4"}`}>
            <HelpCircle
              className={isSmallScreen ? "w-5 h-5 shrink-0" : "w-8 h-8"}
              style={{ color: accentColor }}
            />
            <h2 className={`font-bold ${isSmallScreen ? "text-sm" : "text-xl"}`}>
              {locale === "en" ? "Welcome to the Portfolio!" : "ポートフォリオへようこそ!"}
            </h2>
          </div>
          <p className={`opacity-80 ${isSmallScreen ? "text-xs mb-3" : "text-sm mb-6"}`}>
            {locale === "en"
              ? "This portfolio is built with a VS Code-style UI. Would you like a guided tour?"
              : "VS Code風のUIで作成されています。使い方の説明をご覧になりますか？"}
          </p>
          <label
            className={`flex items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 ${isSmallScreen ? "text-xs mb-2" : "text-sm mb-4"}`}
          >
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className={`rounded ${isSmallScreen ? "w-3 h-3" : "w-4 h-4"}`}
              style={{ accentColor }}
            />
            {locale === "en" ? "Don't show this again" : "今後このメッセージを表示しない"}
          </label>
          <div className="flex gap-2 justify-end">
            <button
              onClick={skipTutorial}
              className={`inline-flex items-center justify-center rounded-md border border-current/30 bg-transparent text-sm font-medium transition-all hover:bg-white/10 ${isSmallScreen ? "text-xs px-2 py-1 h-7" : "h-9 px-4 py-2"}`}
            >
              {locale === "en" ? "Skip" : "スキップ"}
            </button>
            <button
              onClick={startTutorial}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-all ${isSmallScreen ? "text-xs px-2 py-1 h-7" : "h-9 px-4 py-2"}`}
              style={{ backgroundColor: accentColor, color: "#fff" }}
            >
              {locale === "en" ? "Take the Tour" : "説明を見る"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!isTutorialActive || !targetRect) return null

  const step = TUTORIAL_STEPS[currentStep]
  const padding = isSmallScreen ? 4 : 8

  // Responsive tooltip positioning
  const getTooltipStyle = (): React.CSSProperties => {
    const tooltipWidth = isSmallScreen ? 220 : 320
    const tooltipHeight = isSmallScreen ? 140 : 200
    const gap = isSmallScreen ? 8 : 16

    // For small screens, use mobilePosition or fallback logic
    const effectivePosition =
      isSmallScreen && step.mobilePosition ? step.mobilePosition : step.position

    let style: React.CSSProperties = {}

    if (isSmallScreen && step.mobilePosition === "center") {
      // Center on screen for mobile
      return {
        left: (window.innerWidth - tooltipWidth) / 2,
        top: (window.innerHeight - tooltipHeight) / 2,
      }
    }

    switch (effectivePosition) {
      case "right":
        style = {
          left: Math.min(targetRect.right + gap, window.innerWidth - tooltipWidth - 10),
          top: Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
              window.innerHeight - tooltipHeight - 10,
            ),
          ),
        }
        break
      case "left":
        style = {
          left: Math.max(10, targetRect.left - tooltipWidth - gap),
          top: Math.max(
            10,
            Math.min(
              targetRect.top + targetRect.height / 2 - tooltipHeight / 2,
              window.innerHeight - tooltipHeight - 10,
            ),
          ),
        }
        break
      case "top":
        style = {
          left: Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
              window.innerWidth - tooltipWidth - 10,
            ),
          ),
          top: Math.max(10, targetRect.top - tooltipHeight - gap),
        }
        break
      case "bottom":
      default:
        style = {
          left: Math.max(
            10,
            Math.min(
              targetRect.left + targetRect.width / 2 - tooltipWidth / 2,
              window.innerWidth - tooltipWidth - 10,
            ),
          ),
          top: Math.min(targetRect.bottom + gap, window.innerHeight - tooltipHeight - 10),
        }
        break
    }

    return style
  }

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Overlay with cutout */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="tutorial-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect
              x={targetRect.left - padding}
              y={targetRect.top - padding}
              width={targetRect.width + padding * 2}
              height={targetRect.height + padding * 2}
              rx="4"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.75)"
          mask="url(#tutorial-mask)"
        />
      </svg>

      {/* Highlight border */}
      <div
        className="absolute rounded transition-all duration-300 pointer-events-none"
        style={{
          left: targetRect.left - padding,
          top: targetRect.top - padding,
          width: targetRect.width + padding * 2,
          height: targetRect.height + padding * 2,
          border: `2px solid ${accentColor}`,
          boxShadow: `0 0 ${isSmallScreen ? "10px" : "20px"} ${accentColor}50`,
        }}
      />

      {/* Tooltip */}
      <div
        className={`absolute rounded-lg shadow-2xl pointer-events-auto transition-all duration-300 ${isSmallScreen ? "w-[220px] p-2" : "w-80 p-4"}`}
        style={{
          ...getTooltipStyle(),
          backgroundColor,
          color: textColor,
          border: `1px solid ${accentColor}40`,
        }}
      >
        <button
          onClick={endTutorial}
          className="absolute top-1 right-1 p-0.5 rounded hover:bg-white/10 transition-colors"
        >
          <X className={isSmallScreen ? "w-3 h-3" : "w-4 h-4"} />
        </button>

        <div className={`opacity-60 ${isSmallScreen ? "text-[10px] mb-1" : "text-xs mb-2"}`}>
          {currentStep + 1} / {TUTORIAL_STEPS.length}
        </div>

        <h3
          className={`font-bold ${isSmallScreen ? "text-xs mb-1" : "text-lg mb-2"}`}
          style={{ color: accentColor }}
        >
          {step.title}
        </h3>

        <p
          className={`opacity-80 leading-relaxed ${isSmallScreen ? "text-[10px] mb-2" : "text-sm mb-4"}`}
        >
          {step.description}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`inline-flex items-center justify-center rounded-md border border-current/30 disabled:opacity-30 bg-transparent text-sm font-medium transition-all hover:bg-white/10 ${isSmallScreen ? "text-[10px] px-1.5 py-0.5 h-5" : "h-8 px-3"}`}
          >
            <ChevronLeft className={isSmallScreen ? "w-2.5 h-2.5" : "w-4 h-4 mr-1"} />
            {!isSmallScreen && (locale === "en" ? "Prev" : "前へ")}
          </button>
          <button
            onClick={nextStep}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-all ${isSmallScreen ? "text-[10px] px-1.5 py-0.5 h-5" : "h-8 px-3"}`}
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? (
              isSmallScreen ? (
                locale === "en" ? (
                  "Done"
                ) : (
                  "完了"
                )
              ) : locale === "en" ? (
                "Close"
              ) : (
                "閉じる"
              )
            ) : (
              <>
                {!isSmallScreen && (locale === "en" ? "Next" : "次へ")}
                <ChevronRight className={isSmallScreen ? "w-2.5 h-2.5" : "w-4 h-4 ml-1"} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
