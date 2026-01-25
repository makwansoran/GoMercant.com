"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, Database, Users, FileText } from "lucide-react"

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 text-orange-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                Privacy Policy
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
                Introduction
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                SPECTR AS ('we', 'our', or 'us') is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website spectr.no and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-orange-500" />
                Information We Collect
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                We collect information that you provide directly to us and information that is automatically collected when you use our services:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>Personal information (name, email address, phone number)</li>
                <li>Contact information and communication preferences</li>
                <li>Company information and job title</li>
                <li>Payment information (for paid services)</li>
                <li>IP address and device information</li>
                <li>Browser type and version, operating system</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-orange-500" />
                How We Use Your Information
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>To provide, maintain, and improve our services</li>
                <li>To communicate with you about our services and respond to your inquiries</li>
                <li>To analyze usage patterns and improve user experience</li>
                <li>To send you marketing communications (with your consent)</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-orange-500" />
                Data Protection
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-500" />
                Data Sharing
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                We do not sell your personal information. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to strict confidentiality agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Cookies
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                We use cookies and similar technologies to collect and store information. You can control cookies through your browser settings and our cookie consent banner.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    Necessary Cookies
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    Analytics Cookies
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Help us understand how visitors use our website by collecting anonymous information.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    Marketing Cookies
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Used to deliver relevant advertisements and track campaign effectiveness.
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    Functional Cookies
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Enable enhanced functionality and remember your preferences.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Your Rights
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Under GDPR and other applicable data protection laws, you have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate data</li>
                <li>Right to erasure ('right to be forgotten')</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                Contact Us
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us at{" "}
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
