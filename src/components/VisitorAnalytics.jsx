import React, { useState, useEffect } from 'react'
import { BarChart3, Users, TrendingUp, Calendar, Clock, Globe, Eye } from 'lucide-react'
import { useVisitorStats } from '../context/VisitorContext'

const VisitorAnalytics = ({ isAdminMode }) => {
  const { visitorStats, refreshVisitorCount } = useVisitorStats()
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isAdminMode) {
      fetchAnalytics()
    }
  }, [isAdminMode])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      
      // Fetch both the counter and detailed analytics
      const [counterResponse, analyticsResponse] = await Promise.all([
        fetch('http://localhost:3001/api/visitor-count'),
        fetch('http://localhost:3001/api/visitor-stats')
      ])
      
      if (counterResponse.ok) {
        const counterData = await counterResponse.json()
        setAnalytics(prev => ({ ...prev, ...counterData }))
      }
      
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        setAnalytics(prev => ({ ...prev, ...analyticsData }))
      }
      
      // Refresh the context as well
      await refreshVisitorCount()
      
      setError(null)
    } catch (err) {
      setError('Analytics service unavailable')
      console.error('Failed to fetch analytics:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isAdminMode) {
    return null
  }

  if (loading) {
    return (
      <div className="fixed top-20 right-6 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-40">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span className="text-sm">Loading analytics...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="fixed top-20 right-6 bg-red-800 text-white p-4 rounded-lg shadow-lg z-40">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm">{error}</span>
        </div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]
  
  // Use file-based stats as primary, fallback to context stats
  const displayStats = {
    totalVisits: analytics?.totalVisits || visitorStats.totalVisits || 0,
    uniqueVisitors: analytics?.uniqueVisitors || visitorStats.uniqueVisitors || 0,
    todayVisits: analytics?.todayVisits || analytics?.dailyStats?.[today] || 0,
    recentVisits: analytics?.recentVisits?.length || 0
  }

  return (
    <div className="fixed top-20 right-6 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-40 max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={18} className="text-blue-400" />
        <h3 className="font-semibold">Analytics Dashboard</h3>
        <button
          onClick={fetchAnalytics}
          className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-700 p-3 rounded-lg text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Eye size={14} className="text-blue-400" />
            <span className="text-xs text-gray-300">Total</span>
          </div>
          <div className="text-lg font-bold text-blue-400">
            {displayStats.totalVisits.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-gray-700 p-3 rounded-lg text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users size={14} className="text-green-400" />
            <span className="text-xs text-gray-300">Unique</span>
          </div>
          <div className="text-lg font-bold text-green-400">
            {displayStats.uniqueVisitors.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-gray-700 p-3 rounded-lg text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Calendar size={14} className="text-purple-400" />
            <span className="text-xs text-gray-300">Today</span>
          </div>
          <div className="text-lg font-bold text-purple-400">
            {displayStats.todayVisits}
          </div>
        </div>
        
        <div className="bg-gray-700 p-3 rounded-lg text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp size={14} className="text-orange-400" />
            <span className="text-xs text-gray-300">Active</span>
          </div>
          <div className="text-lg font-bold text-orange-400">
            {displayStats.recentVisits}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      {analytics?.recentVisits && analytics.recentVisits.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
            <Clock size={14} />
            Recent Activity
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {analytics.recentVisits.slice(-5).reverse().map((visit, index) => (
              <div key={index} className="text-xs bg-gray-700 p-2 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${visit.isNewVisitor ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                  <span className="text-gray-300">
                    {visit.isNewVisitor ? 'New' : 'Return'} visitor
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Globe size={10} />
                  <span>{visit.language?.split('-')[0]?.toUpperCase() || 'EN'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      {analytics?.lastUpdated && (
        <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400 text-center">
          Updated: {new Date(analytics.lastUpdated).toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}

export default VisitorAnalytics
