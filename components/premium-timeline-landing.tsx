"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"


const stats = [
  { value: "500+", label: "Active Missions" },
  { value: "$2M+", label: "Bounties Paid" },
  { value: "10K+", label: "Engineers" },
  { value: "98%", label: "Success Rate" },
]


const testimonials = [
  {
    quote: "GoMercant helped us find a brilliant ML engineer who delivered a production-ready model in just 2 weeks.",
    author: "Sarah Chen",
    role: "CTO, RoboTech Inc",
    avatar: "SC",
  },
  {
    quote: "The quality of CAD designs we received exceeded our expectations. Already posted our third mission!",
    author: "Michael Torres",
    role: "Lead Engineer, DroneWorks",
    avatar: "MT",
  },
  {
    quote: "Finally, a platform that understands technical procurement. The talent here is world-class.",
    author: "Emily Watson",
    role: "VP Engineering, AutoDrive",
    avatar: "EW",
  },
]

export function PremiumTimelineLanding({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Testimonials</a>
            <a
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              Get Started
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
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/get-started"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105 shadow-lg shadow-orange-500/30"
              >
                Browse Opportunities
              </a>
            </div>
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

          <div className="mt-16 animate-bounce">
            <svg className="mx-auto h-6 w-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>


      {/* Features Section - Accenture Style Cards */}
      <section id="features" className="py-24 px-6 bg-neutral-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
            {/* Card 1 - Fast Turnaround */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="group relative bg-black min-h-[380px] flex flex-col cursor-pointer overflow-hidden"
            >
              {/* Abstract gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/40 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-violet-500/40 to-transparent rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              <div className="relative z-10 p-6 flex flex-col h-full">
                <span className="text-white/70 text-xs font-medium tracking-wider uppercase mb-4">Speed</span>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Fast Turnaround</h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  Get quality deliverables in days, not months. Our global talent pool works around the clock to meet your deadlines.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-white text-sm font-medium group-hover:underline">Expand</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Quality Guaranteed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-black min-h-[380px] flex flex-col cursor-pointer overflow-hidden"
            >
              {/* Abstract gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-r from-emerald-400/40 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-tl from-teal-400/30 to-transparent rounded-full blur-2xl transform translate-x-1/4 translate-y-1/4" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              <div className="relative z-10 p-6 flex flex-col h-full">
                <span className="text-white/70 text-xs font-medium tracking-wider uppercase mb-4">Quality</span>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Quality Guaranteed</h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  Every submission is reviewed by experts. Pay only when you&apos;re satisfied with the results. No risk, all reward.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-white text-sm font-medium group-hover:underline">Expand</span>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Top Talent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-black min-h-[380px] flex flex-col cursor-pointer overflow-hidden"
            >
              {/* Abstract gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-amber-800 to-yellow-900">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-1/2 w-80 h-80 bg-gradient-to-b from-orange-400/50 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-gradient-to-l from-amber-500/40 to-transparent rounded-full blur-2xl" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              <div className="relative z-10 p-6 flex flex-col h-full">
                <span className="text-white/70 text-xs font-medium tracking-wider uppercase mb-4">Talent</span>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Top Talent</h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  Access engineers from Tesla, Google, NASA, and top universities worldwide. The best minds, ready to work.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-white text-sm font-medium group-hover:underline">Expand</span>
                </div>
              </div>
            </motion.div>

            {/* Card 4 - Reputation System */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative bg-black min-h-[380px] flex flex-col cursor-pointer overflow-hidden"
            >
              {/* Abstract gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-t from-blue-400/40 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
                  <div className="absolute top-1/4 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/30 to-transparent rounded-full blur-2xl transform translate-x-1/4" />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              <div className="relative z-10 p-6 flex flex-col h-full">
                <span className="text-white/70 text-xs font-medium tracking-wider uppercase mb-4">Trust</span>
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">Reputation System</h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  Transparent ratings and reviews help you find the perfect match for your project. Build trust, deliver results.
                </p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-white text-sm font-medium group-hover:underline">Expand</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6 bg-black text-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-neutral-400">
              See what our customers have to say about GoMercant.
            </p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                  &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">{testimonials[currentTestimonial].author}</div>
                    <div className="text-sm text-neutral-400">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Dots */}
            <div className="flex justify-center gap-2 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? 'w-8 bg-white' : 'bg-neutral-600 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of companies and engineers already using GoMercant to get work done.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:bg-neutral-100 hover:scale-105 shadow-lg"
            >
              Create Free Account
            </a>
            <a
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Image 
                src="/favicon.png" 
                alt="GoMercant Logo" 
                width={24} 
                height={24}
                className="object-contain brightness-0 invert"
              />
              <span className="text-lg font-semibold">GoMercant</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-neutral-400">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} GoMercant. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
