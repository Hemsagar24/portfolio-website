import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, ArrowDown, Linkedin, Mail, Phone, Sparkles, Code, Zap } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [displayText, setDisplayText] = useState('')
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  const fullText = 'Hemsagar Patel'

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
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Modern Background */}
      <div className="absolute inset-0">
        {/* Base gradient with modern colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/50 via-transparent to-purple-900/50" />
        
        {/* Animated mesh overlays */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-blue-500/20 rounded-full blur-3xl transform scale-150" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Small floating dots */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Larger floating shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20"
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20"
          animate={{
            y: [0, 50, 0],
            x: [0, -20, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
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
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          {/* Status Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium"
          >
            <Sparkles size={16} className="text-yellow-400" />
            <span>Available for new opportunities</span>
            <Sparkles size={16} className="text-yellow-400" />
          </motion.div>

          {/* Enhanced Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-16 sm:h-20 lg:h-24 bg-gradient-to-t from-blue-400 to-purple-400 ml-2"
              />
            </span>
          </motion.h1>

          {/* Title with Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <Code size={24} className="text-blue-400" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Software Development Engineer III
            </h2>
            <Zap size={24} className="text-purple-400" />
          </motion.div>

          {/* Location Card */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 px-6 py-3 mb-12 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20"
          >
            <MapPin size={20} className="text-emerald-400" />
            <span className="text-lg font-medium">Bengaluru, Karnataka</span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl leading-relaxed mb-16 text-gray-200 max-w-4xl mx-auto font-light"
          >
            Crafting digital experiences with{' '}
            <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              6+ years
            </span>{' '}
            of expertise. Building scalable applications that serve{' '}
            <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              millions of users
            </span>{' '}
            with precision and innovation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.button
              onClick={handleScrollToContact}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-semibold text-lg min-w-[220px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Let's Connect
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              onClick={handleScrollToExperience}
              className="group px-8 py-4 bg-white/10 backdrop-blur-xl rounded-2xl font-semibold text-lg min-w-[220px] border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2">
                View Experience
                <Code size={18} />
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 mb-16"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target={social.name === 'LinkedIn' ? '_blank' : '_self'}
                rel={social.name === 'LinkedIn' ? 'noopener noreferrer' : ''}
                className="group relative p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white transition-all duration-300 hover:bg-white/20 hover:border-white/40"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                aria-label={`Contact via ${social.name}`}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 border-t border-white/20"
          >
            {[
              { number: '6+', label: 'Years of Experience', icon: Code },
              { number: '1000+', label: 'TPS Performance', icon: Zap },
              { number: 'Millions', label: 'Users Served', icon: Sparkles },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group text-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <stat.icon size={32} className="mx-auto mb-4 text-blue-400 group-hover:text-purple-400 transition-colors duration-300" />
                <div className="text-4xl lg:text-5xl font-black text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ opacity }}
      >
        <span className="text-white/60 text-sm font-medium">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
