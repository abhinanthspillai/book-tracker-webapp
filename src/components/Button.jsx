import React from 'react'

function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const variantClasses = {
    primary: 'bg-ink text-white hover:bg-opacity-90',
    secondary: 'border border-border text-ink hover:bg-accent-soft',
    danger: 'bg-danger text-white hover:bg-opacity-90',
    ghost: 'text-muted hover:text-ink hover:bg-accent-soft',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
