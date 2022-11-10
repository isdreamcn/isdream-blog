<template>
  <div class="blogLayout" ref="blogLayoutRef">
    <BlogHeader></BlogHeader>
    <div class="blogLayout__main">
      <slot></slot>
      <div class="blogLayout__footer">footer</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BlogHeader } from '../components/index'

defineOptions({
  name: 'BlogLayout'
})

// rem
const htmlEl = document.documentElement
const setHtmlFontSize = () => {
  const width = document.body.clientWidth
  const scale = width / 1920
  let fontSize = 16
  if (scale > 1) {
    fontSize *= scale
  }
  htmlEl.style.fontSize = fontSize + 'px'
}

setHtmlFontSize()
window.addEventListener('resize', setHtmlFontSize)
window.addEventListener('orientationchange', setHtmlFontSize)
</script>

<style lang="scss" scoped>
.blogLayout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .blogLayout__main {
    flex: 1;
    .blogLayout__footer {
      background-color: #000000;
      color: #ffffff;
      text-align: center;
      padding: 2rem 0;
    }
  }
}
</style>
