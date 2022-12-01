import type { ExtractPropTypes } from 'vue'
import type CommentTextArea from './comment-textarea.vue'
import { buildProps } from '@/utils'

export const commentTextAreaProps = buildProps({
  placeholder: {
    type: String,
    default: '发一条友善的评论'
  }
} as const)
export const commentTextAreaEmits = {}

export type CommentTextAreaProps = ExtractPropTypes<typeof commentTextAreaProps>
export type CommentTextAreaEmits = typeof commentTextAreaEmits

export type CommentTextAreaInstance = InstanceType<typeof CommentTextArea>
