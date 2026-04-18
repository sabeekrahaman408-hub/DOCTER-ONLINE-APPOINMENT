'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { User, Shield, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'client' | 'admin'>('client')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    try {
      // Try to find user in the appropriate collection based on role
      let res, data
      
      if (role === 'admin') {
        res = await fetch(`http://localhost:5000/admins?email=${trimmedEmail}`)
      } else {
        res = await fetch(`http://localhost:5000/users?email=${trimmedEmail}`)
      }

      data = await res.json()

      if (data.length === 0) {
        setError(`${role === 'admin' ? 'Admin' : 'User'} not found`)
        setLoading(false)
        return
      }

      const user = data[0]

      if (user.password !== trimmedPassword) {
        setError("Invalid password")
        setLoading(false)
        return
      }

      // Add role to user object for routing
      const userData = { ...user, role }
      localStorage.setItem("user", JSON.stringify(userData))

      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }

    } catch {
      setError("Server not running! Start JSON Server.")
    }

    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your healthcare account</p>
        </div>

        <div className="role-selector">
          <h3>Select Your Role</h3>
          <div className="role-options">
            <button
              className={`role-option ${role === 'client' ? 'active' : ''}`}
              onClick={() => setRole('client')}
            >
              <User size={24} />
              <span>Patient</span>
            </button>
            <button
              className={`role-option ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              <Shield size={24} />
              <span>Administrator</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : `Sign in as ${role === 'admin' ? 'Administrator' : 'Patient'}`}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <Link href="/register">Register here</Link>
          </p>
          {role === 'admin' && (
            <p className="admin-note">
              Note: Default admin credentials can be created during registration
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-green) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          width: 100%;
          max-width: 480px;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--neutral-800);
          margin-bottom: 0.5rem;
        }

        .login-header p {
          color: var(--neutral-600);
          font-size: 1.1rem;
        }

        .role-selector {
          margin-bottom: 2rem;
        }

        .role-selector h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--neutral-700);
          margin-bottom: 1rem;
          text-align: center;
        }

        .role-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .role-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.5rem 1rem;
          border: 2px solid var(--neutral-200);
          border-radius: 12px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .role-option:hover {
          border-color: var(--primary-blue);
          background: var(--neutral-50);
        }

        .role-option.active {
          border-color: var(--primary-blue);
          background: var(--primary-blue);
          color: white;
        }

        .role-option.active svg {
          color: white;
        }

        .role-option svg {
          color: var(--primary-blue);
        }

        .role-option span {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: var(--neutral-700);
          font-size: 0.9rem;
        }

        .form-group input {
          padding: 1rem;
          border: 1px solid var(--neutral-300);
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .password-input {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--neutral-400);
          cursor: pointer;
          padding: 0.25rem;
        }

        .password-toggle:hover {
          color: var(--primary-blue);
        }

        .error-message {
          padding: 0.75rem 1rem;
          background: var(--error);
          color: white;
          border-radius: 8px;
          font-size: 0.9rem;
          text-align: center;
        }

        .login-btn {
          padding: 1rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn:hover:not(:disabled) {
          background: var(--primary-blue-dark);
          transform: translateY(-2px);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          text-align: center;
          margin-top: 2rem;
        }

        .login-footer p {
          color: var(--neutral-600);
          font-size: 0.9rem;
        }

        .login-footer a {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 600;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        .admin-note {
          background: var(--warning);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.85rem;
          margin-top: 1rem;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 2rem 1.5rem;
          }

          .login-header h1 {
            font-size: 2rem;
          }

          .role-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}