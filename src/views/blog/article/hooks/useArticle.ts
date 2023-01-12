import { ref } from 'vue'
import { Article, getArticleById, commendArticle } from '@/api/blog/article'

export const useArticle = (id: number) => {
  const articleInfo = ref<Article>()
  const preArticleInfo = ref<Article>()
  const nextArticleInfo = ref<Article>()

  // 获取文章信息
  getArticleById(id).then((res) => {
    articleInfo.value = res.data
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
