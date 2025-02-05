'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

import ArticleList from 'components/admin/article/ArticleList'
import Button from 'components/common/button'

export default function ArticleManagement() {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Article Management</h2>

        <Link href='/admin/articles/create'>
          <Button icon={<PlusIcon className='w-4 h-4' />} iconPosition='left'>
            Create Article
          </Button>
        </Link>
      </div>

      <ArticleList />
    </div>
  )
}
