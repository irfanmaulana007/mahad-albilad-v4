import { gql } from '@apollo/client'

export const uploadMediaMutation = gql`
  mutation UploadMedia($file: File!) {
    uploadMedia(file: $file) {
      status
      url
    }
  }
`
