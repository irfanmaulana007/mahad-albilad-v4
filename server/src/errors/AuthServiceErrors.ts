import { GraphQLError } from 'graphql'

export const authUnauthorizedError = new GraphQLError(
  'You are not allowed to access this query or mutation!',
  {
    extensions: {
      code: 'AUTH_UNAUTHORIZED_ERROR',
      message: {
        en: 'You are not allowed to access this query or mutation!',
      },
      http: {
        status: 403,
      },
    },
  },
)

export const authInvalidCredentialsError = new GraphQLError('Invalid credentials!', {
  extensions: {
    code: 'AUTH_USER_INVALID_CREDENTIALS',
    message: {
      en: 'Invalid credentials!',
    },
    http: {
      status: 422,
    },
  },
})

export const authInvalidRefreshTokenError = new GraphQLError('Invalid Refresh Token', {
  extensions: {
    code: 'AUTH_USER_INVALID_REFRESH_TOKEN',
    message: {
      en: 'Invalid Refresh Token',
    },
    http: {
      status: 409,
    },
  },
})

export const authTokenExpiredError = new GraphQLError('Token Expired', {
  extensions: {
    code: 'AUTH_TOKEN_EXPIRED',
    message: {
      en: 'Token Expired',
    },
    http: {
      status: 401,
    },
  },
})

export const authUnknownError = new GraphQLError('Unknown error', {
  extensions: {
    code: 'AUTH_UNKNOWN_ERROR',
    message: {
      en: 'Unknown error',
    },
    http: {
      status: 500,
    },
  },
})
