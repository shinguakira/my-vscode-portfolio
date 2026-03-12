"use client"

import { useState } from "react"

import { useLocale } from "@/contexts/locale-context"

export function useContactForm() {
  const locale = useLocale()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const t =
    locale === "en"
      ? {
          name: "Name",
          email: "Email",
          message: "Message",
          send: "Send Message",
          sending: "Sending...",
          success: "Message sent!",
          thankYou: "Thank you. I'll get back to you soon.",
          another: "Send Another",
        }
      : {
          name: "お名前",
          email: "メールアドレス",
          message: "メッセージ",
          send: "送信",
          sending: "送信中...",
          success: "送信完了！",
          thankYou: "お問い合わせありがとうございます。追ってご連絡いたします。",
          another: "別のメッセージを送信",
        }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: "", email: "", message: "" })
      } else {
        const data = await res.json()
        setError(data.error || "Error")
      }
    } catch {
      setError(locale === "en" ? "Failed to send" : "送信に失敗しました")
    } finally {
      setSending(false)
    }
  }

  const reset = () => setSent(false)

  return { form, setForm, sending, sent, error, t, handleSubmit, reset }
}
