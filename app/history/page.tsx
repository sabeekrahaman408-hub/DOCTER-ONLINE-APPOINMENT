'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Appointment = {
  id: number
  doctor: string
  date: string
  time: string
  patientName: string
  age: string
  contact: string
  problem: string
  email: string
}

export default function History() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [search, setSearch] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchAppointments = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "null")

      if (!user) {
        alert("Please login first!")
        router.push("/login")
        return
      }

      const res = await fetch(`http://localhost:5000/appointments?email=${user.email}`)
      const data = await res.json()
      setAppointments(data)
    }

    fetchAppointments()
  }, [router])

  const filtered = appointments.filter((app) =>
    app.doctor.toLowerCase().includes(search.toLowerCase()) ||
    app.patientName.toLowerCase().includes(search.toLowerCase())
  )

  const deleteAppointment = async (id: number) => {
    await fetch(`http://localhost:5000/appointments/${id}`, {
      method: "DELETE",
    })

    const updated = appointments.filter((app) => app.id !== id)
    setAppointments(updated)
  }

  const clearAll = async () => {
    for (let app of appointments) {
      await fetch(`http://localhost:5000/appointments/${app.id}`, {
        method: "DELETE",
      })
    }

    setAppointments([])
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

      {appointments.length > 0 && (
        <div className="history-actions">
          <button className="clear-btn" onClick={clearAll}>
            Clear All History
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="no-data">No appointments found.</p>
      ) : (
        <div className="history-grid">
          {filtered.map((app) => (
            <div key={app.id} className="history-card">

              <div className="history-row">
                <span>👨‍⚕️ Doctor:</span> {app.doctor}
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