'use client'

import { useMutation } from '@apollo/client'
import '@uiw/react-markdown-preview/markdown.css'
import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import {
  UpdateArticleMutationVariables,
  UploadMediaMutation,
  UploadMediaMutationVariables,
} from '__generated__/gql/graphql'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { uploadMediaMutation } from 'services/mutations/media'

import Button from 'components/common/button'

import { Article } from 'types/article'

interface ArticleFormProps {
  article?: Article | null
  onSubmit: (data: Partial<UpdateArticleMutationVariables>) => Promise<void>
  loading: boolean
}

export default function ArticleForm({ article, onSubmit, loading }: ArticleFormProps) {
  const router = useRouter()

  const [uploadMedia] = useMutation<UploadMediaMutation, UploadMediaMutationVariables>(
    uploadMediaMutation,
  )

  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    content: '',
    thumbnail: '',
  })

  const handleUploadMedia = async (file: File | null) => {
    if (!file) {
      console.log('No file selected')
      return
    }

    setFile(file)
    try {
      // Create FormData object for file upload
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const { data } = await uploadMedia({
        variables: { file },
        context: {
          headers: {
            'Apollo-Require-Preflight': 'true',
          },
        },
      })

      if (data?.uploadMedia?.status === 'success') {
        setFormData((prev) => ({
          ...prev,
          thumbnail: data?.uploadMedia?.url || '',
        }))
      }

      return data?.uploadMedia?.url
    } catch (error) {
      console.error('Upload error:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    return await onSubmit(formData).then(() => {
      setFormData({
        title: '',
        shortDescription: '',
        content: '',
        thumbnail: '',
      })
    })
  }

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        shortDescription: article.shortDescription,
        content: article.content,
        thumbnail: article.thumbnail,
      })
    }
  }, [article])

  return (
    <div className='bg-white p-8 rounded-xl shadow-lg w-full border border-gray-100'>
      <form onSubmit={handleSubmit} className='space-y-8'>
        <div className='group'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Title
          </label>
          <input
            type='text'
            id='title'
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className='mt-1 block w-full py-2 
              border-0 border-b-2 border-gray-300
              focus:border-b-blue-500 focus:ring-0 focus:outline-none
              transition-all duration-200 ease-in-out hover:border-b-blue-400
              bg-gray-50/30'
            required
          />
        </div>

        <div className='group'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Short Description
          </label>
          <input
            type='text'
            id='shortDescription'
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            className='mt-1 block w-full py-2 
              border-0 border-b-2 border-gray-300
              focus:border-b-blue-500 focus:ring-0 focus:outline-none
              transition-all duration-200 ease-in-out hover:border-b-blue-400
              bg-gray-50/30'
            required
          />
        </div>

        <div className='group'>
          <label
            htmlFor='thumbnail'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Thumbnail
          </label>

          {file && (
            <Image src={URL.createObjectURL(file)} alt='thumbnail' width={1000} height={400} />
          )}

          {article?.thumbnail && (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_SERVICE_URL}/${article.thumbnail}`}
              alt='thumbnail'
              width={1000}
              height={400}
            />
          )}

          <input
            type='file'
            id='thumbnail'
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                handleUploadMedia(file)
              }
            }}
            className='mt-1 block w-full py-2 
              border-0 border-b-2 border-gray-300
              focus:border-b-blue-500 focus:ring-0 focus:outline-none
              transition-all duration-200 ease-in-out hover:border-b-blue-400
              bg-gray-50/30'
            accept='image/*'
          />
        </div>

        <div className='group'>
          <label
            htmlFor='content'
            className='block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 
            transition-colors duration-200'>
            Content
          </label>
          <div
            data-color-mode='light'
            className='rounded-lg overflow-hidden border border-gray-200'>
            <MDEditor
              value={formData.content}
              onChange={(value) => setFormData({ ...formData, content: value || '' })}
              preview='live'
              height={400}
              className='w-full !border-0'
              previewOptions={{
                className: 'prose max-w-none p-4',
              }}
              components={{
                toolbar(command, disabled, executeCommand) {
                  console.log('command: ', command)
                  if (command.name === 'image') {
                    return <div></div>
                  }
                  return (
                    <div title={command.name}>
                      <button
                        type='button'
                        className='py-2 px-4 hover:bg-gray-200 rounded-md duration-200'
                        onClick={() => executeCommand(command)}>
                        {command.icon}
                      </button>
                    </div>
                  )
                },
              }}
            />
          </div>
        </div>

        <div className='flex justify-end space-x-4 pt-6'>
          <Button variant='outline' onClick={() => router.push('/admin/articles')}>
            Cancel
          </Button>
          <Button type='submit' isLoading={loading}>
            {article ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  )
}
