import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Helper to create slug from name
function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// GET - Fetch all businesses for the current user
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id') || request.nextUrl.searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ businesses: [] }, { status: 200 })
    }

    const { data: businesses, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_id', userId)
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
      rating: b.rating,
      openMissions: b.open_missions,
      tags: b.tags || [],
      ownerId: b.owner_id,
      createdAt: b.created_at,
      updatedAt: b.updated_at,
    }))

    return NextResponse.json({ businesses: formattedBusinesses }, { status: 200 })
  } catch (error) {
    console.error('Get businesses error:', error)
    return NextResponse.json({ businesses: [] }, { status: 200 })
  }
}

// POST - Create a new business
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      type,
      description,
      website,
      location,
      industry,
      size,
      founded,
      logo,
      banner,
      github,
      linkedin,
      twitter,
      discord,
      tags,
      userId
    } = body

    // Validate required fields
    if (!name || !type || !userId) {
      return NextResponse.json(
        { error: 'Name, type, and userId are required' },
        { status: 400 }
      )
    }

    // Create unique slug
    let baseSlug = createSlug(name)
    let slug = baseSlug
    let counter = 1
    
    // Check for slug collisions
    while (true) {
      const { data: existing } = await supabase
        .from('businesses')
        .select('id')
        .eq('slug', slug)
        .single()
      
      if (!existing) break
      slug = `${baseSlug}-${counter}`
      counter++
    }

    const { data: business, error } = await supabase
      .from('businesses')
      .insert({
        name,
        slug,
        type,
        description: description || null,
        website: website || null,
        location: location || null,
        industry: industry || null,
        size: size || null,
        founded: founded || null,
        logo: logo || null,
        banner: banner || null,
        github: github || null,
        linkedin: linkedin || null,
        twitter: twitter || null,
        discord: discord || null,
        tags: tags || [],
        owner_id: userId
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create business' },
        { status: 500 }
      )
    }

    // Map to camelCase
    const formattedBusiness = {
      id: business.id,
      name: business.name,
      slug: business.slug,
      type: business.type,
      description: business.description,
      logo: business.logo,
      banner: business.banner,
      website: business.website,
      location: business.location,
      industry: business.industry,
      size: business.size,
      founded: business.founded,
      github: business.github,
      linkedin: business.linkedin,
      twitter: business.twitter,
      discord: business.discord,
      rating: business.rating,
      openMissions: business.open_missions,
      tags: business.tags || [],
      ownerId: business.owner_id,
      createdAt: business.created_at,
      updatedAt: business.updated_at,
    }

    return NextResponse.json({ 
      message: 'Business created successfully',
      business: formattedBusiness
    }, { status: 201 })
  } catch (error) {
    console.error('Create business error:', error)
    return NextResponse.json(
      { error: 'Failed to create business' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a business
export async function DELETE(request: NextRequest) {
  try {
    const businessId = request.nextUrl.searchParams.get('id')
    const userId = request.nextUrl.searchParams.get('userId')
    
    if (!businessId || !userId) {
      return NextResponse.json(
        { error: 'Business ID and user ID are required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const { data: business } = await supabase
      .from('businesses')
      .select('id')
      .eq('id', businessId)
      .eq('owner_id', userId)
      .single()

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found or unauthorized' },
        { status: 404 }
      )
    }

    const { error } = await supabase
      .from('businesses')
      .delete()
      .eq('id', businessId)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete business' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Business deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Delete business error:', error)
    return NextResponse.json(
      { error: 'Failed to delete business' },
      { status: 500 }
    )
  }
}

// PATCH - Update a business
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, userId, ...updates } = body

    if (!id || !userId) {
      return NextResponse.json(
        { error: 'Business ID and user ID are required' },
        { status: 400 }
      )
    }

    // Verify ownership
    const { data: business } = await supabase
      .from('businesses')
      .select('id')
      .eq('id', id)
      .eq('owner_id', userId)
      .single()

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found or unauthorized' },
        { status: 404 }
      )
    }

    // Map camelCase to snake_case for database
    const dbUpdates: Record<string, any> = {}
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.website !== undefined) dbUpdates.website = updates.website
    if (updates.location !== undefined) dbUpdates.location = updates.location
    if (updates.industry !== undefined) dbUpdates.industry = updates.industry
    if (updates.size !== undefined) dbUpdates.size = updates.size
    if (updates.founded !== undefined) dbUpdates.founded = updates.founded
    if (updates.logo !== undefined) dbUpdates.logo = updates.logo
    if (updates.banner !== undefined) dbUpdates.banner = updates.banner
    if (updates.github !== undefined) dbUpdates.github = updates.github
    if (updates.linkedin !== undefined) dbUpdates.linkedin = updates.linkedin
    if (updates.twitter !== undefined) dbUpdates.twitter = updates.twitter
    if (updates.discord !== undefined) dbUpdates.discord = updates.discord
    if (updates.tags !== undefined) dbUpdates.tags = updates.tags

    const { data: updatedBusiness, error } = await supabase
      .from('businesses')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update business' },
        { status: 500 }
      )
    }

    // Map to camelCase
    const formattedBusiness = {
      id: updatedBusiness.id,
      name: updatedBusiness.name,
      slug: updatedBusiness.slug,
      type: updatedBusiness.type,
      description: updatedBusiness.description,
      logo: updatedBusiness.logo,
      banner: updatedBusiness.banner,
      website: updatedBusiness.website,
      location: updatedBusiness.location,
      industry: updatedBusiness.industry,
      size: updatedBusiness.size,
      founded: updatedBusiness.founded,
      github: updatedBusiness.github,
      linkedin: updatedBusiness.linkedin,
      twitter: updatedBusiness.twitter,
      discord: updatedBusiness.discord,
      rating: updatedBusiness.rating,
      openMissions: updatedBusiness.open_missions,
      tags: updatedBusiness.tags || [],
      ownerId: updatedBusiness.owner_id,
      createdAt: updatedBusiness.created_at,
      updatedAt: updatedBusiness.updated_at,
    }

    return NextResponse.json({ 
      message: 'Business updated successfully',
      business: formattedBusiness
    }, { status: 200 })
  } catch (error) {
    console.error('Update business error:', error)
    return NextResponse.json(
      { error: 'Failed to update business' },
      { status: 500 }
    )
  }
}
