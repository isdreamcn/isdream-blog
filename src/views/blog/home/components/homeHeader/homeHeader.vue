<template>
  <div class="blogLayout-header home__header">
    <MImgDefault class="m-flex whc">
      <!-- <h1 class="blogLayout-header-title">ISDREAM-BLOG</h1> -->
      <div class="home__header-tip">
        <MIcon @click="showContent" name="icon-ArrowDownBold"></MIcon>
      </div>
    </MImgDefault>
  </div>
</template>

<script setup lang="ts">
import { useScrollEl } from '@/hooks'

defineOptions({
  name: 'Demo'
})

// 设置滚动条
const showContent = () => {
  useScrollEl(({ scrollTo, clientHeight }) =>
    scrollTo({
      top: clientHeight,
      behavior: 'smooth'
    })
  )
}
</script>

<style lang="scss" scoped>
.home__header {
  transition: var(--animate-duration);
  height: 100vh !important;
  .home__header-tip {
    cursor: pointer;
    position: absolute;
    bottom: 0.4rem;
    font-size: 0.4rem;
    color: #ffffff;
    // animation: upDownFloat var(--animate-duration) linear alternate infinite;
    z-index: 5;
  }
}

.blogLayout-header {
  &::after {
    background-color: transparent !important;
  }
}
</style>
