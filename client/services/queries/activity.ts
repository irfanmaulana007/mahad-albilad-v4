import { gql } from '@apollo/client'

export const getArticleAnalyticsByDateQuery = gql`
  query GetArticleAnalyticsByDate(
    $startDate: String!
    $endDate: String!
    $dimension: ActivityType!
  ) {
    getArticleAnalyticsByDate(startDate: $startDate, endDate: $endDate, dimension: $dimension) {
      article {
        id
        slug
        title
      }
      dataset {
        date
        metrics {
          views
          likes
          shares
        }
      }
    }
  }
`

export const getAnalyticsOverviewQuery = gql`
  query GetAnalyticsOverview(
    $startDate: String!
    $endDate: String!
  ) {
    getAnalyticsOverview(startDate: $startDate, endDate: $endDate) {
      totalViews
      totalLikes
      totalShares
    }
  }
`
