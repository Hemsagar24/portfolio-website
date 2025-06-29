import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Send,
  CheckCircle,
  Clock,
  MessageCircle
} from 'lucide-react'

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [copiedItem, setCopiedItem] = useState(null)

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'career.hemsagar@gmail.com',
      href: 'mailto:career.hemsagar@gmail.com',
      color: 'from-red-500 to-pink-500',
      description: 'Send me an email'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7008 132 194',
      href: 'tel:+917008132194',
      color: 'from-green-500 to-emerald-500',
      description: 'Give me a call'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/hemsagar2411',
      href: 'https://www.linkedin.com/in/hemsagar2411',
      color: 'from-blue-500 to-cyan-500',
      description: 'Connect professionally',
      external: true
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bengaluru, Karnataka',
      href: null,
      color: 'from-purple-500 to-indigo-500',
      description: 'Based in India'
    }
  ]

  const handleCopyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItem(label)
      setTimeout(() => setCopiedItem(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

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

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Ready to build something amazing together? I'd love to hear about your project 
              and discuss how I can contribute to your team's success.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  Let's Connect
                </h3>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  I'm always interested in hearing about new opportunities, 
                  especially ambitious or large scale projects. Whether you have 
                  a project in mind or just want to chat about technology, feel free to reach out.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid gap-4">
                {contactInfo.map((contact) => (
                  <motion.div
                    key={contact.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group"
                  >
                    <div className="card-hover cursor-pointer" onClick={() => {
                      if (contact.href) {
                        if (contact.external) {
                          window.open(contact.href, '_blank', 'noopener,noreferrer')
                        } else {
                          window.location.href = contact.href
                        }
                      } else {
                        handleCopyToClipboard(contact.value, contact.label)
                      }
                    }}>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${contact.color} group-hover:scale-110 transition-transform duration-200`}>
                          <contact.icon className="text-white" size={24} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                            {contact.label}
                          </h4>
                          <p className="text-neutral-600 group-hover:text-neutral-700 transition-colors">
                            {contact.value}
                          </p>
                          <p className="text-sm text-neutral-500">
                            {contact.description}
                          </p>
                        </div>

                        <div className="text-neutral-400 group-hover:text-primary-600 transition-colors">
                          {copiedItem === contact.label ? (
                            <CheckCircle size={20} className="text-green-500" />
                          ) : contact.href ? (
                            <Send size={20} />
                          ) : (
                            <MessageCircle size={20} />
                          )}
                        </div>
                      </div>
                      
                      {copiedItem === contact.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 text-sm text-green-600 font-medium"
                        >
                          Copied to clipboard!
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Availability Status */}
              <motion.div
                variants={itemVariants}
                className="bg-green-50 border border-green-200 rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <h4 className="font-semibold text-green-800">Currently Available</h4>
                </div>
                <p className="text-green-700">
                  I'm currently open to new opportunities and interesting projects. 
                  Let's discuss how I can help bring your ideas to life.
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Main CTA Card */}
              <div className="card bg-gradient-to-br from-primary-600 to-purple-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-pattern opacity-10" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">
                    Ready to Start Your Next Project?
                  </h3>
                  <p className="text-primary-100 leading-relaxed mb-6">
                    With 6+ years of experience building scalable systems for millions of users, 
                    I'm ready to tackle your most challenging technical problems.
                  </p>
                  
                  <div className="space-y-4">
                    <motion.a
                      href="mailto:career.hemsagar@gmail.com"
                      className="btn-secondary w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Mail size={20} />
                      Send Email
                    </motion.a>
                    
                    <motion.a
                      href="https://www.linkedin.com/in/hemsagar2411"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Linkedin size={20} />
                      Connect on LinkedIn
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card text-center">
                  <Clock className="text-primary-600 mx-auto mb-2" size={24} />
                  <div className="font-bold text-lg text-neutral-900">24h</div>
                  <div className="text-sm text-neutral-600">Response Time</div>
                </div>
                
                <div className="card text-center">
                  <MessageCircle className="text-green-600 mx-auto mb-2" size={24} />
                  <div className="font-bold text-lg text-neutral-900">100%</div>
                  <div className="text-sm text-neutral-600">Response Rate</div>
                </div>
              </div>

              {/* Expertise Highlight */}
              <div className="card">
                <h4 className="font-semibold text-neutral-900 mb-4">What I Bring to Your Team</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>6+ years of enterprise software development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>Expertise in microservices and cloud architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>Proven track record with high-scale systems</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span>Strong problem-solving and optimization skills</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
