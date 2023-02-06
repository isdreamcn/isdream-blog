import type { ExtractPropTypes } from 'vue'
import type CommentEmoji from './comment-emoji.vue'
import { buildProps } from '@/utils'

export const emojiStyle = {
  width: '2rem',
  height: '2rem'
}

export const commentEmojiProps = buildProps({
  visible: {
    type: Boolean,
    default: false
  }
} as const)

export const commentEmojiEmits = {
  select: (emoji: string) => typeof emoji === 'string'
}

export type CommentEmojiProps = ExtractPropTypes<typeof commentEmojiProps>
export type CommentEmojiEmits = typeof commentEmojiEmits

export type CommentItemInstance = InstanceType<typeof CommentEmoji>
