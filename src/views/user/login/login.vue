<template>
  <section :class="{ active: active }">
    <div :class="{ container: true, active: active }">
      <div class="user signinBx">
        <div class="imgBx">
          <img src="@/assets/img/1.webp" alt="" />
        </div>
        <div class="formBx">
          <form>
            <h2>登录</h2>
            <input
              v-model="loginForm.username"
              type="text"
              autocomplete="username"
              placeholder="用户名"
            />
            <input
              v-model="loginForm.password"
              type="password"
              autocomplete="current-password"
              placeholder="密码"
            />
            <input type="button" value="登 录" @click="login" />
            <p class="signup">
              没有账户?
              <a href="#" @click="toggleForm">注册</a>
            </p>
          </form>
        </div>
      </div>

      <div class="user signupBx">
        <div class="formBx">
          <form>
            <h2>创建账户</h2>
            <input
              v-model="signinForm.username"
              type="text"
              placeholder="用户名"
            />
            <input
              v-model="signinForm.email"
              type="text"
              placeholder="邮箱地址"
            />
            <input
              v-model="signinForm.password"
              type="password"
              autocomplete="new-password"
              placeholder="密码"
            />
            <input
              v-model="signinForm.confirmPassword"
              type="password"
              autocomplete="new-password"
              placeholder="确认密码"
            />
            <input type="button" value="注 册" @click="signin" />
            <p class="signup">
              已经有账户了?
              <a href="#" @click="toggleForm">登录</a>
            </p>
          </form>
        </div>
        <div class="imgBx">
          <img src="@/assets/img/2.webp" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import config from '@/config'

import { useLogin } from './hooks/useLogin'
import { useSignin } from './hooks/useSignin'
defineOptions({
  name: config.routeLoginName
})

const active = ref(false)
const toggleForm = () => {
  active.value = !active.value
}

const { loginForm, login } = useLogin()
const { signinForm, signin } = useSignin(toggleForm)
</script>

<style scoped lang="scss">
@use 'login';
</style>
