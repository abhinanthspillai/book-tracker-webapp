import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { STATUSES, STATUS_LABELS } from '../config/schema.js'

function Sidebar({ currentFilter, onFilterChange, onLoadSampleData, onExport, onImport }) {
  const location = useLocation()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const filters = [
    { id: 'all', label: 'All Books', icon: '📚' },
    { id: STATUSES.READING, label: STATUS_LABELS[STATUSES.READING], icon: '📖' },
    { id: STATUSES.WANT, label: STATUS_LABELS[STATUSES.WANT], icon: '📝' },
    { id: STATUSES.FINISHED, label: STATUS_LABELS[STATUSES.FINISHED], icon: '✅' },
  ]

  const handleFilterClick = (filterId) => {
    onFilterChange?.(filterId)
    setIsMobileOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-ink text-white rounded-full shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-border">
            <Link to="/" className="text-2xl font-serif text-ink">
              BookShelf
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentFilter === filter.id
                    ? 'bg-accent-soft text-accent'
                    : 'text-muted hover:bg-accent-soft hover:text-ink'
                }`}
                aria-current={currentFilter === filter.id ? 'page' : undefined}
              >
                <span className="text-xl">{filter.icon}</span>
                <span className="font-medium">{filter.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border space-y-2">
            <button
              onClick={onLoadSampleData}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-accent-soft hover:text-ink transition-colors"
            >
              <span className="text-xl">🎲</span>
              <span className="font-medium">Load Sample Data</span>
            </button>
            <button
              onClick={onExport}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-accent-soft hover:text-ink transition-colors"
            >
              <span className="text-xl">📤</span>
              <span className="font-medium">Export</span>
            </button>
            <button
              onClick={onImport}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:bg-accent-soft hover:text-ink transition-colors"
            >
              <span className="text-xl">📥</span>
              <span className="font-medium">Import</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
