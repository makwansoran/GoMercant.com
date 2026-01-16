"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"

const researchReports: Record<string, {
  title: string
  category: string
  image: string
  content?: string
}> = {
  "automated-adversaries": {
    title: "Automated Adversaries: The 2026 AI-Powered Threat Landscape",
    category: "Research Report",
    image: "/images/card1.jpg",
    content: "",
  },
  "autonomous-shield": {
    title: "The Autonomous Shield: Security Automation for Modern Enterprises",
    category: "Research Report",
    image: "/images/card2.jpg",
    content: "",
  },
  "predictive-intelligence": {
    title: "Predictive Intelligence: AI-Driven OSINT and Proactive Defense",
    category: "Research Report",
    image: "/images/card3.jpg",
    content: "",
  },
  "shadow-ai": {
    title: "Shadow AI: Securing the Automated Intelligence Loop",
    category: "Research Report",
    image: "/images/card4.jpg",
    content: "",
  },
}

export default function ResearchPage() {
  const params = useParams()
  const slug = params.slug as string
  const report = researchReports[slug]

  if (!report) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Report Not Found</h1>
          <Link href="/" className="text-orange-500 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section with Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-[60vh] md:h-[70vh] overflow-hidden"
      >
        <Image
          src={report.image}
          alt={report.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-6 left-6 z-20"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </motion.div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-5xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-500 mb-4"
            >
              {report.category}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {report.title}
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-4xl mx-auto px-6 py-16 md:py-24"
      >
        {report.content ? (
          <div className="prose prose-lg prose-neutral max-w-none">
            {report.content}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-neutral-400 mb-8">
              Research report content coming soon.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              Return to Home
            </Link>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt="GoMercant Logo" 
              width={32} 
              height={32}
              className="object-contain brightness-0 invert"
            />
            <span className="text-xl font-bold">GoMercant</span>
          </div>
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} GoMercant. All rights reserved.
          </div>
        </div>
      </footer>
    </motion.div>
  )
}
