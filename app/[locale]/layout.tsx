import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import type React from "react"

import { LocaleProvider } from "@/contexts/locale-context"
import { fetchProfile } from "@/lib/api/endpoints"
import { routing } from "@/lib/i18n/routing"

const geistMono = Geist_Mono({ subsets: ["latin"] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === "en"

  let name = "Web Dev"
  let title = isEn ? "Full-Stack Engineer" : "フルスタックエンジニア"
  let summary = isEn
    ? "Full-stack development with React, Next.js, TypeScript, Python, and AWS."
    : "React, Next.js, TypeScript, Python, AWSなどモダン技術スタックでのフルスタック開発。"

  try {
    const profile = await fetchProfile(locale)
    name = profile.name || name
    title = profile.title || title
    summary = profile.summary || summary
  } catch {
    // use defaults
  }

  return {
    title: `${name} | ${title}`,
    description: isEn
      ? `Portfolio of ${name} — ${summary}`
      : `${name}のポートフォリオサイト。${summary}`,
    authors: [{ name }],
    creator: name,
    keywords: isEn
      ? [name, "Full-Stack Engineer", "React", "Next.js", "TypeScript", "Freelance", "Portfolio", "Web Development"]
      : [name, "フルスタックエンジニア", "React", "Next.js", "TypeScript", "フリーランス", "ポートフォリオ", "Web開発"],
    openGraph: {
      title: `${name} | ${title}`,
      description: summary,
      type: "website",
      locale: isEn ? "en_US" : "ja_JP",
      siteName: `${name} Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | ${title}`,
      description: isEn
        ? `${title} ${name}'s Portfolio`
        : `${title} ${name}のポートフォリオ`,
    },
    alternates: {
      canonical: "/",
    },
    icons: {
      icon: [
        {
          url: "/icon-light-32x32.png",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/icon-dark-32x32.png",
          media: "(prefers-color-scheme: dark)",
        },
        {
          url: "/icon.svg",
          type: "image/svg+xml",
        },
      ],
      apple: "/apple-icon.png",
    },
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d0d0d",
}

async function StructuredData({ locale }: { locale: string }) {
  let name = "Web Dev"
  let jobTitle = locale === "en" ? "Full-Stack Engineer" : "フルスタックエンジニア"

  try {
    const profile = await fetchProfile(locale)
    name = profile.name || name
    jobTitle = profile.title || jobTitle
  } catch {
    // use defaults
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name,
          jobTitle,
          knowsAbout: ["React", "Next.js", "TypeScript", "Python", "AWS"],
        }),
      }}
    />
  )
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!routing.locales.includes(locale as "ja" | "en")) {
    notFound()
  }

  return (
    <html lang={locale}>
      <head>
        <StructuredData locale={locale} />
      </head>
      <body className={`${geistMono.className} antialiased`}>
        <NextIntlClientProvider>
          <LocaleProvider locale={locale}>{children}</LocaleProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
