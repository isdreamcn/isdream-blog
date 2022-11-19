<template>
  <div
    v-if="appMedia === 'pc'"
    :class="`layout-back-top ${className}`"
    @click="goBackTop"
  >
    <img src="@/assets/img/scroll.png" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAppLayoutEl, useAppSetting } from '@/store'
defineOptions({
  name: 'BackTop'
})

const { appMedia } = useAppSetting()

const appLayoutEl = useAppLayoutEl()
const className = ref('is-hidden')

const updateClassName = () => {
  className.value = appLayoutEl.value?.scrollTop ? 'is-show' : 'is-hidden'
}

const goBackTop = () => {
  appLayoutEl.value?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

watch(
  () => appLayoutEl.value,
  () => {
    appLayoutEl.value?.addEventListener('scroll', updateClassName, {
      passive: true
    })
    updateClassName()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@keyframes upDownFloat {
  from {
    margin-top: 0;
  }

  to {
    margin-top: -1vh;
  }
}

.layout-back-top {
  position: fixed;
  cursor: pointer;
  right: 1rem;
  height: 90vh;
  width: 5rem;
  transition: var(--animate-duration);
  z-index: 90;
  animation: upDownFloat var(--animate-duration) linear alternate infinite;
  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  &.is-hidden {
    transform: translateY(-100%);
  }
}
</style>
