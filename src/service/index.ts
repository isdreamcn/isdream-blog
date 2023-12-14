import { createService } from './service'
import config from '@/config'

import { useSetupToken, useHandleError, useLoading } from './interceptors'

const baseURL = import.meta.env.DEV ? '/proxyApi/' : config.baseUrlApi

export const service = createService({
  baseURL
})

export const mockService = createService({
  baseURL: '/mockApi/'
})

// 没有错误提示
export const serviceNotMessage = createService({
  baseURL
})

export const useServiceInterceptors = () => {
  // 共同控制loading
  const loading = useLoading()

  service.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    loading,
    useHandleError()
  ])
  mockService.useInterceptors([
    useSetupToken(config.serviceTokenConfig),
    loading,
    useHandleError()
  ])
  serviceNotMessage.useInterceptors([loading])
}

export default service

export type * from './service'
export type { ServiceTokenConfig } from './interceptors/index'
