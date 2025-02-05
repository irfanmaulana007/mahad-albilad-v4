import { gql } from '@apollo/client'

export const createUserMutation = gql`
  mutation CreateUser($name: String!, $email: String!, $username: String!, $password: String!) {
    createUser(name: $name, email: $email, username: $username, password: $password) {
      id
    }
  }
`

export const updateUserMutation = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!, $username: String!, $password: String!) {
    updateUser(id: $id, name: $name, email: $email, username: $username, password: $password) {
      id
    }
  }
`

export const deleteUserMutation = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`
