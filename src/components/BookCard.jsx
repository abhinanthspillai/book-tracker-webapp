import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating.jsx'
import ProgressBar from './ProgressBar.jsx'
import { STATUS_LABELS, STATUS_COLORS } from '../config/schema.js'
import { getCoverUrl } from '../utils/coverGradient.js'
import { getProgressPercentage } from '../utils/stats.js'

function BookCard({ book, onStatusChange, onDelete, onEdit, onRate, view = 'grid' }) {
  const [showMenu, setShowMenu] = useState(false)

  const handleStatusChange = (e) => {
    e.stopPropagation()
    onStatusChange?.(book.id, e.target.value)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete?.(book.id)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit?.(book)
  }

  const handleRate = (rating) => {
    onRate?.(book.id, rating)
  }

  if (view === 'list') {
    return (
      <div className="bg-surface rounded-card p-4 shadow-soft border border-border hover:shadow-soft-lg transition-shadow">
        <div className="flex gap-4">
          <Link to={`/app/books/${book.id}`} className="flex-shrink-0">
            <img
              src={getCoverUrl(book)}
              alt={book.title}
              className="w-16 h-24 object-cover rounded"
              loading="lazy"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <Link to={`/app/books/${book.id}`} className="block">
              <h3 className="font-serif text-ink truncate">{book.title}</h3>
              <p className="text-sm text-muted truncate">{book.author}</p>
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <select
                value={book.status}
                onChange={handleStatusChange}
                className="text-xs px-2 py-1 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                style={{ backgroundColor: STATUS_COLORS[book.status] + '20', color: STATUS_COLORS[book.status] }}
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              {book.status === 'reading' && book.totalPages && (
                <ProgressBar progress={getProgressPercentage(book.currentPage, book.totalPages)} size="sm" />
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StarRating rating={book.rating} onRate={handleRate} size="sm" readonly={!onRate} />
            <div className="flex gap-1">
              <button
                onClick={handleEdit}
                className="text-muted hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded p-1"
                aria-label="Edit book"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="text-muted hover:text-danger transition-colors focus:outline-none focus:ring-2 focus:ring-danger rounded p-1"
                aria-label="Delete book"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface rounded-card p-4 shadow-soft border border-border hover:shadow-soft-lg transition-shadow group">
      <div className="relative">
        <Link to={`/app/books/${book.id}`}>
          <img
            src={getCoverUrl(book)}
            alt={book.title}
            className="w-full h-48 object-cover rounded-lg mb-3"
            loading="lazy"
          />
        </Link>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            onClick={handleEdit}
            className="p-1.5 bg-white rounded-full shadow hover:bg-accent hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Edit book"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 bg-white rounded-full shadow hover:bg-danger hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-danger"
            aria-label="Delete book"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <Link to={`/app/books/${book.id}`}>
        <h3 className="font-serif text-ink truncate">{book.title}</h3>
        <p className="text-sm text-muted truncate">{book.author}</p>
      </Link>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <select
            value={book.status}
            onChange={handleStatusChange}
            className="text-xs px-2 py-1 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            style={{ backgroundColor: STATUS_COLORS[book.status] + '20', color: STATUS_COLORS[book.status] }}
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <StarRating rating={book.rating} onRate={handleRate} size="sm" readonly={!onRate} />
        </div>
        {book.status === 'reading' && book.totalPages && (
          <ProgressBar progress={getProgressPercentage(book.currentPage, book.totalPages)} size="sm" />
        )}
      </div>
    </div>
  )
}

export default BookCard
