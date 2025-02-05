import clsx from 'clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'transparent'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  type?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled,
      icon,
      iconPosition = 'left',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 border border-transparent',
      outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50',
      danger: 'bg-red-600 text-white hover:bg-red-700 border border-transparent',
      transparent: clsx('bg-transparent  text-gray-700', { 'hover:bg-gray-200': !disabled }),
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <button
        type={type}
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 ease-in-out',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
        {...props}>
        {isLoading ? (
          <>
            <svg
              className='animate-spin -ml-1 mr-2 h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
              />
            </svg>
            Loading...
          </>
        ) : (
          <div className='flex items-center gap-x-2'>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </div>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
