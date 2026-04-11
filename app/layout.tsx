import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Doctor Online Appointment System',
  description: 'Book doctor appointments easily online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          
      
          <div className="logo">
             APPOLO CARE
          </div>

          {/* 🔗 Navigation Links */}
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/doctors">Doctors</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/history">History</Link>
          </div>

        </nav>

        <main className="container">{children}</main>
      </body>
    </html>
  )
}