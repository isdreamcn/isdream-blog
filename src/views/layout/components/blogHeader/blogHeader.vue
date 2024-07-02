<template>
  <div v-if="appMedia === 'pc'" :class="`header-container ${className}`">
    <a class="header-container__logo bottom-border" @click="goHome">
      ISDREAM-BLOG
    </a>
    <nav class="header-container__navbar">
      <ul class="m-flex hc">
        <li class="navbar-item bottom-border">
          <Search></Search>
        </li>
        <li
          class="navbar-item bottom-border"
          v-for="item in userMenu"
          :key="item.path"
          @click="clickMenuItem(item)"
        >
          <a class="m-flex hc"
            ><MIcon :name="item.icon"></MIcon> {{ item.title }}</a
          >
        </li>
        <li class="navbar-item bottom-border">
          <ToggleDark></ToggleDark>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useAppLayoutEl, useAppSetting } from '@/store'
import appConfig from '@/config'
import { ToggleDark, Search } from '../index'

defineOptions({
  name: 'BlogHeader'
})

const { appMedia } = useAppSetting()

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
// let scrollTop = 0

const appLayoutEl = useAppLayoutEl()
watch(
  () => appLayoutEl.value,
  () => {
    appLayoutEl.value?.addEventListener(
      'scroll',
      () => {
        if (!appLayoutEl.value) {
          return
        }
        const _scrollTop = appLayoutEl.value.scrollTop
        className.value = 'show'
        // if (scrollTop < _scrollTop) {
        //   className.value = 'hidden'
        // } else {
        //   className.value = 'show'
        // }
        if (_scrollTop !== 0) {
          className.value += ' has-bg'
        }
        // scrollTop = _scrollTop
      },
      {
        passive: true
      }
    )
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  z-index: 98;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.16rem 0.32rem 0.13rem 0.32rem;
  transition: var(--animate-duration);
  color: #ffffff;
  &.hidden {
    transform: translateY(-100%);
  }
  &.has-bg {
    background-color: rgba(255, 255, 255, 0.7);
    color: #000000;
    box-shadow: 0 0.01rem 0.4rem -0.05rem rgb(0 0 0 / 50%);
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
      height: 0.03rem;
      width: 0;
      margin-top: 0.03rem;
      background-color: var(--el-color-primary);
      transition: var(--animate-duration);
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
    display: flex;
    align-items: center;
    ul {
      margin: 0;
    }
    .navbar-item {
      cursor: pointer;
      padding: 0 0.08rem;
      .m-icon {
        margin-right: 0.05rem;
      }
    }
  }
}
</style>
