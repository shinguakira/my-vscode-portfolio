"use client"

import type { ChangelogItem } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchChangelog } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useChangelogData() {
  const locale = useLocale()

  const fetcher = useCallback((signal: AbortSignal) => fetchChangelog(locale, signal), [locale])

  return usePortfolioData<ChangelogItem[]>(`changelogs-${locale}`, fetcher)
}
