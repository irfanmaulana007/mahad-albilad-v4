import { createFetch } from '@whatwg-node/fetch'
import { GraphQLError } from 'graphql'
import { rateLimitDirective } from 'graphql-rate-limit-directive'
import { createYoga } from 'graphql-yoga'

import '../mutations'
import '../queries'
import '../schemas'
import ActivityService from '../services/ActivityService'
import ArticleService from '../services/ArticleService'
import AuthService from '../services/AuthService'
import MediaService from '../services/MediaService'
import UserService from '../services/UserService'
import { GraphQLContext } from '../types'
import prismaClient from './prismaClient'
import schemaBuilder from './schemaBuilder'

const authService = new AuthService(prismaClient)
const userService = new UserService(prismaClient)
const articleService = new ArticleService(prismaClient)
const activityService = new ActivityService(prismaClient)
const mediaService = new MediaService(prismaClient)

const { rateLimitDirectiveTransformer } = rateLimitDirective({
  onLimit: (resource) => {
    const resetAt = new Date()
    resetAt.setTime(resetAt.getTime() + resource.msBeforeNext)
    const now = new Date()

    const seconds = Math.ceil(Math.abs(resetAt.getTime() - now.getTime()) / 1000)

    throw new GraphQLError(`Too many requests. Try again later in ${seconds}s`, {
      extensions: {
        code: 'APP_TOO_MANY_REQUESTS',
        message: {
          en: `Too many requests. Try again later in ${seconds}s`,
        },
        http: {
          status: 429,
        },
        resetAt,
      },
    })
  },
})
const schema = rateLimitDirectiveTransformer(schemaBuilder.toSchema())

export const yoga = createYoga({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  fetchAPI: createFetch({}),
  context: async (context: GraphQLContext) => {
    let user = null

    const authorization = context.request.headers.get('authorization')

    if (authorization) {
      const token = await authService.verifyToken(
        authorization,
        process.env.AUTH_JWT_ACCESS_SECRET as string,
      )
      user = await userService.getUserById(token.userId)
    }

    return {
      ArticleService: articleService,
      ActivityService: activityService,
      AuthService: authService,
      UserService: userService,
      MediaService: mediaService,
      user,
    }
  },
  multipart: true,
  plugins: [{}],
})
