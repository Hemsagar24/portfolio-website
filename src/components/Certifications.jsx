import React, { useState, useMemo, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Award, 
  ExternalLink,
  CheckCircle,
  Star,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react'

// Company logo component with loading optimization
const CompanyLogo = memo(({ src, alt, size = 16, className = "" }) => (
  <img 
    src={src} 
    alt={alt} 
    width={size} 
    height={size} 
    className={`${className} object-contain`}
    style={{ 
      width: size, 
      height: size,
      filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
    }}
    loading="lazy"
    decoding="async"
  />
))

// Individual Certification Card Component - Memoized for performance
const CertificationCard = memo(({ cert, index }) => {
  const [cardRef, cardInView] = useInView({ 
    threshold: 0.2, 
    triggerOnce: true,
    rootMargin: '50px 0px' // Start animation earlier
  })

  return (
    <motion.div
      ref={cardRef}
      key={cert.credentialId}
      initial={{ 
        opacity: 0, 
        y: 40,
        scale: 0.95
      }}
      animate={cardInView ? { 
        opacity: 1, 
        y: 0,
        scale: 1
      } : {
        opacity: 0, 
        y: 40,
        scale: 0.95
      }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { 
          duration: 0.2,
          ease: "easeOut"
        }
      }}
      className="group relative cursor-pointer rounded-3xl p-8 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-200 border border-slate-200/50"
    >
      {/* Enhanced background effects for individual cards */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-3xl" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-20 -translate-y-20" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 rounded-2xl bg-white shadow-lg border border-slate-200">
                <CompanyLogo src={cert.logoUrl} alt={cert.issuer} size={48} />
              </div>
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h4 className="font-bold text-slate-900 text-xl lg:text-2xl leading-tight group-hover:text-blue-600 transition-colors duration-200">
                    {cert.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span 
                    className={`text-sm font-bold px-4 py-2 rounded-xl bg-gradient-to-r ${cert.color} text-white shadow-md`}
                  >
                    {cert.issuer}
                  </span>
                  <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                    <span>{cert.date}</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-green-600">Verified</span>
                  </div>
                </div>
              </div>
              
              {/* Verify Button and Credential ID - Stacked */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r ${cert.color} text-white hover:shadow-lg transition-all duration-200 group/btn`}
                >
                  <span>Verify</span>
                  <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                </a>
                
                {/* Credential ID - Below Verify Button */}
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-slate-400 font-mono font-bold">
                    ID: {cert.credentialId}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              {cert.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

const Certifications = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Memoize certifications data to prevent unnecessary re-renders
  const certifications = useMemo(() => [
    {
      name: 'Java Basics',
      issuer: 'HackerRank',
      date: 'Feb 2022',
      credentialId: 'c5f910554a95',
      url: 'https://www.hackerrank.com/certificates/c5f910554a95',
      description: 'Java programming fundamentals and best practices',
      category: 'programming',
      skills: ['Java', 'OOP', 'Problem Solving'],
      color: 'from-green-500 to-emerald-600',
      logoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQE8MivsmbT7Ig/company-logo_100_100/company-logo_100_100/0/1705561459405/hackerrank_logo?e=1756339200&v=beta&t=JQHGRk1yz2pV9ZCic7_0sZlDPsa9mUfdC7k0F3Zg6xo'
    },
    {
      name: 'Microservices: Designing Highly Scalable Systems',
      issuer: 'Udemy',
      date: 'Feb 2022',
      credentialId: 'UC-f2bd3b85-1921-4f98-9562-8d5c28e66b5a',
      url: 'https://www.udemy.com/certificate/UC-f2bd3b85-1921-4f98-9562-8d5c28e66b5a/',
      description: 'Advanced microservices architecture and design patterns',
      category: 'architecture',
      skills: ['Microservices', 'System Design', 'Scalability'],
      color: 'from-purple-500 to-indigo-600',
      logoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_100_100/company-logo_100_100/0/1723593046388/udemy_logo?e=1756339200&v=beta&t=yGQ2rf6Txa9gIwq9IofiZ0vpVeD_U1Lrflscinw-jnM'
    },
    {
      name: 'RESTful Microservices Performance Monitoring with Actuators',
      issuer: 'Coursera',
      date: 'Jan 2022',
      credentialId: '542b6a0a04bafa21f25f744bfbd60bc0',
      url: 'https://coursera.org/share/542b6a0a04bafa21f25f744bfbd60bc0',
      description: 'Performance monitoring and observability in microservices',
      category: 'monitoring',
      skills: ['Monitoring', 'Performance', 'Actuators'],
      color: 'from-blue-500 to-cyan-600',
      logoUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1756339200&v=beta&t=6kTnO4ZRabpLNVJmRQK-srFYJyBGXEhPikLTe6WQirQ'
    },
    {
      name: 'Building Scalable Java Microservices with Spring Boot and Spring Cloud',
      issuer: 'Coursera',
      date: 'May 2021',
      credentialId: 'JUGFYT6LR6W7',
      url: 'https://coursera.org/share/2590202cf27fd965c7ee0daada2a0ab8',
      description: 'Enterprise Java microservices with Spring ecosystem',
      category: 'programming',
      skills: ['Spring Boot', 'Spring Cloud', 'Java'],
      color: 'from-green-500 to-teal-600',
      logoUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1756339200&v=beta&t=6kTnO4ZRabpLNVJmRQK-srFYJyBGXEhPikLTe6WQirQ'
    },
    {
      name: 'Google Cloud Platform Fundamentals: Core Infrastructure',
      issuer: 'Coursera',
      date: 'May 2021',
      credentialId: 'KAV3TR3HGH5L',
      url: 'https://coursera.org/share/990968e31867ef5e3e2c285053d79acf',
      description: 'Cloud infrastructure and GCP services fundamentals',
      category: 'cloud',
      skills: ['GCP', 'Cloud Infrastructure', 'DevOps'],
      color: 'from-red-500 to-orange-600',
      logoUrl: 'https://media.licdn.com/dms/image/v2/C4D0BAQGexnfBxeEG-g/company-logo_100_100/company-logo_100_100/0/1630530042036/coursera_logo?e=1756339200&v=beta&t=6kTnO4ZRabpLNVJmRQK-srFYJyBGXEhPikLTe6WQirQ'
    },
    {
      name: 'Basics of Kubernetes Development',
      issuer: 'Udemy',
      date: 'Apr 2021',
      credentialId: 'UC-693b0b6a-8834-4c72-9152-3be1b4500185',
      url: 'https://www.udemy.com/certificate/UC-693b0b6a-8834-4c72-9152-3be1b4500185/',
      description: 'Container orchestration and Kubernetes fundamentals',
      category: 'devops',
      skills: ['Kubernetes', 'Containers', 'Orchestration'],
      color: 'from-indigo-500 to-purple-600',
      logoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_100_100/company-logo_100_100/0/1723593046388/udemy_logo?e=1756339200&v=beta&t=yGQ2rf6Txa9gIwq9IofiZ0vpVeD_U1Lrflscinw-jnM'
    },
    {
      name: 'Containerization with Docker',
      issuer: 'Udemy',
      date: 'Apr 2020',
      credentialId: 'UC-9e719c90-a788-4f82-a574-9aca2e3dbbbf',
      url: 'https://www.udemy.com/certificate/UC-9e719c90-a788-4f82-a574-9aca2e3dbbbf/',
      description: 'Docker containerization and deployment strategies',
      category: 'devops',
      skills: ['Docker', 'Containerization', 'Deployment'],
      color: 'from-blue-500 to-indigo-600',
      logoUrl: 'https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_100_100/company-logo_100_100/0/1723593046388/udemy_logo?e=1756339200&v=beta&t=yGQ2rf6Txa9gIwq9IofiZ0vpVeD_U1Lrflscinw-jnM'
    }
  ], [])

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => [
    { id: 'all', label: 'All Certifications', icon: Award, count: certifications.length },
    { id: 'programming', label: 'Programming', icon: Zap, count: certifications.filter(c => c.category === 'programming').length },
    { id: 'cloud', label: 'Cloud & DevOps', icon: TrendingUp, count: certifications.filter(c => ['cloud', 'devops'].includes(c.category)).length },
    { id: 'architecture', label: 'Architecture', icon: Shield, count: certifications.filter(c => c.category === 'architecture').length },
    { id: 'monitoring', label: 'Monitoring', icon: Star, count: certifications.filter(c => c.category === 'monitoring').length }
  ], [certifications])

  // Memoize filtered certifications to prevent unnecessary filtering
  const filteredCertifications = useMemo(() => {
    if (selectedCategory === 'all') return certifications
    if (selectedCategory === 'cloud') return certifications.filter(cert => ['cloud', 'devops'].includes(cert.category))
    return certifications.filter(cert => cert.category === selectedCategory)
  }, [certifications, selectedCategory])

  // Memoize category change handler
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category)
  }, [])

  // Memoize animation variants to prevent recreation
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  }), [])

  return (
    <section 
      id="certifications" 
      className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Optimized Background Elements - Reduced complexity */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-indigo-500/8 via-cyan-500/4 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Ultra-Modern Professional Certifications Section */}
          <motion.div variants={itemVariants} className="mb-20 sm:mb-24">
            <div className="text-center mb-12 sm:mb-16">
              <motion.div 
                className="inline-flex items-center gap-6 mb-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <div className="p-5 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl">
                    <Award size={36} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-3 border-white animate-bounce" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                    Professional <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Certifications</span>
                  </h3>
                  <p className="text-slate-500 text-base sm:text-lg mt-2 font-medium">Verified expertise & continuous learning</p>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-slate-600 max-w-4xl mx-auto text-lg sm:text-xl leading-relaxed mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                Industry-recognized credentials showcasing mastery in cutting-edge technologies, 
                cloud platforms, and modern development practices that drive innovation
              </motion.p>
              
              <motion.div 
                className="flex items-center justify-center gap-3 mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                <div className="w-8 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" />
                <div className="w-4 h-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full" />
              </motion.div>

              {/* Modern Category Filter */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`group relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 border-2 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg'
                          : 'bg-white/80 backdrop-blur-sm text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent size={16} />
                        <span>{category.label}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          selectedCategory === category.id
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {category.count}
                        </span>
                      </div>
                      {selectedCategory === category.id && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl -z-10"
                          layoutId="activeCategory"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>
                  )
                })}
              </motion.div>
            </div>
            
            {/* Individual Certification Tiles */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                {/* Certifications Grid */}
                <div className="grid gap-8 sm:gap-10 overflow-visible">
                  {filteredCertifications.map((cert, index) => (
                    <CertificationCard 
                      key={cert.credentialId} 
                      cert={cert} 
                      index={index} 
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Ultra-Modern Statistics Dashboard */}
            <motion.div 
              className="mt-16 sm:mt-20"
              whileInView={{ scale: [0.9, 1.02, 1] }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-white/90 via-blue-50/50 to-purple-50/50 backdrop-blur-sm rounded-3xl p-10 sm:p-12 border border-slate-200/50 shadow-2xl relative overflow-hidden">
                {/* Enhanced background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full transform -translate-x-30 -translate-y-30 blur-2xl" />
                  <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tl from-indigo-600 to-cyan-600 rounded-full transform translate-x-30 translate-y-30 blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-xl" />
                </div>
                
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <motion.h4 
                      className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4"
                      whileInView={{ opacity: [0, 1], y: [20, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      Certification <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Analytics</span>
                    </motion.h4>
                    <motion.p 
                      className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
                      whileInView={{ opacity: [0, 1], y: [20, 0] }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Measurable commitment to excellence and continuous professional development across diverse technology domains
                    </motion.p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
                    {[
                      { 
                        value: `${filteredCertifications.length}+`, 
                        label: selectedCategory === 'all' ? 'Total Certifications' : 'Filtered Results',
                        color: 'from-blue-600 to-purple-600',
                        icon: Award
                      },
                      { 
                        value: '4', 
                        label: 'Learning Platforms', 
                        color: 'from-green-600 to-emerald-600',
                        icon: TrendingUp
                      },
                      { 
                        value: '5', 
                        label: 'Technology Areas', 
                        color: 'from-indigo-600 to-purple-600',
                        icon: Zap
                      },
                      { 
                        value: '100%', 
                        label: 'Verified Status', 
                        color: 'from-yellow-500 to-orange-500',
                        icon: Shield
                      }
                    ].map((stat, index) => (
                      <motion.div 
                        key={stat.label}
                        className="text-center group cursor-pointer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileInView={{ opacity: [0, 1], y: [30, 0] }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="mb-4">
                          <div className="relative inline-block">
                            <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                              {stat.value}
                            </div>
                            <motion.div 
                              className={`absolute -top-2 -right-2 p-1.5 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.6 }}
                            >
                              <stat.icon size={16} className="text-white" />
                            </motion.div>
                          </div>
                          <div className={`w-12 h-1.5 bg-gradient-to-r ${stat.color} mx-auto rounded-full mt-3 group-hover:w-16 transition-all duration-300`} />
                        </div>
                        <div className="text-slate-600 text-sm sm:text-base font-semibold group-hover:text-slate-900 transition-colors duration-300">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Enhanced achievement badge */}
                  <motion.div 
                    className="mt-10 text-center"
                    whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <motion.div 
                        className="w-3 h-3 bg-green-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-bold text-green-800">All certifications current & verified ✓</span>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <CheckCircle size={18} className="text-green-600" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
