export interface UserLoginParams {
  email: string
  username?: string
  avatar?: string
  website?: string
}

export interface UserMenu {
  id?: number
  title?: string
  path: string
  icon?: string
  link?: string
  children?: UserMenu[]
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
  website?: string
}

export interface UserSigninParams {
  username: string
  password: string
  email?: string
}
