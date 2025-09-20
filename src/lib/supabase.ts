import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grgovhcblqmwsbnmjlmi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyZ292aGNibHFtd3Nibm1qbG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzOTY2MjYsImV4cCI6MjA3Mzk3MjYyNn0.jRRWIFK4k3dvHn1XtJ7vGAVlszpGJmN77M1t6-ongFY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para TypeScript
export interface Comment {
  id: string
  post_id: string
  user_id: string
  parent_id?: string
  content: string
  likes_count: number
  created_at: string
  updated_at: string
  user_profile: {
    username: string
    full_name: string
  }
}

export interface CommentLike {
  id: string
  comment_id: string
  user_id: string
  created_at: string
}
