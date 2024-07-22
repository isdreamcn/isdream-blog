import type { Router } from 'vue-router'
import appConfig from '@/config'
import { useScrollEl } from '@/hooks'

const map = new Map()

export const useKeepAliveRollPosition = (router: Router) => {
  router.beforeEach((_, form) => {
    if (form.meta.keepAlive ?? appConfig.defaultRouteMeta.keepAlive) {
      useScrollEl(({ scrollTop }) => {
        map.set(form.fullPath, scrollTop)
      })
    }
  })

  router.afterEach((to) => {
    if (to.meta.keepAlive ?? appConfig.defaultRouteMeta.keepAlive) {
      const scrollTop = map.get(to.fullPath) || 0
      useScrollEl(({ scrollHeight, clientHeight, scrollTo }) => {
        if (scrollHeight - clientHeight - scrollTop >= 0) {
          scrollTo({
            top: scrollTop
            // behavior: 'smooth'
          })
        }
      })
    }
  })
}
