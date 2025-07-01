import React from 'react'
import { GraduationCap, Calendar, MapPin } from 'lucide-react'

const Education = ({ isAdminMode }) => {
  const education = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      institution: 'Biju Patnaik University Of Technology',
      location: 'Odisha, India',
      duration: 'Mar 2012 - Apr 2016',
      grade: 'First Class',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      degree: 'Java, SQL, Spring Framework',
      institution: 'JSpiders Training & Development Centre',
      location: 'Bangalore, Karnataka',
      duration: 'Feb 2017 - Aug 2017',
      grade: 'Distinction',
      color: 'from-green-500 to-emerald-600'
    }
  ]

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <GraduationCap size={28} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Education
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Academic foundation and professional training that shaped my technical expertise
          </p>
        </div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Timeline Line */}
            <div className="absolute left-8 top-8 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" style={{height: 'calc(100% - 4rem)'}}></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {education.map((edu, index) => (
                <div key={edu.institution} className="relative flex items-center">
                  {/* Timeline Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${edu.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white`}>
                      <GraduationCap size={24} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className="ml-8 flex-1">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      {/* Background Gradient with Images */}
                      <div className="absolute right-0 top-0 bottom-0 w-2/5">
                        {index === 0 ? (
                          // B.Tech - Engineering/Technology image
                          <div className="h-full w-full relative overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                              alt="Engineering Technology"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10"></div>
                          </div>
                        ) : (
                          // JSpiders - Java/Programming image
                          <div className="h-full w-full relative overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                              alt="Java Programming"
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/10"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                          {edu.degree}
                        </h3>
                        
                        <h4 className={`text-lg font-semibold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent mb-4`}>
                          {edu.institution}
                        </h4>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span className="text-sm font-medium">{edu.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span className="text-sm font-medium">{edu.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
