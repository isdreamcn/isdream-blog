<template>
  <div
    v-if="appMedia === 'phone'"
    :class="{ 'm-aside-menu': true, 'show-dialog': visible }"
  >
    <div class="menu__content">
      <MImg :src="blogger" :lazy="false" class="avatar"></MImg>
      <div class="blogger-name">isdream</div>
      <ul>
        <li class="m-flex wc"><ToggleDark></ToggleDark></li>
        <li><Search></Search></li>
        <li
          class="navbar-item bottom-border"
          v-for="item in userMenu"
          :key="item.path"
        >
          <a class="m-flex hc" @click="clickMenuItem(item)"
            ><MIcon :name="item.icon"></MIcon> {{ item.title }}</a
          >
        </li>
      </ul>
    </div>
    <button :class="`menu__btn ${btnClassName}`" @click="updateVisible">
      MENU
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { useRouter } from 'vue-router'
import { ref, watch, computed } from 'vue'
import { useAppSetting, useAppLayoutEl, useUserStore } from '@/store'
import { ToggleDark, Search } from '../index'
import blogger from '@/assets/img/blogger.webp'

defineOptions({
  name: 'LayoutCpnAsideMenu'
})

const { appMedia } = useAppSetting()

// navbar
const userStore = useUserStore()
const userMenu = computed(() => userStore.userMenu)

// 弹框
const visible = ref(false)
const appLayoutEl = useAppLayoutEl()
const updateVisible = () => {
  visible.value = !visible.value
  if (appLayoutEl.value) {
    appLayoutEl.value.style.transform = `translateX(${visible.value ? 42 : 0}%)`
  }
}

// 跳转
const router = useRouter()
const clickMenuItem = (item: UserMenu) => {
  if (item.link) {
    window.open(item.link)
    return
  }
  updateVisible()
  router.push(item.path)
}

// 滚动修改class
const btnClassName = ref('is-show')
let scrollTop = 0
watch(
  () => appLayoutEl.value,
  () => {
    appLayoutEl.value?.addEventListener(
      'scroll',
      () => {
        if (!appLayoutEl.value) {
          return
        }
        if (visible.value) {
          updateVisible()
        }
        const _scrollTop = appLayoutEl.value.scrollTop
        if (_scrollTop === 0 || scrollTop > _scrollTop) {
          btnClassName.value = 'is-show'
        } else {
          btnClassName.value = 'is-hidden'
        }
        scrollTop = _scrollTop
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
.m-aside-menu {
  position: fixed;
  z-index: 90;
  width: 40%;
  display: flex;
  align-items: flex-start;
  height: 0;
  .menu__btn {
    position: relative;
    margin-top: 0.16rem;
    margin-left: 0.2rem;
    padding: 0.08rem 0.16rem;
    border: var(--m-border);
    border-radius: 0.32rem;
    cursor: pointer;
    background-color: var(--m-card-bg-color);
    color: var(--m-title-color);
    transition: var(--animate-duration);
    &:hover {
      border-color: var(--el-color-primary);
    }
    &.is-hidden {
      transform: translateX(calc(-100% - 0.2rem));
    }
  }
  .menu__content {
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 0;
    flex-shrink: 0;
    transition: var(--animate-duration);
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--m-card-bg-color);
    box-shadow: 0 0.02rem 0.16rem -0.05rem rgba(0, 0, 0, 0.4);
    .avatar {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin: 0.32rem 0 0.16rem 0;
    }
    .blogger-name {
      font-weight: bold;
    }

    ul {
      list-style-type: none;
      padding-left: 0;
      li {
        cursor: pointer;
        padding: 0.08rem;
        white-space: nowrap;
        transition: var(--animate-duration);
        font-size: 0.2rem;
        &:hover {
          color: var(--el-color-primary);
        }
        .m-icon {
          margin-right: 0.05rem;
        }
      }
    }
  }

  &.show-dialog {
    height: 100%;
    .menu__content {
      opacity: 1;
      width: 100%;
    }
    .menu__btn {
      border-color: var(--el-color-primary);
      transform: translateX(calc(-50% - 0.2rem));
    }
  }
}
</style>
