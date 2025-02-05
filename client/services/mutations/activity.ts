import { gql } from '@apollo/client'

export const createActivityMutation = gql`
  mutation CreateActivity($articleId: ID!, $action: ActivityType!) {
    createActivity(articleId: $articleId, action: $action) {
      id
    }
  }
`
