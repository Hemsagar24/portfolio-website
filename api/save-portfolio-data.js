// Comprehensive portfolio data saving API
// Run this: node api/save-portfolio-data.js

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Save experiences to Experience.jsx
app.post('/api/save-experiences', (req, res) => {
  try {
    const { experiences } = req.body
    
    const filePath = path.join(__dirname, '..', 'src', 'components', 'Experience.jsx')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Format the experiences array with proper indentation
    const experiencesArrayString = `  const [experiences, setExperiences] = useState(${JSON.stringify(experiences, null, 4).replace(/\n/g, '\n    ')})`
    
    // Replace the existing experiences array
    const experiencesRegex = /(\s*const \[experiences, setExperiences\] = useState\(\[[\s\S]*?\n\s*\]\))/
    
    if (!experiencesRegex.test(fileContent)) {
      throw new Error('Could not find experiences array in the file')
    }
    
    const updatedContent = fileContent.replace(experiencesRegex, experiencesArrayString)
    
    fs.writeFileSync(filePath, updatedContent, 'utf8')
    
    console.log('✅ Experiences saved successfully to Experience.jsx')
    console.log(`📊 Updated ${experiences.length} experience(s)`)
    res.status(200).json({ message: 'Experiences saved successfully' })
  } catch (error) {
    console.error('❌ Error saving experiences:', error)
    res.status(500).json({ error: error.message })
  }
})

// Save contact data to App.jsx
app.post('/api/save-contact-data', (req, res) => {
  try {
    const { contactData } = req.body
    
    const filePath = path.join(__dirname, '..', 'src', 'App.jsx')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Format the contact data with proper indentation
    const contactDataString = JSON.stringify(contactData, null, 6).replace(/\n/g, '\n      ')
    
    // Replace the existing contact data
    const contactDataRegex = /(const defaultContactData = {[\s\S]*?})/
    
    if (!contactDataRegex.test(fileContent)) {
      throw new Error('Could not find contact data in the file')
    }
    
    const updatedContent = fileContent.replace(contactDataRegex, `const defaultContactData = ${contactDataString}`)
    
    fs.writeFileSync(filePath, updatedContent, 'utf8')
    
    console.log('✅ Contact data saved successfully to App.jsx')
    res.status(200).json({ message: 'Contact data saved successfully' })
  } catch (error) {
    console.error('❌ Error saving contact data:', error)
    res.status(500).json({ error: error.message })
  }
})

// Save tech stack to App.jsx
app.post('/api/save-tech-stack', (req, res) => {
  try {
    const { techStack } = req.body
    
    const filePath = path.join(__dirname, '..', 'src', 'App.jsx')
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Format the tech stack with proper indentation
    const techStackString = JSON.stringify(techStack, null, 6).replace(/\n/g, '\n      ')
    
    // Replace the existing tech stack
    const techStackRegex = /(const defaultTechStack = {[\s\S]*?})/
    
    if (!techStackRegex.test(fileContent)) {
      throw new Error('Could not find tech stack in the file')
    }
    
    const updatedContent = fileContent.replace(techStackRegex, `const defaultTechStack = ${techStackString}`)
    
    fs.writeFileSync(filePath, updatedContent, 'utf8')
    
    console.log('✅ Tech stack saved successfully to App.jsx')
    res.status(200).json({ message: 'Tech stack saved successfully' })
  } catch (error) {
    console.error('❌ Error saving tech stack:', error)
    res.status(500).json({ error: error.message })
  }
})

// Visitor statistics storage
let visitorStatsFile = path.join(__dirname, 'visitor-stats.json')
let visitorCounterFile = path.join(__dirname, 'visitor-counter.json')

// Initialize visitor stats file if it doesn't exist
if (!fs.existsSync(visitorStatsFile)) {
  const initialStats = {
    totalVisits: 0,
    uniqueVisitors: 0,
    dailyStats: {},
    weeklyStats: {},
    monthlyStats: {},
    visitors: [],
    lastUpdated: new Date().toISOString()
  }
  fs.writeFileSync(visitorStatsFile, JSON.stringify(initialStats, null, 2))
}

// Initialize visitor counter file if it doesn't exist
if (!fs.existsSync(visitorCounterFile)) {
  const initialCounter = {
    totalVisits: 0,
    uniqueVisitors: 0,
    uniqueFingerprints: new Set(),
    dailyVisits: {},
    lastReset: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
  // Convert Set to Array for JSON storage
  initialCounter.uniqueFingerprints = []
  fs.writeFileSync(visitorCounterFile, JSON.stringify(initialCounter, null, 2))
}

// Get current visitor count from file
app.get('/api/visitor-count', (req, res) => {
  try {
    const counterData = JSON.parse(fs.readFileSync(visitorCounterFile, 'utf8'))
    
    res.status(200).json({
      totalVisits: counterData.totalVisits || 0,
      uniqueVisitors: counterData.uniqueVisitors || 0,
      todayVisits: counterData.dailyVisits[new Date().toISOString().split('T')[0]] || 0,
      lastUpdated: counterData.lastUpdated || counterData.createdAt
    })
  } catch (error) {
    console.error('❌ Error reading visitor counter:', error)
    res.status(500).json({ error: 'Failed to read visitor count' })
  }
})

// Increment visitor count
app.post('/api/visitor-count/increment', (req, res) => {
  try {
    const { fingerprint, isNewSession } = req.body
    const today = new Date().toISOString().split('T')[0]
    
    // Read current counter
    const counterData = JSON.parse(fs.readFileSync(visitorCounterFile, 'utf8'))
    
    // Convert fingerprints array back to Set for easier checking
    const uniqueFingerprints = new Set(counterData.uniqueFingerprints || [])
    
    // Always increment total visits
    counterData.totalVisits = (counterData.totalVisits || 0) + 1
    
    // Check if this is a unique visitor (new fingerprint)
    const isUniqueVisitor = !uniqueFingerprints.has(fingerprint)
    if (isUniqueVisitor) {
      uniqueFingerprints.add(fingerprint)
      counterData.uniqueVisitors = (counterData.uniqueVisitors || 0) + 1
    }
    
    // Update daily visits
    counterData.dailyVisits = counterData.dailyVisits || {}
    counterData.dailyVisits[today] = (counterData.dailyVisits[today] || 0) + 1
    
    // Clean up old daily stats (keep only last 30 days)
    const dayKeys = Object.keys(counterData.dailyVisits).sort()
    if (dayKeys.length > 30) {
      const keysToRemove = dayKeys.slice(0, dayKeys.length - 30)
      keysToRemove.forEach(key => delete counterData.dailyVisits[key])
    }
    
    // Update timestamp
    counterData.lastUpdated = new Date().toISOString()
    
    // Convert Set back to Array for JSON storage
    counterData.uniqueFingerprints = Array.from(uniqueFingerprints)
    
    // Save updated counter
    fs.writeFileSync(visitorCounterFile, JSON.stringify(counterData, null, 2))
    
    console.log(`📊 Visitor count updated: ${counterData.totalVisits} total, ${counterData.uniqueVisitors} unique${isUniqueVisitor ? ' (NEW!)' : ''}`)
    
    res.status(200).json({
      success: true,
      totalVisits: counterData.totalVisits,
      uniqueVisitors: counterData.uniqueVisitors,
      todayVisits: counterData.dailyVisits[today],
      isUniqueVisitor,
      isNewSession
    })
  } catch (error) {
    console.error('❌ Error incrementing visitor count:', error)
    res.status(500).json({ error: 'Failed to increment visitor count' })
  }
})

// Visitor statistics endpoint
app.post('/api/visitor-stats', (req, res) => {
  try {
    const { timestamp, userAgent, referrer, language, isNewVisitor, isNewSession, visitorId, sessionId, fingerprint, localStats } = req.body
    
    // Read existing stats
    const statsData = JSON.parse(fs.readFileSync(visitorStatsFile, 'utf8'))
    
    // Check if this visitor ID already exists in our records
    const existingVisitor = statsData.visitors?.find(v => v.visitorId === visitorId)
    
    // For server-side uniqueness, use visitor ID
    const isServerNewVisitor = !existingVisitor && isNewVisitor
    
    // Update global stats
    statsData.totalVisits = (statsData.totalVisits || 0) + 1
    if (isServerNewVisitor) {
      statsData.uniqueVisitors = (statsData.uniqueVisitors || 0) + 1
    }
    
    // Add visitor entry
    const visitorEntry = {
      timestamp,
      userAgent: userAgent.substring(0, 200), // Limit length
      referrer: referrer.substring(0, 200), // Limit length
      language,
      isNewVisitor: isServerNewVisitor,
      isNewSession,
      visitorId,
      sessionId,
      fingerprint,
      localStats
    }
    
    // Keep only last 1000 visitor entries to prevent file from growing too large
    statsData.visitors = statsData.visitors || []
    statsData.visitors.push(visitorEntry)
    if (statsData.visitors.length > 1000) {
      statsData.visitors = statsData.visitors.slice(-1000)
    }
    
    // Update daily stats
    const today = new Date(timestamp).toISOString().split('T')[0]
    statsData.dailyStats = statsData.dailyStats || {}
    statsData.dailyStats[today] = (statsData.dailyStats[today] || 0) + 1
    
    // Update weekly stats (keep only last 12 weeks)
    const weekKey = getWeekKey(new Date(timestamp))
    statsData.weeklyStats = statsData.weeklyStats || {}
    statsData.weeklyStats[weekKey] = (statsData.weeklyStats[weekKey] || 0) + 1
    
    // Clean old weekly stats
    const weekKeys = Object.keys(statsData.weeklyStats).sort()
    if (weekKeys.length > 12) {
      const keysToRemove = weekKeys.slice(0, weekKeys.length - 12)
      keysToRemove.forEach(key => delete statsData.weeklyStats[key])
    }
    
    // Update monthly stats (keep only last 12 months)
    const monthKey = new Date(timestamp).toISOString().substring(0, 7) // YYYY-MM
    statsData.monthlyStats = statsData.monthlyStats || {}
    statsData.monthlyStats[monthKey] = (statsData.monthlyStats[monthKey] || 0) + 1
    
    // Clean old monthly stats
    const monthKeys = Object.keys(statsData.monthlyStats).sort()
    if (monthKeys.length > 12) {
      const keysToRemove = monthKeys.slice(0, monthKeys.length - 12)
      keysToRemove.forEach(key => delete statsData.monthlyStats[key])
    }
    
    // Update last updated timestamp
    statsData.lastUpdated = timestamp
    
    // Save updated stats
    fs.writeFileSync(visitorStatsFile, JSON.stringify(statsData, null, 2))
    
    console.log(`📊 Visitor stats updated: ${statsData.totalVisits} total visits, ${statsData.uniqueVisitors} unique visitors`)
    
    // Return updated stats
    res.status(200).json({
      success: true,
      stats: {
        totalVisits: statsData.totalVisits,
        uniqueVisitors: statsData.uniqueVisitors,
        dailyVisits: statsData.dailyStats[today] || 1,
        weeklyVisits: statsData.weeklyStats[weekKey] || 1,
        monthlyVisits: statsData.monthlyStats[monthKey] || 1
      }
    })
  } catch (error) {
    console.error('❌ Error updating visitor stats:', error)
    res.status(500).json({ error: 'Failed to update visitor statistics' })
  }
})

// Get visitor statistics endpoint (for admin)
app.get('/api/visitor-stats', (req, res) => {
  try {
    const statsData = JSON.parse(fs.readFileSync(visitorStatsFile, 'utf8'))
    
    // Return summary stats (don't include individual visitor entries for privacy)
    res.status(200).json({
      totalVisits: statsData.totalVisits,
      uniqueVisitors: statsData.uniqueVisitors,
      dailyStats: statsData.dailyStats,
      weeklyStats: statsData.weeklyStats,
      monthlyStats: statsData.monthlyStats,
      lastUpdated: statsData.lastUpdated,
      recentVisits: statsData.visitors.slice(-10).map(v => ({
        timestamp: v.timestamp,
        language: v.language,
        isNewVisitor: v.isNewVisitor,
        isNewSession: v.isNewSession
      })) // Only last 10 visits with minimal info
    })
  } catch (error) {
    console.error('❌ Error reading visitor stats:', error)
    res.status(500).json({ error: 'Failed to read visitor statistics' })
  }
})

// Helper function to get week key
function getWeekKey(date) {
  const year = date.getFullYear()
  const week = getWeekNumber(date)
  return `${year}-W${week.toString().padStart(2, '0')}`
}

// Helper function to get week number
function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

app.listen(PORT, () => {
  console.log(`🚀 Portfolio data save server running on http://localhost:${PORT}`)
  console.log('📁 Ready to save changes to JSX files')
})
