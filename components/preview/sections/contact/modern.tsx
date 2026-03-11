"use client"

import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useContactData } from "@/hooks/use-contact-data"
import { useContactForm } from "@/hooks/use-contact-form"

export function ModernContact() {
  const locale = useLocale()
  const { data: contact, loading, error } = useContactData()
  const { form, setForm, sending, sent, error: formError, t, handleSubmit, reset } = useContactForm()

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

        <div className="grid md:grid-cols-3 gap-6 short:gap-3 mb-12 short:mb-4">
          <a href={`mailto:${contact.email}`} className="block">
            <div className="rounded-xl p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur hover:border-slate-700 transition-all group h-full">
              <div className="w-12 h-12 short:w-8 short:h-8 rounded-lg bg-blue-600/20 flex items-center justify-center mb-4 short:mb-2 text-blue-400 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <p className="text-slate-400 text-sm">{contact.email}</p>
            </div>
          </a>
          <div className="rounded-xl p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur h-full">
            <div className="w-12 h-12 short:w-8 short:h-8 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4 short:mb-2 text-purple-400">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-1">Phone</h3>
            <p className="text-slate-400 text-sm">{contact.phone}</p>
          </div>
          <div className="rounded-xl p-6 short:p-3 bg-slate-900/50 border-slate-800 backdrop-blur h-full">
            <div className="w-12 h-12 short:w-8 short:h-8 rounded-lg bg-cyan-600/20 flex items-center justify-center mb-4 short:mb-2 text-cyan-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-white font-semibold mb-1">Address</h3>
            <p className="text-slate-400 text-sm">{contact.address}</p>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/50 border border-slate-800 backdrop-blur p-8 short:p-4">
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t.success}</h3>
              <p className="text-slate-400 mb-6">{t.thankYou}</p>
              <button onClick={reset} className="px-6 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition">
                {t.another}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">{t.name}</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">{t.email}</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">{t.message}</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none transition resize-none" />
              </div>
              {formError && <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">{formError}</div>}
              <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium transition disabled:opacity-50">
                <Send className="w-4 h-4" />
                {sending ? t.sending : t.send}
              </button>
            </form>
          )}
        </div>

        <div className="mt-8 short:mt-4 text-center">
          <p className="text-slate-400 mb-2 text-sm">{locale === "en" ? "Response time: Usually within 24 hours" : "レスポンス時間: 通常24時間以内"}</p>
          <span className="inline-flex items-center rounded-md text-xs font-medium px-4 py-1.5 bg-green-600 text-white">
            {locale === "en" ? "Currently accepting new projects" : "現在新規案件受付中"}
          </span>
        </div>
      </div>
    </div>
  )
}
