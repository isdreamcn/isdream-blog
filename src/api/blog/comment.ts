import type {
  CommentData,
  Comment,
  CommentListParams,
  ReplyComment,
  ReplyCommentListParams
} from './types/comment.type'
import service from '@/service'

enum Api {
  Reply = 'comment',
  List = 'comment/main',
  ReplyList = 'comment/reply',
  Like = 'comment/like',
  Dislike = 'comment/dislike'
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
    url: Api.ReplyList,
    method: 'GET',
    params
  })
}

// 评论
export const comment = (data: CommentData) => {
  return service.request({
    url: Api.Reply,
    method: 'POST',
    data
  })
}

// 喜欢
export const likeComment = (id: number) => {
  return service.request({
    url: `${Api.Like}/${id}`,
    method: 'POST'
  })
}

// 不喜欢
export const dislikeComment = (id: number) => {
  return service.request({
    url: `${Api.Dislike}/${id}`,
    method: 'POST'
  })
}

export * from './types/comment.type'
