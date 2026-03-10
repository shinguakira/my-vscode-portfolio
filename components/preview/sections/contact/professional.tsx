"use client"

import { Mail, MapPin, Phone } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useContactData } from "@/hooks/use-contact-data"

export function ProfessionalContact() {
  const locale = useLocale()
  const { data: contact, loading, error } = useContactData()

  if (loading) return <LoadingState />
  if (error || !contact) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto px-8 short:px-4 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Contact" : "お問い合わせ"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">Get in Touch</p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
            {locale === "en" ? "Contact Info" : "連絡先"}
          </h2>
          <div className="space-y-6">
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 hover:opacity-70 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Email</div>
                <div className="text-gray-900">{contact.email}</div>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Phone</div>
                <div className="text-gray-900">{contact.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Address</div>
                <div className="text-gray-900">{contact.address}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 short:mt-4 pt-12 short:pt-4 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-6">
            {locale === "en"
              ? "Feel free to reach out for work inquiries or consultations."
              : "お仕事のご依頼やご相談など、お気軽にご連絡ください。"}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-block px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
          >
            {locale === "en" ? "Send an Email" : "メールで問い合わせる"}
          </a>
        </div>
      </div>
    </div>
  )
}
