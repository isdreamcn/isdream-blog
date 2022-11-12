<template>
  <div class="home">
    <div class="home__header">
      <MImg :src="bgImg" :thumb="bgMinImg" class="m-flex whc">
        <div class="home__header-logo">ISDREAM</div>
        <div class="home__header-tip">
          <MIcon name="icon-ArrowDownBold"></MIcon>
        </div>
      </MImg>
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
  .m-img {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .home__header {
    height: 100vh;
    transition: 0.3s;
    .home__header-logo {
      font-size: 2.5rem;
      font-weight: bold;
      color: #ffffff;
    }
    .home__header-tip {
      position: absolute;
      bottom: 2rem;
      font-size: 2.5rem;
      color: #ffffff;
      animation: up-down 0.8s infinite;
      animation-direction: alternate;
    }
  }

  @keyframes up-down {
    from {
      margin: 0;
    }

    to {
      opacity: 0.6;
      margin: -1rem;
    }
  }
}
</style>
