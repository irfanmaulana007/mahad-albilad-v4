'use client'

import { useMutation, useQuery } from '@apollo/client'
import { ChevronLeftIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline'
import {
  ActivityType,
  CreateActivityMutation,
  CreateActivityMutationVariables,
  FindArticleBySlugQueryVariables,
} from '__generated__/gql/graphql'
import { FindArticleBySlugQuery } from '__generated__/gql/graphql'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

import { createActivityMutation } from 'services/mutations/activity'
import { findArticleBySlugQuery } from 'services/queries/article'

import { useToast } from 'contexts/ToastContext'

import Button from 'components/common/button'
import WhatsappFloating from 'components/common/whatsapp-floating'
import Footer from 'components/layout/footer'
import Navigation from 'components/layout/navigation'

export default function ArticlePage() {
  const params = useParams()
  const slug = params?.slug as string

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const { data, loading, error } = useQuery<
    FindArticleBySlugQuery,
    FindArticleBySlugQueryVariables
  >(findArticleBySlugQuery, {
    variables: {
      slug: slug,
    },
  })

  const [createActivity] = useMutation<CreateActivityMutation, CreateActivityMutationVariables>(
    createActivityMutation,
  )

  const { showToast } = useToast()

  const article = useMemo(() => {
    if (!data?.findArticleBySlug) return null
    return {
      id: parseInt(data.findArticleBySlug.id),
      title: data.findArticleBySlug.title,
      createdAt: data.findArticleBySlug.createdAt,
      slug: data.findArticleBySlug.slug,
      content: data.findArticleBySlug.content || '',
      shortDescription: data.findArticleBySlug.shortDescription,
      thumbnail: data.findArticleBySlug.thumbnail,
      totalViews: data.findArticleBySlug.totalViews,
      author: {
        id: parseInt(data.findArticleBySlug.author?.id),
        name: data.findArticleBySlug.author?.name,
      },
    }
  }, [data])

  const handleView = useCallback(() => {
    if (!article) return

    createActivity({
      variables: {
        articleId: article.id.toString(),
        action: ActivityType.ViewArticle,
      },
    })
  }, [article, createActivity])

  const handleLike = () => {
    if (!article) return

    setIsLiked(true)
    createActivity({
      variables: {
        articleId: article.id.toString(),
        action: ActivityType.LikeArticle,
      },
    })
  }

  const handleShare = async () => {
    if (!article) return

    navigator.clipboard.writeText(window.location.href)
    showToast('Link copied to clipboard!', 'success')

    createActivity({
      variables: {
        articleId: article.id.toString(),
        action: ActivityType.ShareArticle,
      },
    })
  }

  if (error) {
    showToast(error.message, 'error')
  }

  useEffect(() => {
    if (!article) return
    handleView()
  }, [article, handleView])

  if (!article) return null
  return (
    <main className='min-h-screen'>
      <Navigation />
      <WhatsappFloating />

      <div className='container mx-auto px-4 py-8 pt-24 min-h-screen'>
        <div className='flex flex-col gap-y-4'>
          <div className='flex items-center gap-x-2 text-sm text-gray-500'>
            <Link href='/articles' className='hover:text-gray-700 flex items-center gap-x-1'>
              <ChevronLeftIcon className='w-4 h-4' />
              Artikel
            </Link>
            <span>/</span>
            {loading ? (
              <span className='animate-pulse w-32 h-4 bg-gray-200'></span>
            ) : (
              <span className='text-gray-700'>{article.title}</span>
            )}
          </div>

          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl font-bold'>{article.title}</h1>
            <div className='flex items-center gap-x-2 text-sm text-gray-500'>
              <span>{article.author.name}</span>
              <span className='w-1 h-1 bg-gray-500 rounded-full' />
              <span>{moment(article.createdAt).format('DD MMMM YYYY')}</span>
            </div>
          </div>
          <Image
            src={`${process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL}/${article.thumbnail}`}
            alt={article.title}
            width={1000}
            height={1000}
            className='w-full h-96 object-cover rounded-lg'
          />
          <div className='prose max-w-none'>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
              className='prose max-w-none'>
              {article.content}
            </ReactMarkdown>
          </div>

          <div className='flex items-center justify-center gap-x-4 py-4 border-gray-200 text-sm'>
            <Button
              onClick={handleLike}
              disabled={isLiked}
              variant='transparent'
              className='flex items-center gap-x-2 px-4 py-2 rounded-lg bg-white hover:bg-red-50 disabled:bg-red-50 disabled:cursor-not-allowed group'>
              {isLiked ? (
                <HeartIcon className='w-5 h-5 fill-red-500 stroke-red-500' />
              ) : (
                <HeartIcon className='w-5 h-5 group-hover:stroke-red-500' />
              )}
              <span
                className={`font-medium ${isLiked ? 'text-red-500' : 'group-hover:text-red-500'}`}>
                {isLiked ? 'Liked' : 'Like'}
              </span>
            </Button>

            <Button
              onClick={handleShare}
              variant='transparent'
              className='flex items-center gap-x-2 px-4 py-2 rounded-lg bg-white hover:bg-blue-50 active:bg-blue-100 group'>
              <ShareIcon className='w-5 h-5 group-hover:stroke-blue-500' />
              <span className='font-medium group-hover:text-blue-500'>Share</span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
