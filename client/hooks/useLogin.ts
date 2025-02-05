'use client'

import { useMutation } from '@apollo/client'
import { LoginUserMutation, LoginUserMutationVariables } from '__generated__/gql/graphql'
import { COOKIE_KEY_AUTH_TOKEN } from 'constants/cookie-keys'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { loginMutation } from 'services/mutations/authentication'

import { LoginFormData } from 'types/authentication'

import useUserInfo from './useUserInfo'

export default function useLogin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { isLoading: isUserLoading, getUser, setIsLoading: setIsUserLoading } = useUserInfo()

  const [login] = useMutation<LoginUserMutation, LoginUserMutationVariables>(loginMutation)

  const handleLogin = useCallback(
    (data: LoginFormData) => {
      setIsLoading(true)
      setIsUserLoading(true)
      login({
        variables: {
          emailOrUsername: data['email or username'],
          password: data.password,
        },
      })
        .then((res) => {
          const token = res.data?.loginUser?.accessToken
          if (token) Cookies.set(COOKIE_KEY_AUTH_TOKEN, token)
        })
        .then(() => {
          getUser().then(() => router.push('/admin/users'))
        })
        .catch((err) => {
          console.error(err)
          setIsLoading(false)
          setIsUserLoading(false)
        })
    },
    [login, getUser, router, setIsUserLoading],
  )

  return { handleLogin, isLoading: isLoading && isUserLoading }
}
