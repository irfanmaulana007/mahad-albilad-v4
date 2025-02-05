'use client'

import { useMutation } from '@apollo/client'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { CreateUserMutation } from '__generated__/gql/graphql'
import { CreateUserMutationVariables } from '__generated__/gql/graphql'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { createUserMutation } from 'services/mutations/user'

import { useToast } from 'contexts/ToastContext'

import UserForm from 'components/admin/user/UserForm'

export default function CreateUserPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [createUser, { loading, error }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(createUserMutation)

  const handleCreateUser = async (data: CreateUserMutationVariables) => {
    return await createUser({ variables: data }).then(() => {
      showToast('Create user successfully', 'success')
      router.push('/admin/users')
    })
  }

  if (error) {
    showToast('Create user failed. Please try again.', 'error')
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2 text-sm text-gray-500'>
        <Link href='/admin/users' className='hover:text-gray-700 flex items-center gap-x-1'>
          <ChevronLeftIcon className='w-4 h-4' />
          Users
        </Link>
        <span>/</span>
        <span className='text-gray-700'>Create</span>
      </div>

      <h1 className='text-2xl font-bold'>Create User</h1>

      <UserForm onSubmit={handleCreateUser} loading={loading} />
    </div>
  )
}
