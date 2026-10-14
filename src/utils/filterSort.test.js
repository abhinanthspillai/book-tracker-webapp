import { describe, it, expect } from 'vitest'
import { filterBooks, sortBooks, filterAndSortBooks } from './filterSort.js'
import { STATUSES } from '../config/schema.js'

describe('filterBooks', () => {
  const sampleBooks = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: STATUSES.FINISHED, genre: 'Fiction', rating: 5 },
    { id: '2', title: '1984', author: 'George Orwell', status: STATUSES.READING, genre: 'Science Fiction', rating: 4 },
    { id: '3', title: 'Atomic Habits', author: 'James Clear', status: STATUSES.WANT, genre: 'Self-Help', rating: 0 },
  ]

  it('should return all books when no filters provided', () => {
    const result = filterBooks(sampleBooks)
    expect(result).toHaveLength(3)
  })

  it('should filter by search query in title', () => {
    const result = filterBooks(sampleBooks, { search: 'gatsby' })
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('The Great Gatsby')
  })

  it('should filter by search query in author', () => {
    const result = filterBooks(sampleBooks, { search: 'orwell' })
    expect(result).toHaveLength(1)
    expect(result[0].author).toBe('George Orwell')
  })

  it('should filter by status', () => {
    const result = filterBooks(sampleBooks, { status: STATUSES.READING })
    expect(result).toHaveLength(1)
    expect(result[0].status).toBe(STATUSES.READING)
  })

  it('should filter by genre', () => {
    const result = filterBooks(sampleBooks, { genre: 'Fiction' })
    expect(result).toHaveLength(1)
    expect(result[0].genre).toBe('Fiction')
  })

  it('should filter by minimum rating', () => {
    const result = filterBooks(sampleBooks, { minRating: 4 })
    expect(result).toHaveLength(2)
  })

  it('should apply multiple filters', () => {
    const result = filterBooks(sampleBooks, { status: STATUSES.FINISHED, genre: 'Fiction' })
    expect(result).toHaveLength(1)
  })
})

describe('sortBooks', () => {
  const sampleBooks = [
    { id: '1', title: '1984', author: 'George Orwell', rating: 4, addedAt: '2024-01-01T00:00:00Z' },
    { id: '2', title: 'Atomic Habits', author: 'James Clear', rating: 5, addedAt: '2024-01-02T00:00:00Z' },
    { id: '3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', rating: 3, addedAt: '2024-01-03T00:00:00Z' },
  ]

  it('should sort by title ascending', () => {
    const result = sortBooks(sampleBooks, 'title', 'asc')
    expect(result[0].title).toBe('1984')
    expect(result[2].title).toBe('The Great Gatsby')
  })

  it('should sort by title descending', () => {
    const result = sortBooks(sampleBooks, 'title', 'desc')
    expect(result[0].title).toBe('The Great Gatsby')
    expect(result[2].title).toBe('1984')
  })

  it('should sort by author ascending', () => {
    const result = sortBooks(sampleBooks, 'author', 'asc')
    expect(result[0].author).toBe('F. Scott Fitzgerald')
  })

  it('should sort by rating descending', () => {
    const result = sortBooks(sampleBooks, 'rating', 'desc')
    expect(result[0].rating).toBe(5)
    expect(result[2].rating).toBe(3)
  })

  it('should sort by addedAt descending (default)', () => {
    const result = sortBooks(sampleBooks, 'addedAt', 'desc')
    expect(result[0].addedAt).toBe('2024-01-03T00:00:00Z')
  })

  it('should not mutate original array', () => {
    const original = [...sampleBooks]
    sortBooks(sampleBooks, 'title', 'asc')
    expect(sampleBooks).toEqual(original)
  })
})

describe('filterAndSortBooks', () => {
  const sampleBooks = [
    { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: STATUSES.FINISHED, rating: 5, addedAt: '2024-01-01T00:00:00Z' },
    { id: '2', title: '1984', author: 'George Orwell', status: STATUSES.READING, rating: 4, addedAt: '2024-01-02T00:00:00Z' },
    { id: '3', title: 'Atomic Habits', author: 'James Clear', status: STATUSES.WANT, rating: 0, addedAt: '2024-01-03T00:00:00Z' },
  ]

  it('should filter and sort together', () => {
    const result = filterAndSortBooks(sampleBooks, { minRating: 4 }, 'title', 'asc')
    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('1984')
  })
})
