<template>
  <div class="progressBar" :style="`width: ${width}%`"></div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAppLayoutEl } from '@/store'

defineOptions({
  name: 'ProgressBar'
})

const width = ref(0)
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
        const { scrollTop, clientHeight, scrollHeight } = appLayoutEl.value
        width.value = Math.min(
          Math.ceil(((scrollTop + clientHeight) * 100) / scrollHeight),
          100
        )
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
.progressBar {
  position: fixed;
  top: 0;
  z-index: 98;
  height: 0.25rem;
  background-color: var(--el-color-primary);
  transition: 0.5s;
}
</style>
