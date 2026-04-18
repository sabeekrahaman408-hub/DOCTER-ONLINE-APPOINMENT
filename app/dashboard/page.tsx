'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, FileText, Heart, Activity, Bell, LogOut, ChevronRight, Phone, Mail, Star, TrendingUp, Shield } from 'lucide-react'

interface Appointment {
  id: string
  doctor: string
  date: string
  time: string
  status: 'upcoming' | 'completed' | 'cancelled'
  type: 'in-person' | 'virtual'
}

interface HealthMetric {
  label: string
  value: string
  trend: 'up' | 'down' | 'stable'
  icon: React.ElementType
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [notifications, setNotifications] = useState(3)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(storedUser))
    
    // Mock appointments data
    setAppointments([
      {
        id: '1',
        doctor: 'Dr. CHANDRU',
        date: '2024-04-20',
        time: '10:00 AM',
        status: 'upcoming',
        type: 'in-person'
      },
      {
        id: '2',
        doctor: 'Dr. PRIYA',
        date: '2024-04-15',
        time: '2:30 PM',
        status: 'completed',
        type: 'virtual'
      },
      {
        id: '3',
        doctor: 'Dr. GAUTAM',
        date: '2024-04-25',
        time: '11:30 AM',
        status: 'upcoming',
        type: 'virtual'
      }
    ])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const healthMetrics: HealthMetric[] = [
    { label: 'Last Checkup', value: '2 weeks ago', trend: 'stable', icon: Heart },
    { label: 'Appointments', value: '12 this year', trend: 'up', icon: Calendar },
    { label: 'Health Score', value: '85/100', trend: 'up', icon: Activity },
    { label: 'Prescriptions', value: '2 active', trend: 'stable', icon: Shield }
  ]

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming')
  const recentAppointments = appointments.filter(apt => apt.status === 'completed').slice(0, 2)

  return (
    <div className="dashboard-page">
      {/* Header */}
      <section className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <div className="welcome-text">
              <h1>Welcome back, {user?.name || 'Patient'}!</h1>
              <p>Your health journey continues. Here's your overview for today.</p>
            </div>
            <div className="notification-bell">
              <Bell size={24} />
              {notifications > 0 && <span className="notification-badge">{notifications}</span>}
            </div>
          </div>
          
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats-section">
        <div className="container">
          <div className="stats-grid">
            {healthMetrics.map((metric, index) => (
              <div key={index} className="stat-card">
                <metric.icon className="stat-icon" />
                <div className="stat-info">
                  <h3>{metric.value}</h3>
                  <p>{metric.label}</p>
                </div>
                <TrendingUp className={`trend-icon ${metric.trend}`} size={20} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content-section">
        <div className="container">
          <div className="content-grid">
            {/* Upcoming Appointments */}
            <div className="appointments-section">
              <div className="section-header">
                <h2>Upcoming Appointments</h2>
                <Link href="/doctors" className="view-all-link">View All</Link>
              </div>
              
              {upcomingAppointments.length > 0 ? (
                <div className="appointments-list">
                  {upcomingAppointments.map(apt => (
                    <div key={apt.id} className="appointment-card">
                      <div className="appointment-info">
                        <div className="doctor-info">
                          <div className="doctor-avatar">
                            <User size={20} />
                          </div>
                          <div>
                            <h3>{apt.doctor}</h3>
                            <p>{apt.type === 'virtual' ? 'Virtual Consultation' : 'In-Person Visit'}</p>
                          </div>
                        </div>
                        <div className="appointment-time">
                          <Clock size={16} />
                          <span>{apt.date} at {apt.time}</span>
                        </div>
                      </div>
                      <div className="appointment-actions">
                        <button className="action-btn primary">Join Call</button>
                        <button className="action-btn secondary">Reschedule</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-appointments">
                  <Calendar size={48} />
                  <h3>No upcoming appointments</h3>
                  <p>Book your next appointment to stay on top of your health</p>
                  <Link href="/doctors">
                    <button className="book-btn">Book Appointment</button>
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="recent-section">
              <div className="section-header">
                <h2>Recent Activity</h2>
                <Link href="/history" className="view-all-link">View History</Link>
              </div>
              
              <div className="recent-list">
                {recentAppointments.map(apt => (
                  <div key={apt.id} className="recent-item">
                    <div className="recent-icon">
                      <FileText size={20} />
                    </div>
                    <div className="recent-info">
                      <h4>Consultation with {apt.doctor}</h4>
                      <p>{apt.date} - {apt.type}</p>
                    </div>
                    <ChevronRight size={20} className="arrow-icon" />
                  </div>
                ))}
                
                <div className="recent-item">
                  <div className="recent-icon">
                    <Star size={20} />
                  </div>
                  <div className="recent-info">
                    <h4>Health Report Available</h4>
                    <p>Quarterly health assessment completed</p>
                  </div>
                  <ChevronRight size={20} className="arrow-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <div className="container">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link href="/doctors" className="action-card">
              <Calendar className="action-icon" />
              <h3>Book Appointment</h3>
              <p>Schedule with your preferred doctor</p>
            </Link>
            
            <Link href="/history" className="action-card">
              <FileText className="action-icon" />
              <h3>View History</h3>
              <p>Check your past appointments</p>
            </Link>
            
            <Link href="/contact" className="action-card">
              <Phone className="action-icon" />
              <h3>Contact Support</h3>
              <p>Get help from our team</p>
            </Link>
            
            <Link href="/faq" className="action-card">
              <Mail className="action-icon" />
              <h3>FAQ</h3>
              <p>Find answers to common questions</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Health Tips */}
      <section className="health-tips-section">
        <div className="container">
          <div className="tips-card">
            <div className="tips-content">
              <Heart className="tips-icon" />
              <div>
                <h3>Health Tip of the Day</h3>
                <p>Stay hydrated! Aim to drink at least 8 glasses of water daily to maintain optimal health and wellness.</p>
              </div>
            </div>
            <button className="tips-btn">More Tips</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          background: var(--neutral-50);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .dashboard-header {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-green) 100%);
          color: white;
          padding: 2rem;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .welcome-section {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
        }

        .welcome-text h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .welcome-text p {
          opacity: 0.9;
        }

        .notification-bell {
          position: relative;
          cursor: pointer;
        }

        .notification-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--secondary-orange);
          color: white;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .quick-stats-section {
          padding: 2rem 0;
          background: white;
          border-bottom: 1px solid var(--neutral-200);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--neutral-50);
          border-radius: 12px;
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          color: var(--primary-blue);
        }

        .stat-info h3 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
          color: var(--neutral-800);
        }

        .stat-info p {
          color: var(--neutral-600);
          font-size: 0.9rem;
        }

        .trend-icon {
          color: var(--success);
          margin-left: auto;
        }

        .trend-icon.down {
          color: var(--error);
        }

        .trend-icon.stable {
          color: var(--neutral-400);
        }

        .main-content-section {
          padding: 2rem 0;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          color: var(--neutral-800);
        }

        .view-all-link {
          color: var(--primary-blue);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .view-all-link:hover {
          color: var(--primary-blue-dark);
        }

        .appointments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .appointment-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
        }

        .appointment-card:hover {
          box-shadow: var(--shadow-md);
        }

        .appointment-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .doctor-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .doctor-avatar {
          width: 48px;
          height: 48px;
          background: var(--primary-blue);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doctor-info h3 {
          font-size: 1.1rem;
          margin-bottom: 0.25rem;
          color: var(--neutral-800);
        }

        .doctor-info p {
          color: var(--neutral-600);
          font-size: 0.9rem;
        }

        .appointment-time {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--neutral-600);
          font-size: 0.9rem;
        }

        .appointment-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background: var(--primary-blue);
          color: white;
        }

        .action-btn.primary:hover {
          background: var(--primary-blue-dark);
        }

        .action-btn.secondary {
          background: var(--neutral-100);
          color: var(--neutral-700);
          border: 1px solid var(--neutral-300);
        }

        .action-btn.secondary:hover {
          background: var(--neutral-200);
        }

        .no-appointments {
          text-align: center;
          padding: 3rem 2rem;
          background: white;
          border-radius: 12px;
          border: 1px solid var(--neutral-200);
        }

        .no-appointments h3 {
          margin: 1rem 0 0.5rem;
          color: var(--neutral-800);
        }

        .no-appointments p {
          color: var(--neutral-600);
          margin-bottom: 1.5rem;
        }

        .book-btn {
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .book-btn:hover {
          background: var(--primary-blue-dark);
        }

        .recent-list {
          background: white;
          border-radius: 12px;
          border: 1px solid var(--neutral-200);
          overflow: hidden;
        }

        .recent-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--neutral-100);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .recent-item:hover {
          background: var(--neutral-50);
        }

        .recent-item:last-child {
          border-bottom: none;
        }

        .recent-icon {
          width: 40px;
          height: 40px;
          background: var(--neutral-100);
          color: var(--primary-blue);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .recent-info {
          flex: 1;
        }

        .recent-info h4 {
          font-size: 1rem;
          margin-bottom: 0.25rem;
          color: var(--neutral-800);
        }

        .recent-info p {
          font-size: 0.85rem;
          color: var(--neutral-600);
        }

        .arrow-icon {
          color: var(--neutral-400);
        }

        .quick-actions-section {
          padding: 2rem 0;
          background: white;
        }

        .quick-actions-section h2 {
          text-align: center;
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--neutral-800);
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 1rem;
          background: var(--neutral-50);
          border-radius: 12px;
          text-decoration: none;
          color: var(--neutral-700);
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
        }

        .action-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          color: var(--primary-blue);
        }

        .action-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
          color: var(--primary-blue);
        }

        .action-card h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .action-card p {
          font-size: 0.9rem;
          color: var(--neutral-600);
        }

        .health-tips-section {
          padding: 2rem 0;
          background: var(--neutral-50);
        }

        .tips-card {
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%);
          color: white;
          padding: 2rem;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tips-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }

        .tips-icon {
          width: 48px;
          height: 48px;
        }

        .tips-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .tips-content p {
          opacity: 0.9;
          line-height: 1.5;
        }

        .tips-btn {
          padding: 0.75rem 1.5rem;
          background: white;
          color: var(--primary-blue);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tips-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .welcome-section {
            flex-direction: column;
            gap: 1rem;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .stats-grid,
          .actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .appointment-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .appointment-actions {
            width: 100%;
          }

          .action-btn {
            flex: 1;
          }

          .tips-card {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}