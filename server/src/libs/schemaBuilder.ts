import SchemaBuilder from '@pothos/core'
import DirectivePlugin from '@pothos/plugin-directives'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import ValidationPlugin from '@pothos/plugin-validation'
import { GraphQLError } from 'graphql'
import { DateResolver, TimestampResolver } from 'graphql-scalars'

import { authUnauthorizedError } from '../errors/AuthServiceErrors'
import {
  ActivityDataset,
  ActivityMetrics,
  AnalyticsOverview,
  ArticleAnalytics,
  ArticleAnalyticsResult,
  MediaUploadInput,
  MediaUploadResult,
} from '../types'
import { AuthUserResult, GraphQLContext } from '../types'
import prismaClient from './prismaClient'

const schemaBuilder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date }
    Timestamp: { Input: Date; Output: Date }
    File: { Input: File; Output: never }
  }
  Objects: {
    AuthUserResult: AuthUserResult
    ActivityDataset: ActivityDataset
    ActivityMetrics: ActivityMetrics
    ArticleAnalytics: ArticleAnalytics
    ArticleAnalyticsResult: ArticleAnalyticsResult
    AnalyticsOverview: AnalyticsOverview
    MediaUploadResult: MediaUploadResult
    MediaUploadInput: MediaUploadInput
  }
  Context: GraphQLContext
  PrismaTypes: PrismaTypes
  AuthScopes: {
    anonymous: boolean
    authenticated: boolean
  }
  Directives: {
    rateLimit: {
      locations: 'OBJECT' | 'FIELD_DEFINITION'
      args: { limit: number; duration: number }
    }
  }
}>({
  plugins: [PrismaPlugin, ScopeAuthPlugin, ValidationPlugin, DirectivePlugin],
  scopeAuth: {
    authScopes: async (context) => ({
      anonymous: !context.user,
      authenticated: !!context.user,
    }),
    treatErrorsAsUnauthorized: true,
    unauthorizedError: () => {
      return authUnauthorizedError
    },
  },
  prisma: {
    client: prismaClient,
  },
  validationOptions: {
    validationError: (zodError) => {
      return new GraphQLError('Invalid input arguments!', {
        extensions: {
          code: 'INVALID_INPUT_ARGUMENTS',
          message: {
            en: `${zodError.message}`,
          },
          http: {
            status: 400,
          },
        },
      })
    },
  },
})

schemaBuilder.queryType({})
schemaBuilder.mutationType({})

schemaBuilder.addScalarType('Date', DateResolver, {})
schemaBuilder.addScalarType('Timestamp', TimestampResolver, {})
schemaBuilder.scalarType('File', {
  serialize: () => {
    throw new Error('Uploads can only be used as input types')
  },
})

export default schemaBuilder
