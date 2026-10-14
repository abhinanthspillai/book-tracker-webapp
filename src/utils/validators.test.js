import { describe, it, expect } from 'vitest'
import { validateBook, isValidUrl, validatePageProgress } from './validators.js'
import { STATUSES } from '../config/schema.js'

describe('validateBook', () => {
  it('should validate a valid book', () => {
    const book = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      status: STATUSES.FINISHED,
      totalPages: 180,
      currentPage: 180,
      rating: 5,
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('should require title', () => {
    const book = {
      title: '',
      author: 'F. Scott Fitzgerald',
      status: STATUSES.WANT,
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(false)
    expect(result.errors.title).toBeDefined()
  })

  it('should require author', () => {
    const book = {
      title: 'The Great Gatsby',
      author: '',
      status: STATUSES.WANT,
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(false)
    expect(result.errors.author).toBeDefined()
  })

  it('should validate totalPages is positive', () => {
    const book = {
      title: 'Test',
      author: 'Test',
      status: STATUSES.WANT,
      totalPages: 0,
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(false)
    expect(result.errors.totalPages).toBeDefined()
  })

  it('should validate currentPage is not negative', () => {
    const book = {
      title: 'Test',
      author: 'Test',
      status: STATUSES.WANT,
      currentPage: -1,
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(false)
    expect(result.errors.currentPage).toBeDefined()
  })

  it('should validate currentPage does not exceed totalPages', () => {
    const book = {
      title: 'Test',
      author: 'Test',
      status: STATUSES.WANT,
      totalPages: 100,
      currentPage: 150,
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(false)
    expect(result.errors.currentPage).toBeDefined()
  })

  it('should validate rating is between 0 and 5', () => {
    const book = {
      title: 'Test',
      author: 'Test',
      status: STATUSES.WANT,
      rating: 6,
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(false)
    expect(result.errors.rating).toBeDefined()
  })

  it('should validate coverUrl is valid URL', () => {
    const book = {
      title: 'Test',
      author: 'Test',
      status: STATUSES.WANT,
      coverUrl: 'not-a-url',
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(false)
    expect(result.errors.coverUrl).toBeDefined()
  })

  it('should accept valid coverUrl', () => {
    const book = {
      title: 'Test',
      author: 'Test',
      status: STATUSES.WANT,
      coverUrl: 'https://example.com/cover.jpg',
    }
    const result = validateBook(book)
    expect(result.isValid).toBe(true)
  })
})

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://example.com')).toBe(true)
  })

  it('should return true for empty string', () => {
    expect(isValidUrl('')).toBe(true)
  })

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false)
    expect(isValidUrl('example.com')).toBe(false)
  })
})

describe('validatePageProgress', () => {
  it('should return true when no totalPages', () => {
    expect(validatePageProgress(50, null)).toBe(true)
    expect(validatePageProgress(50, undefined)).toBe(true)
  })

  it('should return true when currentPage <= totalPages', () => {
    expect(validatePageProgress(50, 100)).toBe(true)
    expect(validatePageProgress(100, 100)).toBe(true)
  })

  it('should return false when currentPage > totalPages', () => {
    expect(validatePageProgress(150, 100)).toBe(false)
  })
})
