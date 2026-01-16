"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

const insightCards = [
  {
    category: "Research Report",
    title: "Automated Adversaries: The 2026 AI-Powered Threat Landscape",
    image: "/images/card1.jpg",
    slug: "automated-adversaries",
  },
  {
    category: "Research Report",
    title: "The Autonomous Shield: Security Automation for Modern Enterprises",
    image: "/images/card2.jpg",
    slug: "autonomous-shield",
  },
  {
    category: "Research Report",
    title: "Predictive Intelligence: AI-Driven OSINT and Proactive Defense",
    image: "/images/card3.jpg",
    slug: "predictive-intelligence",
  },
  {
    category: "Research Report",
    title: "Shadow AI: Securing the Automated Intelligence Loop",
    image: "/images/card4.jpg",
    slug: "shadow-ai",
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

      {/* Insight Cards Section */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insightCards.map((card, index) => (
              <Link key={index} href={`/research/${card.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative rounded-xl p-6 min-h-[380px] flex flex-col justify-between cursor-pointer overflow-hidden"
                >
                  {/* Background Image */}
                  {card.image && (
                    <div className="absolute inset-0">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                    </div>
                  )}
                  {/* Background overlay for hover effect */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  <div className="relative z-10">
                    {/* Category Label */}
                    <span className="inline-block text-xs font-semibold text-white/80 uppercase tracking-wider mb-4">
                      {card.category}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {card.title}
                    </h3>
                  </div>
                  
                  {/* Expand Button */}
                  <div className="relative z-10 mt-4">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-white group-hover:gap-2 transition-all duration-300">
                      Expand
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 md:py-32 px-6 bg-white text-black">
        <div className="mx-auto max-w-6xl">
          {/* Header Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-neutral-600 leading-relaxed max-w-5xl mb-24 md:mb-32"
          >
            Our services power real-time, AI-driven decisions in critical government and commercial enterprises in the West, from the factory floors to the front lines.
          </motion.p>

          {/* Services List */}
          <div className="space-y-0">
            {/* Our Services - Main */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group block border-t border-neutral-200 py-6 md:py-8 hover:py-10 md:hover:py-14 transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black group-hover:text-neutral-500 transition-colors duration-300">
                  Our Services
                </h2>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                  <p className="text-neutral-500 text-base md:text-lg max-w-2xl pt-2">
                    Comprehensive cybersecurity and AI solutions for modern enterprises. We deliver end-to-end security, automation, intelligence, and development services tailored to your organization&apos;s needs.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Cyber Surveillance */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="group block border-t border-neutral-200 py-6 md:py-8 hover:py-10 md:hover:py-14 transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-neutral-400 font-mono">/0.1</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black group-hover:text-neutral-500 transition-colors duration-300">
                    Cyber Surveillance
                  </h3>
                </div>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                  <p className="text-neutral-500 text-base md:text-lg max-w-2xl pt-2 pl-12">
                    We secure your platform with 24/7 surveillance and constant auditing. Our advanced threat detection systems monitor your infrastructure around the clock, identifying vulnerabilities before they become breaches.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Automation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group block border-t border-neutral-200 py-6 md:py-8 hover:py-10 md:hover:py-14 transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-neutral-400 font-mono">/0.2</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black group-hover:text-neutral-500 transition-colors duration-300">
                    Automation
                  </h3>
                </div>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                  <p className="text-neutral-500 text-base md:text-lg max-w-2xl pt-2 pl-12">
                    Anything a human can do can be automated. We build intelligent workflows that eliminate repetitive tasks, reduce human error, and dramatically increase operational efficiency across your organization.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Intelligence */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="group block border-t border-neutral-200 py-6 md:py-8 hover:py-10 md:hover:py-14 transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-neutral-400 font-mono">/0.3</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black group-hover:text-neutral-500 transition-colors duration-300">
                    Intelligence
                  </h3>
                </div>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                  <p className="text-neutral-500 text-base md:text-lg max-w-2xl pt-2 pl-12">
                    Our data systems give your company the newest datasets available so your decision making is at its best. Real-time analytics and AI-powered insights keep you ahead of the competition.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Development */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group block border-t border-neutral-200 border-b py-6 md:py-8 hover:py-10 md:hover:py-14 transition-all duration-500 ease-out cursor-pointer"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-sm text-neutral-400 font-mono">/0.4</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-black group-hover:text-neutral-500 transition-colors duration-300">
                    Development
                  </h3>
                </div>
                <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 ease-out opacity-0 group-hover:opacity-100">
                  <p className="text-neutral-500 text-base md:text-lg max-w-2xl pt-2 pl-12">
                    We will create anything your company needs. From custom software solutions to enterprise platforms, our development team brings your vision to life with cutting-edge technology.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-24 md:py-32 px-6 bg-neutral-50">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-500 mb-4">
                Message from our CEO
              </span>
            </div>
            <blockquote className="text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-tight mb-12">
              &ldquo;Forbidding is forbidden to us.
              <br />
              <span className="text-neutral-500">We can do anything.&rdquo;</span>
            </blockquote>
            <div className="flex flex-col items-center gap-2">
              <p className="text-lg font-semibold text-black">Makwan Ismail</p>
              <p className="text-neutral-500">Founder & CEO, GoMercant</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 md:py-32 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-500 mb-4">
              Latest Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-medium text-black">
              News & Insights
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-bold">
                  01
                </div>
              </div>
              <span className="text-sm text-orange-500 font-medium">January 2026</span>
              <h3 className="text-xl font-semibold text-black mt-2 mb-3 group-hover:text-neutral-600 transition-colors">
                GoMercant Launches New AI-Powered Threat Detection Platform
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">
                Our latest cybersecurity solution leverages advanced machine learning to identify and neutralize threats in real-time.
              </p>
            </motion.article>

            {/* News Item 2 */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-black to-neutral-800 rounded-xl mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-bold">
                  02
                </div>
              </div>
              <span className="text-sm text-orange-500 font-medium">December 2025</span>
              <h3 className="text-xl font-semibold text-black mt-2 mb-3 group-hover:text-neutral-600 transition-colors">
                Partnership with Nordic Defense Alliance Announced
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">
                GoMercant selected as primary cybersecurity partner for critical infrastructure protection across Scandinavia.
              </p>
            </motion.article>

            {/* News Item 3 */}
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-xl mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-bold">
                  03
                </div>
              </div>
              <span className="text-sm text-orange-500 font-medium">November 2025</span>
              <h3 className="text-xl font-semibold text-black mt-2 mb-3 group-hover:text-neutral-600 transition-colors">
                Expanding Operations: New Oslo Headquarters
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">
                Our growing team moves into a state-of-the-art facility to better serve our expanding client base.
              </p>
            </motion.article>
          </div>

        </div>
      </section>

      {/* Careers Section */}
      <section className="py-24 md:py-32 px-6 bg-black text-white">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-500 mb-4">
                Join Our Team
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                Careers at
                <br />
                <span className="text-orange-500">GoMercant</span>
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-lg">
                We&apos;re building the future of cybersecurity and AI. Join a team of exceptional individuals who believe that nothing is impossible.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
              >
                View Open Positions
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>

            {/* Right - Job Listings Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Job Card 1 */}
              <Link href="/careers" className="group block p-6 border border-neutral-800 rounded-xl hover:border-orange-500/50 hover:bg-neutral-900/50 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-orange-500 transition-colors">
                    Senior Security Engineer
                  </h3>
                  <span className="text-sm text-neutral-500">Oslo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-4">
                  Lead our security infrastructure and protect critical systems for enterprise clients.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">Full-time</span>
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">Remote</span>
                </div>
              </Link>

              {/* Job Card 2 */}
              <Link href="/careers" className="group block p-6 border border-neutral-800 rounded-xl hover:border-orange-500/50 hover:bg-neutral-900/50 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-orange-500 transition-colors">
                    AI/ML Engineer
                  </h3>
                  <span className="text-sm text-neutral-500">Oslo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-4">
                  Build intelligent systems that power next-generation automation and analytics.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">Full-time</span>
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">Hybrid</span>
                </div>
              </Link>

              {/* Job Card 3 */}
              <Link href="/careers" className="group block p-6 border border-neutral-800 rounded-xl hover:border-orange-500/50 hover:bg-neutral-900/50 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-orange-500 transition-colors">
                    Full-Stack Developer
                  </h3>
                  <span className="text-sm text-neutral-500">Oslo</span>
                </div>
                <p className="text-neutral-400 text-sm mb-4">
                  Create powerful applications that transform how enterprises operate and secure their data.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">Full-time</span>
                  <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">On-site</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 md:py-24 px-6 border-t border-neutral-800">
        <div className="mx-auto max-w-6xl">
          {/* Footer Top */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Image 
                  src="/favicon.png" 
                  alt="GoMercant Logo" 
                  width={40} 
                  height={40}
                  className="object-contain brightness-0 invert"
                />
                <span className="text-2xl font-bold tracking-tight">
                  GoMercant
                </span>
              </div>
              <p className="text-neutral-400 text-base max-w-md leading-relaxed">
                Cybersecurity and AI consulting for critical systems. We protect and empower enterprises with cutting-edge technology solutions.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-6">Services</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Cyber Surveillance</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Automation</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Intelligence</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Development</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-neutral-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/login" className="text-neutral-300 hover:text-white transition-colors">Client Login</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="text-neutral-300">
                  <span className="block text-white font-medium">Address</span>
                  Oslo, Norway
                </li>
                <li className="text-neutral-300">
                  <span className="block text-white font-medium">Email</span>
                  <a href="mailto:Contact@gomercant.com" className="hover:text-white transition-colors">Contact@gomercant.com</a>
                </li>
                <li className="text-neutral-300">
                  <span className="block text-white font-medium">Phone</span>
                  <a href="tel:+4746503934" className="hover:text-white transition-colors">+47 465 03 934</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} GoMercant.com By SPECTR AS · Org nr 936961967
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
