import { validateBook } from '../config/schema.js'

/**
 * Validate a book object
 * Re-exports from schema for consistency
 */
export { validateBook }

/**
 * Validate URL format
 */
export const isValidUrl = (url) => {
  if (!url) return true // Empty is allowed
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate that current page is not greater than total pages
 */
export const validatePageProgress = (currentPage, totalPages) => {
  if (!totalPages) return true // If no total pages, any current page is valid
  return currentPage <= totalPages
}

/**
 * Validate that status transition is valid
 */
export const validateStatusTransition = (currentStatus, newStatus) => {
  // All transitions are valid
  return true
}
