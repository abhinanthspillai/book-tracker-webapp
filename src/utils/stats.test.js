import { describe, it, expect } from 'vitest'
import { calculateStats, getBooksByStatus, getBooksByGenre, getProgressPercentage } from './stats.js'
import { STATUSES } from '../config/schema.js'

describe('calculateStats', () => {
  it('should calculate stats for empty array', () => {
    const stats = calculateStats([])
    expect(stats.total).toBe(0)
    expect(stats.reading).toBe(0)
    expect(stats.finished).toBe(0)
    expect(stats.wantToRead).toBe(0)
    expect(stats.pagesRead).toBe(0)
    expect(stats.averageRating).toBe(0)
  })

  it('should calculate stats correctly', () => {
    const books = [
      { id: '1', status: STATUSES.READING, totalPages: 300, currentPage: 150, rating: 4 },
      { id: '2', status: STATUSES.FINISHED, totalPages: 200, currentPage: 200, rating: 5 },
      { id: '3', status: STATUSES.WANT, totalPages: 250, currentPage: 0, rating: 0 },
    ]
    const stats = calculateStats(books)
    expect(stats.total).toBe(3)
    expect(stats.reading).toBe(1)
    expect(stats.finished).toBe(1)
    expect(stats.wantToRead).toBe(1)
    expect(stats.pagesRead).toBe(350) // 150 + 200
    expect(stats.averageRating).toBe(4.5) // (4 + 5) / 2
  })

  it('should calculate pages read correctly for finished books', () => {
    const books = [
      { id: '1', status: STATUSES.FINISHED, totalPages: 200, currentPage: 200, rating: 5 },
      { id: '2', status: STATUSES.FINISHED, totalPages: 300, currentPage: 300, rating: 4 },
    ]
    const stats = calculateStats(books)
    expect(stats.pagesRead).toBe(500)
  })

  it('should calculate average rating only for rated books', () => {
    const books = [
      { id: '1', rating: 5 },
      { id: '2', rating: 0 },
      { id: '3', rating: 0 },
    ]
    const stats = calculateStats(books)
    expect(stats.averageRating).toBe(5)
  })
})

describe('getBooksByStatus', () => {
  const books = [
    { id: '1', status: STATUSES.READING },
    { id: '2', status: STATUSES.FINISHED },
    { id: '3', status: STATUSES.READING },
  ]

  it('should filter books by status', () => {
    const reading = getBooksByStatus(books, STATUSES.READING)
    expect(reading).toHaveLength(2)
    expect(reading.every(b => b.status === STATUSES.READING)).toBe(true)
  })
})

describe('getBooksByGenre', () => {
  const books = [
    { id: '1', genre: 'Fiction' },
    { id: '2', genre: 'Science Fiction' },
    { id: '3', genre: 'Fiction' },
  ]

  it('should filter books by genre', () => {
    const fiction = getBooksByGenre(books, 'Fiction')
    expect(fiction).toHaveLength(2)
    expect(fiction.every(b => b.genre === 'Fiction')).toBe(true)
  })
})

describe('getProgressPercentage', () => {
  it('should return 0 when no totalPages', () => {
    expect(getProgressPercentage(50, null)).toBe(0)
    expect(getProgressPercentage(50, 0)).toBe(0)
  })

  it('should calculate percentage correctly', () => {
    expect(getProgressPercentage(50, 100)).toBe(50)
    expect(getProgressPercentage(100, 100)).toBe(100)
    expect(getProgressPercentage(25, 100)).toBe(25)
  })

  it('should cap at 100', () => {
    expect(getProgressPercentage(150, 100)).toBe(100)
  })
})
