"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Users, Zap, Shield, Brain } from "lucide-react"

const jobListings = [
  {
    id: 1,
    slug: "senior-security-engineer",
    title: "Senior Security Engineer",
    department: "Security",
    location: "Oslo",
    type: "Full-time",
    mode: "Remote",
    description: "Lead our security infrastructure and protect critical systems for enterprise clients. You'll design and implement security architectures, conduct threat assessments, and mentor junior team members.",
    requirements: [
      "5+ years of experience in cybersecurity",
      "Strong knowledge of cloud security (AWS/Azure/GCP)",
      "Experience with SIEM, EDR, and incident response",
      "Security certifications (CISSP, OSCP, or equivalent)",
    ],
  },
  {
    id: 2,
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Oslo",
    type: "Full-time",
    mode: "Hybrid",
    description: "Build intelligent systems that power next-generation automation and analytics. You'll develop machine learning models for threat detection, anomaly analysis, and predictive security.",
    requirements: [
      "3+ years of experience in ML/AI development",
      "Proficiency in Python, TensorFlow/PyTorch",
      "Experience with NLP and time-series analysis",
      "Understanding of cybersecurity concepts",
    ],
  },
  {
    id: 3,
    slug: "full-stack-developer",
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Oslo",
    type: "Full-time",
    mode: "On-site",
    description: "Create powerful applications that transform how enterprises operate and secure their data. You'll build scalable web applications, APIs, and dashboards for our security platform.",
    requirements: [
      "4+ years of full-stack development experience",
      "Expertise in React/Next.js and Node.js",
      "Experience with PostgreSQL and cloud services",
      "Strong understanding of security best practices",
    ],
  },
  {
    id: 4,
    slug: "threat-intelligence-analyst",
    title: "Threat Intelligence Analyst",
    department: "Security",
    location: "Oslo",
    type: "Full-time",
    mode: "Hybrid",
    description: "Monitor and analyze the threat landscape to provide actionable intelligence. You'll track adversary tactics, investigate emerging threats, and produce detailed reports for clients.",
    requirements: [
      "3+ years in threat intelligence or security research",
      "Experience with OSINT tools and methodologies",
      "Strong analytical and writing skills",
      "Knowledge of MITRE ATT&CK framework",
    ],
  },
  {
    id: 5,
    slug: "devsecops-engineer",
    title: "DevSecOps Engineer",
    department: "Engineering",
    location: "Oslo",
    type: "Full-time",
    mode: "Remote",
    description: "Integrate security into our development pipeline and infrastructure. You'll automate security testing, manage cloud infrastructure, and ensure compliance across all systems.",
    requirements: [
      "4+ years of DevOps/SRE experience",
      "Strong Kubernetes and Docker expertise",
      "Experience with CI/CD security tooling",
      "Infrastructure as Code (Terraform, Pulumi)",
    ],
  },
  {
    id: 6,
    slug: "security-consultant",
    title: "Security Consultant",
    department: "Consulting",
    location: "Oslo",
    type: "Full-time",
    mode: "Hybrid",
    description: "Work directly with clients to assess their security posture and implement solutions. You'll conduct security audits, develop remediation strategies, and build lasting client relationships.",
    requirements: [
      "5+ years in security consulting or advisory",
      "Experience with compliance frameworks (ISO 27001, NIS2)",
      "Strong presentation and communication skills",
      "Ability to translate technical concepts for executives",
    ],
  },
]

const benefits = [
  {
    icon: Shield,
    title: "Cutting-Edge Work",
    description: "Work on the front lines of cybersecurity, protecting critical infrastructure and enterprises.",
  },
  {
    icon: Brain,
    title: "Continuous Learning",
    description: "Annual learning budget, conference attendance, and certification support for all team members.",
  },
  {
    icon: Users,
    title: "Exceptional Team",
    description: "Join a diverse team of world-class security experts, engineers, and researchers.",
  },
  {
    icon: Zap,
    title: "High Impact",
    description: "Your work directly protects organizations and their data from sophisticated threats.",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt="GoMercant Logo" 
              width={32} 
              height={32}
              className="object-contain brightness-0 invert"
            />
            <span className="text-2xl font-bold tracking-tight">
              GoMercant
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
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
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-orange-500 mb-4">
              Join Our Team
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Careers at
              <br />
              <span className="text-orange-500">GoMercant</span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
              We&apos;re building the future of cybersecurity and AI. Join a team of exceptional individuals who believe that nothing is impossible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 px-6 border-t border-neutral-800">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join GoMercant?</h2>
            <p className="text-neutral-400 text-lg max-w-2xl">
              We offer more than just a job—we offer a mission to protect the digital world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-neutral-800 rounded-xl hover:border-orange-500/50 transition-colors"
              >
                <benefit.icon className="w-10 h-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-6 border-t border-neutral-800">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-neutral-400 text-lg">
              Find your next role and help us secure the future.
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/careers/${job.slug}`}
                  className="group block p-8 border border-neutral-800 rounded-xl hover:border-orange-500/50 hover:bg-neutral-900/30 transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full text-xs font-medium">
                          {job.department}
                        </span>
                        <div className="flex items-center gap-1 text-neutral-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1 text-neutral-500 text-sm">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-neutral-300">
                          {job.mode}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white group-hover:text-orange-500 transition-colors mb-3">
                        {job.title}
                      </h3>
                      <p className="text-neutral-400 mb-6 leading-relaxed">
                        {job.description}
                      </p>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="flex items-start gap-2 text-neutral-400 text-sm">
                              <span className="text-orange-500 mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="lg:ml-8 flex-shrink-0">
                      <span className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm font-semibold group-hover:bg-orange-500 group-hover:text-white transition-all">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-neutral-800">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don&apos;t see a perfect fit?
            </h2>
            <p className="text-neutral-400 text-lg mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for exceptional talent. Send your CV and cover letter to <span className="text-orange-500">msi@gomercant.com</span> and let us know how you can contribute to our mission.
            </p>
            <a
              href="mailto:msi@gomercant.com?subject=General Application - GoMercant"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-105"
            >
              Send Application
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-800">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
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
          <div className="flex items-center gap-8">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Contact
            </Link>
            <Link href="/login" className="text-neutral-400 hover:text-white transition-colors text-sm">
              Client Login
            </Link>
          </div>
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} GoMercant. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
