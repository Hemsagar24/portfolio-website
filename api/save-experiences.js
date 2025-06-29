// This is a Node.js server for handling file writes
// Run this separately: node api/save-experiences.js

const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/api/save-experiences', (req, res) => {
  try {
    const { experiences } = req.body
    
    // Path to the Experience.jsx file
    const filePath = path.join(__dirname, '..', 'src', 'components', 'Experience.jsx')
    
    // Read the current file
    const fileContent = fs.readFileSync(filePath, 'utf8')
    
    // Create the new experiences array string with proper formatting and indentation
    const experiencesArrayString = `  const [experiences, setExperiences] = useState(${JSON.stringify(experiences, null, 4).replace(/\n/g, '\n    ')})`
    
    // More robust regex to match the experiences array - handles both formats and preserves structure
    const experiencesRegex = /(\s*const \[experiences, setExperiences\] = useState\(\[[\s\S]*?\n\s*\]\))/
    
    // Check if the pattern exists
    if (!experiencesRegex.test(fileContent)) {
      throw new Error('Could not find experiences array in the file')
    }
    
    // Replace the existing experiences array while preserving surrounding code structure
    const updatedContent = fileContent.replace(experiencesRegex, experiencesArrayString)
    
    // Ensure proper line spacing after the experiences array
    const finalContent = updatedContent.replace(
      /(useState\(\[[\s\S]*?\n\s*\]\))(\s*)(const \[editForm)/,
      '$1\n\n  $3'
    )
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, finalContent, 'utf8')
    
    console.log('✅ Experiences saved successfully to Experience.jsx')
    console.log(`📊 Updated ${experiences.length} experience(s)`)
    res.status(200).json({ message: 'Experiences saved successfully' })
  } catch (error) {
    console.error('❌ Error saving experiences:', error)
    res.status(500).json({ message: 'Failed to save experiences', error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 File save server running on http://localhost:${PORT}`)
})

module.exports = app
