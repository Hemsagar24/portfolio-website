import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code2, Users, Zap, Target } from 'lucide-react'

const About = ({ isAdminMode = false }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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

  const highlights = [
    {
      icon: Code2,
      title: 'Technical Excellence',
      description: 'Expert in Java, Spring Boot, microservices, and cloud-native architectures',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Scale Impact',
      description: 'Building systems that serve millions of users with high availability',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Achieved 1000+ TPS with optimized Kafka partitioning strategies',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Target,
      title: 'Problem Solving',
      description: 'Known for troubleshooting complex issues and delivering solutions',
      color: 'from-green-500 to-teal-500',
    },
  ]

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4 lg:mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 lg:mb-20">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-900 leading-tight">
                Passionate about building scalable, distributed systems
              </h3>
              
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
                <p>
                  I'm a passionate Software Development Engineer with a strong background in 
                  building scalable, distributed systems that serve millions of users globally. 
                  My expertise lies in microservice architecture, cloud-native development, 
                  and performance optimization.
                </p>
                
                <p>
                  Currently working at <span className="font-semibold text-primary-600">Walmart Global Tech India</span>, 
                  I specialize in building messaging platforms and implementing fault-tolerant 
                  systems with Active-Active architecture. I'm known for troubleshooting 
                  complex issues, optimizing code performance, and leading projects from 
                  conception to production.
                </p>
                
                <p>
                  My goal is to contribute to the development of distributed and scalable 
                  applications serving millions of users globally, while continuously 
                  learning and staying at the forefront of technology innovation.
                </p>
              </div>

              {/* Core Values */}
              <motion.div
                variants={itemVariants}
                className="pt-4 sm:pt-6 border-t border-neutral-200"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-3 sm:mb-4">Core Values</h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {['Innovation', 'Quality', 'Scalability', 'Reliability', 'Collaboration'].map((value) => (
                    <span
                      key={value}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-primary-100 text-primary-700 rounded-full text-xs sm:text-sm font-medium"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Highlights Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="card-hover group p-4 sm:p-6"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${highlight.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <highlight.icon className="text-white" size={20} />
                  </div>
                  
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                    {highlight.title}
                  </h4>
                  
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Achievement Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pt-8 sm:pt-12 border-t border-neutral-200"
          >
            <div className="text-center">
              <motion.div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                6+
              </motion.div>
              <div className="text-neutral-600 text-xs sm:text-sm lg:text-base">Years Experience</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                1000+
              </motion.div>
              <div className="text-neutral-600 text-xs sm:text-sm lg:text-base">TPS Achieved</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                3
              </motion.div>
              <div className="text-neutral-600 text-xs sm:text-sm lg:text-base">Companies</div>
            </div>
            
            <div className="text-center">
              <motion.div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-1 sm:mb-2"
                whileInView={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Millions
              </motion.div>
              <div className="text-neutral-600 text-xs sm:text-sm lg:text-base">Users Served</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
