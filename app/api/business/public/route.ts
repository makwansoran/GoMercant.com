import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch all public businesses/organizations
export async function GET() {
  try {
    const { data: businesses, error } = await supabase
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ businesses: [] }, { status: 200 })
    }

    // Map to camelCase for frontend
    const formattedBusinesses = (businesses || []).map(b => ({
      id: b.id,
      name: b.name,
      slug: b.slug,
      type: b.type,
      description: b.description,
      logo: b.logo,
      banner: b.banner,
      website: b.website,
      location: b.location,
      industry: b.industry,
      size: b.size,
      founded: b.founded,
      github: b.github,
      linkedin: b.linkedin,
      twitter: b.twitter,
      discord: b.discord,
      rating: b.rating || 5.0,
      openMissions: b.open_missions || 0,
      tags: b.tags || [],
      createdAt: b.created_at,
    }))

    return NextResponse.json({ businesses: formattedBusinesses }, { status: 200 })
  } catch (error) {
    console.error('Get public businesses error:', error)
    return NextResponse.json({ businesses: [] }, { status: 200 })
  }
}
