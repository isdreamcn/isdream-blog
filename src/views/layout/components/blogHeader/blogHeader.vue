<template>
  <div ref="elRef" :class="`header-container ${className}`">
    BLOG
    <div>navbar</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'Demo'
})

const elRef = ref<HTMLElement>()

const className = ref('')
let scrollTop = 0

onMounted(() => {
  elRef.value!.parentElement!.addEventListener(
    'scroll',
    () => {
      const _scrollTop = elRef.value!.parentElement!.scrollTop
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
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  z-index: 2;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem;
  transition: 0.5s;
  color: #ffffff;
  &.hidden {
    transform: translateY(-100%);
  }
  &.has-bg {
    background-color: rgba(255, 255, 255, 0.7);
    color: #000000;
    box-shadow: 0 5px 6px -5px rgb(133 133 133 / 60%);
  }
}
</style>
