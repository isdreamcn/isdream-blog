<template>
  <MImg
    :src="src"
    :thumb="props.thumb ? joinBaseUrlFile(props.thumb) : mainImgThumb"
    :lazy="props.lazy"
    @error="errorHandler"
  >
    <slot></slot>
  </MImg>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mainImg from '@/assets/img/main.png'
import mainImgThumb from '@/assets/img/main-thumb.png'
import { imgProps } from './img'
import { joinBaseUrlFile } from '@/utils'

defineOptions({
  name: 'MImgDefault'
})

const props = defineProps(imgProps)

const src = ref<string>(props.src ? joinBaseUrlFile(props.src) : mainImg)
const errorHandler = () => {
  src.value = mainImg
}
</script>

<style lang="scss" scoped></style>
