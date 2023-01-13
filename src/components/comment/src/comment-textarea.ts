import type { ExtractPropTypes } from 'vue'
import type CommentTextArea from './comment-textarea.vue'
import { buildProps } from '@/utils'

export const commentTextAreaProps = buildProps({
  placeholder: {
    type: String,
    default: '发一条友善的评论'
  },
  article: {
    type: Number,
    required: true
  },
  replyComment: {
    type: Number
  },
  replyUser: {
    type: Number
  }
} as const)
export const commentTextAreaEmits = {
  reply: () => true
}

export type CommentTextAreaProps = ExtractPropTypes<typeof commentTextAreaProps>
export type CommentTextAreaEmits = typeof commentTextAreaEmits

export type CommentTextAreaInstance = InstanceType<typeof CommentTextArea>
