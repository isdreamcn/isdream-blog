import { CommonListParams } from '../../commonTypes'

// 发布评论
export interface CommentData {
  content: string
  article: number
  parentComment?: number
  replyUser?: number
}

export interface CommentListParams extends Omit<CommonListParams, 'q'> {
  article: number
  sort: number
}

export interface ReplyCommentListParams
  extends Omit<CommentListParams, 'article'> {
  parentComment: number
}

export interface ReplyComment {
  id: number
  content: string
  approved: boolean
  createdAt: string
  updatedAt: string
  user: User
  replyUser?: User
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

export interface Emoji {
  id: number
  placeholder: string
  description: string
  createdAt: string
  updatedAt: string
  file: File
  type: Type
}

interface Type {
  id: number
  title: string
  width: string
  height: string
  createdAt: string
  updatedAt: string
}

interface File {
  id: number
  url: string
  filename: string
  mimeType: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  username: string
  avatar?: string
  tempAvatar?: string
  website: string
  createdAt: string
  updatedAt: string
}
