import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch all public users/people
export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ users: [] }, { status: 200 })
    }

    // Map to frontend format and exclude sensitive data
    const formattedUsers = (users || []).map(u => ({
      id: u.id,
      name: u.name,
      email: u.email, // Could hide this for privacy
      avatar: u.avatar,
      title: u.title || u.role || 'Member',
      role: u.role || 'member',
      location: u.location,
      skills: u.skills || [],
      rating: u.rating || 5.0,
      completedMissions: u.completed_missions || 0,
      bio: u.bio,
      createdAt: u.created_at,
    }))

    return NextResponse.json({ users: formattedUsers }, { status: 200 })
  } catch (error) {
    console.error('Get public users error:', error)
    return NextResponse.json({ users: [] }, { status: 200 })
  }
}
