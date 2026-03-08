import type { CareerProject } from "./career-timeline"

/* ─── Date helpers ─── */

export function parseDate(d: string): Date {
  if (d === "present") return new Date()
  const [y, m] = d.split("-").map(Number)
  return new Date(y, m - 1)
}

export function fmtShort(d: string) {
  if (d === "present") return "Now"
  const dt = parseDate(d)
  return dt.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
}

export function fmtLong(d: string) {
  if (d === "present") return "Present"
  const dt = parseDate(d)
  return dt.toLocaleDateString("en-US", { month: "short", year: "numeric" })
}

export function durationJa(s: string, e: string, locale?: string) {
  const a = parseDate(s)
  const b = parseDate(e)
  const mo = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
  const y = Math.floor(mo / 12)
  const m = mo % 12
  if (locale === "en") {
    if (y === 0) return `${m}mo`
    if (m === 0) return `${y}yr`
    return `${y}yr ${m}mo`
  }
  if (y === 0) return `${m}ヶ月`
  if (m === 0) return `${y}年`
  return `${y}年${m}ヶ月`
}

export function monthsBetween(a: Date, b: Date) {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
}

/* ─── Range & overlap helpers ─── */

export function getRange(items: CareerProject[]) {
  let minD = new Date()
  let maxD = new Date(0)
  for (const p of items) {
    const s = parseDate(p.startDate)
    const e = parseDate(p.endDate)
    if (s < minD) minD = s
    if (e > maxD) maxD = e
  }
  minD = new Date(minD.getFullYear(), 0)
  maxD = new Date(maxD.getFullYear() + 1, 0)
  return { minD, maxD }
}

export function findOverlaps(items: CareerProject[]) {
  const map = new Map<string, string[]>()
  for (let i = 0; i < items.length; i++) {
    const a = items[i]
    const aS = parseDate(a.startDate)
    const aE = parseDate(a.endDate)
    const ids: string[] = []
    for (let j = 0; j < items.length; j++) {
      if (i === j) continue
      const b = items[j]
      if (aS < parseDate(b.endDate) && aE > parseDate(b.startDate)) ids.push(b.id)
    }
    map.set(a.id, ids)
  }
  return map
}

export function packColumns(items: CareerProject[]) {
  const sorted = [...items].sort(
    (a, b) => parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime(),
  )
  const cols: CareerProject[][] = []
  for (const p of sorted) {
    const pS = parseDate(p.startDate)
    let placed = false
    for (const col of cols) {
      const last = col[col.length - 1]
      if (parseDate(last.endDate) <= pS) {
        col.push(p)
        placed = true
        break
      }
    }
    if (!placed) cols.push([p])
  }
  const map = new Map<string, number>()
  cols.forEach((col, ci) => col.forEach((p) => map.set(p.id, ci)))
  return { map, count: cols.length }
}

/* ─── Layout constants ─── */

export const PX = 16
export const COL_W = 164
export const GAP = 6
export const RULER_W = 48
