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

app.listen(PORT, () => {
  console.log(`🚀 Portfolio data save server running on http://localhost:${PORT}`)
  console.log('📁 Ready to save changes to JSX files')
})
