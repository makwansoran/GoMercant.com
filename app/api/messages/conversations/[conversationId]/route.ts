import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Get messages in a conversation
export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const conversationId = params.conversationId
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Verify user is part of the conversation
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

    if (conversation.user1_id !== userId && conversation.user2_id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Get messages
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (msgError) {
      console.error('Supabase error:', msgError)
      return NextResponse.json(
        { error: 'Failed to get messages' },
        { status: 500 }
      )
    }

    // Get sender details for each message
    const messagesWithSender = await Promise.all(
      (messages || []).map(async (msg) => {
        const { data: sender } = await supabase
          .from('users')
          .select('id, name, avatar')
          .eq('id', msg.sender_id)
          .single()

        return {
          id: msg.id,
          content: msg.content,
          senderId: msg.sender_id,
          createdAt: msg.created_at,
          read: msg.read,
          sender: sender ? {
            id: sender.id,
            name: sender.name,
            avatar: sender.avatar,
          } : null
        }
      })
    )

    // Mark messages as read
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('conversation_id', conversationId)
      .eq('recipient_id', userId)
      .eq('read', false)

    return NextResponse.json({ messages: messagesWithSender }, { status: 200 })
  } catch (error) {
    console.error('Get messages error:', error)
    return NextResponse.json(
      { error: 'Failed to get messages' },
      { status: 500 }
    )
  }
}
