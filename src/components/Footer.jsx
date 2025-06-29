import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Coffee, Code2 } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">Hemsagar Patel</span>
            </h3>
            <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Software Development Engineer III passionate about building scalable systems 
              that make a difference. Always excited to take on new challenges and learn 
              cutting-edge technologies.
            </p>
          </motion.div>

          {/* Made with Love */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-neutral-400 mb-6"
          >
            <span>Made with</span>
            <Heart className="text-red-500 fill-current" size={16} />
            <span>and</span>
            <Coffee className="text-amber-500" size={16} />
            <span>using</span>
            <Code2 className="text-blue-500" size={16} />
            <span>React + Tailwind CSS</span>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6 border-t border-neutral-800"
          >
            <p className="text-neutral-500">
              © {currentYear} Hemsagar Patel. All rights reserved.
            </p>
            <p className="text-neutral-600 text-sm mt-2">
              Designed with ❤️ for exceptional user experience
            </p>
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-4 mt-6"
          >
            {['React', 'Tailwind', 'Framer Motion', 'Vite'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
