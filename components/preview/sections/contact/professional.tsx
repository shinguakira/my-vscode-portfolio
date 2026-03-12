"use client"

import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useContactData } from "@/hooks/use-contact-data"
import { useContactForm } from "@/hooks/use-contact-form"

export function ProfessionalContact() {
  const locale = useLocale()
  const { data: contact, loading, error } = useContactData()
  const { form, setForm, sending, sent, error: formError, t, handleSubmit, reset } = useContactForm()

  if (loading) return <LoadingState />
  if (error || !contact) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-white">
      <div className="max-w-4xl mx-auto px-4 short:px-2 py-24 short:py-8">
        <div className="mb-16 short:mb-4 border-b border-gray-200 pb-8 short:pb-3">
          <h1 className="text-5xl short:text-2xl font-serif font-bold text-gray-900 mb-3 short:mb-1">
            {locale === "en" ? "Contact" : "お問い合わせ"}
          </h1>
          <p className="text-xl short:text-sm text-gray-600">Get in Touch</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 short:gap-6">
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
              {locale === "en" ? "Contact Info" : "連絡先"}
            </h2>
            <div className="space-y-6">
              <a href={`mailto:${contact.email}`} className="flex items-center gap-4 hover:opacity-70 transition-opacity">
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

          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6 pb-3 border-b border-gray-200">
              {locale === "en" ? "Send a Message" : "メッセージを送る"}
            </h2>
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.success}</h3>
                <p className="text-gray-600 mb-6 text-sm">{t.thankYou}</p>
                <button onClick={reset} className="px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  {t.another}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 border border-gray-300 text-gray-900 focus:border-gray-900 focus:outline-none transition resize-none" />
                </div>
                {formError && <div className="rounded bg-red-50 border border-red-200 p-3 text-sm text-red-700">{formError}</div>}
                <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition disabled:opacity-50">
                  <Send className="w-4 h-4" />
                  {sending ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
