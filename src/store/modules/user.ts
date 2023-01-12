import type { StorageSetOptions } from '@/storage'
import type {
  UserLoginParams,
  UserInfo,
  UserMenu as LoginUserMenu
} from '@/api/user/types/login.type'
import { defineStore } from 'pinia'
import db from '@/storage'
import appConfig from '@/config'
import router, { routesHandler } from '@/router'
import { userLogin, getUserMenu, getUserPermissions } from '@/api/user/login'
import { useRouterStore } from './router'

export interface UserMenu {
  title: string
  // 唯一key，多级路由地址拼接，/开头
  path: string
  icon?: string
  link?: string
  children?: UserMenu[]
}

export interface StoreUserInfo {
  id?: number
  username?: string
}

interface UserState {
  token: string
  userInfo: Nullable<StoreUserInfo & UserInfo>
  userMenu: Nullable<UserMenu[]>
  userPermissions: Nullable<string[]>
  userPermissionMap: Map<string, boolean>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    // 从（router/index）useRoleMenu 设置
    userMenu: null,
    userPermissions: [],
    // 用于O(1)判断权限
    userPermissionMap: new Map()
  }),
  getters: {},
  actions: {
    setupState() {
      this.token = db.get<string>('token') ?? this.token
      this.userInfo = db.get<UserInfo>('userInfo')
      // 重新获取用户菜单及权限
      // setTimeout(() => {
      //   this.setUserMenu()
      //   this.setUserPermissions()
      // })
    },
    // 用户菜单
    setUserMenu() {
      const routerStore = useRouterStore()
      routerStore.setState({
        loading: true,
        closeLoading: false
      })

      let http = getUserMenu
      const userMenu = db.get<LoginUserMenu[]>('userMenu')
      if (appConfig.storeConfig.userStorage && userMenu) {
        http = () =>
          Promise.resolve({
            data: userMenu
          })
      }
      // 菜单
      return http()
        .then((res) => {
          if (appConfig.storeConfig.userStorage && !userMenu) {
            db.set('userMenu', res.data)
          }
          // 注册路由
          routesHandler.useRoleMenu(res.data)
          this.generaterPermissionMap()
          // 重载当前页
          router.push(
            location.hash ? location.hash.slice(1) : location.pathname
          )
          return res
        })
        .finally(() => {
          routerStore.setState({
            loading: false,
            closeLoading: true
          })
        })
    },
    // 权限
    setUserPermissions() {
      let http = getUserPermissions
      const userPermissions = db.get<string[]>('userPermissions')
      if (appConfig.storeConfig.userStorage && userPermissions) {
        http = () =>
          Promise.resolve({
            data: userPermissions
          })
      }
      return http().then((res) => {
        if (appConfig.storeConfig.userStorage && !userPermissions) {
          db.set('userPermissions', userPermissions)
        }
        this.userPermissions = res.data
        this.generaterPermissionMap()

        return res
      })
    },
    // 登录
    login(params: UserLoginParams, ...payload: any[]) {
      return userLogin(params, ...payload).then(async (res) => {
        const { data, token } = res

        this.setToken(token)
        this.setUserInfo(data)

        // await this.setUserMenu()
        // await this.setUserPermissions()

        // router.push({
        //   name: appConfig.routeMainName
        // })

        return res
      })
    },
    // 退出登录
    layout() {
      db.removeKeys('token', 'userInfo', 'userMenu', 'userPermissions')
      this.$patch({
        token: '',
        userInfo: null,
        userMenu: null,
        userPermissions: null
      })
    },
    setState(state: Partial<UserState>) {
      this.$patch(state)
    },
    setToken(token: string, dbOptions?: StorageSetOptions) {
      this.token = token
      db.set('token', this.token, dbOptions)
    },
    setUserInfo(userInfo: UserInfo, dbOptions?: StorageSetOptions) {
      this.userInfo = userInfo
      db.set('userInfo', this.userInfo, dbOptions)
    },
    // 生成PermissionMap
    generaterPermissionMap() {
      const map = new Map<string, boolean>()
      if (this.userPermissions) {
        for (const permission of this.userPermissions) {
          map.set(permission, true)
        }
      }
      this.userPermissionMap = map
    },
    // 校验权限
    permissionAuth(permission: string) {
      return !!this.userPermissionMap.get(permission)
    }
  }
})
