import { useQuery } from '@apollo/client'
import { ArticlesQueryVariables } from '__generated__/gql/graphql'
import { ArticlesQuery } from '__generated__/gql/graphql'
import Link from 'next/link'
import { useMemo } from 'react'

import { getArticlesQuery } from 'services/queries/article'

import { useToast } from 'contexts/ToastContext'

import ArticleCard from 'components/article-card'

export default function ArticleSection() {
  const { data, loading, error } = useQuery<ArticlesQuery, ArticlesQueryVariables>(getArticlesQuery)
  const { showToast } = useToast()

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
      author: {
        id: parseInt(article.author?.id),
        name: article.author?.name,
      },
      totalViews: article.totalViews,
      totalLikes: article.totalLikes,
      totalShares: article.totalShares,
    }))
  }, [data])

  if (error) {
    showToast(error.message, 'error')
  }
  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-semibold text-center mb-12'>Artikel Terbaru</h2>
        <div className='grid md:grid-cols-3 gap-8 mb-16'>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className='aspect-[5/4] w-full bg-gray-200 animate-pulse rounded-lg'></div>
              ))
            : articles.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
        <div className='text-center'>
          <Link
            href='/articles'
            className='inline-block border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-2 rounded-full transition-colors'>
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  )
}
