import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import {
  RefreshTokenUserMutation,
  RefreshTokenUserMutationVariables,
} from '__generated__/gql/graphql'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { COOKIE_KEY_AUTH_REFRESH_TOKEN, COOKIE_KEY_AUTH_TOKEN } from 'constants/cookie-keys'
import Cookies from 'js-cookie'
import React, { ReactNode, useEffect, useMemo, useRef } from 'react'

import { refreshTokenMutation } from 'services/mutations/authentication'

import useLogout from 'hooks/useLogout'

import { useToast } from './ToastContext'

type Props = {
  children: ReactNode
}

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GQL_SERVICE_URL,
})

const authLink = setContext(async (_, { headers }) => {
  const token = Cookies.get(COOKIE_KEY_AUTH_TOKEN)

  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  }
})

const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GQL_SERVICE_URL,
  headers: {
    authorization: Cookies.get(COOKIE_KEY_AUTH_TOKEN) || '',
  },
})

const ApolloClientContextProvider: React.FC<Props> = ({ children }) => {
  const apolloClientRef = useRef<ApolloClient<object> | undefined>(undefined)
  const { handleLogout } = useLogout()
  const { showToast } = useToast()

  const errorLink = useMemo(
    () =>
      onError(({ graphQLErrors, networkError, operation, forward }) => {
        // operation.operationName
        if (graphQLErrors) {
          graphQLErrors.forEach(({ extensions, message: msg }) => {
            if (extensions && extensions.code === 'AUTH_TOKEN_EXPIRED') {
              const refreshToken = Cookies.get(COOKIE_KEY_AUTH_REFRESH_TOKEN) || ''
              apolloClientRef.current
                ?.mutate<RefreshTokenUserMutation, RefreshTokenUserMutationVariables>({
                  mutation: refreshTokenMutation,
                  variables: {
                    refreshToken,
                  },
                  context: {
                    headers: {
                      authorization: '',
                    },
                  },
                })
                .then(({ data }) => {
                  if (data) {
                    const result = data.refreshTokenUser
                    Cookies.set(COOKIE_KEY_AUTH_TOKEN, result?.accessToken || '')
                    Cookies.set(COOKIE_KEY_AUTH_REFRESH_TOKEN, result?.refreshToken || '')

                    operation.setContext(({ headers = {} }) => ({
                      headers: {
                        ...headers,
                        authorization: result?.accessToken || '',
                      },
                    }))

                    // retry operation after refreshing token
                    return forward(operation)
                  }
                })
                .catch(() => {
                  console.error('Refresh token failed')
                  showToast('Refresh token failed', 'error')
                })
            } else if (extensions && extensions.code === 'AUTH_UNAUTHORIZED_ERROR') {
              console.error('Unauthorized')
              showToast('Unauthorized', 'error')
              handleLogout()
              return 'Unauthorized'
            } else if (extensions && extensions.message) {
              const extensionMessage = extensions.message as { [k in string]: string }
              const errMsg: string = extensionMessage?.en || 'Unknown error'
              showToast(errMsg, 'error')
              return errMsg
            } else if (extensions && msg === 'Unexpected error.') {
              const extension = extensions.originalError as { [k in string]: string }
              const extensionMessage = extension.message
              return extensionMessage
            } else if (msg.includes('not provided')) {
              console.error('Form validation error')
            }
          })
        } else if (networkError) {
          console.error('Network error')
          showToast('Network error', 'error')
        }
      }),
    // [message],
    [],
  )

  const apolloClient = useMemo(
    () =>
      new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([errorLink, authLink, uploadLink, httpLink]),
      }),
    [errorLink],
  )

  useEffect(() => {
    apolloClientRef.current = apolloClient
  }, [apolloClient])

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

export default ApolloClientContextProvider
