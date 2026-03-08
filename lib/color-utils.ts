export const adjustBrightness = (color: string, amount: number) => {
  if (!color || typeof color !== "string") {
    return "#000000"
  }
  const hex = color.replace("#", "")
  if (hex.length !== 6) {
    return color
  }
  const r = Math.min(255, Math.max(0, Number.parseInt(hex.substring(0, 2), 16) + amount))
  const g = Math.min(255, Math.max(0, Number.parseInt(hex.substring(2, 4), 16) + amount))
  const b = Math.min(255, Math.max(0, Number.parseInt(hex.substring(4, 6), 16) + amount))
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}
