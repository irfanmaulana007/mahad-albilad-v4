import React, { createContext, ReactNode, useContext } from 'react'

import { Toast } from 'components/message'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastMessage {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showToast = (message: string, type: ToastType, duration = 5000) => {
    const id = message.toLocaleLowerCase().replace(/\s+/g, '-')

    // Check if a toast with the same message already exists
    if (toasts.some((toast) => toast.message === message)) {
      return
    }
    
    setToasts((prev) => [...prev, { id, message, type, duration }])

    // Auto-remove toast after duration
    setTimeout(() => {
      removeToast(id)
    }, duration)
  }

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className='fixed top-2 right-2 m-4 z-50 flex flex-col gap-2'>
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className='animate-slide-in'
            style={{
              opacity: Math.max(0.5, 1 - index * 0.2),
              transform: `translateY(${index * 0.5}rem)`,
            }}>
            <Toast message={toast.message} type={toast.type} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
