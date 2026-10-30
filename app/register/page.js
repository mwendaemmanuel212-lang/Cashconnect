'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      setMessage('Registration successful! Check your email to confirm your account.')
    } catch (error) {
      setMessage(error.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: '60px auto', padding: 20 }}>
      <h1>Create Cash Connect Account</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 12, marginBottom: 15 }}
        />

        <input
          type="password"
          placeholder="Password (minimum 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          style={{ width: '100%', padding: 12, marginBottom: 15 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 14 }}
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  )
  }
