import React from 'react'
import { Eye, Users, TrendingUp } from 'lucide-react'
import { useVisitorStats } from '../context/VisitorContext'

const VisitorCounter = ({ showDetails = false, className = '' }) => {
  const { visitorStats, initialized } = useVisitorStats()

  if (!initialized) {
    return null // Don't render until initialized
  }

  if (!showDetails) {
    // Simple compact version
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <Eye size={16} className="text-gray-400" />
        <span className="text-gray-300">
          {visitorStats.totalVisits.toLocaleString()} visits
        </span>
      </div>
    )
  }

  // Detailed version with multiple stats
  return (
    <div className={`bg-gray-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={18} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-white">Portfolio Analytics</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Eye size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">Total Visits</span>
          </div>
          <div className="text-lg font-bold text-white">
            {visitorStats.totalVisits.toLocaleString()}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">Unique Visitors</span>
          </div>
          <div className="text-lg font-bold text-green-400">
            {visitorStats.uniqueVisitors.toLocaleString()}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">This Session</span>
          </div>
          <div className="text-lg font-bold text-blue-400">
            {visitorStats.sessionVisits}
          </div>
        </div>
      </div>
      
      {visitorStats.lastVisit && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-400 text-center">
            {visitorStats.isNewVisitor ? 'Welcome! ' : 'Welcome back! '}
            {visitorStats.firstVisit && (
              <span>
                First visit: {new Date(visitorStats.firstVisit).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default VisitorCounter
