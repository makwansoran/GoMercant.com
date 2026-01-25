"use client"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Handle login logic here
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="bg-white border-b border-neutral-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-black">
              SPECTR
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-neutral-50 rounded-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-black mb-2">Client Login</h1>
              <p className="text-neutral-500">Sign in to access your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 pr-12 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a href="#" className="text-sm text-orange-600 hover:text-orange-700 transition-colors">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-neutral-100">
        <div className="mx-auto max-w-6xl text-center">
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} spectr.no By SPECTR AS · Org nr 936961967
          </div>
        </div>
      </footer>
    </div>
  )
}
