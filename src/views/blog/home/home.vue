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
      <div v-for="i in 10" :key="i" class="blogLayout__content">
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
    </div>
  </div>
</template>

<script setup lang="ts">
import bgImg from '@/assets/img/bg.png'
import bgMinImg from '@/assets/img/bg-min.png'
import p1Img from '@/assets/img/p1.png'
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
      bottom: 2rem;
      font-size: 2.5rem;
      color: #ffffff;
      animation: up-down 0.8s infinite;
      animation-direction: alternate;
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

  @keyframes up-down {
    from {
      margin: 0;
    }

    to {
      opacity: 0.6;
      margin: -1rem;
    }
  }

  .home__content {
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
            margin-right: 1rem;
            display: flex;
            align-items: center;
            &:last-child {
              margin-right: 0;
            }
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
      &:nth-child(1n) {
        flex-direction: row;
        .home__content-info {
          align-items: flex-end;
        }
      }
      &:nth-child(2n) {
        flex-direction: row-reverse;
        .home__content-info {
          align-items: flex-start;
        }
      }
    }
  }
}
</style>
