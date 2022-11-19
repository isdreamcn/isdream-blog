<template>
  <div class="blogLayout-header home__header">
    <MImgDefault class="m-flex whc">
      <div class="blogLayout-header-title">ISDREAM</div>
      <div class="home__header-tip">
        <MIcon @click="showContent" name="icon-ArrowDownBold"></MIcon>
      </div>
    </MImgDefault>
  </div>
</template>

<script setup lang="ts">
import { useAppLayoutEl } from '@/store'

defineOptions({
  name: 'Demo'
})

// 设置滚动条
const appLayoutEl = useAppLayoutEl()
const showContent = () => {
  if (!appLayoutEl.value) {
    return
  }
  appLayoutEl.value.scrollTo({
    top: document.body.clientHeight,
    behavior: 'smooth'
  })
}
</script>

<style lang="scss" scoped>
.home__header {
  transition: var(--animate-duration);
  height: 100vh !important;
  .home__header-tip {
    cursor: pointer;
    position: absolute;
    bottom: 3rem;
    font-size: 2.5rem;
    color: #ffffff;
    animation: upDownFloat var(--animate-duration) linear alternate infinite;
    z-index: 5;
  }
}
</style>
