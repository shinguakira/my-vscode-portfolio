"use client"

import type { ProfileResponse } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { useLocale } from "@/contexts/locale-context"
import { fetchProfile } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useProfileData() {
  const locale = useLocale()

  const fetcher = useCallback((signal: AbortSignal) => fetchProfile(locale, signal), [locale])

  return usePortfolioData<ProfileResponse>(`profile-${locale}`, fetcher)
}
