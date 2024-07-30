<script setup lang="ts">
import { computed, watch } from 'vue'
import { appConfig } from '@/config'
import { useRouterStore } from '@/store'
import { ElConfigProvider } from 'element-plus'
import { MLoadingLottie } from '@/components'
// 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// loading
const routerStore = useRouterStore()
const loading = computed(() => routerStore.loading)

const el = document.documentElement
watch(
  loading,
  (val) => {
    el.style.overflowY = val ? 'hidden' : 'auto'
  },
  {
    immediate: true
  }
)
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view v-if="appConfig.needKeepAlive" v-slot="{ Component }">
      <keep-alive :include="[appConfig.routeMainName]">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view v-else></router-view>
  </ElConfigProvider>
  <MLoadingLottie :loading="loading"></MLoadingLottie>
</template>

<style scoped></style>
