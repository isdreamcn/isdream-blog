import type {
  UserLoginMenu,
  UserLoginParams,
  UserLoginResult,
  UserSigninParams
} from './types/login.type'
import service, { serviceNotMessage, mockService } from '@/service'

enum Api {
  Login = 'user/login',
  Signin = 'user/signin',
  Menu = 'user/menu',
  Permissions = 'user/permissions'
}

export const userLogin = (data: UserLoginParams, showMessage = true) => {
  const http = showMessage ? service : serviceNotMessage
  return http.request<Service.Result<UserLoginResult>>({
    url: Api.Login,
    method: 'POST',
    data
  })
}

export const userSignin = (data: UserSigninParams) => {
  return mockService.request({
    url: Api.Signin,
    method: 'POST',
    data
  })
}

// 用户菜单
export const getUserMenu = () => {
  return mockService.request<Service.Result<UserLoginMenu[]>>({
    url: Api.Menu,
    method: 'GET'
  })
}

// 用户按钮权限
export const getUserPermissions = () => {
  return Promise.resolve({ data: [] })
  return mockService.request<Service.Result<string[]>>({
    url: Api.Permissions,
    method: 'GET'
  })
}

export * from './types/login.type'
