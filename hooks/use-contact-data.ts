"use client"

import type { ContactResponse } from "@shinguakira/portfolio-api-types"
import { useCallback } from "react"

import { fetchContact } from "@/lib/api/endpoints"

import { usePortfolioData } from "./use-portfolio-data"

export function useContactData() {
  const fetcher = useCallback(
    (signal: AbortSignal) => fetchContact(signal),
    [],
  )

  return usePortfolioData<ContactResponse>("contact", fetcher)
}
