import { reactive, watch } from 'vue'
import { debounce } from 'lodash-unified'
import { UserInfo } from '@/api/user/login'
import { useUserStore } from '@/store'

export const useUser = () => {
  const userStore = useUserStore()
  const userInfo = reactive<Partial<UserInfo>>({
    email: '',
    username: '',
    website: '',
    avatar: ''
  })

  watch(
    () => userStore.userInfo,
    (val) => {
      if (val) {
        userInfo.email ||= val.email
        userInfo.username ||= val.username
        userInfo.website ||= val.website
        userInfo.avatar ||= val.avatar
      }
    },
    {
      immediate: true
    }
  )

  const login = () => {
    const different = !!Object.entries({ ...userInfo }).find(
      ([key, value]) => (userStore.userInfo as any)?.[key] !== value
    )

    if (!different) {
      return Promise.resolve()
    }

    if (userInfo.email) {
      return userStore.login({
        ...userInfo,
        email: userInfo.email
      })
    }

    return Promise.reject('请输入邮箱')
  }

  const getUserInfoByEmail = (event: Event) => {
    const { value: email } = event.target as HTMLInputElement

    const pattern =
      // eslint-disable-next-line no-useless-escape
      /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/
    if (!pattern.test(email)) {
      return
    }

    return userStore.login({ email }, false)
  }

  return {
    userInfo,
    login,
    getUserInfoByEmail: debounce(getUserInfoByEmail, 500)
  }
}
