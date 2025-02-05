'use client'

import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import {
  FindUserByIdQuery,
  FindUserByIdQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '__generated__/gql/graphql'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { updateUserMutation } from 'services/mutations/user'
import { findUserByIdQuery } from 'services/queries/user'

import { useToast } from 'contexts/ToastContext'

import UserForm from 'components/admin/user/UserForm'

export default function UpdateUserPage() {
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

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] = useMutation<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >(updateUserMutation)

  const user = useMemo(() => {
    if (!data?.findUserById) return null
    return {
      id: parseInt(data.findUserById.id),
      name: data.findUserById.name,
      email: data.findUserById.email,
      username: data.findUserById.username,
    }
  }, [data])

  const handleUpdateUser = async (data: UpdateUserMutationVariables) => {
    return await updateUser({ variables: { ...data, id: userId } }).then(() => {
      showToast('Update user successfully', 'success')
      apolloClient.refetchQueries({ include: ['Users'] })
      router.push('/admin/users')
    })
  }

  if (updateUserError) {
    showToast('Update user failed. Please try again.', 'error')
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2 text-sm text-gray-500'>
        <Link href='/admin/users' className='hover:text-gray-700 flex items-center gap-x-1'>
          <ChevronLeftIcon className='w-4 h-4' />
          Users
        </Link>
        <span>/</span>
        <span className='text-gray-700'>Update</span>
      </div>

      <h1 className='text-2xl font-bold'>Update User</h1>

      <UserForm
        onSubmit={handleUpdateUser}
        loading={updateUserLoading || userLoading}
        user={user}
      />
    </div>
  )
}
