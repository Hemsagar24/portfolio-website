import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MapPin, Calendar, Award, ChevronRight, Edit3, Save, Plus, X, Trash2 } from 'lucide-react'

const Experience = ({ experienceData = [], onUpdateExperience, showNotification, isAdminMode = false }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)  
  const [experiences, setExperiences] = useState(experienceData)

  // Update local state when props change
  useEffect(() => {
    setExperiences(experienceData)
  }, [experienceData])

  const [editForm, setEditForm] = useState({
    title: '',
    company: '',
    location: '',
    duration: '',
    period: '',
    current: false,
    achievements: [''],
    technologies: [''],
    color: 'from-blue-500 to-purple-600',
    highlight: ''
  })

  // Handle adding new experience
  const handleAddExperience = () => {
    setEditForm({
      title: '',
      company: '',
      location: '',
      duration: '',
      period: '',
      current: false,
      achievements: [''],
      technologies: [''],
      color: 'from-blue-500 to-purple-600',
      highlight: ''
    })
    setEditingIndex('new')
    setIsEditing(true)
  }

  // Handle editing existing experience
  const handleEditExperience = (index) => {
    setEditForm({ ...experiences[index] })
    setEditingIndex(index)
    setIsEditing(true)
  }

  // Handle saving experience
  const handleSaveExperience = async () => {
    let updatedExperiences;
    
    if (editingIndex === 'new') {
      const newExperience = {
        ...editForm,
        id: Date.now()
      }
      updatedExperiences = [newExperience, ...experiences]
    } else {
      updatedExperiences = [...experiences]
      updatedExperiences[editingIndex] = editForm
    }
    
    // Update local state first
    setExperiences(updatedExperiences)
    
    // Update parent state (saves to localStorage automatically)
    if (onUpdateExperience) {
      onUpdateExperience(updatedExperiences)
    }
    
    // Save to JSX file
    await saveExperiencesToFile(updatedExperiences)
    
    // Show notification if available
    if (showNotification) {
      showNotification(
        editingIndex === 'new' ? 'Experience added and saved to file!' : 'Experience updated and saved to file!',
        'success'
      )
    }
    
    setIsEditing(false)
    setEditingIndex(null)
  }

  // Handle canceling edit
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditingIndex(null)
  }

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle array field changes (achievements, technologies)
  const handleArrayChange = (field, index, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  // Add new item to array field
  const addArrayItem = (field) => {
    setEditForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  // Remove item from array field
  const removeArrayItem = (field, index) => {
    setEditForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  // Handle deleting experience
  const handleDeleteExperience = async (index) => {
    const expToDelete = experiences[index]
    if (window.confirm(`Are you sure you want to delete "${expToDelete.title}" at "${expToDelete.company}"?`)) {
      const updatedExperiences = experiences.filter((_, i) => i !== index)
      setExperiences(updatedExperiences)
      
      // Update parent state (saves to localStorage automatically)
      if (onUpdateExperience) {
        onUpdateExperience(updatedExperiences)
      }
      
      // Save to JSX file
      await saveExperiencesToFile(updatedExperiences)
      
      // Show notification if available
      if (showNotification) {
        showNotification('Experience deleted and saved to file!', 'success')
      }
    }
  }

  // Save experiences to JSX file
  const saveExperiencesToFile = async (experiencesData) => {
    try {
      const response = await fetch('http://localhost:3001/api/save-experiences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ experiences: experiencesData }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to save experiences')
      }
      
      console.log('✅ Experiences saved successfully to JSX file')
      
    } catch (error) {
      console.error('❌ Error saving experiences to file:', error)
      
      // Show error notification if available
      if (showNotification) {
        showNotification('⚠️ Saved to localStorage but failed to save to file. Start the file server on port 3001.', 'error')
      }
    }
  }

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="experience" className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 text-center">
                Work <span className="gradient-text">Experience</span>
              </h2>
              {isAdminMode && (
                <button
                  onClick={handleAddExperience}
                  className="bg-primary-600 text-white p-1.5 sm:p-2 rounded-lg hover:bg-primary-700 transition-colors flex-shrink-0"
                  title="Add New Experience"
                >
                  <Plus size={14} className="sm:hidden" />
                  <Plus size={16} className="hidden sm:block lg:hidden" />
                  <Plus size={20} className="hidden lg:block" />
                </button>
              )}
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
              A journey through impactful roles, building scalable systems and driving innovation
            </p>
            <div className="w-12 sm:w-16 lg:w-20 xl:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full mt-3 sm:mt-4 lg:mt-6" />
          </motion.div>

          {/* Career Highlights Summary */}
          <motion.div variants={itemVariants} className="mb-8 sm:mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                <Award className="text-blue-600" size={24} />
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Career Highlights</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 mb-1">6+</div>
                  <div className="text-sm sm:text-base text-gray-700">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-1">3</div>
                  <div className="text-sm sm:text-base text-gray-700">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-1">1000+</div>
                  <div className="text-sm sm:text-base text-gray-700">TPS Achieved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-indigo-600 mb-1">2</div>
                  <div className="text-sm sm:text-base text-gray-700">Employee Awards</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">

            {/* Edit Form Modal */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 w-full max-w-xs sm:max-w-lg lg:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-4"
                >
                  <div className="flex justify-between items-center mb-3 sm:mb-4 lg:mb-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold">
                      {editingIndex === 'new' ? 'Add New Experience' : 'Edit Experience'}
                    </h3>
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <X size={18} className="sm:hidden" />
                      <X size={20} className="hidden sm:block lg:hidden" />
                      <X size={24} className="hidden lg:block" />
                    </button>
                  </div>

                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={editForm.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm lg:text-base"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={editForm.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm lg:text-base"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={editForm.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm lg:text-base"
                      />
                      <input
                        type="text"
                        placeholder="Duration (e.g., May 2022 - Present)"
                        value={editForm.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm lg:text-base"
                      />
                      <input
                        type="text"
                        placeholder="Period (e.g., 2+ years)"
                        value={editForm.period}
                        onChange={(e) => handleInputChange('period', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm lg:text-base"
                      />
                      <select
                        value={editForm.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm lg:text-base"
                      >
                        <option value="from-blue-500 to-purple-600">Blue to Purple</option>
                        <option value="from-green-500 to-teal-600">Green to Teal</option>
                        <option value="from-orange-500 to-red-600">Orange to Red</option>
                        <option value="from-pink-500 to-rose-600">Pink to Rose</option>
                        <option value="from-indigo-500 to-purple-600">Indigo to Purple</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Highlight (optional)"
                      value={editForm.highlight}
                      onChange={(e) => handleInputChange('highlight', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm lg:text-base"
                    />

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="current"
                        checked={editForm.current}
                        onChange={(e) => handleInputChange('current', e.target.checked)}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600"
                      />
                      <label htmlFor="current" className="text-xs sm:text-sm font-medium">Current Position</label>
                    </div>

                    {/* Achievements */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-xs sm:text-sm">Achievements</label>
                        <button
                          onClick={() => addArrayItem('achievements')}
                          className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm"
                        >
                          + Add Achievement
                        </button>
                      </div>
                      {editForm.achievements.map((achievement, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <textarea
                            value={achievement}
                            onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                            placeholder="Describe your achievement..."
                            className="flex-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-xs sm:text-sm"
                            rows="2"
                          />
                          {editForm.achievements.length > 1 && (
                            <button
                              onClick={() => removeArrayItem('achievements', index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <X size={16} className="sm:hidden" />
                              <X size={20} className="hidden sm:block" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="font-medium text-xs sm:text-sm">Technologies</label>
                        <button
                          onClick={() => addArrayItem('technologies')}
                          className="text-primary-600 hover:text-primary-700 text-xs sm:text-sm"
                        >
                          + Add Technology
                        </button>
                      </div>
                      {editForm.technologies.map((tech, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={tech}
                            onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
                            placeholder="Technology name"
                            className="flex-1 border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm"
                          />
                          {editForm.technologies.length > 1 && (
                            <button
                              onClick={() => removeArrayItem('technologies', index)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <X size={16} className="sm:hidden" />
                              <X size={20} className="hidden sm:block" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-3 sm:pt-4">
                      <button
                        onClick={handleSaveExperience}
                        className="flex items-center justify-center gap-2 bg-primary-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-xs sm:text-sm"
                      >
                        <Save size={14} className="sm:hidden" />
                        <Save size={16} className="hidden sm:block" />
                        Save Experience
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center justify-center gap-2 bg-gray-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-xs sm:text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Experience Items */}
            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Content Card - Full width simple layout */}
                  <motion.div
                    className="w-full max-w-6xl mx-auto"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="card-hover group relative">

                      {/* Header */}
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 mb-1 sm:mb-2 group-hover:text-primary-600 transition-colors">
                            {exp.title}
                          </h3>
                          <h4 className={`text-sm sm:text-base font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-1 sm:mb-2`}>
                            {exp.company}
                          </h4>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          {exp.current && (
                            <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Current
                            </span>
                          )}
                          {isAdminMode && (
                            <div className="flex items-center gap-0.5 sm:gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleEditExperience(index)}
                                className="p-1 sm:p-2 text-gray-400 hover:text-primary-600 transition-colors"
                                title="Edit Experience"
                              >
                                <Edit3 size={14} className="sm:hidden" />
                                <Edit3 size={16} className="hidden sm:block" />
                              </button>
                              <button
                                onClick={() => handleDeleteExperience(index)}
                                className="p-1 sm:p-2 text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete Experience"
                              >
                                <Trash2 size={14} className="sm:hidden" />
                                <Trash2 size={16} className="hidden sm:block" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} className="sm:hidden" />
                          <Calendar size={14} className="hidden sm:block lg:hidden" />
                          <Calendar size={16} className="hidden lg:block" />
                          <span className="text-xs sm:text-sm">{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} className="sm:hidden" />
                          <MapPin size={14} className="hidden sm:block lg:hidden" />
                          <MapPin size={16} className="hidden lg:block" />
                          <span className="text-xs sm:text-sm">{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award size={12} className="sm:hidden" />
                          <Award size={14} className="hidden sm:block lg:hidden" />
                          <Award size={16} className="hidden lg:block" />
                          <span className="text-xs sm:text-sm">{exp.period}</span>
                        </div>
                      </div>

                      {/* Highlight */}
                      {exp.highlight && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="text-blue-600" size={16} />
                            <span className="text-blue-700 font-semibold text-xs sm:text-sm">🏆 Recognition</span>
                          </div>
                          <p className="text-sm sm:text-base font-medium text-blue-800">{exp.highlight}</p>
                        </div>
                      )}

                      {/* Achievements - Enhanced Visibility */}
                      <div className="mb-6 sm:mb-7 lg:mb-8">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                          <Award className="text-blue-600" size={18} />
                          <h5 className="font-bold text-neutral-900 text-base sm:text-lg">Key Achievements</h5>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 sm:p-5 shadow-sm">
                          <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
                            
                            <ul className="space-y-3 sm:space-y-4">
                              {exp.achievements.map((achievement, idx) => (
                                <motion.li
                                  key={idx}
                                  className="relative flex items-start gap-4 text-neutral-800 text-sm sm:text-base leading-relaxed group"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                >
                                  {/* Dot */}
                                  <motion.div 
                                    className="relative z-10 w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex-shrink-0 mt-0.5 shadow-sm"
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                                  </motion.div>
                                  <motion.span 
                                    className="cursor-pointer"
                                    whileHover={{ 
                                      x: 12,
                                      scale: 1.02,
                                      color: "#2563eb",
                                      transition: { duration: 0.2 }
                                    }}
                                  >
                                    {achievement.split('**').map((part, partIdx) => 
                                      partIdx % 2 === 1 ? (
                                        <strong key={partIdx} className="font-bold text-blue-700">{part}</strong>
                                      ) : (
                                        <span key={partIdx} className="font-normal">{part}</span>
                                      )
                                    )}
                                  </motion.span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 className="font-semibold text-neutral-900 mb-2 sm:mb-3 text-sm sm:text-base">Technologies:</h5>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium hover:bg-primary-100 hover:text-primary-700 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-12 sm:mt-16 lg:mt-20 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2">6+</div>
                <div className="text-neutral-600 text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2">3</div>
                <div className="text-neutral-600 text-xs sm:text-sm">Companies</div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2">15+</div>
                <div className="text-neutral-600 text-xs sm:text-sm">Major Projects</div>
              </div>
              <div className="p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text mb-1 sm:mb-2">100%</div>
                <div className="text-neutral-600 text-xs sm:text-sm">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
