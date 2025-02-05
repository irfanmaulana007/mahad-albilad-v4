import { gql } from '@apollo/client'

export const loginMutation = gql`
    mutation LoginUser($emailOrUsername: String!, $password: String!) {
        loginUser(emailOrUsername: $emailOrUsername, password: $password) {
            accessToken
            refreshToken
        }
    }
`

export const refreshTokenMutation = gql`
    mutation RefreshTokenUser($refreshToken: String!) {
        refreshTokenUser(refreshToken: $refreshToken) {
            accessToken
            refreshToken
        }
    }
`
