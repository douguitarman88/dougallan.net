'use client'

import { useTransition, useState } from 'react'
import { signUp } from './actions'
import Link from 'next/link'

export function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result = await signUp(formData)
      if (result?.error) {
        setError(result.error)
      }
    })
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Create an Account</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '0.5rem' }}>Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        {error && (
          <p style={{ color: 'red', fontSize: '0.875rem', margin: 0 }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: '0.75rem',
            backgroundColor: isPending ? '#ccc' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer'
          }}
        >
          {isPending ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', textAlign: 'center' }}>
        Already have an account? <Link href="/login" style={{ color: '#0070f3' }}>Sign In</Link>
      </p>
    </div>
  )
}
