import { gql } from '@apollo/client'

export const getUserInfoQuery = gql`
  query GetUserInfo {
    userInfo {
      id
      name
      email
      username
    }
  }
`

export const getUsersQuery = gql`
  query Users {
    users {
      id
      name
      email
      username
    }
  }
`

export const findUserByIdQuery = gql`
  query FindUserById($userId: ID!) {
    findUserById(userId: $userId) {
      id
      name
      email
      username
    }
  }
`
