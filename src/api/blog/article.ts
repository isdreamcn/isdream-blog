import type {
  Article,
  ArticleDetails,
  ArticleListParams
} from './types/article.type'
import service from '@/service'

enum Api {
  List = '/api/article/main',
  Details = '/api/article/main',
  Commend = '/api/article/commend'
}

export const getArticleList = (params?: ArticleListParams) => {
  return service.request<Service.ResultPagination<Article[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export const getArticleById = (id: number) => {
  return service.request<Service.Result<ArticleDetails>>({
    url: `${Api.Details}/${id}`,
    method: 'GET'
  })
}

export const commendArticle = (id: number) => {
  return service.request<Service.Result<Article>>({
    url: `${Api.Commend}/${id}`,
    method: 'POST'
  })
}

export * from './types/article.type'
