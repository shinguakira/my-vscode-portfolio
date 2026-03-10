import type { ApiResponse } from "@shinguakira/portfolio-api-types"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_PORTFOLIO_API_URL ?? "https://portfolio-api-ten-delta.vercel.app"

/** Resolve a relative API asset path (e.g. /images/..., /icons/...) to a full URL */
export function resolveApiImageUrl(path: string): string {
  if (!path) return ""
  return path.startsWith("/") ? `${API_BASE_URL}${path}` : path
}

export async function fetchPortfolioApi<T>(
  endpoint: string,
  locale?: string,
  signal?: AbortSignal,
): Promise<T> {
  const url = new URL(`/api/${endpoint}`, API_BASE_URL)
  if (locale) {
    url.searchParams.set("lang", locale === "ja" ? "ja" : "en")
  }

  const res = await fetch(url.toString(), { signal })
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  const json: ApiResponse<T> = await res.json()
  if (!json.data) {
    throw new Error(json.message || "No data returned")
  }

  return json.data
}
