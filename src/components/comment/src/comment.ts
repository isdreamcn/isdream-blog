import type { ExtractPropTypes } from 'vue'
import type Comment from './comment.vue'
import { buildProps } from '@/utils'

export const commentProps = buildProps({
  // 文章id
  article: {
    type: Number,
    required: true
  }
} as const)

export const commentEmits = {}

export type CommentProps = ExtractPropTypes<typeof commentProps>
export type CommentEmits = typeof commentEmits

export type CommentInstance = InstanceType<typeof Comment>
