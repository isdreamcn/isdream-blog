export interface IArticleListParams {
  page?: number
  pageSize?: number
  q?: string
  tag?: number
}

export interface IArticle {
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
