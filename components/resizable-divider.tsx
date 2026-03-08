"use client"

import { useEffect, useRef, useState } from "react"

interface ResizableDividerProps {
  direction: "horizontal" | "vertical"
  onResize: (delta: number) => void
  bgColor: string
  hoverColor: string
}

export function ResizableDivider({
  direction,
  onResize,
  bgColor,
  hoverColor,
}: ResizableDividerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const dividerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (direction === "vertical") {
        onResize(e.movementX)
      } else {
        onResize(e.movementY)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, direction, onResize])

  return (
    <div
      ref={dividerRef}
      onMouseDown={() => setIsDragging(true)}
      className={`${
        direction === "vertical"
          ? "w-1 cursor-col-resize hover:w-1.5"
          : "h-1 cursor-row-resize hover:h-1.5"
      } shrink-0 transition-all group`}
      style={{
        backgroundColor: isDragging ? hoverColor : bgColor,
      }}
    >
      <div
        className={`${
          direction === "vertical" ? "w-full h-full" : "w-full h-full"
        } group-hover:bg-current opacity-0 group-hover:opacity-30`}
        style={{ color: hoverColor }}
      />
    </div>
  )
}
