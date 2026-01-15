import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch user profile
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error || !user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Map database fields to camelCase and exclude password
    const profile = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      emailVerified: user.email_verified,
      avatar: user.avatar,
      banner: user.banner,
      bio: user.bio,
      title: user.title,
      location: user.location,
      website: user.website,
      github: user.github,
      linkedin: user.linkedin,
      twitter: user.twitter,
      discord: user.discord,
      company: user.company,
      rating: user.rating,
      totalEarned: user.total_earned,
      successRate: user.success_rate,
      completedMissions: user.completed_missions,
      skills: user.skills || [],
      portfolio: user.portfolio,
      experience: user.experience || [],
      education: user.education || [],
      certifications: user.certifications || [],
      languages: user.languages || [],
      availability: user.availability,
      hourlyRate: user.hourly_rate,
      joinDate: user.join_date,
    }

    return NextResponse.json({ profile }, { status: 200 })
  } catch (error) {
    console.error('Fetch profile error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

// PUT - Update user profile
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...profileData } = body

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Map camelCase to snake_case for database
    const updateData: Record<string, unknown> = {}
    
    if (profileData.name !== undefined) updateData.name = profileData.name
    if (profileData.avatar !== undefined) updateData.avatar = profileData.avatar
    if (profileData.banner !== undefined) updateData.banner = profileData.banner
    if (profileData.bio !== undefined) updateData.bio = profileData.bio
    if (profileData.title !== undefined) updateData.title = profileData.title
    if (profileData.location !== undefined) updateData.location = profileData.location
    if (profileData.website !== undefined) updateData.website = profileData.website
    if (profileData.github !== undefined) updateData.github = profileData.github
    if (profileData.linkedin !== undefined) updateData.linkedin = profileData.linkedin
    if (profileData.twitter !== undefined) updateData.twitter = profileData.twitter
    if (profileData.discord !== undefined) updateData.discord = profileData.discord
    if (profileData.company !== undefined) updateData.company = profileData.company
    if (profileData.skills !== undefined) updateData.skills = profileData.skills
    if (profileData.portfolio !== undefined) updateData.portfolio = profileData.portfolio
    if (profileData.experience !== undefined) updateData.experience = profileData.experience
    if (profileData.education !== undefined) updateData.education = profileData.education
    if (profileData.certifications !== undefined) updateData.certifications = profileData.certifications
    if (profileData.languages !== undefined) updateData.languages = profileData.languages
    if (profileData.availability !== undefined) updateData.availability = profileData.availability
    if (profileData.hourlyRate !== undefined) updateData.hourly_rate = profileData.hourlyRate

    updateData.updated_at = new Date().toISOString()

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    // Map back to camelCase
    const profile = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      emailVerified: updatedUser.email_verified,
      avatar: updatedUser.avatar,
      banner: updatedUser.banner,
      bio: updatedUser.bio,
      title: updatedUser.title,
      location: updatedUser.location,
      website: updatedUser.website,
      github: updatedUser.github,
      linkedin: updatedUser.linkedin,
      twitter: updatedUser.twitter,
      discord: updatedUser.discord,
      company: updatedUser.company,
      rating: updatedUser.rating,
      totalEarned: updatedUser.total_earned,
      successRate: updatedUser.success_rate,
      completedMissions: updatedUser.completed_missions,
      skills: updatedUser.skills || [],
      portfolio: updatedUser.portfolio,
      experience: updatedUser.experience || [],
      education: updatedUser.education || [],
      certifications: updatedUser.certifications || [],
      languages: updatedUser.languages || [],
      availability: updatedUser.availability,
      hourlyRate: updatedUser.hourly_rate,
      joinDate: updatedUser.join_date,
    }

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      profile 
    }, { status: 200 })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
