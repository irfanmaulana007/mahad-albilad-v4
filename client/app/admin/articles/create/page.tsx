'use client'

import { useMutation } from '@apollo/client'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { CreateArticleMutation, CreateArticleMutationVariables } from '__generated__/gql/graphql'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { createArticleMutation } from 'services/mutations/article'

import { useToast } from 'contexts/ToastContext'

import ArticleForm from 'components/admin/article/ArticleForm'

export default function CreateArticlePage() {
  const router = useRouter()
  const { showToast } = useToast()

  const [createArticle, { loading, error }] = useMutation<
    CreateArticleMutation,
    CreateArticleMutationVariables
  >(createArticleMutation)

  const handleCreateArticle = async (data: Partial<CreateArticleMutationVariables>) => {
    return await createArticle({
      variables: {
        title: data.title || '',
        shortDescription: data.shortDescription || '',
        content: data.content || '',
        thumbnail: data.thumbnail || '',
      },
    }).then(() => {
      showToast('Create article successfully', 'success')
      router.push('/admin/articles')
    })
  }

  if (error) {
    showToast('Create user failed. Please try again.', 'error')
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2 text-sm text-gray-500'>
        <Link href='/admin/articles' className='hover:text-gray-700 flex items-center gap-x-1'>
          <ChevronLeftIcon className='w-4 h-4' />
          Articles
        </Link>
        <span>/</span>
        <span className='text-gray-700'>Create</span>
      </div>

      <h1 className='text-2xl font-bold'>Create Article</h1>

      <ArticleForm onSubmit={handleCreateArticle} loading={loading} />
    </div>
  )
}
