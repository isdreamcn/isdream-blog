<template>
  <div class="home">
    <div class="home__header">
      <MImg :src="bgImg" :thumb="bgMinImg" class="m-flex whc">
        <div class="home__header-logo">ISDREAM</div>
        <div class="home__header-tip">
          <MIcon @click="showContent" name="icon-ArrowDownBold"></MIcon>
        </div>
      </MImg>
    </div>
    <div class="home__content">
      <TransitionGroup enter-active-class="animate__animated animate__fadeInUp">
        <div v-for="i in dataListCount" :key="i" class="blogLayout__content">
          <div class="home__content-cover">
            <MImg :src="p1Img"></MImg>
          </div>
          <div class="home__content-info">
            <div class="home__content-info-time">
              <MIcon name="icon-clock"></MIcon>发布于2022-11-13
            </div>
            <div class="home__content-info-title">test Title（测试标题）</div>
            <div class="home__content-info-statistics">
              <span><MIcon name="icon-view"></MIcon>2222浏览量</span>
              <span><MIcon name="icon-ChatDotRound"></MIcon>20条评论</span>
              <span><MIcon name="icon-PriceTag"></MIcon>无分类</span>
            </div>
            <div class="home__content-info-desc">
              测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下
              测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下
              测试一下测试一下测试一下测试一下测试一下测试一下
              测试一下测试一下测试一下测试一下测试一下
            </div>
          </div>
        </div>
      </TransitionGroup>
      <div class="home__content-next">
        <div v-show="isLoading" class="loading">
          <MLottie :data="loadingData"></MLottie>
        </div>
        <span v-show="!isLoading" @click="getNextPage">下一页</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bgImg from '@/assets/img/bg.png'
import bgMinImg from '@/assets/img/bg-min.png'
import p1Img from '@/assets/img/p1.png'
import loadingData from '@/assets/lottie/loading.json'

import { ref } from 'vue'
import { useAppLayoutEl } from '@/store'

defineOptions({
  name: 'Home'
})

// 设置滚动条
const appLayoutEl = useAppLayoutEl()
const showContent = () => {
  if (!appLayoutEl.value) {
    return
  }
  appLayoutEl.value.scrollTo({
    top: document.body.clientHeight,
    behavior: 'smooth'
  })
}

const dataListCount = ref(3)

const isLoading = ref(false)
const getNextPage = () => {
  isLoading.value = true
  setTimeout(() => {
    dataListCount.value += 3
    isLoading.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped>
.home {
  .home__header {
    transition: 0.3s;
    height: 100vh;
    .home__header-logo {
      font-size: 2.5rem;
      font-weight: bold;
      color: #ffffff;
    }
    .home__header-tip {
      cursor: pointer;
      position: absolute;
      bottom: 3rem;
      font-size: 2.5rem;
      color: #ffffff;
      animation: up-down-float 0.8s linear alternate infinite;
    }
    .m-img {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.2);
        z-index: -1;
      }
    }
  }

  @keyframes up-down-float {
    from {
      bottom: 3rem;
    }

    to {
      opacity: 0.6;
      bottom: 2rem;
    }
  }

  .home__content {
    .home__content-next {
      margin: 2rem auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10rem;
      span {
        padding: 1rem 3rem;
        border: 1px solid #d6d6d6;
        border-radius: 3rem;
        color: #adadad;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
          border-color: var(--el-color-primary);
          box-shadow: 0 0 0.5rem var(--el-color-primary);
        }
      }
      .loading {
        width: 10rem;
      }
    }
    .blogLayout__content {
      display: flex;
      &:hover {
        .home__content-cover {
          .m-img {
            transform: rotate(5deg) scale(1.1);
          }
        }
      }
      .home__content-cover {
        flex: 6;
        overflow: hidden;
        .m-img {
          transition: 0.5s;
        }
      }
      .home__content-info {
        flex: 4;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 2rem;
        color: #888888;
        .m-icon {
          margin-right: 0.3rem;
        }
        &-time {
          display: flex;
          align-items: center;
        }
        &-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: #504e4e;
          margin: 1.2rem 0;
          cursor: pointer;
          transition: 0.2s;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:hover {
            color: var(--el-color-primary);
          }
        }
        &-statistics {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          span {
            display: flex;
            align-items: center;
          }
        }
        &-desc {
          margin: 1rem 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          line-height: 1.5rem;
        }
      }
      &:nth-child(2n - 1) {
        flex-direction: row;
        .home__content-info {
          align-items: flex-end;
          &-statistics {
            justify-content: flex-end;
            span {
              margin-left: 1rem;
            }
          }
        }
      }
      &:nth-child(2n) {
        flex-direction: row-reverse;
        .home__content-info {
          &-statistics {
            span {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .home__content {
      .blogLayout__content {
        display: block;
        .home__content-cover {
          height: 13rem;
        }
        &:nth-child(2n - 1) {
          flex-direction: row-reverse;
          .home__content-info {
            align-items: flex-start;
            &-statistics {
              justify-content: flex-start;
              span {
                margin-left: 0;
                margin-right: 1rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
