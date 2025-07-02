import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Experience from './components/Experience'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Certifications from './components/Certifications'

import { saveToLocalStorage, loadFromLocalStorage } from './utils/localStorage'
import VisitorCounter from './components/VisitorCounter'
import VisitorAnalytics from './components/VisitorAnalytics'
import WelcomeNotification from './components/WelcomeNotification'
import { VisitorProvider } from './context/VisitorContext'

function App() {
  // Admin Authentication State
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [showAdminPrompt, setShowAdminPrompt] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  
  // Admin password (using a simple hash for basic obfuscation)
  // In production, this should be handled server-side
  const ADMIN_PASSWORD_HASH = 'b40cb1e8302ed5b8df3be511089e7b275e17e972a9fec99d850b234aaf6a82b7' // SHA-256 of 'claude4'

  // Simple hash function (for basic obfuscation only)
  const simpleHash = async (text) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Function to handle admin login
  const handleAdminLogin = async () => {
    const hashedInput = await simpleHash(adminPassword)
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      setIsAdminMode(true)
      setShowAdminPrompt(false)
      setAdminPassword('')
      showNotification('Admin mode enabled', 'success')
    } else {
      showNotification('Invalid password', 'error')
      setAdminPassword('')
    }
  }
  
  // Admin password (in production, this should be more secure)
  // Function to handle admin logout
  const handleAdminLogout = () => {
    setIsAdminMode(false)
    showNotification('Admin mode disabled', 'info')
  }

  // Simple keyboard shortcut to open admin prompt (Ctrl/Cmd + E)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e' && !e.shiftKey && !e.altKey) {
        e.preventDefault()
        setShowAdminPrompt(true)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Notification state
  const [notification, setNotification] = useState(null)

  // Function to show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  // Tech Stack State
  const [techStack, setTechStack] = useState(() => {
    const defaultTechStack = {
            "dev": [
                  "Java8",
                  "Spring boot",
                  "Spring Reactive",
                  "Kafka",
                  "Azure Cosmos",
                  "MySQL/MariaDB",
                  "Jersey",
                  "JPA",
                  "Thymeleaf",
                  "Git"
            ],
            "deployment": [
                  "Docker and Kubernetes",
                  "Jenkins (CI)",
                  "Concord (CD)"
            ],
            "monitoring": [
                  "Splunk",
                  "Kibana",
                  "Grafana",
                  "New Relic",
                  "Azure portal",
                  "Linux"
            ],
            "architecture": [
                  "Microservice",
                  "Monolith",
                  "Active-Active"
            ],
            "cloud": [
                  "Azure",
                  "GCP"
            ]
      }
    // Clear the corrupted localStorage data
    localStorage.removeItem('portfolio_techStack')
    return defaultTechStack
  })

  // Contact Section State
  const [contactData, setContactData] = useState(() => {
    const defaultContactData = {
            "email": "career.hemsagar@gmail.com",
            "phone": "+91 7008 132 194",
            "linkedin": "https://www.linkedin.com/in/hemsagar2411",
            "location": "Bengaluru, Karnataka, India",
            "title": "Let's Work Together",
            "subtitle": "Ready to build something amazing? I'm always open to discussing new opportunities and interesting projects.",
            "ctaTitle": "Ready to Start a Project?",
            "ctaDescription": "I'm currently available for new opportunities and freelance projects. Whether you need a full-stack developer, microservices architect, or someone to optimize your existing systems, let's discuss how I can help.",
            "services": [
                  "Full-stack Development",
                  "Microservices Architecture",
                  "Cloud Solutions",
                  "Performance Optimization"
            ]
      }
    return loadFromLocalStorage('portfolio_contactData', defaultContactData)
  })

  // Experience Section State
  const [experienceData, setExperienceData] = useState(() => {
    const defaultExperienceData = [
      {
        "id": 1,
        "title": "Software Development Engineer III",
        "company": "Walmart Global Tech India",
        "location": "Bengaluru",
        "duration": "May 2022 - Present",
        "period": "2+ years",
        "current": true,
        "achievements": [
          "Building a **Messaging Platform** for Walmart health & wellness clients for sending communication Messages",
          "Designed & Developed **microservice** using **SpringBoot** with **Kafka Async mechanism** and **DLQ data replay technique** to achieve resiliency and implemented **fault tolerance system** with **Dual region Active-Active architecture** using **Azure**",
          "Executed **Performance testing** and onboarded client with **1000+ TPS** requirements, utilising **Kafka's topic partitioning strategy** & **Data Retention capability** to achieve high throughput maintaining the **SLA of 500ms-1ms** for marketing, priority & survey messages",
          "Implemented **Task based approach** as part of code refactoring using **Command design pattern** for code reusability",
          "Enhanced system efficiency by applying **NFRs** including **circuit breakers**, **retries** & **Kafka batch processing**. Successfully migrated **Kafka clusters** with **no data loss or Duplication**",
          "Designed & Developed **Backend Automated E2E test framework** with **TestNG** for regression",
          "Build **Performance Dashboard** on **Splunk** for **E2E analysis** of TAT, TPS, DB and Topic Lag, which reduces the effort of manual queries, during performance & automation testing before each **PROD deployments**",
          "Worked on various **tech mod initiatives** for **vulnerability fixes**, **log reduction**, **Infra optimization** to reduce cost incurred"
        ],
        "technologies": ["Java 8", "Spring Boot", "Kafka", "Azure", "Splunk", "Microservices"],
        "color": "from-blue-500 to-purple-600",
        "highlight": "Employee recognition for messaging platform innovation"
      },
      {
        "id": 2,
        "title": "Software Engineer",
        "company": "Rakuten India",
        "location": "Bangalore",
        "duration": "Aug 2019 - May 2022",
        "period": "2.8 years",
        "current": false,
        "achievements": [
          "Involved in **Backend code migration** from **PHP to JAVA**, developed **API Gateway layer** for **Rakuten Payments** business",
          "Developed the **UI interfaces** using **Thymeleaf** to render the **HTML pages dynamically** as per API response",
          "Awarded as **Employee of the Month** for contribution in **Rakuten Payments**"
        ],
        "technologies": ["Java", "PHP", "Thymeleaf", "API Gateway", "Payments"],
        "color": "from-green-500 to-teal-600",
        "highlight": "Employee of the Month award"
      },
      {
        "id": 3,
        "title": "Associate Software Engineer",
        "company": "Ikyam Solutions Pvt Ltd",
        "location": "Bengaluru",
        "duration": "Jan 2018 - Jul 2019",
        "period": "1.5 years",
        "current": false,
        "achievements": [
          "Developed **ETL data pipelines** using **Core JAVA** scheduled via **CRON jobs** to collect data from **MySQL**, **MongoDB** & **Excel Sheets**, finally Storing that data to **Elastic Search**",
          "Developed **REST APIs** using **Core JAVA** & **Spring Boot** to generate processed **JSON data** as per the client's **Dashboard requirements** for only **Onionpy Business Intelligence tool**"
        ],
        "technologies": ["Core Java", "Spring Boot", "MySQL", "MongoDB", "ETL", "REST APIs"],
        "color": "from-orange-500 to-red-600",
        "highlight": "First professional role - Foundation building"
      }
    ]
    return loadFromLocalStorage('portfolio_experienceData', defaultExperienceData)
  })

  // Edit States
  const [isEditingContact, setIsEditingContact] = useState(false)
  const [editingTechCategory, setEditingTechCategory] = useState(null)

  // Contact Data Editing Functions
  const handleUpdateContact = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdateContactService = (index, value) => {
    setContactData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => i === index ? value : service)
    }))
  }

  const handleAddContactService = (newService) => {
    if (newService.trim()) {
      setContactData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }))
    }
  }

  const handleRemoveContactService = (index) => {
    setContactData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }))
  }

  // Auto-save data to localStorage and JSX files
  useEffect(() => {
    saveToLocalStorage('portfolio_techStack', techStack)
    saveTechStackToFile(techStack)
  }, [techStack])

  // Debounced save to prevent continuous notifications
  useEffect(() => {
    saveToLocalStorage('portfolio_contactData', contactData)
    
    // Debounce the file save to prevent spam notifications
    const timeoutId = setTimeout(() => {
      saveContactDataToFile(contactData)
    }, 1000) // Wait 1 second after last change
    
    return () => clearTimeout(timeoutId)
  }, [contactData])

  // Always save experience data (critical user content)
  useEffect(() => {
    saveToLocalStorage('portfolio_experienceData', experienceData)
  }, [experienceData])

  // File saving functions
  const saveTechStackToFile = async (techStackData) => {
    try {
      const response = await fetch('http://localhost:3001/api/save-tech-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ techStack: techStackData }),
      })
      
      if (response.ok) {
        console.log('✅ Tech stack saved to JSX file')
        // Only show notification if user is in admin mode to avoid spam
        if (isAdminMode) {
          showNotification('Tech stack auto-saved to file!', 'success')
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not save tech stack to file:', error.message)
    }
  }

  const saveContactDataToFile = async (contactDataObj) => {
    try {
      const response = await fetch('http://localhost:3001/api/save-contact-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactData: contactDataObj }),
      })
      
      if (response.ok) {
        console.log('✅ Contact data saved to JSX file')
        // Only show notification if user is in admin mode to avoid spam
        if (isAdminMode) {
          showNotification('Contact data auto-saved to file!', 'success')
        }
      }
    } catch (error) {
      console.warn('⚠️ Could not save contact data to file:', error.message)
    }
  }

  return (
    <VisitorProvider>
      <div className="min-h-screen bg-gray-50">
      

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            <div className="flex-shrink-0">
              <a href="#hero" className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                Hemsagar Patel
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <a href="#hero" className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base">Home</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base">About</a>
                <a href="#experience" className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base">Experience</a>
                <a href="#projects" className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base">Projects</a>
                <a href="#education" className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base">Education</a>
                <a href="#skills" className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base">Skills</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 rounded-lg text-sm lg:text-base">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero isAdminMode={isAdminMode} />

      {/* Skills/Tech Stack Section */}
      <Skills 
        techStack={techStack} 
        onEditTechCategory={(category, skills) => {
          setTechStack(prev => ({
            ...prev,
            [category]: skills
          }))
        }}
        editingTechCategory={editingTechCategory}
        setEditingTechCategory={setEditingTechCategory}
        isAdminMode={isAdminMode}
      />

      {/* Experience Section */}
      <Experience 
        experienceData={experienceData}
        onUpdateExperience={setExperienceData}
        showNotification={showNotification}
        isAdminMode={isAdminMode}
      />

      {/* Projects Section */}
      <Projects isAdminMode={isAdminMode} />

      {/* About Section */}
      <About isAdminMode={isAdminMode} />

      {/* Education Section */}
      <Education isAdminMode={isAdminMode} />

      {/* Certifications Section */}
      <Certifications />

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Edit Contact Button - Only visible in admin mode */}
          {isAdminMode && (
            <button
              onClick={() => setIsEditingContact(true)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/80 text-gray-700 p-2 rounded-lg hover:bg-white transition-colors shadow-sm text-sm"
              title="Edit Contact Section"
            >
              ✏️
            </button>
          )}

          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {contactData.title.split(' ').map((word, index) => 
                word === 'Together' ? (
                  <span key={index} className="text-blue-600">{word}</span>
                ) : (
                  word + ' '
                )
              )}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {contactData.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Email</h3>
                    <a href={`mailto:${contactData.email}`} className="text-blue-600 hover:text-blue-700 transition-colors text-sm sm:text-base break-all">
                      {contactData.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Phone</h3>
                    <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="text-green-600 hover:text-green-700 transition-colors text-sm sm:text-base">
                      {contactData.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">LinkedIn</h3>
                    <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 transition-colors text-sm sm:text-base break-all">
                      {contactData.linkedin.replace('https://', '').replace('www.', '')}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Location</h3>
                    <span className="text-orange-600 text-sm sm:text-base">{contactData.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{contactData.ctaTitle}</h3>
              <p className="text-blue-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {contactData.ctaDescription}
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                {contactData.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 text-blue-100">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a href={`mailto:${contactData.email}`} className="bg-white text-blue-600 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center text-sm sm:text-base">
                  Send Email
                </a>
                <a href={`tel:${contactData.phone.replace(/\s/g, '')}`} className="bg-white/10 text-white border border-white/20 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors text-center text-sm sm:text-base">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm sm:text-base">© 2025 Hemsagar Patel. All rights reserved.</p>
            </div>
            
            {/* Visitor Counter */}
            <VisitorCounter className="text-gray-400" />
          </div>
          
          {/* Admin-only detailed stats */}
          {isAdminMode && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <VisitorCounter showDetails={true} className="max-w-2xl mx-auto" />
            </div>
          )}
        </div>
      </footer>

      {/* Contact Edit Modal */}
      {isEditingContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Edit Contact Section</h3>
              <p className="text-sm sm:text-base text-gray-600">Update your contact information and messaging</p>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Section Headers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <input
                    type="text"
                    value={contactData.title}
                    onChange={(e) => handleUpdateContact('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                  <input
                    type="text"
                    value={contactData.ctaTitle}
                    onChange={(e) => handleUpdateContact('ctaTitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => handleUpdateContact('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={contactData.phone}
                    onChange={(e) => handleUpdateContact('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={contactData.linkedin}
                    onChange={(e) => handleUpdateContact('linkedin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={contactData.location}
                    onChange={(e) => handleUpdateContact('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Description Text */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                  <textarea
                    value={contactData.subtitle}
                    onChange={(e) => handleUpdateContact('subtitle', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Brief description for the contact section..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Description</label>
                  <textarea
                    value={contactData.ctaDescription}
                    onChange={(e) => handleUpdateContact('ctaDescription', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Description for the call-to-action section..."
                  />
                </div>
              </div>

              {/* Services */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Services Offered</label>
                <div className="space-y-3">
                  {contactData.services.map((service, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => handleUpdateContactService(index, e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                      <button
                        onClick={() => handleRemoveContactService(index)}
                        className="bg-red-100 text-red-600 px-3 py-3 rounded-lg hover:bg-red-200 transition-colors text-sm w-full sm:w-auto"
                        title="Remove service"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  ))}
                  
                  {/* Add New Service */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Add new service..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddContactService(e.target.value)
                          e.target.value = ''
                        }
                      }}
                    />
                    <button
                      onClick={(e) => {
                        const input = e.target.previousElementSibling
                        handleAddContactService(input.value)
                        input.value = ''
                      }}
                      className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setIsEditingContact(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsEditingContact(false)
                  showNotification('Contact section updated successfully!')
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-3 sm:p-4 rounded-lg shadow-lg max-w-xs sm:max-w-sm transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl">{notification.type === 'success' ? '✅' : '❌'}</span>
            <span className="text-sm sm:text-base flex-1">{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 text-white hover:text-gray-200 text-lg sm:text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Admin Login Modal */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Admin Access</h3>
            <p className="text-gray-600 mb-4">Enter admin password to enable edit mode:</p>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="Admin password"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowAdminPrompt(false)
                  setAdminPassword('')
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Status Indicator */}
      {isAdminMode && (
        <div className="fixed bottom-4 left-4 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg z-40 flex items-center gap-2">
          <span className="text-sm">🔒 Admin Mode</span>
          <button
            onClick={handleAdminLogout}
            className="text-xs bg-green-700 px-2 py-1 rounded hover:bg-green-800 transition-colors"
          >
            Logout
          </button>
        </div>
      )}

      {/* Visitor Analytics Dashboard (Admin Only) */}
      <VisitorAnalytics isAdminMode={isAdminMode} />

      {/* Welcome Notification for New Visitors */}
      <WelcomeNotification />
      </div>
    </VisitorProvider>
  )
}

export default App
