import { gql } from '@apollo/client'

export const createArticleMutation = gql`
  mutation CreateArticle(
    $title: String!
    $content: String!
    $shortDescription: String!
    $thumbnail: String!
  ) {
    createArticle(
      title: $title
      content: $content
      shortDescription: $shortDescription
      thumbnail: $thumbnail
    ) {
      id
    }
  }
`

export const updateArticleMutation = gql`
  mutation UpdateArticle(
    $id: ID!
    $slug: String!
    $title: String!
    $content: String!
    $shortDescription: String!
    $thumbnail: String!
  ) {
    updateArticle(
      id: $id
      slug: $slug
      title: $title
      content: $content
      shortDescription: $shortDescription
      thumbnail: $thumbnail
    ) {
      id
    }
  }
`

export const deleteArticleMutation = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
    }
  }
`
