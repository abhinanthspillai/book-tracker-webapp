import React, { useEffect } from 'react'

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const typeClasses = {
    success: 'bg-success text-white',
    error: 'bg-danger text-white',
    info: 'bg-ink text-white',
  }

  return (
    <div
      className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${typeClasses[type]} z-50 animate-fade-in`}
      role="alert"
      aria-live="polite"
      style={{ animation: 'fade-in 0.3s ease-out' }}
    >
      <div className="flex items-center gap-3">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-white rounded"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Toast
