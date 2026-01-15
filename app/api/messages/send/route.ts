import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversationId, senderId, recipientId, content } = body

    if (!conversationId || !senderId || !recipientId || !content) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Verify conversation exists and user is part of it
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single()

    if (convError || !conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    if (conversation.user1_id !== senderId && conversation.user2_id !== senderId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Create message
    const { data: message, error: msgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        recipient_id: recipientId,
        content,
      })
      .select()
      .single()

    if (msgError) {
      console.error('Supabase error:', msgError)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    // Get sender details
    const { data: sender } = await supabase
      .from('users')
      .select('id, name, avatar')
      .eq('id', senderId)
      .single()

    // Update conversation updatedAt
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId)

    return NextResponse.json({
      message: {
        id: message.id,
        content: message.content,
        senderId: message.sender_id,
        createdAt: message.created_at,
        read: message.read,
        sender: sender ? {
          id: sender.id,
          name: sender.name,
          avatar: sender.avatar,
        } : null
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Send message error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
