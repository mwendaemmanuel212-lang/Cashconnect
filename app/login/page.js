'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      setMessage('Login successful! Welcome to Cash Connect.')
    } catch (error) {
      setMessage(error.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: '60px auto', padding: 20 }}>
      <h1>Cash Connect Login</h1>

      <form onSubmit={handleLogin}>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 12, marginBottom: 15 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 14 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </main>
  )
            }
