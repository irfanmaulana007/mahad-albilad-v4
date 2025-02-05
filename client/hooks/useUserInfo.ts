'use client'

import { useLazyQuery } from '@apollo/client'
import { GetUserInfoQuery, GetUserInfoQueryVariables } from '__generated__/gql/graphql'
import { useCallback, useState } from 'react'

import { getUserInfoQuery } from 'services/queries/user'

import useUserStore from 'stores/useUserStore'

export default function useUserInfo() {
  const { user, setUser } = useUserStore()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [userInfo] = useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(getUserInfoQuery, {
    fetchPolicy: 'no-cache',
  })

  const getUser = useCallback(async () => {
    setIsLoading(true)
    userInfo()
      .then((res) => {
        const userResponse = res.data?.userInfo
        if (!userResponse) return

        setUser({
          ...user,
          id: parseInt(userResponse.id),
          name: userResponse.name,
          email: userResponse.email,
          username: userResponse.username,
        })
      })
      .finally(() => setIsLoading(false))
  }, [userInfo, setUser, setIsLoading, user])

  return {
    isLoading,
    setIsLoading,
    getUser,
  }
}
