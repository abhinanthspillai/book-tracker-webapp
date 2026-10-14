import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useBooks } from '../../hooks/useBooks.js'
import { STATUS_LABELS, STATUS_COLORS } from '../../config/schema.js'
import { getCoverUrl, getProgressPercentage } from '../../utils/coverGradient.js'
import StarRating from '../../components/StarRating.jsx'
import Gauge from '../../components/Gauge.jsx'
import BookCard from '../../components/BookCard.jsx'
import Button from '../../components/Button.jsx'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import Toast from '../../components/Toast.jsx'
import EmptyState from '../../components/EmptyState.jsx'

function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { books, updateBook, deleteBook, updateStatus, updateRating } = useBooks()
  
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [toast, setToast] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const foundBook = books.find(b => b.id === id)
    setBook(foundBook || null)
    if (foundBook) {
      setCurrentPage(foundBook.currentPage || 0)
      setNotes(foundBook.notes || '')
    }
    setLoading(false)
  }, [id, books])

  const handleDelete = async () => {
    const result = await deleteBook(id)
    if (result.success) {
      setShowDeleteDialog(false)
      setToast({ message: 'Book deleted successfully', type: 'success' })
      navigate('/app')
    } else {
      setToast({ message: result.error || 'Failed to delete book', type: 'error' })
    }
  }

  const handleRate = async (rating) => {
    const result = await updateRating(id, rating)
    if (result.success) {
      setToast({ message: 'Rating updated', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to update rating', type: 'error' })
    }
  }

  const handleStatusChange = async (newStatus) => {
    const result = await updateStatus(id, newStatus)
    if (result.success) {
      setToast({ message: 'Status updated', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to update status', type: 'error' })
    }
  }

  const handlePageUpdate = async () => {
    const result = await updateBook(id, { currentPage })
    if (result.success) {
      setToast({ message: 'Progress updated', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to update progress', type: 'error' })
    }
  }

  const handleNotesSave = async () => {
    const result = await updateBook(id, { notes })
    if (result.success) {
      setToast({ message: 'Notes saved', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to save notes', type: 'error' })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <EmptyState
          title="Book not found"
          description="The book you're looking for doesn't exist or has been deleted."
          action={() => navigate('/app')}
          actionLabel="Back to Library"
        />
      </div>
    )
  }

  const relatedByAuthor = books.filter(b => b.author === book.author && b.id !== book.id).slice(0, 4)
  const relatedByGenre = book.genre ? books.filter(b => b.genre === book.genre && b.id !== book.id).slice(0, 4) : []

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/app" className="text-muted hover:text-accent transition-colors">
            ← Back to Library
          </Link>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Book Header */}
            <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
              <div className="flex gap-6">
                <img
                  src={getCoverUrl(book)}
                  alt={book.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-soft"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-serif text-ink mb-2">{book.title}</h1>
                  <p className="text-lg text-muted mb-4">{book.author}</p>
                  <StarRating rating={book.rating} onRate={handleRate} size="lg" />
                  
                  <div className="flex gap-3 mt-6">
                    <Button variant="secondary" onClick={() => setShowEditForm(true)}>
                      Edit Book
                    </Button>
                    <Button variant="danger" onClick={() => setShowDeleteDialog(true)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="bg-surface rounded-card p-4 shadow-soft border border-border">
                <p className="text-sm text-muted mb-1">Pages</p>
                <p className="text-lg font-semibold text-ink">{book.totalPages || '—'}</p>
              </div>
              <div className="bg-surface rounded-card p-4 shadow-soft border border-border">
                <p className="text-sm text-muted mb-1">Genre</p>
                <p className="text-lg font-semibold text-ink">{book.genre || '—'}</p>
              </div>
              <div className="bg-surface rounded-card p-4 shadow-soft border border-border">
                <p className="text-sm text-muted mb-1">Status</p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: STATUS_COLORS[book.status] }}
                >
                  {STATUS_LABELS[book.status]}
                </p>
              </div>
              <div className="bg-surface rounded-card p-4 shadow-soft border border-border">
                <p className="text-sm text-muted mb-1">Added</p>
                <p className="text-lg font-semibold text-ink">
                  {new Date(book.addedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-surface rounded-card p-4 shadow-soft border border-border">
                <p className="text-sm text-muted mb-1">Finished</p>
                <p className="text-lg font-semibold text-ink">
                  {book.finishedAt ? new Date(book.finishedAt).toLocaleDateString() : '—'}
                </p>
              </div>
            </div>

            {/* Progress Section */}
            {book.status === 'reading' && book.totalPages && (
              <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
                <h2 className="text-xl font-serif text-ink mb-4">Reading Progress</h2>
                <div className="flex items-center gap-8">
                  <Gauge
                    value={getProgressPercentage(book.currentPage, book.totalPages)}
                    max={100}
                    size="lg"
                    color="accent"
                  />
                  <div className="flex-1 space-y-4">
                    <div>
                      <label htmlFor="currentPage" className="block text-sm font-medium text-ink mb-2">
                        Current Page
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          id="currentPage"
                          value={currentPage}
                          onChange={(e) => setCurrentPage(Number(e.target.value))}
                          min="0"
                          max={book.totalPages}
                          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <Button onClick={handlePageUpdate}>Update</Button>
                      </div>
                      <p className="text-sm text-muted mt-1">
                        {book.currentPage} of {book.totalPages} pages
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
              <h2 className="text-xl font-serif text-ink mb-4">Notes</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={handleNotesSave}
                placeholder="Add your notes about this book..."
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
              <p className="text-sm text-muted mt-2">Notes are saved automatically when you click away</p>
            </div>

            {/* Related Books */}
            {relatedByAuthor.length > 0 && (
              <div>
                <h2 className="text-xl font-serif text-ink mb-4">More by {book.author}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relatedByAuthor.map((relatedBook) => (
                    <BookCard key={relatedBook.id} book={relatedBook} view="grid" />
                  ))}
                </div>
              </div>
            )}

            {relatedByGenre.length > 0 && (
              <div>
                <h2 className="text-xl font-serif text-ink mb-4">More in {book.genre}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relatedByGenre.map((relatedBook) => (
                    <BookCard key={relatedBook.id} book={relatedBook} view="grid" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
              <h3 className="text-lg font-serif text-ink mb-4">Update Status</h3>
              <div className="space-y-2">
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() => handleStatusChange(value)}
                    className={`w-full px-4 py-3 rounded-lg transition-colors ${
                      book.status === value
                        ? 'bg-accent-soft text-accent font-medium'
                        : 'text-muted hover:bg-accent-soft hover:text-ink'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-surface rounded-card-lg p-6 shadow-soft border border-border">
              <h3 className="text-lg font-serif text-ink mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted">Rating</span>
                  <span className="font-medium text-ink">{book.rating > 0 ? `${book.rating}/5` : 'Not rated'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Progress</span>
                  <span className="font-medium text-ink">
                    {book.totalPages ? `${getProgressPercentage(book.currentPage, book.totalPages)}%` : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default BookDetail
