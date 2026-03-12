"use client"

import { useCallback } from "react"

import type { Notification } from "@/types"
import { useLocale } from "@/contexts/locale-context"
import { fetchNotifications } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useNotificationsData() {
  const locale = useLocale()

  const fetcher = useCallback(
    (signal: AbortSignal) => fetchNotifications(locale, signal),
    [locale],
  )

  return usePortfolioData<Notification[]>(`notifications-${locale}`, fetcher)
}
