'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { User, Shield, Eye, EyeOff } from 'lucide-react'

export default function Register() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'client' | 'admin'>('client')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()
    const trimmedConfirmPassword = confirmPassword.trim()

    if (trimmedPassword !== trimmedConfirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    setLoading(true)

    try {
      // Check if user already exists in appropriate collection
      let checkRes, checkData
      
      if (role === 'admin') {
        checkRes = await fetch(`http://localhost:5000/admins?email=${trimmedEmail}`)
      } else {
        checkRes = await fetch(`http://localhost:5000/users?email=${trimmedEmail}`)
      }
      
      checkData = await checkRes.json()

      if (checkData.length > 0) {
        setError(`${role === 'admin' ? 'Admin' : 'User'} already exists! Please login.`)
        setLoading(false)
        return
      }

      const newUser = {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
        role: role,
        createdAt: new Date().toISOString()
      }

      // Store in appropriate collection
      let res
      if (role === 'admin') {
        res = await fetch("http://localhost:5000/admins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
      } else {
        res = await fetch("http://localhost:5000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
      }

      if (!res.ok) {
        setError("Registration failed! Please try again.")
        setLoading(false)
        return
      }

      alert(`${role === 'admin' ? 'Admin' : 'Patient'} registration successful! Now login.`)
      router.push('/login')

    } catch (error) {
      setError("Error registering user. Please start JSON server.")
    }

    setLoading(false)
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join our healthcare platform</p>
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
              <small>Book appointments and manage health</small>
            </button>
            <button
              className={`role-option ${role === 'admin' ? 'active' : ''}`}
              onClick={() => setRole('admin')}
            >
              <Shield size={24} />
              <span>Administrator</span>
              <small>Manage platform and appointments</small>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (min 6 characters)"
                minLength={6}
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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                minLength={6}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : `Create ${role === 'admin' ? 'Admin' : 'Patient'} Account`}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="login-link">
              Login here
            </Link>
          </p>
          {role === 'admin' && (
            <p className="admin-note">
              Admin accounts have full control over the platform
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .register-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .register-container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 3rem;
          width: 100%;
          max-width: 520px;
        }

        .register-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .register-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--neutral-800);
          margin-bottom: 0.5rem;
        }

        .register-header p {
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

        .role-option.active small {
          color: rgba(255, 255, 255, 0.9);
        }

        .role-option svg {
          color: var(--primary-blue);
        }

        .role-option span {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .role-option small {
          font-size: 0.75rem;
          color: var(--neutral-500);
          text-align: center;
          line-height: 1.3;
        }

        .register-form {
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

        .register-btn {
          padding: 1rem;
          background: var(--primary-green);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .register-btn:hover:not(:disabled) {
          background: var(--primary-green-dark);
          transform: translateY(-2px);
        }

        .register-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-footer {
          text-align: center;
          margin-top: 2rem;
        }

        .register-footer p {
          color: var(--neutral-600);
          font-size: 0.9rem;
        }

        .register-footer a {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 600;
        }

        .register-footer a:hover {
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
          .register-container {
            padding: 2rem 1.5rem;
          }

          .register-header h1 {
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