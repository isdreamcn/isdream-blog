import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { appConfig } from '@/config'
import routes from './routes'
import useGuard from './guard'

const router = createRouter({
  routes: routes,
  history:
    appConfig.routerHistory === 'Hash'
      ? createWebHashHistory()
      : createWebHistory(import.meta.env.VITE_BASE_URL)
})

useGuard(router)

export default router

export { routesHandler } from './routes'
export type { RouteMapItem, RoleMenu } from './utils'
