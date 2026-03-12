"use client"

import type { StrongPoint } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchStrongPoints } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useStrongPointsData() {
  const locale = useLocale()

  const fetcher = useCallback((signal: AbortSignal) => fetchStrongPoints(locale, signal), [locale])

  return usePortfolioData<StrongPoint[]>(`strong-points-${locale}`, fetcher)
}
