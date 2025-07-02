import React, { createContext, useContext, useState, useEffect } from 'react'

const VisitorContext = createContext()

export const useVisitorStats = () => {
  const context = useContext(VisitorContext)
  if (!context) {
    throw new Error('useVisitorStats must be used within a VisitorProvider')
  }
  return context
}

// Generate a more robust visitor fingerprint
const generateVisitorFingerprint = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.textBaseline = 'top'
  ctx.font = '14px Arial'
  ctx.fillText('Visitor fingerprint', 2, 2)
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.platform,
    canvas.toDataURL()
  ].join('|')
  
  // Create a simple hash
  let hash = 0
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36)
}

// Generate a session-based visitor ID
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

export const VisitorProvider = ({ children }) => {
  const [visitorStats, setVisitorStats] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    sessionVisits: 1,
    lastVisit: null,
    firstVisit: null,
    isNewVisitor: false,
    isNewSession: false,
    visitorId: null,
    sessionId: null
  })

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Only initialize once per app load
    if (initialized) return

    const initializeVisitorTracking = async () => {
      try {
        // Check if already counted in this session
        const alreadyCounted = sessionStorage.getItem('portfolio_visit_counted')
        const sessionId = sessionStorage.getItem('portfolio_session_id') || generateSessionId()
        
        if (alreadyCounted === 'true') {
          // Just load current stats from server without incrementing
          const response = await fetch('http://localhost:3001/api/visitor-count')
          if (response.ok) {
            const serverStats = await response.json()
            const sessionVisits = parseInt(sessionStorage.getItem('portfolio_session_visits') || '1')
            
            setVisitorStats({
              totalVisits: serverStats.totalVisits,
              uniqueVisitors: serverStats.uniqueVisitors,
              sessionVisits: sessionVisits,
              lastVisit: serverStats.lastUpdated,
              firstVisit: null,
              isNewVisitor: false,
              isNewSession: false,
              visitorId: generateVisitorFingerprint(),
              sessionId: sessionId
            })
          }
          setInitialized(true)
          return
        }

        // Generate visitor fingerprint for uniqueness detection
        const visitorFingerprint = generateVisitorFingerprint()
        const sessionVisits = parseInt(sessionStorage.getItem('portfolio_session_visits') || '0')
        const isNewSession = sessionVisits === 0

        // Increment the counter on the server
        const incrementResponse = await fetch('http://localhost:3001/api/visitor-count/increment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fingerprint: visitorFingerprint,
            isNewSession: isNewSession,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            language: navigator.language
          }),
        })

        if (incrementResponse.ok) {
          const result = await incrementResponse.json()
          
          // Update local state with server response
          const updatedStats = {
            totalVisits: result.totalVisits,
            uniqueVisitors: result.uniqueVisitors,
            sessionVisits: sessionVisits + 1,
            lastVisit: new Date().toISOString(),
            firstVisit: result.isUniqueVisitor ? new Date().toISOString() : null,
            isNewVisitor: result.isUniqueVisitor,
            isNewSession: isNewSession,
            visitorId: visitorFingerprint,
            sessionId: sessionId
          }
          
          setVisitorStats(updatedStats)
          
          // Update session data
          sessionStorage.setItem('portfolio_session_visits', updatedStats.sessionVisits.toString())
          sessionStorage.setItem('portfolio_session_id', sessionId)
          sessionStorage.setItem('portfolio_visit_counted', 'true')
          
          // Log visitor info for debugging (only in development)
          if (process.env.NODE_ENV === 'development') {
            console.log('👁️ Visitor Stats (File-based):', {
              ...updatedStats,
              fingerprint: visitorFingerprint.substring(0, 8) + '...',
              source: 'Server file',
              method: result.isUniqueVisitor ? 'New unique visitor' : 'Returning visitor'
            })
          }
          
        } else {
          // Fallback to localStorage if server is unavailable
          console.warn('📡 Server unavailable, using localStorage fallback')
          await initializeLocalStorageFallback()
        }
        
        setInitialized(true)
        
      } catch (error) {
        console.warn('📡 Error connecting to server, using localStorage fallback:', error.message)
        await initializeLocalStorageFallback()
        setInitialized(true)
      }
    }

    // Fallback to localStorage if server is unavailable
    const initializeLocalStorageFallback = async () => {
      const now = new Date().toISOString()
      const visitorFingerprint = generateVisitorFingerprint()
      const sessionId = generateSessionId()
      
      // Get existing data from localStorage
      const existingStats = JSON.parse(localStorage.getItem('portfolio_visitor_stats') || '{}')
      const sessionVisits = parseInt(sessionStorage.getItem('portfolio_session_visits') || '0')
      
      // Check uniqueness using fingerprint
      const hasVisitedBefore = existingStats.firstVisit
      const hasSameFingerprint = existingStats.visitorId === visitorFingerprint
      const isNewVisitor = !hasVisitedBefore || !hasSameFingerprint
      const isNewSession = sessionVisits === 0
      
      // Update stats
      const updatedStats = {
        totalVisits: (existingStats.totalVisits || 0) + 1,
        uniqueVisitors: isNewVisitor ? (existingStats.uniqueVisitors || 0) + 1 : (existingStats.uniqueVisitors || 1),
        sessionVisits: sessionVisits + 1,
        lastVisit: now,
        firstVisit: existingStats.firstVisit || now,
        isNewVisitor,
        isNewSession,
        visitorId: visitorFingerprint,
        sessionId: sessionId
      }
      
      // Save to localStorage
      localStorage.setItem('portfolio_visitor_stats', JSON.stringify({
        totalVisits: updatedStats.totalVisits,
        uniqueVisitors: updatedStats.uniqueVisitors,
        lastVisit: updatedStats.lastVisit,
        firstVisit: updatedStats.firstVisit,
        visitorId: updatedStats.visitorId
      }))
      
      // Save session data
      sessionStorage.setItem('portfolio_session_visits', updatedStats.sessionVisits.toString())
      sessionStorage.setItem('portfolio_session_id', sessionId)
      sessionStorage.setItem('portfolio_visit_counted', 'true')
      
      setVisitorStats(updatedStats)
      
      if (process.env.NODE_ENV === 'development') {
        console.log('👁️ Visitor Stats (LocalStorage fallback):', updatedStats)
      }
    }
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeVisitorTracking()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [initialized])

  // Get current visitor count from server for display
  const refreshVisitorCount = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/visitor-count')
      if (response.ok) {
        const serverStats = await response.json()
        setVisitorStats(prev => ({
          ...prev,
          totalVisits: serverStats.totalVisits,
          uniqueVisitors: serverStats.uniqueVisitors
        }))
      }
    } catch (error) {
      console.debug('Could not refresh visitor count from server:', error.message)
    }
  }

  return (
    <VisitorContext.Provider value={{ visitorStats, initialized, refreshVisitorCount }}>
      {children}
    </VisitorContext.Provider>
  )
}
