import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'pigeonhole',
  meta: {
    title: '归档',
    icon: 'icon-messageBox',
    sort: 2
  },
  component: () => import('@/views/blog/pigeonhole/pigeonhole.vue')
} as RouteRecordRaw
