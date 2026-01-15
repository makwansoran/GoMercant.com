import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error counting users:', error)
      return NextResponse.json(
        { error: 'Failed to count users' },
        { status: 500 }
      )
    }

    return NextResponse.json({ count: count || 0 }, { status: 200 })
  } catch (error) {
    console.error('Error counting users:', error)
    return NextResponse.json(
      { error: 'Failed to count users' },
      { status: 500 }
    )
  }
}
