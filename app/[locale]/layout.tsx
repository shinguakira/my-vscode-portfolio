import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist_Mono } from "next/font/google"
import { notFound } from "next/navigation"
import { NextIntlClientProvider } from "next-intl"
import type React from "react"

import { LocaleProvider } from "@/contexts/locale-context"
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

  return {
    title: isEn
      ? "Akira Shingu | Full-Stack Engineer Portfolio"
      : "神宮 章 | Akira Shingu - フルスタックエンジニア ポートフォリオ",
    description: isEn
      ? "Portfolio of Akira Shingu — Full-stack development with React, Next.js, TypeScript, Python, and AWS."
      : "神宮 章（しんぐう あきら / Akira Shingu）のポートフォリオサイト。React, Next.js, TypeScript, Python, AWSなどモダン技術スタックでのフルスタック開発。",
    authors: [{ name: isEn ? "Akira Shingu" : "神宮 章" }],
    creator: isEn ? "Akira Shingu" : "神宮 章",
    keywords: isEn
      ? [
          "Akira Shingu",
          "Full-Stack Engineer",
          "React",
          "Next.js",
          "TypeScript",
          "Freelance",
          "Portfolio",
          "Web Development",
        ]
      : [
          "神宮 章",
          "Akira Shingu",
          "しんぐう あきら",
          "シングウ アキラ",
          "フルスタックエンジニア",
          "React",
          "Next.js",
          "TypeScript",
          "フリーランス",
          "ポートフォリオ",
          "Web開発",
        ],
    openGraph: {
      title: isEn
        ? "Akira Shingu | Full-Stack Engineer"
        : "神宮 章 | Akira Shingu - フルスタックエンジニア",
      description: isEn
        ? "Full-stack development with React, Next.js, TypeScript, and AWS. 5+ years of experience."
        : "React, Next.js, TypeScript, AWSを活用したフルスタック開発。5年以上の実績。",
      type: "website",
      locale: isEn ? "en_US" : "ja_JP",
      siteName: isEn ? "Akira Shingu Portfolio" : "神宮 章 Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn ? "Akira Shingu | Full-Stack Engineer" : "神宮 章 | Akira Shingu",
      description: isEn
        ? "Full-Stack Engineer Akira Shingu's Portfolio"
        : "フルスタックエンジニア 神宮 章のポートフォリオ",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: locale === "en" ? "Akira Shingu" : "神宮 章",
              alternateName: ["Akira Shingu", "しんぐう あきら", "シングウ アキラ"],
              jobTitle: locale === "en" ? "Full-Stack Engineer" : "フルスタックエンジニア",
              knowsAbout: ["React", "Next.js", "TypeScript", "Python", "AWS"],
              url: "https://yoursite.com",
            }),
          }}
        />
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
