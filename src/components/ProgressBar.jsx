import React from 'react'

function ProgressBar({ progress, size = 'md', showLabel = false, color = 'accent' }) {
  const percentage = Math.min(100, Math.max(0, progress))
  
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const colorClasses = {
    accent: 'bg-accent',
    success: 'bg-success',
    muted: 'bg-muted',
  }

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      {showLabel && (
        <p className="text-sm text-muted mt-1">{percentage}%</p>
      )}
    </div>
  )
}

export default ProgressBar
