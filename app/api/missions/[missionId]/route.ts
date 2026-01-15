import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch single mission by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { missionId: string } }
) {
  try {
    const missionId = params.missionId

    const { data: mission, error } = await supabase
      .from('missions')
      .select('*')
      .eq('id', missionId)
      .single()

    if (error || !mission) {
      return NextResponse.json(
        { error: 'Mission not found' },
        { status: 404 }
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
      deadline: mission.deadline,
      tags: mission.tags || [],
      requiredFiles: mission.required_files || [],
      contactName: mission.contact_name,
      contactEmail: mission.contact_email,
      submissions: mission.submissions_count || 0,
      winnerId: mission.winner_id,
      createdAt: mission.created_at,
      updatedAt: mission.updated_at,
    }

    return NextResponse.json({ mission: formattedMission }, { status: 200 })
  } catch (error) {
    console.error('Get mission error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch mission' },
      { status: 500 }
    )
  }
}

// PUT - Update mission
export async function PUT(
  request: NextRequest,
  { params }: { params: { missionId: string } }
) {
  try {
    const missionId = params.missionId
    const body = await request.json()

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.fullDescription !== undefined) updateData.full_description = body.fullDescription
    if (body.bounty !== undefined) updateData.bounty = parseFloat(body.bounty)
    if (body.deliverableType !== undefined) updateData.deliverable_type = body.deliverableType
    if (body.deadline !== undefined) updateData.deadline = body.deadline
    if (body.tags !== undefined) updateData.tags = body.tags
    if (body.requiredFiles !== undefined) updateData.required_files = body.requiredFiles
    if (body.contactName !== undefined) updateData.contact_name = body.contactName
    if (body.contactEmail !== undefined) updateData.contact_email = body.contactEmail
    if (body.status !== undefined) updateData.status = body.status
    if (body.winnerId !== undefined) updateData.winner_id = body.winnerId

    const { data: mission, error } = await supabase
      .from('missions')
      .update(updateData)
      .eq('id', missionId)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to update mission' },
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
      deadline: mission.deadline,
      tags: mission.tags || [],
      requiredFiles: mission.required_files || [],
      contactName: mission.contact_name,
      contactEmail: mission.contact_email,
      submissions: mission.submissions_count || 0,
      winnerId: mission.winner_id,
      createdAt: mission.created_at,
      updatedAt: mission.updated_at,
    }

    return NextResponse.json({ 
      message: 'Mission updated successfully',
      mission: formattedMission 
    }, { status: 200 })
  } catch (error) {
    console.error('Update mission error:', error)
    return NextResponse.json(
      { error: 'Failed to update mission' },
      { status: 500 }
    )
  }
}

// DELETE - Delete mission
export async function DELETE(
  request: NextRequest,
  { params }: { params: { missionId: string } }
) {
  try {
    const missionId = params.missionId

    const { error } = await supabase
      .from('missions')
      .delete()
      .eq('id', missionId)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to delete mission' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Mission deleted successfully' 
    }, { status: 200 })
  } catch (error) {
    console.error('Delete mission error:', error)
    return NextResponse.json(
      { error: 'Failed to delete mission' },
      { status: 500 }
    )
  }
}
