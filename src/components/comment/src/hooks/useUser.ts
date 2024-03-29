import { reactive, ref, watch } from 'vue'
import { debounce } from 'lodash-unified'
import { UserLoginInfo } from '@/api/user/login'
import { useUserStore } from '@/store'
import { joinBaseUrlFile } from '@/utils'

export const useUser = () => {
  const userStore = useUserStore()
  const userId = ref<number>()
  const userInfo = reactive<Partial<UserLoginInfo>>({
    email: '',
    username: '',
    website: '',
    avatar: ''
  })

  const emailReg =
    // eslint-disable-next-line no-useless-escape
    /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/

  watch(
    () => userStore.userInfo,
    (val) => {
      if (val) {
        userId.value = val.id

        const avatar = val.tempAvatar || val.avatar
        userInfo.email ||= val.email
        userInfo.username ||= val.username
        userInfo.website ||= val.website
        userInfo.avatar ||= avatar && joinBaseUrlFile(avatar)
      }
    },
    {
      immediate: true
    }
  )

  const login = () => {
    return new Promise<void>((resolve, reject) => {
      if (!userInfo.username) {
        return reject('请输入昵称')
      }

      if (!userInfo.email) {
        return reject('请输入邮箱')
      }

      if (!emailReg.test(userInfo.email)) {
        return reject('请检查邮箱是否正确')
      }

      const different = !!Object.entries({ ...userInfo }).find(
        ([key, value]) => (userStore.userInfo as any)?.[key] !== value
      )

      if (!different) {
        return resolve()
      }

      userStore
        .login({
          username: userInfo.username,
          email: userInfo.email,
          website: userInfo.website || undefined,
          avatar: userInfo.avatar || undefined
        })
        .then(() => {
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  }

  const getUserInfoByEmail = (event: Event) => {
    const { value: email } = event.target as HTMLInputElement

    if (!emailReg.test(email)) {
      return
    }

    return userStore.login({ email }, false)
  }

  return {
    userId,
    userInfo,
    login,
    getUserInfoByEmail: debounce(getUserInfoByEmail, 500)
  }
}
