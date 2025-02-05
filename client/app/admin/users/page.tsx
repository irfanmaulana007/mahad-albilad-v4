'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import UserList from 'components/admin/user/UserList'
import Button from 'components/common/button'

export default function UserManagement() {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>User Management</h2>

        <Link href='/admin/users/create'>
          <Button icon={<PlusIcon className='w-4 h-4' />} iconPosition='left'>
            Create User
          </Button>
        </Link>
      </div>

      <UserList />
    </div>
  )
}
