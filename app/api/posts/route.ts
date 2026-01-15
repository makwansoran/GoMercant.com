import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch all posts
export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20')
    const offset = parseInt(request.nextUrl.searchParams.get('offset') || '0')
    const authorId = request.nextUrl.searchParams.get('authorId')

    if (!supabase) {
      return NextResponse.json({ posts: [] }, { status: 200 })
    }

    let query = supabase
      .from('posts')
      .select(`
        *,
        author:users(id, name, email, avatar)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (authorId) {
      query = query.eq('author_id', authorId)
    }

    const { data: posts, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ posts: [] }, { status: 200 })
    }

    // Map to camelCase for frontend
    const formattedPosts = (posts || []).map(p => ({
      id: p.id,
      content: p.content,
      images: p.images ? JSON.parse(p.images) : [],
      likes: p.likes || 0,
      reposts: p.reposts || 0,
      views: p.views || 0,
      authorId: p.author_id,
      author: p.author ? {
        id: p.author.id,
        name: p.author.name,
        email: p.author.email,
        avatar: p.author.avatar,
      } : null,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
    }))

    return NextResponse.json({ posts: formattedPosts }, { status: 200 })
  } catch (error) {
    console.error('Get posts error:', error)
    return NextResponse.json({ posts: [] }, { status: 200 })
  }
}

// POST - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content, images, authorId } = body

    // Validate required fields
    if (!content || !authorId) {
      return NextResponse.json(
        { error: 'Content and authorId are required' },
        { status: 400 }
      )
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: 'Post content cannot exceed 500 characters' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not available' },
        { status: 500 }
      )
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        content,
        images: images && images.length > 0 ? JSON.stringify(images) : null,
        author_id: authorId,
        likes: 0,
        reposts: 0,
        views: 0,
      })
      .select(`
        *,
        author:users(id, name, email, avatar)
      `)
      .single()

    if (error) {
      console.error('Supabase error creating post:', error)
      return NextResponse.json(
        { error: `Failed to create post: ${error.message}` },
        { status: 500 }
      )
    }

    // Map to camelCase
    const formattedPost = {
      id: post.id,
      content: post.content,
      images: post.images ? JSON.parse(post.images) : [],
      likes: post.likes || 0,
      reposts: post.reposts || 0,
      views: post.views || 0,
      authorId: post.author_id,
      author: post.author ? {
        id: post.author.id,
        name: post.author.name,
        email: post.author.email,
        avatar: post.author.avatar,
      } : null,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
    }

    return NextResponse.json({ 
      message: 'Post created successfully',
      post: formattedPost 
    }, { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
