import { CommonListParams } from '../../commonTypes'

export interface CommentListParams extends Omit<CommonListParams, 'q'> {
  article: number
  sort: number
}

export interface ReplyCommentListParams extends CommentListParams {
  parentComment: number
}

export interface ReplyComment {
  id: number
  content: string
  approved: boolean
  createdAt: string
  updatedAt: string
  user: User
  emojis: Emoji[]
  likedCount: number
  liked?: boolean
  disliked?: boolean
}

export interface Comment extends ReplyComment {
  replys: Replys
}

interface Replys {
  data: ReplyComment[]
  count: number
}

interface Emoji {
  id: number
  placeholder: string
  description: string
  createdAt: string
  updatedAt: string
  file: File
}

interface File {
  id: number
  url: string
  thumbUrl: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}

interface User {
  id: number
  username: string
  avatar: string
  website: string
  createdAt: string
  updatedAt: string
}
