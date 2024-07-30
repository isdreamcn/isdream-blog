import type { Router, RouteLocationNormalized } from 'vue-router'
import { routesHandler } from '@/router'
import { useRouteMainPath } from '@/store'
import appConfig from '@/config'

const getRoutePath = (route: RouteLocationNormalized) =>
  route.matched[route.matched.length - 1]?.path

export const useRedirect = (router: Router) => {
  router.beforeEach((to, from) => {
    // fix: 只改变路由中的参数，路由地址不改变，页面数据不刷新
    if (router.hasRoute('refresh') && getRoutePath(to) === getRoutePath(from)) {
      return {
        name: 'refresh',
        query: {
          fullPath: to.fullPath
        }
      }
    }

    if (to.name === appConfig.routeMainName) {
      return useRouteMainPath().value
    }
    const route = routesHandler.getRouteByPath(to.path)
    if (route?.children) {
      const path = routesHandler.getNotChildRoute(route.children)?.path
      if (path) {
        return path
      }
    }
  })
}
