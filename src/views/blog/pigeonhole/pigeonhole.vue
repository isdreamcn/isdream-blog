<template>
  <div class="pigeonhole" ref="pigeonholeElRef">
    <div class="blogLayout-header">
      <MImgDefault>
        <h1 class="blogLayout-header-title">归档</h1>
      </MImgDefault>
    </div>
    <div class="blogLayout-card">
      <ul class="pigeonhole-content">
        <li class="pigeonhole-content-item statistics">
          文章总览 - {{ pigeonholeCount }}
        </li>
        <template v-for="item in pigeonholes" :key="item.year">
          <li class="pigeonhole-content-item">{{ item.year }}</li>
          <li
            v-for="article in item.articles"
            :key="article.id"
            class="pigeonhole-content-item"
          >
            <div class="item-info">
              <time class="item-info-time" v-dateFormat>{{
                article.createdAt
              }}</time>
              <a
                @click="showArticle(article.id)"
                class="item-info-title m-ellipsis"
                >{{ article.title }}</a
              >
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useShowElClassName } from '@/hooks'
import { Pigeonhole, getPigeonhole } from '@/api/blog/pigeonhole'

defineOptions({
  name: 'Pigeonhole'
})

const router = useRouter()
const showArticle = (id: number) => {
  router.push({
    name: 'article',
    params: {
      id
    }
  })
}

// 右渐入动画
const pigeonholeElRef = ref<HTMLElement>()
const itemEls = ref<Element[]>([])
useShowElClassName(itemEls, 'is-show', {
  threshold: 0.1
})

// 获取数据
const pigeonholes = ref<Pigeonhole[]>([])
const pigeonholeCount = ref(0)
getPigeonhole().then((res) => {
  pigeonholes.value = res.data
  pigeonholeCount.value = res.count
  nextTick(() => {
    itemEls.value = Array.from(
      pigeonholeElRef.value!.querySelectorAll('.pigeonhole-content-item')
    )
  })
})
</script>

<style lang="scss" scoped>
.pigeonhole {
  .pigeonhole-content {
    height: 100%;
    border-left: var(--m-border);
    border-color: var(--el-color-primary);
    padding-left: 0;
    &-item {
      margin-left: -0.065rem;
      margin-bottom: 0.32rem;
      display: flex;
      align-items: center;
      font-size: 0.24rem;
      opacity: 0;
      &.is-show {
        opacity: 1;
        animation: fadeInRight var(--animate-duration);
      }

      &::before {
        content: '';
        flex-shrink: 0;
        display: block;
        width: 0.06rem;
        height: 0.06rem;
        border-radius: 50%;
        border: 0.03rem solid var(--el-color-primary);
        margin-right: 0.16rem;
        background-color: var(--m-card-bg-color);
      }

      &.statistics {
        &::before {
          transform: scale(1.5);
          margin-top: -0.12rem;
        }
      }

      .item-info {
        color: var(--m-font-color);
        cursor: pointer;
        width: 100%;
        &-time {
          font-size: 0.16rem;
          display: block;
        }
        &-title {
          display: inline-block;
          box-sizing: border-box;
          width: calc(100% - 0.16rem);
          margin-top: 0.08rem;
          font-size: 0.18rem;
          transition: var(--animate-duration);
          &:hover {
            color: var(--el-color-primary);
            padding-left: 0.16rem;
          }
        }
      }
    }
  }
}
</style>
