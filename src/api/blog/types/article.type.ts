import { CommonListParams } from '../../commonTypes'

export interface ArticleListParams extends CommonListParams {
  tag?: number | null
}

export interface Article {
  id: number
  title: string
  content: string
  render: number
  views: number
  isCommented: boolean
  isTop: boolean
  createdAt: string
  updatedAt: string
  tags: Tag[]
  cover?: Cover
  comments: number
  commends: number
}

interface Cover {
  id: number
  url: string
  thumbUrl: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}

interface Tag {
  id: number
  title: string
  description: string
  color: string
  createdAt: string
  updatedAt: string
}
