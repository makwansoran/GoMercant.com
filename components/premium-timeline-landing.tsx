"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

const insightCards = [
  {
    category: "Research Report",
    title: "Pulse of Change: What's top of mind for today's leaders",
    description: "After two years of rapid AI acceleration, global executives enter 2026 with unmistakable confidence. But beneath the optimism, data shows a series of gaps standing in the way of scale and value.",
    color: "bg-gradient-to-br from-orange-600 to-orange-900",
    image: "/images/card1.jpg",
  },
  {
    category: "Event",
    title: "World Economic Forum Annual Meeting 2026",
    date: "January 19-23, 2026",
    location: "Davos, Switzerland",
    description: "In Davos, we'll deliver practical insights, dissect common challenges, and reveal how the most adaptive enterprises are actively redefining reinvention and accelerating growth within their industries.",
    color: "bg-gradient-to-br from-blue-600 to-blue-900",
    image: "/images/card2.jpg",
  },
  {
    category: "Research Report",
    title: "Sovereign AI: From managing risk to accelerating growth",
    description: "Sovereign AI isn't just a control play—it's a game-changer for global competitiveness and cultural value. Discover how organizations are moving fast to secure their advantage and shape AI's future, following four bold moves.",
    color: "bg-gradient-to-br from-teal-600 to-teal-900",
    image: "/images/card3.jpg",
  },
  {
    category: "Research Report",
    title: "Top Banking Trends for 2026",
    description: "GoMercant's Banking Trends 2026 reveals how agentic AI, smart money and shifting competition will reshape customer experience and growth.",
    color: "bg-gradient-to-br from-indigo-600 to-indigo-900",
  },
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
              alt="GoMercant Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-black">
              GoMercant
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              Client Login
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-white to-neutral-50 px-6 pt-16">
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-gradient-to-r from-black via-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Turning Complex Systems
              <br />
              <span className="text-black">Into Decisive Advantage</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-600 md:text-xl max-w-2xl mx-auto">
              Cybersecurity, AI, and intelligence-driven IT for organizations that cannot afford uncertainty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Insight Cards Section */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insightCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative rounded-xl p-6 min-h-[380px] flex flex-col justify-between cursor-pointer overflow-hidden transition-transform hover:scale-[1.02]",
                  !card.image && card.color
                )}
              >
                {/* Background Image */}
                {card.image && (
                  <div className="absolute inset-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  </div>
                )}
                {/* Background overlay for hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                
                <div className="relative z-10">
                  {/* Category Label */}
                  <span className="inline-block text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                    {card.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white leading-tight mb-3">
                    {card.title}
                  </h3>
                  
                  {/* Event date/location if applicable */}
                  {card.date && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-white/90">{card.date}</p>
                      {card.location && (
                        <p className="text-sm text-white/70">{card.location}</p>
                      )}
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-sm text-white/80 leading-relaxed line-clamp-4">
                    {card.description}
                  </p>
                </div>
                
                {/* Expand Button */}
                <div className="relative z-10 mt-4">
                  <button className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                    Expand
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-100 bg-white">
        <div className="mx-auto max-w-6xl text-center">
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} GoMercant. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
