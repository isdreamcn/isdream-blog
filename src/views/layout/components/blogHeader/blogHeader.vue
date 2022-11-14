<template>
  <div :class="`header-container ${className}`">
    <div class="header-container__logo bottom-border" @click="goHome">
      ISDREAM
    </div>
    <div class="header-container__navbar">
      <div
        class="navbar-item bottom-border"
        v-for="item in userMenu"
        :key="item.path"
      >
        <a class="m-flex hc" @click="clickMenuItem(item)"
          ><MIcon :name="item.icon"></MIcon> {{ item.title }}</a
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useAppLayoutEl } from '@/store'
import appConfig from '@/config'

defineOptions({
  name: 'BlogHeader'
})

// navbar
const userStore = useUserStore()
const userMenu = computed(() => userStore.userMenu)

const router = useRouter()
const clickMenuItem = (item: UserMenu) => {
  if (item.link) {
    window.open(item.link)
    return
  }
  router.push(item.path)
}

const goHome = () => {
  router.push({
    name: appConfig.routeMainName
  })
}

// 滚动修改class
const className = ref('')
let scrollTop = 0

const appLayoutEl = useAppLayoutEl()
onMounted(() => {
  nextTick(() => {
    appLayoutEl.value?.addEventListener(
      'scroll',
      () => {
        if (!appLayoutEl.value) {
          return
        }
        const _scrollTop = appLayoutEl.value.scrollTop
        if (scrollTop < _scrollTop) {
          className.value = 'hidden'
        } else {
          className.value = 'show'
        }
        if (_scrollTop !== 0) {
          className.value += ' has-bg'
        }
        scrollTop = _scrollTop
      },
      false
    )
  })
})
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  z-index: 98;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem 0.8rem 2rem;
  transition: 0.5s;
  color: #ffffff;
  &.hidden {
    transform: translateY(-100%);
  }
  &.has-bg {
    background-color: rgba(255, 255, 255, 0.7);
    color: #000000;
    box-shadow: 0 1px 2.5rem -0.3rem rgb(0 0 0 / 50%);
    .bottom-border {
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }

  .bottom-border {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &::after {
      content: '';
      display: block;
      height: 0.2rem;
      width: 0;
      margin-top: 0.2rem;
      background-color: var(--el-color-primary);
      transition: 0.3s;
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .header-container__logo {
    cursor: pointer;
  }
  .header-container__navbar {
    .navbar-item {
      cursor: pointer;
      padding: 0.5rem;
      .m-icon {
        margin-right: 0.3rem;
      }
    }
  }
}
</style>
