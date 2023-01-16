import type { Router } from 'vue-router'
import appConfig from '@/config'
import { useAppLayoutEl } from '@/store'

const map = new Map()

export const useKeepAliveRollPosition = (router: Router) => {
  const appLayoutEl = useAppLayoutEl()
  let timer: NodeJS.Timer | undefined = undefined
  let attemptCount = 0

  router.beforeEach((to, form) => {
    if (form.meta.keepAlive ?? appConfig.defaultRouteMeta.keepAlive) {
      map.set(form.fullPath, appLayoutEl.value?.scrollTop)
    }
  })

  router.afterEach((to) => {
    if (to.meta.keepAlive ?? appConfig.defaultRouteMeta.keepAlive) {
      const scrollTop = map.get(to.fullPath) || 0
      if (timer) {
        clearInterval(timer)
      }

      timer = setInterval(() => {
        if (attemptCount >= 50) {
          clearInterval(timer)
        }
        attemptCount++

        const el = appLayoutEl.value
        if (el && el.scrollHeight - el.clientHeight - el.scrollTop >= 0) {
          el.scrollTo({
            top: scrollTop
            // behavior: 'smooth'
          })
          clearInterval(timer)
        }
      }, 50)
    }
  })
}
