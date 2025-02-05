'use client'

import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import {
  DeleteArticleMutation,
  DeleteArticleMutationVariables,
  FindArticleByIdQuery,
  FindArticleByIdQueryVariables,
} from '__generated__/gql/graphql'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { deleteArticleMutation } from 'services/mutations/article'
import { findArticleByIdQuery } from 'services/queries/article'

import { useToast } from 'contexts/ToastContext'

import Button from 'components/common/button'

export default function DeleteArticlePage() {
  const router = useRouter()
  const params = useParams()
  const articleId = params?.slug as string
  const { showToast } = useToast()

  const apolloClient = useApolloClient()

  const { data, loading: articleLoading } = useQuery<
    FindArticleByIdQuery,
    FindArticleByIdQueryVariables
  >(findArticleByIdQuery, {
    variables: {
      articleId: articleId,
    },
  })

  const [deleteArticle, { loading: deleteArticleLoading, error: deleteArticleError }] = useMutation<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >(deleteArticleMutation)

  const article = useMemo(() => {
    if (!data?.findArticleById) return null
    return {
      id: parseInt(data.findArticleById.id),
      title: data.findArticleById.title,
      slug: data.findArticleById.slug,
      shortDescription: data.findArticleById.shortDescription,
      thumbnail: data.findArticleById.thumbnail,
    }
  }, [data])

  const handleDeleteArticle = async () => {
    return await deleteArticle({ variables: { id: articleId } }).then(() => {
      showToast('Delete article successfully', 'success')
      apolloClient.refetchQueries({ include: ['Articles'] })
      router.push('/admin/articles')
    })
  }

  if (deleteArticleError) {
    showToast('Delete article failed. Please try again.', 'error')
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2 text-sm text-gray-500'>
        <Link href='/admin/articles' className='hover:text-gray-700 flex items-center gap-x-1'>
          <ChevronLeftIcon className='w-4 h-4' />
          Articles
        </Link>
        <span>/</span>
        <span className='text-gray-700'>Delete</span>
      </div>

      <h1 className='text-2xl font-bold'>Delete Article</h1>

      <div className='bg-white p-10 rounded-md'>
        <div className='flex flex-col items-center gap-y-4'>
          <p className='text-lg font-medium'>
            Are you sure you want to delete this article{' '}
            <span className='font-bold'>{article?.title}</span>?
          </p>
          <p className='text-sm text-gray-500'>This action cannot be undone.</p>

          <div className='flex items-center gap-x-2'>
            <Button
              onClick={handleDeleteArticle}
              isLoading={deleteArticleLoading || articleLoading}
              variant='danger'>
              Delete
            </Button>
            <Button onClick={() => router.push('/admin/articles')} variant='secondary'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
