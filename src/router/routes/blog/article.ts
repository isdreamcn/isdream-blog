import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'article/:id',
  name: 'article',
  meta: {
    title: '文章',
    hiddenInMenu: true
  },
  component: () => import('@/views/blog/article/article.vue')
} as RouteRecordRaw
