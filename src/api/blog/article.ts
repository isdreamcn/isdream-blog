import type { IArticle, IArticleListParams } from './types/article.type'
import service from '@/service'

enum Api {
  List = '/api/article/main'
}

export const getArticleList = (params?: IArticleListParams) => {
  return service.request<Service.ResultPagination<IArticle[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export * from './types/article.type'
