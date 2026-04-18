'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Heart, Calendar, Clock, Star, Phone, Mail, MapPin, CheckCircle, Users, Award, Shield } from 'lucide-react'

type Doctor = {
  id: string
  name: string
  specialization: string
  experience?: string
  rating?: number
  image: string
}

const featuredDoctors: Doctor[] = [
  { id: "1", name: "Dr CHANDRU", specialization: "Cardiologist", experience: "15+ years", rating: 4.9, image: "/img1.jpg" },
  { id: "2", name: "Dr GAUTAM", specialization: "Dermatologist", experience: "12+ years", rating: 4.8, image: "/img2.jpg" },
  { id: "3", name: "Dr PRIYA", specialization: "Gynecologist", experience: "18+ years", rating: 4.9, image: "/img23.jpg" },
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    text: "The booking process was so smooth and the doctor was very professional. Highly recommend!",
    rating: 5,
    service: "Cardiology Consultation"
  },
  {
    id: 2,
    name: "Michael Chen",
    text: "Excellent service! I got an appointment the same day and the consultation was thorough.",
    rating: 5,
    service: "General Checkup"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    text: "Best healthcare experience I've had online. The platform is user-friendly and reliable.",
    rating: 5,
    service: "Dermatology Treatment"
  }
]

const stats = [
  { icon: Users, label: "Happy Patients", value: "10,000+" },
  { icon: Award, label: "Expert Doctors", value: "50+" },
  { icon: Calendar, label: "Appointments", value: "50,000+" },
  { icon: Shield, label: "Years of Trust", value: "10+" }
]

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Health, Our Priority
            </h1>
            <p className="hero-subtitle">
              Connect with top healthcare professionals instantly. Book appointments, consult online, and manage your health journey with ease.
            </p>
            <div className="hero-buttons">
              <Link href="/doctors">
                <button className="primary-btn hero-btn">
                  <Calendar size={20} />
                  Book Appointment
                </button>
              </Link>
              <Link href="/about">
                <button className="secondary-btn hero-btn">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="hero-features">
            <div className="feature-card">
              <Clock className="feature-icon" />
              <h3>24/7 Available</h3>
              <p>Book appointments anytime, anywhere</p>
            </div>
            <div className="feature-card">
              <Heart className="feature-icon" />
              <h3>Expert Care</h3>
              <p>Qualified and experienced doctors</p>
            </div>
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3>Secure & Private</h3>
              <p>Your health data is protected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <stat.icon className="stat-icon" />
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Doctors</h2>
          <p>Meet our top-rated healthcare professionals</p>
        </div>
        <div className="doctors-grid">
          {featuredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-image-container">
                <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                <div className="doctor-badge">
                  <Star size={16} />
                  {doctor.rating}
                </div>
              </div>
              <div className="doctor-info">
                <h3>{doctor.name}</h3>
                <p className="specialization">{doctor.specialization}</p>
                <p className="experience">{doctor.experience}</p>
                <Link href={`/book/${doctor.id}`}>
                  <button className="book-btn">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="section-footer">
          <Link href="/doctors">
            <button className="view-all-btn">View All Doctors</button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Patients Say</h2>
          <p>Real experiences from real patients</p>
        </div>
        <div className="testimonial-container">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="patient-info">
                <div className="patient-avatar">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <p>{testimonials[currentTestimonial].service}</p>
                </div>
              </div>
              <div className="rating">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={16} className="star-filled" />
                ))}
              </div>
            </div>
            <p className="testimonial-text">
              "{testimonials[currentTestimonial].text}"
            </p>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Take Control of Your Health?</h2>
          <p>Join thousands of satisfied patients who trust us with their healthcare needs</p>
          <Link href="/register">
            <button className="cta-btn">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>

      <style jsx>{`
        .home-page {
          min-height: 100vh;
        }

        .hero-section {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-green) 100%);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .hero-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .secondary-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid white;
          backdrop-filter: blur(10px);
        }

        .secondary-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .hero-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
          color: white;
        }

        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .feature-card p {
          opacity: 0.8;
          font-size: 0.95rem;
        }

        .stats-section {
          padding: 4rem 2rem;
          background: white;
        }

        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 2rem;
          border-radius: 16px;
          background: var(--neutral-50);
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
          color: var(--primary-blue);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-blue);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--neutral-600);
          font-size: 1rem;
        }

        .featured-section {
          padding: 4rem 2rem;
          background: var(--neutral-50);
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--neutral-800);
          margin-bottom: 1rem;
        }

        .section-header p {
          color: var(--neutral-600);
          font-size: 1.1rem;
        }

        .doctors-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .doctor-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: all 0.3s ease;
          border: 1px solid var(--neutral-200);
        }

        .doctor-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
        }

        .doctor-image-container {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .doctor-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .doctor-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--secondary-orange);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .doctor-info {
          padding: 1.5rem;
        }

        .doctor-info h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-800);
        }

        .specialization {
          color: var(--primary-blue);
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .experience {
          color: var(--neutral-600);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .book-btn {
          width: 100%;
          padding: 0.75rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .book-btn:hover {
          background: var(--primary-blue-dark);
        }

        .section-footer {
          text-align: center;
          margin-top: 2rem;
        }

        .view-all-btn {
          padding: 1rem 2rem;
          background: var(--primary-blue);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .view-all-btn:hover {
          background: var(--primary-blue-dark);
          transform: translateY(-2px);
        }

        .testimonials-section {
          padding: 4rem 2rem;
          background: white;
        }

        .testimonial-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }

        .testimonial-card {
          background: var(--neutral-50);
          padding: 2rem;
          border-radius: 16px;
          border: 1px solid var(--neutral-200);
          margin-bottom: 2rem;
        }

        .testimonial-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .patient-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .patient-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 1.25rem;
        }

        .patient-info h4 {
          margin: 0;
          color: var(--neutral-800);
        }

        .patient-info p {
          margin: 0;
          color: var(--neutral-600);
          font-size: 0.9rem;
        }

        .rating {
          display: flex;
          gap: 0.25rem;
        }

        .star-filled {
          color: var(--secondary-orange);
          fill: var(--secondary-orange);
        }

        .testimonial-text {
          font-size: 1.1rem;
          color: var(--neutral-700);
          line-height: 1.6;
          font-style: italic;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: var(--neutral-300);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: var(--primary-blue);
          width: 24px;
          border-radius: 4px;
        }

        .cta-section {
          padding: 4rem 2rem;
          background: linear-gradient(135deg, var(--primary-green) 0%, var(--primary-blue) 100%);
          color: white;
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .cta-content p {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .cta-btn {
          padding: 1rem 2rem;
          background: white;
          color: var(--primary-blue);
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .stats-grid,
          .doctors-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }

          .testimonial-header {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}