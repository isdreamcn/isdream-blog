import { ref } from 'vue'
import { IArticle, getArticleById, commendArticle } from '@/api/blog/article'

export const useArticle = (id: number) => {
  const articleInfo = ref<IArticle>()
  const preArticleInfo = ref<IArticle>()
  const nextArticleInfo = ref<IArticle>()

  // 获取文章信息
  getArticleById(id).then((res) => {
    articleInfo.value = res.data
  })

  getArticleById(id - 1).then((res) => {
    preArticleInfo.value = res.data
  })

  getArticleById(id + 1).then((res) => {
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
