import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail, generateResetToken } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    // If user doesn't exist, return generic message but no reset link
    if (!user) {
      return NextResponse.json({
        message: 'If an account exists with this email, you will receive a password reset link.',
        resetUrl: null
      })
    }

    // Generate reset token
    const resetToken = generateResetToken()
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Save token to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    // Send password reset email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`
    
    let emailSent = false
    try {
      const emailResult = await sendPasswordResetEmail(email, user.name, resetUrl)
      emailSent = emailResult.success
      if (!emailResult.success) {
        console.error('Failed to send password reset email:', emailResult.error)
      }
    } catch (emailError) {
      console.error('Email service error:', emailError)
    }

    // In development or if email fails, provide the reset link directly
    const isDev = process.env.NODE_ENV === 'development' || !process.env.RESEND_API_KEY
    
    return NextResponse.json({
      message: emailSent 
        ? 'Password reset link has been sent to your email.' 
        : 'Email service unavailable. Use the link below to reset your password.',
      resetUrl: (!emailSent || isDev) ? resetUrl : null,
      emailSent
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
