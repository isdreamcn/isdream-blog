import type { ExtractPropTypes } from 'vue'
import type CommentItem from './comment-item.vue'
import type { Comment } from '@/api/blog/comment'
import { buildProps, definePropType } from '@/utils'

export const commentItemProps = buildProps({
  data: {
    type: definePropType<Comment>(Object),
    required: true
  },
  replyerId: {
    type: Number
  },
  // 文章id
  article: {
    type: Number,
    required: true
  },
  sort: {
    type: Number,
    required: true
  }
} as const)

export const commentItemEmits = {
  reply: (replyerId: number) =>
    typeof replyerId === 'number' && !isNaN(replyerId)
}

export type CommentItemProps = ExtractPropTypes<typeof commentItemProps>
export type CommentItemEmits = typeof commentItemEmits

export type CommentItemInstance = InstanceType<typeof CommentItem>
