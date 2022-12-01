import service from '@/service'

enum Api {
  Comment = '/api/comment/list',
  Reply = '/api/comment/reply',
  Like = '/api/comment/like',
  disLike = '/api/comment/disLike'
}

export const commentList = (params: any) => {
  return service.request<Service.Result<any>>({
    url: Api.Comment,
    method: 'GET',
    params
  })
}
