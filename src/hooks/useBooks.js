import { useState, useEffect, useCallback } from 'react'
import repository from '../repositories/index.js'
import { createBook, validateBook } from '../config/schema.js'
import { calculateStats } from '../utils/stats.js'

export const useBooks = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load books on mount
  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await repository.getAll()
      setBooks(data || [])
    } catch (err) {
      setError('Failed to load books')
      console.error('Error loading books:', err)
    } finally {
      setLoading(false)
    }
  }

  const addBook = useCallback(async (bookData) => {
    try {
      const validation = validateBook(bookData)
      if (!validation.isValid) {
        return { success: false, errors: validation.errors }
      }

      const newBook = createBook(bookData)
      const created = await repository.create(newBook)
      
      if (created) {
        setBooks(prev => [...prev, created])
        return { success: true, book: created }
      }
      
      return { success: false, error: 'Failed to create book' }
    } catch (err) {
      console.error('Error adding book:', err)
      return { success: false, error: 'Failed to create book' }
    }
  }, [])

  const updateBook = useCallback(async (id, updates) => {
    try {
      // Validate updates
      const currentBook = books.find(b => b.id === id)
      if (!currentBook) {
        return { success: false, error: 'Book not found' }
      }

      const updatedData = { ...currentBook, ...updates }
      const validation = validateBook(updatedData)
      if (!validation.isValid) {
        return { success: false, errors: validation.errors }
      }

      const updated = await repository.update(id, updates)
      
      if (updated) {
        setBooks(prev => prev.map(b => b.id === id ? updated : b))
        return { success: true, book: updated }
      }
      
      return { success: false, error: 'Failed to update book' }
    } catch (err) {
      console.error('Error updating book:', err)
      return { success: false, error: 'Failed to update book' }
    }
  }, [books])

  const deleteBook = useCallback(async (id) => {
    try {
      const success = await repository.remove(id)
      
      if (success) {
        setBooks(prev => prev.filter(b => b.id !== id))
        return { success: true }
      }
      
      return { success: false, error: 'Failed to delete book' }
    } catch (err) {
      console.error('Error deleting book:', err)
      return { success: false, error: 'Failed to delete book' }
    }
  }, [])

  const updateStatus = useCallback(async (id, newStatus) => {
    const updates = { status: newStatus }
    
    // If marking as finished, set finishedAt and currentPage = totalPages
    if (newStatus === 'finished') {
      const book = books.find(b => b.id === id)
      if (book) {
        updates.finishedAt = new Date().toISOString()
        if (book.totalPages) {
          updates.currentPage = book.totalPages
        }
      }
    } else {
      // If un-finishing, clear finishedAt
      updates.finishedAt = null
    }
    
    return updateBook(id, updates)
  }, [books, updateBook])

  const updateProgress = useCallback(async (id, currentPage) => {
    return updateBook(id, { currentPage })
  }, [updateBook])

  const updateRating = useCallback(async (id, rating) => {
    return updateBook(id, { rating })
  }, [updateBook])

  const loadSampleData = useCallback(async () => {
    try {
      const sampleBooks = [
        {
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Fiction',
          status: 'finished',
          totalPages: 180,
          currentPage: 180,
          rating: 5,
          notes: 'A classic American novel exploring themes of wealth and love.',
        },
        {
          title: '1984',
          author: 'George Orwell',
          genre: 'Science Fiction',
          status: 'reading',
          totalPages: 328,
          currentPage: 145,
          rating: 4,
          notes: 'Dystopian masterpiece that feels increasingly relevant.',
        },
        {
          title: 'Atomic Habits',
          author: 'James Clear',
          genre: 'Self-Help',
          status: 'want',
          totalPages: 320,
          currentPage: 0,
          rating: 0,
          notes: '',
        },
        {
          title: 'The Midnight Library',
          author: 'Matt Haig',
          genre: 'Fiction',
          status: 'want',
          totalPages: 304,
          currentPage: 0,
          rating: 0,
          notes: '',
        },
        {
          title: 'Thinking, Fast and Slow',
          author: 'Daniel Kahneman',
          genre: 'Non-Fiction',
          status: 'reading',
          totalPages: 499,
          currentPage: 230,
          rating: 5,
          notes: 'Fascinating insights into how we make decisions.',
        },
      ]

      for (const bookData of sampleBooks) {
        const newBook = createBook(bookData)
        await repository.create(newBook)
      }

      await loadBooks()
      return { success: true }
    } catch (err) {
      console.error('Error loading sample data:', err)
      return { success: false, error: 'Failed to load sample data' }
    }
  }, [loadBooks])

  const clearAllBooks = useCallback(async () => {
    try {
      if (repository.clear) {
        await repository.clear()
      }
      setBooks([])
      return { success: true }
    } catch (err) {
      console.error('Error clearing books:', err)
      return { success: false, error: 'Failed to clear books' }
    }
  }, [])

  const stats = calculateStats(books)

  return {
    books,
    loading,
    error,
    stats,
    addBook,
    updateBook,
    deleteBook,
    updateStatus,
    updateProgress,
    updateRating,
    loadSampleData,
    clearAllBooks,
    refresh: loadBooks,
  }
}
