'use client'

import { UpdateUserMutationVariables } from '__generated__/gql/graphql'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import Button from 'components/common/button'

import { User } from 'types/user'

interface UserFormProps {
  user?: User | null
  onSubmit: (data: UpdateUserMutationVariables) => Promise<void>
  loading: boolean
}

export default function UserForm({ user, onSubmit, loading }: UserFormProps) {
  const router = useRouter()

  const [formData, setFormData] = useState({
    id: user?.id.toString() || '',
    name: '',
    email: '',
    password: '',
    username: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        password: '',
        username: '',
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    return await onSubmit(formData).then(() => {
      setFormData({
        id: '',
        name: '',
        email: '',
        password: '',
        username: '',
      })
    })
  }

  return (
    <div className='bg-white p-8 rounded-xl shadow-lg w-full border border-gray-100'>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='group'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Name
          </label>
          <input
            type='text'
            id='name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className='mt-1 block w-full py-2 
              border-0 border-b-2 border-gray-300
              focus:border-b-blue-500 focus:ring-0 focus:outline-none
              transition-all duration-200 ease-in-out hover:border-b-blue-400
              bg-gray-50/30'
            required
          />
        </div>

        <div className='group'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className='mt-1 block w-full py-2 
              border-0 border-b-2 border-gray-300
              focus:border-b-blue-500 focus:ring-0 focus:outline-none
              transition-all duration-200 ease-in-out hover:border-b-blue-400
              bg-gray-50/30'
            required
          />
        </div>

        <div className='group'>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Username
          </label>
          <input
            type='text'
            id='username'
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className='mt-1 block w-full py-2 
              border-0 border-b-2 border-gray-300
              focus:border-b-blue-500 focus:ring-0 focus:outline-none
              transition-all duration-200 ease-in-out hover:border-b-blue-400
              bg-gray-50/30'
            required
          />
        </div>

        <div className='group'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className='mt-1 block w-full py-2 
              border-0 border-b-2 border-gray-300
              focus:border-b-blue-500 focus:ring-0 focus:outline-none
              transition-all duration-200 ease-in-out hover:border-b-blue-400
              bg-gray-50/30'
            required
          />
        </div>

        <div className='flex justify-end space-x-4 pt-6'>
          <Button variant='outline' onClick={() => router.push('/admin/users')}>
            Cancel
          </Button>
          <Button type='submit' isLoading={loading}>
            {user ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  )
}
