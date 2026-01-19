"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Image from "next/image"

export default function TermsPage() {
  const t = useTranslations()

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/favicon.png"
              alt={t('common.logoAlt')}
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-black">
              {t('common.brand')}
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
              {t('common.backToHome')}
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
                {t('terms.title')}
              </h1>
            </div>
            <p className="text-neutral-600 text-lg">
              {t('terms.lastUpdated')}: {new Date().toLocaleDateString()}
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
                {t('terms.acceptance.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('terms.acceptance.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-orange-500" />
                {t('terms.services.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {t('terms.services.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>{t('terms.services.items.cyber')}</li>
                <li>{t('terms.services.items.automation')}</li>
                <li>{t('terms.services.items.intelligence')}</li>
                <li>{t('terms.services.items.development')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                {t('terms.userObligations.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {t('terms.userObligations.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>{t('terms.userObligations.items.accurate')}</li>
                <li>{t('terms.userObligations.items.authorized')}</li>
                <li>{t('terms.userObligations.items.lawful')}</li>
                <li>{t('terms.userObligations.items.security')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-orange-500" />
                {t('terms.prohibited.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {t('terms.prohibited.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>{t('terms.prohibited.items.reverse')}</li>
                <li>{t('terms.prohibited.items.unauthorized')}</li>
                <li>{t('terms.prohibited.items.malicious')}</li>
                <li>{t('terms.prohibited.items.spam')}</li>
                <li>{t('terms.prohibited.items.violate')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('terms.intellectualProperty.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('terms.intellectualProperty.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('terms.liability.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('terms.liability.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('terms.termination.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('terms.termination.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('terms.changes.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('terms.changes.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('terms.contact.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('terms.contact.content')}{" "}
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
            © {new Date().getFullYear()} {t('common.copyright')}
          </div>
        </div>
      </footer>
    </div>
  )
}
