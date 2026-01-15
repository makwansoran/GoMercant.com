import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendVerificationEmail, generateVerificationCode } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('id, name, email, email_verified')
      .eq('email', email)
      .single()

    if (fetchError || !user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        { message: 'If an account exists with this email, a verification code has been sent.' },
        { status: 200 }
      )
    }

    // If already verified, no need to resend
    if (user.email_verified) {
      return NextResponse.json(
        { message: 'Email is already verified' },
        { status: 200 }
      )
    }

    // Generate new 6-digit verification code
    const verificationCode = generateVerificationCode()
    const codeExpires = new Date()
    codeExpires.setMinutes(codeExpires.getMinutes() + 10) // 10 minutes

    // Update user with new code
    const { error: updateError } = await supabase
      .from('users')
      .update({
        verification_token: verificationCode,
        verification_token_expires_at: codeExpires.toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to generate verification code' },
        { status: 500 }
      )
    }

    // Send verification email with code
    const emailResult = await sendVerificationEmail(user.email, user.name, verificationCode)

    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send verification email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Verification code sent! Please check your inbox.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: 'Failed to resend verification code' },
      { status: 500 }
    )
  }
}
