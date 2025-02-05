import { useQuery } from '@apollo/client'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { createColumnHelper } from '@tanstack/react-table'
import { ArticlesQuery, ArticlesQueryVariables } from '__generated__/gql/graphql'
import moment from 'moment'
import Link from 'next/link'
import { useMemo } from 'react'

import { getArticlesQuery } from 'services/queries/article'

import { useToast } from 'contexts/ToastContext'

import { DataTable } from 'components/common/table'

import { Article } from 'types/article'

const columnHelper = createColumnHelper<Partial<Article>>()

const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => <div className='min-w-[200px]'>{info.getValue() || '-'}</div>,
  }),
  columnHelper.accessor('shortDescription', {
    header: 'Short Description',
    cell: (info) => {
      const value = info.getValue()
      if (!value) return '-'
      return value
    },
  }),
  columnHelper.accessor('author', {
    header: 'Author',
    cell: (info) => <div className='whitespace-nowrap'>{info.getValue()?.name || '-'}</div>,
  }),
  columnHelper.accessor('totalViews', {
    header: 'Views',
    cell: (info) => <div className='whitespace-nowrap'>{info.getValue() || '-'}</div>,
  }),
  columnHelper.accessor('totalLikes', {
    header: 'Likes',
    cell: (info) => <div className='whitespace-nowrap'>{info.getValue() || '-'}</div>,
  }),
  columnHelper.accessor('totalShares', {
    header: 'Shares',
    cell: (info) => <div className='whitespace-nowrap'>{info.getValue() || '-'}</div>,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => {
      const date = info.getValue()
      return (
        <div className='whitespace-nowrap'>{date ? moment(date).format('DD/MM/YYYY') : '-'}</div>
      )
    },
  }),
  columnHelper.accessor('id', {
    header: '',
    cell: (info) => (
      <div className='flex items-center gap-x-3 justify-end'>
        <Link href={`/admin/articles/update/${info.getValue()}`}>
          <PencilIcon className='w-4 h-4 hover:text-blue-600 transition-colors' />
        </Link>
        <Link href={`/admin/articles/delete/${info.getValue()}`}>
          <TrashIcon className='w-4 h-4 hover:text-red-600 transition-colors' />
        </Link>
      </div>
    ),
  }),
]

export default function ArticleList() {
  const { data, loading, error } = useQuery<ArticlesQuery, ArticlesQueryVariables>(
    getArticlesQuery,
    { fetchPolicy: 'network-only' },
  )
  const { showToast } = useToast()

  const articles = useMemo(() => {
    if (!data?.articles) return []


    return data.articles.map((article) => ({
      id: parseInt(article.id),
      title: article.title,
      createdAt: article.createdAt,
      slug: article.slug,
      shortDescription: article.shortDescription,
      totalViews: article.totalViews,
      totalLikes: article.totalLikes,
      totalShares: article.totalShares,
      author: {
        id: parseInt(article.author?.id),
        name: article.author?.name,
      },
    }))
  }, [data])

  if (error) {
    showToast(error.message, 'error')
  }

  return <DataTable data={articles} columns={columns} title='Articles' loading={loading} />
}
