"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Globe, Send, ArrowLeft, Mail, Phone, MapPin } from "lucide-react"

const translations = {
  en: {
    back: "Back to Home",
    clientLogin: "Client Login",
    contactTitle: "Get In Touch",
    contactDesc: "Have a project in mind? Let us know and we will get back to you within 24 hours.",
    formName: "Full Name",
    formEmail: "Email Address",
    formCompany: "Company",
    formPhone: "Phone Number",
    formMessage: "Your Message",
    formSubmit: "Send Message",
    formSuccess: "Message sent successfully! We will contact you soon.",
    infoTitle: "Contact Information",
    infoDesc: "Reach out to us through any of these channels",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
  },
  no: {
    back: "Tilbake til Hjem",
    clientLogin: "Kundeinnlogging",
    contactTitle: "Ta Kontakt",
    contactDesc: "Har du et prosjekt i tankene? Gi oss beskjed, så svarer vi innen 24 timer.",
    formName: "Fullt Navn",
    formEmail: "E-postadresse",
    formCompany: "Bedrift",
    formPhone: "Telefonnummer",
    formMessage: "Din Melding",
    formSubmit: "Send Melding",
    formSuccess: "Meldingen ble sendt! Vi kontakter deg snart.",
    infoTitle: "Kontaktinformasjon",
    infoDesc: "Ta kontakt med oss via en av disse kanalene",
    emailLabel: "E-post",
    phoneLabel: "Telefon",
    addressLabel: "Adresse",
  },
  sv: {
    back: "Tillbaka till Hem",
    clientLogin: "Kundlogin",
    contactTitle: "Kontakta Oss",
    contactDesc: "Har du ett projekt i åtanke? Hör av dig så återkommer vi inom 24 timmar.",
    formName: "Fullständigt Namn",
    formEmail: "E-postadress",
    formCompany: "Företag",
    formPhone: "Telefonnummer",
    formMessage: "Ditt Meddelande",
    formSubmit: "Skicka Meddelande",
    formSuccess: "Meddelandet har skickats! Vi kontaktar dig snart.",
    infoTitle: "Kontaktinformation",
    infoDesc: "Nå oss via någon av dessa kanaler",
    emailLabel: "E-post",
    phoneLabel: "Telefon",
    addressLabel: "Adress",
  },
  da: {
    back: "Tilbage til Hjem",
    clientLogin: "Kundelogin",
    contactTitle: "Kontakt Os",
    contactDesc: "Har du et projekt i tankerne? Fortæl os det, så vender vi tilbage inden for 24 timer.",
    formName: "Fulde Navn",
    formEmail: "E-mailadresse",
    formCompany: "Virksomhed",
    formPhone: "Telefonnummer",
    formMessage: "Din Besked",
    formSubmit: "Send Besked",
    formSuccess: "Beskeden blev sendt! Vi kontakter dig snart.",
    infoTitle: "Kontaktoplysninger",
    infoDesc: "Kontakt os via en af disse kanaler",
    emailLabel: "E-mail",
    phoneLabel: "Telefon",
    addressLabel: "Adresse",
  },
}

const languages = [
  { code: "en" as const, name: "English", flag: "🇬🇧" },
  { code: "no" as const, name: "Norsk", flag: "🇳🇴" },
  { code: "sv" as const, name: "Svenska", flag: "🇸🇪" },
  { code: "da" as const, name: "Dansk", flag: "🇩🇰" },
]

type LangCode = keyof typeof translations

export default function ContactPage() {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [selectedLang, setSelectedLang] = useState(languages[0])
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const t = translations[selectedLang.code as LangCode]

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Fixed Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/favicon.png" 
              alt="SPECTR Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
            <span className="text-2xl font-bold tracking-tight text-black">
              SPECTR
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-50 hover:border-neutral-300"
              >
                <Globe className="w-4 h-4 text-neutral-500" />
                <span>{selectedLang.flag}</span>
                <span>{selectedLang.code.toUpperCase()}</span>
                <ChevronDown className={cn("w-4 h-4 text-neutral-400 transition-transform", isLangOpen && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang)
                          setIsLangOpen(false)
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-neutral-50",
                          selectedLang.code === lang.code ? "bg-orange-50 text-orange-600" : "text-neutral-700"
                        )}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                        {selectedLang.code === lang.code && (
                          <span className="ml-auto text-orange-500">✓</span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/get-started"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-neutral-800 hover:scale-105"
            >
              {t.clientLogin}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
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
              {t.back}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {t.contactTitle}
              </h1>
              <p className="text-neutral-600 text-lg mb-12">
                {t.contactDesc}
              </p>

              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-black">{t.infoTitle}</h3>
                <p className="text-neutral-500 text-sm -mt-4">{t.infoDesc}</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">{t.emailLabel}</div>
                      <a href="mailto:contact@spectr.com" className="text-black font-medium hover:text-orange-600 transition-colors">
                        contact@spectr.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">{t.phoneLabel}</div>
                      <a href="tel:+4712345678" className="text-black font-medium hover:text-orange-600 transition-colors">
                        +47 123 45 678
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500 mb-1">{t.addressLabel}</div>
                      <p className="text-black font-medium">
                        Oslo, Norway
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                      {t.formName} *
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
                      {t.formEmail} *
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
                      {t.formCompany}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {t.formPhone}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-neutral-200 bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="+47 123 45 678"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    {t.formMessage} *
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
                    <Send className="w-5 h-5" />
                    {t.formSubmit}
                  </button>
                </div>
                
                <AnimatePresence>
                  {formSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center font-medium"
                    >
                      ✓ {t.formSuccess}
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
            © {new Date().getFullYear()} SPECTR. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
