"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { X, Cookie, Settings } from "lucide-react"
import { setCookieConsent, type CookiePreferences } from "@/lib/cookies"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent)
        setPreferences(saved)
      } catch (e) {
        // If parsing fails, use defaults
      }
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setPreferences(allAccepted)
    setCookieConsent(allAccepted)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setPreferences(onlyNecessary)
    setCookieConsent(onlyNecessary)
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    setCookieConsent(preferences)
    setShowBanner(false)
    setShowSettings(false)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-2xl"
        >
          <div className="mx-auto max-w-7xl px-6 py-6">
            {!showSettings ? (
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Cookie className="w-5 h-5 text-orange-500" />
                    <h3 className="text-lg font-semibold text-black">
                      We use cookies
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking 'Accept All', you consent to our use of cookies. You can customize your preferences or learn more in our{" "}
                    <Link
                      href="/privacy"
                      className="text-orange-500 hover:text-orange-600 underline"
                    >
                      Privacy Policy
                    </Link>
                    {" "}and{" "}
                    <Link
                      href="/terms"
                      className="text-orange-500 hover:text-orange-600 underline"
                    >
                      Terms of Service
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors border border-neutral-300 rounded-lg hover:border-neutral-400"
                  >
                    <Settings className="w-4 h-4 inline mr-2" />
                    Customize
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors border border-neutral-300 rounded-lg hover:border-neutral-400"
                  >
                    Reject All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-black">
                    {t("cookies.customizeTitle")}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-neutral-500 hover:text-black transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-neutral-600">
                  {t("cookies.customizeDescription")}
                </p>
                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-black">
                          Necessary Cookies
                        </h4>
                        <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded">
                          Required
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">
                        These cookies are essential for the website to function properly. They cannot be disabled.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="ml-4 w-5 h-5 text-orange-500 rounded border-neutral-300"
                    />
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex-1">
                      <h4 className="font-semibold text-black mb-1">
                        Analytics Cookies
                      </h4>
                      <p className="text-sm text-neutral-600">
                        These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences({ ...preferences, analytics: e.target.checked })
                      }
                      className="ml-4 w-5 h-5 text-orange-500 rounded border-neutral-300 focus:ring-orange-500"
                    />
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex-1">
                      <h4 className="font-semibold text-black mb-1">
                        {t("cookies.marketing.title")}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {t("cookies.marketing.description")}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) =>
                        setPreferences({ ...preferences, marketing: e.target.checked })
                      }
                      className="ml-4 w-5 h-5 text-orange-500 rounded border-neutral-300 focus:ring-orange-500"
                    />
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-start justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                    <div className="flex-1">
                      <h4 className="font-semibold text-black mb-1">
                        Functional Cookies
                      </h4>
                      <p className="text-sm text-neutral-600">
                        These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences({ ...preferences, functional: e.target.checked })
                      }
                      className="ml-4 w-5 h-5 text-orange-500 rounded border-neutral-300 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
