// Resume processing API endpoint
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const pdfParse = require('pdf-parse')
const mammoth = require('mammoth')

const app = express()
const PORT = 3002

app.use(cors())
app.use(express.json())

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain' // Temporarily allow text files for testing
    ]
    console.log('📋 File filter check - mimetype:', file.mimetype)
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF, Word documents, and text files are allowed.'))
    }
  }
})

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

// Extract text from PDF
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath)
    const data = await pdfParse(dataBuffer)
    return data.text
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error.message}`)
  }
}

// Extract text from Word document
async function extractTextFromWord(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath })
    return result.value
  } catch (error) {
    throw new Error(`Failed to extract text from Word document: ${error.message}`)
  }
}

// Simple text analysis to extract structured data (without OpenAI)
function analyzeResumeText(text) {
  const sections = {
    experiences: [],
    skills: [],
    education: [],
    contact: {},
    projects: []
  }

  // Clean and normalize text
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  const fullText = text.toLowerCase()

  // Extract email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)
  if (emailMatch) {
    sections.contact.email = emailMatch[0]
  }

  // Extract phone number
  const phoneMatch = text.match(/(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g)
  if (phoneMatch) {
    sections.contact.phone = phoneMatch[0]
  }

  // Extract skills (look for common skill section headers)
  const skillSectionKeywords = ['skills', 'technical skills', 'technologies', 'expertise', 'proficiencies']
  let skillsStartIndex = -1
  let skillsEndIndex = -1

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()
    if (skillSectionKeywords.some(keyword => line.includes(keyword))) {
      skillsStartIndex = i + 1
      break
    }
  }

  if (skillsStartIndex !== -1) {
    // Find the end of skills section (next major section or empty line)
    const nextSectionKeywords = ['experience', 'education', 'projects', 'work history', 'employment']
    for (let i = skillsStartIndex; i < lines.length; i++) {
      const line = lines[i].toLowerCase()
      if (nextSectionKeywords.some(keyword => line.includes(keyword)) || line.length === 0) {
        skillsEndIndex = i
        break
      }
    }

    if (skillsEndIndex === -1) skillsEndIndex = lines.length

    // Extract skills from the identified section
    for (let i = skillsStartIndex; i < skillsEndIndex; i++) {
      const line = lines[i]
      // Split by common delimiters and extract skills
      const possibleSkills = line.split(/[,;•·\-\|]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 30)
      sections.skills.push(...possibleSkills)
    }
  }

  // Extract common technologies from the entire text
  const commonTechs = [
    'javascript', 'python', 'java', 'react', 'node.js', 'angular', 'vue.js', 'typescript',
    'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql', 'docker', 'kubernetes',
    'aws', 'azure', 'gcp', 'git', 'jenkins', 'spring boot', 'express', 'django',
    'flask', 'laravel', 'php', 'c++', 'c#', '.net', 'swift', 'kotlin', 'flutter',
    'redis', 'elasticsearch', 'graphql', 'rest api', 'microservices', 'agile', 'scrum'
  ]

  commonTechs.forEach(tech => {
    if (fullText.includes(tech.toLowerCase()) && !sections.skills.some(skill => skill.toLowerCase().includes(tech.toLowerCase()))) {
      sections.skills.push(tech)
    }
  })

  // Extract experiences (look for company names, dates, and job titles)
  const datePattern = /\b(19|20)\d{2}\b|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s+(19|20)\d{2}\b/gi
  const experienceKeywords = ['experience', 'work history', 'employment', 'professional experience']
  
  let expStartIndex = -1
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()
    if (experienceKeywords.some(keyword => line.includes(keyword))) {
      expStartIndex = i + 1
      break
    }
  }

  if (expStartIndex !== -1) {
    let currentExperience = null
    const educationKeywords = ['education', 'qualifications', 'degrees']
    
    for (let i = expStartIndex; i < lines.length; i++) {
      const line = lines[i]
      const lineLower = line.toLowerCase()
      
      // Stop at education section
      if (educationKeywords.some(keyword => lineLower.includes(keyword))) {
        break
      }

      // Check if this line contains a date (likely a job entry)
      if (line.match(datePattern)) {
        if (currentExperience) {
          sections.experiences.push(currentExperience)
        }
        
        // Try to extract job title and company
        const parts = line.split(/[-–—|]/).map(p => p.trim())
        currentExperience = {
          title: parts[0] || 'Position',
          company: parts[1] || 'Company',
          duration: line.match(datePattern)?.[0] || '2023',
          description: []
        }
      } else if (currentExperience && line.length > 10) {
        // Add description lines
        currentExperience.description.push(line)
      }
    }

    if (currentExperience) {
      sections.experiences.push(currentExperience)
    }
  }

  // Clean up skills (remove duplicates and empty entries)
  sections.skills = [...new Set(sections.skills)]
    .filter(skill => skill && skill.length > 1 && skill.length < 50)
    .slice(0, 20) // Limit to 20 skills

  // Format experiences
  sections.experiences = sections.experiences.map(exp => ({
    ...exp,
    description: exp.description.join(' ').substring(0, 200) + (exp.description.join(' ').length > 200 ? '...' : '')
  })).slice(0, 5) // Limit to 5 experiences

  return sections
}

// Main resume processing endpoint
app.post('/api/process-resume', upload.single('resume'), async (req, res) => {
  let filePath = null
  
  try {
    console.log('🎯 Resume upload request received')
    console.log('📋 Request headers:', req.headers)
    
    if (!req.file) {
      console.error('❌ No file uploaded in request')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    filePath = req.file.path
    let extractedText = ''

    console.log('📄 Processing file:', req.file.originalname)
    console.log('📂 File type:', req.file.mimetype)
    console.log('📏 File size:', req.file.size, 'bytes')
    console.log('💾 Temp file path:', filePath)

    // Extract text based on file type
    if (req.file.mimetype === 'application/pdf') {
      extractedText = await extractTextFromPDF(filePath)
    } else if (req.file.mimetype.includes('word') || req.file.mimetype.includes('document')) {
      extractedText = await extractTextFromWord(filePath)
    } else if (req.file.mimetype === 'text/plain') {
      // For testing with text files
      const fs = require('fs')
      extractedText = fs.readFileSync(filePath, 'utf8')
    } else {
      throw new Error('Unsupported file type')
    }

    console.log('📝 Extracted text length:', extractedText.length)

    // Analyze the extracted text
    const structuredData = analyzeResumeText(extractedText)
    
    console.log('🔍 Analysis complete:')
    console.log('- Skills found:', structuredData.skills.length)
    console.log('- Experiences found:', structuredData.experiences.length)
    console.log('- Contact info:', Object.keys(structuredData.contact))

    // Save the extracted data to respective components
    await saveExtractedData(structuredData)

    res.json({
      success: true,
      message: 'Resume processed successfully',
      extractedData: structuredData,
      textLength: extractedText.length
    })

  } catch (error) {
    console.error('❌ Error processing resume:', error)
    res.status(500).json({ 
      error: error.message,
      details: 'Failed to process the uploaded resume file'
    })
  } finally {
    // Clean up uploaded file
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  }
})

// Save extracted data to portfolio components
async function saveExtractedData(data) {
  try {
    // Save experiences if found - format for App.jsx structure
    if (data.experiences && data.experiences.length > 0) {
      console.log('💾 Saving experiences...')
      
      // Format experiences to match App.jsx structure
      const formattedExperiences = data.experiences.map((exp, index) => ({
        id: index + 1,
        title: exp.title,
        company: exp.company,
        location: "Remote", // Default location
        duration: exp.duration || "2023 - Present",
        period: "1+ years", // Default period
        current: index === 0, // Mark first as current
        achievements: [exp.description], // Wrap description in array
        technologies: [], // Empty for now
        color: `from-blue-500 to-purple-600`, // Default color
        highlight: "Updated from resume"
      }))
      
      await fetch('http://localhost:3001/api/save-experience-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experienceData: formattedExperiences })
      })
    }

    // Save skills (update tech stack)
    if (data.skills && data.skills.length > 0) {
      console.log('💾 Saving skills...')
      const techStackData = {
        dev: data.skills.slice(0, 10),
        deployment: [],
        monitoring: [],
        architecture: [],
        cloud: []
      }
      
      await fetch('http://localhost:3001/api/save-tech-stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ techStack: techStackData })
      })
    }

    // Save contact information
    if (data.contact && Object.keys(data.contact).length > 0) {
      console.log('💾 Saving contact info...')
      
      // Get current contact data and merge
      const currentContactResponse = await fetch('http://localhost:3001/api/get-contact-data')
      let currentContact = {}
      if (currentContactResponse.ok) {
        const currentData = await currentContactResponse.json()
        currentContact = currentData.contactData || {}
      }
      
      const updatedContact = {
        ...currentContact,
        ...data.contact, // Merge extracted contact data
        title: currentContact.title || "Let's Work Together",
        subtitle: currentContact.subtitle || "Ready to build something amazing? I'm always open to discussing new opportunities and interesting projects.",
        ctaTitle: currentContact.ctaTitle || "Ready to Start a Project?",
        ctaDescription: currentContact.ctaDescription || "I'm currently available for new opportunities and freelance projects.",
        services: currentContact.services || [
          "Full-stack Development",
          "Microservices Architecture", 
          "Cloud Solutions",
          "Performance Optimization"
        ]
      }
      
      await fetch('http://localhost:3001/api/save-contact-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactData: updatedContact })
      })
    }

    console.log('✅ All data saved successfully')
  } catch (error) {
    console.error('❌ Error saving extracted data:', error)
    throw new Error('Failed to save extracted data to portfolio')
  }
}

app.listen(PORT, () => {
  console.log(`🚀 Resume processing server running on http://localhost:${PORT}`)
  console.log('📁 Upload directory:', uploadsDir)
  console.log('📋 Supported formats: PDF, DOC, DOCX')
  console.log('📏 Max file size: 10MB')
})

module.exports = app
