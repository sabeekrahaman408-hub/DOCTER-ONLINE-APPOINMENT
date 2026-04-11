'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Doctor = {
  id: string
  name: string
  specialization: string
  availableDates: string[]
  image: string
}

const doctors: Doctor[] = [
  { id: "1", name: "Dr CHANDRU", specialization: "Cardiologist", availableDates: ["ALL"], image: "/img1.jpg" },
  { id: "2", name: "Dr GAUTAM", specialization: "Dermatologist", availableDates: ["ALL"], image: "/img2.jpg" },
  { id: "3", name: "Dr INYAN", specialization: "Neurologist", availableDates: ["ALL"], image: "/img3.jpg" },
  { id: "4", name: "Dr GOKUL", specialization: "Pediatrician", availableDates: ["ALL"], image: "/img13.jpg" },
  { id: "5", name: "Dr SABEEK", specialization: "Orthopedic", availableDates: ["ALL"], image: "/img12.jpg" },
  { id: "6", name: "Dr RAMESH", specialization: "ENT Specialist", availableDates: ["ALL"], image: "/img22.jpg" },
  { id: "7", name: "Dr PRIYA", specialization: "Gynecologist", availableDates: ["ALL"], image: "/img23.jpg" },
  { id: "8", name: "Dr ARJUN", specialization: "Psychiatrist", availableDates: ["ALL"], image: "/img24.jpg" },
  { id: "9", name: "Dr KAVIN", specialization: "Dentist", availableDates: ["ALL"], image: "/img26.jpg" },
  { id: "10", name: "Dr SOPHIE", specialization: "General Physician", availableDates: ["ALL"], image: "/img27.jpg" },
]

export default function Book() {
  const params = useParams()
  const router = useRouter()

  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [patientName, setPatientName] = useState('')
  const [age, setAge] = useState('')
  const [contact, setContact] = useState('')
  const [problem, setProblem] = useState('')
  const [message, setMessage] = useState('')

  const [paymentMethod, setPaymentMethod] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('Pending')

  const consultationFee = 500

  const timeSlots = [
    "12:00 pm - 12:15 pm",
    "12:15 pm - 12:30 pm",
    "12:30 pm - 12:45 pm",
    "12:45 pm - 01:00 pm",
    "01:00 pm - 01:15 pm",
  ]

  useEffect(() => {
    if (!params?.id) return

    const id = Array.isArray(params.id) ? params.id[0] : params.id
    const found = doctors.find((d) => d.id === id)

    setDoctor(found || null)
  }, [params])

  const handleBook = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null")

    if (!user) {
      alert("Please login to book appointment!")
      router.push("/login")
      return
    }

    if (!date || !time || !doctor) {
      alert("Please select date and time")
      return
    }

    if (!patientName || !age || !contact || !problem) {
      alert("Please fill all patient details!")
      return
    }

    if (!paymentMethod) {
      alert("Please select payment method!")
      return
    }

    setPaymentStatus("Paid")

    const newAppointment = {
      doctor: doctor.name,
      specialization: doctor.specialization,
      date,
      time,
      patientName,
      age,
      contact,
      problem,
      email: user.email,
      consultationFee,
      paymentMethod,
      paymentStatus: "Paid",
    }

    try {
      // ✅ Today's date (YYYY-MM-DD)
      const todayDate = new Date().toISOString().split("T")[0]

      // ✅ Fetch all appointments
      const res = await fetch("http://localhost:5000/appointments")
      const allAppointments = await res.json()

      // ✅ SLOT CHECK (Doctor + Date + Time)
      const slotAlreadyBooked = allAppointments.find(
        (a: any) =>
          a.doctor === doctor.name &&
          a.date === date &&
          a.time === time
      )

      if (slotAlreadyBooked) {
        alert("This time slot is already booked! Please choose another slot.")
        return
      }

      // ✅ Find all old bookings (before today) of same user + same doctor
      const oldAppointments = allAppointments.filter(
        (a: any) =>
          a.email === user.email &&
          a.doctor === doctor.name &&
          a.date < todayDate
      )

      // ✅ Delete old appointments
      for (let old of oldAppointments) {
        await fetch(`http://localhost:5000/appointments/${old.id}`, {
          method: "DELETE",
        })
      }

      // ✅ Add new appointment
      await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      })

      setMessage(
        `Appointment booked with ${doctor.name} on ${date} at ${time} | Payment Successful`
      )

      setDate('')
      setTime('')
      setPatientName('')
      setAge('')
      setContact('')
      setProblem('')
      setPaymentMethod('')
      setPaymentStatus('Pending')

    } catch {
      alert("Error booking appointment! Start JSON server.")
    }
  }

  if (!doctor) return <p>Doctor not found!</p>

  return (
    <div className="container">
      <div className="card">
        <div className="doctor-profile">
          <img src={doctor.image} alt={doctor.name} className="doctor-img" />

          <div className="doctor-info">
            <h2>{doctor.name}</h2>
            <p>{doctor.specialization}</p>
          </div>
        </div>

        <div className="booking-form">
          <input
            type="date"
            value={date}
            onChange={(e) => {
              const selectedDate = e.target.value
              const day = new Date(selectedDate).getDay()

              if (day === 0) {
                alert("Sunday is not available for booking")
                setDate('')
                return
              }

              if (doctor.availableDates.includes("ALL")) {
                setDate(selectedDate)
              } else if (doctor.availableDates.includes(selectedDate)) {
                setDate(selectedDate)
              } else {
                alert("Doctor not available on this date")
                setDate('')
              }
            }}
          />

          {date && (
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ width: "100%", height: "42px", margin: "6px 0" }}
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          )}

          {time && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <input
                type="tel"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />

              <textarea
                placeholder="Problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />

              <h3 style={{ marginTop: "15px" }}>Payment</h3>

              <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                Consultation Fee: ₹{consultationFee}
              </p>

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: "100%", height: "42px", margin: "6px 0" }}
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Debit / Credit Card</option>
              </select>
            </>
          )}

          <button onClick={handleBook}>Confirm Booking & Pay</button>
        </div>

        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  )
}
