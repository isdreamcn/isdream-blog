import type { IArticle, IArticleListParams } from './types/article.type'
import service from '@/service'

enum Api {
  List = '/api/article/main',
  Details = '/api/article',
  Commend = '/api/article/commend'
}

export const getArticleList = (params?: IArticleListParams) => {
  return service.request<Service.ResultPagination<IArticle[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const getArticleById = (id: number) => {
  return service.request<Service.Result<IArticle>>({
    url: `${Api.Details}/${id}`,
    method: 'GET'
  })
}

export const commendArticle = (id: number) => {
  return service.request<Service.Result<IArticle>>({
    url: `${Api.Commend}/${id}`,
    method: 'POST'
  })
}

export * from './types/article.type'
