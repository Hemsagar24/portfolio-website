import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code2, 
  Award,
  Plus,
  X,
  Save,
  Edit3,
  Trash2
} from 'lucide-react'

const Projects = ({ isAdminMode = false }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  
  // Initial projects data
  const initialProjects = [
    {
      id: 1,
      title: 'Walmart Messaging Platform',
      company: 'Walmart Global Tech India',
      description: 'Messaging platform for health & wellness clients handling 1000+ TPS with fault-tolerant architecture.',
      category: 'enterprise',
      technologies: ['Java 8', 'Spring Boot', 'Kafka', 'Azure', 'Microservices'],
      achievements: [
        'Achieved **1000+ TPS** with optimized **Kafka partitioning**',
        'Implemented **Active-Active architecture** across dual regions',
        'Zero data loss with **DLQ replay mechanism**'
      ],
      status: 'Production',
      year: '2022-Present',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      title: 'Rakuten Payments Gateway',
      company: 'Rakuten India',
      description: 'API Gateway for Rakuten Payments with PHP to Java migration and dynamic UI rendering.',
      category: 'fintech',
      technologies: ['Java', 'PHP', 'Thymeleaf', 'API Gateway', 'Spring Boot'],
      achievements: [
        'Successfully migrated legacy **PHP codebase to Java**',
        'Developed **dynamic UI rendering** with Thymeleaf',
        'Received **Employee of the Month** recognition'
      ],
      status: 'Completed',
      year: '2019-2022',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Business Intelligence ETL Pipeline',
      company: 'Ikyam Solutions',
      description: 'ETL data pipeline system collecting and processing data from multiple sources for BI analytics.',
      category: 'data',
      technologies: ['Core Java', 'Spring Boot', 'MySQL', 'MongoDB', 'Elasticsearch'],
      achievements: [
        'Automated **data collection** from multiple sources',
        'Built **REST APIs** for BI tool integration',
        'Implemented **scheduled CRON job** processing'
      ],
      status: 'Completed',
      year: '2018-2019',
      color: 'from-orange-500 to-red-600'
    }
  ]

  // Load projects from localStorage or use initial data
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('portfolio-projects')
    return savedProjects ? JSON.parse(savedProjects) : initialProjects
  })

  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    category: 'other',
    technologies: '',
    achievements: '',
    status: 'In Progress',
    year: new Date().getFullYear().toString(),
    color: 'from-purple-500 to-pink-600'
  })

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects))
  }, [projects])

  // Function to open modal for adding new project
  const openAddModal = () => {
    setEditingProject(null)
    setFormData({
      title: '',
      company: '',
      description: '',
      category: 'other',
      technologies: '',
      achievements: '',
      status: 'In Progress',
      year: new Date().getFullYear().toString(),
      color: 'from-purple-500 to-pink-600'
    })
    setShowModal(true)
  }

  // Function to open modal for editing existing project
  const openEditModal = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      company: project.company,
      description: project.description,
      category: project.category,
      technologies: project.technologies.join(', '),
      achievements: project.achievements.join('\n'),
      status: project.status,
      year: project.year,
      color: project.color
    })
    setShowModal(true)
  }

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      achievements: formData.achievements.split('\n').map(achievement => achievement.trim()).filter(achievement => achievement)
    }

    if (editingProject) {
      // Update existing project
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...projectData }
          : project
      ))
    } else {
      // Add new project
      const newProject = {
        id: Date.now(),
        ...projectData
      }
      setProjects(prev => [...prev, newProject])
    }

    setShowModal(false)
  }

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Function to delete a project
  const deleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId))
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
    <section id="projects" className="py-12 sm:py-16 lg:py-20 xl:py-32 bg-neutral-50 relative overflow-hidden">
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
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              {isAdminMode && (
                <button
                  onClick={openAddModal}
                  className="bg-primary-600 text-white p-1.5 sm:p-2 rounded-lg hover:bg-primary-700 transition-colors flex-shrink-0"
                  title="Add New Project"
                >
                  <Plus size={14} className="sm:hidden" />
                  <Plus size={16} className="hidden sm:block lg:hidden" />
                  <Plus size={20} className="hidden lg:block" />
                </button>
              )}
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
              Showcase of impactful projects spanning enterprise systems, fintech solutions, and data analytics
            </p>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-primary-600 to-purple-600 mx-auto rounded-full mt-4 sm:mt-6" />
          </motion.div>          {/* Projects Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                className="card-hover group"
              >
                {/* Project Card */}
                <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-300 transition-all duration-300 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-neutral-500 text-sm">{project.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm text-neutral-600 mb-1">{project.company}</p>
                    </div>
                    
                    {/* Visual Element and Edit Button */}
                    <div className="flex items-center gap-2">
                      {isAdminMode && (
                        <>
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                        <Code2 size={20} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-700 leading-relaxed text-sm mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Key Achievements - Timeline Style */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2 text-sm">
                      <Award size={14} className="text-primary-600" />
                      Key Achievements
                    </h4>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 shadow-sm">
                      <div className="relative">
                        <ul className="space-y-2">
                          {project.achievements.slice(0, 3).map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              className="relative flex items-start gap-3 text-neutral-800 text-xs leading-relaxed group"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              {/* Dot */}
                              <motion.div 
                                className="relative z-10 w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex-shrink-0 mt-0.5 shadow-sm"
                                whileHover={{ scale: 1.2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                              </motion.div>
                              <motion.span 
                                className="cursor-pointer flex-1"
                                whileHover={{ 
                                  x: 8,
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
                          {project.achievements.length > 3 && (
                            <li className="relative flex items-start gap-3 text-xs text-neutral-500 ml-6">
                              +{project.achievements.length - 3} more achievements
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2 text-sm">Technologies</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-medium hover:bg-primary-100 hover:text-primary-600 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-neutral-200 text-neutral-500 rounded-full text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
              ))}
            </motion.div>
        </motion.div>

        {/* Modal for Adding/Editing Projects */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-neutral-900">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="enterprise">Enterprise</option>
                        <option value="fintech">Fintech</option>
                        <option value="data">Data</option>
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Production">Production</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="e.g., 2024 or 2023-2024"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Technologies
                    </label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="React, Node.js, MongoDB (comma separated)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Key Achievements
                    </label>
                    <textarea
                      name="achievements"
                      value={formData.achievements}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter each achievement on a new line. Use **text** for bold formatting."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Color Theme
                    </label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="from-blue-500 to-purple-600">Blue to Purple</option>
                      <option value="from-green-500 to-teal-600">Green to Teal</option>
                      <option value="from-orange-500 to-red-600">Orange to Red</option>
                      <option value="from-purple-500 to-pink-600">Purple to Pink</option>
                      <option value="from-indigo-500 to-purple-600">Indigo to Purple</option>
                      <option value="from-cyan-500 to-blue-600">Cyan to Blue</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-neutral-600 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
                    >
                      <Save size={16} />
                      {editingProject ? 'Update Project' : 'Add Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
