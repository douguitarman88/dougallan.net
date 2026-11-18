'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // Return the error directly to the client state if it fails
  if (error) {
    return { error: error.message }
  }

  // Redirects should only be triggered if the login is successful
  redirect('/budget')
}

export async function signOut() {
  const supabase = await createClient()

  // This destroys the session on Supabase and clears the cookie headers
  await supabase.auth.signOut()

  // Send the user back to the login page
  redirect('/login')
}
