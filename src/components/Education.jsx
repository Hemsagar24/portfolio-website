import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  GraduationCap, 
  Calendar, 
  MapPin, 
  BookOpen, 
  CheckCircle,
  TrendingUp
} from 'lucide-react'

// Company logo component
const CompanyLogo = ({ src, alt, size = 16, className = "" }) => (
  <img 
    src={src} 
    alt={alt} 
    width={size} 
    height={size} 
    className={`${className} object-contain`}
    style={{ width: size, height: size }}
  />
)

const Education = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [hoveredCard, setHoveredCard] = useState(null)

  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      institution: 'Biju Patnaik University Of Technology',
      location: 'Odisha, India',
      duration: 'Mar 2012 - Apr 2016',
      period: '4 years',
      type: 'Degree',
      category: 'academic',
      description: 'Comprehensive engineering education covering fundamental computer science concepts, programming, and system design.',
      highlights: ['Computer Science Fundamentals', 'Software Engineering', 'Data Structures & Algorithms', 'System Design'],
      grade: 'First Class',
      color: 'from-blue-500 to-indigo-600',
      icon: GraduationCap,
      logoUrl: 'https://media.licdn.com/dms/image/v2/C4E0BAQEaduRrmJ3icw/company-logo_100_100/company-logo_100_100/0/1631329181773?e=1756339200&v=beta&t=RsZHNjGuopf_R6XB6gCuSLD9SbxGbH7nqFQqsZ3hAE8'
    },
    {
      degree: 'Java, SQL, Spring Framework',
      institution: 'JSpiders Training & Development Centre',
      location: 'Bangalore, Karnataka',
      duration: 'Feb 2017 - Aug 2017',
      period: '6 months',
      type: 'Professional Training',
      category: 'training',
      description: 'Intensive professional training program focused on enterprise Java development and modern frameworks.',
      highlights: ['Enterprise Java', 'Spring Framework', 'Database Design', 'Web Development'],
      grade: 'Distinction',
      color: 'from-green-500 to-emerald-600',
      icon: BookOpen,
      logoUrl: 'https://media.licdn.com/dms/image/v2/C560BAQEVqtIX4bs1RA/company-logo_100_100/company-logo_100_100/0/1672744977770/jspiders___training__development_center_logo?e=1756339200&v=beta&t=FpVU_sXeLvwnP6tGpRkEP6f-s4b4V-rZDPge-KvuRbc'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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

  return (
    <section id="education" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-indigo-500/8 via-cyan-500/4 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/6 to-pink-500/6 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-slow-spin" />
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce delay-1000" />
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400/20 rounded-lg rotate-45 animate-pulse delay-2000" />
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-indigo-400/20 rounded-full animate-bounce delay-3000" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Enhanced Modern Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 sm:mb-20 lg:mb-24">
            <motion.div 
              className="inline-flex items-center gap-6 mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="p-5 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl shadow-2xl">
                  <GraduationCap size={40} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-3 border-white animate-pulse" />
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="text-left">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 tracking-tight">
                  Education & <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Learning</span>
                </h2>
                <p className="text-slate-500 text-base sm:text-lg mt-2 font-medium">Continuous growth through knowledge & innovation</p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              A comprehensive journey through academic excellence and professional development, 
              building the foundation for innovative solutions and technical leadership in the digital age
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center gap-3 mt-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-12 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              <div className="w-8 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full" />
              <div className="w-4 h-1.5 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Modern Education Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-20 sm:mb-24">
            {education.map((edu, index) => (
              <motion.div
                key={edu.institution}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200/50 hover:shadow-3xl hover:border-blue-300/50 transition-all duration-700 relative overflow-hidden">
                  {/* Enhanced floating background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-8 transition-opacity duration-700`} />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/10 to-transparent rounded-full transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-1000" />
                  
                  <div className="relative z-10">
                    {/* Enhanced Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8 mb-8">
                      <motion.div 
                        className="relative"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="p-5 group-hover:scale-110 transition-transform duration-500 w-fit flex items-center justify-center bg-white rounded-3xl shadow-xl border border-slate-100 group-hover:shadow-2xl">
                          {edu.logoUrl ? (
                            <CompanyLogo src={edu.logoUrl} alt={edu.institution} size={56} />
                          ) : (
                            <edu.icon className="text-blue-600" size={56} />
                          )}
                        </div>
                        {/* Enhanced floating indicators */}
                        <div className={`absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r ${edu.color} rounded-full border-3 border-white shadow-lg`} />
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                      </motion.div>
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <motion.span 
                            className={`w-fit px-5 py-2.5 rounded-full text-sm font-bold bg-gradient-to-r ${edu.color} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {edu.type}
                          </motion.span>
                          <div className="flex items-center gap-3 text-slate-500 text-sm">
                            <div className="w-2.5 h-2.5 bg-slate-400 rounded-full" />
                            <span className="font-semibold">{edu.period}</span>
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-semibold text-green-600">{edu.grade}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-500 leading-tight">
                          {edu.degree}
                        </h3>
                        
                        <h4 className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                          {edu.institution}
                        </h4>

                        {/* Skills/Highlights */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {edu.highlights.map((highlight, idx) => (
                            <motion.span
                              key={idx}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-full border border-slate-200 transition-colors duration-200"
                              whileHover={{ scale: 1.05 }}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              {highlight}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Meta Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                      <motion.div 
                        className="flex items-center gap-4 p-4 bg-slate-50/80 hover:bg-blue-50/80 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          <Calendar size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Duration</p>
                          <p className="text-sm font-bold text-slate-900">{edu.duration}</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center gap-4 p-4 bg-slate-50/80 hover:bg-purple-50/80 rounded-2xl border border-slate-100 hover:border-purple-200 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          <MapPin size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Location</p>
                          <p className="text-sm font-bold text-slate-900">{edu.location}</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Description */}
                    <div className="p-6 bg-gradient-to-r from-slate-50/80 to-white/80 rounded-2xl border border-slate-100 group-hover:border-blue-100 transition-all duration-300">
                      <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
                        {edu.description}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced floating decorations */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className={`w-4 h-4 bg-gradient-to-r ${edu.color} rounded-full animate-ping`} />
                  </div>
                  <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                    <CheckCircle size={24} className="text-green-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ultra-Modern Educational Journey Timeline */}
          <motion.div variants={itemVariants} className="mb-20 sm:mb-24">
            <div className="text-center mb-16">
              <motion.div 
                className="inline-flex items-center gap-5 mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 rounded-3xl shadow-2xl">
                    <BookOpen size={32} className="text-white" />
                  </div>
                  <motion.div 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                  Learning <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">Journey</span>
                </h3>
              </motion.div>
              <motion.p 
                className="text-slate-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                A progressive path of academic excellence and professional growth through continuous learning
              </motion.p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Enhanced Timeline Line */}
                <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-600 transform -translate-x-1/2 rounded-full shadow-lg" />
                
                {/* Ultra-Modern Timeline Items */}
                <div className="space-y-16 sm:space-y-20">
                  {[
                    {
                      period: "2012-2016",
                      title: "Foundation Phase",
                      type: "Bachelor's Degree",
                      duration: "4 Years Academic Foundation",
                      description: "Built comprehensive fundamentals in computer science, engineering principles, and analytical thinking that form the core of technical expertise.",
                      color: "from-blue-600 to-indigo-600",
                      side: "left"
                    },
                    {
                      period: "2017",
                      title: "Specialization Phase", 
                      type: "Professional Training",
                      duration: "6 Months Intensive Program",
                      description: "Intensive professional training focused on enterprise technologies, Java ecosystem, and industry-standard development practices.",
                      color: "from-green-600 to-emerald-600",
                      side: "right"
                    },
                    {
                      period: "2018-Present",
                      title: "Mastery Phase",
                      type: "Industry Experience",
                      duration: "6+ Years Professional Growth",
                      description: "Hands-on experience building scalable enterprise systems, leading technical initiatives, and continuous learning through real-world challenges.",
                      color: "from-purple-600 to-indigo-600",
                      side: "left"
                    }
                  ].map((phase, index) => (
                    <motion.div
                      key={phase.period}
                      className={`relative flex flex-col ${phase.side === 'right' ? 'sm:flex-row-reverse' : 'sm:flex-row'} sm:items-center`}
                      whileInView={{ scale: [0.8, 1.05, 1], opacity: [0, 1] }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      {/* Enhanced Timeline Node */}
                      <motion.div 
                        className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-white to-slate-100 rounded-full border-4 border-gradient shadow-xl z-20"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`w-full h-full bg-gradient-to-br ${phase.color} rounded-full shadow-inner`} />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-white"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                        />
                      </motion.div>

                      {/* Content Cards */}
                      <div className={`w-full sm:w-1/2 ${phase.side === 'right' ? 'sm:pl-12' : 'sm:pr-12'} mb-8 sm:mb-0`}>
                        <motion.div 
                          className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-200/50 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
                          whileHover={{ y: -8, scale: 1.02 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <span className="font-bold text-slate-900 text-xl">{phase.period}</span>
                              <motion.span 
                                className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${phase.color} text-white shadow-lg`}
                                whileHover={{ scale: 1.05 }}
                              >
                                {phase.type}
                              </motion.span>
                            </div>
                            <div className="text-slate-500 text-sm font-semibold mb-4">{phase.duration}</div>
                            <h4 className="font-bold text-slate-900 text-lg mb-3">{phase.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{phase.description}</p>
                          </div>
                        </motion.div>
                      </div>

                      {/* Decorative Element */}
                      <div className={`w-full sm:w-1/2 ${phase.side === 'right' ? 'sm:pr-12' : 'sm:pl-12'}`}>
                        <motion.div 
                          className={`p-8 bg-gradient-to-r ${phase.color.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-3xl border border-slate-200/50 backdrop-blur-sm`}
                          whileInView={{ x: [phase.side === 'right' ? 50 : -50, 0], opacity: [0, 1] }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        >
                          <div className="text-center">
                            <motion.div 
                              className={`inline-block p-4 bg-gradient-to-br ${phase.color} rounded-2xl shadow-xl mb-4`}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.8 }}
                            >
                              {index === 0 && <GraduationCap size={24} className="text-white" />}
                              {index === 1 && <BookOpen size={24} className="text-white" />}
                              {index === 2 && <TrendingUp size={24} className="text-white" />}
                            </motion.div>
                            <h5 className="font-bold text-slate-900 mb-2">{phase.title}</h5>
                            <p className="text-slate-600 text-sm">
                              {index === 0 && "Academic Excellence"}
                              {index === 1 && "Professional Training"}
                              {index === 2 && "Industry Leadership"}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ultra-Modern Continuous Learning Philosophy */}
          <motion.div
            variants={itemVariants}
            className="mt-16 sm:mt-20 text-center relative"
          >
            <div className="bg-gradient-to-br from-slate-50/80 via-blue-50/40 to-purple-50/40 backdrop-blur-sm rounded-3xl p-10 sm:p-12 border border-slate-200/50 shadow-2xl relative overflow-hidden">
              {/* Advanced background effects */}
              <div className="absolute inset-0 opacity-5">
                <motion.div 
                  className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full blur-2xl"
                  animate={{ 
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-indigo-600 to-cyan-600 rounded-full blur-2xl"
                  animate={{ 
                    x: [0, -30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                />
              </div>
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-6"
                  whileInView={{ opacity: [0, 1], y: [30, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  Continuous Learning <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Philosophy</span>
                </motion.h3>
                
                <motion.p 
                  className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4 mb-10"
                  whileInView={{ opacity: [0, 1], y: [30, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Technology evolves rapidly, and I believe in continuous learning to stay at the forefront. 
                  Through formal education, professional training, and hands-on experience, I've built a 
                  strong foundation that enables me to adapt and excel in new technological landscapes.
                </motion.p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
                  {[
                    { value: "4", label: "Years Degree", color: "from-blue-600 to-indigo-600", icon: GraduationCap },
                    { value: "6", label: "Months Training", color: "from-green-600 to-emerald-600", icon: BookOpen },
                    { value: "6+", label: "Years Experience", color: "from-purple-600 to-indigo-600", icon: TrendingUp }
                  ].map((stat, index) => (
                    <motion.div 
                      key={stat.label}
                      className="text-center group"
                      whileInView={{ opacity: [0, 1], y: [40, 0] }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="relative inline-block mb-4">
                        <motion.div 
                          className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {stat.value}
                        </motion.div>
                        <motion.div 
                          className={`absolute -top-3 -right-3 p-2 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <stat.icon size={14} className="text-white" />
                        </motion.div>
                      </div>
                      <div className="text-slate-600 text-sm sm:text-base font-semibold group-hover:text-slate-900 transition-colors duration-300">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Education
