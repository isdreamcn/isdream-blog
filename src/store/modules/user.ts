import type { StorageSetOptions } from '@/storage'
import { defineStore } from 'pinia'
import db from '@/storage'

export interface UserMenu {
  id: number
  title: string
  // 路由name
  name: string
  icon: string
  children: UserMenu[]
}

export interface UserInfo {
  id: number
  username: string
  realname?: string
  email: string
  avatar?: string
}

interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
  userMenu: Nullable<UserMenu[]>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    userMenu: null
  }),
  getters: {},
  actions: {
    setupState() {
      const token = db.get<string>('token')
      const userInfo = db.get<UserInfo>('userInfo')
      const userMenu = db.get<UserMenu[]>('userMenu')
      this.$patch({
        token: token ?? '',
        userInfo,
        userMenu
      })
    },
    setState(state: UserState, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      db.set('token', state.token, dbOptions)
      db.set('userInfo', state.userInfo, dbOptions)
      db.set('userMenu', state.userMenu, dbOptions)
    },
    setToken(token: string, dbOptions?: StorageSetOptions) {
      this.token = token
      db.set('token', this.token, dbOptions)
    }
  }
})