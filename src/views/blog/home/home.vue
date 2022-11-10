<template>
  <div class="home">
    <div class="home__header">
      <MImg :src="bgImg" :thumb="bgMinImg"></MImg>
    </div>
  </div>
</template>

<script setup lang="ts">
import bgImg from '@/assets/img/bg.png'
import bgMinImg from '@/assets/img/bg-min.png'

defineOptions({
  name: 'Home'
})
</script>

<style lang="scss" scoped>
.home {
  .home__header {
    height: 100vh;
  }
}
</style>
