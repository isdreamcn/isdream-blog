import type { ExtractPropTypes } from 'vue'
import type CommentItem from './comment-item.vue'
import type { Comment, Emoji } from '@/api/blog/comment'
import { buildProps, definePropType, joinBaseUrlFile } from '@/utils'

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
  userId: {
    type: Number
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

export const emojiHandler = (content: string, emojis: Emoji[]) => {
  let _content = content
  emojis
    .filter((emoji) => emoji.file)
    .forEach((emoji) => {
      _content = _content.replaceAll(
        emoji.placeholder,
        `<img src="${joinBaseUrlFile(emoji.file.url)}" style="width: ${
          emoji.type.width
        }; height: ${emoji.type.height};" alt="${emoji.placeholder}" />`
      )
    })

  return _content
}
