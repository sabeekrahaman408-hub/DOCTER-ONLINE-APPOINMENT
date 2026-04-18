'use client'

import { useState } from 'react'
import { Calendar, CreditCard, Clock, Shield, Phone, Mail, User, FileText, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
  icon: React.ElementType
}

const faqData: FAQItem[] = [
  // Booking Related
  {
    id: '1',
    category: 'Booking',
    question: 'How do I book an appointment?',
    answer: 'You can book an appointment through our website by navigating to the "Doctors" section, selecting your preferred doctor, choosing an available time slot, and completing the booking form. You can also book via our mobile app or by calling our helpline.',
    icon: Calendar
  },
  {
    id: '2',
    category: 'Booking',
    question: 'Can I book an appointment for someone else?',
    answer: 'Yes, you can book appointments for family members or dependents. During the booking process, you\'ll have the option to specify if the appointment is for someone else and provide their details.',
    icon: User
  },
  {
    id: '3',
    category: 'Booking',
    question: 'How far in advance can I book?',
    answer: 'You can book appointments up to 3 months in advance. For urgent cases, we also offer same-day appointments subject to doctor availability.',
    icon: Clock
  },
  {
    id: '4',
    category: 'Booking',
    question: 'What information do I need for booking?',
    answer: 'You\'ll need your personal information (name, contact details), medical history summary, reason for visit, insurance information (if applicable), and preferred payment method.',
    icon: FileText
  },

  // Cancellation Related
  {
    id: '5',
    category: 'Cancellations',
    question: 'How do I cancel my appointment?',
    answer: 'You can cancel your appointment through your account dashboard, mobile app, or by calling our customer service. Navigate to "My Appointments," select the appointment you wish to cancel, and follow the cancellation process.',
    icon: Calendar
  },
  {
    id: '6',
    category: 'Cancellations',
    question: 'What is the cancellation policy?',
    answer: 'Free cancellations are allowed up to 24 hours before your appointment time. Cancellations within 24 hours may incur a fee of $25. No-shows will be charged the full appointment fee.',
    icon: Clock
  },
  {
    id: '7',
    category: 'Cancellations',
    question: 'Can I reschedule instead of cancelling?',
    answer: 'Yes, you can reschedule your appointment up to 2 hours before the scheduled time. Log into your account, select "Reschedule," and choose a new available time slot with the same doctor.',
    icon: Calendar
  },
  {
    id: '8',
    category: 'Cancellations',
    question: 'What if I need to cancel due to an emergency?',
    answer: 'For medical emergencies, please call us immediately. We understand that emergencies happen and will work with you to reschedule without penalties in genuine emergency situations.',
    icon: Phone
  },

  // Payment Related
  {
    id: '9',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, Apple Pay, Google Pay, and most major insurance plans. Cash payments are accepted at our physical locations.',
    icon: CreditCard
  },
  {
    id: '10',
    category: 'Payments',
    question: 'Do you accept insurance?',
    answer: 'Yes, we work with most major insurance providers including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, and Medicare. Please check with your insurance provider for coverage details.',
    icon: Shield
  },
  {
    id: '11',
    category: 'Payments',
    question: 'When do I pay for my appointment?',
    answer: 'Payment is typically required at the time of booking to secure your appointment. For insurance-covered visits, you may only need to pay your co-payment amount, with the remainder billed to insurance.',
    icon: CreditCard
  },
  {
    id: '12',
    category: 'Payments',
    question: 'What if I can\'t afford the treatment?',
    answer: 'We offer flexible payment plans and financial assistance programs for qualifying patients. Please speak with our billing department to explore options that work for your budget.',
    icon: CreditCard
  },

  // General Questions
  {
    id: '13',
    category: 'General',
    question: 'What should I bring to my appointment?',
    answer: 'Please bring a valid ID, insurance card, list of current medications, medical records if relevant, and a method of payment. For virtual appointments, ensure you have a stable internet connection and a device with camera capabilities.',
    icon: FileText
  },
  {
    id: '14',
    category: 'General',
    question: 'How do virtual consultations work?',
    answer: 'Virtual consultations are conducted via secure video call. You\'ll receive a link 15 minutes before your appointment. Click the link to join the video call with your doctor from any device with camera and internet access.',
    icon: Phone
  },
  {
    id: '15',
    category: 'General',
    question: 'Is my medical information secure?',
    answer: 'Yes, we use HIPAA-compliant systems and encryption to protect your medical information. All data is stored securely and only accessible to authorized healthcare professionals involved in your care.',
    icon: Shield
  },
  {
    id: '16',
    category: 'General',
    question: 'How do I get my medical records?',
    answer: 'You can request your medical records through your patient portal, by email, or in person at our clinic. Records are typically available within 3-5 business days of your request.',
    icon: FileText
  }
]

const categories = ['All', 'Booking', 'Cancellations', 'Payments', 'General']

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="hero-content">
          <HelpCircle className="hero-icon" />
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about booking, cancellations, payments, and more</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="search-section">
        <div className="container">
          <div className="search-container">
            <div className="search-bar">
              <HelpCircle className="search-icon" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="faq-content-section">
        <div className="container">
          <div className="faq-grid">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleExpanded(faq.id)}
                  >
                    <div className="question-content">
                      <faq.icon className="question-icon" />
                      <span className="category-badge">{faq.category}</span>
                      <h3>{faq.question}</h3>
                    </div>
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="expand-icon" />
                    ) : (
                      <ChevronDown className="expand-icon" />
                    )}
                  </button>
                  
                  {expandedItems.has(faq.id) && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results">
                <HelpCircle className="no-results-icon" />
                <h3>No results found</h3>
                <p>Try adjusting your search or browse all categories</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="contact-support-section">
        <div className="container">
          <div className="contact-support-content">
            <h2>Still have questions?</h2>
            <p>Our support team is here to help you with any additional questions you may have</p>
            
            <div className="contact-options">
              <a href="tel:+15551234567" className="contact-option">
                <Phone className="contact-icon" />
                <div>
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567</p>
                  <span>24/7 Support</span>
                </div>
              </a>
              
              <a href="mailto:support@apollocares.com" className="contact-option">
                <Mail className="contact-icon" />
                <div>
                  <h3>Email Us</h3>
                  <p>support@apollocares.com</p>
                  <span>Response within 24 hours</span>
                </div>
              </a>
              
              <a href="/contact" className="contact-option">
                <FileText className="contact-icon" />
                <div>
                  <h3>Contact Form</h3>
                  <p>Send us a message</p>
                  <span>Quick response</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links-section">
        <div className="container">
          <div className="quick-links-grid">
            <div className="quick-link-card">
              <Calendar className="quick-link-icon" />
              <h3>Book Appointment</h3>
              <p>Schedule your visit with our expert doctors</p>
              <a href="/doctors" className="quick-link-btn">Book Now</a>
            </div>
            
            <div className="quick-link-card">
              <FileText className="quick-link-icon" />
              <h3>View Services</h3>
              <p>Explore our comprehensive healthcare services</p>
              <a href="/about" className="quick-link-btn">Learn More</a>
            </div>
            
            <div className="quick-link-card">
              <User className="quick-link-icon" />
              <h3>Patient Portal</h3>
              <p>Access your medical records and appointments</p>
              <a href="/dashboard" className="quick-link-btn">Login</a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .faq-page {
          min-height: 100vh;
        }

        .faq-hero {
          background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-green) 100%);
          color: white;
          padding: 4rem 2rem;
          text-align: center;
        }

        .hero-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 1.5rem;
        }

        .hero-content h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .hero-content p {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .search-section {
          padding: 3rem 0;
          background: var(--neutral-50);
        }

        .search-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .search-bar {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--neutral-400);
          width: 20px;
          height: 20px;
        }

        .search-bar input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 1px solid var(--neutral-300);
          border-radius: 12px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
        }

        .search-bar input:focus {
          outline: none;
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .category-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .category-btn {
          padding: 0.75rem 1.5rem;
          background: white;
          border: 1px solid var(--neutral-300);
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          color: var(--neutral-700);
        }

        .category-btn:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
        }

        .category-btn.active {
          background: var(--primary-blue);
          color: white;
          border-color: var(--primary-blue);
        }

        .faq-content-section {
          padding: 4rem 0;
          background: white;
        }

        .faq-grid {
          display: grid;
          gap: 1rem;
        }

        .faq-item {
          background: var(--neutral-50);
          border: 1px solid var(--neutral-200);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          box-shadow: var(--shadow-md);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: var(--neutral-100);
        }

        .question-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .question-icon {
          width: 24px;
          height: 24px;
          color: var(--primary-blue);
          flex-shrink: 0;
        }

        .category-badge {
          background: var(--primary-blue);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
          flex-shrink: 0;
        }

        .faq-question h3 {
          margin: 0;
          color: var(--neutral-800);
          font-size: 1.1rem;
          line-height: 1.4;
        }

        .expand-icon {
          width: 20px;
          height: 20px;
          color: var(--neutral-400);
          transition: transform 0.3s ease;
        }

        .faq-answer {
          padding: 0 1.5rem 1.5rem 4rem;
          border-top: 1px solid var(--neutral-200);
          background: white;
        }

        .faq-answer p {
          color: var(--neutral-600);
          line-height: 1.6;
          margin: 0;
        }

        .no-results {
          text-align: center;
          padding: 4rem 2rem;
          color: var(--neutral-500);
        }

        .no-results-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 1rem;
          color: var(--neutral-300);
        }

        .no-results h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-600);
        }

        .contact-support-section {
          padding: 4rem 0;
          background: var(--neutral-50);
        }

        .contact-support-content {
          text-align: center;
        }

        .contact-support-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--neutral-800);
        }

        .contact-support-content p {
          font-size: 1.1rem;
          color: var(--neutral-600);
          margin-bottom: 3rem;
        }

        .contact-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .contact-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          text-decoration: none;
          color: var(--neutral-700);
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
        }

        .contact-option:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          color: var(--primary-blue);
        }

        .contact-icon {
          width: 48px;
          height: 48px;
          color: var(--primary-blue);
          flex-shrink: 0;
        }

        .contact-option h3 {
          margin: 0;
          font-size: 1.1rem;
        }

        .contact-option p {
          margin: 0.25rem 0;
          font-weight: 600;
        }

        .contact-option span {
          font-size: 0.9rem;
          color: var(--neutral-500);
        }

        .quick-links-section {
          padding: 4rem 0;
          background: white;
        }

        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .quick-link-card {
          background: var(--neutral-50);
          padding: 2rem;
          border-radius: 16px;
          text-align: center;
          border: 1px solid var(--neutral-200);
          transition: all 0.3s ease;
        }

        .quick-link-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .quick-link-icon {
          width: 48px;
          height: 48px;
          color: var(--primary-blue);
          margin-bottom: 1rem;
        }

        .quick-link-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--neutral-800);
        }

        .quick-link-card p {
          color: var(--neutral-600);
          margin-bottom: 1.5rem;
        }

        .quick-link-btn {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: var(--primary-blue);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .quick-link-btn:hover {
          background: var(--primary-blue-dark);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .category-filters {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }

          .question-content {
            flex-wrap: wrap;
          }

          .faq-answer {
            padding: 0 1rem 1rem 1rem;
          }

          .contact-options,
          .quick-links-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
