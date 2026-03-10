"use client"

import type { WorkExperience } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchExperience } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useExperienceData() {
  const locale = useLocale()

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchExperience(locale, signal),
    [locale],
  )

  return usePortfolioData<WorkExperience[]>(`experience-${locale}`, fetcher)
}
