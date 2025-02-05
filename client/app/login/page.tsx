'use client'

import { useState } from 'react'

import useLogin from 'hooks/useLogin'

export default function AdminLoginPage() {
  const { handleLogin, isLoading } = useLogin()
  const [formData, setFormData] = useState({
    username: 'irfanmaulana007',
    password: 'asd123',
    remember: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    handleLogin({
      'email or username': formData.username,
      password: formData.password,
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Admin Login</h2>
          <p className='mt-2 text-sm text-gray-600'>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='space-y-6'>
            <div>
              <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                Username
              </label>
              <input
                type='text'
                id='username'
                name='username'
                required
                value={formData.username}
                onChange={handleChange}
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-150 ease-in-out'
                placeholder='Enter your username'
              />
            </div>

            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                required
                value={formData.password}
                onChange={handleChange}
                className='mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-150 ease-in-out'
                placeholder='Enter your password'
              />
            </div>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember'
                name='remember'
                checked={formData.remember}
                onChange={handleChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 
                         border-gray-300 rounded transition duration-150 ease-in-out'
              />
              <label htmlFor='remember' className='ml-2 block text-sm text-gray-700'>
                Remember me
              </label>
            </div>
            <a href='#' className='text-sm font-medium text-blue-600 hover:text-blue-500'>
              Forgot password?
            </a>
          </div>

          <button
            type='submit'
            className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                     text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
                     focus:outline-none
                     transition duration-150 ease-in-out'>
            {isLoading ? (
              <span className='flex items-center'>
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'>
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
