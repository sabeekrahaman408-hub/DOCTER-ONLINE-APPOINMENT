'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    try {
      const res = await fetch(`http://localhost:5000/users?email=${trimmedEmail}`)

      const data = await res.json()

      if (data.length === 0) {
        setError("User not found")
        setLoading(false)
        return
      }

      const user = data[0]

      if (user.password !== trimmedPassword) {
        setError("Invalid password")
        setLoading(false)
        return
      }

      localStorage.setItem("user", JSON.stringify(user))
      router.push('/dashboard')

    } catch {
      setError("Server not running! Start JSON Server.")
    }

    setLoading(false)
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>

      </div>
    </div>
  )
}