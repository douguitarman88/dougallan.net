'use server'

//import { useState } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  // Simple server-side validation match
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters long.' }
  }

  // Supabase automatically creates the user and hashes the password securely
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
    data: {
      first_name: firstName,
      last_name: lastName
    }
  }
  })

  if (error) {
    return { error: error.message }
  }

  // Redirect to dashboard on successful account creation
  redirect('/budget')
}
