import React, { useState, useEffect } from 'react'
import { X, Sparkles, Heart } from 'lucide-react'

const WelcomeNotification = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isNewVisitor, setIsNewVisitor] = useState(false)

  useEffect(() => {
    // Check if this is a new visitor
    const checkVisitorStatus = () => {
      const hasVisited = localStorage.getItem('portfolio_has_visited')
      const isFirstVisit = !hasVisited
      
      if (isFirstVisit) {
        setIsNewVisitor(true)
        localStorage.setItem('portfolio_has_visited', 'true')
        
        // Show welcome notification after a short delay
        setTimeout(() => {
          setIsVisible(true)
        }, 2000)
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
          setIsVisible(false)
        }, 10000)
      }
    }
    
    checkVisitorStatus()
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible || !isNewVisitor) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-right duration-500">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg shadow-xl border border-blue-400">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-300 animate-pulse" />
            <div>
              <h3 className="font-semibold text-sm">Welcome to my portfolio!</h3>
              <p className="text-xs text-blue-100 mt-1">
                Thanks for visiting! Feel free to explore my work and experience.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-blue-200 hover:text-white transition-colors ml-2 flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="mt-3 flex items-center gap-2 text-xs text-blue-100">
          <Heart size={12} className="text-pink-300" />
          <span>Built with React + Tailwind CSS</span>
        </div>
      </div>
    </div>
  )
}

export default WelcomeNotification
