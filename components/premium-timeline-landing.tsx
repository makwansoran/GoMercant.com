"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { WaveAnimation } from "@/components/wave-animation"

export function PremiumTimelineLanding({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!menuOpen) return

    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }

    window.addEventListener("pointerdown", onPointerDown)
    return () => window.removeEventListener("pointerdown", onPointerDown)
  }, [menuOpen])

  return (
    <div className={cn("bg-white text-black min-h-screen", className)} {...props}>
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-black">
              Resource Merchants
            </span>
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="Open menu"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white/70 text-black backdrop-blur transition-colors hover:bg-white"
            >
              <Menu className="h-5 w-5" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                aria-label="Navigation menu"
                className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg"
              >
                <Link
                  role="menuitem"
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-black hover:bg-neutral-50"
                >
                  Client Login
                </Link>
                <Link
                  role="menuitem"
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-black hover:bg-neutral-50"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-white px-6 pt-16">
        <WaveAnimation />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-4"
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-black via-neutral-800 to-neutral-600 bg-clip-text text-transparent whitespace-pre-line leading-[1.1] pb-3">
              Resource
              <br />
              <span className="text-black">Merchants</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl max-w-2xl mx-auto">
              Consulting and intelligence for critical systems.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
