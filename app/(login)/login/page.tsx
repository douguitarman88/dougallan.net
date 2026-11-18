import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LoginForm } from './login-form'

export default async function LoginPage() {
  const supabase = await createClient()
  
  // Guard clause: If the user is already authenticated, don't show the login form
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/budget')
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoginForm />
    </main>
  )
}
