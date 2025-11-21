// History management utilities for AI Summarizer

const HISTORY_KEY = 'ai-summarizer-history'
const MAX_HISTORY_ITEMS = 20

/**
 * Generate a unique ID for a history item
 * @returns {string} Unique ID
 */
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get all history items from localStorage
 * @returns {Array} Array of history items, sorted by timestamp (newest first)
 */
export function getHistory() {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(HISTORY_KEY)
    if (!stored) return []
    
    const history = JSON.parse(stored)
    // Sort by timestamp, newest first
    return history.sort((a, b) => b.timestamp - a.timestamp)
  } catch (error) {
    console.error('Error loading history:', error)
    return []
  }
}

/**
 * Save a new summary to history
 * @param {Object} summaryData - Summary data to save
 * @param {string} summaryData.template - Template used
 * @param {string} summaryData.inputText - Full input text
 * @param {string} summaryData.summary - Generated summary
 * @param {Array} summaryData.actionItems - Action items (optional)
 * @param {number} summaryData.originalLength - Original text length
 * @param {number} summaryData.summaryLength - Summary length
 * @returns {string} ID of the saved item
 */
export function saveToHistory(summaryData) {
  if (typeof window === 'undefined') return null
  
  try {
    const history = getHistory()
    
    // Create input preview (first 100 characters)
    const inputPreview = summaryData.inputText
      ? summaryData.inputText.substring(0, 100).trim() + 
        (summaryData.inputText.length > 100 ? '...' : '')
      : 'File caricato'
    
    // Create new history item
    const newItem = {
      id: generateId(),
      timestamp: Date.now(),
      template: summaryData.template,
      inputPreview,
      inputText: summaryData.inputText || '',
      summary: summaryData.summary,
      actionItems: summaryData.actionItems || [],
      originalLength: summaryData.originalLength || 0,
      summaryLength: summaryData.summaryLength || 0
    }
    
    // Add to beginning of array
    history.unshift(newItem)
    
    // Keep only last MAX_HISTORY_ITEMS (FIFO)
    const limitedHistory = history.slice(0, MAX_HISTORY_ITEMS)
    
    // Save to localStorage
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory))
    
    // Trigger history update event
    window.dispatchEvent(new Event('history-updated'))
    
    return newItem.id
  } catch (error) {
    console.error('Error saving to history:', error)
    return null
  }
}

/**
 * Delete a specific history item
 * @param {string} id - ID of the item to delete
 * @returns {boolean} True if successful
 */
export function deleteHistoryItem(id) {
  if (typeof window === 'undefined') return false
  
  try {
    const history = getHistory()
    const filtered = history.filter(item => item.id !== id)
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
    
    // Trigger history update event
    window.dispatchEvent(new Event('history-updated'))
    
    return true
  } catch (error) {
    console.error('Error deleting history item:', error)
    return false
  }
}

/**
 * Clear all history
 * @returns {boolean} True if successful
 */
export function clearHistory() {
  if (typeof window === 'undefined') return false
  
  try {
    localStorage.removeItem(HISTORY_KEY)
    
    // Trigger history update event
    window.dispatchEvent(new Event('history-updated'))
    
    return true
  } catch (error) {
    console.error('Error clearing history:', error)
    return false
  }
}

/**
 * Get a specific history item by ID
 * @param {string} id - ID of the item to retrieve
 * @returns {Object|null} History item or null if not found
 */
export function getHistoryItem(id) {
  const history = getHistory()
  return history.find(item => item.id === id) || null
}

/**
 * Get count of history items
 * @returns {number} Number of items in history
 */
export function getHistoryCount() {
  return getHistory().length
}

