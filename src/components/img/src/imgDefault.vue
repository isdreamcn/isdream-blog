<template>
  <MImg
    :src="joinBaseUrlFile(props.src) ?? mainImg"
    :thumb="joinBaseUrlFile(props.thumb) ?? mainImgThumb"
    :lazy="props.lazy"
  >
    <slot></slot>
  </MImg>
</template>

<script setup lang="ts">
import mainImg from '@/assets/img/main.png'
import mainImgThumb from '@/assets/img/main-thumb.png'
import { imgProps } from './img'
import app from '@/config'

defineOptions({
  name: 'MImgDefault'
})

const props = defineProps(imgProps)

const joinBaseUrlFile = (url?: string) => {
  if (!url || /^http/.test(url)) {
    return url
  }
  return app.baseUrlFile + url
}
</script>

<style lang="scss" scoped></style>
