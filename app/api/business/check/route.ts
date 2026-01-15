import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ hasBusiness: false })
    }

    const { data: business, error } = await supabase
      .from('businesses')
      .select('id, name, type')
      .eq('owner_id', userId)
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Supabase error:', error)
      return NextResponse.json({ hasBusiness: false })
    }

    return NextResponse.json({ 
      hasBusiness: !!business,
      business: business ? {
        id: business.id,
        name: business.name,
        type: business.type
      } : null
    })
  } catch (error) {
    console.error('Error checking business:', error)
    return NextResponse.json({ hasBusiness: false })
  }
}
