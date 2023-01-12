import type {
  Comment,
  CommentListParams,
  ReplyComment,
  ReplyCommentListParams
} from './types/comment.type'
import service from '@/service'

enum Api {
  List = '/api/comment/main',
  Reply = '/api/comment/reply',
  Like = '/api/comment/like',
  disLike = '/api/comment/disLike'
}

// 一级评论
export const getCommentList = (params: CommentListParams) => {
  return service.request<Service.ResultPagination<Comment[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

// 二级评论
export const getReplyCommentList = (params: ReplyCommentListParams) => {
  return service.request<Service.ResultPagination<ReplyComment[]>>({
    url: Api.Reply,
    method: 'GET',
    params
  })
}

export * from './types/comment.type'
