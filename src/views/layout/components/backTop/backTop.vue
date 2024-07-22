<template>
  <div :class="`media-pc layout-back-top ${className}`">
    <img
      src="@/assets/img/scroll_icon.svg"
      @mousedown="(e: any) => e.preventDefault()"
      @click="goBackTop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAppLayoutEl } from '@/store'
defineOptions({
  name: 'BackTop'
})

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
  right: 0.16rem;
  height: 90vh;
  width: 0.8rem;
  transition: var(--animate-duration);
  z-index: 90;
  // animation: upDownFloat var(--animate-duration) linear alternate infinite;
  display: flex;
  flex-direction: column;
  &::before {
    content: '';
    width: 100%;
    flex: 1;
    background-image: url('@/assets/img/scroll_line.svg');
    background-repeat: repeat-y;
    background-position: center;
  }
  img {
    width: 100%;
    object-fit: contain;
    cursor: pointer;
  }
  &.is-hidden {
    transform: translateY(-100%);
  }
}

@media (max-width: 1000px) {
  .layout-back-top {
    transform: translateY(-100%);
  }
}
</style>
