import React, { useState } from 'react'
import { FiUpload, FiX, FiCheck, FiAlertCircle, FiFile } from 'react-icons/fi'

const ResumeUpload = ({ isAdminMode, onResumeProcessed, showNotification }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [processingStatus, setProcessingStatus] = useState('')

  console.log('🎛️ ResumeUpload rendered, isAdminMode:', isAdminMode)

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  // Process uploaded files
  const handleFiles = (files) => {
    const file = files[0]
    
    console.log('📁 File selected:', file)
    if (!file) return

    console.log('📄 File type:', file.type)
    console.log('📏 File size:', file.size)

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ Invalid file type:', file.type)
      showNotification('Please upload a PDF, Word document, or text file', 'error')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification('File size must be less than 10MB', 'error')
      return
    }

    setUploadedFile(file)
    processResume(file)
  }

  // Process resume and extract data
  const processResume = async (file) => {
    setIsUploading(true)
    setProcessingStatus('Uploading resume...')
    
    console.log('🚀 Starting resume processing for:', file.name)

    try {
      const formData = new FormData()
      formData.append('resume', file)

      setProcessingStatus('Extracting text from resume...')
      
      console.log('📤 Sending request to http://localhost:3002/api/process-resume')
      
      const response = await fetch('http://localhost:3002/api/process-resume', {
        method: 'POST',
        body: formData
      })

      console.log('📥 Response status:', response.status)
      console.log('📥 Response ok:', response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ Server error response:', errorText)
        throw new Error(`Server error: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      
      console.log('� Resume processing result:', result)
      
      setProcessingStatus('Processing complete!')
      showNotification('Resume processed successfully! Portfolio data updated.', 'success')
      
      // Call the callback to refresh the parent component
      if (onResumeProcessed) {
        console.log('🔄 Calling onResumeProcessed callback')
        onResumeProcessed(result.extractedData)
      }
      
      // Reset after a delay
      setTimeout(() => {
        setUploadedFile(null)
        setProcessingStatus('')
      }, 3000)

    } catch (error) {
      console.error('💥 Error processing resume:', error)
      showNotification(`Error processing resume: ${error.message}`, 'error')
      setUploadedFile(null)
      setProcessingStatus('')
    } finally {
      setIsUploading(false)
    }
  }

  // Remove uploaded file
  const removeFile = () => {
    setUploadedFile(null)
    setProcessingStatus('')
  }

  if (!isAdminMode) {
    console.log('🚫 ResumeUpload not displayed - not in admin mode')
    return null
  }

  console.log('✅ ResumeUpload displaying in admin mode')

  return (
    <div className="fixed top-20 right-6 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FiUpload className="mr-2" />
          Resume Upload
        </h3>
        
        {!uploadedFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragOver
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragOver(true)
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <FiFile className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Drag & drop your resume here, or
            </p>
            <label className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer transition-colors">
              Choose File
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
              />
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              PDF, DOC, DOCX, TXT (Max 10MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <FiFile className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {!isUploading && (
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-sm">{processingStatus}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                </div>
              </div>
            )}

            {processingStatus && !isUploading && (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <FiCheck className="h-4 w-4 mr-2" />
                <span className="text-sm">{processingStatus}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-start">
            <FiAlertCircle className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-xs text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">What happens next:</p>
              <ul className="space-y-1">
                <li>• AI extracts your experience, skills, and education</li>
                <li>• Portfolio sections are automatically updated</li>
                <li>• You can review and edit the imported data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeUpload
