import { gql } from '@apollo/client'

export const getArticlesQuery = gql`
  query Articles {
    articles {
      id
      slug
      title
      shortDescription
      createdAt
      thumbnail
      totalViews
      totalLikes
      totalShares
      author {
        id
        name
      }
    }
  }
`

export const findArticleByIdQuery = gql`
  query FindArticleById($articleId: ID!) {
    findArticleById(articleId: $articleId) {
      id
      slug
      title
      shortDescription
      content
      createdAt
      thumbnail
      totalViews
      totalLikes
      totalShares
      author {
        id
        name
      }
    }
  }
`

export const findArticleBySlugQuery = gql`
  query FindArticleBySlug($slug: String!) {
    findArticleBySlug(slug: $slug) {
      id
      slug
      title
      shortDescription
      content
      createdAt
      thumbnail
      totalViews
      totalLikes
      totalShares
      author {
        id
        name
      }
    }
  }
`
