/**
 * Book Repository Interface
 * Documents the contract that all repository implementations must follow.
 * All methods are async to support both localStorage and API implementations.
 */

export class BookRepository {
  /**
   * Get all books
   * @returns {Promise<Array>} Array of book objects
   */
  async getAll() {
    throw new Error('getAll must be implemented')
  }

  /**
   * Get a book by ID
   * @param {string} id - Book ID
   * @returns {Promise<Object|null>} Book object or null if not found
   */
  async getById(id) {
    throw new Error('getById must be implemented')
  }

  /**
   * Create a new book
   * @param {Object} book - Book object without id
   * @returns {Promise<Object>} Created book with id
   */
  async create(book) {
    throw new Error('create must be implemented')
  }

  /**
   * Update an existing book
   * @param {string} id - Book ID
   * @param {Object} updates - Partial book object with fields to update
   * @returns {Promise<Object|null>} Updated book or null if not found
   */
  async update(id, updates) {
    throw new Error('update must be implemented')
  }

  /**
   * Remove a book
   * @param {string} id - Book ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async remove(id) {
    throw new Error('remove must be implemented')
  }
}
