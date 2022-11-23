import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'search',
  name: 'search',
  meta: {
    title: '搜索',
    hiddenInMenu: true
  },
  component: () => import('@/views/blog/search/search.vue')
} as RouteRecordRaw
