"use client"

import type { SkillItem } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchSkills } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useSkillsData() {
  const locale = useLocale()

  const fetcher = useCallback((signal: AbortSignal) => fetchSkills(locale, signal), [locale])

  return usePortfolioData<SkillItem[]>(`skills-${locale}`, fetcher)
}
