import { STATUSES } from '../config/schema.js'

/**
 * Calculate statistics for a collection of books
 */
export const calculateStats = (books) => {
  const total = books.length
  const reading = books.filter(b => b.status === STATUSES.READING).length
  const finished = books.filter(b => b.status === STATUSES.FINISHED).length
  const wantToRead = books.filter(b => b.status === STATUSES.WANT).length

  // Calculate total pages read
  const pagesRead = books.reduce((sum, book) => {
    if (book.status === STATUSES.FINISHED && book.totalPages) {
      return sum + book.totalPages
    }
    return sum + (book.currentPage || 0)
  }, 0)

  // Calculate average rating (only for rated books)
  const ratedBooks = books.filter(b => b.rating > 0)
  const averageRating = ratedBooks.length > 0
    ? ratedBooks.reduce((sum, b) => sum + b.rating, 0) / ratedBooks.length
    : 0

  // Calculate "this month" deltas
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  
  const booksAddedThisMonth = books.filter(b => new Date(b.addedAt) >= startOfMonth).length
  const booksFinishedThisMonth = books.filter(b => 
    b.finishedAt && new Date(b.finishedAt) >= startOfMonth
  ).length

  return {
    total,
    reading,
    finished,
    wantToRead,
    pagesRead,
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    booksAddedThisMonth,
    booksFinishedThisMonth,
  }
}

/**
 * Get books by status
 */
export const getBooksByStatus = (books, status) => {
  return books.filter(b => b.status === status)
}

/**
 * Get books by genre
 */
export const getBooksByGenre = (books, genre) => {
  return books.filter(b => b.genre === genre)
}

/**
 * Get reading progress percentage
 */
export const getProgressPercentage = (currentPage, totalPages) => {
  if (!totalPages || totalPages <= 0) return 0
  return Math.min(100, Math.round((currentPage / totalPages) * 100))
}
