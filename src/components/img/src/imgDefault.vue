<template>
  <MImg :src="mainImg" :thumb="mainImgThumb" :lazy="false">
    <slot></slot>
  </MImg>
</template>

<script setup lang="ts">
import mainImg from '@/assets/img/main.png'
import mainImgThumb from '@/assets/img/main-thumb.png'

defineOptions({
  name: 'MImgDefault'
})
</script>

<style lang="scss" scoped></style>
