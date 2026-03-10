"use client"

import { Mail, MapPin, Phone } from "lucide-react"

import { ErrorState } from "@/components/preview/error-state"
import { LoadingState } from "@/components/preview/loading-state"
import { useLocale } from "@/contexts/locale-context"
import { useContactData } from "@/hooks/use-contact-data"

const ITEMS = [
  { key: "email", label: "Email", gradient: "from-rose-500 to-pink-500", Icon: Mail },
  { key: "phone", label: "Phone", gradient: "from-pink-500 to-purple-500", Icon: Phone },
  { key: "address", label: "Address", gradient: "from-purple-500 to-indigo-500", Icon: MapPin },
] as const

export function InnovativeContact() {
  const locale = useLocale()
  const { data: contact, loading, error } = useContactData()

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

        <div className="grid md:grid-cols-2 gap-8 short:gap-3 mb-12 short:mb-4">
          {ITEMS.map(({ key, label, gradient, Icon }) => {
            const value = contact[key]
            const href = key === "email" ? `mailto:${value}` : undefined
            const Wrapper = href ? "a" : "div"
            return (
              <Wrapper
                key={key}
                {...(href ? { href, className: "group relative block" } : { className: "group relative block" })}
              >
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500`}
                />
                <div className="relative bg-black border border-gray-800 rounded-2xl p-6 short:p-3 flex items-center gap-6 short:gap-3">
                  <div
                    className={`w-16 h-16 short:w-10 short:h-10 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">{label}</div>
                    <div className="text-xl short:text-sm font-bold text-white">{value}</div>
                  </div>
                </div>
              </Wrapper>
            )
          })}
        </div>

        <div className="text-center">
          <div className="inline-block group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition" />
            <a
              href={`mailto:${contact.email}`}
              className="relative px-12 short:px-6 py-6 short:py-3 bg-black rounded-2xl text-white font-bold text-xl short:text-sm block"
            >
              {locale === "en" ? "Get in Touch" : "お仕事のご相談はこちら"}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
