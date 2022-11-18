<template>
  <div class="blogLayout" ref="blogLayoutElRef">
    <BlogHeader></BlogHeader>
    <ProgressBar></ProgressBar>
    <BackTop></BackTop>
    <div class="blogLayout__main">
      <KeepAlive><slot></slot></KeepAlive>
    </div>
    <div class="blogLayout__footer">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Media } from '@/store'
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/store'
import { BlogHeader, BackTop, ProgressBar } from '../components/index'

defineOptions({
  name: 'BlogLayout'
})

// elRef
const blogLayoutElRef = ref<HTMLElement>()
const setMediaClass = (media: Media) => {
  const el = blogLayoutElRef.value
  if (!el) {
    return
  }
  if (media === 'pc') {
    el.classList.remove('phone')
  } else {
    el.classList.remove('pc')
  }
  el.classList.add(media)
}

// rem
const htmlEl = document.documentElement
const appStore = useAppStore()

const setHtmlFontSize = () => {
  const width = document.body.clientWidth
  const scale = width / 1920
  let fontSize = 16
  if (scale > 1) {
    fontSize *= scale
  }
  htmlEl.style.fontSize = fontSize + 'px'

  const media = width > 768 ? 'pc' : 'phone'
  // 响应式
  appStore.setAppSetting({
    media
  })

  setMediaClass(media)
}

setHtmlFontSize()
window.addEventListener('resize', setHtmlFontSize)
window.addEventListener('orientationchange', setHtmlFontSize)

onMounted(() => {
  appStore.setAppLayoutEl(blogLayoutElRef.value)
  setMediaClass(appStore.appSetting.media)
})
</script>

<style lang="scss" scoped>
.blogLayout {
  transition: 0.5s;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  background-color: var(--m-bg-color);
  .blogLayout__main {
    flex: 1;
  }
  .blogLayout__footer {
    background-color: #000000;
    color: #ffffff;
    text-align: center;
    padding: 2rem 0;
    a {
      color: #ffffff;
      text-decoration-line: none;
    }
  }

  // header
  :deep(.blogLayout-header) {
    position: relative;
    height: 40vh;
    animation: fadeInDown 0.8s;
  }

  // 响应式
  :deep(.blogLayout-card) {
    box-sizing: border-box;
    margin: 1.5rem auto;
    animation: fadeInUp 0.8s;
    box-shadow: 0 1px 1rem -0.3rem rgba(0, 0, 0, 0.4);
    background-color: var(--m-card-bg-color);
    padding: 2rem;
    border-radius: 0.5rem;
  }
  &.pc {
    :deep(.blogLayout-card) {
      min-width: 750px;
      width: 50%;
    }
  }
  &.phone {
    :deep(.blogLayout-card) {
      width: calc(100% - 2rem);
      padding: 1rem;
    }
  }
}
</style>
