import type { StorageSetOptions } from '@/storage'
import { defineStore } from 'pinia'
import db from '@/storage'
import appConfig from '@/config'
import router, { routesHandler } from '@/router'
import { useRouterStore } from './router'
import {
  UserLoginParams,
  UserLoginInfo,
  userLogin,
  getUserMenu,
  getUserPermissions
} from '@/api/user/login'

export interface UserMenu {
  title: string
  // 唯一key，多级路由地址拼接，/开头
  path: string
  icon?: string
  link?: string
  children?: UserMenu[]
}

export interface UserInfo extends UserLoginInfo {
  id: number
  username: string
  avatar?: string
}

interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
  userMenu: Nullable<UserMenu[]>
  userPermissions: Nullable<string[]>
  userPermissionMap: Map<string, boolean>
}

const $generatorMenu = appConfig.routesHandlerOptions.generatorMenu
export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    userMenu: null,
    userPermissions: null,
    // 用于O(1)判断权限
    userPermissionMap: new Map()
  }),
  getters: {},
  actions: {
    setupState() {
      this.token = db.get<string>('token') ?? this.token
      this.userInfo = db.get<UserInfo>('userInfo')

      if (!this.token) return

      const promises: Promise<any>[] = [this.setUserPermissions()]
      if (!$generatorMenu) {
        promises.push(this.setUserMenu())
      }

      this.reloadCurrentPage(promises)
    },
    // 设置用户菜单
    setUserMenu() {
      let http = getUserMenu
      const userMenu = db.get<UserMenu[]>('userMenu')
      if (appConfig.storeConfig.userMenuStorage && userMenu) {
        http = () => Promise.resolve({ data: userMenu })
      }

      return http().then((res) => {
        if (appConfig.storeConfig.userMenuStorage && !userMenu) {
          db.set('userMenu', res.data)
        }
        // 注册路由
        routesHandler.useRoleMenu(res.data)
        return res
      })
    },
    // 设置用户权限
    setUserPermissions() {
      let http = getUserPermissions
      const userPermissions = db.get<string[]>('userPermissions')
      if (appConfig.storeConfig.userPermissionsStorage && userPermissions) {
        http = () => Promise.resolve({ data: userPermissions })
      }

      return http().then((res) => {
        if (appConfig.storeConfig.userPermissionsStorage && !userPermissions) {
          db.set('userPermissions', res.data)
        }
        this.userPermissions = res.data
        this.generaterPermissionMap()
        return res
      })
    },
    // 登录
    login(params: UserLoginParams, ...payload: any[]) {
      return userLogin(params, ...payload).then(async (res) => {
        const { data } = res
        this.setToken(data.token, {
          expires: appConfig.serviceTokenConfig.expires
        })
        this.setUserInfo(data.user)

        await this.setUserPermissions()
        if (!$generatorMenu) {
          await this.setUserMenu()
        }

        // router.push({
        //   name: appConfig.routeMainName
        // })

        return res
      })
    },
    // 退出登录
    layout() {
      db.removeKeys('token', 'userInfo', 'userPermissions')
      this.$patch({
        token: '',
        userInfo: null,
        userPermissions: null
      })

      if (!$generatorMenu) {
        db.removeKeys('userMenu')
        this.$patch({
          userMenu: null
        })
      }
    },
    setState(state: Partial<UserState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      if (dbOptions) {
        db.setData(state, dbOptions)
      }
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
    },
    // 重载当前页
    async reloadCurrentPage(promises: Promise<any>[]) {
      const routerStore = useRouterStore()
      routerStore.setState({
        loading: true,
        closeLoading: false
      })

      await Promise.all(promises)

      const { pathname, search, hash } = window.location
      if (appConfig.routerHistory === 'Hash') {
        await router.replace(hash.slice(1))
      } else if (appConfig.routerHistory === 'HTML5') {
        await router.replace(pathname + search + hash)
      }

      routerStore.setState({
        loading: false,
        closeLoading: true
      })
    }
  }
})
