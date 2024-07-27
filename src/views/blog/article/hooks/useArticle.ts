import { ref } from 'vue'
import { setDocumentTitle, setBaseUrlFile } from '@/utils'
import {
  ArticleDetails,
  getArticleById,
  commendArticle
} from '@/api/blog/article'

// 其他模块关联的文章id
export enum ArticleId {
  Link = 75,
  About = 76,
  Statistics = 77
}

export const useArticle = (id: number) => {
  const articleInfo = ref<ArticleDetails['data']>()
  const preArticleInfo = ref<ArticleDetails['prev']>()
  const nextArticleInfo = ref<ArticleDetails['next']>()

  // 获取文章信息
  getArticleById(id).then((res) => {
    const { data, prev, next } = res.data
    articleInfo.value = {
      ...data,
      content: setBaseUrlFile(data.content)
    }
    setDocumentTitle(data.title)

    preArticleInfo.value = prev
    nextArticleInfo.value = next
  })

  // 点赞
  const commend = () => {
    commendArticle(id).then(() => {
      articleInfo.value!.commends++
    })
  }

  return {
    articleInfo,
    preArticleInfo,
    nextArticleInfo,
    commend
  }
}
