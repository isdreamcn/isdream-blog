import type { ArticleTag } from './types/articleTag.type'
import { service } from '@/service'

enum Api {
  Main = 'article_tag/main'
}

// 文章标签
export const getArticleTags = () => {
  return service.request<Service.Result<ArticleTag[]>>({
    url: Api.Main,
    method: 'GET'
  })
}

export * from './types/articleTag.type'
