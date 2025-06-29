// Utility functions for data persistence

// Save data to localStorage
export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}

// Load data from localStorage
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

// Remove data from localStorage
export const removeFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from localStorage:', error)
    return false
  }
}

// Clear all portfolio data from localStorage
export const clearPortfolioData = () => {
  const keys = ['portfolio_techStack', 'portfolio_heroData', 'portfolio_contactData', 'portfolio_experienceData']
  keys.forEach(key => removeFromLocalStorage(key))
}
