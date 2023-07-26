<template>
  <div class="home">
    <homeHeader></homeHeader>
    <div class="home__content" ref="homeContentElRef">
      <article
        v-for="article in articleList"
        :key="article.id"
        class="blogLayout-card home__content-item"
        ref="blogLayoutContentRefs"
        @click="showArticle(article.id)"
      >
        <div class="home__content-cover">
          <MImgDefault
            :src="article.cover?.url"
            :thumb="article.cover?.thumbUrl"
            lazy
          ></MImgDefault>
        </div>
        <div class="home__content-info">
          <div class="home__content-info-time">
            <b v-if="article.isTop" class="is-stick">置顶</b>
            <MIcon name="icon-clock"></MIcon>发布于
            <time v-dateFormat>{{ article.createdAt }}</time>
          </div>
          <h2 class="m-ellipsis home__content-info-title">
            {{ article.title }}
          </h2>
          <div class="home__content-info-statistics">
            <span
              ><MIcon name="icon-view"></MIcon>{{ article.views }}浏览量</span
            >
            <span
              ><MIcon name="icon-ChatDotRound"></MIcon
              >{{ article.comments }}条评论</span
            >
            <span v-for="tag in article.tags" :key="tag.id"
              ><MIcon name="icon-PriceTag"></MIcon>{{ tag.title }}</span
            >
          </div>
          <p class="home__content-info-desc">
            {{ article.text }}
          </p>
        </div>
      </article>
      <div v-if="articleList.length < dataListCount" class="home__content-next">
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

import { getArticleList, Article } from '@/api/blog/article'

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

// 获取文章列表
const dataListCount = ref(0)
const articleList = ref<Article[]>([])
const isLoading = ref(false)
const params = {
  page: 1,
  pageSize: 5
}

const _getArticleList = () => {
  return getArticleList(params).then(({ data, count }) => {
    dataListCount.value = count
    articleList.value = articleList.value.concat(data)
    getItemEls()
  })
}

const getNextPage = () => {
  isLoading.value = true
  params.page++
  _getArticleList().finally(() => (isLoading.value = false))
}

// 查看文章详情
const router = useRouter()
const showArticle = (id: number) => {
  router.push({
    name: 'article',
    params: {
      id
    }
  })
}

onMounted(() => {
  _getArticleList()
})
</script>

<style lang="scss" scoped>
.home {
  .home__content {
    .home__content-next {
      margin: 0.32rem auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.6rem;
      button {
        padding: 0.16rem 0.5rem;
        border: var(--m-border);
        border-radius: 0.5rem;
        color: #adadad;
        transition: var(--animate-duration);
        background-color: var(--m-card-bg-color);
        cursor: pointer;
        &:hover {
          color: var(--el-color-primary);
          border-color: var(--el-color-primary);
          box-shadow: 0 0 0.08rem var(--el-color-primary);
        }
      }
      .loading {
        width: 1.6rem;
      }
    }
    .home__content-item {
      display: flex;
      opacity: 0;
      min-height: 3rem;
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.3s ease;
      animation: none;
      padding: 0;
      &:hover {
        box-shadow: 0 0.02rem 0.16rem 0.02rem rgba(0, 0, 0, 0.5);
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
        height: 3rem;
        overflow: hidden;
        .m-img {
          transition: var(--animate-duration);
        }
      }
      .home__content-info {
        flex: 4;
        min-width: 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0.32rem;
        color: var(--m-font-color);
        .m-icon {
          margin-right: 0.05rem;
        }
        &-time {
          display: flex;
          align-items: center;
          .is-stick {
            color: var(--el-color-primary);
            margin-right: 0.08rem;
          }
        }
        &-title {
          font-size: 0.2rem;
          font-weight: bold;
          color: var(--m-title-color);
          margin: 0.2rem 0;
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
            padding: 0.03rem 0;
          }
        }
        &-desc {
          margin: 0.16rem 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          line-height: 0.24rem;
          word-break: break-all;
        }
      }
      &:nth-child(2n - 1) {
        flex-direction: row;
        .home__content-info {
          align-items: flex-end;
          &-statistics {
            justify-content: flex-end;
            span {
              margin-left: 0.16rem;
            }
          }
        }
      }
      &:nth-child(2n) {
        flex-direction: row-reverse;
        .home__content-info {
          &-statistics {
            span {
              margin-right: 0.16rem;
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
          height: 2.1rem;
        }
        &:nth-child(2n - 1) {
          flex-direction: row-reverse;
          .home__content-info {
            align-items: flex-start;
            &-statistics {
              justify-content: flex-start;
              span {
                margin-left: 0;
                margin-right: 0.16rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
