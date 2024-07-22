<template>
  <div class="media-phone m-aside-menu" :class="{ 'show-dialog': visible }">
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
    <button
      :class="`menu__btn ${btnClassName}`"
      @click="updateVisible(!visible)"
    >
      MENU
    </button>
  </div>
</template>

<script setup lang="ts">
import type { UserMenu } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/store'
import { useScrollListener } from '@/hooks'
import { ToggleDark, Search } from '../index'
import blogger from '@/assets/img/blogger.webp'

defineOptions({
  name: 'LayoutCpnAsideMenu'
})

// navbar
const userStore = useUserStore()
const userMenu = computed(() => userStore.userMenu)

// 弹框
const visible = ref(false)
const updateVisible = (value: boolean) => {
  visible.value = value
}

// 跳转
const router = useRouter()
const clickMenuItem = (item: UserMenu) => {
  if (item.link) {
    window.open(item.link)
    return
  }
  updateVisible(false)
  router.push(item.path)
}

// 滚动修改class
const btnClassName = ref('is-show')
let scrollTop = 0
useScrollListener(({ scrollTop: _scrollTop }) => {
  if (visible.value) {
    return
  }
  if (_scrollTop === 0 || scrollTop > _scrollTop) {
    btnClassName.value = 'is-show'
  } else {
    btnClassName.value = 'is-hidden'
  }
  scrollTop = _scrollTop
})

watch(useRoute(), () => {
  updateVisible(false)
})
</script>

<style lang="scss" scoped>
.m-aside-menu {
  position: fixed;
  top: 0;
  height: 100vh;
  z-index: 90;
  display: flex;
  align-items: flex-start;
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
    opacity: 1;
    width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--m-card-bg-color);
    box-shadow: 0 0.02rem 0.16rem -0.05rem rgba(0, 0, 0, 0.4);
    transition: var(--animate-duration);
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
    .menu__content {
      opacity: 1;
      width: 40vw;
    }
    .menu__btn {
      border-color: var(--el-color-primary);
      transform: translateX(calc(-50% - 0.2rem));
    }
  }
}
</style>
