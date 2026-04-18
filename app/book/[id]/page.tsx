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

  // ✅ Card Payment Fields
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvv, setCvv] = useState("")

  // ✅ UPI Payment Fields
  const [upiId, setUpiId] = useState("")
  const [upiTransactionId, setUpiTransactionId] = useState("")
  const [upiPaid, setUpiPaid] = useState(false)

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

    // ✅ Validate Card Payment
    if (paymentMethod === "Card") {
      if (!cardNumber || !cardName || !expiry || !cvv) {
        alert("Please fill all Debit/Credit Card details!")
        return
      }

      if (cardNumber.length < 12) {
        alert("Please enter valid card number!")
        return
      }

      if (cvv.length !== 3) {
        alert("CVV must be 3 digits!")
        return
      }
    }

    // ✅ Validate UPI Payment
    if (paymentMethod === "UPI") {
      if (!upiId) {
        alert("Please enter UPI ID!")
        return
      }

      if (!upiId.includes("@")) {
        alert("Invalid UPI ID! Example: name@upi")
        return
      }

      if (!upiTransactionId) {
        alert("Please enter Transaction ID!")
        return
      }

      if (!upiPaid) {
        alert("Please complete UPI payment by clicking Pay Now!")
        return
      }
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
      paymentStatus: paymentMethod === "Cash" ? "Pending" : "Paid",
      status: "pending", // New field for admin approval
      createdAt: new Date().toISOString(),
      requestedBy: user.email,
      type: "in-person", // Default type

      // Payment Details (Demo)
      paymentDetails:
        paymentMethod === "Card"
          ? {
              cardNumber,
              cardName,
              expiry,
            }
          : paymentMethod === "UPI"
          ? {
              upiId,
              transactionId: upiTransactionId,
            }
          : null,
    }

    try {
      const todayDate = new Date().toISOString().split("T")[0]

      const res = await fetch("http://localhost:5000/appointments")
      const allAppointments = await res.json()

      // Slot check
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

      // Delete old appointments
      const oldAppointments = allAppointments.filter(
        (a: any) =>
          a.email === user.email &&
          a.doctor === doctor.name &&
          a.date < todayDate
      )

      for (let old of oldAppointments) {
        await fetch(`http://localhost:5000/appointments/${old.id}`, {
          method: "DELETE",
        })
      }

      // Add new appointment
      await fetch("http://localhost:5000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      })

      setMessage(
        `Appointment request sent to ${doctor.name} for ${date} at ${time} | ${paymentMethod === "Cash" ? "Payment pending" : "Payment successful"} | Awaiting admin approval`
      )

      // Reset
      setDate('')
      setTime('')
      setPatientName('')
      setAge('')
      setContact('')
      setProblem('')
      setPaymentMethod('')
      setPaymentStatus('Pending')

      // Clear Card
      setCardNumber("")
      setCardName("")
      setExpiry("")
      setCvv("")

      // Clear UPI
      setUpiId("")
      setUpiTransactionId("")
      setUpiPaid(false)

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

              {/* ✅ Card Form */}
              {paymentMethod === "Card" && (
                <div style={{ marginTop: "10px" }}>
                  <h4>Enter Debit/Credit Card Details</h4>

                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              )}

              {/* ✅ UPI Form */}
              {paymentMethod === "UPI" && (
                <div style={{ marginTop: "10px" }}>
                  <h4>UPI Payment</h4>

                  <input
                    type="text"
                    placeholder="Enter UPI ID (example@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />

                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <p style={{ fontWeight: "bold" }}>Scan QR to Pay</p>

                    {/* 🔥 Add QR Image in public folder */}
                    <img
                      src="/upi-qr.png"
                      alt="UPI QR"
                      style={{
                        width: "180px",
                        height: "180px",
                        border: "1px solid gray",
                        borderRadius: "10px",
                      }}
                    />

                    <p style={{ fontSize: "13px", marginTop: "8px" }}>
                      Amount: ₹{consultationFee}
                    </p>
                  </div>

                  <input
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={upiTransactionId}
                    onChange={(e) => setUpiTransactionId(e.target.value)}
                    style={{ marginTop: "10px" }}
                  />

                  <button
                    type="button"
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      padding: "10px",
                      background: "green",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "6px",
                    }}
                    onClick={() => {
                      if (!upiId || !upiId.includes("@")) {
                        alert("Enter valid UPI ID!")
                        return
                      }

                      if (!upiTransactionId) {
                        alert("Enter Transaction ID!")
                        return
                      }

                      alert("UPI Payment Successful!")
                      setUpiPaid(true)
                    }}
                  >
                    Pay Now
                  </button>

                  {upiPaid && (
                    <p style={{ color: "green", fontWeight: "bold", marginTop: "8px" }}>
                      Payment Verified Successfully ✅
                    </p>
                  )}
                </div>
              )}
            </>
          )}

          <button onClick={handleBook}>Confirm Booking & Pay</button>
        </div>

        {message && <p className="success-message">{message}</p>}
      </div>
    </div>
  )
}