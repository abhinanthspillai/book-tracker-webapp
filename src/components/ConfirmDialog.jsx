import React from 'react'

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmLabel = 'Confirm', cancelLabel = 'Cancel' }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onCancel} />
      <div className="relative bg-surface rounded-card-lg shadow-soft-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-serif text-ink mb-2">{title}</h3>
        <p className="text-muted mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-border rounded-full text-ink hover:bg-accent-soft transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-danger text-white rounded-full hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-danger"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
