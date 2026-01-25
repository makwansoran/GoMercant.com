"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        <div className="mx-auto max-w-md">
          <h1 className="text-4xl font-bold tracking-tight">Client Login</h1>
          <p className="mt-3 text-neutral-600">
            Enter your credentials to continue.
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault()
              setError(null)
              setIsLoading(true)
              try {
                // Client-side “working” login placeholder:
                // - validates input
                // - stores a session marker
                if (!email.trim() || !password.trim()) {
                  throw new Error("Please enter your email and password.")
                }
                if (password.length < 6) {
                  throw new Error("Password must be at least 6 characters.")
                }

                await new Promise((r) => setTimeout(r, 650))
                localStorage.setItem("spectr_session", JSON.stringify({ email, ts: Date.now() }))
                router.push("/")
              } catch (err) {
                setError(err instanceof Error ? err.message : "Login failed.")
              } finally {
                setIsLoading(false)
              }
            }}
            className="mt-8 space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
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
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <Link href="/" className="block text-center text-sm text-neutral-600 underline">
              Back to home
            </Link>
          </form>
        </div>
      </main>
    </div>
  )
}

