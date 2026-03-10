"use client"

import type { Faq } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchFaqs } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useFaqData() {
  const locale = useLocale()

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchFaqs(locale, signal),
    [locale],
  )

  return usePortfolioData<Faq[]>(`faqs-${locale}`, fetcher)
}
