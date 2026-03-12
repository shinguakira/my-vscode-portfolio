"use client"

import type { Project } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchProjects } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useProjectsData() {
  const locale = useLocale()

  const fetcher = useCallback((signal: AbortSignal) => fetchProjects(locale, signal), [locale])

  return usePortfolioData<Project[]>(`projects-${locale}`, fetcher)
}
