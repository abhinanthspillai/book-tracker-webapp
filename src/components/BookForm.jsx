import React, { useState, useEffect } from 'react'
import { GENRES, STATUSES, STATUS_LABELS } from '../config/schema.js'

function BookForm({ book, onSubmit, onCancel, errors = {} }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    status: STATUSES.WANT,
    totalPages: '',
    currentPage: 0,
    rating: 0,
    notes: '',
    coverUrl: '',
  })

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || '',
        status: book.status || STATUSES.WANT,
        totalPages: book.totalPages || '',
        currentPage: book.currentPage || 0,
        rating: book.rating || 0,
        notes: book.notes || '',
        coverUrl: book.coverUrl || '',
      })
    }
  }, [book])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-ink mb-1">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          required
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-danger mt-1" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-ink mb-1">
          Author <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          required
          aria-invalid={errors.author ? 'true' : 'false'}
          aria-describedby={errors.author ? 'author-error' : undefined}
        />
        {errors.author && (
          <p id="author-error" className="text-sm text-danger mt-1" role="alert">
            {errors.author}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-ink mb-1">
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          <option value="">Select genre</option>
          {GENRES.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-ink mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="totalPages" className="block text-sm font-medium text-ink mb-1">
            Total Pages
          </label>
          <input
            type="number"
            id="totalPages"
            name="totalPages"
            value={formData.totalPages}
            onChange={handleChange}
            min="1"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            aria-invalid={errors.totalPages ? 'true' : 'false'}
            aria-describedby={errors.totalPages ? 'totalPages-error' : undefined}
          />
          {errors.totalPages && (
            <p id="totalPages-error" className="text-sm text-danger mt-1" role="alert">
              {errors.totalPages}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="currentPage" className="block text-sm font-medium text-ink mb-1">
            Current Page
          </label>
          <input
            type="number"
            id="currentPage"
            name="currentPage"
            value={formData.currentPage}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            aria-invalid={errors.currentPage ? 'true' : 'false'}
            aria-describedby={errors.currentPage ? 'currentPage-error' : undefined}
          />
          {errors.currentPage && (
            <p id="currentPage-error" className="text-sm text-danger mt-1" role="alert">
              {errors.currentPage}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-ink mb-1">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.5"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          aria-invalid={errors.rating ? 'true' : 'false'}
          aria-describedby={errors.rating ? 'rating-error' : undefined}
        />
        {errors.rating && (
          <p id="rating-error" className="text-sm text-danger mt-1" role="alert">
            {errors.rating}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="coverUrl" className="block text-sm font-medium text-ink mb-1">
          Cover URL
        </label>
        <input
          type="url"
          id="coverUrl"
          name="coverUrl"
          value={formData.coverUrl}
          onChange={handleChange}
          placeholder="https://example.com/cover.jpg"
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          aria-invalid={errors.coverUrl ? 'true' : 'false'}
          aria-describedby={errors.coverUrl ? 'coverUrl-error' : undefined}
        />
        {errors.coverUrl && (
          <p id="coverUrl-error" className="text-sm text-danger mt-1" role="alert">
            {errors.coverUrl}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-ink mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          aria-invalid={errors.notes ? 'true' : 'false'}
          aria-describedby={errors.notes ? 'notes-error' : undefined}
        />
        {errors.notes && (
          <p id="notes-error" className="text-sm text-danger mt-1" role="alert">
            {errors.notes}
          </p>
        )}
      </div>

      <div className="flex gap-3 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-border rounded-full text-ink hover:bg-accent-soft transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-ink text-white rounded-full hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {book ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  )
}

export default BookForm
