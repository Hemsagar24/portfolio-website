import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { MapPin, ArrowDown, Linkedin, Mail, Phone, Sparkles, Code, Zap, Star, Hexagon } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Hero = ({ isAdminMode = false }) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [displayText, setDisplayText] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isEditing, setIsEditing] = useState(false)
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 5000], [1, 0])
  const highlightsOpacity = useTransform(scrollY, [0, 5000], [1, 0])
  const highlightsY = useTransform(scrollY, [0, 5000], [0, -50])
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 5000], [1, 0])
  
  // Enhanced cursor tracking for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 100 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)
  
  // Professional bio data
  const [heroData, setHeroData] = useState({
    name: 'Hemsagar Patel',
    title: 'Software Development Engineer III',
    company: 'Walmart',
    location: 'Bengaluru, Karnataka',
    phone: '+91 7008 132 194',
    email: 'career.hemsagar@gmail.com',
    linkedin: 'https://www.linkedin.com/in/hemsagar2411',
    experience: '6+',
    summary1: 'Seasoned Software Engineer with over 6+ years of experience in designing and implementing large-scale applications and backend REST APIs. Experienced in leading microservice based cloud-native projects from inception to Production, catering to millions of users.',
    summary2: 'Known for troubleshooting complex issues, optimizing code, and contributing to the development of distributed and scalable applications serving millions of users globally.'
  })
  
  const fullText = heroData.name

  // Mouse move handler for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth) * 100
      const y = (clientY / innerHeight) * 100
      
      setMousePosition({ x, y })
      mouseX.set(clientX)
      mouseY.set(clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Typing animation effect
  useEffect(() => {
    if (inView) {
      let index = 0
      const timer = setInterval(() => {
        setDisplayText(fullText.slice(0, index))
        index++
        if (index > fullText.length) {
          clearInterval(timer)
        }
      }, 100)

      return () => clearInterval(timer)
    }
  }, [inView])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/hemsagar2411',
      icon: Linkedin,
      color: 'hover:text-blue-400',
    },
    {
      name: 'Email',
      href: 'mailto:career.hemsagar@gmail.com',
      icon: Mail,
      color: 'hover:text-red-400',
    },
    {
      name: 'Phone',
      href: 'tel:+917008132194',
      icon: Phone,
      color: 'hover:text-green-400',
    },
  ]

  // Update hero data function
  const handleUpdateHero = (field, value) => {
    setHeroData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleScrollToExperience = () => {
    const experienceSection = document.getElementById('experience')
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative min-h-screen py-20 sm:py-24 lg:py-32 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"
    >
      {/* Ultra-Modern Background */}
      <div className="absolute inset-0">
        {/* Primary gradient foundation */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        
        {/* Dynamic mesh gradients that follow cursor */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(59, 130, 246, 0.15) 0%, 
              rgba(147, 51, 234, 0.1) 25%, 
              transparent 60%)`
          }}
        />
        
        {/* Animated mesh overlays with better performance */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          style={{ y }}
        >
          {/* Large animated blobs */}
          <motion.div 
            className="absolute -top-1/2 -left-1/2 w-[150%] h-[150%] bg-gradient-conic from-blue-500/20 via-purple-500/10 to-pink-500/20 rounded-full blur-3xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-2xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-radial from-violet-500/25 to-transparent rounded-full blur-2xl"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3e%3cpath d='M0 0h1v100H0zm100 0v1H0V0z' fill='%23ffffff'/%3e%3c/svg%3e")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particle system */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 3,
            }}
          >
            <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
          </motion.div>
        ))}
        
        {/* Geometric floating shapes */}
        <motion.div
          className="absolute top-1/4 left-1/6 w-20 h-20"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl rotate-45" />
        </motion.div>
        
        <motion.div
          className="absolute top-2/3 right-1/5 w-16 h-16"
          animate={{
            y: [0, 40, 0],
            x: [0, -25, 0],
            rotate: [0, -180, -360],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        >
          <Hexagon className="w-full h-full text-purple-500/20" />
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-1/12 w-12 h-12"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        >
          <Star className="w-full h-full text-yellow-400/30" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        style={{ 
          y,
          opacity,
        }}
        className="relative z-10"
      >
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative py-8 w-full"
        >
          {/* Edit Button - Only visible in admin mode */}
          {isAdminMode && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-0 right-4 bg-white/10 text-white p-3 rounded-lg hover:bg-white/20 transition-colors z-20"
              title="Edit Hero Section"
            >
              ✏️
            </button>
          )}

          {/* Professional Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-5 py-2 mb-8 bg-white/[0.08] backdrop-blur-xl rounded-full border border-white/[0.12] text-sm font-medium shadow-lg"
            whileHover={{ scale: 1.02, y: -1 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={14} className="text-emerald-400" />
            </motion.div>
            <span className="text-white/90">Available for new opportunities</span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Professional Name - Reasonable size */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight"
          >
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {displayText}
              </span>
              {/* Professional cursor */}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-12 sm:h-16 lg:h-20 bg-gradient-to-t from-blue-400 via-purple-400 to-pink-400 ml-1 rounded-sm"
              />
            </span>
          </motion.h1>

          {/* Professional Title */}
          <motion.div
            variants={itemVariants}
            className="mb-4"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              {heroData.title}
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mt-1">{heroData.company}</p>
          </motion.div>

          {/* Location Card */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-6 py-2 mb-10 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/[0.12] shadow-lg"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <motion.div
              animate={{ 
                y: [0, -2, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MapPin size={18} className="text-emerald-400" />
            </motion.div>
            <span className="text-base font-medium text-white/95">{heroData.location}</span>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-blue-100"
          >
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <Phone size={16} className="text-green-400" />
              <span>{heroData.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <Mail size={16} className="text-red-400" />
              <span className="truncate">{heroData.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
              <Linkedin size={16} className="text-blue-400" />
              <a href={heroData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white truncate">
                LinkedIn Profile
              </a>
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto mb-12 text-left"
          >
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Professional Summary</h3>
            <p className="text-base sm:text-lg leading-relaxed mb-4 text-gray-200/90">
              {heroData.summary1}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-200/90">
              {heroData.summary2}
            </p>
          </motion.div>

          {/* Professional CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              onClick={handleScrollToContact}
              className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl font-semibold text-base min-w-[200px] overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/25"
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                boxShadow: "0 20px 40px -12px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Let's Connect
                <motion.div
                  animate={{ 
                    y: [0, 2, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowDown size={16} />
                </motion.div>
              </span>
            </motion.button>
            
            <motion.button
              onClick={handleScrollToExperience}
              className="group relative px-8 py-3 bg-white/[0.08] backdrop-blur-xl rounded-xl font-semibold text-base min-w-[200px] border border-white/[0.12] hover:bg-white/[0.15] transition-all duration-500"
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                borderColor: "rgba(255, 255, 255, 0.25)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2 text-white/95">
                View Experience
                <motion.div
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <Code size={16} />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Professional Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-20"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.name === 'LinkedIn' ? '_blank' : '_self'}
                rel={social.name === 'LinkedIn' ? 'noopener noreferrer' : ''}
                className="group relative p-3 bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/[0.12] text-white transition-all duration-300 hover:bg-white/[0.15] hover:border-white/25"
                whileHover={{ 
                  y: -3, 
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                aria-label={`Contact via ${social.name}`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          {/* Professional Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="pt-16 border-t border-white/[0.12] pb-32 max-w-6xl mx-auto"
            style={{ opacity: highlightsOpacity, y: highlightsY }}
          >
            <motion.h3 
              className="text-center text-white/90 text-xl font-semibold mb-10 tracking-wide"
              variants={itemVariants}
            >
              Professional Highlights
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto justify-items-center">
              {/* Years of Experience */}
              <motion.div 
                className="text-center p-6 lg:p-8 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 shadow-lg w-full max-w-xs"
                whileHover={{ y: -4, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="mb-4 flex justify-center">
                  <Code size={36} className="text-blue-400" />
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  {heroData.experience}
                </div>
                <div className="text-white/90 font-medium text-sm lg:text-base">Years of Experience</div>
              </motion.div>
              
              {/* TPS Performance */}
              <motion.div 
                className="text-center p-6 lg:p-8 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 shadow-lg w-full max-w-xs"
                whileHover={{ y: -4, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-4 flex justify-center">
                  <Zap size={36} className="text-purple-400" />
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  1000+
                </div>
                <div className="text-white/90 font-medium text-sm lg:text-base">TPS Performance</div>
              </motion.div>
              
              {/* Users Served */}
              <motion.div 
                className="text-center p-6 lg:p-8 bg-white/[0.08] backdrop-blur-xl rounded-2xl border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 shadow-lg w-full max-w-xs"
                whileHover={{ y: -4, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="mb-4 flex justify-center">
                  <Sparkles size={36} className="text-emerald-400" />
                </div>
                <div className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                  Millions
                </div>
                <div className="text-white/90 font-medium text-sm lg:text-base">Users Served</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Professional Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-2/5 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <span className="text-white/70 text-xs font-medium tracking-wide uppercase text-center">Scroll to explore</span>
        <motion.div 
          className="relative w-6 h-10 border-2 border-white/40 rounded-full flex justify-center overflow-hidden"
          whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.6)" }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Edit Hero Section</h3>
              <p className="text-gray-600">Update your personal information and professional summary</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={heroData.name}
                    onChange={(e) => handleUpdateHero('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={heroData.title}
                    onChange={(e) => handleUpdateHero('title', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    value={heroData.company}
                    onChange={(e) => handleUpdateHero('company', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={heroData.location}
                    onChange={(e) => handleUpdateHero('location', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="text"
                    value={heroData.phone}
                    onChange={(e) => handleUpdateHero('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={heroData.email}
                    onChange={(e) => handleUpdateHero('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
                  <input
                    type="url"
                    value={heroData.linkedin}
                    onChange={(e) => handleUpdateHero('linkedin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="text"
                    value={heroData.experience}
                    onChange={(e) => handleUpdateHero('experience', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Professional Summary */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary (Part 1)</label>
                  <textarea
                    value={heroData.summary1}
                    onChange={(e) => handleUpdateHero('summary1', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="First paragraph of your professional summary..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary (Part 2)</label>
                  <textarea
                    value={heroData.summary2}
                    onChange={(e) => handleUpdateHero('summary2', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Second paragraph of your professional summary..."
                  />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  // Here you could add a notification or save to localStorage
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
