"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
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
              SPECTR
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

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  role="menu"
                  aria-label="Navigation menu"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg"
                >
                  <Link
                    role="menuitem"
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-neutral-800"
                  >
                    Client Login
                  </Link>
                  <Link
                    role="menuitem"
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-600"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-white px-6 pt-16">
        <WaveAnimation />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pb-4"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-black via-neutral-800 to-neutral-600 bg-clip-text text-transparent leading-tight pb-3">
              Global Resource Merchants
            </h1>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
