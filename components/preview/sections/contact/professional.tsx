"use client"

import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import type React from "react"

import { CONTACT_LINKS, getServices } from "@/constants/preview-data"
import { useLocale } from "@/contexts/locale-context"

const ICONS: Record<string, React.ReactNode> = {
  Email: <Mail className="w-5 h-5" />,
  GitHub: <Github className="w-5 h-5" />,
  LinkedIn: <Linkedin className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
}

export function ProfessionalContact() {
  const locale = useLocale()
  const services = getServices(locale)

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto px-8 short:px-4 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Contact" : "お問い合わせ"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">Get in Touch</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 short:gap-6">
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
              {locale === "en" ? "Contact Info" : "連絡先"}
            </h2>
            <div className="space-y-6">
              {CONTACT_LINKS.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-4 hover:opacity-70 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
                    {ICONS[contact.label]}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      {contact.label}
                    </div>
                    <div className="text-gray-900">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
              {locale === "en" ? "Available Services" : "対応可能な業務"}
            </h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service} className="text-gray-700 pl-4 border-l-2 border-gray-900">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 short:mt-4 pt-12 short:pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-6">
            {locale === "en"
              ? "Feel free to reach out for work inquiries or consultations."
              : "お仕事のご依頼やご相談など、お気軽にご連絡ください。"}
          </p>
          <a
            href="mailto:contact@example.com"
            className="inline-block px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
          >
            {locale === "en" ? "Send an Email" : "メールで問い合わせる"}
          </a>
        </div>
      </div>
    </div>
  )
}
