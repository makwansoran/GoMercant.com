import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import { sendVerificationEmail, generateVerificationCode } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id, email_verified')
      .eq('email', email)
      .single()

    if (existingUser) {
      // If user exists but email is not verified, we can resend verification
      if (!existingUser.email_verified) {
        // Generate new 6-digit verification code
        const verificationCode = generateVerificationCode()
        const codeExpires = new Date()
        codeExpires.setMinutes(codeExpires.getMinutes() + 10) // 10 minutes

        await supabase
          .from('users')
          .update({
            verification_token: verificationCode,
            verification_token_expires_at: codeExpires.toISOString(),
          })
          .eq('id', existingUser.id)

        // Send verification email with code
        await sendVerificationEmail(email, name, verificationCode)

        return NextResponse.json(
          { 
            message: 'Verification code sent! Please check your email.',
            requiresVerification: true,
            email: email
          },
          { status: 200 }
        )
      }
      
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate 6-digit verification code
    const verificationCode = generateVerificationCode()
    const codeExpires = new Date()
    codeExpires.setMinutes(codeExpires.getMinutes() + 10) // 10 minutes

    // Create user with email verification required
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        role: email === 'admin@admin.com' ? 'admin' : 'user',
        email_verified: false,
        verification_token: verificationCode,
        verification_token_expires_at: codeExpires.toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json(
        { error: `Failed to create account: ${insertError.message}` },
        { status: 500 }
      )
    }

    // Send verification email with code
    const emailResult = await sendVerificationEmail(email, name, verificationCode)
    
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error)
      // Still return success, but note that email might not have been sent
    }

    // Map database fields to camelCase for frontend
    const user = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      emailVerified: newUser.email_verified,
      avatar: newUser.avatar,
      bio: newUser.bio,
      rating: newUser.rating,
      totalEarned: newUser.total_earned,
      successRate: newUser.success_rate,
      completedMissions: newUser.completed_missions,
      skills: newUser.skills,
      portfolio: newUser.portfolio,
      joinDate: newUser.join_date,
    }

    return NextResponse.json({ 
      user,
      message: 'Verification code sent! Please check your email.',
      requiresVerification: true,
      email: email
    }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
