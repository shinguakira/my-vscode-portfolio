"use client"

import { createContext, type ReactNode, useContext } from "react"

type Locale = "ja" | "en"

const LocaleContext = createContext<Locale>("ja")

export function LocaleProvider({ locale, children }: { locale: string; children: ReactNode }) {
  return <LocaleContext.Provider value={locale as Locale}>{children}</LocaleContext.Provider>
}

export function useLocale(): Locale {
  return useContext(LocaleContext)
}
