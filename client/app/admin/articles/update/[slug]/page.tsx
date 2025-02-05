'use client'

import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import {
  FindArticleByIdQuery,
  FindArticleByIdQueryVariables,
  UpdateArticleMutation,
  UpdateArticleMutationVariables,
} from '__generated__/gql/graphql'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { updateArticleMutation } from 'services/mutations/article'
import { findArticleByIdQuery } from 'services/queries/article'

import { useToast } from 'contexts/ToastContext'

import ArticleForm from 'components/admin/article/ArticleForm'

export default function UpdateArticlePage() {
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
    fetchPolicy: 'network-only',
  })

  const [updateArticle, { loading: updateArticleLoading, error: updateArticleError }] = useMutation<
    UpdateArticleMutation,
    UpdateArticleMutationVariables
  >(updateArticleMutation)

  const article = useMemo(() => {
    if (!data?.findArticleById) return null
    return {
      id: parseInt(data.findArticleById.id),
      title: data.findArticleById.title,
      content: data.findArticleById.content,
      shortDescription: data.findArticleById.shortDescription,
      thumbnail: data.findArticleById.thumbnail,
      slug: data.findArticleById.slug,
      author: {
        id: parseInt(data.findArticleById.author.id),
        name: data.findArticleById.author.name,
      },
      totalViews: data.findArticleById.totalViews,
      totalLikes: data.findArticleById.totalLikes,
      totalShares: data.findArticleById.totalShares,
      createdAt: data.findArticleById.createdAt,
    }
  }, [data])

  const handleUpdateArticle = async (data: Partial<UpdateArticleMutationVariables>) => {
    return await updateArticle({
      variables: {
        id: articleId,
        slug: article?.slug || '',
        title: data.title || '',
        shortDescription: data.shortDescription || '',
        content: data.content || '',
        thumbnail: data.thumbnail || '',
      },
    }).then(() => {
      showToast('Update article successfully', 'success')
      apolloClient.refetchQueries({ include: ['Articles'] })
      router.push('/admin/articles')
    })
  }

  if (updateArticleError) {
    showToast('Update article failed. Please try again.', 'error')
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center gap-x-2 text-sm text-gray-500'>
        <Link href='/admin/articles' className='hover:text-gray-700 flex items-center gap-x-1'>
          <ChevronLeftIcon className='w-4 h-4' />
          Articles
        </Link>
        <span>/</span>
        <span className='text-gray-700'>Update</span>
      </div>

      <h1 className='text-2xl font-bold'>Update Article</h1>

      <ArticleForm
        onSubmit={handleUpdateArticle}
        loading={updateArticleLoading || articleLoading}
        article={article}
      />
    </div>
  )
}
