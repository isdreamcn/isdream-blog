import type { ExtractPropTypes } from 'vue'
import type CommentItem from './comment-item.vue'
import { buildProps, definePropType } from '@/utils'

export type CommentItem = {
  id: number
  username: string
  content: string
  level: number
  likeCount: number
  isLike: boolean
  isDislike: boolean
  replyCount: number
  avatar?: string
  website?: string
  reply?: Pick<CommentItem, 'id' | 'username'>
  children?: Omit<CommentItem, 'replyCount'>[]
}

export type CommentItemChild = Omit<CommentItem, 'replyCount'>

export type CommentChildHttp = (
  payload?: any
) => Promise<Service.ResultPagination<CommentItem[]>>

export const commentItemProps = buildProps({
  data: {
    type: definePropType<CommentItem>(Object),
    required: true
  },
  commentChildHttp: {
    type: definePropType<CommentChildHttp>(Function)
  },
  replyerId: {
    type: Number
  }
} as const)

export const commentItemEmits = {
  reply: (replyerId: number) =>
    typeof replyerId === 'number' && !isNaN(replyerId)
}

export type CommentItemProps = ExtractPropTypes<typeof commentItemProps>
export type CommentItemEmits = typeof commentItemEmits

export type CommentItemInstance = InstanceType<typeof CommentItem>
