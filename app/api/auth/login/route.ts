import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (fetchError || !user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if email is verified
    if (!user.email_verified) {
      return NextResponse.json(
        { 
          error: 'Please verify your email address before logging in. Check your inbox for the verification email.',
          requiresVerification: true,
          email: user.email
        },
        { status: 403 }
      )
    }

    // Map database fields to camelCase for frontend (without password)
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.email_verified,
      avatar: user.avatar,
      bio: user.bio,
      rating: user.rating,
      totalEarned: user.total_earned,
      successRate: user.success_rate,
      completedMissions: user.completed_missions,
      skills: user.skills,
      portfolio: user.portfolio,
      joinDate: user.join_date,
    }

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    )
  }
}
