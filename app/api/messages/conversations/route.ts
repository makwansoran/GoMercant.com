import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Get all conversations for the current user
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Get conversations where user is either user1 or user2
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('*')
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to get conversations' },
        { status: 500 }
      )
    }

    // Get user details and last message for each conversation
    const formattedConversations = await Promise.all(
      (conversations || []).map(async (conv) => {
        const otherUserId = conv.user1_id === userId ? conv.user2_id : conv.user1_id

        // Get other user details
        const { data: otherUser } = await supabase
          .from('users')
          .select('id, name, email, avatar')
          .eq('id', otherUserId)
          .single()

        // Get last message
        const { data: lastMessages } = await supabase
          .from('messages')
          .select('content, created_at, read, sender_id')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)

        const lastMessage = lastMessages?.[0] || null

        return {
          id: conv.id,
          otherUser: otherUser ? {
            id: otherUser.id,
            name: otherUser.name,
            email: otherUser.email,
            avatar: otherUser.avatar,
          } : null,
          lastMessage: lastMessage ? {
            content: lastMessage.content,
            createdAt: lastMessage.created_at,
            read: lastMessage.read,
            isFromMe: lastMessage.sender_id === userId,
          } : null,
          updatedAt: conv.updated_at,
        }
      })
    )

    // Filter out conversations where otherUser is null
    const validConversations = formattedConversations.filter(c => c.otherUser !== null)

    return NextResponse.json({ conversations: validConversations }, { status: 200 })
  } catch (error) {
    console.error('Get conversations error:', error)
    return NextResponse.json(
      { error: 'Failed to get conversations' },
      { status: 500 }
    )
  }
}

// Create a new conversation or get existing one
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, otherUserId } = body

    if (!userId || !otherUserId) {
      return NextResponse.json(
        { error: 'User ID and other user ID are required' },
        { status: 400 }
      )
    }

    if (userId === otherUserId) {
      return NextResponse.json(
        { error: 'Cannot create conversation with yourself' },
        { status: 400 }
      )
    }

    // Check if conversation already exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .or(`and(user1_id.eq.${userId},user2_id.eq.${otherUserId}),and(user1_id.eq.${otherUserId},user2_id.eq.${userId})`)
      .single()

    if (existing) {
      // Get other user details
      const { data: otherUser } = await supabase
        .from('users')
        .select('id, name, email, avatar')
        .eq('id', otherUserId)
        .single()

      return NextResponse.json({
        conversation: {
          id: existing.id,
          otherUser: otherUser ? {
            id: otherUser.id,
            name: otherUser.name,
            email: otherUser.email,
            avatar: otherUser.avatar,
          } : null
        }
      }, { status: 200 })
    }

    // Create new conversation
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        user1_id: userId,
        user2_id: otherUserId,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: 500 }
      )
    }

    // Get other user details
    const { data: otherUser } = await supabase
      .from('users')
      .select('id, name, email, avatar')
      .eq('id', otherUserId)
      .single()

    return NextResponse.json({
      conversation: {
        id: conversation.id,
        otherUser: otherUser ? {
          id: otherUser.id,
          name: otherUser.name,
          email: otherUser.email,
          avatar: otherUser.avatar,
        } : null
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Create conversation error:', error)
    return NextResponse.json(
      { error: 'Failed to create conversation' },
      { status: 500 }
    )
  }
}
