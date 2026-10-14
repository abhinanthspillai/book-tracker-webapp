import React from 'react'

function StarRating({ rating, onRate, size = 'md', readonly = false }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const handleKeyDown = (e, value) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onRate?.(value)
    }
  }

  return (
    <div className="flex gap-1" role="radiogroup" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = value <= rating
        const isHalf = !isFilled && value - 0.5 <= rating

        return (
          <button
            key={value}
            type="button"
            onClick={() => !readonly && onRate?.(value)}
            onKeyDown={(e) => !readonly && handleKeyDown(e, value)}
            disabled={readonly}
            className={`focus:outline-none focus:ring-2 focus:ring-accent rounded ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            aria-label={`Rate ${value} stars`}
            aria-checked={value <= rating}
            role="radio"
            tabIndex={readonly ? -1 : 0}
          >
            <svg
              className={`${sizeClasses[size]} ${isFilled ? 'text-accent' : 'text-gray-300'}`}
              fill={isFilled ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

export default StarRating
