import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Find user by verification token
    const { data: user, error: fetchError } = await supabase
      .from('users')
      .select('id, email_verified, verification_token_expires_at')
      .eq('verification_token', token)
      .single()

    if (fetchError || !user) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (user.verification_token_expires_at) {
      const expiresAt = new Date(user.verification_token_expires_at)
      if (expiresAt < new Date()) {
        return NextResponse.json(
          { error: 'Verification token has expired. Please request a new one.' },
          { status: 400 }
        )
      }
    }

    // Check if already verified
    if (user.email_verified) {
      return NextResponse.json(
        { message: 'Email is already verified' },
        { status: 200 }
      )
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

    // Redirect to login page with success message
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${baseUrl}/login?verified=true`)
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}
