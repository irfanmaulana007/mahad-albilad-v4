'use client'

import { useQuery } from '@apollo/client'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ArticlesQueryVariables } from '__generated__/gql/graphql'
import { ArticlesQuery } from '__generated__/gql/graphql'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'

import { getArticlesQuery } from 'services/queries/article'

import { useToast } from 'contexts/ToastContext'

import ArticleCard from 'components/article-card'
import WhatsappFloating from 'components/common/whatsapp-floating'
import Footer from 'components/layout/footer'
import Navigation from 'components/layout/navigation'

export default function ArticlesPage() {
  const { data, loading, error } = useQuery<ArticlesQuery, ArticlesQueryVariables>(getArticlesQuery)
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')

  const articles = useMemo(() => {
    if (!data?.articles) return []
    return data.articles.map((article) => ({
      id: parseInt(article.id),
      title: article.title,
      createdAt: article.createdAt,
      slug: article.slug,
      content: '',
      shortDescription: article.shortDescription,
      thumbnail: article.thumbnail,
      totalViews: article.totalViews,
      totalLikes: article.totalLikes,
      totalShares: article.totalShares,
      author: {
        id: parseInt(article.author?.id),
        name: article.author?.name,
      },
    }))
  }, [data])

  const filteredArticles = useMemo(() => {
    return articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [articles, searchQuery])

  const newestArticle = filteredArticles[0]
  const mostViewedArticles = [...filteredArticles]
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 3)

  const remainingArticles = filteredArticles.slice(1).sort((a, b) => b.createdAt - a.createdAt)

  if (error) {
    showToast(error.message, 'error')
  }

  return (
    <main className='min-h-screen'>
      <Navigation />
      <WhatsappFloating />

      <div className='container mx-auto px-4 py-24 min-h-screen'>
        <div className='mb-8'>
          <div className='max-w-xl mx-auto'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Cari artikel...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
              />
              <MagnifyingGlassIcon className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
            </div>
          </div>
        </div>

        {!searchQuery && (
          <>
            {loading ? (
              <div className='h-96 bg-gray-200 animate-pulse rounded-lg mb-12'></div>
            ) : (
              newestArticle && (
                <section className='mb-12'>
                  <Link href={`/articles/${newestArticle.slug}`}>
                    <div className='relative h-96 rounded-lg overflow-hidden group'>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL}/${newestArticle.thumbnail}`}
                        alt={newestArticle.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent'>
                        <div className='absolute bottom-0 p-6 text-white'>
                          <h1 className='text-3xl font-bold mb-2'>{newestArticle.title}</h1>
                          <p className='text-gray-200 mb-2'>{newestArticle.shortDescription}</p>
                          <div className='flex items-center gap-x-4 text-sm'>
                            <span>{newestArticle.author.name}</span>
                            <span>{moment(newestArticle.createdAt).format('DD MMMM YYYY')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </section>
              )
            )}
          </>
        )}

        {!searchQuery && (
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold mb-6'>Artikel Terpopuler</h2>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className='aspect-[5/4] bg-gray-200 animate-pulse rounded-lg'></div>
                  ))
                : mostViewedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
            </div>
          </section>
        )}

        <section>
          <h2 className='text-2xl font-semibold mb-6'>Semua Artikel</h2>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className='aspect-[5/4] bg-gray-200 animate-pulse rounded-lg'></div>
                ))
              : (searchQuery ? filteredArticles : remainingArticles).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
