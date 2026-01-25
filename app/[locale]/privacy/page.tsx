"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { ArrowLeft, Shield, Eye, Lock, Database, Users, FileText } from "lucide-react"

export default function PrivacyPage() {
  const t = useTranslations()

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
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
              <Shield className="w-8 h-8 text-orange-500" />
              <h1 className="text-4xl md:text-5xl font-bold text-black">
                {t('privacy.title')}
              </h1>
            </div>
            <p className="text-neutral-600 text-lg">
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString()}
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
                {t('privacy.introduction.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('privacy.introduction.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-orange-500" />
                {t('privacy.dataCollection.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {t('privacy.dataCollection.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>{t('privacy.dataCollection.items.name')}</li>
                <li>{t('privacy.dataCollection.items.email')}</li>
                <li>{t('privacy.dataCollection.items.phone')}</li>
                <li>{t('privacy.dataCollection.items.company')}</li>
                <li>{t('privacy.dataCollection.items.ip')}</li>
                <li>{t('privacy.dataCollection.items.browser')}</li>
                <li>{t('privacy.dataCollection.items.cookies')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-orange-500" />
                {t('privacy.howWeUse.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {t('privacy.howWeUse.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>{t('privacy.howWeUse.items.service')}</li>
                <li>{t('privacy.howWeUse.items.communication')}</li>
                <li>{t('privacy.howWeUse.items.analytics')}</li>
                <li>{t('privacy.howWeUse.items.marketing')}</li>
                <li>{t('privacy.howWeUse.items.security')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-orange-500" />
                {t('privacy.dataProtection.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('privacy.dataProtection.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-orange-500" />
                {t('privacy.dataSharing.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('privacy.dataSharing.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('privacy.cookies.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {t('privacy.cookies.description')}
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    {t('privacy.cookies.types.necessary.title')}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {t('privacy.cookies.types.necessary.description')}
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    {t('privacy.cookies.types.analytics.title')}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {t('privacy.cookies.types.analytics.description')}
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    {t('privacy.cookies.types.marketing.title')}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {t('privacy.cookies.types.marketing.description')}
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-black mb-2">
                    {t('privacy.cookies.types.functional.title')}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {t('privacy.cookies.types.functional.description')}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('privacy.yourRights.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                {t('privacy.yourRights.description')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700">
                <li>{t('privacy.yourRights.items.access')}</li>
                <li>{t('privacy.yourRights.items.rectification')}</li>
                <li>{t('privacy.yourRights.items.erasure')}</li>
                <li>{t('privacy.yourRights.items.restriction')}</li>
                <li>{t('privacy.yourRights.items.portability')}</li>
                <li>{t('privacy.yourRights.items.objection')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-black mb-4">
                {t('privacy.contact.title')}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {t('privacy.contact.content')}{" "}
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
