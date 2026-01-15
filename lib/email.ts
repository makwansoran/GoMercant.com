import { Resend } from 'resend'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

// Generate a 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Generate a secure reset token
export function generateResetToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export async function sendVerificationEmail(email: string, name: string, code: string) {
  try {
    console.log('Sending verification email to:', email)
    console.log('Using Resend API key:', process.env.RESEND_API_KEY ? 'Set' : 'NOT SET')
    console.log('From email:', process.env.RESEND_FROM_EMAIL || 'noreply@gomercant.com')

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@gomercant.com',
      to: email,
      subject: 'Your GoMercant verification code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
            <div style="background: #000000; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">GoMercant</h1>
            </div>
            <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px;">
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Verify your email</h2>
              <p style="margin: 0 0 15px 0;">Hi ${name},</p>
              <p style="margin: 0 0 25px 0;">Thank you for signing up for GoMercant! Use the code below to verify your email address:</p>
              <div style="text-align: center; margin: 30px 0;">
                <div style="background: #f5f5f5; padding: 20px 40px; border-radius: 12px; display: inline-block;">
                  <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #000;">${code}</span>
                </div>
              </div>
              <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">This code will expire in 10 minutes. If you didn't create an account, you can safely ignore this email.</p>
            </div>
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
              © ${new Date().getFullYear()} GoMercant. All rights reserved.
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, name: string, resetUrl: string) {
  try {
    console.log('Sending password reset email to:', email)

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@gomercant.com',
      to: email,
      subject: 'Reset your GoMercant password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
            <div style="background: #000000; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">GoMercant</h1>
            </div>
            <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 12px 12px;">
              <h2 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Reset your password</h2>
              <p style="margin: 0 0 15px 0;">Hi ${name},</p>
              <p style="margin: 0 0 25px 0;">We received a request to reset your password. Click the button below to create a new password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="display: inline-block; background: #000000; color: white; padding: 14px 32px; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 14px;">Reset Password</a>
              </div>
              <p style="margin: 20px 0 0 0; font-size: 13px; color: #666;">Or copy and paste this link into your browser:</p>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999; word-break: break-all;">${resetUrl}</p>
              <p style="margin-top: 30px; font-size: 12px; color: #999; text-align: center;">This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
            <div style="text-align: center; padding: 20px; font-size: 12px; color: #999;">
              © ${new Date().getFullYear()} GoMercant. All rights reserved.
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error }
    }

    console.log('Password reset email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
