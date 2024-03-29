import type { ServiceInterceptors } from '../service'
import { ElMessage } from 'element-plus'
import { HttpStatusCode } from '@/constants'

// import db from '@/storage'
// import appConfig from '@/config'
// import router from '@/router'

// 身份验证失败
// const failAuth = () => {
//   db.clear()
//   router.push({
//     name: appConfig.routeLoginName
//   })
// }
interface FailHandler {
  message?: string
  handler?: () => void
}

// 需要错误处理的状态码
const failCodeMap = new Map<HttpStatusCode, FailHandler>([
  // [HttpStatusCode.Unauthorized, { handler: failAuth }],
  // [HttpStatusCode.Forbidden, { handler: failAuth }],
  [HttpStatusCode.Unprocessable_Entity, {}],
  [HttpStatusCode.Unauthorized, {}],
  [
    HttpStatusCode.Internal_Server_Error,
    { message: '服务器内部错误∠( ᐛ 」∠)＿' }
  ],
  [HttpStatusCode.Not_Found, {}]
])

const handleError = (code: number, message?: string) => {
  const failHandler = failCodeMap.get(code)
  if (failHandler) {
    if (message || failHandler.message) {
      ElMessage.error(message || failHandler.message)
    }
    if (failHandler.handler) {
      failHandler.handler()
    }
    return true
  }

  return false
}

export const useHandleError = (): ServiceInterceptors => {
  return {
    responseInterceptor(config) {
      const data = config.data
      if (handleError(data.code, data.message)) {
        throw { response: config }
      }
      return config
    },
    responseInterceptorCatch(err) {
      handleError(err.response.data?.code, err.response.data?.message)
      if (err.response.data?.code !== err.response.status) {
        handleError(err.response.status)
      }
      return err
    }
  }
}
