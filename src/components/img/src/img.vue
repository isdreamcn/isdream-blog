<template>
  <div class="m-img">
    <!-- src -->
    <img loading="lazy" :src="props.src" v-bind="$attrs" @load="onLoad" />
    <!-- thumb -->
    <img
      v-if="showThumb"
      loading="lazy"
      class="ground-glass"
      :src="props.thumb"
      v-bind="$attrs"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { imgProps } from './img'

defineOptions({
  name: 'MImg'
})

const props = defineProps(imgProps)

const showThumb = ref(!!props.thumb)

const onLoad = () => {
  showThumb.value = false
}
</script>

<style lang="scss" scoped>
.m-img {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    transition: 0.3s;
    z-index: -1;
    &.ground-glass {
      filter: blur(15px);
      // 隐藏白边
      width: calc(100% + 50px);
      height: calc(100% + 50px);
      top: -25px;
      left: -25px;
    }
  }
}
</style>
