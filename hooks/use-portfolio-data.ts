"use client"

import { useEffect, useRef, useState } from "react"

interface PortfolioDataState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

const cache = new Map<string, unknown>()

export function usePortfolioData<T>(
  key: string,
  fetcher: (signal: AbortSignal) => Promise<T>,
): PortfolioDataState<T> {
  const [state, setState] = useState<PortfolioDataState<T>>(() => {
    const cached = cache.get(key) as T | undefined
    return cached
      ? { data: cached, loading: false, error: null }
      : { data: null, loading: true, error: null }
  })
  const currentKey = useRef(key)

  useEffect(() => {
    currentKey.current = key

    const cached = cache.get(key) as T | undefined
    if (cached) {
      queueMicrotask(() => setState({ data: cached, loading: false, error: null }))
      return
    }

    const controller = new AbortController()
    queueMicrotask(() => setState({ data: null, loading: true, error: null }))

    fetcher(controller.signal)
      .then((data) => {
        if (currentKey.current === key) {
          cache.set(key, data)
          setState({ data, loading: false, error: null })
        }
      })
      .catch((err) => {
        if (controller.signal.aborted) return
        if (currentKey.current === key) {
          setState({ data: null, loading: false, error: err.message })
        }
      })

    return () => controller.abort()
  }, [key, fetcher])

  return state
}
