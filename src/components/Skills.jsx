import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code2, 
  Rocket, 
  Monitor, 
  Layers, 
  Cloud,
  Edit,
  Plus,
  X,
  Check
} from 'lucide-react'

// Technology icons from react-icons
import {
  SiSpringboot,
  SiApachekafka,
  SiMysql,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiJenkins,
  SiSplunk,
  SiGrafana,
  SiLinux,
  SiGooglecloud,
  SiNewrelic
} from 'react-icons/si'
import { 
  FaDatabase,
  FaCode,
  FaServer,
  FaChartLine,
  FaCloud,
  FaCogs,
  FaJava
} from 'react-icons/fa'

// Technology icons mapping with React Icons
const TechIcons = {
  // Development
  'Java8': FaJava,
  'Java 8': FaJava, 
  'Spring boot': SiSpringboot,
  'Spring Boot': SiSpringboot,
  'Spring Reactive': SiSpringboot,
  'Kafka': SiApachekafka,
  'Azure Cosmos': FaCloud,
  'Azure Cosmos DB': FaCloud,
  'MySQL/MariaDB': SiMysql,
  'Jersey': FaCode,
  'JPA': FaDatabase,
  'Thymeleaf': FaCode,
  'Git': SiGit,
  
  // Deployment
  'Docker and Kubernetes': SiDocker,
  'Docker': SiDocker,
  'Kubernetes': SiKubernetes,
  'Jenkins (CI)': SiJenkins,
  'Concord (CD)': FaServer,
  
  // Monitoring
  'Splunk': SiSplunk,
  'Kibana': FaChartLine,
  'Grafana': SiGrafana,
  'New Relic': SiNewrelic,
  'Azure portal': FaCloud,
  'Azure Portal': FaCloud,
  'Linux': SiLinux,
  
  // Architecture
  'Microservice': FaCogs,
  'Microservices': FaCogs,
  'Monolith': FaServer,
  'Active-Active': FaCogs,
  
  // Cloud
  'Azure': FaCloud,
  'Microsoft Azure': FaCloud,
  'GCP': SiGooglecloud,
  'Google Cloud Platform': SiGooglecloud
}

const Skills = ({ techStack = {}, onEditTechCategory, editingTechCategory, setEditingTechCategory, isAdminMode = false }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [newTech, setNewTech] = useState('')

  // Convert the flat techStack structure to categorized skills
  const skillCategories = {
    dev: {
      title: 'Development',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      skills: techStack.dev || []
    },
    deployment: {
      title: 'Deployment',
      icon: Rocket,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      skills: techStack.deployment || []
    },
    monitoring: {
      title: 'Monitoring',
      icon: Monitor,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      skills: techStack.monitoring || []
    },
    architecture: {
      title: 'Architecture',
      icon: Layers,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      skills: techStack.architecture || []
    },
    cloud: {
      title: 'Cloud',
      icon: Cloud,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      skills: techStack.cloud || []
    }
  }

  const handleAddTech = (category) => {
    if (newTech.trim() && onEditTechCategory) {
      onEditTechCategory(category, [...skillCategories[category].skills, newTech.trim()])
      setNewTech('')
    }
  }

  const handleRemoveTech = (category, techToRemove) => {
    if (onEditTechCategory) {
      const updatedSkills = skillCategories[category].skills.filter(tech => tech !== techToRemove)
      onEditTechCategory(category, updatedSkills)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section id="skills" className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-blue-50/20" />
      
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
              Tech <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
              Technologies and tools I use to build scalable, high-performance applications
            </p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-4 sm:mt-6" />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Object.entries(skillCategories).map(([categoryKey, category]) => {
              const IconComponent = category.icon
              const isEditing = editingTechCategory === categoryKey
              
              return (
                <motion.div
                  key={categoryKey}
                  variants={itemVariants}
                  className={`${category.bgColor} rounded-xl p-6 relative group transition-all duration-300 hover:shadow-lg border border-gray-100`}
                >
                  {/* Edit Button - Only visible in admin mode */}
                  {onEditTechCategory && isAdminMode && (
                    <button
                      onClick={() => setEditingTechCategory(isEditing ? null : categoryKey)}
                      className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-2 rounded-lg text-sm transition-all ${
                        isEditing 
                          ? 'bg-gray-100 text-gray-600 opacity-100' 
                          : `${category.bgColor} ${category.textColor} hover:bg-opacity-80`
                      }`}
                      title={isEditing ? 'Stop Editing' : `Edit ${category.title}`}
                    >
                      {isEditing ? <X size={16} /> : <Edit size={16} />}
                    </button>
                  )}

                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} shadow-lg`}>
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {isEditing ? (
                      /* Edit Mode */
                      <div className="space-y-2">
                        {category.skills.map((skill, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              {React.createElement(TechIcons[skill] || FaCode, { 
                                className: "text-gray-600",
                                size: 16 
                              })}
                              <span className="text-sm font-medium text-gray-700">{skill}</span>
                            </div>
                            <button
                              onClick={() => handleRemoveTech(categoryKey, skill)}
                              className="text-red-500 hover:text-red-700 p-1"
                              title="Remove"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        
                        {/* Add New Tech */}
                        <div className="flex gap-2 mt-3">
                          <input
                            type="text"
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            placeholder="Add new technology..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddTech(categoryKey)}
                          />
                          <button
                            onClick={() => handleAddTech(categoryKey)}
                            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            title="Add"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Mode */
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                          >
                            {React.createElement(TechIcons[skill] || FaCode, { 
                              className: `${category.textColor}`,
                              size: 16 
                            })}
                            <span className="text-sm font-medium text-gray-700">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Summary Section */}
          <motion.div
            variants={itemVariants}
            className="mt-12 sm:mt-16"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 sm:p-8 text-center border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Technology Overview
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {Object.values(skillCategories).reduce((acc, cat) => acc + cat.skills.length, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Technologies</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {Object.keys(skillCategories).length}
                  </div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">6+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
