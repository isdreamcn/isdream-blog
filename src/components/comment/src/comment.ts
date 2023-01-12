import type { ExtractPropTypes } from 'vue'
import type { CommentItem, CommentChildHttp } from './comment-item'
import type Comment from './comment.vue'
import { buildProps, definePropType } from '@/utils'

export type CommentHttp = (
  payload?: any
) => Promise<Service.ResultPagination<CommentItem[]>>

const commentList: CommentHttp = () =>
  Promise.resolve({
    count: 2,
    code: 200,
    data: [
      {
        id: 1,
        username: '用户名',
        content:
          '测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试测试评论测试评论测试评论测试评论测试评论测试评论测试评论',
        level: 1,
        likeCount: 15,
        isLike: false,
        isDislike: false,
        replyCount: 0
      },
      {
        id: 2,
        username: 'test',
        content: '测试评论',
        level: 1,
        likeCount: 1,
        isLike: true,
        isDislike: true,
        replyCount: 55,
        children: [
          {
            id: 4,
            username: '用户名',
            content:
              '测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试测试评论测试评论测试评论测试评论测试评论测试评论测试评论',
            level: 1,
            likeCount: 15,
            isLike: false,
            isDislike: true
          },
          {
            id: 5,
            username: '用户名1',
            content: '测试评论测试评论测试评评论',
            level: 1,
            likeCount: 15,
            reply: {
              id: 4,
              username: '用户名'
            },
            isLike: false,
            isDislike: true
          }
        ]
      }
    ]
  })

export const commentProps = buildProps({
  // 文章id
  article: {
    type: Number,
    require: false
  },
  // 一级评论
  commentHttp: {
    type: definePropType<CommentHttp>(Function),
    default: commentList
  },
  // 二级评论
  commentChildHttp: {
    type: definePropType<CommentChildHttp>(Function)
  }
} as const)

export const commentEmits = {}

export type CommentProps = ExtractPropTypes<typeof commentProps>
export type CommentEmits = typeof commentEmits

export type CommentInstance = InstanceType<typeof Comment>
