<template>
  <AsideMenu style="font-size: 0.16rem"></AsideMenu>
  <div class="blogLayout" ref="blogLayoutElRef">
    <header>
      <BlogHeader></BlogHeader>
      <!-- <ProgressBar></ProgressBar> -->
    </header>
    <BackTop></BackTop>
    <main class="blogLayout__main">
      <slot></slot>
    </main>
    <footer class="blogLayout__footer">
      <p>
        ICP备案号
        <a href="http://beian.miit.gov.cn/" target="_blank"
          >苏ICP备19073933号-2</a
        >
      </p>
      <p>
        备案苏公网安备
        <a
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32031202000595"
          target="_blank"
          >32031202000595号</a
        >
      </p>
      <p>Copyright © isdream.cn</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store'
import {
  BlogHeader,
  BackTop,
  // ProgressBar,
  AsideMenu
} from '../components/index'

defineOptions({
  name: 'BlogLayout'
})

// elRef
const blogLayoutElRef = ref<HTMLElement>()

// rem
const htmlEl = document.documentElement
const appStore = useAppStore()

const setHtmlFontSize = () => {
  const width = document.body.clientWidth
  const scale = width / 1920
  let fontSize = 100
  if (scale > 1) {
    fontSize *= scale
  }
  htmlEl.style.fontSize = fontSize + 'px'
}

setHtmlFontSize()
window.addEventListener('resize', setHtmlFontSize)
window.addEventListener('orientationchange', setHtmlFontSize)
document.body.style.fontSize = '0.16rem'

onMounted(() => {
  appStore.setAppLayoutEl(blogLayoutElRef.value)
})
</script>

<style lang="scss" scoped>
.blogLayout {
  transition: var(--animate-duration);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--m-bg-color);
  .blogLayout__main {
    flex: 1;
  }
  .blogLayout__footer {
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    padding: 0.32rem 0;
    a {
      color: #ffffff;
      text-decoration-line: none;
    }
  }

  // header
  :deep(.blogLayout-header) {
    position: relative;
    height: 40vh;
    animation: fadeInDown var(--animate-duration);
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      // background-color: rgba(0, 0, 0, 0.2);
    }
    .blogLayout-header-title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      font-size: 0.4rem;
      font-weight: bold;
      color: #ffffff;
    }
  }

  // 响应式
  :deep(.blogLayout-card) {
    box-sizing: border-box;
    margin: 0.24rem auto;
    animation: fadeInUp var(--animate-duration);
    box-shadow: 0 0.02rem 0.16rem -0.05rem rgba(0, 0, 0, 0.4);
    background-color: var(--m-card-bg-color);
    padding: 0.32rem;
    border-radius: 0.08rem;
  }

  @media (min-width: 768px) {
    :deep(.blogLayout-card) {
      min-width: 750px;
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    :deep(.blogLayout-card) {
      width: calc(100% - 0.32rem);
      padding: 0.16rem;
    }
  }
}
</style>
