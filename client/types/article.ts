import { User } from './user'


export interface Article {
  id: number
  slug: string
  title: string
  shortDescription: string
  content: string
  createdAt: string
  totalViews: number
  totalLikes: number
  totalShares: number
  thumbnail: string
  author: Partial<User>
}
