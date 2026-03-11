"use client"

import { CheckCircle, Mail, MapPin, Phone, Send } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useContactData } from "@/hooks/use-contact-data"
import { useContactForm } from "@/hooks/use-contact-form"

const ITEMS = [
  { key: "email", label: "Email", gradient: "from-rose-500 to-pink-500", Icon: Mail },
  { key: "phone", label: "Phone", gradient: "from-pink-500 to-purple-500", Icon: Phone },
  { key: "address", label: "Address", gradient: "from-purple-500 to-indigo-500", Icon: MapPin },
] as const

export function InnovativeContact() {
  const locale = useLocale()
  const { data: contact, loading, error } = useContactData()
  const { form, setForm, sending, sent, error: formError, t, handleSubmit, reset } = useContactForm()

  if (loading) return <LoadingState />
  if (error || !contact) return <ErrorState message={error ?? undefined} />

  return (
    <div className="min-h-full bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-8 short:px-4 py-20 short:py-6">
        <div className="text-center mb-16 short:mb-6">
          <h1 className="text-8xl short:text-3xl font-black mb-6 short:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
            CONTACT
          </h1>
          <p className="text-2xl short:text-sm text-gray-400 font-light">
            Let&apos;s Build Something Amazing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 short:gap-3 mb-12 short:mb-4">
          {ITEMS.map(({ key, label, gradient, Icon }) => {
            const value = contact[key]
            const href = key === "email" ? `mailto:${value}` : undefined
            const Wrapper = href ? "a" : "div"
            return (
              <Wrapper key={key} {...(href ? { href, className: "group relative block" } : { className: "group relative block" })}>
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500`} />
                <div className="relative bg-black border border-gray-800 rounded-2xl p-6 short:p-3 flex items-center gap-4 short:gap-3">
                  <div className={`w-14 h-14 short:w-10 short:h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-gray-500 text-sm mb-0.5">{label}</div>
                    <div className="text-base short:text-sm font-bold text-white truncate">{value}</div>
                  </div>
                </div>
              </Wrapper>
            )
          })}
        </div>

        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-20" />
          <div className="relative bg-black border border-gray-800 rounded-2xl p-8 short:p-4">
            {sent ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-3">{t.success}</h3>
                <p className="text-gray-400 mb-8">{t.thankYou}</p>
                <button onClick={reset} className="px-8 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white font-bold hover:bg-gray-800 transition">
                  {t.another}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2 font-medium">{t.name}</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:border-pink-500 focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2 font-medium">{t.email}</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:border-pink-500 focus:outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2 font-medium">{t.message}</label>
                  <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-gray-950 border border-gray-800 text-white focus:border-pink-500 focus:outline-none transition resize-none" />
                </div>
                {formError && <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-400">{formError}</div>}
                <div className="text-center">
                  <div className="inline-block group/btn relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-xl blur opacity-75 group-hover/btn:opacity-100 transition" />
                    <button type="submit" disabled={sending} className="relative flex items-center gap-2 px-12 py-4 bg-black rounded-xl text-white font-bold text-lg disabled:opacity-50">
                      <Send className="w-5 h-5" />
                      {sending ? t.sending : t.send}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
