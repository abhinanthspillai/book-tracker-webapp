import React from 'react'

function Gauge({ value, max = 100, size = 'md', color = 'accent' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const radius = size === 'sm' ? 30 : size === 'md' ? 40 : 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  const colorClasses = {
    accent: '#B8812E',
    success: '#3F7D58',
    muted: '#6B645A',
  }

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg className="transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#E8E0D2"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={colorClasses[color]}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-ink">{Math.round(percentage)}%</span>
      </div>
    </div>
  )
}

export default Gauge
