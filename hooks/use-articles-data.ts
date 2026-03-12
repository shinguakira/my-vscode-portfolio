"use client"

import { useCallback } from "react"

import { fetchArticles } from "@/lib/api/endpoints"
import type { ArticlesData } from "@/types"

import { usePortfolioData } from "./use-portfolio-data"

export function useArticlesData() {
  const fetcher = useCallback((signal: AbortSignal) => fetchArticles(signal), [])

  return usePortfolioData<ArticlesData>("articles", fetcher)
}
