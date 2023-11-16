export interface UserLoginParams {
  email: string
  username?: string
  password?: string
  avatar?: string
  website?: string
}

export interface UserLoginMenu {
  id?: number
  title?: string
  path: string
  icon?: string
  link?: string
  children?: UserLoginMenu[]
}

export interface UserLoginResult {
  token: string
  user: UserLoginInfo
}

export interface UserLoginInfo {
  id: number
  email: string
  username: string
  avatar?: string
  tempAvatar?: string
  website?: string
}

export interface UserSigninParams {
  username: string
  password: string
  email?: string
}
