import PrismaTypes from '@pothos/plugin-prisma/generated'
import { Article } from '@prisma/client'
import { YogaInitialContext } from 'graphql-yoga'

import ActivityService from './services/ActivityService'
import ArticleService from './services/ArticleService'
import AuthService from './services/AuthService'
import MediaService from './services/MediaService'
import UserService from './services/UserService'

export type AppContext = {
  user?: PrismaTypes['User']['Shape']
}

export type GraphQLContext = YogaInitialContext &
  AppContext & {
    AuthService: AuthService
    UserService: UserService
    ArticleService: ArticleService
    ActivityService: ActivityService
    MediaService: MediaService
  }

export type AuthUserResult = {
  accessToken: string
  refreshToken: string
}

export enum ActivityTypeEnum {
  VIEW_ARTICLE,
  LIKE_ARTICLE,
  SHARE_ARTICLE,
}

export type ActivityMetrics = {
  views: number
  likes: number
  shares: number
}

export type ActivityDataset = {
  date: string
  metrics: ActivityMetrics
}

export type ArticleAnalyticsResult = {
  article: ArticleAnalytics
  dataset: ActivityDataset[]
}

export type ArticleAnalytics = {
  id: number
  title: string
  slug: string
}

export type AnalyticsOverview = {
  totalViews: number
  totalLikes: number
  totalShares: number
}

export type MediaUploadResult = {
  status: 'success' | 'error'
  url: string
}

export type MediaUploadInput = {
  file: Express.Multer.File
}
