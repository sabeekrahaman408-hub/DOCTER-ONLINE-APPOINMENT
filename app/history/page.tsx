'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: number
  doctor: string
  specialization?: string
  date: string
  time: string
  patientName: string
  age: string
  contact: string
  problem: string
  email: string
  consultationFee?: number
  paymentMethod?: string
  paymentStatus?: string
}

export default function History() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null")

      if (!user) {
        alert("Please login first!")
        router.push("/login")
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${user.email}`)

        if (!res.ok) {
          setAppointments([])
          setLoading(false)
          return
        }

        const data = await res.json()
        setAppointments(data)
        setLoading(false)
      } catch {
        setAppointments([])
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [router])

  const filtered = appointments.filter((app) =>
    app.doctor.toLowerCase().includes(search.toLowerCase()) ||
    app.patientName.toLowerCase().includes(search.toLowerCase())
  )

  const deleteAppointment = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${id}`, {
        method: "DELETE",
      })

      const updated = appointments.filter((app) => app.id !== id)
      setAppointments(updated)
    } catch {
      alert("Unable to delete appointment! Please start JSON server.")
    }
  }

  const clearAll = async () => {
    try {
      for (let app of appointments) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments/${app.id}`, {
          method: "DELETE",
        })
      }

      setAppointments([])
    } catch {
      alert("Unable to clear history! Please start JSON server.")
    }
  }

  return (
    <div className="history-container">

      <h1 className="history-title">Appointment History</h1>

      <div className="history-search">
        <input
          type="text"
          placeholder="Search by doctor or patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="no-data">Loading appointments...</p>
      ) : appointments.length > 0 && (
        <div className="history-actions">
          <button className="clear-btn" onClick={clearAll}>
            Clear All History
          </button>
        </div>
      )}

      {!loading && filtered.length === 0 ? (
        <p className="no-data">No appointments found.</p>
      ) : (
        <div className="history-grid">
          {filtered.map((app) => (
            <div key={app.id} className="history-card">

              <div className="history-row">
                <span>👨‍⚕️ Doctor:</span> {app.doctor}
              </div>

              <div className="history-row">
                <span>🏥 Specialization:</span> {app.specialization || "N/A"}
              </div>

              <div className="history-row">
                <span>📅 Date:</span> {app.date}
              </div>

              <div className="history-row">
                <span>⏰ Time:</span> {app.time}
              </div>

              <div className="history-row">
                <span>👤 Patient:</span> {app.patientName}
              </div>

              <div className="history-row">
                <span>🎂 Age:</span> {app.age}
              </div>

              <div className="history-row">
                <span>📞 Contact:</span> {app.contact}
              </div>

              <div className="history-row">
                <span>🩺 Problem:</span> {app.problem}
              </div>

              <div className="history-row">
                <span>💰 Fee:</span> ₹{app.consultationFee || 0}
              </div>

              <div className="history-row">
                <span>💳 Payment:</span> {app.paymentMethod || "N/A"}
              </div>

              <div className="history-row">
                <span>✅ Status:</span> {app.paymentStatus || "Pending"}
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteAppointment(app.id)}
              >
                Delete
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}