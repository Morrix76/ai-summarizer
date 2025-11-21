// API utility functions for AI Summarizer

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

/**
 * Summarize text using AI
 * @param {string} text - The text to summarize
 * @param {string} template - The template type (brief, detailed, bullet, academic, business, creative)
 * @returns {Promise<Object>} Summary response
 */
export async function summarizeText(text, template) {
  try {
    const response = await fetch(`${API_BASE_URL}/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        template
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error in summarizeText:', error)
    throw new Error(error.message || 'Failed to generate summary')
  }
}

/**
 * Upload and summarize a file
 * @param {File} file - The file to upload (PDF, DOC, DOCX, TXT)
 * @param {string} template - The template type
 * @returns {Promise<Object>} Summary response
 */
export async function uploadFile(file, template) {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('template', template)

    const response = await fetch(`${API_BASE_URL}/summarize-file`, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error in uploadFile:', error)
    throw new Error(error.message || 'Failed to process file')
  }
}

/**
 * Get available templates
 * @returns {Promise<Object>} Templates list
 */
export async function getTemplates() {
  try {
    const response = await fetch(`${API_BASE_URL}/templates`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error in getTemplates:', error)
    throw new Error(error.message || 'Failed to fetch templates')
  }
}

/**
 * Check backend health status
 * @returns {Promise<Object>} Health status
 */
export async function checkHealth() {
  try {
    const response = await fetch(API_BASE_URL.replace('/api', '/health'))
    const data = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error in checkHealth:', error)
    return { status: 'ERROR', message: error.message }
  }
}

