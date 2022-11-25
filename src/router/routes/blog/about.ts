import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'about',
  meta: {
    title: '关于',
    icon: 'icon-male',
    sort: 4
  },
  component: () => import('@/views/blog/about/about.vue')
} as RouteRecordRaw
