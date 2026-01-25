"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-black">
              SPECTR
            </span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-black transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-orange-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Terms of Service
              </h1>
            </div>
            <p className="text-neutral-600 text-lg">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none space-y-8"
          >
            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-orange-500" />
                Acceptance of Terms
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                By accessing and using spectr.no, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-orange-500" />
                Our Services
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                SPECTR provides cybersecurity and AI consulting services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>Cyber surveillance and threat detection</li>
                <li>Business process automation</li>
                <li>Data analytics and intelligence platforms</li>
                <li>Custom software development</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                User Obligations
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                When using our services, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>Provide accurate and complete information</li>
                <li>Use services only for authorized purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain the security of your account credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-orange-500" />
                Prohibited Activities
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                You are prohibited from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>Reverse engineering or attempting to extract source code</li>
                <li>Unauthorized access to our systems or data</li>
                <li>Introducing viruses, malware, or harmful code</li>
                <li>Sending spam or unsolicited communications</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Intellectual Property
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                All content, features, and functionality of our services are owned by SPECTR AS and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Limitation of Liability
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                SPECTR AS shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Termination
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                We reserve the right to terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Changes to Terms
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Contact Information
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                For questions about these Terms of Service, please contact us at{" "}
                <a
                  href="mailto:contact@spectr.no"
                  className="text-orange-500 hover:text-orange-600 underline"
                >
                  contact@spectr.no
                </a>
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-neutral-100">
        <div className="mx-auto max-w-6xl text-center">
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} spectr.no By SPECTR AS · Org nr 936961967
          </div>
        </div>
      </footer>
    </div>
  )
}
