import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'links',
  meta: {
    title: '友链',
    icon: 'icon-link',
    sort: 3
  },
  component: () => import('@/views/blog/links/links.vue')
} as RouteRecordRaw
