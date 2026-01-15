import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      )
    }

    // Find user by email and verification code
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('id, email_verified, verification_token, verification_token_expires_at')
      .eq('email', email)
      .single()

    if (fetchError || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if already verified
    if (user.email_verified) {
      return NextResponse.json(
        { message: 'Email is already verified', verified: true },
        { status: 200 }
      )
    }

    // Check if code matches
    if (user.verification_token !== code) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Check if code has expired
    if (user.verification_token_expires_at) {
      const expiresAt = new Date(user.verification_token_expires_at)
      if (expiresAt < new Date()) {
        return NextResponse.json(
          { error: 'Verification code has expired. Please request a new one.' },
          { status: 400 }
        )
      }
    }

    // Verify the email
    const { error: updateError } = await supabase
      .from('users')
      .update({
        email_verified: true,
        verification_token: null,
        verification_token_expires_at: null,
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Supabase update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to verify email' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Email verified successfully!', verified: true },
      { status: 200 }
    )
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}
