
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        router.replace('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    })
  }, [router])

  async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading || !user) {
    return <main style={{ padding: 40 }}>Loading Cash Connect...</main>
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: '#f3f6fa',
      padding: 20,
      fontFamily: 'Arial, sans-serif',
      color: '#172033'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <h2 style={{ color: '#087c55' }}>Cash Connect</h2>
        <button onClick={logout}>Logout</button>
      </header>

      <section style={{ marginTop: 30 }}>
        <h1>Welcome back!</h1>
        <p>{user.email}</p>
      </section>

      <section style={{
        background: '#087c55',
        color: 'white',
        padding: 25,
        borderRadius: 16,
        marginTop: 25
      }}>
        <p>Available Balance</p>
        <h1>KES —</h1>
        <small>Your verified wallet balance will appear here.</small>
      </section>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 15,
        marginTop: 25
      }}>
        <div style={card}>
          <h3>Deposit</h3>
          <p>Add money to your wallet</p>
        </div>

        <div style={card}>
          <h3>Withdraw</h3>
          <p>Withdraw your funds</p>
        </div>

        <div style={card}>
          <h3>Send Money</h3>
          <p>Transfer funds securely</p>
        </div>
      </section>

      <section style={{ marginTop: 30 }}>
        <h2>Payment Methods</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 15
        }}>
          <div style={card}>
            <h3>M-Pesa</h3>
            <p>Safaricom</p>
          </div>

          <div style={card}>
            <h3>Airtel Money</h3>
            <p>Airtel</p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 30, ...card }}>
        <h2>Recent Transactions</h2>
        <p>No transactions yet.</p>
      </section>

      <footer style={{ marginTop: 35, textAlign: 'center' }}>
        <p>Cash Connect © 2026</p>
      </footer>
    </main>
  )
}

const card = {
  background: 'white',
  padding: 20,
  borderRadius: 14,
  boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
    }
    
