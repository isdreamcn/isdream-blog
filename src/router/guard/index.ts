import type { Router } from 'vue-router'
import { nextTick } from 'vue'
import { useHasToken } from './useHasToken'
import { useKeepAlive } from './useKeepAlive'
import { useRouteHistory } from './useRouteHistory'
import { useLoading } from './useLoading'
import { useRedirect } from './useRedirect'
import { useKeepAliveRollPosition } from './useKeepAliveRollPosition'

const useGuards = [
  useRedirect,
  useLoading,
  useHasToken,
  useKeepAlive,
  useRouteHistory,
  useKeepAliveRollPosition
]

const useGuard = (router: Router) => {
  nextTick(() => useGuards.forEach((useGuard) => useGuard(router)))
}

export default useGuard
