import { BookRepository } from './bookRepository.js'
import { STORAGE_KEY, SCHEMA_VERSION } from '../config/app.js'

export class LocalStorageRepository extends BookRepository {
  constructor(storageKey = STORAGE_KEY) {
    super()
    this.storageKey = storageKey
  }

  _readFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey)
      if (!data) return []
      const parsed = JSON.parse(data)
      
      // Handle schema versioning
      if (parsed.version !== SCHEMA_VERSION) {
        console.warn('Schema version mismatch, clearing data')
        localStorage.removeItem(this.storageKey)
        return []
      }
      
      return parsed.books || []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      localStorage.removeItem(this.storageKey)
      return []
    }
  }

  _writeToStorage(books) {
    try {
      const data = {
        version: SCHEMA_VERSION,
        books,
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem(this.storageKey, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  }

  async getAll() {
    return this._readFromStorage()
  }

  async getById(id) {
    const books = this._readFromStorage()
    return books.find(book => book.id === id) || null
  }

  async create(book) {
    const books = this._readFromStorage()
    const newBook = {
      ...book,
      id: crypto.randomUUID(),
      addedAt: new Date().toISOString(),
    }
    books.push(newBook)
    const success = this._writeToStorage(books)
    return success ? newBook : null
  }

  async update(id, updates) {
    const books = this._readFromStorage()
    const index = books.findIndex(book => book.id === id)
    
    if (index === -1) return null
    
    const updatedBook = {
      ...books[index],
      ...updates,
      id, // Ensure id cannot be changed
    }
    
    books[index] = updatedBook
    const success = this._writeToStorage(books)
    return success ? updatedBook : null
  }

  async remove(id) {
    const books = this._readFromStorage()
    const index = books.findIndex(book => book.id === id)
    
    if (index === -1) return false
    
    books.splice(index, 1)
    const success = this._writeToStorage(books)
    return success
  }

  async clear() {
    localStorage.removeItem(this.storageKey)
    return true
  }
}
