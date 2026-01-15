"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Box, Database, Palette, Zap, ChevronLeft, ChevronRight, Star, Users, Shield, Rocket } from "lucide-react"

const featuredMissions = [
  {
    title: "LIDAR Point Cloud Processing",
    company: "Tesla Autonomy",
    bounty: "$2,500",
    type: "Code",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Drone Motor Mount Design",
    company: "FPV Dynamics",
    bounty: "$800",
    type: "CAD",
    icon: Box,
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Synthetic Training Data",
    company: "Amazon Robotics",
    bounty: "$1,800",
    type: "Data",
    icon: Database,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Robot Dashboard UI",
    company: "Boston Dynamics",
    bounty: "$1,200",
    type: "Design",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Sensor Fusion Algorithm",
    company: "Waymo",
    bounty: "$3,500",
    type: "Autonomous",
    icon: Zap,
    color: "from-red-500 to-orange-500",
  },
]

const stats = [
  { value: "500+", label: "Active Missions" },
  { value: "$2M+", label: "Bounties Paid" },
  { value: "10K+", label: "Engineers" },
  { value: "98%", label: "Success Rate" },
]

const features = [
  {
    icon: Rocket,
    title: "Fast Turnaround",
    description: "Get quality deliverables in days, not months. Our global talent pool works around the clock.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every submission is reviewed. Pay only when you're satisfied with the results.",
  },
  {
    icon: Users,
    title: "Top Talent",
    description: "Access engineers from Tesla, Google, NASA, and top universities worldwide.",
  },
  {
    icon: Star,
    title: "Reputation System",
    description: "Transparent ratings and reviews help you find the perfect match for your project.",
  },
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMissions.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredMissions.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredMissions.length) % featuredMissions.length)

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
            <a href="#missions" className="text-sm font-medium text-neutral-600 hover:text-black transition-colors">Missions</a>
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

      {/* Featured Missions Slideshow */}
      <section id="missions" className="py-24 px-6 bg-neutral-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Featured Missions</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Real opportunities from top companies. New missions posted every day.
            </p>
          </div>

          {/* Slideshow */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 md:p-12"
                >
                  {(() => {
                    const mission = featuredMissions[currentSlide]
                    const Icon = mission.icon
                    return (
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${mission.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-12 h-12 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="text-sm font-medium text-neutral-500 mb-2">{mission.type}</div>
                          <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">{mission.title}</h3>
                          <p className="text-neutral-600 mb-4">Posted by {mission.company}</p>
                          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-lg">
                            {mission.bounty} Bounty
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {featuredMissions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-8 bg-black' : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Why GoMercant?</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              The smartest way to get technical work done. No hiring, no overhead, just results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl bg-black flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">{feature.title}</h3>
                  <p className="text-sm text-neutral-600">{feature.description}</p>
                </motion.div>
              )
            })}
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
