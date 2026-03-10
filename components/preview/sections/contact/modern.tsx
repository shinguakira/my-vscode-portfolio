"use client"

import { Mail, MapPin, Phone } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useContactData } from "@/hooks/use-contact-data"

export function ModernContact() {
  const locale = useLocale()
  const { data: contact, loading, error } = useContactData()

  if (loading) return <LoadingState />
  if (error || !contact) return <ErrorState message={error ?? undefined} />

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
          <a href={`mailto:${contact.email}`}>
            <div className="rounded-xl shadow-sm p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all group h-full">
              <div className="w-12 h-12 short:w-8 short:h-8 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 short:mb-2 text-blue-400 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <p className="text-slate-400 text-sm">{contact.email}</p>
            </div>
          </a>
          <div className="rounded-xl shadow-sm p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all group h-full">
            <div className="w-12 h-12 short:w-8 short:h-8 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4 short:mb-2 text-purple-400 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-1">Phone</h3>
            <p className="text-slate-400 text-sm">{contact.phone}</p>
          </div>
          <div className="rounded-xl shadow-sm p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all group h-full">
            <div className="w-12 h-12 short:w-8 short:h-8 rounded-lg bg-cyan-600/20 flex items-center justify-center mb-4 short:mb-2 text-cyan-400 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-1">Address</h3>
            <p className="text-slate-400 text-sm">{contact.address}</p>
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
