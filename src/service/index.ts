import { BasicRequest } from './basicRequest'
import config from '@/config'

import { useSetupToken, useHandleError, useLoading } from './interceptors'
import { mergeInterceptors } from './utils'

export const baseURL = import.meta.env.DEV ? '/proxyApi/' : config.baseUrlApi

export const service = new BasicRequest({
  baseURL,
  interceptors: mergeInterceptors([
    useSetupToken(config.serviceTokenConfig),
    useLoading(),
    useHandleError()
  ])
})

// 没有错误提示
export const serviceNotMessage = new BasicRequest({
  baseURL,
  interceptors: mergeInterceptors([useLoading()])
})

export const mockService = new BasicRequest({
  baseURL: '/mockApi/',
  interceptors: mergeInterceptors([
    useSetupToken(config.serviceTokenConfig),
    useLoading(),
    useHandleError()
  ])
})

export default service

export * from './types'
export type { ServiceTokenConfig } from './interceptors/index'
