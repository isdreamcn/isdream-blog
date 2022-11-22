<template>
  <div class="home">
    <homeHeader></homeHeader>
    <div class="home__content" ref="homeContentElRef">
      <article
        v-for="i in dataListCount"
        :key="i"
        class="blogLayout-card home__content-item"
        ref="blogLayoutContentRefs"
        @click="showArticle(i)"
      >
        <div class="home__content-cover">
          <MImgDefault></MImgDefault>
        </div>
        <div class="home__content-info">
          <div class="home__content-info-time">
            <b v-if="i < 3" class="is-stick">置顶</b>
            <MIcon name="icon-clock"></MIcon>发布于 <time>2022-11-13</time>
          </div>
          <h2 class="m-ellipsis home__content-info-title">
            test Title（测试标题）
          </h2>
          <div class="home__content-info-statistics">
            <span><MIcon name="icon-view"></MIcon>2222浏览量</span>
            <span><MIcon name="icon-ChatDotRound"></MIcon>20条评论</span>
            <span><MIcon name="icon-PriceTag"></MIcon>无分类</span>
          </div>
          <p class="home__content-info-desc">
            测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下
            测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下
            测试一下测试一下测试一下测试一下测试一下测试一下
            测试一下测试一下测试一下测试一下测试一下
          </p>
        </div>
      </article>
      <div class="home__content-next">
        <div v-show="isLoading" class="loading">
          <MLottie :data="loadingData"></MLottie>
        </div>
        <button type="button" v-show="!isLoading" @click="getNextPage">
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import homeHeader from './components/homeHeader/homeHeader.vue'
import loadingData from '@/assets/lottie/loading.json'
import { useShowElClassName } from '@/hooks'

defineOptions({
  name: 'Home'
})

// 下渐入动画
const homeContentElRef = ref<HTMLElement>()
const itemEls = ref<Element[]>([])
useShowElClassName(itemEls, 'is-show', {
  threshold: 0.1
})

const getItemEls = () => {
  nextTick(() => {
    itemEls.value = Array.from(
      homeContentElRef.value!.querySelectorAll('.home__content-item')
    )
  })
}

// 数据
const dataListCount = ref(3)
const isLoading = ref(false)

const getNextPage = () => {
  isLoading.value = true
  setTimeout(() => {
    dataListCount.value += 3
    isLoading.value = false
    getItemEls()
  }, 1000)
}

// 查看文章详情
const router = useRouter()
const showArticle = (id = 1) => {
  router.push({
    name: 'article',
    params: {
      id
    }
  })
}

onMounted(() => {
  getItemEls()
})
</script>

<style lang="scss" scoped>
.home {
  .home__content {
    .home__content-next {
      margin: 2rem auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10rem;
      button {
        padding: 1rem 3rem;
        border: var(--m-border);
        border-radius: 3rem;
        color: #adadad;
        transition: var(--animate-duration);
        background-color: var(--m-card-bg-color);
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
    .home__content-item {
      display: flex;
      opacity: 0;
      min-height: 18.75rem;
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.3s ease;
      animation: none;
      padding: 0;
      &:hover {
        box-shadow: 0 0.1rem 1rem 0.1rem rgba(0, 0, 0, 0.5);
        .home__content-cover {
          .m-img {
            transform: rotate(5deg) scale(1.2);
          }
        }
      }
      &.is-show {
        animation: fadeInUp var(--animate-duration);
        opacity: 1;
      }
      .home__content-cover {
        flex: 6;
        overflow: hidden;
        .m-img {
          transition: var(--animate-duration);
        }
      }
      .home__content-info {
        flex: 4;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 2rem;
        color: var(--m-font-color);
        .m-icon {
          margin-right: 0.3rem;
        }
        &-time {
          display: flex;
          align-items: center;
          .is-stick {
            color: var(--el-color-primary);
            margin-right: 0.5rem;
          }
        }
        &-title {
          font-size: 1.3rem;
          font-weight: bold;
          color: var(--m-title-color);
          margin: 1.2rem 0;
          cursor: pointer;
          transition: var(--animate-duration);
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
      .home__content-item {
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
