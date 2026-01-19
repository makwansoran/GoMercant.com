/**
 * Cookie management utilities
 */

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null

  const consent = localStorage.getItem("cookie-consent")
  if (!consent) return null

  try {
    return JSON.parse(consent) as CookiePreferences
  } catch {
    return null
  }
}

export function setCookieConsent(preferences: CookiePreferences): void {
  if (typeof window === "undefined") return

  localStorage.setItem("cookie-consent", JSON.stringify(preferences))
  localStorage.setItem("cookie-consent-date", new Date().toISOString())

  // Set cookies based on preferences
  if (preferences.analytics) {
    setCookie("analytics-enabled", "true", 365)
  } else {
    deleteCookie("analytics-enabled")
  }

  if (preferences.marketing) {
    setCookie("marketing-enabled", "true", 365)
  } else {
    deleteCookie("marketing-enabled")
  }

  if (preferences.functional) {
    setCookie("functional-enabled", "true", 365)
  } else {
    deleteCookie("functional-enabled")
  }

  // Always set necessary
  setCookie("cookie-consent", "accepted", 365)
}

export function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const nameEQ = name + "="
  const ca = document.cookie.split(";")
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === " ") c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export function deleteCookie(name: string): void {
  if (typeof document === "undefined") return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

export function hasConsented(): boolean {
  return getCookieConsent() !== null
}

export function canUseAnalytics(): boolean {
  const consent = getCookieConsent()
  return consent?.analytics === true
}

export function canUseMarketing(): boolean {
  const consent = getCookieConsent()
  return consent?.marketing === true
}

export function canUseFunctional(): boolean {
  const consent = getCookieConsent()
  return consent?.functional === true
}
