import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Mock missions - empty by default, user will create their own
const mockMissions: any[] = []

// GET - Fetch all missions
export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get('status')
    const deliverableType = request.nextUrl.searchParams.get('deliverableType')
    const search = request.nextUrl.searchParams.get('search')
    const posterId = request.nextUrl.searchParams.get('posterId')

    // Try to fetch from Supabase first
    if (supabase) {
      try {
        let query = supabase
          .from('missions')
          .select('*')
          .order('created_at', { ascending: false })

        if (status) {
          query = query.eq('status', status)
        }

        if (deliverableType) {
          query = query.eq('deliverable_type', deliverableType)
        }

        if (posterId) {
          query = query.eq('poster_id', posterId)
        }

        if (search) {
          query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
        }

        const { data: missions, error } = await query

        if (!error && missions && missions.length > 0) {
          // Map to camelCase for frontend
          const formattedMissions = missions.map(m => ({
            id: m.id,
            title: m.title,
            description: m.description,
            fullDescription: m.full_description,
            bounty: m.bounty,
            deliverableType: m.deliverable_type,
            status: m.status,
            posterId: m.poster_id,
            posterName: m.poster_name,
            posterEmail: m.poster_email,
            posterLogo: m.poster_logo,
            contactName: m.contact_name,
            contactEmail: m.contact_email,
            contactAvatar: m.contact_avatar,
            deadline: m.deadline,
            tags: m.tags || [],
            requiredFiles: m.required_files || [],
            attachments: m.attachments,
            submissions: m.submissions_count || 0,
            winnerId: m.winner_id,
            createdAt: m.created_at,
            updatedAt: m.updated_at,
          }))

          return NextResponse.json({ missions: formattedMissions }, { status: 200 })
        }
      } catch (supabaseError) {
        console.log('Supabase not available, using mock data:', supabaseError)
      }
    }

    // Fall back to mock data if Supabase is not available or empty
    let filteredMissions = [...mockMissions]

    if (status) {
      filteredMissions = filteredMissions.filter(m => m.status === status)
    }

    if (deliverableType) {
      filteredMissions = filteredMissions.filter(m => m.deliverableType === deliverableType)
    }

    if (posterId) {
      filteredMissions = filteredMissions.filter(m => m.posterId === posterId)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredMissions = filteredMissions.filter(m => 
        m.title.toLowerCase().includes(searchLower) ||
        m.description.toLowerCase().includes(searchLower)
      )
    }

    return NextResponse.json({ missions: filteredMissions }, { status: 200 })
  } catch (error) {
    console.error('Get missions error:', error)
    // Return mock data even on error
    return NextResponse.json({ missions: mockMissions }, { status: 200 })
  }
}

// POST - Create a new mission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      fullDescription,
      bounty,
      deliverableType,
      deadline,
      tags,
      requiredFiles,
      contactName,
      contactEmail,
      posterId,
      posterName,
      posterEmail,
      posterLogo: providedPosterLogo,
      contactAvatar: providedContactAvatar,
      businessId,
      attachments,
    } = body

    // Validate required fields
    if (!title || !description || !bounty || !deliverableType || !deadline || !posterId || !posterName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Use provided logo/avatar or fetch from database as fallback
    let posterLogo = providedPosterLogo || null
    let contactAvatar = providedContactAvatar || null

    // Fetch business logo if not provided and businessId exists
    if (!posterLogo && businessId) {
      try {
        const { data: business } = await supabase
          .from('businesses')
          .select('logo')
          .eq('id', businessId)
          .single()
        
        if (business?.logo) {
          posterLogo = business.logo
        }
      } catch (err) {
        console.error('Error fetching business logo:', err)
      }
    }

    // Fetch contact avatar if not provided
    if (!contactAvatar && posterId) {
      try {
        const { data: user } = await supabase
          .from('users')
          .select('avatar')
          .eq('id', posterId)
          .single()
        
        if (user?.avatar) {
          contactAvatar = user.avatar
        }
      } catch (err) {
        console.error('Error fetching user avatar:', err)
      }
    }

    const { data: mission, error } = await supabase
      .from('missions')
      .insert({
        title,
        description,
        full_description: fullDescription || null,
        bounty: parseFloat(bounty),
        deliverable_type: deliverableType,
        deadline,
        tags: tags || [],
        required_files: requiredFiles || [],
        contact_name: contactName || null,
        contact_email: contactEmail || null,
        poster_id: posterId,
        poster_name: posterName,
        poster_email: posterEmail || null,
        poster_logo: posterLogo,
        contact_avatar: contactAvatar,
        business_id: businessId || null,
        attachments: attachments || null,
        status: 'Open',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create mission' },
        { status: 500 }
      )
    }

    // Map to camelCase
    const formattedMission = {
      id: mission.id,
      title: mission.title,
      description: mission.description,
      fullDescription: mission.full_description,
      bounty: mission.bounty,
      deliverableType: mission.deliverable_type,
      status: mission.status,
      posterId: mission.poster_id,
      posterName: mission.poster_name,
      posterEmail: mission.poster_email,
      posterLogo: mission.poster_logo,
      contactName: mission.contact_name,
      contactEmail: mission.contact_email,
      contactAvatar: mission.contact_avatar,
      deadline: mission.deadline,
      tags: mission.tags || [],
      requiredFiles: mission.required_files || [],
      attachments: mission.attachments,
      submissions: mission.submissions_count || 0,
      winnerId: mission.winner_id,
      createdAt: mission.created_at,
      updatedAt: mission.updated_at,
    }

    return NextResponse.json({ 
      message: 'Mission created successfully',
      mission: formattedMission 
    }, { status: 201 })
  } catch (error) {
    console.error('Create mission error:', error)
    return NextResponse.json(
      { error: 'Failed to create mission' },
      { status: 500 }
    )
  }
}
