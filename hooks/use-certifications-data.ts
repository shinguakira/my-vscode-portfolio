"use client"

import type { CertificationItem } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchCertifications } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useCertificationsData() {
  const locale = useLocale()

  const fetcher = useCallback((signal: AbortSignal) => fetchCertifications(locale, signal), [locale])

  return usePortfolioData<CertificationItem[]>(`certifications-${locale}`, fetcher)
}
