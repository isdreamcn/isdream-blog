<template>
  <MLoading :loading="props.loading" :zIndex="zIndex">
    <MLottie :data="loadingData" style="width: 3.5rem"></MLottie>
  </MLoading>
</template>

<script setup lang="ts">
import { MLottie, MLoading } from '@/components'
import { loadingLottieProps } from './loading-lottie'
import loadingData from '@/assets/lottie/loading.json'

defineOptions({
  name: 'MLoadingLottie'
})

const props = defineProps(loadingLottieProps)
</script>

<style lang="scss" scoped></style>
