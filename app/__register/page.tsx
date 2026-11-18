import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { RegisterForm } from './register-form'

export default async function RegisterPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/budget')
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <RegisterForm />
    </main>
  )
}
