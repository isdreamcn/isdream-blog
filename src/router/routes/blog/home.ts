import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'home',
  meta: {
    title: '首页',
    icon: 'IconHomeFilled',
    sort: 1,
    needLoading: false
  },
  component: () => import('@/views/blog/home/home.vue')
} as RouteRecordRaw
