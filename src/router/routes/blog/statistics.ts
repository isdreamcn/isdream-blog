import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'statistics',
  meta: {
    title: '统计',
    icon: 'icon-DataLine',
    sort: 5
  },
  component: () => import('@/views/blog/statistics/statistics.vue')
} as RouteRecordRaw
