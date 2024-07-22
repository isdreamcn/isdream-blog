<template>
  <div class="progressBar" :style="`width: ${width}%`"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollListener } from '@/hooks'

defineOptions({
  name: 'ProgressBar'
})

const width = ref(0)
useScrollListener(({ scrollTop, clientHeight, scrollHeight }) => {
  width.value = Math.min(
    Math.ceil(((scrollTop + clientHeight) * 100) / scrollHeight),
    100
  )
})
</script>

<style lang="scss" scoped>
.progressBar {
  position: fixed;
  top: 0;
  z-index: 98;
  height: 0.04rem;
  background-color: var(--el-color-primary);
  transition: var(--animate-duration);
}
</style>
