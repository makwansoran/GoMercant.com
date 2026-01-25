"use client"

import {cn} from "@/lib/utils"
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {useState} from "react"
import {motion, AnimatePresence} from "framer-motion"
import {Send, ArrowLeft, Mail, Phone, MapPin} from "lucide-react"

export default function ContactPage() {
  const t = useTranslations();
  const [formSubmitted, setFormSubmitted] = useState(false)

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
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              {t('common.clientLogin')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          {/* Back Link */}
          <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.4}}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-black transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4"/>
              {t('common.backToHome')}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6}}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {t('contact.title')}
              </h1>
              <p className="text-neutral-600 text-lg mb-12">
                {t('contact.subtitle')}
              </p>

              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-black">{t('contact.contactInformation')}</h3>
                <p className="text-neutral-500 text-sm -mt-4">{t('contact.contactChannels')}</p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-orange-600"/>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">{t('contact.email')}</div>
                      <a href="mailto:contact@spectr.no"
                         className="text-black font-medium hover:text-orange-600 transition-colors">
                        contact@spectr.no
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-600"/>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">{t('contact.phone')}</div>
                      <a href="tel:+4746503934"
                         className="text-black font-medium hover:text-orange-600 transition-colors">
                        +47 465 03 934
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-600"/>
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">{t('contact.address')}</div>
                      <p className="text-black font-medium">
                        {t('contact.addressValue')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.2}}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setFormSubmitted(true)
                  setTimeout(() => setFormSubmitted(false), 5000)
                }}
                className="bg-neutral-50 rounded-2xl p-8 md:p-10"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('contact.fullName')} {t('contact.required')}
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('contact.emailAddress')} {t('contact.required')}
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('contact.company')}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t('contact.phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="+47 465 03 934"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t('contact.yourMessage')} {t('contact.required')}
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-orange-600 hover:scale-[1.02] shadow-lg shadow-orange-500/30"
                  >
                    <Send className="w-5 h-5"/>
                    {t('common.sendMessage')}
                  </button>
                </div>

                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{opacity: 0, y: 10}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0}}
                      className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center font-medium"
                    >
                      {t('contact.messageSent')}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
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
