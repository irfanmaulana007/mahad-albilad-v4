'use client'

import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import {
  DeleteUserMutation,
  DeleteUserMutationVariables,
  FindUserByIdQuery,
  FindUserByIdQueryVariables,
} from '__generated__/gql/graphql'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { deleteUserMutation } from 'services/mutations/user'
import { findUserByIdQuery } from 'services/queries/user'

import { useToast } from 'contexts/ToastContext'

import Button from 'components/common/button'

export default function DeleteUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.slug as string
  const { showToast } = useToast()

  const apolloClient = useApolloClient()

  const { data, loading: userLoading } = useQuery<FindUserByIdQuery, FindUserByIdQueryVariables>(
    findUserByIdQuery,
    {
      variables: {
        userId: userId,
      },
    },
  )

  const [deleteUser, { loading: deleteUserLoading, error: deleteUserError }] = useMutation<
    DeleteUserMutation,
    DeleteUserMutationVariables
  >(deleteUserMutation)

  const user = useMemo(() => {
    if (!data?.findUserById) return null
    return {
      id: parseInt(data.findUserById.id),
      name: data.findUserById.name,
      email: data.findUserById.email,
      username: data.findUserById.username,
    }
  }, [data])

  const handleDeleteUser = async () => {
    return await deleteUser({ variables: { id: userId } }).then(() => {
      showToast('Delete user successfully', 'success')
      apolloClient.refetchQueries({ include: ['Users'] })
      router.push('/admin/users')
    })
  }

  if (deleteUserError) {
    showToast('Delete user failed. Please try again.', 'error')
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2 text-sm text-gray-500'>
        <Link href='/admin/users' className='hover:text-gray-700 flex items-center gap-x-1'>
          <ChevronLeftIcon className='w-4 h-4' />
          Users
        </Link>
        <span>/</span>
        <span className='text-gray-700'>Delete</span>
      </div>

      <h1 className='text-2xl font-bold'>Delete User</h1>

      <div className='bg-white p-10 rounded-md'>
        <div className='flex flex-col items-center gap-y-4'>
          <p className='text-lg font-medium'>
            Are you sure you want to delete this user{' '}
            <span className='font-bold'>{user?.name}</span>?
          </p>
          <p className='text-sm text-gray-500'>This action cannot be undone.</p>

          <div className='flex items-center gap-x-2'>
            <Button
              onClick={handleDeleteUser}
              isLoading={deleteUserLoading || userLoading}
              variant='danger'>
              Delete
            </Button>
            <Button onClick={() => router.push('/admin/users')} variant='secondary'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
