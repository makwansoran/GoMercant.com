"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { WaveAnimation } from "@/components/wave-animation"

export function PremiumTimelineLanding({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              Client Login
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
            >
              Contact Us
            </Link>
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
              Security. Control.
              <br />
              <span className="text-black">Intelligence.</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl max-w-2xl mx-auto">
              Cybersecurity and AI consulting for critical systems.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
