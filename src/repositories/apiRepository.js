import { BookRepository } from './bookRepository.js'

/**
 * API Repository - Stub for future REST API integration
 * This is a placeholder implementation that shows how to connect to a backend.
 * Currently unused but ready for when you add a backend.
 */
export class ApiRepository extends BookRepository {
  constructor(baseUrl = '/api/books') {
    super()
    this.baseUrl = baseUrl
  }

  async _fetch(url, options = {}) {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  async getAll() {
    return this._fetch(this.baseUrl)
  }

  async getById(id) {
    return this._fetch(`${this.baseUrl}/${id}`)
  }

  async create(book) {
    return this._fetch(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(book),
    })
  }

  async update(id, updates) {
    return this._fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  }

  async remove(id) {
    return this._fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    })
  }
}
