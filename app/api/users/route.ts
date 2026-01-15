import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Get all users (for starting new conversations)
export async function GET(request: NextRequest) {
  try {
    const excludeUserId = request.nextUrl.searchParams.get('excludeUserId')
    const search = request.nextUrl.searchParams.get('search')

    let query = supabase
      .from('users')
      .select('id, name, email, avatar, title, company')
      .order('name', { ascending: true })

    if (excludeUserId) {
      query = query.neq('id', excludeUserId)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data: users, error } = await query.limit(50)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to get users' },
        { status: 500 }
      )
    }

    return NextResponse.json({ users: users || [] }, { status: 200 })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Failed to get users' },
      { status: 500 }
    )
  }
}
