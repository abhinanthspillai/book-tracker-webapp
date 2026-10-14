import React from 'react'

function EmptyState({ icon: Icon, title, description, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && (
        <div className="p-4 bg-accent-soft rounded-full mb-4">
          <Icon className="w-12 h-12 text-accent" />
        </div>
      )}
      <h3 className="text-xl font-serif text-ink mb-2">{title}</h3>
      <p className="text-muted text-center max-w-md mb-6">{description}</p>
      {action && (
        <button
          onClick={action}
          className="px-6 py-2 bg-ink text-white rounded-full hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
