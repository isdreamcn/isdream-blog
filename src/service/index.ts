import { BasicRequest } from './basicRequest'
import config from '@/config'

import {
  useHandleUrl,
  useSetupToken,
  useHandleError,
  useLoading
} from './interceptors'
import { mergeInterceptors } from './utils'

export const serviceBaseURL =
  config.useMock || import.meta.env.DEV ? '/' : config.baseUrlApi

export const service = new BasicRequest({
  baseURL: serviceBaseURL,
  interceptors: mergeInterceptors([
    useHandleUrl(config.useMock),
    useSetupToken(config.serviceTokenConfig),
    useLoading(),
    useHandleError()
  ])
})

// 没有错误提示
export const serviceNotMessage = new BasicRequest({
  baseURL: serviceBaseURL,
  interceptors: mergeInterceptors([useHandleUrl(config.useMock), useLoading()])
})

export default service

export * from './types'
export type { ServiceTokenConfig } from './interceptors/index'
