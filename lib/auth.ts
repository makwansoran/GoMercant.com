// Authentication utilities using database

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  emailVerified?: boolean
  avatar?: string | null
  banner?: string | null
  bio?: string | null
  title?: string | null
  location?: string | null
  website?: string | null
  github?: string | null
  linkedin?: string | null
  twitter?: string | null
  discord?: string | null
  company?: string | null
  rating?: number
  totalEarned?: number
  successRate?: number
  completedMissions?: number
  skills?: string[] | string | null
  portfolio?: string | null
  experience?: WorkExperience[] | string | null
  education?: Education[] | string | null
  certifications?: string[] | string | null
  languages?: string[] | string | null
  availability?: string | null
  hourlyRate?: number | null
  joinDate?: Date | string
}

export interface WorkExperience {
  id: string
  company: string
  title: string
  location?: string
  startDate: string
  endDate?: string
  current: boolean
  description?: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field?: string
  startDate: string
  endDate?: string
  current: boolean
}

export async function signup(name: string, email: string, password: string): Promise<{ user: User; message?: string; requiresVerification?: boolean } | { error: string; requiresVerification?: boolean }> {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'Failed to create account', requiresVerification: data.requiresVerification }
    }

    return data
  } catch (error) {
    console.error('Signup error:', error)
    return { error: 'Failed to create account' }
  }
}

export async function login(email: string, password: string): Promise<{ user: User } | { error: string; requiresVerification?: boolean; email?: string }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'Invalid credentials', requiresVerification: data.requiresVerification, email: data.email }
    }

    return data
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Failed to login' }
  }
}

export async function resendVerification(email: string): Promise<{ message: string } | { error: string }> {
  try {
    const response = await fetch('/api/auth/resend-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'Failed to resend verification code' }
    }

    return data
  } catch (error) {
    console.error('Resend verification error:', error)
    return { error: 'Failed to resend verification code' }
  }
}

export async function verifyCode(email: string, code: string): Promise<{ message: string; verified: boolean } | { error: string }> {
  try {
    const response = await fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, code }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'Failed to verify code' }
    }

    return data
  } catch (error) {
    console.error('Verify code error:', error)
    return { error: 'Failed to verify code' }
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('auth_token') !== null
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function setAuth(user: User) {
  if (typeof window === 'undefined') return
  localStorage.setItem('auth_token', 'token_' + Date.now())
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearAuth() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
}
