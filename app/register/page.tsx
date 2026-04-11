'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Register() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    const trimmedConfirmPassword = confirmPassword.trim()

    if (trimmedPassword !== trimmedConfirmPassword) {
      alert("Passwords don't match")
      return
    }

    setLoading(true)

    try {
      // Check if user already exists
      const checkRes = await fetch(
        `http://localhost:5000/users?email=${trimmedEmail}`
      )
      const checkData = await checkRes.json()

      if (checkData.length > 0) {
        alert("User already exists! Please login.")
        router.push('/login')
        setLoading(false)
        return
      }

      const newUser = {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      }

      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      })

      if (!res.ok) {
        alert("Registration failed!")
        setLoading(false)
        return
      }

      alert("Registration successful! Now login.")
      router.push('/login')

    } catch (error) {
      alert("Error registering user. Please start JSON server.")
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1 className="auth-title">Register</h1>

        <form onSubmit={handleSubmit} className="auth-form">

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link href="/login" className="login-link">
            Login here
          </Link>
        </p>

      </div>
    </div>
  )
}