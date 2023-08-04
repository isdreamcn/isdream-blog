<template>
  <MImg :src="src" :thumb="thumb" :lazy="props.lazy" @error="errorHandler">
    <slot></slot>
  </MImg>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mainImg from '@/assets/img/main.webp'
import mainImgThumb from '@/assets/img/main-thumb.webp'
import { imgProps } from './img'
import { joinBaseUrlFile } from '@/utils'

defineOptions({
  name: 'MImgDefault'
})

const props = defineProps(imgProps)

const src = ref<string>(props.src ? joinBaseUrlFile(props.src) : mainImg)
const thumb = ref(
  props.thumb
    ? joinBaseUrlFile(props.thumb)
    : props.src
    ? undefined
    : mainImgThumb
)

const errorHandler = () => {
  src.value = mainImg
}
</script>

<style lang="scss" scoped></style>
