import React from 'react'

function StatCard({ label, value, delta, icon: Icon, color = 'ink' }) {
  const colorClasses = {
    ink: 'text-ink',
    accent: 'text-accent',
    success: 'text-success',
    muted: 'text-muted',
  }

  return (
    <div className="bg-surface rounded-card p-6 shadow-soft border border-border">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted mb-1">{label}</p>
          <p className={`text-3xl font-serif font-bold ${colorClasses[color]}`}>
            {value}
          </p>
          {delta !== undefined && (
            <p className="text-sm text-muted mt-1">
              {delta !== null && delta > 0 ? `+${delta} this month` : delta === 0 ? 'No change this month' : ''}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-2 bg-accent-soft rounded-lg">
            <Icon className="w-5 h-5 text-accent" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard
