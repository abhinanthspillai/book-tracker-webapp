import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooks } from '../../hooks/useBooks.js'
import { STATUSES } from '../../config/schema.js'
import { filterAndSortBooks } from '../../utils/filterSort.js'
import Sidebar from '../../components/Sidebar.jsx'
import BookCard from '../../components/BookCard.jsx'
import BookForm from '../../components/BookForm.jsx'
import StatCard from '../../components/StatCard.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import Toast from '../../components/Toast.jsx'
import Button from '../../components/Button.jsx'
import { BookOpen, Clock, Star, CheckCircle } from './icons.jsx'

function Library() {
  const navigate = useNavigate()
  const { books, loading, error, stats, addBook, updateBook, deleteBook, updateStatus, updateRating, loadSampleData } = useBooks()
  
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('addedAt')
  const [sortDirection, setSortDirection] = useState('desc')
  const [view, setView] = useState('grid')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [deletingBook, setDeletingBook] = useState(null)
  const [toast, setToast] = useState(null)

  const filteredBooks = filterAndSortBooks(
    books,
    {
      search,
      status: filter === 'all' ? undefined : filter,
    },
    sortBy,
    sortDirection
  )

  const handleAddBook = async (formData) => {
    const result = await addBook(formData)
    if (result.success) {
      setShowAddForm(false)
      setToast({ message: 'Book added successfully', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to add book', type: 'error' })
    }
  }

  const handleEditBook = async (formData) => {
    const result = await updateBook(editingBook.id, formData)
    if (result.success) {
      setEditingBook(null)
      setToast({ message: 'Book updated successfully', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to update book', type: 'error' })
    }
  }

  const handleDeleteConfirm = async () => {
    const result = await deleteBook(deletingBook)
    if (result.success) {
      setDeletingBook(null)
      setToast({ message: 'Book deleted successfully', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to delete book', type: 'error' })
    }
  }

  const handleStatusChange = async (id, newStatus) => {
    const result = await updateStatus(id, newStatus)
    if (!result.success) {
      setToast({ message: result.error || 'Failed to update status', type: 'error' })
    }
  }

  const handleRate = async (id, rating) => {
    const result = await updateRating(id, rating)
    if (!result.success) {
      setToast({ message: result.error || 'Failed to update rating', type: 'error' })
    }
  }

  const handleLoadSampleData = async () => {
    const result = await loadSampleData()
    if (result.success) {
      setToast({ message: 'Sample data loaded successfully', type: 'success' })
    } else {
      setToast({ message: result.error || 'Failed to load sample data', type: 'error' })
    }
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(books, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'bookshelf-export.json'
    link.click()
    URL.revokeObjectURL(url)
    setToast({ message: 'Books exported successfully', type: 'success' })
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json'
    input.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return
      
      try {
        const text = await file.text()
        const importedBooks = JSON.parse(text)
        
        for (const book of importedBooks) {
          await addBook(book)
        }
        
        setToast({ message: 'Books imported successfully', type: 'success' })
      } catch (err) {
        setToast({ message: 'Failed to import books', type: 'error' })
      }
    }
    input.click()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-danger">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        currentFilter={filter}
        onFilterChange={setFilter}
        onLoadSampleData={handleLoadSampleData}
        onExport={handleExport}
        onImport={handleImport}
      />

      <main className="flex-1 lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-ink mb-2">Library</h1>
            <p className="text-muted">Track your reading journey</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Books"
              value={stats.total}
              delta={stats.booksAddedThisMonth}
              icon={BookOpen}
            />
            <StatCard
              label="Reading"
              value={stats.reading}
              icon={Clock}
              color="accent"
            />
            <StatCard
              label="Finished"
              value={stats.finished}
              delta={stats.booksFinishedThisMonth}
              icon={CheckCircle}
              color="success"
            />
            <StatCard
              label="Pages Read"
              value={stats.pagesRead.toLocaleString()}
              icon={Star}
              color="accent"
            />
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="addedAt">Date Added</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="rating">Rating</option>
              </select>
              <button
                onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent-soft transition-colors"
                aria-label={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortDirection === 'asc' ? '↑' : '↓'}
              </button>
              <button
                onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                className="px-4 py-2 border border-border rounded-lg hover:bg-accent-soft transition-colors"
                aria-label={`Switch to ${view === 'grid' ? 'list' : 'grid'} view`}
              >
                {view === 'grid' ? '☰' : '⊞'}
              </button>
              <Button onClick={() => setShowAddForm(true)}>Add Book</Button>
            </div>
          </div>

          {/* Book Grid */}
          {filteredBooks.length === 0 ? (
            <EmptyState
              title={search ? 'No books found' : books.length === 0 ? 'Your library is empty' : 'No books in this category'}
              description={search ? 'Try a different search term' : books.length === 0 ? 'Add your first book or load sample data to get started' : 'Select a different category'}
              action={books.length === 0 ? handleLoadSampleData : () => setShowAddForm(true)}
              actionLabel={books.length === 0 ? 'Load Sample Data' : 'Add Book'}
            />
          ) : (
            <div className={`grid gap-4 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  view={view}
                  onStatusChange={handleStatusChange}
                  onDelete={setDeletingBook}
                  onEdit={setEditingBook}
                  onRate={handleRate}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowAddForm(false)} />
          <div className="relative bg-surface rounded-card-lg shadow-soft-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-serif text-ink mb-4">Add New Book</h2>
            <BookForm onSubmit={handleAddBook} onCancel={() => setShowAddForm(false)} />
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setEditingBook(null)} />
          <div className="relative bg-surface rounded-card-lg shadow-soft-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-serif text-ink mb-4">Edit Book</h2>
            <BookForm
              book={editingBook}
              onSubmit={handleEditBook}
              onCancel={() => setEditingBook(null)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingBook}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingBook(null)}
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

export default Library
