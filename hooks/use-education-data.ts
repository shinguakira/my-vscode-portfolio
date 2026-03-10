"use client"

import type { EducationHistory } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchEducation } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useEducationData() {
  const locale = useLocale()

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchEducation(locale, signal),
    [locale],
  )

  return usePortfolioData<EducationHistory[]>(`education-${locale}`, fetcher)
}
