'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(storedUser))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>

      {user && (
        <p style={{ color: "white", textAlign: "center" }}>
          Welcome {user.name} 👋
        </p>
      )}

      <p style={{ color: "white", textAlign: "center" }}>
        You can view your appointment history or book new appointments.
      </p>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link href="/history">
          <button>View Appointment History</button>
        </Link>

        <Link href="/doctors">
          <button style={{ marginLeft: '10px' }}>Book New Appointment</button>
        </Link>

        <button
          style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}