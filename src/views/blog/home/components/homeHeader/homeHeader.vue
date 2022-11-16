<template>
  <div class="home__header">
    <MImg :src="bgImg" :thumb="bgMinImg" class="m-flex whc">
      <div class="home__header-logo">ISDREAM</div>
      <div class="home__header-tip">
        <MIcon @click="showContent" name="icon-ArrowDownBold"></MIcon>
      </div>
    </MImg>
  </div>
</template>

<script setup lang="ts">
import bgImg from '@/assets/img/bg.png'
import bgMinImg from '@/assets/img/bg-min.png'
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
  transition: 0.3s;
  height: 100vh;
  .home__header-logo {
    font-size: 2.5rem;
    font-weight: bold;
    color: #ffffff;
  }
  .home__header-tip {
    cursor: pointer;
    position: absolute;
    bottom: 3rem;
    font-size: 2.5rem;
    color: #ffffff;
    animation: up-down-float 0.8s linear alternate infinite;
  }
  .m-img {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: -1;
    }
  }
}

@keyframes up-down-float {
  from {
    bottom: 3rem;
  }

  to {
    opacity: 0.6;
    bottom: 2rem;
  }
}
</style>
