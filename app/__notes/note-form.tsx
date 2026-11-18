'use client'

import { useTransition, useState, useRef } from 'react'
import { createNote } from './actions'

export function NoteForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await createNote(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        // Reset the inputs on a successful submission
        formRef.current?.reset()
      }
    })
  }

  return (
    <div style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fff', marginBottom: '2.5rem' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Add a New Public Note</h3>
      
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Note Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="e.g., Shopping List"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1' }}
          />
        </div>

        <div>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>Content</label>
          <textarea
            id="content"
            name="content"
            rows={3}
            placeholder="Write details here..."
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #cbd5e1', resize: 'vertical' }}
          />
        </div>

        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '0.6rem 1rem',
            backgroundColor: isPending ? '#cbd5e1' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            alignSelf: 'flex-start'
          }}
        >
          {isPending ? 'Saving...' : 'Add Note'}
        </button>
      </form>
    </div>
  )
}
