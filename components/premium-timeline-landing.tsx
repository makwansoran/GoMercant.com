"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"

const stats = [
  { value: "500+", label: "Active Missions" },
  { value: "$2M+", label: "Bounties Paid" },
  { value: "10K+", label: "Engineers" },
  { value: "98%", label: "Success Rate" },
]

export function PremiumTimelineLanding({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("bg-white text-black min-h-screen", className)} {...props}>
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt="SPECTR Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-black">
              SPECTR
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              Client Login
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-white to-neutral-50 px-6 pt-16">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-neutral-600">192 procurements live now</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-black via-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Global Expertise
              <br />
              <span className="text-black">On Your Computer</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl max-w-2xl mx-auto">
              The premier marketplace for technical procurement. Post missions, receive world-class deliverables, pay for results.
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black">{stat.value}</div>
                <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
