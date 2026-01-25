"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const mailtoHref = useMemo(() => {
    const to = "makwan@spectr.no"
    const subject = encodeURIComponent(`Contact request from ${name || "Website visitor"}`)
    const body = encodeURIComponent(
      [
        `Name: ${name || "-"}`,
        `Email: ${email || "-"}`,
        "",
        message || "",
      ].join("\n")
    )
    return `mailto:${to}?subject=${subject}&body=${body}`
  }, [email, message, name])

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="text-2xl font-bold tracking-tight text-black">
            SPECTR
          </Link>
        </div>
      </nav>

      <main className="px-6 pt-24 pb-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
            <p className="mt-4 text-neutral-600">
              Send a message and your email client will open addressed to{" "}
              <a className="text-black underline" href="mailto:makwan@spectr.no">
                makwan@spectr.no
              </a>
              .
            </p>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <div className="text-sm font-semibold text-neutral-700">Direct email</div>
              <a
                className="mt-2 block text-lg font-semibold text-black underline"
                href="mailto:makwan@spectr.no"
              >
                makwan@spectr.no
              </a>
              <p className="mt-2 text-sm text-neutral-600">
                Prefer a form? Use the message box and we’ll prefill the email for you.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
                window.location.href = mailtoHref
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-semibold text-neutral-700">
                  Full name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  placeholder="How can we help?"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Send message
              </button>

              {submitted && (
                <p className="text-sm text-neutral-600">
                  If your email app didn’t open, use this link:{" "}
                  <a className="underline" href={mailtoHref}>
                    email makwan@spectr.no
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

