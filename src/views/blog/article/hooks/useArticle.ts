import { ref } from 'vue'
import { setDocumentTitle, setBaseUrlFile } from '@/utils'
import {
  ArticleDetails,
  getArticleById,
  commendArticle
} from '@/api/blog/article'

export const useArticle = (id: number) => {
  const articleInfo = ref<ArticleDetails>()
  const preArticleInfo = ref<ArticleDetails>()
  const nextArticleInfo = ref<ArticleDetails>()

  // 获取文章信息
  getArticleById(id).then((res) => {
    articleInfo.value = {
      ...res.data,
      content: setBaseUrlFile(res.data.content)
    }
    setDocumentTitle(res.data.title)
  })

  getArticleById(id - 1, false)
    .then((res) => {
      preArticleInfo.value = res.data
    })
    .catch(() => {})

  getArticleById(id + 1, false).then((res) => {
    nextArticleInfo.value = res.data
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
