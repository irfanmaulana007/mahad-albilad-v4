import React from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white'
  }

  return (
    <div className={`px-4 py-2 rounded-md shadow-md ${typeStyles[type]}`}>
      {message}
    </div>
  )
}
