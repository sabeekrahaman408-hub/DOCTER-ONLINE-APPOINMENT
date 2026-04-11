import Link from 'next/link'

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title"><br></br>
        Welcome to Online Doctor Appointment System
      </h1>
      <p className="home-text">
        Book your doctor appointment easily online.
      </p>
      <Link href="/doctors">
        <button className="home-btn">View Doctors</button>
      </Link>

    </div>
  )
}