import { createClient } from '@/utils/supabase/server'
import { signOut } from '@/app/(login)/login/actions' //'@/app/login/actions'
import { NoteForm } from './note-form'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Anyone can read notes
  const { data: notes } = await supabase
    .from('notes')
    .select('id, title, content, created_at')
    .order('created_at', { ascending: false })

  return (
    <main style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
        <div>
          <h1>Public Board</h1>
          {user ? <p>Logged in: <strong>{user.email}</strong></p> : <p style={{ color: '#666' }}>Guest Visitor</p>}
        </div>
        {user ? (
          <form action={signOut}>
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Log Out</button>
          </form>
        ) : (
          <Link href="/login" style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
            Sign In to Post
          </Link>
        )}
      </header>

      {/* Conditional Rendering: Only logged-in users see the form box */}
      {user ? (
        <NoteForm />
      ) : (
        <div style={{ padding: '1.5rem', border: '1px dashed #cbd5e1', borderRadius: '8px', textAlign: 'center', marginBottom: '2.5rem', backgroundColor: '#f8fafc' }}>
          <p style={{ margin: 0, color: '#64748b' }}>
            Want to post a note? <Link href="/login" style={{ color: '#3b82f6', fontWeight: 'bold' }}>Sign in here</Link>.
          </p>
        </div>
      )}

      <h2>Recent Notes</h2>
      {/* Existing grid mapper logic stays the same */}
      {notes?.map((note) => (
         <article key={note.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '6px', backgroundColor: '#f8fafc', marginBottom: '1rem' }}>
           <h3>{note.title}</h3>
           <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
         </article>
      ))}
    </main>
  )
}
