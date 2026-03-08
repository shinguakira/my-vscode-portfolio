"use client"

import { ChevronRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import type React from "react"

import { CONTACT_LINKS, getServices } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

const ICONS: Record<string, React.ReactNode> = {
  Email: <Mail className="w-6 h-6" />,
  GitHub: <Github className="w-6 h-6" />,
  LinkedIn: <Linkedin className="w-6 h-6" />,
  Twitter: <Twitter className="w-6 h-6" />,
}

const LABEL_COLORS: Record<string, string> = {
  Email: "blue",
  GitHub: "purple",
  LinkedIn: "blue",
  Twitter: "cyan",
}

export function ModernContact() {
  const locale = useLocale()
  const services = getServices(locale)

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-4xl mx-auto px-8 short:px-4 py-16 short:py-6">
        <div className="mb-12 short:mb-4 text-center">
          <h1 className="text-5xl short:text-2xl font-bold mb-4 short:mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {locale === "en" ? "Contact" : "お問い合わせ"}
          </h1>
          <p className="text-xl short:text-sm text-slate-400">
            {locale === "en" ? "Feel free to reach out" : "お気軽にご連絡ください"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 short:gap-3 mb-12 short:mb-4">
          {CONTACT_LINKS.map((contact) => {
            const color = LABEL_COLORS[contact.label] ?? "blue"
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              >
                <div className="rounded-xl shadow-sm p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all group h-full">
                  <div
                    className={`w-12 h-12 short:w-8 short:h-8 rounded-lg bg-${color}-600/20 flex items-center justify-center mb-4 short:mb-2 text-${color}-400 group-hover:scale-110 transition-transform`}
                  >
                    {ICONS[contact.label]}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{contact.label}</h3>
                  <p className="text-slate-400 text-sm">{contact.value}</p>
                </div>
              </a>
            )
          })}
        </div>

        <div className="rounded-xl shadow-sm p-8 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur">
          <h3 className="text-2xl short:text-base font-bold mb-6 short:mb-2 text-white">
            {locale === "en" ? "Available Services" : "対応可能な業務"}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service} className="flex items-center gap-3">
                <ChevronRight className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 short:mt-4 text-center">
          <p className="text-slate-400 mb-4">
            {locale === "en"
              ? "Response time: Usually within 24 hours"
              : "レスポンス時間: 通常24時間以内"}
          </p>
          <span className="inline-flex items-center rounded-md text-xs font-medium px-6 py-2 bg-green-600 hover:bg-green-700 text-white border-0 text-sm">
            {locale === "en" ? "Currently accepting new projects" : "現在新規案件受付中"}
          </span>
        </div>
      </div>
    </div>
  )
}
