'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function createNote(formData: FormData) {
  const supabase = await createClient()

  // 1. Enforce Server-Side Authentication
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to create a note.' }
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title.trim()) {
    return { error: 'Title is required.' }
  }

  // 2. Safe insertion tied strictly to the verified user's ID
  const { error } = await supabase.from('notes').insert([
    {
      title,
      content,
      user_id: user.id, // guaranteed to be a valid UUID string now
    },
  ])

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/notes')
}
