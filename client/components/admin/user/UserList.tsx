import { useQuery } from '@apollo/client'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { createColumnHelper } from '@tanstack/react-table'
import { UsersQuery, UsersQueryVariables } from '__generated__/gql/graphql'
import Link from 'next/link'
import { useMemo } from 'react'

import { getUsersQuery } from 'services/queries/user'

import { useToast } from 'contexts/ToastContext'

import { DataTable } from 'components/common/table'

import { User } from 'types/user'

const columnHelper = createColumnHelper<Partial<User>>()

const columns = [
  columnHelper.accessor('username', {
    header: 'Username',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('id', {
    header: '',
    cell: (info) => (
      <div className='flex items-center gap-x-3 justify-end'>
        <Link href={`/admin/users/update/${info.getValue()}`}>
          <PencilIcon className='w-4 h-4 hover:text-blue-600 transition-colors' />
        </Link>
        <Link href={`/admin/users/delete/${info.getValue()}`}>
          <TrashIcon className='w-4 h-4 hover:text-red-600 transition-colors' />
        </Link>
      </div>
    ),
  }),
]

export default function UserList() {
  const { data, loading, error } = useQuery<UsersQuery, UsersQueryVariables>(getUsersQuery, {
    fetchPolicy: 'network-only',
  })
  const { showToast } = useToast()

  const users = useMemo(() => {
    if (!data?.users) return []
    return data.users.map((user) => ({
      id: parseInt(user.id),
      username: user.username,
      name: user.name,
      email: user.email,
    }))
  }, [data])

  if (error) {
    showToast(error.message, 'error')
  }

  return <DataTable data={users} columns={columns} title='Users' loading={loading} />
}
