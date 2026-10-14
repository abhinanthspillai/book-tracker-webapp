import { STATUSES } from '../config/schema.js'

/**
 * Filter books based on search query, status, genre, and rating
 */
export const filterBooks = (books, filters = {}) => {
  const { search, status, genre, minRating } = filters

  return books.filter(book => {
    // Search filter (case-insensitive, searches title and author)
    if (search) {
      const searchLower = search.toLowerCase()
      const matchesTitle = book.title.toLowerCase().includes(searchLower)
      const matchesAuthor = book.author.toLowerCase().includes(searchLower)
      if (!matchesTitle && !matchesAuthor) return false
    }

    // Status filter
    if (status && book.status !== status) return false

    // Genre filter
    if (genre && book.genre !== genre) return false

    // Rating filter
    if (minRating !== undefined && book.rating < minRating) return false

    return true
  })
}

/**
 * Sort books based on field and direction
 */
export const sortBooks = (books, sortBy = 'addedAt', direction = 'desc') => {
  const sorted = [...books]
  
  sorted.sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
      case 'author':
        comparison = a.author.localeCompare(b.author)
        break
      case 'rating':
        comparison = (a.rating || 0) - (b.rating || 0)
        break
      case 'addedAt':
        comparison = new Date(a.addedAt) - new Date(b.addedAt)
        break
      case 'finishedAt':
        const aFinished = a.finishedAt ? new Date(a.finishedAt) : new Date(0)
        const bFinished = b.finishedAt ? new Date(b.finishedAt) : new Date(0)
        comparison = aFinished - bFinished
        break
      default:
        comparison = 0
    }

    return direction === 'asc' ? comparison : -comparison
  })

  return sorted
}

/**
 * Apply both filters and sorting
 */
export const filterAndSortBooks = (books, filters = {}, sortBy = 'addedAt', sortDirection = 'desc') => {
  const filtered = filterBooks(books, filters)
  return sortBooks(filtered, sortBy, sortDirection)
}
